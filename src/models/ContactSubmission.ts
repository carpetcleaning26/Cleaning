import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone?: string;
  suburb?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const ContactSubmissionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    suburb: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

export const ContactSubmissionModel: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmissionModel;
