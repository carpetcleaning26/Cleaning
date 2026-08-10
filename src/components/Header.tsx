'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS_INFO, SERVICES } from '@/data/canberraData';
import { Phone, MapPin, Mail, Sparkles, ChevronDown, Calendar, Menu, X, Clock } from 'lucide-react';
import RemoteImage from './RemoteImage';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-lime-400" />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{BUSINESS_INFO.hours}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white transition-colors flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
            <span className="opacity-30">|</span>
            <a href={BUSINESS_INFO.telLink} className="text-lime-400 hover:text-white transition-colors flex items-center gap-1 font-bold">
              <Phone className="w-3.5 h-3.5 text-lime-400" />
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
        <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-slate-800">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-sky-600 transition-colors">
            About
          </Link>

          {/* Services Dropdown (9 Sub-links) */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/service-details"
              className="flex items-center gap-1 py-2 hover:text-sky-600 transition-colors"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-sky-600' : ''}`} />
            </Link>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 px-3 py-1 border-b border-slate-100">
                  9 Specialized Services
                </div>
                {SERVICES.map((srv) => (
                  <Link
                    key={srv.id}
                    href={`/services/${srv.slug}`}
                    onClick={() => setServicesDropdownOpen(false)}
                    className="p-2.5 rounded-xl hover:bg-sky-50 transition-colors group flex items-start gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 text-sky-600 group-hover:text-lime-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-black text-slate-900 group-hover:text-sky-700">
                        {srv.navTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{srv.shortDesc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/instant-quote" className="hover:text-sky-600 transition-colors">
            Quote Calculator
          </Link>
          <Link href="/suburbs" className="hover:text-sky-600 transition-colors">
            Service Areas
          </Link>
          <Link href="/faq" className="hover:text-sky-600 transition-colors">
            FAQs
          </Link>
          <Link href="/carpet-cleaning-prices-canberra" className="hover:text-sky-600 transition-colors">
            Prices
          </Link>
          <Link href="/blog" className="hover:text-sky-600 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-sky-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={BUSINESS_INFO.telLink}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-sky-600 text-sky-800 bg-sky-50 hover:bg-sky-100 transition-colors font-bold text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
            <span>CALL NOW ({BUSINESS_INFO.phone})</span>
          </a>

          <Link
            href="/instant-quote"
            className="px-5 py-2.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>BOOK NOW</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col gap-2 font-bold text-slate-800 text-sm">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Home
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              About Us
            </Link>
            <Link href="/service-details" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Services Hub (9 Services)
            </Link>
            
            {/* Mobile Sub-links */}
            <div className="pl-4 space-y-1 text-xs text-slate-600 font-semibold border-l-2 border-sky-300">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-sky-600"
                >
                  • {s.navTitle}
                </Link>
              ))}
            </div>

            <Link href="/instant-quote" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Quote Calculator
            </Link>
            <Link href="/suburbs" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Service Areas
            </Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              FAQs
            </Link>
            <Link href="/carpet-cleaning-prices-canberra" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Prices
            </Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Blog
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-sky-50">
              Contact
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/instant-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-lime-500 text-slate-950 font-black text-center text-xs uppercase"
            >
              BOOK NOW ONLINE
            </Link>
            <a
              href={BUSINESS_INFO.telLink}
              className="w-full py-3 rounded-full bg-sky-600 text-white font-bold text-center text-xs uppercase"
            >
              CALL {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
