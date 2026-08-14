import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISuburb extends Document {
  name: string;
  postcode: string;
  region: string;
  sameDayAvailable: boolean;
  displayOrder: number;
}

const SuburbSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    postcode: { type: String, required: true },
    region: { type: String, required: true },
    sameDayAvailable: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SuburbModel: Model<ISuburb> =
  mongoose.models.Suburb || mongoose.model<ISuburb>('Suburb', SuburbSchema);

export default SuburbModel;
