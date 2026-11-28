'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RemoteImage from '@/components/RemoteImage';
import { SERVICES } from '@/data/cleaningData';
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
          const publishedOnly = data
            .filter((s: any) => s.published !== false)
            .map((s: any) => {
              const fallback = SERVICES.find(
                (f) =>
                  f.slug === s.slug ||
                  f.id === s.id ||
                  (s.name && f.name === s.name) ||
                  (s.title && f.name === s.title)
              );
              const isLegacyImage =
                typeof s.image === 'string' &&
                (s.image.includes('images.unsplash.com') ||
                  s.image.includes('canberracarpetcleaningdeals.com.au') ||
                  !s.image);
              return isLegacyImage && fallback ? { ...s, image: fallback.image } : s;
            });
          if (publishedOnly.length > 0) {
            setServiceList(publishedOnly);
          }
        }
      })
      .catch(() => {});
  }, []);

  const renderIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-[#0284c7] stroke-[2]";
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

        {/* Services Cards Grid with Real Client Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.id || service._id || index}
              id={`service-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative rounded-3xl bg-white border border-slate-200 hover:border-[#0284c7] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Real Service Image Container */}
                <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                  <RemoteImage
                    src={service.image || `/pictures/real_image_${(index % 25) + 1}.jpeg`}
                    alt={service.title || service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  
                  {/* Top Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-sm flex items-center justify-center">
                      {renderIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-black px-3 py-1 rounded-full bg-[#10b981] text-white shadow-md uppercase tracking-wider">
                      From {service.startingPrice}
                    </span>
                  </div>

                  {/* Category Pill at Bottom of Image */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-xs">
                      {service.category || 'CANBERRA SERVICE'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0284c7] transition-colors leading-tight">
                    {service.title || service.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-medium">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              {/* Bottom Action Link */}
              <div className="p-6 pt-0">
                <div className="w-full border-t border-slate-100 mb-4"></div>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-between text-[#0284c7] font-black text-xs uppercase tracking-wider group-hover:text-[#0369a1] transition-colors"
                >
                  <span>Learn more & pricing</span>
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
