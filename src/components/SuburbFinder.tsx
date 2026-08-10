'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ACT_SUBURBS } from '@/data/cleaningData';
import { MapPin, Search, CheckCircle2 } from 'lucide-react';

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
    <section id="suburbs" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-black uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Full ACT & Surrounds Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Canberra Suburb & Service Area Finder
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            We operate mobile carpet steam cleaning vans daily across all Canberra ACT postcodes and Queanbeyan.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by suburb name or postcode (e.g. Belconnen, Gungahlin, 2601)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder-slate-400 font-medium text-base focus:outline-none focus:border-sky-600 shadow-sm"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedRegion === reg
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Suburbs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredSuburbs.map((sub) => (
            <div
              key={sub.name}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-400">{sub.postcode}</div>
                <div className="text-sm font-black text-slate-900">{sub.name}</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">{sub.region}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[10px] text-lime-700 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-600 animate-pulse"></span>
                  Same-Day Ready
                </span>
                {onOpenCalculator ? (
                  <button
                    onClick={onOpenCalculator}
                    className="text-[10px] text-sky-700 font-extrabold hover:underline"
                  >
                    Book
                  </button>
                ) : (
                  <Link
                    href="/instant-quote"
                    className="text-[10px] text-sky-700 font-extrabold hover:underline"
                  >
                    Book
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredSuburbs.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm font-semibold">
            No specific suburb found matching "{searchTerm}". Don't worry, we cover all ACT areas! Call 0481 734 225.
          </div>
        )}

      </div>
    </section>
  );
}
