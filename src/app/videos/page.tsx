import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { VIDEOS_LIST } from '@/data/canberraData';
import { Video, Play } from 'lucide-react';
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

      <div className="bg-[#043d22] text-white py-14 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase border border-emerald-700">
            <Video className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Equipment & Job Video Demonstrations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Cleaning Video Gallery</h1>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto font-medium">
            See how our industrial truck-mounted equipment delivers a deeper clean and faster drying times.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="grid md:grid-cols-3 gap-8">
          {VIDEOS_LIST.map((v, idx) => (
            <div key={idx} className="bg-[#f4f8f5] border border-emerald-100 rounded-3xl overflow-hidden shadow-xs group space-y-3 hover:-translate-y-1 hover:border-[#085032] transition-all duration-300">
              <div className="relative h-48 w-full bg-slate-900">
                <RemoteImage src={v.thumbnail} alt={v.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#facc15] text-[#043d22] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-[#043d22] ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-bold">
                  {v.duration}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h2 className="text-sm font-black text-slate-900 group-hover:text-[#085032] transition-colors">{v.title}</h2>
                <div className="text-[11px] text-slate-500 font-semibold">Canberra Carpet Cleaning Deals • Official Demonstration</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#043d22] text-white text-center space-y-4 border-l-8 border-[#facc15] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-black text-white">Ready for clean carpets in your Canberra home?</h3>
          <p className="text-xs text-emerald-100">Book online in 60 seconds with our 20% online booking discount auto-applied.</p>
          <div className="flex justify-center gap-3 whitespace-nowrap">
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

