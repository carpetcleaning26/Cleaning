import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { getPublicGalleryItems } from '@/lib/publicData';
import { Camera } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Photo Gallery | Canberra Carpet Cleaning Deals",
  description: "Before and after photo gallery of carpet steam cleaning, lounge restoration, and tile scrubbing across Canberra ACT."
};

export default async function GalleryPage() {
  const images = await getPublicGalleryItems();

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-[#0b132b] via-[#0c4a6e] to-[#0b132b] text-white py-14 px-4 border-b border-sky-950 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-900/60 text-[#10b981] text-xs font-black uppercase border border-sky-800">
            <Camera className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Real Job & Equipment Photos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Cleaning Photo Showcase</h1>
          <p className="text-sky-200 text-sm max-w-xl mx-auto font-medium">
            Authentic photos of our service vans, technicians, carpet steam cleaning, upholstery washing, and tile restoration across Canberra ACT.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img: any, idx: number) => (
            <div key={img._id || idx} className="bg-[#f8fafc] border border-sky-100 rounded-3xl overflow-hidden shadow-xs group hover:-translate-y-1 hover:border-[#0284c7] transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                <RemoteImage
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-xs font-bold text-slate-800 text-center border-t border-sky-100/80 bg-white">
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
