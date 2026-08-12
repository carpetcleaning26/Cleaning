import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { SERVICES } from '@/data/canberraData';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All 9 Cleaning Services Canberra | Carpet, Couch, Rug & Tile Cleaners",
  description: "Explore all 9 specialized cleaning services by Canberra Carpet Cleaning Deals: Carpet Steam, Curtains, Upholstery, Mattress, Rugs, Water Damage, Tiles, Commercial & Pest Control."
};

export default function ServicesHubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Banner */}
      <div className="bg-[#043d22] text-white py-14 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-7xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Complete Services Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Our 9 Specialized Cleaning Services</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-sm font-medium">
            Truck-mounted hot water extraction, certified pest treatments, and guaranteed bond-back cleans across all ACT suburbs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((srv) => (
            <div key={srv.id} className="bg-[#f4f8f5] border border-emerald-100 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="relative h-48 w-full bg-slate-100">
                  <RemoteImage src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#085032] text-white text-[11px] font-black uppercase shadow-xs">
                    From {srv.startingPrice}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-[#085032] transition-colors">{srv.name}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {srv.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/services/${srv.slug}`}
                  className="btn-primary-green w-full py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>View Full Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#facc15]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#043d22] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-l-8 border-[#facc15] shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-black text-white">Need an immediate quote for multiple services?</h3>
            <p className="text-xs text-emerald-100">Use our instant quote calculator with auto-applied 20% online discount.</p>
          </div>
          <div className="flex gap-3 whitespace-nowrap">
            <Link href="/instant-quote" className="btn-yellow-pill px-6 py-3.5 text-xs uppercase tracking-wider">
              QUOTE CALCULATOR
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

