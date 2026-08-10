import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RemoteImage from '@/components/RemoteImage';
import { SERVICES, BUSINESS_INFO, ACT_SUBURBS_LIST } from '@/data/canberraData';
import { notFound } from 'next/navigation';
import { CheckCircle2, Phone, Calendar, ArrowLeft, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

interface ServiceSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServiceSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} Canberra | Canberra Carpet Cleaning Deals`,
    description: service.shortDesc
  };
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function IndividualServicePage({ params }: ServiceSlugProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f0f9ff] text-slate-900">
      <Header />

      {/* Breadcrumb Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white py-14 px-4 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs text-lime-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <Link href="/" className="hover:underline text-slate-300">Home</Link>
            <span>/</span>
            <Link href="/service-details" className="hover:underline text-slate-300">Services</Link>
            <span>/</span>
            <span className="text-lime-400">{service.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{service.name} Canberra</h1>
          <p className="text-slate-300 text-sm max-w-2xl font-medium">{service.shortDesc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Featured Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg bg-slate-200">
              <RemoteImage
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-lime-500 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full shadow-xs">
                17+ Years Canberra Experience
              </div>
            </div>

            {/* Intro Copy */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Professional {service.name} across all ACT Suburbs</h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                {service.fullDesc}
              </p>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-xl font-black text-slate-900">Why Canberra Households Choose Us For {service.name}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.differentiators.map((diff, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-bold text-slate-800 bg-[#f0f9ff] p-3 rounded-2xl border border-sky-200">
                    <CheckCircle2 className="w-4 h-4 text-lime-600 flex-shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cleaning Process Steps */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-xl font-black text-slate-900">Our {service.name} Process</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-black text-slate-900">{step.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 font-medium pl-8">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">{service.name} Pricing Guide</h3>
                <span className="text-xs font-black uppercase text-lime-700 bg-lime-100 px-3 py-1 rounded-full border border-lime-300">
                  20% Online Discount Included
                </span>
              </div>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                {service.pricingNotes.map((note, idx) => (
                  <div key={idx} className="p-3 bg-[#f0f9ff] rounded-xl border border-sky-200 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas Paragraph */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <h3 className="text-lg font-black text-slate-900">Service Areas</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                We service every district in Canberra ACT including Belconnen, Gungahlin, Tuggeranong, Woden Valley, Weston Creek, Molonglo Valley, Inner North (Braddon, Turner, Reid, Dickson, Lyneham, Watson, O'Connor, Ainslie), Inner South (Manuka, Kingston, Griffith, Forrest, Yarralumla, Deakin, Red Hill, Narrabundah), plus Queanbeyan NSW, Jerrabomberra, Bungendore, and Yass.
              </p>
            </div>

            {/* Final CTA */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between border-l-8 border-lime-500 shadow-xl">
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-white">Book {service.name} Today</h4>
                <p className="text-xs text-slate-300">Get your exact price in 60 seconds with zero upfront deposit.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/instant-quote" className="px-6 py-3 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase shadow-md transition-transform active:scale-95">
                  INSTANT QUOTE
                </Link>
                <a href={BUSINESS_INFO.telLink} className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase shadow-md transition-transform active:scale-95">
                  CALL {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sidebar Navigation */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
              <div className="text-xs font-black uppercase text-slate-400 tracking-wider">All 9 Cleaning Services</div>
              <div className="space-y-1.5 text-xs font-bold">
                {SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className={`block p-2.5 rounded-xl transition-colors ${
                      s.slug === slug ? 'bg-sky-600 text-white font-black' : 'text-slate-700 hover:bg-sky-50'
                    }`}
                  >
                    {s.navTitle}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar CTA Card */}
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-md space-y-4 text-center">
              <div className="relative h-40 w-full rounded-2xl overflow-hidden">
                <RemoteImage
                  src="https://www.canberracarpetcleaningdeals.com.au/assets/images/services/sidebar-img1.jpg"
                  alt="Call Canberra Carpet Cleaning"
                  className="w-full h-full object-cover"
                  fallbackSrc="/images/hero-carpet.png"
                />
              </div>
              <h4 className="text-lg font-black text-white">Need Urgent Same-Day Clean?</h4>
              <p className="text-xs text-slate-300">Book before 11am for guaranteed same-day team dispatch anywhere in the ACT.</p>
              <a
                href={BUSINESS_INFO.telLink}
                className="w-full py-3 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider block shadow-md transition-transform active:scale-95"
              >
                CALL {BUSINESS_INFO.phone}
              </a>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
