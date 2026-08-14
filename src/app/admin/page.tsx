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

  await connectToDatabase();

  const totalQuotes = await QuoteSubmissionModel.countDocuments();
  const totalContacts = await ContactSubmissionModel.countDocuments();
  const totalServices = await ServiceModel.countDocuments();
  const totalPosts = await BlogPostModel.countDocuments();

  const recentQuotes = await QuoteSubmissionModel.find().sort({ createdAt: -1 }).limit(5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Dashboard Overview</h1>
        <p className="text-xs text-slate-400 font-medium">Welcome back, {session.email}. Here is your business activity breakdown.</p>
      </div>

      {/* Analytics Counter Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-[#0b132b] border border-sky-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300 uppercase">Quote Submissions</span>
            <FileSpreadsheet className="w-5 h-5 text-[#10b981]" />
          </div>
          <div className="text-3xl font-black text-white">{totalQuotes}</div>
          <Link href="/admin/quotes" className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>View all submissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b132b] border border-sky-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300 uppercase">Contact Messages</span>
            <MessageSquare className="w-5 h-5 text-[#0284c7]" />
          </div>
          <div className="text-3xl font-black text-white">{totalContacts}</div>
          <Link href="/admin/contacts" className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>View messages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b132b] border border-sky-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300 uppercase">Published Services</span>
            <Layers className="w-5 h-5 text-[#10b981]" />
          </div>
          <div className="text-3xl font-black text-white">{totalServices}</div>
          <Link href="/admin/services" className="text-xs font-bold text-[#10b981] hover:underline flex items-center gap-1">
            <span>Manage services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-3xl bg-[#0b132b] border border-sky-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300 uppercase">Blog Articles</span>
            <FileText className="w-5 h-5 text-[#0284c7]" />
          </div>
          <div className="text-3xl font-black text-white">{totalPosts}</div>
          <Link href="/admin/blog" className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1">
            <span>Manage blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Recent Quote Requests */}
      <div className="p-6 rounded-3xl bg-[#0b132b] border border-sky-900 space-y-4">
        <div className="flex items-center justify-between border-b border-sky-900/60 pb-3">
          <h2 className="text-base font-black text-white">Recent Quote Submissions</h2>
          <Link href="/admin/quotes" className="text-xs font-bold text-[#10b981]">View All Quotes →</Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="text-xs text-slate-400 py-6 text-center">No quote submissions recorded yet.</div>
        ) : (
          <div className="divide-y divide-sky-900/60">
            {recentQuotes.map((q: any) => (
              <div key={q._id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{q.customerName} ({q.suburb})</div>
                  <div className="text-sky-300 text-[11px]">{q.email} • {q.phone} • Ref: {q.referenceId}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#10b981] text-sm">${q.totalAmount} AUD</div>
                  <span className="px-2 py-0.5 rounded-full bg-sky-900 text-sky-200 text-[10px] font-bold uppercase">{q.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
