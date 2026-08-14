import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuoteSubmission extends Document {
  referenceId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  propertyType?: string;
  selectedServices: Array<{ name: string; quantity: number; price: number } | string>;
  totalAmount: number;
  discountApplied: boolean;
  status: 'new' | 'contacted' | 'booked' | 'completed';
  createdAt: Date;
}

const QuoteSubmissionSchema: Schema = new Schema(
  {
    referenceId: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    suburb: { type: String, required: true },
    propertyType: { type: String, default: 'Residential' },
    selectedServices: { type: Schema.Types.Mixed, required: true },
    totalAmount: { type: Number, required: true },
    discountApplied: { type: Boolean, default: true },
    status: { type: String, enum: ['new', 'contacted', 'booked', 'completed'], default: 'new' },
  },
  { timestamps: true }
);

export const QuoteSubmissionModel: Model<IQuoteSubmission> =
  mongoose.models.QuoteSubmission ||
  mongoose.model<IQuoteSubmission>('QuoteSubmission', QuoteSubmissionSchema);

export default QuoteSubmissionModel;
