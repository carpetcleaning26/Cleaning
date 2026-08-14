import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  id: string;
  slug: string;
  name: string;
  navTitle: string;
  category: 'GENERAL' | 'CARPET' | 'UPHOLSTERY' | 'RUG' | 'TILES' | 'COMMERCIAL';
  shortDesc: string;
  fullDesc: string;
  startingPrice: string;
  unit: string;
  badge?: string;
  image: string;
  differentiators: string[];
  processSteps: { title: string; desc: string }[];
  pricingNotes: string[];
  displayOrder: number;
  published: boolean;
}

const ServiceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    navTitle: { type: String, required: true },
    category: { type: String, required: true, default: 'GENERAL' },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    startingPrice: { type: String, required: true },
    unit: { type: String, required: true },
    badge: { type: String },
    image: { type: String, required: true },
    differentiators: [{ type: String }],
    processSteps: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    pricingNotes: [{ type: String }],
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default ServiceModel;
