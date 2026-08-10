import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { BUSINESS_INFO, SERVICES, TESTIMONIALS } from '@/data/canberraData';
import Link from 'next/link';
import { CheckCircle2, Phone, Star, ShieldCheck, Sparkles, MapPin, Award } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Canberra Carpet Cleaning Deals — Taylor ACT",
  description: "Family-owned Canberra carpet cleaning company since 2008. 17+ years experience, 100,000+ jobs completed, 5.0★ Google rating."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      {/* Breadcrumb Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs text-lime-400 font-bold uppercase tracking-wider">
            <Link href="/" className="hover:underline text-slate-300">Home</Link> / About Company
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">About Canberra Carpet Cleaning Deals</h1>
          <p className="text-slate-300 text-sm font-medium">Family-owned & operated in Taylor, ACT since 2008.</p>
        </div>
      </div>

      {/* Main About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Company History Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-100 text-lime-800 text-xs font-black uppercase border border-lime-200">
              <Award className="w-4 h-4 text-lime-700" />
              <span>OUR COMPANY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Family-Owned Canberra Carpet Cleaning Since 2008
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              Canberra Carpet Cleaning Deals has been serving households and businesses across the ACT for over 17 years. We're a family-owned and operated cleaning service based in Taylor, with a team that knows every Canberra suburb — from Belconnen apartments to Tuggeranong family homes, Gungahlin rentals, and Woden Valley heritage properties.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              Since 2008, we've completed more than 100,000 cleaning jobs across the ACT and surrounding areas, earning a 5-star Google rating from verified customers. Most of our work comes from repeat customers and referrals.
            </p>

            {/* 4 Checklist Badges */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-lime-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">Family Owned</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Serving Canberra Since 2008</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">Truck Mounted Equipment</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Deep Cleaning Technology</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-lime-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">Eco Friendly</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Safe For Kids & Pets</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-black text-slate-900">100% Satisfaction</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Guaranteed Every Time</div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-md">
                <RemoteImage src="https://www.canberracarpetcleaningdeals.com.au/assets/images/about/about-v1-img1.jpg" alt="Cleaning Team 1" className="w-full h-full object-cover" fallbackSrc="/images/hero-carpet.png" />
              </div>
              <div className="relative h-64 rounded-3xl overflow-hidden shadow-md mt-6">
                <RemoteImage src="https://www.canberracarpetcleaningdeals.com.au/assets/images/about/about-v1-img2.jpg" alt="Cleaning Team 2" className="w-full h-full object-cover" fallbackSrc="/images/couch-clean.png" />
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 p-8 bg-white rounded-3xl border border-sky-100 text-center shadow-md">
          <div>
            <div className="text-3xl sm:text-5xl font-black text-slate-900">{BUSINESS_INFO.yearsExp}</div>
            <div className="text-xs text-slate-500 font-bold uppercase mt-1">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-lime-700">{BUSINESS_INFO.jobsCompleted}</div>
            <div className="text-xs text-slate-500 font-bold uppercase mt-1">Jobs Completed</div>
          </div>
          <div>
            <div className="text-3xl sm:text-5xl font-black text-sky-700">{BUSINESS_INFO.rating}</div>
            <div className="text-xs text-slate-500 font-bold uppercase mt-1">Google Rating</div>
          </div>
        </div>

        {/* Text Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-white border border-sky-100 space-y-2 shadow-xs">
            <h3 className="text-lg font-black text-slate-900">Service Across All ACT Suburbs</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              We service every Canberra district — Belconnen, Gungahlin, Tuggeranong, Woden Valley, Molonglo Valley, Canberra City, plus surrounding areas including Bungendore and Yass. There's no travel surcharge within the ACT, and same-day service is available across most suburbs when booked before 11am.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sky-100 space-y-2 shadow-xs">
            <h3 className="text-lg font-black text-slate-900">Our Guarantee</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Every job comes with our 100% satisfaction guarantee. If you're not happy with the result, we'll come back and fix it — no extra charge, no arguments. For end-of-lease cleans, we offer a bond-back guarantee: if your property manager raises any carpet cleaning issues during the inspection, we return free of charge.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sky-100 space-y-2 shadow-xs">
            <h3 className="text-lg font-black text-slate-900">Get In Touch</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Whether you need a one-off carpet clean before guests arrive, regular maintenance for your home or office, or an urgent end-of-lease bond clean, we're ready to help. Call 0481 734 225 or email info@canberracarpetcleaningdeals.com.au for a quick chat, or use our instant quote calculator to see your price in 60 seconds with the 20% online booking discount auto-applied.
            </p>
          </div>
        </div>

        {/* Discover More Services Grid */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-black text-slate-900 text-center">Discover All 9 Cleaning Services</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="p-4 rounded-2xl bg-white border border-sky-100 hover:border-sky-500 transition-colors shadow-xs group space-y-1"
              >
                <div className="text-sm font-black text-slate-900 group-hover:text-sky-700">{s.name}</div>
                <div className="text-xs text-slate-500 line-clamp-1">{s.shortDesc}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}

