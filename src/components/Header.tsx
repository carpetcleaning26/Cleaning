'use client';

import { useState, useEffect } from 'react';
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
  const [serviceList, setServiceList] = useState<any[]>(SERVICES);
  const [settings, setSettings] = useState<any>({
    phone: BUSINESS_INFO.phone,
    telLink: BUSINESS_INFO.telLink,
    email: BUSINESS_INFO.email,
    address: BUSINESS_INFO.address,
    hours: BUSINESS_INFO.hours,
  });

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

    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error && data.phone) {
          setSettings({
            phone: data.phone,
            telLink: `tel:${data.phone.replace(/\s+/g, '')}`,
            email: data.email || BUSINESS_INFO.email,
            address: data.address || BUSINESS_INFO.address,
            hours: data.hours || BUSINESS_INFO.hours,
          });
        }
      })
      .catch(() => {});
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top Utility Bar */}
      <div className="bg-[#0b132b] text-sky-100 text-xs py-2 px-4 border-b border-sky-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1.5 font-medium text-sky-100">
              <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
              <span>{settings.address}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-medium text-sky-100">
              <Clock className="w-3.5 h-3.5 text-sky-300" />
              <span>{settings.hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors flex items-center gap-1 text-sky-100">
              <Mail className="w-3.5 h-3.5 text-sky-300" />
              <span>{settings.email}</span>
            </a>
            <span className="opacity-30 text-sky-700">|</span>
            <a href={settings.telLink} className="text-[#10b981] hover:text-white transition-colors flex items-center gap-1 font-black">
              <Phone className="w-3.5 h-3.5 text-[#10b981]" />
              <span>{settings.phone}</span>
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
            className={`transition-colors relative py-1 ${isActive('/') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            Home
            {isActive('/') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
          
          <Link
            href="/about"
            className={`transition-colors relative py-1 ${isActive('/about') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            About
            {isActive('/about') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>

          {/* Services Dropdown (Loaded dynamically from MongoDB) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/service-details"
              className={`flex items-center gap-1 py-2 transition-colors ${
                pathname.startsWith('/services') || pathname === '/service-details' ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-[#0284c7]' : ''}`} />
            </Link>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 w-80 bg-white border border-sky-100 rounded-2xl shadow-xl p-3 grid gap-1 z-50 max-h-96 overflow-y-auto"
                >
                  <div className="text-[10px] uppercase font-black tracking-wider text-[#0284c7] px-3 py-1 border-b border-sky-100 flex items-center justify-between">
                    <span>{serviceList.length} Specialized Services</span>
                    <Sparkles className="w-3 h-3 text-[#10b981]" />
                  </div>
                  {serviceList.map((srv, idx) => (
                    <Link
                      key={srv.id || srv._id || idx}
                      href={`/services/${srv.slug}`}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-sky-50/60 transition-colors group flex items-start gap-2.5"
                    >
                      <div className="w-6 h-6 rounded-lg bg-sky-100 group-hover:bg-[#0284c7] text-[#0284c7] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 group-hover:text-[#0284c7]">
                          {srv.navTitle || srv.name || srv.title}
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
            className={`transition-colors relative py-1 ${isActive('/instant-quote') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            Quote Calculator
            {isActive('/instant-quote') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
          <Link
            href="/suburbs"
            className={`transition-colors relative py-1 ${isActive('/suburbs') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            Service Areas
            {isActive('/suburbs') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
          <Link
            href="/faq"
            className={`transition-colors relative py-1 ${isActive('/faq') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            FAQs
            {isActive('/faq') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
          <Link
            href="/carpet-cleaning-prices-canberra"
            className={`transition-colors relative py-1 ${isActive('/carpet-cleaning-prices-canberra') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            Prices
            {isActive('/carpet-cleaning-prices-canberra') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
          <Link
            href="/blog"
            className={`transition-colors relative py-1 ${isActive('/blog') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            Blog
            {isActive('/blog') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
          <Link
            href="/contact"
            className={`transition-colors relative py-1 ${isActive('/contact') ? 'text-[#0284c7] font-black' : 'hover:text-[#0284c7]'}`}
          >
            Contact
            {isActive('/contact') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#10b981] rounded-full"></span>}
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={settings.telLink}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#0284c7] text-[#0284c7] bg-sky-50/50 hover:bg-[#0284c7] hover:text-white transition-all font-bold text-xs shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            <span>CALL NOW ({settings.phone})</span>
          </a>

          <Link
            href="/instant-quote"
            className="btn-primary-green px-5 py-2.5 text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5"
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
                Services Hub ({serviceList.length} Services)
              </Link>
              
              {/* Mobile Sub-links loaded dynamically from MongoDB */}
              <div className="pl-4 space-y-1 text-xs text-slate-600 font-semibold border-l-2 border-[#085032]">
                {serviceList.map((s, idx) => (
                  <Link
                    key={s.id || s._id || idx}
                    href={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-[#085032]"
                  >
                    • {s.navTitle || s.name || s.title}
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
                href={settings.telLink}
                className="w-full py-3 rounded-full border-2 border-[#085032] text-[#085032] font-bold text-center text-xs uppercase shadow-md"
              >
                CALL {settings.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
