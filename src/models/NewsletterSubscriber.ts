import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewsletterSubscriber extends Document {
  email: string;
  subscribedAt: Date;
}

const NewsletterSubscriberSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const NewsletterSubscriberModel: Model<INewsletterSubscriber> =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>('NewsletterSubscriber', NewsletterSubscriberSchema);

export default NewsletterSubscriberModel;
