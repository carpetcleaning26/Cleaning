'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { BUSINESS_INFO, SERVICES } from '@/data/canberraData';
import { CheckCircle2, ShieldCheck, Award, Users, Calendar, MapPin, Sparkles, Phone, ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-[#0b132b] via-[#0c4a6e] to-[#0b132b] text-white py-16 px-4 border-b border-sky-950 shadow-md">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-900/60 text-[#10b981] text-xs font-black uppercase tracking-wider border border-sky-800">
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
            <span>FAMILY OWNED & OPERATED SINCE 2008</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">About Canberra Carpet Cleaning Deals</h1>
        </div>
      </div>

      {/* Main About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Company History Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#085032] text-xs font-black uppercase border border-emerald-200">
              <Award className="w-4 h-4 text-[#085032]" />
              <span>OUR COMPANY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Family-Owned Canberra Carpet Cleaning Since 2008
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              Canberra Carpet Cleaning Deals has been serving households and businesses across the ACT for over 17 years. We're a family-owned and operated cleaning service based in Taylor, with a team that knows every Canberra suburb — from Belconnen apartments to Tuggeranong family homes, Gungahlin rentals, and Woden Valley heritage properties.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              Since 2008, we've completed more than 100,000 cleaning jobs across the ACT and surrounding areas, earning a 5-star Google rating from verified customers. Most of our work comes from repeat customers and referrals.
            </p>

            {/* 4 Checklist Badges */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">Family Owned</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Serving Canberra Since 2008</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">Truck Mounted Equipment</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Deep Cleaning Technology</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">Eco Friendly</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Safe For Kids & Pets</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">100% Satisfaction</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Guaranteed Every Time</div>
                </div>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-md border border-sky-100">
                <RemoteImage src="/pictures/real_image_20.jpeg" alt="Canberra Carpet Cleaning Deals van fleet at Taylor ACT base" className="w-full h-full object-cover" />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-md border border-sky-100 mt-6">
                <RemoteImage src="/pictures/real_image_1.jpeg" alt="Truck-mounted carpet steam cleaning in Canberra home" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats Row with AnimatedCounter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-4 p-8 bg-[#f4f8f5] rounded-3xl border border-emerald-100 text-center shadow-xs"
        >
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[#085032]">
              <AnimatedCounter value={17} suffix="+" />
            </div>
            <div className="text-xs text-slate-600 font-bold uppercase mt-1">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[#085032]">
              <AnimatedCounter value={100000} suffix="+" />
            </div>
            <div className="text-xs text-slate-600 font-bold uppercase mt-1">Jobs Completed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-[#085032]">
              <AnimatedCounter value={5.0} decimals={1} suffix="★" />
            </div>
            <div className="text-xs text-slate-600 font-bold uppercase mt-1">Google Rating</div>
          </div>
        </motion.div>

        {/* Feature Cards with Top Border Accents */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-white border border-emerald-100 border-t-4 border-t-[#085032] space-y-3 shadow-xs transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Service Across All ACT Suburbs</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              We service every Canberra district — Belconnen, Gungahlin, Tuggeranong, Woden Valley, Molonglo Valley, Canberra City, plus surrounding areas including Bungendore and Yass. There's no travel surcharge within the ACT, and same-day service is available across most suburbs when booked before 11am.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-white border border-emerald-100 border-t-4 border-t-[#085032] space-y-3 shadow-xs transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Our Guarantee</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Every job comes with our 100% satisfaction guarantee. If you're not happy with the result, we'll come back and fix it — no extra charge, no arguments. For end-of-lease cleans, we offer a bond-back guarantee: if your property manager raises any carpet cleaning issues during the inspection, we return free of charge.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-3xl bg-white border border-emerald-100 border-t-4 border-t-[#085032] space-y-3 shadow-xs transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold shadow-xs">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Get In Touch</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Whether you need a one-off carpet clean before guests arrive, regular maintenance for your home or office, or an urgent end-of-lease bond clean, we're ready to help. Call 0481 734 225 or email info@canberracarpetcleaningdeals.com.au for a quick chat, or use our instant quote calculator to see your price in 60 seconds with the 20% online booking discount auto-applied.
            </p>
          </motion.div>
        </div>

        {/* Discover All 9 Mini Service Cards Grid */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#085032]">SPECIALIZED CARE</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Discover All 9 Cleaning Services</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, index) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="p-5 rounded-3xl bg-white border border-emerald-100 hover:border-[#085032] transition-all shadow-xs hover:shadow-md group flex flex-col justify-between h-full space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#085032] flex items-center justify-center font-bold transition-colors">
                      <Sparkles className="w-5 h-5 text-[#085032]" />
                    </div>
                    <span className="text-xs font-black text-[#085032] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      From {s.startingPrice}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#085032] transition-colors">
                      {s.navTitle || s.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium leading-relaxed">
                      {s.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-black text-[#085032] justify-between">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#085032]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}



