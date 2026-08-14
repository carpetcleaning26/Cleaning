import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { getPublicBlogPosts } from '@/lib/publicData';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Canberra Cleaning Blog & Guides | 2026 Carpet Maintenance Tips",
  description: "Read expert carpet cleaning advice, rental inspection tips, and healthier home maintenance guides from Canberra's top-rated cleaners."
};

export default async function BlogListingPage() {
  const posts = await getPublicBlogPosts();

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <div className="bg-[#043d22] text-white py-14 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Cleaning Blog & Advice</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Canberra Cleaning Guides (2026)</h1>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto font-medium">
            Expert advice from 17+ years cleaning carpets across the Australian Capital Territory.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post: any) => (
            <article key={post.id || post._id} className="bg-[#f4f8f5] border border-emerald-100 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              
              <div className="space-y-4">
                <div className="relative h-48 w-full bg-slate-100">
                  <RemoteImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#085032] text-white text-[10px] font-black uppercase shadow-xs">
                    Guide
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#085032]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#085032]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-900 group-hover:text-[#085032] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#085032] group-hover:underline uppercase tracking-wider"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
