'use client';

import Link from 'next/link';
import { PRICING_PACKAGES } from '@/data/cleaningData';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface PricingTableProps {
  onOpenCalculator?: () => void;
}

export default function PricingTable({ onOpenCalculator }: PricingTableProps) {
  return (
    <section id="pricing" className="py-20 bg-[#f0f9ff] relative border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-100 border border-lime-300 text-lime-800 text-xs font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Clear & Upfront Canberra Deals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Transparent Pricing. Zero Hidden Fees.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Choose from our standard Canberra deals or customize your cleaning requirements.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white border-2 border-sky-500 shadow-2xl shadow-sky-500/15 md:-translate-y-2'
                  : 'bg-white border border-slate-200 hover:border-sky-300 shadow-md'
              }`}
            >
              {/* Popular Badge Header */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-600 to-lime-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{pkg.savings}</span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{pkg.title}</h3>
                  <p className="text-xs font-bold text-slate-500 mt-1">{pkg.subtitle}</p>
                </div>

                {/* Pricing Number Display */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">{pkg.price}</span>
                  <span className="text-xs font-bold text-slate-500">AUD Total</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Included Package Features:</div>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package CTA Button */}
              <div className="pt-8">
                {onOpenCalculator ? (
                  <button
                    onClick={onOpenCalculator}
                    className={`w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-lime-600 hover:from-sky-500 hover:to-lime-500 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href="/instant-quote"
                    className={`w-full py-3.5 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-sky-600 via-blue-600 to-lime-600 hover:from-sky-500 hover:to-lime-500 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
