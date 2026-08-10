'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SERVICES, ServiceItem } from '@/data/cleaningData';
import { Sparkles, Check, ArrowRight, ShieldCheck, Phone, X, Armchair, Layers, Droplets, Grid, Bed, Bug } from 'lucide-react';

interface ServiceCatalogProps {
  onOpenCalculator?: () => void;
}

export default function ServiceCatalog({ onOpenCalculator }: ServiceCatalogProps) {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Armchair':
        return <Armchair className="w-6 h-6 text-sky-600" />;
      case 'Grid':
        return <Grid className="w-6 h-6 text-sky-600" />;
      case 'Bed':
        return <Bed className="w-6 h-6 text-sky-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-sky-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'Bug':
        return <Bug className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-sky-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Cleaning Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Premium Cleaning Services in Canberra
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            From deep steam carpet extraction to guaranteed end-of-lease bond cleans and upholstery sanitization.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className="group relative rounded-3xl bg-slate-50 border border-slate-200 hover:border-sky-500 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all">
                    {renderIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-lime-100 text-lime-800 border border-lime-300">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Pricing */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-sm font-extrabold text-lime-700 mt-1">
                    From {service.startingPrice} <span className="text-slate-500 font-normal text-xs">{service.unit}</span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium">
                  {service.shortDesc}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-6 flex gap-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-sky-600 hover:text-white text-sky-700 font-bold text-xs transition-all border border-slate-200 hover:border-sky-600 flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Read Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
