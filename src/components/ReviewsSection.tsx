'use client';

import { useState, useEffect } from 'react';
import { REVIEWS, ReviewItem, COMPANY_INFO } from '@/data/cleaningData';
import { Star, MessageSquarePlus, CheckCircle2, User, X, RefreshCw, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Review Form state
  const [author, setAuthor] = useState('');
  const [suburb, setSuburb] = useState('Gungahlin');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Carpet Steam Cleaning');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.reviews) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, suburb, rating, service, comment })
      });
      const data = await res.json();
      if (data.success) {
        setReviews([data.review, ...reviews]);
        setIsWriteModalOpen(false);
        setAuthor('');
        setComment('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-20 bg-[#f0f9ff] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-wider shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>EXCELLENT — BASED ON 80+ REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Loved by 10,000+ Canberra Locals
            </h2>
            <p className="text-slate-600 text-base font-medium flex items-center justify-center md:justify-start gap-2">
              <span className="font-black text-amber-600">5.0★</span>
              <span>Verified Google Reviews across all ACT suburbs.</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-md">
              <div className="text-3xl font-black text-slate-900">{COMPANY_INFO.googleRating}★</div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-black text-slate-700 mt-0.5">80+ Verified Google Reviews</div>
              </div>
            </div>

            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="px-5 py-3.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </motion.div>

        {/* Reviews Horizontal Continuous Marquee Slider */}
        <div className="relative overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 group">
          
          {/* Left & Right Gradient Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#f0f9ff] via-[#f0f9ff]/80 to-transparent z-20"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#f0f9ff] via-[#f0f9ff]/80 to-transparent z-20"></div>

          {/* Marquee Track (Duplicated list for infinite loop, pause on hover) */}
          <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((rev, index) => (
              <motion.div
                key={`${rev.id}-${index}`}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative w-80 sm:w-96 flex-shrink-0 bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Decorative Quote Mark */}
                <Quote className="absolute -top-2 -right-2 w-20 h-20 text-sky-100 fill-sky-50 opacity-60 pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  {/* Rating Stars & Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Footer with Profile Image */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3 relative z-10">
                  {rev.avatarImg ? (
                    <img
                      src={rev.avatarImg}
                      alt={rev.author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-sky-500 shadow-sm"
                    />
                  ) : (
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${rev.avatarBg || 'from-sky-500 to-blue-600'} flex items-center justify-center font-bold text-white text-sm shadow-md`}>
                      {rev.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      {rev.author}
                      <CheckCircle2 className="w-3.5 h-3.5 text-lime-600" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {rev.suburb} • <span className="text-sky-700 font-bold">{rev.service}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>

        {/* Write Review Modal */}
        <AnimatePresence>
          {isWriteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
              >
                
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Leave a Review</h3>
                  <p className="text-slate-500 text-xs font-medium">Share your experience with Canberra Carpet Cleaning Deals.</p>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Miller"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Suburb</label>
                      <input
                        type="text"
                        placeholder="e.g. Belconnen"
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                      >
                        <option value={5}>5 Stars (Excellent)</option>
                        <option value={4}>4 Stars (Good)</option>
                        <option value={3}>3 Stars (Average)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Received</label>
                    <input
                      type="text"
                      placeholder="e.g. Carpet Steam Clean"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Review Comment</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about the cleaning quality..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      {isSubmitting ? 'Publishing...' : 'Submit Review'}
                    </button>
                  </div>
                </form>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

