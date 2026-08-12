'use client';

import Link from 'next/link';
import { PRICING_PACKAGES } from '@/data/cleaningData';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingTableProps {
  onOpenCalculator?: () => void;
}

export default function PricingTable({ onOpenCalculator }: PricingTableProps) {
  return (
    <section id="pricing" className="py-20 bg-[#f4f8f5] relative border-b border-emerald-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-[#085032] text-xs font-black uppercase tracking-wider shadow-xs">
            <Zap className="w-4 h-4 text-[#085032]" />
            <span>Clear & Upfront Canberra Deals</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Transparent Pricing. Zero Hidden Fees.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Choose from our standard Canberra deals or customize your cleaning requirements.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-white border-2 border-[#085032] shadow-xl md:-translate-y-2 hover:-translate-y-3'
                  : 'bg-white border border-emerald-100 hover:border-[#085032] shadow-sm hover:shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Popular Badge Header */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#facc15] text-[#043d22] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
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
                  <span className="text-4xl sm:text-5xl font-black text-[#085032]">{pkg.price}</span>
                  <span className="text-xs font-bold text-slate-500">AUD Total</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Included Package Features:</div>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-[#085032] flex-shrink-0 mt-0.5" />
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
                    className={`w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                      pkg.popular
                        ? 'btn-yellow-pill'
                        : 'btn-primary-green'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href="/instant-quote"
                    className={`w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md ${
                      pkg.popular
                        ? 'btn-yellow-pill'
                        : 'btn-primary-green'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


