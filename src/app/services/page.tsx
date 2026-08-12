import Header from '@/components/Header';
import ServiceCatalog from '@/components/ServiceCatalog';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { COMPANY_INFO } from '@/data/cleaningData';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Cleaning Services Canberra | Carpet Steam, Upholstery & Bond Clean",
  description: "Browse all cleaning services offered in Canberra: Carpet Steam Cleaning, End of Lease Bond Clean, Couch Washing, Tile Scrubbing, Mattress Sanitization & Pest Control."
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Page Header Banner */}
      <div className="bg-[#043d22] text-white py-16 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase tracking-wider border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Full Service Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Professional Cleaning Services in Canberra
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-base font-medium">
            From deep steam carpet restoration to agent-approved end of lease bond cleans and tile grout scrubbing.
          </p>
        </div>
      </div>

      <ServiceCatalog />

      {/* CTA Box */}
      <div className="py-16 bg-[#f4f8f5] border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ready to Book Your Cleaning Deal in Canberra?
          </h2>
          <p className="text-slate-600 font-medium">
            Get an instant price estimate using our online calculator or call our team for same-day dispatches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/instant-quote"
              className="btn-yellow-pill px-8 py-3.5 text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Instant Quote Calculator</span>
            </Link>
            <a
              href={COMPANY_INFO.telLink}
              className="btn-ghost-pill px-8 py-3.5 text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

