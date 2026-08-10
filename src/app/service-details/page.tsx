import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { SERVICES, BUSINESS_INFO } from '@/data/canberraData';
import Link from 'next/link';
import { ArrowRight, Sparkles, Phone, Calendar } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All 9 Cleaning Services Canberra | Carpet, Couch, Rug & Tile Cleaners",
  description: "Explore all 9 specialized cleaning services by Canberra Carpet Cleaning Deals: Carpet Steam, Curtains, Upholstery, Mattress, Rugs, Water Damage, Tiles, Commercial & Pest Control."
};

export default function ServicesHubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Services Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Our 9 Specialized Cleaning Services</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm font-medium">
            Truck-mounted hot water extraction, certified pest treatments, and guaranteed bond-back cleans across all ACT suburbs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((srv) => (
            <div key={srv.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-4">
                <div className="relative h-48 w-full bg-slate-100">
                  <RemoteImage src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black uppercase shadow-xs">
                    From {srv.startingPrice}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h2 className="text-xl font-black text-slate-900">{srv.name}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                    {srv.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/services/${srv.slug}`}
                  className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>View Full Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-l-8 border-lime-500 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-black text-white">Need an immediate quote for multiple services?</h3>
            <p className="text-xs text-slate-300">Use our instant quote calculator with auto-applied 20% online discount.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/instant-quote" className="px-6 py-3 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase shadow-md transition-transform active:scale-95">
              QUOTE CALCULATOR
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
