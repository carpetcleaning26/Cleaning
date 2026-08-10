'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ACT_SUBURBS } from '@/data/cleaningData';
import { MapPin, Search, Zap, ShieldCheck, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuburbFinderProps {
  onOpenCalculator?: () => void;
}

export default function SuburbFinder({ onOpenCalculator }: SuburbFinderProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'North Canberra', 'Belconnen', 'Gungahlin', 'South Canberra', 'Woden Valley', 'Tuggeranong', 'Molonglo Valley', 'Queanbeyan Region'];

  const filteredSuburbs = ACT_SUBURBS.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.postcode.includes(searchTerm);
    const matchesRegion = selectedRegion === 'All' || sub.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section id="suburbs" className="py-20 bg-[#f0f9ff] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-black uppercase tracking-wider shadow-xs">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>Full ACT & Surrounds Coverage</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Canberra Suburb & Service Area Finder
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            We operate mobile carpet steam cleaning vans daily across all Canberra ACT postcodes and Queanbeyan.
          </p>

          {/* Intro Stat Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>40+ Suburbs Covered</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-600" />
              <span>No Travel Surcharge</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>Same-Day Before 11am</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-600" />
            <input
              type="text"
              placeholder="Search by suburb name or postcode (e.g. Belconnen, Gungahlin, 2601)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 font-medium text-base focus:outline-none focus:border-sky-600 shadow-md transition-shadow"
            />
          </div>

          {/* Region Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                  selectedRegion === reg
                    ? 'bg-sky-600 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Suburbs Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSuburbs.map((sub, index) => (
              <motion.div
                key={sub.name}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.015 }}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-500 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black tracking-wider uppercase">
                      {sub.postcode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-lime-700 font-black bg-lime-100/80 px-2 py-0.5 rounded-full">
                      <Zap className="w-3 h-3 text-lime-600 fill-lime-500" />
                      Ready
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                      {sub.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{sub.region}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Standard & Hot Steam</span>
                  {onOpenCalculator ? (
                    <button
                      onClick={onOpenCalculator}
                      className="px-3 py-1.5 rounded-full bg-slate-900 group-hover:bg-sky-600 text-white font-black text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3 text-lime-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      href="/instant-quote"
                      className="px-3 py-1.5 rounded-full bg-slate-900 group-hover:bg-sky-600 text-white font-black text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3 text-lime-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSuburbs.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm font-semibold bg-white rounded-3xl border border-slate-200">
            No specific suburb found matching "{searchTerm}". Don't worry, we cover all ACT areas! Call 0481 734 225.
          </div>
        )}

      </div>
    </section>
  );
}

