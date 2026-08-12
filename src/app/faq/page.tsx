'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FAQS, BUSINESS_INFO } from '@/data/canberraData';
import { ChevronDown, HelpCircle, DollarSign, Sparkles, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>('faq1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'pricing' | 'process'>('all');

  const filteredFaqs = FAQS.filter((f) => activeCategory === 'all' || f.category === activeCategory);

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Header Banner */}
      <div className="bg-[#043d22] text-white py-16 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase tracking-wider border border-emerald-700">
            <HelpCircle className="w-4 h-4 text-[#facc15]" />
            <span>Help & Answers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Carpet Cleaning Canberra — FAQs</h1>
          <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our carpet, rug, upholstery, tile, curtain and pest cleaning services across Canberra ACT.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-10">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#f4f8f5] rounded-full max-w-md mx-auto border border-emerald-100">
          {[
            { id: 'all', label: 'All Questions', icon: Layers },
            { id: 'pricing', label: 'Pricing & Value', icon: DollarSign },
            { id: 'process', label: 'Cleaning Process', icon: Sparkles }
          ].map((cat) => {
            const IconComp = cat.icon;
            const isCurrent = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`relative px-4 py-2 rounded-full text-xs font-black flex items-center gap-1.5 transition-colors z-10 ${
                  isCurrent ? 'text-white' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="activeFaqCategory"
                    className="absolute inset-0 bg-[#085032] rounded-full shadow-xs z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-3xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#f4f8f5] border-2 border-[#085032] shadow-sm'
                    : 'bg-white border border-emerald-100 hover:border-[#085032] shadow-xs'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left font-black text-slate-900 text-base sm:text-lg flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-[#085032] text-white' : 'bg-emerald-50 text-[#085032] group-hover:bg-emerald-100'
                    }`}>
                      {faq.category === 'pricing' ? (
                        <DollarSign className="w-4 h-4" />
                      ) : (
                        <HelpCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span>{faq.question}</span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-1 rounded-full bg-emerald-50 text-[#085032] flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t border-emerald-200/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Closing CTA Box */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-8 sm:p-10 rounded-3xl bg-[#043d22] text-white text-center space-y-4 border-l-8 border-[#facc15] shadow-xl"
        >
          <h3 className="text-2xl font-black text-white">Still have a question?</h3>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto font-medium">
            Get an instant price estimate in 60 seconds, or speak directly with our Canberra-based cleaning dispatch team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/instant-quote"
              className="btn-yellow-pill px-7 py-3.5 text-xs uppercase tracking-wider shadow-md"
            >
              Instant Quote
            </Link>
            <a
              href={BUSINESS_INFO.telLink}
              className="btn-white-ghost-pill px-7 py-3.5 text-xs uppercase tracking-wider"
            >
              Call {BUSINESS_INFO.phone}
            </a>
          </div>
        </motion.div>

      </div>

      <Footer />
    </main>
  );
}


