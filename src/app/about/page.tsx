'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { BUSINESS_INFO, SERVICES } from '@/data/canberraData';
import { CheckCircle2, ShieldCheck, Award, Users, Calendar, MapPin, Sparkles, Phone, ArrowRight, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function AboutPage() {
  const [serviceList, setServiceList] = useState<any[]>(SERVICES);

  useEffect(() => {
    fetch('/api/admin/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const publishedOnly = data.filter((s: any) => s.published !== false);
          if (publishedOnly.length > 0) {
            setServiceList(publishedOnly);
          }
        }
      })
      .catch(() => {});
  }, []);

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
                <span className="text-xs font-bold text-slate-800">Truck-Mounted Hot Water Extraction</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">100% Bond Return Guarantee</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">Eco-Friendly & Non-Toxic</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0" />
                <span className="text-xs font-bold text-slate-800">Same-Day Service Available</span>
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
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-emerald-200 shadow-xl group">
              <RemoteImage
                src="/pictures/real_image_1.jpeg"
                alt="Canberra Carpet Cleaning Deals van and team on site"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-black uppercase text-[#facc15] tracking-wider">ESTABLISHED 2008</div>
                <div className="text-lg font-black text-white">Serving Taylor, Gungahlin & all Canberra ACT suburbs</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Animated Counter Numbers */}
        <div className="py-10 bg-[#f4f8f5] rounded-3xl border border-emerald-100 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-emerald-200/60">
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#085032]">
                <AnimatedCounter value={17} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Years Experience</div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#085032]">
                <AnimatedCounter value={100000} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Jobs Completed</div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#085032]">
                <AnimatedCounter value={5} suffix=".0 ★" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Google Rating</div>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#085032]">
                <AnimatedCounter value={100} suffix="%" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Bond Return Guarantee</div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
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

        {/* Discover All 9 Cleaning Services Cards Grid with Real Client Photos from MongoDB */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#085032]">SPECIALIZED CARE</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Discover All 9 Cleaning Services</h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">Click any service to view full specifications, process steps, and pricing details.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceList.map((s, index) => (
              <motion.div
                key={s.id || s._id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-white border border-slate-200 hover:border-[#085032] overflow-hidden flex flex-col justify-between transition-all shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* Real Image Container */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <RemoteImage
                      src={s.image || `/pictures/real_image_${(index % 25) + 1}.jpeg`}
                      alt={s.title || s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                    {/* Price Pill Badge Overlay */}
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-[#10b981] text-white shadow-md uppercase tracking-wider">
                        From {s.startingPrice}
                      </span>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-xs">
                        {s.category || 'CANBERRA CARE'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-[#085032] transition-colors leading-tight">
                      {s.title || s.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                      {s.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="w-full border-t border-slate-100 mb-3"></div>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-center justify-between text-xs font-black text-[#085032] group-hover:text-[#059669] uppercase tracking-wider"
                  >
                    <span>Learn more & pricing</span>
                    <ArrowRight className="w-4 h-4 text-[#10b981] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
