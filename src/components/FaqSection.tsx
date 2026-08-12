'use client';

import { useState } from 'react';
import { FAQS } from '@/data/cleaningData';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('f1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'carpet', label: 'Carpet Steam' },
    { id: 'bond', label: 'End of Lease' },
    { id: 'pricing', label: 'Pricing & Deals' },
    { id: 'general', label: 'General & Safety' }
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faqs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#085032] text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#085032]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base font-medium">
            Everything you need to know about our Canberra cleaning process, bond return guarantee, and dry times.
          </p>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQ keywords (e.g. dry time, bond, pets, price)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f4f8f5] border border-emerald-100 rounded-2xl pl-11 pr-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#085032] shadow-xs font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#085032] text-white shadow-md'
                    : 'bg-[#f4f8f5] text-slate-700 hover:bg-emerald-100 border border-emerald-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#f4f8f5] border border-emerald-100 overflow-hidden transition-colors shadow-xs"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base hover:text-[#085032] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#085032] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-emerald-200/60 pt-3 animate-in fade-in duration-200 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

