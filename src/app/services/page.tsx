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
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-sky-700 text-white py-16 px-4 border-b border-sky-800">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Service Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Professional Cleaning Services in Canberra
          </h1>
          <p className="text-sky-100 max-w-2xl mx-auto text-base font-medium">
            From deep steam carpet restoration to agent-approved end of lease bond cleans and tile grout scrubbing.
          </p>
        </div>
      </div>

      <ServiceCatalog />

      {/* CTA Box */}
      <div className="py-16 bg-white border-t border-slate-200">
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
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-lime-600 text-white font-black text-sm shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Instant Quote Calculator</span>
            </Link>
            <a
              href={COMPANY_INFO.telLink}
              className="px-8 py-3.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-300 font-bold text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>Call {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
