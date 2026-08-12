'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '@/data/canberraData';
import RemoteImage from './RemoteImage';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: "SAME-DAY SERVICE • ALL ACT SUBURBS",
      title: "CARPET, UPHOLSTERY, RUGS, TILES & CURTAINS CLEANING",
      bgImage: "https://www.canberracarpetcleaningdeals.com.au/assets/images/services/carpet-full-service.jpg"
    },
    {
      badge: "100% BOND BACK GUARANTEE",
      title: "END OF LEASE CARPET CLEANING CANBERRA",
      bgImage: "https://www.canberracarpetcleaningdeals.com.au/assets/images/about/bigsize.jpg"
    },
    {
      badge: "5 STAR GOOGLE REVIEWS",
      title: "CARPET CLEANING FROM $27 PER ROOM",
      bgImage: "https://www.canberracarpetcleaningdeals.com.au/assets/images/services/upholstery-full-service.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative overflow-hidden bg-[#085032] text-white min-h-[500px] sm:min-h-[600px] flex items-center">
      
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#043d22] via-[#085032]/80 to-transparent z-10"></div>
          <RemoteImage
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            fallbackSrc="/images/hero-carpet.png"
          />
        </div>
      ))}

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16 w-full">
        <div className="max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#043d22] border border-emerald-600/40 text-[#facc15] text-xs font-black uppercase tracking-wider shadow-md">
            <Sparkles className="w-4 h-4 text-[#facc15]" />
            <span>{slides[currentSlide].badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
            {slides[currentSlide].title}
          </h1>

          <p className="text-emerald-100 text-sm sm:text-base font-medium max-w-xl">
            17+ years serving Canberra. Truck-mounted hot water extraction, pet stain removal, and same-day dispatches across all ACT suburbs.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/instant-quote"
              className="btn-yellow-pill w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-3 group"
            >
              <span>Get A Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={BUSINESS_INFO.telLink}
              className="btn-white-ghost-pill w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now: {BUSINESS_INFO.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Slider Nav Arrows */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="w-10 h-10 rounded-full bg-[#043d22]/80 hover:bg-[#043d22] text-white flex items-center justify-center border border-emerald-700"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="w-10 h-10 rounded-full bg-[#043d22]/80 hover:bg-[#043d22] text-white flex items-center justify-center border border-emerald-700"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
}

