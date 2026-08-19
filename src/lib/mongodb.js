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
    throw new Error('MONGODB_URI environment variable is not configured.');
  }

  // Reuse existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // Reuse connection promise
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log('[MongoDB] Connected successfully.');
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;

        console.error('[MongoDB] Connection failed:', {
          name: error?.name,
          message: error?.message,
          code: error?.code,
          codeName: error?.codeName,
        });

        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default dbConnect;