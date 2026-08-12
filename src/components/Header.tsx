'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUSINESS_INFO, SERVICES } from '@/data/canberraData';
import { Phone, MapPin, Mail, Sparkles, ChevronDown, Calendar, Menu, X, Clock } from 'lucide-react';
import RemoteImage from './RemoteImage';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top Utility Bar */}
      <div className="bg-[#043d22] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1.5 font-medium text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-[#facc15]" />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-medium text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{BUSINESS_INFO.hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors flex items-center gap-1 text-emerald-100">
              <Mail className="w-3.5 h-3.5 text-emerald-300" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
            <span className="opacity-30 text-emerald-600">|</span>
            <a href={BUSINESS_INFO.telLink} className="text-[#facc15] hover:text-white transition-colors flex items-center gap-1 font-black">
              <Phone className="w-3.5 h-3.5 text-[#facc15]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <RemoteImage
            src={BUSINESS_INFO.logos.main}
            alt={BUSINESS_INFO.name}
            className="h-10 sm:h-12 w-auto object-contain"
            fallbackSrc="/images/hero-carpet.png"
          />
        </Link>

        {/* Global Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-800">
          <Link
            href="/"
            className={`transition-colors relative py-1 ${isActive('/') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            Home
            {isActive('/') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
          
          <Link
            href="/about"
            className={`transition-colors relative py-1 ${isActive('/about') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            About
            {isActive('/about') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>

          {/* Services Dropdown (9 Sub-links with Framer Motion) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/service-details"
              className={`flex items-center gap-1 py-2 transition-colors ${
                pathname.startsWith('/services') || pathname === '/service-details' ? 'text-[#085032] font-black' : 'hover:text-[#085032]'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-[#085032]' : ''}`} />
            </Link>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 w-80 bg-white border border-emerald-100 rounded-2xl shadow-xl p-3 grid gap-1 z-50"
                >
                  <div className="text-[10px] uppercase font-black tracking-wider text-[#085032] px-3 py-1 border-b border-emerald-100 flex items-center justify-between">
                    <span>9 Specialized Services</span>
                    <Sparkles className="w-3 h-3 text-[#085032]" />
                  </div>
                  {SERVICES.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-[#f4f8f5] transition-colors group flex items-start gap-2.5"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 group-hover:bg-[#085032] text-[#085032] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 group-hover:text-[#085032]">
                          {srv.navTitle}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{srv.shortDesc}</div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/instant-quote"
            className={`transition-colors relative py-1 ${isActive('/instant-quote') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            Quote Calculator
            {isActive('/instant-quote') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
          <Link
            href="/suburbs"
            className={`transition-colors relative py-1 ${isActive('/suburbs') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            Service Areas
            {isActive('/suburbs') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
          <Link
            href="/faq"
            className={`transition-colors relative py-1 ${isActive('/faq') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            FAQs
            {isActive('/faq') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
          <Link
            href="/carpet-cleaning-prices-canberra"
            className={`transition-colors relative py-1 ${isActive('/carpet-cleaning-prices-canberra') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            Prices
            {isActive('/carpet-cleaning-prices-canberra') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
          <Link
            href="/blog"
            className={`transition-colors relative py-1 ${isActive('/blog') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            Blog
            {isActive('/blog') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
          <Link
            href="/contact"
            className={`transition-colors relative py-1 ${isActive('/contact') ? 'text-[#085032] font-black' : 'hover:text-[#085032]'}`}
          >
            Contact
            {isActive('/contact') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#085032] rounded-full"></span>}
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={BUSINESS_INFO.telLink}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#085032] text-[#085032] bg-emerald-50/50 hover:bg-[#085032] hover:text-white transition-all font-bold text-xs shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            <span>CALL NOW ({BUSINESS_INFO.phone})</span>
          </a>

          <Link
            href="/instant-quote"
            className="px-5 py-2.5 rounded-full bg-[#085032] hover:bg-[#043d22] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK NOW</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2 font-bold text-slate-800 text-sm">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Home
              </Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                About Us
              </Link>
              <Link href="/service-details" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Services Hub (9 Services)
              </Link>
              
              {/* Mobile Sub-links */}
              <div className="pl-4 space-y-1 text-xs text-slate-600 font-semibold border-l-2 border-[#085032]">
                {SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-[#085032]"
                  >
                    • {s.navTitle}
                  </Link>
                ))}
              </div>

              <Link href="/instant-quote" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Quote Calculator
              </Link>
              <Link href="/suburbs" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Service Areas
              </Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                FAQs
              </Link>
              <Link href="/carpet-cleaning-prices-canberra" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Prices
              </Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Blog
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#f4f8f5]">
                Contact
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/instant-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#085032] text-white font-black text-center text-xs uppercase shadow-md"
              >
                BOOK NOW ONLINE
              </Link>
              <a
                href={BUSINESS_INFO.telLink}
                className="w-full py-3 rounded-full border-2 border-[#085032] text-[#085032] font-bold text-center text-xs uppercase shadow-md"
              >
                CALL {BUSINESS_INFO.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

