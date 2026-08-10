'use client';

import { useState } from 'react';
import { BookingRecord } from '@/data/cleaningData';
import { Search, X, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingLookupModal({ isOpen, onClose }: BookingLookupModalProps) {
  const [refCode, setRefCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refCode) return;

    setLoading(true);
    setError(null);
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings?ref=${encodeURIComponent(refCode.trim())}`);
      const data = await res.json();
      if (data.success && data.booking) {
        setBooking(data.booking);
      } else {
        setError(data.error || 'No booking record found for this reference code.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-sky-700">
            <Search className="w-4 h-4" />
            <span>Track Live Status</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Lookup Booking Reference</h3>
          <p className="text-slate-500 text-xs font-medium">Enter your ACT booking code (e.g. ACT-89421) received after submitting a quote.</p>
        </div>

        <form onSubmit={handleLookup} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. ACT-123456"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono text-sm focus:outline-none focus:border-sky-600 uppercase font-bold"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Find</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {booking && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 text-sm">Status:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-lime-100 text-lime-800 font-black border border-lime-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-600" />
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-slate-500 block font-medium">Customer Name:</span>
                <span className="font-bold text-slate-900">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Suburb:</span>
                <span className="font-bold text-slate-900">{booking.suburb}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Service:</span>
                <span className="font-bold text-slate-900">{booking.serviceTitle}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Scheduled Date:</span>
                <span className="font-bold text-sky-700">{booking.preferredDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
              <span className="text-slate-500 font-bold">Estimated Total:</span>
              <span className="font-black text-lime-700 text-base">${booking.estimatedPrice} AUD</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
