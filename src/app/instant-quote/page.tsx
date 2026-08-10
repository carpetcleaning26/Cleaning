import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveCalculator from '@/components/InteractiveCalculator';
import { Metadata } from 'next';
import { Star, ShieldCheck, Award, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: "Instant Quote — Carpet, Rug, Upholstery & Tile Cleaning Canberra",
  description: "Build your instant booking for carpet steam cleaning, rug cleaning, sofa washing or tile scrub in Canberra. Auto-applied 20% online booking discount."
};

export default function InstantQuotePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-5xl mx-auto space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-lime-400 font-bold uppercase">
            <Star className="w-4 h-4 fill-lime-400 text-lime-400" />
            <span>Trusted by Canberra Households — 5.0★ Verified Google Rating</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Instant Quote Calculator
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-medium">
            Family-owned since 2008. Eco-friendly non-toxic solutions. Same-day service available across all ACT suburbs when booked before 11am.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>100% Satisfaction Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              <span>Fully Insured & Licensed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span>Eco Pet/Child Safe</span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <InteractiveCalculator />
      </div>

      <Footer />
    </main>
  );
}
