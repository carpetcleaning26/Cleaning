import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BUSINESS_INFO } from '@/data/canberraData';
import Link from 'next/link';
import { Tag, Check, Calendar, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Carpet Cleaning Prices Canberra | Official Price List 2026",
  description: "Transparent price guide for carpet steam cleaning in Canberra ACT. Bedroom $27, Living room $46, Couches $41/seat, Rugs $32. 20% online discount applied."
};

export default function PricesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black uppercase shadow-xs">
            <Tag className="w-3.5 h-3.5" />
            <span>20% Online Discount Auto-Applied</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Carpet Cleaning Prices Canberra</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">
            Transparent price guide for all ACT suburbs. Zero hidden call-out surprises.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
        
        {/* Main Price Table Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Carpet Steam Cleaning Rates (Inc 20% Discount)</h2>
            <p className="text-xs text-slate-500 font-medium">*All prices shown include our 20% online booking discount. GST extra.</p>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold">
            <div className="py-3 flex justify-between">
              <span className="text-slate-800 font-bold">Bedroom (up to 12m²)</span>
              <span className="text-lime-700 font-black">from $27</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-800 font-bold">Living / Dining / Family Room</span>
              <span className="text-lime-700 font-black">from $46</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-800 font-bold">Hallway</span>
              <span className="text-lime-700 font-black">from $27</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-800 font-bold">Walk-in Robe</span>
              <span className="text-lime-700 font-black">from $5</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-800 font-bold">Stairs (flight of 8-16 steps)</span>
              <span className="text-lime-700 font-black">from $27</span>
            </div>
            <div className="py-3 flex justify-between">
              <span className="text-slate-800 font-bold">Property Base Call-out Fee</span>
              <span className="text-sky-700 font-black">~$73</span>
            </div>
          </div>

          {/* Sample Jobs Box */}
          <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-2 text-xs">
            <div className="font-black text-slate-900 uppercase">Sample Job Estimates:</div>
            <div className="flex justify-between font-bold text-slate-700">
              <span>Sample 2-Bedroom Apartment (2 Beds + Hallway + Base):</span>
              <span className="text-sky-700 font-black">≈ $173 + GST</span>
            </div>
            <div className="flex justify-between font-bold text-slate-700">
              <span>Sample 3-Bedroom House (3 Beds + Living + Hallway + Base):</span>
              <span className="text-sky-700 font-black">≈ $235 + GST</span>
            </div>
          </div>
        </div>

        {/* Other Service Rates */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-md">
            <h3 className="text-lg font-black text-slate-900">Upholstery Cleaning Rates</h3>
            <div className="text-xs text-slate-600 space-y-2 font-medium">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span>Couch / Sofa Seats:</span>
                <span className="font-black text-lime-700">from $41 / seat</span>
              </div>
              <div className="text-[11px] text-slate-500">Zero call-out fee for upholstery-only bookings.</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-md">
            <h3 className="text-lg font-black text-slate-900">Rug Cleaning Rates</h3>
            <div className="text-xs text-slate-600 space-y-2 font-medium">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span>Accent & Area Rugs:</span>
                <span className="font-black text-lime-700">from $32 / rug</span>
              </div>
              <div className="text-[11px] text-slate-500">Dye-safe gentle washing for wool & Persian rugs.</div>
            </div>
          </div>
        </div>

        {/* Note & CTA */}
        <div className="p-8 bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl space-y-4 text-center border-l-8 border-lime-500 shadow-xl">
          <h3 className="text-xl font-black text-white">Want an exact quote for your home?</h3>
          <p className="text-xs text-slate-300">Use our instant quote calculator to see live total including all items and discounts.</p>
          <Link href="/instant-quote" className="inline-block px-8 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase shadow-md transition-transform active:scale-95">
            CALCULATE MY EXACT PRICE
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}

