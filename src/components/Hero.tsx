'use client';

import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/cleaningData';
import { Star, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenCalculator?: () => void;
}

export default function Hero({ onOpenCalculator }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-r from-[#0c4a6e] via-[#0284c7] to-[#0c4a6e] text-white border-b border-sky-900">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            
            {/* Small Uppercase Eyebrow Line */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0b132b] border border-sky-400/30 text-[#34d399] text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
              <span>TRUSTED CANBERRA CLEANERS SINCE 2008</span>
            </div>

            {/* Large Bold Multi-line Headline (3 lines mixing solid white & highlighted green) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              WE'VE BUILT OUR<br />
              <span className="text-[#34d399]">CANBERRA BUSINESS ON</span><br />
              100,000+ CLEAN HOMES
            </h1>

            {/* Supporting Text (Short, 2 lines max) */}
            <p className="text-base sm:text-lg text-sky-100/90 max-w-xl font-medium leading-relaxed">
              Professional hot water steam extraction, 100% bond-back guarantee, sofa washing, and stain treatment across all Canberra ACT suburbs.
            </p>

            {/* Two CTA Buttons Side-by-Side + Price Anchor Line */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {onOpenCalculator ? (
                  <button
                    onClick={onOpenCalculator}
                    className="btn-primary-green px-8 py-4 text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <span>Get Instant Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <Link
                    href="/instant-quote"
                    className="btn-primary-green px-8 py-4 text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-3 group text-center"
                  >
                    <span>Get Instant Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}

                <Link
                  href="/service-details"
                  className="btn-white-ghost-pill px-8 py-4 text-sm uppercase tracking-wider text-center"
                >
                  What We Can Do
                </Link>
              </div>

              {/* Price Anchor Line Underneath */}
              <div className="text-xs font-bold text-sky-100 flex items-center gap-2 pt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span>Prices start from <strong>$27/room</strong> • 100% Bond Back Guarantee</span>
              </div>
            </div>

            {/* Key Trust Stats Pill Bar */}
            <div className="pt-6 border-t border-sky-700/80 flex flex-wrap items-center gap-6 text-xs text-sky-100 font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-white">5.0 Google Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#34d399]" />
                <span>100k+ Canberra Jobs Done</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Photo with Organic Swooped Masking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Organic Corner Masked Container */}
              <div className="hero-organic-mask relative h-72 sm:h-96 lg:h-[460px] w-full overflow-hidden border-4 border-white/20 shadow-2xl bg-sky-950">
                <Image
                  src="/images/hero-carpet.png"
                  alt="Canberra Professional Carpet Steam Cleaning"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/80 via-transparent to-transparent"></div>

                {/* Floating Special Offer Tag */}
                <div className="absolute top-6 right-6 bg-[#10b981] text-white px-4 py-2 rounded-full text-xs font-black shadow-lg uppercase tracking-wider">
                  DEALS FROM $27 / ROOM
                </div>

                {/* Bottom Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl text-slate-900 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-black uppercase text-[#0284c7] tracking-wider">CANBERRA STEAM CLEANERS</div>
                    <div className="text-sm font-black text-slate-900">Same-Day Dispatch Available</div>
                  </div>
                  <a
                    href={COMPANY_INFO.telLink}
                    className="w-10 h-10 rounded-full bg-[#0284c7] text-white flex items-center justify-center shadow-md hover:bg-[#0369a1] transition-colors"
                    aria-label="Call Now"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



