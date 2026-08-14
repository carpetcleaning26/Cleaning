import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  phone: string;
  phoneFormatted: string;
  telLink: string;
  email: string;
  address: string;
  hours: string;
  founded: string;
  yearsExp: string;
  jobsCompleted: string;
  rating: string;
  reviewCount: string;
  heroHeadline: string;
  heroSubheadline: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

const SiteSettingsSchema: Schema = new Schema(
  {
    phone: { type: String, default: '0481 734 225' },
    phoneFormatted: { type: String, default: '0481 734 225' },
    telLink: { type: String, default: 'tel:0481734225' },
    email: { type: String, default: 'info@canberracarpetcleaningdeals.com.au' },
    address: { type: String, default: '5 Holford St, Taylor, ACT 2913' },
    hours: { type: String, default: 'Mon–Sat 7:00am–7:00pm, same-day booking if booked before 11am' },
    founded: { type: String, default: '2008' },
    yearsExp: { type: String, default: '17+' },
    jobsCompleted: { type: String, default: '100,000+' },
    rating: { type: String, default: '5.0★' },
    reviewCount: { type: String, default: '80+' },
    heroHeadline: { type: String, default: "WE'VE BUILT OUR CANBERRA BUSINESS ON 100,000+ CLEAN HOMES" },
    heroSubheadline: { type: String, default: 'Professional hot water steam extraction, 100% bond-back guarantee, sofa washing, and stain treatment across all Canberra ACT suburbs.' },
    facebookUrl: { type: String, default: 'https://facebook.com' },
    instagramUrl: { type: String, default: 'https://instagram.com' },
  },
  { timestamps: true }
);

export const SiteSettingsModel: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);

export default SiteSettingsModel;
