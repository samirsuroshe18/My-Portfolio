import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    headline: { type: String, trim: true, maxlength: 150, default: '' },
    roles: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one role is required',
      },
    },
    shortBio: { type: String, trim: true, maxlength: 300, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    avatarUrl: { type: String, trim: true, default: '' },
    location: { type: String, trim: true, maxlength: 100, default: '' },
    availability: { type: String, trim: true, maxlength: 100, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    linkedinUrl: { type: String, trim: true, default: '' },
    twitterUrl: { type: String, trim: true, default: '' },
    mediumUrl: { type: String, trim: true, default: '' },
    resumeUrl: { type: String, trim: true, default: '' },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);
