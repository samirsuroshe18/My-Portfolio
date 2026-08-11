import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    avatarUrl: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const openSourceContributionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    projectName: { type: String, required: true, trim: true, maxlength: 100 },
    repositoryUrl: { type: String, required: true, trim: true },
    pullRequestUrl: { type: String, required: true, trim: true },
    image: { type: String, trim: true, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    technologies: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['Open', 'Merged', 'Closed'], default: 'Open' },
    release: { type: String, trim: true, maxlength: 60, default: '' },
    date: { type: Date, required: true },
    members: { type: [memberSchema], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

openSourceContributionSchema.index({ isActive: 1, order: 1 });

export const OpenSourceContribution = mongoose.model('OpenSourceContribution', openSourceContributionSchema);
