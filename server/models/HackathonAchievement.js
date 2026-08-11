import mongoose from 'mongoose';

const hackathonMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    avatarUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    linkedinUrl: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const hackathonAchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    organizer: { type: String, required: true, trim: true, maxlength: 150 },
    date: { type: Date, required: true },
    duration: { type: String, trim: true, maxlength: 40, default: '' },
    image: { type: String, trim: true, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    tags: { type: [String], default: [] },
    certificateUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    youtubeUrl: { type: String, trim: true, default: '' },
    members: { type: [hackathonMemberSchema], default: [] },
    sponsors: { type: [String], default: [] },
    platformPartner: { type: String, trim: true, maxlength: 100, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

hackathonAchievementSchema.index({ isActive: 1, order: 1 });

export const HackathonAchievement = mongoose.model('HackathonAchievement', hackathonAchievementSchema);
