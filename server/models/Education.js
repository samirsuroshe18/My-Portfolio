import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institutionLogo: { type: String, trim: true, default: '' },
    school: { type: String, required: true, trim: true, maxlength: 150 },
    degree: { type: String, required: true, trim: true, maxlength: 150 },
    field: { type: String, trim: true, maxlength: 150, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    grade: { type: String, trim: true, maxlength: 20, default: '' },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    certificateUrl: { type: String, trim: true, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

educationSchema.index({ isActive: 1, order: 1 });

export const Education = mongoose.model('Education', educationSchema);
