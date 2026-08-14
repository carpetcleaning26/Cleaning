import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideoItem extends Document {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  displayOrder: number;
  published: boolean;
}

const VideoItemSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const VideoItemModel: Model<IVideoItem> =
  mongoose.models.VideoItem || mongoose.model<IVideoItem>('VideoItem', VideoItemSchema);

export default VideoItemModel;
