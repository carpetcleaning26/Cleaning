'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SERVICES, ServiceItem } from '@/data/cleaningData';
import { Sparkles, ArrowRight, ShieldCheck, Armchair, Layers, Droplets, Grid, Bed, Bug } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCatalogProps {
  onOpenCalculator?: () => void;
}

export default function ServiceCatalog({ onOpenCalculator }: ServiceCatalogProps) {
  const [serviceList, setServiceList] = useState<any[]>(SERVICES);

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
  }, []);

  const renderIcon = (name: string) => {
    const iconClass = "w-6 h-6 text-[#0284c7] stroke-[1.75]";
    switch (name) {
      case 'Armchair':
        return <Armchair className={iconClass} />;
      case 'Grid':
        return <Grid className={iconClass} />;
      case 'Bed':
        return <Bed className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Droplets':
        return <Droplets className={iconClass} />;
      case 'Bug':
        return <Bug className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0284c7] text-xs font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-4 h-4 text-[#10b981]" />
            <span>Comprehensive Cleaning Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Premium Cleaning Services in Canberra
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            From deep steam carpet extraction to guaranteed end-of-lease bond cleans and upholstery care.
          </p>
        </motion.div>

        {/* Style A — Minimal Text-Led Services Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative rounded-3xl bg-white border border-sky-100/80 hover:border-[#0284c7] p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Icon & Category Tag Header */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-[#059669] border border-emerald-200">
                    From {service.startingPrice}
                  </span>
                </div>

                {/* Service Title */}
                <div>
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0284c7] transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* 2-3 Line Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium">
                  {service.shortDesc}
                </p>

                {/* Thin Blue/Green Divider Line */}
                <div className="w-full border-b border-[#0284c7]/20 pt-2"></div>
              </div>

              {/* Arrow Link Bottom */}
              <div className="pt-4">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between text-[#0284c7] font-black text-xs uppercase tracking-wider group-hover:text-[#0369a1] transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 text-[#10b981] group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}



