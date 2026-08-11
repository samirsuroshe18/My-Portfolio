import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ['github', 'linkedin', 'twitter', 'medium', 'mail', 'instagram', 'youtube', 'other'],
    },
    label: { type: String, trim: true, maxlength: 40, default: '' },
    url: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SocialLink = mongoose.model('SocialLink', socialLinkSchema);
