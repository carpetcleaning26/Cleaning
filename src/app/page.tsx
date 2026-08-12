'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCatalog from '@/components/ServiceCatalog';
import ReviewsSection from '@/components/ReviewsSection';
import { BUSINESS_INFO } from '@/data/canberraData';
import Link from 'next/link';
import { 
  Truck, Award, Leaf, ShieldCheck, 
  Home, KeyRound, Building2, Briefcase, Landmark, RefreshCw,
  Sparkles, PhoneCall, CalendarCheck, CreditCard, ArrowRight, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* 1. Hero Band (Full-width Brand Green #085032) */}
      <Hero />

      {/* 2. Trust/Value Strip (Electrodry-Inspired 4-Icon Row on White Background) */}
      <section className="py-12 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#085032] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Truck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900">Truck-Mounted Equipment</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">High-pressure steam extraction for deep fiber sanitization.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#085032] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Award className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900">Family-Owned Since 2008</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Over 17 years serving households across all ACT suburbs.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#085032] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Leaf className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900">Eco-Friendly & Safe</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Non-toxic, bio-degradable products safe for kids & pets.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#085032] flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900">100% Satisfaction Guarantee</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Free re-clean guarantee if you or your agent are not 100% happy.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Grid (Stain Busters Style A Minimal Text-Led Cards) */}
      <ServiceCatalog />

      {/* 4. Reviews Section (Stain Busters Review Card Look) */}
      <ReviewsSection />

      {/* 5. "Trusted By" / Certified Quality Row */}
      <section className="py-8 bg-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-around gap-6 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-[#085032]" />
            <span>100% Bond Return Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Award className="w-4 h-4 text-[#085032]" />
            <span>Certified ACT Technicians</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Leaf className="w-4 h-4 text-[#085032]" />
            <span>Non-Toxic Eco Products</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Truck className="w-4 h-4 text-[#085032]" />
            <span>Mobile Van Units Dispatched Daily</span>
          </div>
        </div>
      </section>

      {/* 6. "Who We Service" Section (Stain Busters 3-Column Grid) */}
      <section className="py-20 bg-[#f4f8f5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#085032]">OUR CLIENT BASE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Who We Service Across Canberra
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              We provide tailored cleaning solutions for residential, commercial, and property management clients throughout the ACT.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-xs space-y-3 hover:border-[#085032] transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center">
                <Home className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Homeowners</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Regular carpet, lounge, mattress, and rug steam cleaning to keep your family home fresh, hygienic, and stain-free.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-xs space-y-3 hover:border-[#085032] transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center">
                <KeyRound className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Renters & End-of-Lease</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Agent-approved end of lease carpet steam cleaning backed by our 100% bond return guarantee and official tax receipts.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-xs space-y-3 hover:border-[#085032] transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center">
                <Building2 className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Real Estate Agencies</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Fast turnarounds for property managers, landlord handovers, and tenant exit inspections across Belconnen, Gungahlin, Woden & ACT.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-xs space-y-3 hover:border-[#085032] transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center">
                <Briefcase className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Offices & Commercial</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                After-hours office carpet steam cleaning, commercial tile scrubbing, and reception furniture care with minimal disruption.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-xs space-y-3 hover:border-[#085032] transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center">
                <Landmark className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Defence Housing</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                DHA handover carpet steam cleaning and pest treatments adhering strictly to military relocation inspection checklists.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-emerald-100 shadow-xs space-y-3 hover:border-[#085032] transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#085032] flex items-center justify-center">
                <RefreshCw className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Repeat & Referral Clients</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Over 100,000 satisfied jobs since 2008 with a 5.0 Google rating built on long-term client trust and word-of-mouth.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Stats Band (Electrodry Style 4-Column Hairline Band) */}
      <section className="bg-white py-12 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <div className="text-4xl lg:text-5xl font-black text-[#085032]">2008</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">ESTABLISHED IN CANBERRA</div>
            </div>

            <div className="space-y-1 md:border-l md:border-slate-200">
              <div className="text-4xl lg:text-5xl font-black text-[#085032]">100%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">BOND BACK GUARANTEE</div>
            </div>

            <div className="space-y-1 md:border-l md:border-slate-200">
              <div className="text-4xl lg:text-5xl font-black text-[#085032]">100,000+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">JOBS COMPLETED</div>
            </div>

            <div className="space-y-1 md:border-l md:border-slate-200">
              <div className="text-4xl lg:text-5xl font-black text-[#085032]">5.0 ★</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">VERIFIED GOOGLE RATING</div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. "Why Choose Us" Section (Stain Busters 3x2 Icon Grid) */}
      <section className="py-20 bg-[#f4f8f5] border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#085032]">THE DIFFERENCE</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Why Choose Us for Carpet Cleaning?
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              We combine truck-mounted equipment, certified technicians, and clear pricing with zero call-out surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#085032] flex items-center justify-center border border-emerald-200">
                <Truck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Advanced Truck-Mounted Vans</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Our high-powered mobile units generate intense hot water steam to extract deep soil, pet urine crystals, and allergens from base fibers.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#085032] flex items-center justify-center border border-emerald-200">
                <Award className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">17+ Years Local Experience</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Family-owned and operated in Taylor, ACT since 2008. We know every Canberra property layout from Belconnen to Tuggeranong.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#085032] flex items-center justify-center border border-emerald-200">
                <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Comprehensive ACT Coverage</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                We cover all Canberra suburbs, Queanbeyan, Jerrabomberra, Bungendore, and Yass with zero travel surcharges.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#085032] flex items-center justify-center border border-emerald-200">
                <Leaf className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Eco-Friendly & Pet Safe</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Non-toxic, biodegradable solutions that leave zero sticky residue, ensuring your carpets are completely safe for children and pets.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#085032] flex items-center justify-center border border-emerald-200">
                <RefreshCw className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">100% Satisfaction Guaranteed</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                If you or your real estate property manager are not completely satisfied with the clean, we return free of charge to resolve it.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#085032] flex items-center justify-center border border-emerald-200">
                <CreditCard className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Upfront Price Transparency</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Prices start from $27/room with our 20% online booking discount auto-applied. Zero hidden fees or deposit requirements.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Cleaning Process (Stain Busters Numbered Step List) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#085032]">STEP-BY-STEP WORKFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Our Cleaning Process</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 space-y-4 shadow-xs relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-100 text-[#085032] rounded-full border border-emerald-200">Step 1</span>
                <PhoneCall className="w-5 h-5 text-[#085032]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Initial Contact & Quote</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Call 0481 734 225 or calculate your instant estimate online in 60 seconds.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 space-y-4 shadow-xs relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-100 text-[#085032] rounded-full border border-emerald-200">Step 2</span>
                <CalendarCheck className="w-5 h-5 text-[#085032]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Schedule & Inspection</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Select date & time slot. Our team conducts pre-inspection upon arrival.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 space-y-4 shadow-xs relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-100 text-[#085032] rounded-full border border-emerald-200">Step 3</span>
                <Sparkles className="w-5 h-5 text-[#085032]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Truck-Mounted Steam Wash</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Hot water extraction deep cleans fibers, treats stains & sanitizes carpets.</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#f4f8f5] border border-emerald-100 space-y-4 shadow-xs relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-100 text-[#085032] rounded-full border border-emerald-200">Step 4</span>
                <CreditCard className="w-5 h-5 text-[#085032]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900">Inspection & Payment</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">Review final result, receive tax invoice, and pay via EFTPOS or cash after clean.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. High-Contrast FAQ Preview & Closing CTA Band */}
      <section className="py-20 bg-[#043d22] text-white border-t border-emerald-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-[#facc15] text-xs font-black uppercase tracking-wider border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Ready for Clean Carpets in Canberra?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Get Your Instant Quote in 60 Seconds
          </h2>

          <p className="text-emerald-100 font-medium text-base max-w-xl mx-auto">
            Auto-apply your 20% online booking discount with zero deposit required. Prices start from $27/room.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link 
              href="/instant-quote" 
              className="btn-yellow-pill px-8 py-4 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <span>Get Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a 
              href={BUSINESS_INFO.telLink} 
              className="btn-white-ghost-pill px-8 py-4 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call {BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}



