'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS_INFO, BLOG_POSTS } from '@/data/canberraData';
import { Phone, Mail, MapPin, Check, Sparkles } from 'lucide-react';
import RemoteImage from './RemoteImage';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0b132b] text-sky-100 text-xs sm:text-sm border-t border-sky-950">
      
      {/* Newsletter Signup Bar */}
      <div className="bg-[#070d1e] border-b border-sky-900/60 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[#10b981] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#10b981]" />
              <span>STAY INFORMED</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Get the latest cleaning tips & exclusive ACT deals</h3>
            <p className="text-sky-200 text-xs font-medium max-w-xl">
              Subscribe to our newsletter for seasonal carpet care guides, instant price drop alerts, and official company updates.
            </p>
          </div>

          {newsSuccess ? (
            <div className="px-5 py-3 rounded-full bg-[#10b981] text-white font-black text-xs flex items-center gap-2 shadow-lg">
              <Check className="w-4 h-4" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center w-full md:w-auto max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-[#0b132b] border border-sky-700 rounded-full pl-5 pr-32 py-3 text-white text-xs placeholder-sky-400 focus:outline-none focus:border-[#10b981] w-full md:w-80 shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 px-5 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Logo & Tagline */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <RemoteImage
              src={BUSINESS_INFO.logos.white}
              alt={BUSINESS_INFO.name}
              className="h-10 w-auto object-contain"
              fallbackSrc="/images/hero-carpet.png"
            />
          </Link>

          <p className="text-sky-200 text-xs leading-relaxed font-medium">
            {BUSINESS_INFO.tagline}
          </p>

          <div className="space-y-2.5 text-xs font-semibold text-sky-100 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-900/60 text-[#10b981] flex items-center justify-center flex-shrink-0 border border-sky-800">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-900/60 text-[#10b981] flex items-center justify-center flex-shrink-0 border border-sky-800">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <a href={BUSINESS_INFO.telLink} className="hover:text-white font-black text-[#10b981]">{BUSINESS_INFO.phone}</a>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-900/60 text-[#10b981] flex items-center justify-center flex-shrink-0 border border-sky-800">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">{BUSINESS_INFO.email}</a>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-4">
          <div className="font-black text-white uppercase text-xs tracking-wider border-b border-sky-800 pb-2">Quick Navigation</div>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <Link href="/instant-quote" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Instant Quote Calculator
              </Link>
            </li>
            <li>
              <Link href="/carpet-cleaning-prices-canberra" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Prices & Deals
              </Link>
            </li>
            <li>
              <Link href="/suburbs" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Service Areas (40+ Suburbs)
              </Link>
            </li>
            <li>
              <Link href="/gallary" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Photo Gallery Showcase
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Video Demonstrations
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-[#10b981] transition-colors flex items-center gap-1.5">
                <span className="text-[#10b981] font-bold">•</span> Guarantee & Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Popular Blog Posts */}
        <div className="space-y-4 lg:col-span-2">
          <div className="font-black text-white uppercase text-xs tracking-wider border-b border-sky-800 pb-2">Popular Canberra Cleaning Guides</div>
          <div className="space-y-3">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="p-3.5 rounded-2xl bg-[#070d1e] border border-sky-900 space-y-1 hover:border-[#10b981] transition-colors">
                <Link href={`/blog/${post.slug}`} className="font-bold text-xs text-white hover:text-[#10b981] line-clamp-2 transition-colors">
                  {post.title}
                </Link>
                <div className="text-[11px] text-sky-300 font-medium">{post.date} • {post.readTime}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright & Social Bar */}
      <div className="border-t border-sky-950 py-6 px-4 text-center text-xs text-sky-300 font-medium bg-[#040814]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Canberra Carpet Cleaning Deals. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b132b]/95 backdrop-blur-md border-t border-sky-800 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={BUSINESS_INFO.telLink}
          className="flex-1 py-3 rounded-full border-2 border-white text-white font-bold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now</span>
        </a>

        <Link
          href="/instant-quote"
          className="flex-1 py-3 rounded-full bg-[#10b981] text-white font-black text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95"
        >
          <span>Enquire Now</span>
        </Link>
      </div>

    </footer>
  );
}

