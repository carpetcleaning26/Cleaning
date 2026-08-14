import connectToDatabase from '@/lib/mongodb';
import { ensureDatabaseSeeded } from '@/lib/autoSeed';
import QuoteSubmissionModel from '@/models/QuoteSubmission';
import ContactSubmissionModel from '@/models/ContactSubmission';
import ServiceModel from '@/models/Service';
import SuburbModel from '@/models/Suburb';
import FaqModel from '@/models/Faq';
import TestimonialModel from '@/models/Testimonial';
import BlogPostModel from '@/models/BlogPost';
import GalleryItemModel from '@/models/GalleryItem';
import VideoItemModel from '@/models/VideoItem';
import NewsletterSubscriberModel from '@/models/NewsletterSubscriber';

import Link from 'next/link';
import { 
  FileSpreadsheet, MessageSquare, Layers, MapPin, HelpCircle, Star, 
  FileText, Image as ImageIcon, Video, Mail, ArrowRight, Settings, Database, Sparkles 
} from 'lucide-react';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminOverviewPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  await connectToDatabase().catch(() => {});
  await ensureDatabaseSeeded().catch(() => {});

  const totalQuotes = await QuoteSubmissionModel.countDocuments().catch(() => 0);
  const totalContacts = await ContactSubmissionModel.countDocuments().catch(() => 0);
  const totalServices = await ServiceModel.countDocuments().catch(() => 0);
  const totalSuburbs = await SuburbModel.countDocuments().catch(() => 0);
  const totalFaqs = await FaqModel.countDocuments().catch(() => 0);
  const totalReviews = await TestimonialModel.countDocuments().catch(() => 0);
  const totalPosts = await BlogPostModel.countDocuments().catch(() => 0);
  const totalPhotos = await GalleryItemModel.countDocuments().catch(() => 0);
  const totalVideos = await VideoItemModel.countDocuments().catch(() => 0);
  const totalSubscribers = await NewsletterSubscriberModel.countDocuments().catch(() => 0);

  const recentQuotes = await QuoteSubmissionModel.find().sort({ createdAt: -1 }).limit(5).catch(() => []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Admin Overview Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Manage all website content, suburbs, services, FAQs, reviews, and bookings from here.</p>
        </div>
        <div className="flex items-center gap-3">
          <form action="/api/admin/seed" method="POST">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs uppercase flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Database className="w-4 h-4" />
              <span>Populate Database Now</span>
            </button>
          </form>
          <Link 
            href="/admin/settings"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Settings className="w-4 h-4 text-[#10b981]" />
            <span>Edit Settings</span>
          </Link>
        </div>
      </div>

      {/* Analytics Counter Grid (All 10 Content Collections) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        
        {/* 1. Services */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Services</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center"><Layers className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalServices}</div>
          <Link href="/admin/services" className="text-[11px] font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>Manage Services</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 2. Suburbs */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">ACT Suburbs</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center"><MapPin className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalSuburbs}</div>
          <Link href="/admin/suburbs" className="text-[11px] font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>Manage Suburbs</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 3. FAQs */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">FAQs</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center"><HelpCircle className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalFaqs}</div>
          <Link href="/admin/faqs" className="text-[11px] font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>Manage FAQs</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 4. Testimonials */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalReviews}</div>
          <Link href="/admin/testimonials" className="text-[11px] font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>Manage Reviews</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 5. Blog Posts */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Blog Articles</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center"><FileText className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalPosts}</div>
          <Link href="/admin/blog" className="text-[11px] font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>Manage Blog</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 6. Photo Gallery */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Gallery Photos</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center"><ImageIcon className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalPhotos}</div>
          <Link href="/admin/gallery" className="text-[11px] font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>Manage Gallery</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 7. Videos */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Video Clips</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center"><Video className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalVideos}</div>
          <Link href="/admin/videos" className="text-[11px] font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>Manage Videos</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 8. Quote Requests */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Quote Requests</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center"><FileSpreadsheet className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalQuotes}</div>
          <Link href="/admin/quotes" className="text-[11px] font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>View Quotes</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 9. Contact Messages */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-sky-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Messages</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center"><MessageSquare className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalContacts}</div>
          <Link href="/admin/contacts" className="text-[11px] font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>View Messages</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 10. Newsletter */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Subscribers</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center"><Mail className="w-4 h-4" /></div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalSubscribers}</div>
          <Link href="/admin/newsletter" className="text-[11px] font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>View Subscribers</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>

      {/* Recent Quote Requests */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-black text-slate-900">Recent Quote Submissions</h2>
          <Link href="/admin/quotes" className="text-xs font-bold text-[#10b981]">View All Quotes →</Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="text-xs text-slate-500 py-6 text-center font-medium">No quote submissions recorded yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentQuotes.map((q: any) => (
              <div key={q._id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{q.customerName} ({q.suburb})</div>
                  <div className="text-slate-500 text-[11px]">{q.email} • {q.phone} • Ref: {q.referenceId}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#10b981] text-sm">${q.totalAmount} AUD</div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
