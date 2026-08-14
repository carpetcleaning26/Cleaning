import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryItem extends Document {
  url: string;
  caption: string;
  category: string;
  displayOrder: number;
  published: boolean;
}

const GalleryItemSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    caption: { type: String, required: true },
    category: { type: String, default: 'Carpet' },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const GalleryItemModel: Model<IGalleryItem> =
  mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);

export default GalleryItemModel;
