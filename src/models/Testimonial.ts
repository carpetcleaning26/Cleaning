import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITestimonial extends Document {
  id: string;
  author: string;
  suburb: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  avatarBg: string;
  avatarImg?: string;
  published: boolean;
  displayOrder: number;
}

const TestimonialSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    author: { type: String, required: true },
    suburb: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    date: { type: String, required: true },
    service: { type: String, default: 'Carpet Steam Cleaning' },
    comment: { type: String, required: true },
    avatarBg: { type: String, default: 'from-sky-500 to-blue-600' },
    avatarImg: { type: String },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const TestimonialModel: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default TestimonialModel;
