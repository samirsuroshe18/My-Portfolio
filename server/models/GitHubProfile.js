import mongoose from 'mongoose';

const githubProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      default: '',
      match: [/^[a-zA-Z0-9-]{0,39}$/, 'Invalid GitHub username'],
    },
    displayContributionGraph: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GitHubProfile = mongoose.model('GitHubProfile', githubProfileSchema);
