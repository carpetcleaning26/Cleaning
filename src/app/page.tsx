'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ReviewsSection from '@/components/ReviewsSection';
import RemoteImage from '@/components/RemoteImage';
import { BUSINESS_INFO, SERVICES } from '@/data/canberraData';
import Link from 'next/link';
import { Star, Phone, ArrowRight, CheckCircle2, Award, ShieldCheck, Sparkles, PhoneCall, CalendarCheck, CreditCard, Zap, BadgePercent, HeartHandshake } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* 1. Hero Section (Matched Layout in Brand Green) */}
      <Hero />

      {/* 2. Electrodry-Inspired Trust / Stats Band */}
      <section className="bg-[#f4f8f5] py-10 px-4 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl lg:text-4xl font-black text-[#085032]">17+ YEARS</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">CANBERRA OWNED & OPERATED</div>
          </div>
          <div className="space-y-1 border-l border-emerald-200/60">
            <div className="text-3xl lg:text-4xl font-black text-[#085032]">100,000+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">JOBS COMPLETED</div>
          </div>
          <div className="space-y-1 border-l border-emerald-200/60">
            <div className="text-3xl lg:text-4xl font-black text-[#085032]">5.0 ★★★★★</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">VERIFIED GOOGLE RATING</div>
          </div>
          <div className="space-y-1 border-l border-emerald-200/60">
            <div className="text-3xl lg:text-4xl font-black text-[#085032]">100%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">BOND BACK GUARANTEE</div>
          </div>
        </div>
      </section>

      {/* 3. About / Intro Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#f4f8f5] border border-emerald-100 p-4 shadow-md">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden">
                <RemoteImage
                  src="https://www.canberracarpetcleaningdeals.com.au/assets/images/about/bigsize.jpg"
                  alt="Cleaning Team Canberra"
                  className="w-full h-full object-cover"
                  fallbackSrc="/images/hero-carpet.png"
                />
              </div>

              {/* Review Badge */}
              <div className="absolute -bottom-6 left-6 right-6 sm:right-auto bg-white border border-emerald-100 rounded-2xl p-4 shadow-xl flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#facc15] text-[#043d22] flex flex-col items-center justify-center font-black shadow-xs">
                  <Star className="w-4 h-4 fill-[#043d22] text-[#043d22]" />
                  <span className="text-base leading-none">5.0</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    BASED ON VERIFIED GOOGLE REVIEWS
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    Trusted Canberra cleaners since 2008
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 pt-4 lg:pt-0">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#085032]">
              <span className="w-8 h-0.5 bg-[#085032]"></span>
              <Star className="w-3.5 h-3.5 fill-[#085032] text-[#085032]" />
              <span>INTRODUCE OUR COMPANY</span>
              <Star className="w-3.5 h-3.5 fill-[#085032] text-[#085032]" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              We'll take care of the <br />
              <span className="text-[#085032]">Cleaning and the errands</span>
            </h2>

            <p className="text-slate-600 font-medium text-base">
              Professional cleaning service constantly striving for 100% customer satisfaction across all Canberra suburbs.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 space-y-2.5 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[#085032] text-white flex items-center justify-center font-bold shadow-sm">
                  <Sparkles className="w-5 h-5 text-[#facc15]" />
                </div>
                <h3 className="text-base font-black text-slate-900">Quality Cleaning Service</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Experience pristine cleanliness with our eco-friendly products and meticulous techniques. Guaranteed satisfaction with every corner spotless.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f4f8f5] border border-emerald-100 space-y-2.5 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-[#085032] text-white flex items-center justify-center font-bold shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-[#facc15]" />
                </div>
                <h3 className="text-base font-black text-slate-900">Top Canberra Cleaners</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Experience unparalleled cleanliness and exceptional service with Canberra's top-rated cleaning professionals. Your satisfaction is our priority.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Stain Busters Reference Content Block — 3-Column Checklist Section */}
      <section className="py-20 bg-[#f4f8f5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#085032]">FULL-SERVICE CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              We're Professional Canberra Cleaners... And So Much More!
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              From residential carpet steam extraction to end-of-lease handovers and specialized fabric care, we deliver guaranteed results across all ACT suburbs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 bg-white p-8 rounded-3xl border border-emerald-100 shadow-md">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Carpet Steam Cleaning</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">Hot water extraction deep cleaning for stain & allergen removal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Upholstery & Lounge Care</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">Sofa washing, fabric conditioning, and stain protection treatments.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Stain & Spot Removal</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">Specialist treatment for pet accidents, wine, coffee, and grease stains.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Tile & Grout Scrubbing</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">High-pressure rotary wash for kitchen, bath & indoor tiled areas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Area Rug Wash & Care</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">Delicate wool, synthetic, and oriental rug cleaning & deodorising.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Pet Odour Elimination</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">Enzymatic treatment that neutralises deep-seated pet odours.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">End of Lease Bond Cleans</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">100% Bond back guarantee for real estate rental handovers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Commercial Carpet Care</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">After-hours office, retail & facility carpet steam cleaning.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#085032] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Curtains & Blinds Steam</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">On-hanging drapery steam extraction removing dust & allergens.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Cleaning Process (4 Step Workflow) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#085032]">SIMPLE 4-STEP WORKFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Our Cleaning Process</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 text-center space-y-4 shadow-xs relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-200/60 text-[#085032] rounded-full">Step 01</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#085032] text-white font-black flex items-center justify-center shadow-md">
                <PhoneCall className="w-7 h-7 text-[#facc15]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Give us a Call</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Call 0481 734 225 or build your estimate online in 60 seconds.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 text-center space-y-4 shadow-xs relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-200/60 text-[#085032] rounded-full">Step 02</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#085032] text-white font-black flex items-center justify-center shadow-md">
                <CalendarCheck className="w-7 h-7 text-[#facc15]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Quick Schedule</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Choose your preferred date and time slot. Same-day available before 11am.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 text-center space-y-4 shadow-xs relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-200/60 text-[#085032] rounded-full">Step 03</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#085032] text-white font-black flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7 text-[#facc15]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">The Cleaning</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Truck-mounted steam extraction deep cleans carpet fibers safely.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 text-center space-y-4 shadow-xs relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-emerald-200/60 text-[#085032] rounded-full">Step 04</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#085032] text-white font-black flex items-center justify-center shadow-md">
                <CreditCard className="w-7 h-7 text-[#facc15]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Easy Payment</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Inspect the job, receive tax receipt, and pay after completion.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Style B — Image-Led Service Cards Grid */}
      <section className="py-20 bg-[#f4f8f5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#085032]">OUR SERVICES</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Canberra Cleaning Services</h2>
            </div>

            <Link href="/service-details" className="btn-primary-green px-6 py-3 text-xs uppercase">
              View All Services
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 7).map((srv) => (
              <div key={srv.id} className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                
                <div className="space-y-4">
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <RemoteImage src={srv.image} alt={srv.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-[#085032] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                      {srv.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#085032] transition-colors">{srv.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {srv.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-[#085032] border border-emerald-200 rounded-full">Deep Clean</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-[#085032] border border-emerald-200 rounded-full">Eco Friendly</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-[#085032] border border-emerald-200 rounded-full">Fast Dry</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="btn-primary-green w-full py-3 text-xs uppercase flex items-center justify-center gap-2"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#facc15]" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Interactive Reviews Section */}
      <ReviewsSection />

      {/* 8. Modern Video/CTA Banner */}
      <section className="relative py-20 bg-[#043d22] text-white overflow-hidden border-t border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase tracking-wider border border-emerald-700">
            <Zap className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Fast Dry Steam Cleaning</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Keep your property clean & shiny once again</h2>
          <p className="text-emerald-100 font-medium">Professional cleaning, 100% customer satisfaction guarantee across all ACT suburbs.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href={BUSINESS_INFO.telLink} className="btn-yellow-pill px-8 py-4 text-xs uppercase tracking-wider shadow-lg">
              Call {BUSINESS_INFO.phone}
            </a>
            <Link href="/contact" className="btn-white-ghost-pill px-8 py-4 text-xs uppercase tracking-wider">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-black text-slate-900">How can we take care of you?</h2>
          <p className="text-slate-600 font-medium">Tell us about your home, and get a price with consultation.</p>
          <Link href="/instant-quote" className="btn-primary-green inline-block px-8 py-4 text-xs uppercase tracking-wider shadow-lg">
            GET OUR PRICE
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}


