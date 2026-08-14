import connectToDatabase from '@/lib/mongodb';
import QuoteSubmissionModel from '@/models/QuoteSubmission';
import ContactSubmissionModel from '@/models/ContactSubmission';
import ServiceModel from '@/models/Service';
import BlogPostModel from '@/models/BlogPost';
import Link from 'next/link';
import { FileSpreadsheet, MessageSquare, Layers, FileText, ArrowRight } from 'lucide-react';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminOverviewPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  await connectToDatabase().catch(() => {});

  const totalQuotes = await QuoteSubmissionModel.countDocuments().catch(() => 0);
  const totalContacts = await ContactSubmissionModel.countDocuments().catch(() => 0);
  const totalServices = await ServiceModel.countDocuments().catch(() => 0);
  const totalPosts = await BlogPostModel.countDocuments().catch(() => 0);

  const recentQuotes = await QuoteSubmissionModel.find().sort({ createdAt: -1 }).limit(5).catch(() => []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Dashboard Overview</h1>
        <p className="text-xs text-slate-500 font-medium">Welcome back, {session.email}. Here is your business activity breakdown.</p>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Quote Submissions</span>
            <FileSpreadsheet className="w-5 h-5 text-[#10b981]" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalQuotes}</div>
          <Link href="/admin/quotes" className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>View all submissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Contact Messages</span>
            <MessageSquare className="w-5 h-5 text-[#0284c7]" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalContacts}</div>
          <Link href="/admin/contacts" className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>View messages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Published Services</span>
            <Layers className="w-5 h-5 text-[#10b981]" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalServices}</div>
          <Link href="/admin/services" className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>Manage services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Blog Articles</span>
            <FileText className="w-5 h-5 text-[#0284c7]" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalPosts}</div>
          <Link href="/admin/blog" className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>Manage blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
          <div className="text-xs text-slate-500 py-6 text-center">No quote submissions recorded yet.</div>
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
