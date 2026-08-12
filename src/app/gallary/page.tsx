import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { GALLERY_IMAGES } from '@/data/canberraData';
import { Camera } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photo Gallery | Canberra Carpet Cleaning Deals",
  description: "Before and after photo gallery of carpet steam cleaning, lounge restoration, and tile scrubbing across Canberra ACT."
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <div className="bg-[#043d22] text-white py-14 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase border border-emerald-700">
            <Camera className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Before & After Work Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Cleaning Photo Gallery</h1>
          <p className="text-emerald-100 text-sm max-w-xl mx-auto font-medium">
            Real photos from carpet, rug, couch, and tile cleaning jobs completed across Canberra.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="bg-[#f4f8f5] border border-emerald-100 rounded-3xl overflow-hidden shadow-xs group hover:-translate-y-1 hover:border-[#085032] transition-all duration-300">
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <RemoteImage
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-xs font-bold text-slate-800 text-center border-t border-emerald-100/80">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

