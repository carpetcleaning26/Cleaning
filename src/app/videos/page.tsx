import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { VIDEOS_LIST } from '@/data/canberraData';
import { Video, Sparkles, Play } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Video Demonstrations | Canberra Carpet Cleaning Deals",
  description: "Watch video demonstrations of our truck-mounted hot water extraction, stain removal, and tile hydro-scrubbing in action."
};

export default function VideosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-[#0b132b] via-[#0c4a6e] to-[#0b132b] text-white py-14 px-4 border-b border-sky-950 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-900/60 text-[#10b981] text-xs font-black uppercase border border-sky-800">
            <Video className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Real Job & Equipment Video Demonstrations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Cleaning Video Showcase</h1>
          <p className="text-sky-200 text-sm max-w-xl mx-auto font-medium">
            Watch our truck-mounted hot water extraction equipment and technicians in action across Canberra.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS_LIST.map((v) => (
            <div key={v.id} className="bg-[#f8fafc] border border-sky-100 rounded-3xl overflow-hidden shadow-xs space-y-3 hover:border-[#0284c7] transition-all duration-300 flex flex-col justify-between">
              
              <div className="relative w-full bg-slate-950 aspect-video overflow-hidden rounded-t-3xl">
                <video 
                  controls 
                  preload="metadata" 
                  poster={v.thumbnail} 
                  className="w-full h-full object-cover"
                >
                  <source src={v.videoUrl} type="video/mp4" />
                  Your browser does not support playing HTML5 video clips.
                </video>
              </div>

              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#10b981]">
                  <span>OFFICIAL CANBERRA DEMO</span>
                  <span className="bg-sky-100 text-[#0284c7] px-2 py-0.5 rounded font-black">{v.duration}</span>
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 leading-snug">{v.title}</h2>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Band */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b132b] text-white text-center space-y-4 border-l-8 border-[#10b981] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black text-white">Ready for clean carpets in your Canberra home?</h3>
          <p className="text-xs text-sky-200">Book online in 60 seconds with our 20% online booking discount auto-applied.</p>
          <div className="flex justify-center gap-3 whitespace-nowrap pt-2">
            <Link href="/instant-quote" className="btn-primary-green px-8 py-4 text-xs uppercase tracking-wider shadow-lg">
              INSTANT QUOTE CALCULATOR
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


