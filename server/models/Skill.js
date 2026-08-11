import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillCategory', required: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    icon: { type: String, required: true, trim: true },
    proficiency: { type: Number, min: 0, max: 100, default: 80 },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

skillSchema.index({ category: 1, order: 1 });

export const Skill = mongoose.model('Skill', skillSchema);
