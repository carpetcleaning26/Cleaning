import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { BLOG_POSTS } from '@/data/canberraData';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

interface BlogSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | Canberra Carpet Cleaning Deals`,
    description: post.excerpt
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: BlogSlugProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <div className="bg-[#043d22] text-white py-14 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-[#facc15] font-bold hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog Articles</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-emerald-100 font-semibold">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-md border border-emerald-100">
          <RemoteImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <article className="bg-[#f4f8f5] border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
          <div className="p-4 bg-emerald-100/60 border-l-4 border-[#085032] rounded-r-xl italic text-slate-900 font-bold">
            "{post.excerpt}"
          </div>

          <div className="space-y-4">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={i} className="text-xl font-black text-slate-900 pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </div>
        </article>

        {/* CTA Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#043d22] text-white space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between border-l-8 border-[#facc15] shadow-xl">
          <div className="space-y-1">
            <h4 className="text-2xl font-black text-white">Need Professional Carpet Cleaning in Canberra?</h4>
            <p className="text-xs text-emerald-100">Book online in 60 seconds with our 20% online booking discount.</p>
          </div>
          <div className="flex gap-3 whitespace-nowrap">
            <Link href="/instant-quote" className="btn-yellow-pill px-6 py-3.5 text-xs uppercase tracking-wider">
              INSTANT QUOTE
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}

