import mongoose from 'mongoose';

const mediumBlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    coverImage: { type: String, trim: true, default: '' },
    url: { type: String, required: true, trim: true },
    publishedAt: { type: Date, required: true },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

mediumBlogSchema.index({ isActive: 1, publishedAt: -1 });

export const MediumBlog = mongoose.model('MediumBlog', mediumBlogSchema);
