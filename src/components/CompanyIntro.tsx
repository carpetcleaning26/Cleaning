'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, Sparkles, Phone, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { COMPANY_INFO } from '@/data/cleaningData';
import { motion } from 'framer-motion';

export default function CompanyIntro() {
  return (
    <section className="py-16 bg-[#f0f9ff] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* CTA Strip Banner matching Reference Site */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 text-white p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-lime-500"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/20 text-lime-400 text-xs font-black uppercase tracking-wider border border-lime-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>Canberra's Trusted Cleaners</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Since 2008, we've fulfilled over <br className="hidden sm:inline" />
              <span className="text-lime-400">100k cleaning requests</span> in Canberra
            </h2>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            GET IN TOUCH
          </Link>
        </motion.div>

        {/* Introduce Our Company Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Cards with Overlapping Image Frame Effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* Visual Container */}
            <div className="relative rounded-3xl bg-white border border-slate-200 p-4 shadow-xl">
              
              {/* Main Large Image */}
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src="/images/couch-clean.png"
                  alt="Quality Cleaning Service Canberra"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping Small Accent Image Box */}
              <div className="absolute -bottom-6 -right-3 sm:right-6 w-36 sm:w-44 h-28 sm:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20 hidden xs:block">
                <Image
                  src="/images/tile-grout.jpg"
                  alt="Tile and Grout Deep Wash"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating 5.0 Google Review Badge Card */}
              <div className="absolute -bottom-6 left-4 right-4 sm:right-auto bg-white border border-slate-200 rounded-2xl p-4 shadow-xl flex items-center gap-4 z-30">
                <div className="w-14 h-14 rounded-xl bg-lime-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-md">
                  <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
                  <span className="text-base font-black leading-none">5.0</span>
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    BASED ON VERIFIED GOOGLE REVIEWS
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    Trusted Canberra cleaners since 2008
                  </div>
                </div>
              </div>

            </div>

          </motion.div>

          {/* Right Text Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 space-y-6 pt-4 lg:pt-0"
          >
            
            {/* Section Subtitle */}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-700">
              <span className="w-8 h-0.5 bg-sky-600"></span>
              <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
              <span>INTRODUCE OUR COMPANY</span>
              <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
              <span className="w-8 h-0.5 bg-sky-600"></span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              We'll take care of the <br />
              <span className="text-sky-600">Cleaning and the errands</span>
            </h2>

            <p className="text-slate-600 font-medium text-base leading-relaxed">
              Professional cleaning service constantly striving for 100% customer satisfaction across all Canberra suburbs.
            </p>

            {/* Feature Box 1 */}
            <div className="p-5 rounded-2xl bg-white border border-sky-200 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Quality Cleaning Service</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Experience pristine cleanliness with our eco-friendly products and meticulous techniques. Guaranteed satisfaction with every corner spotless.
                </p>
              </div>
            </div>

            {/* Feature Box 2 */}
            <div className="p-5 rounded-2xl bg-white border border-sky-200 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-lime-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Top Canberra Cleaners</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Experience unparalleled cleanliness and exceptional service with Canberra's top-rated cleaning professionals.
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>EXPLORE ALL SERVICES</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </Link>

              <a
                href={COMPANY_INFO.telLink}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-sky-50 text-sky-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-sky-300 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}


