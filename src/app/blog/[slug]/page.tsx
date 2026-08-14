import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { getBlogPostBySlug, getPublicBlogPosts } from '@/lib/publicData';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

interface BlogSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | Canberra Carpet Cleaning Deals`,
    description: post.excerpt
  };
}

export async function generateStaticParams() {
  const posts = await getPublicBlogPosts();
  return posts.map((p: any) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: BlogSlugProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

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

        <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4 font-medium">
          {post.content.split('\n\n').map((paragraph: string, idx: number) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-black text-slate-900 pt-4 pb-2 border-b border-slate-200">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            return <p key={idx} className="text-slate-700 leading-relaxed">{paragraph}</p>;
          })}
        </div>

      </div>

      <Footer />
    </main>
  );
}
