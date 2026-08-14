# Setup & Operational Documentation — Canberra Carpet Cleaning Deals

This guide details environment setup, database initialization (MongoDB), file storage integration (Cloudflare R2), transactional emails (Nodemailer Gmail SMTP), Admin Portal usage (`/admin`), and deployment.

---

## 1. Environment Configuration (`.env.local`)

Create `.env.local` in the root folder with the following configuration:

```env
# 1. MongoDB Database Connection String
# For local dev: mongodb://127.0.0.1:27017/canberra_carpet_cleaning
# For production (MongoDB Atlas): mongodb+scale://user:pass@cluster.mongodb.net/canberra_carpet_cleaning
MONGODB_URI=mongodb://127.0.0.1:27017/canberra_carpet_cleaning

# 2. Cloudflare R2 Media Storage (S3-Compatible Object Storage)
CLOUDFLARE_R2_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_BUCKET_NAME=canberra-cleaning-media
CLOUDFLARE_R2_PUBLIC_URL=https://pub-yourbucketid.r2.dev

# 3. Transactional Email (Gmail SMTP with App Password)
# Note: GMAIL_APP_PASSWORD must be a 16-character Google App Password created in Google Account > Security > App Passwords (2FA required).
GMAIL_USER=info@canberracarpetcleaningdeals.com.au
GMAIL_APP_PASSWORD=your_16_char_app_password
NOTIFICATION_EMAIL_TO=info@canberracarpetcleaningdeals.com.au

# 4. Protected Admin Portal Authentication
JWT_SECRET=super_secret_32_byte_key_change_in_production
ADMIN_EMAIL=admin@canberracarpetcleaningdeals.com.au
ADMIN_PASSWORD=AdminPass2026!
```

---

## 2. Database Seeding (MongoDB Population)

To seed MongoDB with all 9 services, 55+ ACT suburbs, FAQs, customer reviews, blog articles, 25 real photos, 8 video clips, site settings, and initial Admin login credentials:

```bash
npx tsx scripts/seed.ts
```

Output:
```
🚀 Starting MongoDB Seed Process...
✓ Seeded 9 Services.
✓ Seeded 55 Suburbs.
✓ Seeded 6 FAQs.
✓ Seeded 7 Testimonials.
✓ Seeded 2 Blog Posts.
✓ Seeded 25 Gallery Items.
✓ Seeded 8 Video Items.
✓ Seeded Site Settings.
✓ Seeded Admin User: admin@canberracarpetcleaningdeals.com.au
🎉 Database Seeding Completed Successfully!
```

---

## 3. Protected Admin Dashboard (`/admin`)

- **URL**: `http://localhost:3000/admin` (or `https://yourdomain.com/admin`)
- **Default Login**:
  - **Email**: `admin@canberracarpetcleaningdeals.com.au`
  - **Password**: `AdminPass2026!`
- **Features**:
  - **Overview**: Real-time counter widgets for Quote submissions, Contact messages, Services, and Articles.
  - **Quote Requests (`/admin/quotes`)**: Full history of calculator quotes, status management (`New`, `Contacted`, `Booked`, `Completed`), and customer contact details.
  - **Contact Messages (`/admin/contacts`)**: Web form inquiries and status updates.
  - **Services (`/admin/services`)**: Full CRUD editor with direct R2 image upload.
  - **Suburbs (`/admin/suburbs`)**: Searchable list of all covered Canberra & Queanbeyan suburbs.
  - **Photo Gallery (`/admin/gallery`)**: Upload new job photos to Cloudflare R2 bucket with automated file deletion on item removal.
  - **Videos (`/admin/videos`)**: Upload MP4 action clips to Cloudflare R2.
  - **Newsletter List (`/admin/newsletter`)**: View subscribers and click **Export CSV**.
  - **Site Settings (`/admin/settings`)**: Singleton form to modify business phone, office address, operating hours, and hero headlines without code deploys.

---

## 4. Production Deployment (Vercel)

1. **Push Repository**: Commit and push to GitHub.
2. **Import Project into Vercel**.
3. **Set Environment Variables in Vercel Project Settings**:
   - `MONGODB_URI`
   - `CLOUDFLARE_R2_ACCOUNT_ID`, `CLOUDFLARE_R2_ACCESS_KEY_ID`, `CLOUDFLARE_R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_R2_BUCKET_NAME`, `CLOUDFLARE_R2_PUBLIC_URL`
   - `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `NOTIFICATION_EMAIL_TO`
   - `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
4. **Deploy**: Build command: `next build --webpack`.
