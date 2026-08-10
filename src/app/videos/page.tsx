import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { VIDEOS_LIST, BUSINESS_INFO } from '@/data/canberraData';
import { Video, Play, Phone } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Video Demonstrations | Canberra Carpet Cleaning Deals",
  description: "Watch video demonstrations of our truck-mounted hot water extraction, stain removal, and tile hydro-scrubbing in action."
};

export default function VideosPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black uppercase shadow-xs">
            <Video className="w-3.5 h-3.5" />
            <span>Equipment & Job Video Demonstrations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Cleaning Video Gallery</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">
            See how our industrial truck-mounted equipment delivers a deeper clean and faster drying times.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="grid md:grid-cols-3 gap-8">
          {VIDEOS_LIST.map((v, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md group space-y-3 hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 w-full bg-slate-900">
                <RemoteImage src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-lime-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-slate-950 ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-bold">
                  {v.duration}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h2 className="text-sm font-black text-slate-900">{v.title}</h2>
                <div className="text-[11px] text-slate-500 font-semibold">Canberra Carpet Cleaning Deals • Official Demonstration</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white text-center space-y-4 border-l-8 border-lime-500 shadow-xl">
          <h3 className="text-xl font-black text-white">Ready for clean carpets in your Canberra home?</h3>
          <p className="text-xs text-slate-300">Book online in 60 seconds with our 20% online booking discount auto-applied.</p>
          <div className="flex justify-center gap-3">
            <Link href="/instant-quote" className="px-6 py-3 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase shadow-md transition-transform active:scale-95">
              INSTANT QUOTE
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
