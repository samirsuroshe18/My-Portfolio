import mongoose from 'mongoose';

const skillCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
