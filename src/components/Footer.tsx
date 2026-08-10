'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BUSINESS_INFO, BLOG_POSTS } from '@/data/canberraData';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
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
    <footer className="bg-slate-950 text-slate-300 text-xs sm:text-sm border-t border-slate-900">
      
      {/* Newsletter Signup Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-black text-white">Get the latest news & other tips</h3>
            <p className="text-slate-400 text-xs font-medium max-w-xl">
              Subscribe to our newsletter to receive the latest cleaning tips, offers and company updates.
            </p>
          </div>

          {newsSuccess ? (
            <div className="px-4 py-2.5 rounded-full bg-lime-500 text-slate-950 font-black text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-full px-4 py-2.5 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-sky-500 w-full md:w-64"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors whitespace-nowrap"
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

          <p className="text-slate-400 text-xs leading-relaxed font-medium">
            {BUSINESS_INFO.tagline}
          </p>

          <div className="space-y-2 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-lime-400 flex-shrink-0" />
              <span>{BUSINESS_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <a href={BUSINESS_INFO.telLink} className="hover:text-white font-bold">{BUSINESS_INFO.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">{BUSINESS_INFO.email}</a>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="space-y-3">
          <div className="font-black text-white uppercase text-xs tracking-wider">Quick Links</div>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <Link href="/instant-quote" className="hover:text-lime-400 transition-colors">
                Cleaning Deals
              </Link>
            </li>
            <li>
              <Link href="/gallary" className="hover:text-lime-400 transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-lime-400 transition-colors">
                Videos
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-lime-400 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="hover:text-lime-400 transition-colors">
                Our Terms
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Popular Blog Posts */}
        <div className="space-y-3 lg:col-span-2">
          <div className="font-black text-white uppercase text-xs tracking-wider">Popular Posts</div>
          <div className="space-y-3">
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <Link href={`/blog/${post.slug}`} className="font-bold text-xs text-white hover:text-lime-400 line-clamp-2">
                  {post.title}
                </Link>
                <div className="text-[11px] text-slate-500">{post.date} • {post.readTime}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2026 Canberra Carpet Cleaning Deals. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/terms-conditions" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-conditions" className="hover:text-slate-300">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={BUSINESS_INFO.telLink}
          className="flex-1 py-3 rounded-full bg-sky-600 text-white font-bold text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now</span>
        </a>

        <Link
          href="/instant-quote"
          className="flex-1 py-3 rounded-full bg-lime-500 text-slate-950 font-black text-xs text-center uppercase tracking-wider flex items-center justify-center gap-1.5"
        >
          <span>Enquire Now</span>
        </Link>
      </div>

    </footer>
  );
}
