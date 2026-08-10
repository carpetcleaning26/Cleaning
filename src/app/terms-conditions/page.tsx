import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BUSINESS_INFO } from '@/data/canberraData';
import { ShieldCheck, FileText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | Canberra Carpet Cleaning Deals",
  description: "Official booking terms, 100% satisfaction guarantee policy, cancellation terms, and payment guidelines."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-4xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-400 text-slate-950 text-xs font-black uppercase shadow-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>Policy Terms & Guarantees</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Terms & Conditions</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">
            Booking policies, 100% satisfaction guarantee guidelines, and service conditions.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md space-y-6 text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
          
          <div className="space-y-2">
            <h2 className="text-lg font-black text-slate-900">1. Booking & Pricing Policy</h2>
            <p>
              Online quotes provided via our Instant Quote Calculator include our auto-applied 20% online booking discount. Final pricing may adjust if room dimensions exceed standard sizes (12m² per bedroom), or if severe soiling, pet urine crystal deep extraction, or heavy furniture movement is requested upon arrival.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-black text-slate-900">2. 100% Satisfaction & End-of-Lease Guarantee</h2>
            <p>
              We provide a 100% Satisfaction Guarantee. If you are unsatisfied with any cleaned area, notify us within 48 hours and we will re-clean the area free of charge. For End of Lease cleaning, if your ACT real estate property manager identifies carpet cleaning issues on their inspection report, we provide a free 72-hour re-clean.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-black text-slate-900">3. Access & Utilities</h2>
            <p>
              Clients must provide access to electricity and running tap water at the premises on the scheduled booking date unless prior arrangements have been made for generator/water tank dispatches.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-black text-slate-900">4. Payment Terms</h2>
            <p>
              No credit card deposit is required upfront to book online. Payment is due upon completion of the cleaning service via EFTPOS, cash, or credit card. Official tax invoices will be issued digitally for real estate and business record-keeping.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-200 pt-4">
            <h2 className="text-lg font-black text-slate-900">5. Contact Information</h2>
            <p>
              Canberra Carpet Cleaning Deals <br />
              Address: 5 Holford St, Taylor, ACT 2913 <br />
              Phone: 0481 734 225 <br />
              Email: info@canberracarpetcleaningdeals.com.au
            </p>
          </div>

        </article>
      </div>

      <Footer />
    </main>
  );
}
