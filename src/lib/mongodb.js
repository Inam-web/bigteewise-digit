import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('[MongoDB] MONGODB_URI is not configured.');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not configured.'
    );
  }

  // Reuse an existing connection.
  if (cached.conn) {
    console.log('[MongoDB] Reusing existing connection.');
    return cached.conn;
  }

  // Reuse an existing connection attempt.
  if (cached.promise) {
    console.log('[MongoDB] Waiting for existing connection attempt.');
    return cached.promise;
  }

  console.log('[MongoDB] Starting connection...');

  cached.promise = mongoose
    .connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    })
    .then((mongooseInstance) => {
      console.log('[MongoDB] Connected successfully.');

      cached.conn = mongooseInstance;

      return mongooseInstance;
    })
    .catch((error) => {
      console.error('[MongoDB] Connection failed:', {
        name: error?.name,
        message: error?.message,
        code: error?.code,
        codeName: error?.codeName,
      });

      cached.promise = null;
      cached.conn = null;

      throw error;
    });

  try {
    return await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;

    throw error;
  }
}

export default dbConnect;