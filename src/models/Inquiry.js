import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      trim: true,
      lowercase: true,
      maxlength: [100, 'Email cannot be more than 100 characters'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    company: {
      type: String,
      trim: true,
      default: '',
    },
    service: {
      type: String,
      trim: true,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    details: {
      type: String,
      trim: true,
      default: '',
    },
    budget: {
      type: String,
      trim: true,
      default: '',
    },
    bookType: {
      type: String,
      trim: true,
      default: '',
    },
    hasDesign: {
      type: String,
      trim: true,
      default: '',
    },
    source: {
      type: String,
      trim: true,
      default: 'website_inquiry',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation during hot-reloads in Next.js development
export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
