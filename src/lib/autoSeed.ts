import connectToDatabase from './mongodb';
import ServiceModel from '@/models/Service';
import SuburbModel from '@/models/Suburb';
import FaqModel from '@/models/Faq';
import TestimonialModel from '@/models/Testimonial';
import BlogPostModel from '@/models/BlogPost';
import GalleryItemModel from '@/models/GalleryItem';
import VideoItemModel from '@/models/VideoItem';
import SiteSettingsModel from '@/models/SiteSettings';
import AdminUserModel from '@/models/AdminUser';
import { hashPassword } from './auth';

import { SERVICES, FAQS, BLOG_POSTS, GALLERY_IMAGES, VIDEOS_LIST } from '@/data/canberraData';
import { ACT_SUBURBS, REVIEWS } from '@/data/cleaningData';

export async function ensureDatabaseSeeded() {
  try {
    await connectToDatabase();

    const serviceCount = await ServiceModel.countDocuments();
    if (serviceCount === 0) {
      console.log('[AutoSeed] Seeding Services...');
      await ServiceModel.insertMany(
        SERVICES.map((s: any, idx) => ({
          ...s,
          name: s.name || s.title,
          title: s.title || s.name,
          displayOrder: idx,
          published: true,
        }))
      );
    }

    const suburbCount = await SuburbModel.countDocuments();
    if (suburbCount === 0) {
      console.log('[AutoSeed] Seeding Suburbs...');
      await SuburbModel.insertMany(
        ACT_SUBURBS.map((sub, idx) => ({ ...sub, displayOrder: idx }))
      );
    }

    const faqCount = await FaqModel.countDocuments();
    if (faqCount === 0) {
      console.log('[AutoSeed] Seeding FAQs...');
      await FaqModel.insertMany(
        FAQS.map((f, idx) => ({ ...f, displayOrder: idx }))
      );
    }

    const testimonialCount = await TestimonialModel.countDocuments();
    if (testimonialCount === 0) {
      console.log('[AutoSeed] Seeding Testimonials...');
      await TestimonialModel.insertMany(
        REVIEWS.map((r, idx) => ({ ...r, displayOrder: idx, published: true }))
      );
    }

    const blogCount = await BlogPostModel.countDocuments();
    if (blogCount === 0) {
      console.log('[AutoSeed] Seeding Blog Posts...');
      await BlogPostModel.insertMany(
        BLOG_POSTS.map((b, idx) => ({ ...b, displayOrder: idx, published: true }))
      );
    }

    const galleryCount = await GalleryItemModel.countDocuments();
    if (galleryCount === 0) {
      console.log('[AutoSeed] Seeding Gallery Items...');
      await GalleryItemModel.insertMany(
        GALLERY_IMAGES.map((g, idx) => ({ ...g, category: 'Carpet', displayOrder: idx, published: true }))
      );
    }

    const videoCount = await VideoItemModel.countDocuments();
    if (videoCount === 0) {
      console.log('[AutoSeed] Seeding Video Items...');
      await VideoItemModel.insertMany(
        VIDEOS_LIST.map((v, idx) => ({ ...v, displayOrder: idx, published: true }))
      );
    }

    const settingsCount = await SiteSettingsModel.countDocuments();
    if (settingsCount === 0) {
      console.log('[AutoSeed] Seeding Site Settings...');
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
    }

    const adminCount = await AdminUserModel.countDocuments();
    if (adminCount === 0) {
      console.log('[AutoSeed] Seeding Admin User...');
      const adminEmail = (process.env.ADMIN_EMAIL || 'admin@canberracarpetcleaningdeals.com.au').toLowerCase().trim();
      const adminPass = process.env.ADMIN_PASSWORD || 'AdminPass2026!';
      const passHash = await hashPassword(adminPass);
      await AdminUserModel.create({
        email: adminEmail,
        passwordHash: passHash,
        role: 'admin',
      });
    }

    return true;
  } catch (err) {
    console.warn('[AutoSeed] Failed to auto-seed database:', err);
    return false;
  }
}
