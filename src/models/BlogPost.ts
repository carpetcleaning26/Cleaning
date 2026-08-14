import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  published: boolean;
  displayOrder: number;
}

const BlogPostSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true, default: '5 min read' },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Canberra Cleaning Expert' },
    category: { type: String, default: 'Carpet Care' },
    image: { type: String, required: true },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const BlogPostModel: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPostModel;
