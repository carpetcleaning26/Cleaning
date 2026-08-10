'use client';

import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/cleaningData';
import { Star, Phone, ArrowRight, CheckCircle2, Clock, MapPin, Zap, Fan } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenCalculator?: () => void;
}

export default function Hero({ onOpenCalculator }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-[#f0f9ff] border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950 text-lime-400 border border-lime-400/30 text-xs font-black uppercase tracking-wider shadow-md">
              <Fan className="w-4 h-4 text-lime-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>SAME-DAY SERVICE • ALL ACT SUBURBS</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] uppercase">
              CARPET, UPHOLSTERY,<br className="hidden sm:inline" />
              <span className="text-sky-600">RUGS, TILES &</span><br />
              <span className="text-lime-600">CURTAINS CLEANING</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Professional hot water steam extraction, 100% bond-back guarantee, sofa washing, and stain treatment across all Canberra ACT suburbs from just <strong className="text-slate-900 font-black">$27/room</strong>.
            </p>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-sky-200 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-lime-600 flex-shrink-0" />
                <span>100% Bond Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-sky-200 shadow-xs">
                <Zap className="w-4 h-4 text-sky-600 flex-shrink-0" />
                <span>Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-sky-200 col-span-2 sm:col-span-1 shadow-xs">
                <Clock className="w-4 h-4 text-sky-700 flex-shrink-0" />
                <span>2-4 Hr Rapid Drying</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              {onOpenCalculator ? (
                <button
                  onClick={onOpenCalculator}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between gap-4 group"
                >
                  <span>Get A Quote</span>
                  <span className="w-8 h-8 rounded-full bg-slate-950 text-lime-400 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              ) : (
                <Link
                  href="/instant-quote"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-between gap-4 group"
                >
                  <span>Get A Quote</span>
                  <span className="w-8 h-8 rounded-full bg-slate-950 text-lime-400 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )}

              <a
                href={COMPANY_INFO.telLink}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call Now: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            {/* Google Rating Bar */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">5.0 Google Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>All Canberra Suburbs</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Card Column with Ken Burns Zoom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Surface */}
              <div className="relative rounded-3xl bg-white border border-slate-200 p-3 shadow-xl overflow-hidden">
                
                {/* Hero Image */}
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/hero-carpet.png"
                    alt="Canberra Carpet Steam Cleaning Van Quality"
                    fill
                    className="object-cover object-center hover:scale-110 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-lime-400 px-3 py-1.5 rounded-full text-xs font-black text-slate-950 shadow-md uppercase tracking-wider">
                    SPECIAL OFFER: $27/ROOM
                  </div>
                </div>

                {/* Stat Box */}
                <div className="p-4 grid grid-cols-2 gap-3 mt-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500 font-bold">Canberra Jobs Done</div>
                    <div className="text-xl font-black text-slate-900">100,000+</div>
                  </div>

                  <div className="space-y-1 border-l border-slate-200 pl-3">
                    <div className="text-xs text-slate-500 font-bold">Response Time</div>
                    <div className="text-xl font-black text-sky-600">&lt; 15 Mins</div>
                  </div>
                </div>

                {/* Offer Strip */}
                <div className="mt-3 p-3 rounded-xl bg-[#f0f9ff] border border-sky-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-900 font-extrabold">Carpet Steam Deal</div>
                    <div className="text-lime-700 font-black text-sm">3 Rooms for $89</div>
                  </div>
                  {onOpenCalculator ? (
                    <button
                      onClick={onOpenCalculator}
                      className="px-4 py-2 rounded-full bg-sky-600 text-white font-black hover:bg-sky-500 transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      Book Now
                    </button>
                  ) : (
                    <Link
                      href="/instant-quote"
                      className="px-4 py-2 rounded-full bg-sky-600 text-white font-black hover:bg-sky-500 transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      Book Now
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

