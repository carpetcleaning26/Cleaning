'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BUSINESS_INFO } from '@/data/canberraData';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [suburb, setSuburb] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, suburb, message })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-[#043d22] text-white py-14 px-4 border-b border-emerald-900 shadow-md">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="text-xs text-[#facc15] font-bold uppercase tracking-wider">
            <Link href="/" className="hover:underline text-emerald-200">Home</Link> / Contact Us
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Contact Us</h1>
          <p className="text-emerald-100 text-sm max-w-xl font-medium">
            We'd Love to Hear From You — Have a question about a booking, need a custom quote, or want to check availability in your suburb? Reach out using any of the details below and our Canberra-based team will get back to you quickly.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Info Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#f4f8f5] p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#085032] flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5 text-[#085032]" />
            </div>
            <div className="text-xs font-black uppercase text-slate-400">Our Location</div>
            <div className="text-sm font-black text-slate-900">{BUSINESS_INFO.address}</div>
          </div>

          <div className="bg-[#f4f8f5] p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#085032] flex items-center justify-center font-bold">
              <Phone className="w-5 h-5 text-[#085032]" />
            </div>
            <div className="text-xs font-black uppercase text-slate-400">Call Us</div>
            <a href={BUSINESS_INFO.telLink} className="text-sm font-black text-[#085032] hover:underline">{BUSINESS_INFO.phone}</a>
          </div>

          <div className="bg-[#f4f8f5] p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#085032] flex items-center justify-center font-bold">
              <Mail className="w-5 h-5 text-[#085032]" />
            </div>
            <div className="text-xs font-black uppercase text-slate-400">Email Us</div>
            <div className="text-xs font-black text-slate-900">{BUSINESS_INFO.email}</div>
          </div>

          <div className="bg-[#f4f8f5] p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#085032] flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-[#085032]" />
            </div>
            <div className="text-xs font-black uppercase text-slate-400">Working Hours</div>
            <div className="text-xs font-bold text-slate-800">{BUSINESS_INFO.hours}</div>
          </div>
        </div>

        {/* Contact Form & Google Maps Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-6 bg-[#f4f8f5] p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Send Us a Message</h2>
              <p className="text-xs text-slate-500 font-medium">Our Canberra dispatch team responds quickly.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-100 border border-emerald-200 text-[#085032] space-y-2">
                <div className="flex items-center gap-2 font-black text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#085032]" />
                  <span>Message Sent Successfully!</span>
                </div>
                <p className="text-xs font-medium">Thank you {name}. Our team will call you back shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:border-[#085032] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0481 734 225"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:border-[#085032] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:border-[#085032] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Canberra Suburb</label>
                    <input
                      type="text"
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      placeholder="e.g. Taylor / Belconnen"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:border-[#085032] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help with your cleaning needs?"
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs font-bold focus:border-[#085032] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-yellow-pill w-full py-3.5 text-xs uppercase tracking-wider shadow-md"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-6 bg-[#f4f8f5] p-4 rounded-3xl border border-emerald-100 shadow-xs h-[450px] overflow-hidden">
            <iframe
              title="Google Map - 5 Holford St, Taylor ACT 2913"
              src="https://www.google.com/maps?q=5+Holford+St,+Taylor+ACT+2913&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.5rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}

