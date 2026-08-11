import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    companyLogo: { type: String, trim: true, default: '' },
    role: { type: String, required: true, trim: true, maxlength: 100 },
    company: { type: String, required: true, trim: true, maxlength: 100 },
    location: { type: String, trim: true, maxlength: 100, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    bulletPoints: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    certificateUrl: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

experienceSchema.index({ isActive: 1, order: 1 });

export const Experience = mongoose.model('Experience', experienceSchema);
