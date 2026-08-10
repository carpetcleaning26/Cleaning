import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { BLOG_POSTS } from '@/data/canberraData';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Canberra Cleaning Blog & Guides | 2026 Carpet Maintenance Tips",
  description: "Read expert carpet cleaning advice, rental inspection tips, and healthier home maintenance guides from Canberra's top-rated cleaners."
};

export default function BlogListingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cleaning Blog & Advice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Canberra Cleaning Guides (2026)</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">
            Expert advice from 17+ years cleaning carpets across the Australian Capital Territory.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              
              <div className="space-y-4">
                <div className="relative h-48 w-full bg-slate-100">
                  <RemoteImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-sky-600 text-white text-[10px] font-black uppercase shadow-xs">
                    Guide
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 hover:text-sky-700">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
                </Link>
              </div>

            </article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
