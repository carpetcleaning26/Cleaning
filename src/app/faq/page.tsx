'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQS, BUSINESS_INFO } from '@/data/canberraData';
import { ChevronDown, HelpCircle, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>('faq1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pricing' | 'process'>('all');

  const filteredFaqs = FAQS.filter((f) => activeCategory === 'all' || f.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black uppercase shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Answers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Carpet Cleaning Canberra — FAQs</h1>
          <p className="text-slate-300 text-sm font-medium">
            Everything you need to know about our carpet, rug, upholstery, tile, curtain and pest cleaning services across Canberra ACT.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        
        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-colors ${
              activeCategory === 'all' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory('pricing')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-colors ${
              activeCategory === 'pricing' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            💰 Pricing & Value
          </button>
          <button
            onClick={() => setActiveCategory('process')}
            className={`px-4 py-2 rounded-full text-xs font-black transition-colors ${
              activeCategory === 'process' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            🧽 Cleaning Process
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left font-black text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-sky-600"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-sky-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white text-center space-y-4 border-l-8 border-lime-500 shadow-xl">
          <h3 className="text-xl font-black text-white">Still have a question?</h3>
          <p className="text-xs text-slate-300">Get an instant quote in 60 seconds, or speak directly with our Canberra-based team.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/instant-quote" className="px-6 py-3 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase shadow-md transition-transform active:scale-95">
              Instant Quote
            </Link>
            <a href={BUSINESS_INFO.telLink} className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase shadow-md transition-transform active:scale-95">
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
