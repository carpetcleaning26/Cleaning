import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local or .env.example
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { SERVICES, FAQS, BLOG_POSTS, GALLERY_IMAGES, VIDEOS_LIST } from '../src/data/canberraData';
import { ACT_SUBURBS, REVIEWS } from '../src/data/cleaningData';
import ServiceModel from '../src/models/Service';
import SuburbModel from '../src/models/Suburb';
import FaqModel from '../src/models/Faq';
import TestimonialModel from '../src/models/Testimonial';
import BlogPostModel from '../src/models/BlogPost';
import GalleryItemModel from '../src/models/GalleryItem';
import VideoItemModel from '../src/models/VideoItem';
import SiteSettingsModel from '../src/models/SiteSettings';
import AdminUserModel from '../src/models/AdminUser';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/canberra_carpet_cleaning';

async function seed() {
  console.log('🚀 Starting MongoDB Seed Process...');
  console.log(`Connecting to: ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);

  // 1. Seed Services
  await ServiceModel.deleteMany({});
  const serviceDocs = SERVICES.map((s, idx) => ({
    ...s,
    displayOrder: idx,
    published: true,
  }));
  await ServiceModel.insertMany(serviceDocs);
  console.log(`✓ Seeded ${serviceDocs.length} Services.`);

  // 2. Seed Suburbs
  await SuburbModel.deleteMany({});
  const suburbDocs = ACT_SUBURBS.map((sub, idx) => ({
    ...sub,
    displayOrder: idx,
  }));
  await SuburbModel.insertMany(suburbDocs);
  console.log(`✓ Seeded ${suburbDocs.length} Suburbs.`);

  // 3. Seed FAQs
  await FaqModel.deleteMany({});
  const faqDocs = FAQS.map((f, idx) => ({
    ...f,
    displayOrder: idx,
  }));
  await FaqModel.insertMany(faqDocs);
  console.log(`✓ Seeded ${faqDocs.length} FAQs.`);

  // 4. Seed Testimonials
  await TestimonialModel.deleteMany({});
  const testimonialDocs = REVIEWS.map((r, idx) => ({
    ...r,
    displayOrder: idx,
    published: true,
  }));
  await TestimonialModel.insertMany(testimonialDocs);
  console.log(`✓ Seeded ${testimonialDocs.length} Testimonials.`);

  // 5. Seed Blog Posts
  await BlogPostModel.deleteMany({});
  const blogDocs = BLOG_POSTS.map((b, idx) => ({
    ...b,
    displayOrder: idx,
    published: true,
  }));
  await BlogPostModel.insertMany(blogDocs);
  console.log(`✓ Seeded ${blogDocs.length} Blog Posts.`);

  // 6. Seed Gallery Items
  await GalleryItemModel.deleteMany({});
  const galleryDocs = GALLERY_IMAGES.map((g, idx) => ({
    ...g,
    category: 'Carpet',
    displayOrder: idx,
    published: true,
  }));
  await GalleryItemModel.insertMany(galleryDocs);
  console.log(`✓ Seeded ${galleryDocs.length} Gallery Items.`);

  // 7. Seed Video Items
  await VideoItemModel.deleteMany({});
  const videoDocs = VIDEOS_LIST.map((v, idx) => ({
    ...v,
    displayOrder: idx,
    published: true,
  }));
  await VideoItemModel.insertMany(videoDocs);
  console.log(`✓ Seeded ${videoDocs.length} Video Items.`);

  // 8. Seed Site Settings
  await SiteSettingsModel.deleteMany({});
  await SiteSettingsModel.create({
    phone: "0481 734 225",
    phoneFormatted: "0481 734 225",
    telLink: "tel:0481734225",
    email: "info@canberracarpetcleaningdeals.com.au",
    address: "5 Holford St, Taylor, ACT 2913",
    hours: "Mon–Sat 7:00am–7:00pm, same-day booking if booked before 11am",
    founded: "2008",
    yearsExp: "17+",
    jobsCompleted: "100,000+",
    rating: "5.0★",
    reviewCount: "80+",
    heroHeadline: "WE'VE BUILT OUR CANBERRA BUSINESS ON 100,000+ CLEAN HOMES",
    heroSubheadline: "Professional hot water steam extraction, 100% bond-back guarantee, sofa washing, and stain treatment across all Canberra ACT suburbs.",
  });
  console.log('✓ Seeded Site Settings.');

  // 9. Seed Admin User
  await AdminUserModel.deleteMany({});
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@canberracarpetcleaningdeals.com.au';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass2026!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await AdminUserModel.create({
    email: adminEmail,
    passwordHash,
    role: 'admin',
  });
  console.log(`✓ Seeded Admin User: ${adminEmail}`);

  console.log('🎉 Database Seeding Completed Successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding Failed:', err);
  process.exit(1);
});
