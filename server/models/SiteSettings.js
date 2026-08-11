import mongoose from 'mongoose';

const navItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 40 },
    href: { type: String, required: true, trim: true, maxlength: 80 },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    logoText: { type: String, required: true, trim: true, maxlength: 60, default: 'Portfolio' },
    logoUrl: { type: String, trim: true, default: '' },
    navItems: { type: [navItemSchema], default: [] },
    footerText: { type: String, trim: true, maxlength: 200, default: '' },
    accentColor: {
      type: String,
      default: '#854CE6',
      match: [/^#([0-9A-Fa-f]{3}){1,2}$/, 'Accent color must be a valid hex color'],
    },
    showGithubButton: { type: Boolean, default: true },
    metaTitle: { type: String, trim: true, maxlength: 100, default: '' },
    metaDescription: { type: String, trim: true, maxlength: 300, default: '' },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
