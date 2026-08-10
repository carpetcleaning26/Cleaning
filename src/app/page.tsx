'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import RemoteImage from '@/components/RemoteImage';
import { BUSINESS_INFO, SERVICES, TESTIMONIALS } from '@/data/canberraData';
import Link from 'next/link';
import { Star, Phone, ArrowRight, CheckCircle2, Award, Clock, ShieldCheck, Sparkles, User, BadgePercent, HeartHandshake, PhoneCall, CalendarCheck, CreditCard, Tag, Zap, ThumbsUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Modern High-Contrast Stats Strip */}
      <section className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-12 px-4 border-t-4 border-lime-400 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl overflow-hidden relative border-2 border-lime-400 flex-shrink-0 shadow-lg">
              <RemoteImage
                src="https://www.canberracarpetcleaningdeals.com.au/assets/images/cta-v4-img1.jpg"
                alt="100k Cleaning Requests Canberra"
                className="w-full h-full object-cover"
                fallbackSrc="/images/hero-carpet.png"
              />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-wider border border-lime-400/30">
                <Award className="w-3.5 h-3.5 text-lime-400" />
                <span>Established 2008</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                Since 2008, we've fulfilled over <br className="hidden sm:inline" />
                <span className="text-lime-400">100k cleaning requests</span> in Canberra
              </h2>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 whitespace-nowrap hover:shadow-lime-500/20"
          >
            GET IN TOUCH
          </Link>
        </div>
      </section>

      {/* 3. About / Intro Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-slate-50 border border-slate-200 p-4 shadow-lg">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden">
                <RemoteImage
                  src="https://www.canberracarpetcleaningdeals.com.au/assets/images/about/bigsize.jpg"
                  alt="Cleaning Team Canberra"
                  className="w-full h-full object-cover"
                  fallbackSrc="/images/hero-carpet.png"
                />
              </div>

              {/* Review Badge */}
              <div className="absolute -bottom-6 left-6 right-6 sm:right-auto bg-white border border-slate-200 rounded-2xl p-4 shadow-xl flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-lime-500 text-slate-950 flex flex-col items-center justify-center font-black shadow-xs">
                  <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
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
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-sky-700">
              <span className="w-8 h-0.5 bg-sky-600"></span>
              <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
              <span>INTRODUCE OUR COMPANY</span>
              <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              We'll take care of the <br />
              <span className="text-sky-600">Cleaning and the errands</span>
            </h2>

            <p className="text-slate-600 font-medium text-base">
              Professional cleaning service constantly striving for 100% customer satisfaction across all Canberra suburbs.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#f0f9ff] border border-sky-200 space-y-2.5 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900">Quality Cleaning Service</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Experience pristine cleanliness with our eco-friendly products and meticulous techniques. Guaranteed satisfaction with every corner spotless.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#f0f9ff] border border-sky-200 space-y-2.5 shadow-xs">
                <div className="w-11 h-11 rounded-xl bg-lime-600 text-white flex items-center justify-center font-bold shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
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

      {/* 4. Why Choose Us (4 Cards with Colorful Lucide Icons) */}
      <section className="py-20 bg-[#f0f9ff] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-sky-700">OUR ADVANTAGES</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Why Choose Canberra Carpet Cleaning Deals</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-md space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900">Best Experience</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Efficiency at its finest, delivering exceptional cleaning results always & everywhere.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-md space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-lime-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <BadgePercent className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900">Lowest Price</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Lowest cost than others but promise to provide the best quality always & every time.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-md space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900">Customer Satisfaction</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Attentive and versatile, ensuring convenience and satisfaction with every service offered.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-md space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-lime-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-slate-900">We're Professional</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Our professionalism guarantees best service and superior results with every interaction.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-slate-900">We're Committed to Cleaning.</h3>
              <p className="text-xs text-slate-600 font-medium">17+ years experience serving homeowners and businesses in Taylor and all ACT suburbs.</p>
            </div>
            <Link href="/about" className="px-6 py-3 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-md">
              READ MORE
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Cleaning Process (4 Step Workflow with Rich Lucide Icons) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-sky-700">SIMPLE 4-STEP WORKFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Our Cleaning Process</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#f0f9ff] border border-sky-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-sky-200/60 text-sky-800 rounded-full">Step 01</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-600 text-white font-black flex items-center justify-center shadow-md">
                <PhoneCall className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Give us a Call</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Call 0481 734 225 or build your estimate online in 60 seconds.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f0f9ff] border border-sky-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-lime-200/60 text-lime-900 rounded-full">Step 02</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-lime-600 text-white font-black flex items-center justify-center shadow-md">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Quick Schedule</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Choose your preferred date and time slot. Same-day available before 11am.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f0f9ff] border border-sky-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-sky-200/60 text-sky-800 rounded-full">Step 03</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-600 text-white font-black flex items-center justify-center shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">The Cleaning</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Truck-mounted steam extraction deep cleans carpet fibers safely.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f0f9ff] border border-sky-100 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-3 right-3 text-[10px] font-black uppercase px-2 py-0.5 bg-lime-200/60 text-lime-900 rounded-full">Step 04</div>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-lime-600 text-white font-black flex items-center justify-center shadow-md">
                <CreditCard className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Easy Payment</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Inspect the job, receive tax receipt, and pay after completion.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Services Grid (7 Home Services) */}
      <section className="py-20 bg-[#f0f9ff] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-sky-700">OUR SERVICES</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Canberra Cleaning Services</h2>
            </div>

            <Link href="/service-details" className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase shadow-md transition-all">
              View All Services
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 7).map((srv) => (
              <div key={srv.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                
                <div className="space-y-4">
                  <div className="relative h-48 w-full bg-slate-100">
                    <RemoteImage src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-lime-400 text-slate-950 text-[10px] font-black uppercase shadow-xs">
                      {srv.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black text-slate-900">{srv.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {srv.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full">Deep Clean</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-lime-50 text-lime-800 border border-lime-200 rounded-full">Eco Friendly</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full">Fast Dry</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-lime-400" />
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Testimonials Carousel */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-lime-700">EXCELLENT — BASED ON 80+ REVIEWS</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">5.0★ Verified Google Reviews</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {TESTIMONIALS.slice(0, 4).map((t) => (
              <div key={t.id} className="p-6 rounded-3xl bg-[#f0f9ff] border border-sky-100 space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-sky-200/60 flex items-center justify-between text-xs">
                  <span className="font-black text-slate-900">{t.name}</span>
                  <span className="text-slate-500 font-semibold">{t.suburb}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Modern Video/CTA Banner */}
      <section className="relative py-20 bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <RemoteImage src="https://www.canberracarpetcleaningdeals.com.au/assets/images/video-v1-bg.jpg" alt="Video CTA" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-400 text-xs font-black uppercase tracking-wider border border-lime-400/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Fast Dry Steam Cleaning</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Keep your property clean & shiny once again</h2>
          <p className="text-slate-300 font-medium">Professional cleaning, 100% customer satisfaction guarantee across all ACT suburbs.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href={BUSINESS_INFO.telLink} className="px-8 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95">
              Call {BUSINESS_INFO.phone}
            </a>
            <Link href="/contact" className="px-8 py-3.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-black text-slate-900">How can we take care of you?</h2>
          <p className="text-slate-600 font-medium">Tell us about your home, and get a price with consultation.</p>
          <Link href="/instant-quote" className="inline-block px-8 py-4 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95">
            GET OUR PRICE
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

