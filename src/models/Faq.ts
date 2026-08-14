import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFaq extends Document {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'process' | 'general' | 'bond' | 'carpet';
  displayOrder: number;
}

const FaqSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true, default: 'pricing' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FaqModel: Model<IFaq> =
  mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);

export default FaqModel;
