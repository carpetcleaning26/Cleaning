import Link from 'next/link';
import { 
  LayoutDashboard, Layers, MapPin, HelpCircle, Star, 
  FileText, Image as ImageIcon, Video, Settings, FileSpreadsheet, 
  MessageSquare, Mail, LogOut, ShieldCheck 
} from 'lucide-react';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Allow login page to render without layout check
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0b132b] border-r border-sky-950 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="p-6 space-y-6">
          
          <div className="flex items-center gap-3 border-b border-sky-900/60 pb-4">
            <div className="w-9 h-9 rounded-xl bg-sky-900/80 text-[#10b981] flex items-center justify-center border border-sky-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-white">Canberra Cleaners</div>
              <div className="text-[10px] text-[#10b981] font-bold uppercase">Admin Dashboard</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-bold">
            <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <LayoutDashboard className="w-4 h-4 text-[#10b981]" />
              <span>Overview</span>
            </Link>
            <Link href="/admin/quotes" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <FileSpreadsheet className="w-4 h-4 text-[#0284c7]" />
              <span>Quote Requests</span>
            </Link>
            <Link href="/admin/contacts" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <MessageSquare className="w-4 h-4 text-[#10b981]" />
              <span>Contact Messages</span>
            </Link>
            <Link href="/admin/services" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <Layers className="w-4 h-4 text-[#0284c7]" />
              <span>Services</span>
            </Link>
            <Link href="/admin/suburbs" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <MapPin className="w-4 h-4 text-[#10b981]" />
              <span>Suburbs</span>
            </Link>
            <Link href="/admin/faqs" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <HelpCircle className="w-4 h-4 text-[#0284c7]" />
              <span>FAQs</span>
            </Link>
            <Link href="/admin/testimonials" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <Star className="w-4 h-4 text-[#10b981]" />
              <span>Testimonials</span>
            </Link>
            <Link href="/admin/blog" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <FileText className="w-4 h-4 text-[#0284c7]" />
              <span>Blog Articles</span>
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <ImageIcon className="w-4 h-4 text-[#10b981]" />
              <span>Photo Gallery</span>
            </Link>
            <Link href="/admin/videos" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <Video className="w-4 h-4 text-[#0284c7]" />
              <span>Videos</span>
            </Link>
            <Link href="/admin/newsletter" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <Mail className="w-4 h-4 text-[#10b981]" />
              <span>Newsletter List</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-sky-900/50 text-sky-100 transition-colors">
              <Settings className="w-4 h-4 text-[#0284c7]" />
              <span>Site Settings</span>
            </Link>
          </nav>

        </div>

        <div className="p-6 border-t border-sky-900/60 space-y-3">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 text-xs font-black transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="md:hidden bg-[#0b132b] p-4 border-b border-sky-900 flex items-center justify-between">
          <span className="font-black text-sm text-white">Canberra Cleaners Admin</span>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs font-bold text-red-300">Logout</button>
          </form>
        </header>
        <main className="p-6 sm:p-10 flex-1">{children}</main>
      </div>
    </div>
  );
}
