import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, unique: true, trim: true, lowercase: true },
    platform: { type: String, required: true, enum: ['web', 'android', 'ios', 'desktop'] },
    image: { type: String, required: true, trim: true },
    gallery: { type: [String], default: [] },
    shortDescription: { type: String, trim: true, maxlength: 300, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    tags: { type: [String], default: [] },
    techStack: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    youtubeUrl: { type: String, trim: true, default: '' },
    liveUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['completed', 'in-progress', 'archived'], default: 'completed' },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.pre('save', async function generateSlug(next) {
  if (!this.isModified('title') && this.slug) return next();

  const base = this.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let candidate = base;
  let suffix = 1;
  const Model = this.constructor;
  while (await Model.exists({ slug: candidate, _id: { $ne: this._id } })) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  this.slug = candidate;
  next();
});

projectSchema.index({ isPublished: 1, order: 1 });

export const Project = mongoose.model('Project', projectSchema);
