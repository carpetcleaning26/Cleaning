'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Tag, Check, ArrowRight, Sparkles, Info, Home, Layers, Armchair } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Header Banner */}
      <div className="bg-[#043d22] text-white py-16 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase tracking-wider border border-emerald-700">
            <Tag className="w-4 h-4 text-[#facc15]" />
            <span>20% Online Discount Auto-Applied</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Carpet Cleaning Prices Canberra</h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Transparent price guide for all ACT suburbs. Zero hidden call-out surprises.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-14">
        
        {/* Core Services Pricing Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#085032]">TRANSPARENT RATES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Core Cleaning Deals</h2>
            <p className="text-slate-600 text-sm font-medium">All prices shown include our 20% online booking discount.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Flagship Card: Carpet Steam Cleaning */}
            <motion.div
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-3xl p-8 border-2 border-[#085032] shadow-xl flex flex-col justify-between space-y-6 md:-translate-y-2"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#facc15] text-[#043d22] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-[#043d22]" />
                <span>MOST POPULAR CANBERRA DEAL</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6 text-[#085032]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Carpet Steam Cleaning</h3>
                    <p className="text-xs font-bold text-[#085032]">3 Rooms Minimum Base</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#085032]">$89</span>
                  <span className="text-xs font-bold text-slate-500">AUD / 3 Rooms</span>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Extra bedrooms at $27 / room</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Deep hot water extraction steam clean</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Free de-odorising treatment included</span>
                  </div>
                </div>
              </div>

              <Link
                href="/instant-quote"
                className="btn-yellow-pill w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get This Price</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Upholstery & Couch Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xs hover:border-[#085032] flex flex-col justify-between space-y-6 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold">
                    <Armchair className="w-6 h-6 text-[#085032]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Upholstery & Sofa</h3>
                    <p className="text-xs font-bold text-slate-500">Couch Seat Cleaning</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#085032]">$41</span>
                  <span className="text-xs font-bold text-slate-500">AUD / Seat</span>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Fabric stain & oil extraction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Zero travel surcharge within ACT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Gentle color-safe steam cleaning</span>
                  </div>
                </div>
              </div>

              <Link
                href="/instant-quote"
                className="btn-primary-green w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get This Price</span>
                <ArrowRight className="w-4 h-4 text-[#facc15]" />
              </Link>
            </motion.div>

            {/* Rug & Mattress Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xs hover:border-[#085032] flex flex-col justify-between space-y-6 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold">
                    <Layers className="w-6 h-6 text-[#085032]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Area Rugs</h3>
                    <p className="text-xs font-bold text-slate-500">Wool & Persian Rugs</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#085032]">$32</span>
                  <span className="text-xs font-bold text-slate-500">AUD / Rug</span>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Dye-safe wool washing process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Deep fringe & weave dust removal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                    <span>Fast drying steam wash</span>
                  </div>
                </div>
              </div>

              <Link
                href="/instant-quote"
                className="btn-primary-green w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <span>Get This Price</span>
                <ArrowRight className="w-4 h-4 text-[#facc15]" />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* 2-Column Itemized Price Table */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Itemized Room-by-Room Pricing Matrix</h2>
            <p className="text-xs text-slate-500 font-medium">*All prices shown include our 20% online booking discount. GST extra.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { item: 'Bedroom (up to 12m²)', price: '$27 / room', note: 'Standard bedroom steam wash' },
              { item: 'Living / Dining / Family Room', price: '$46 / area', note: 'Large open living spaces' },
              { item: 'Hallway', price: '$27 / hallway', note: 'High traffic corridor area' },
              { item: 'Walk-in Robe', price: '$5 / robe', note: 'Small closet area' },
              { item: 'Stairs (flight of 8-16 steps)', price: '$27 / flight', note: 'Deep staircase extraction' },
              { item: 'End-of-Lease Pet Flea Spray', price: '$79 total', note: 'Certified exit certificate' }
            ].map((row, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  idx % 2 === 0 ? 'bg-[#f4f8f5] border-emerald-100' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#085032] flex-shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-black text-slate-900">{row.item}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{row.note}</div>
                  </div>
                </div>
                <div className="text-sm font-black text-[#085032] flex-shrink-0">
                  {row.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Typical Example Cards */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#085032]">REALISTIC EXAMPLES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Typical Canberra Package Estimates</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#043d22] text-white space-y-4 shadow-xl border border-emerald-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#facc15] tracking-wider">APARTMENT PACKAGE</span>
                  <h3 className="text-xl font-black text-white">Typical 2-Bedroom Apartment</h3>
                </div>
                <Home className="w-6 h-6 text-[#facc15]" />
              </div>

              <ul className="text-xs text-emerald-100 space-y-1.5 font-medium border-t border-emerald-800 pt-3">
                <li>• 2 Bedrooms ($54)</li>
                <li>• 1 Hallway ($27)</li>
                <li>• Property Base Fee (~$73)</li>
                <li>• Includes 20% Online Discount</li>
              </ul>

              <div className="pt-2 border-t border-emerald-800 flex justify-between items-baseline">
                <span className="text-xs font-bold text-emerald-200">Total Estimate:</span>
                <span className="text-3xl font-black text-[#facc15]">≈ $173 <span className="text-xs font-normal text-emerald-200">+ GST</span></span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#043d22] text-white space-y-4 shadow-xl border border-emerald-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#facc15] tracking-wider">HOUSE PACKAGE</span>
                  <h3 className="text-xl font-black text-white">Typical 3-Bedroom Family House</h3>
                </div>
                <Home className="w-6 h-6 text-[#facc15]" />
              </div>

              <ul className="text-xs text-emerald-100 space-y-1.5 font-medium border-t border-emerald-800 pt-3">
                <li>• 3 Bedrooms ($81)</li>
                <li>• 1 Living Room ($46)</li>
                <li>• 1 Hallway ($27)</li>
                <li>• Property Base Fee (~$73)</li>
              </ul>

              <div className="pt-2 border-t border-emerald-800 flex justify-between items-baseline">
                <span className="text-xs font-bold text-emerald-200">Total Estimate:</span>
                <span className="text-3xl font-black text-[#facc15]">≈ $235 <span className="text-xs font-normal text-emerald-200">+ GST</span></span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer Callout Box */}
        <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 flex items-start gap-4 shadow-xs">
          <div className="p-2.5 rounded-2xl bg-[#085032] text-white flex-shrink-0">
            <Info className="w-5 h-5 text-[#facc15]" />
          </div>
          <div className="space-y-1 text-xs text-slate-700 font-medium">
            <h4 className="font-black text-slate-900 text-sm">Call-Out Fee & Minimum Charge Disclaimer</h4>
            <p className="leading-relaxed">
              Standard property call-out fees apply to cover truck equipment setup and travel across ACT suburbs. Minimum booking size is $89+GST. For custom requests or multi-story apartment stairs access, calculate your exact price online or contact our dispatch team.
            </p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 bg-[#043d22] text-white rounded-3xl space-y-4 text-center border-l-8 border-[#facc15] shadow-xl">
          <h3 className="text-2xl font-black text-white">Want an exact quote for your home?</h3>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto font-medium">
            Use our instant quote calculator to see live total including all items and discounts.
          </p>
          <Link
            href="/instant-quote"
            className="btn-yellow-pill inline-block px-8 py-4 text-xs uppercase tracking-wider shadow-md"
          >
            CALCULATE MY EXACT PRICE
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
}



