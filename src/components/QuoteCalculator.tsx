'use client';

import { useState, useMemo } from 'react';
import { SERVICES, ACT_SUBURBS, BookingRecord } from '@/data/cleaningData';
import { Calculator, Check, Calendar as CalendarIcon, Clock, MapPin, Sparkles, User, Phone, Mail, X, ShieldCheck, ArrowRight, RefreshCw, AlertCircle, Bed, Armchair, Grid, Layers, Droplets, Bug, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface QuoteCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function QuoteCalculator({ isOpen = true, onClose }: QuoteCalculatorProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>('carpet-steam');
  const [roomsCount, setRoomsCount] = useState<number>(3);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [suburbSearch, setSuburbSearch] = useState<string>('Canberra City');
  const [address, setAddress] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState<string>('Morning (8:00 AM - 12:00 PM)');

  // Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<BookingRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Price Calculation Logic
  const calculatedPrice = useMemo(() => {
    let base = 89;
    if (selectedService === 'carpet-steam') {
      if (roomsCount <= 3) base = 89;
      else base = 89 + (roomsCount - 3) * 27;
    } else if (selectedService === 'end-of-lease') {
      base = 149 + (roomsCount > 3 ? (roomsCount - 3) * 35 : 0);
    } else if (selectedService === 'upholstery-couch') {
      base = roomsCount * 39;
    } else if (selectedService === 'tile-grout') {
      base = roomsCount * 45;
    } else if (selectedService === 'mattress-sanitizing') {
      base = roomsCount * 59;
    } else if (selectedService === 'rug-cleaning') {
      base = roomsCount * 45;
    } else if (selectedService === 'pest-control') {
      base = 79;
    } else {
      base = 120;
    }

    if (selectedAddons.includes('pet-odor')) base += 25;
    if (selectedAddons.includes('deodorizer')) base += 15;
    if (selectedAddons.includes('fabric-protection')) base += 35;
    if (selectedAddons.includes('flea-spray')) base += 45;

    return Math.round(base);
  }, [selectedService, roomsCount, selectedAddons]);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const renderServiceIcon = (name: string) => {
    switch (name) {
      case 'Armchair': return <Armchair className="w-5 h-5" />;
      case 'Grid': return <Grid className="w-5 h-5" />;
      case 'Bed': return <Bed className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Bug': return <Bug className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !suburbSearch) {
      setErrorMessage('Please fill in your name, phone number, and suburb.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const activeService = SERVICES.find((s) => s.id === selectedService);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          address: address ? `${address}, ${suburbSearch}` : suburbSearch,
          suburb: suburbSearch,
          serviceId: selectedService,
          serviceTitle: activeService ? activeService.title : 'Carpet Steam Cleaning',
          roomsCount,
          addons: selectedAddons,
          preferredDate,
          preferredTime,
          estimatedPrice: calculatedPrice
        })
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(data.booking);
      } else {
        setErrorMessage(data.error || 'Failed to process booking.');
      }
    } catch (err: any) {
      setErrorMessage('Network error while booking. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="calculator-section" className="py-12 bg-[#f0f9ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Light Card Container */}
        <div className="relative rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 overflow-hidden">
          
          {/* Top Decorative Blue Glow */}
          <div className="absolute -top-24 right-0 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Close Header (If Modal Mode) */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-300 text-sky-800 text-xs font-black uppercase tracking-wider shadow-xs">
              <Calculator className="w-4 h-4 text-sky-600" />
              <span>Instant Quote & Booking Wizard</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Calculate Your Canberra Cleaning Deal
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Get an instant price estimate and reserve your spot in less than 60 seconds. Zero upfront deposit required.
            </p>
          </div>

          {/* Booking Confirmation View */}
          {bookingSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-lime-100 text-lime-700 border border-lime-300 flex items-center justify-center shadow-lg">
                <Check className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-black tracking-widest text-lime-700">
                  Booking Confirmed!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Reference: <span className="text-sky-700">{bookingSuccess.referenceId}</span>
                </h3>
                <p className="text-slate-600 text-sm max-w-lg mx-auto">
                  Thank you, <strong className="text-slate-900">{bookingSuccess.customerName}</strong>! We have dispatched your booking details to our Canberra cleaning team.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="max-w-md mx-auto bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-sm text-slate-700 shadow-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Service:</span>
                  <span className="font-bold text-slate-900">{bookingSuccess.serviceTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Location:</span>
                  <span className="font-bold text-slate-900">{bookingSuccess.suburb}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Preferred Date:</span>
                  <span className="font-bold text-slate-900">{bookingSuccess.preferredDate} ({bookingSuccess.preferredTime})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-semibold">Phone:</span>
                  <span className="font-bold text-slate-900">{bookingSuccess.phone}</span>
                </div>
                <div className="flex justify-between text-base pt-1">
                  <span className="font-bold text-slate-900">Estimated Total:</span>
                  <span className="font-black text-lime-700 text-lg">${bookingSuccess.estimatedPrice} AUD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => {
                    setBookingSuccess(null);
                    setStep(1);
                  }}
                  className="px-6 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Book Another Service</span>
                </button>
                <a
                  href={`tel:0481734225`}
                  className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-sm transition-colors flex items-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Dispatch (0481 734 225)</span>
                </a>
              </div>
            </motion.div>
          ) : (
            /* Calculator Multi-Step Form */
            <div className="space-y-8">
              
              {/* Stepper Tabs with Framer Motion Sliding Pill */}
              <div className="relative flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl max-w-xl mx-auto border border-slate-200">
                {[
                  { num: 1, label: 'Service' },
                  { num: 2, label: 'Schedule' },
                  { num: 3, label: 'Confirm' }
                ].map((s) => {
                  const isCurrent = step === s.num;
                  const isComplete = step > s.num;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setStep(s.num)}
                      className={`relative flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-colors z-10 ${
                        isCurrent ? 'text-white' : isComplete ? 'text-sky-700' : 'text-slate-500'
                      }`}
                    >
                      {isCurrent && (
                        <motion.div
                          layoutId="activeCalculatorTab"
                          className="absolute inset-0 bg-sky-600 rounded-xl shadow-md z-0"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        {isComplete ? (
                          <Check className="w-4 h-4 text-lime-600 font-bold" />
                        ) : (
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                            isCurrent ? 'bg-white text-sky-700 font-black' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {s.num}
                          </span>
                        )}
                        <span>{s.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Indicator Bar */}
              <div className="max-w-xl mx-auto space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Wizard Progress</span>
                  <span className="text-sky-700 font-black">{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-lime-500 rounded-full shadow-xs"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Step Content Wrapper with AnimatePresence */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Step Input Panel */}
                <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: Select Service & Quantities */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <label className="block text-sm font-extrabold text-slate-900">
                          Choose Primary Cleaning Service:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {SERVICES.map((srv) => {
                            const isSelected = selectedService === srv.id;
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => setSelectedService(srv.id)}
                                className={`p-4 rounded-2xl border text-left transition-all ${
                                  isSelected
                                    ? 'bg-sky-50 border-sky-600 shadow-md shadow-sky-600/10'
                                    : 'bg-white border-slate-200 hover:border-sky-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                    {renderServiceIcon(srv.iconName)}
                                  </div>
                                  {isSelected && <Check className="w-4 h-4 text-sky-600 font-extrabold" />}
                                </div>
                                <div className="font-bold text-slate-900 text-sm mt-3">{srv.title}</div>
                                <div className="text-xs text-lime-700 font-black mt-1">
                                  From {srv.startingPrice}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Quantity Stepper with Circular Icon Buttons */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <div className="font-black text-slate-900 text-sm">
                              {selectedService === 'upholstery-couch' ? 'Number of Sofa Seats' : selectedService === 'tile-grout' ? 'Estimated Area (Sq Meters)' : 'Number of Rooms / Areas'}
                            </div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">
                              Minimum 3 rooms for base deal ($89). Extra rooms +$27/ea.
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              whileHover={{ scale: 1.05 }}
                              type="button"
                              onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 font-black flex items-center justify-center hover:bg-slate-100 shadow-sm"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.span
                              key={roomsCount}
                              initial={{ scale: 1.3, color: '#0284c7' }}
                              animate={{ scale: 1, color: '#0f172a' }}
                              className="w-10 text-center text-2xl font-black"
                            >
                              {roomsCount}
                            </motion.span>
                            
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              whileHover={{ scale: 1.05 }}
                              type="button"
                              onClick={() => setRoomsCount(roomsCount + 1)}
                              className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-800 font-black flex items-center justify-center hover:bg-slate-100 shadow-sm"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Next Step CTA */}
                        <div className="flex items-center justify-end pt-4">
                          <motion.button
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: 1.02 }}
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-7 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
                          >
                            <span>Continue to Schedule</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Schedule & Add-ons */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div className="space-y-3">
                          <label className="block text-sm font-extrabold text-slate-900">
                            Recommended Treatments & Add-ons:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => toggleAddon('pet-odor')}
                              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                                selectedAddons.includes('pet-odor')
                                  ? 'bg-sky-50 border-sky-600 text-slate-900'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div>
                                <div className="font-bold text-sm">Pet Stain & Odor Enzymatic Wash</div>
                                <div className="text-xs text-slate-500">Deep urine enzyme breakdown</div>
                              </div>
                              <span className="text-xs font-black text-sky-700">+$25</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleAddon('fabric-protection')}
                              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                                selectedAddons.includes('fabric-protection')
                                  ? 'bg-sky-50 border-sky-600 text-slate-900'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div>
                                <div className="font-bold text-sm">Scotchgard Stain Guard</div>
                                <div className="text-xs text-slate-500">Spill repelling barrier</div>
                              </div>
                              <span className="text-xs font-black text-sky-700">+$35</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleAddon('deodorizer')}
                              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                                selectedAddons.includes('deodorizer')
                                  ? 'bg-sky-50 border-sky-600 text-slate-900'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div>
                                <div className="font-bold text-sm">Fresh Jasmine Deodorizer</div>
                                <div className="text-xs text-slate-500">Long-lasting room perfume</div>
                              </div>
                              <span className="text-xs font-black text-sky-700">+$15</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleAddon('flea-spray')}
                              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                                selectedAddons.includes('flea-spray')
                                  ? 'bg-sky-50 border-sky-600 text-slate-900'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <div>
                                <div className="font-bold text-sm">End of Lease Flea Spray</div>
                                <div className="text-xs text-slate-500">Pet exit agreement certificate</div>
                              </div>
                              <span className="text-xs font-black text-sky-700">+$45</span>
                            </button>
                          </div>
                        </div>

                        {/* Date & Time Selector */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <CalendarIcon className="w-4 h-4 text-sky-600" />
                              Preferred Date:
                            </label>
                            <input
                              type="date"
                              value={preferredDate}
                              onChange={(e) => setPreferredDate(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-sky-600" />
                              Preferred Time Slot:
                            </label>
                            <select
                              value={preferredTime}
                              onChange={(e) => setPreferredTime(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-sky-600 shadow-xs"
                            >
                              <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                              <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                              <option value="Late Afternoon (4:00 PM - 7:00 PM)">Late Afternoon (4:00 PM - 7:00 PM)</option>
                            </select>
                          </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                          >
                            Back
                          </button>

                          <motion.button
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: 1.02 }}
                            type="button"
                            onClick={() => setStep(3)}
                            className="px-7 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-md"
                          >
                            <span>Final Step: Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Customer Details & Final Submit */}
                    {step === 3 && (
                      <motion.form
                        key="step3"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleBookingSubmit}
                        className="space-y-6"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <User className="w-4 h-4 text-sky-600" />
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Sarah Jenkins"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <Phone className="w-4 h-4 text-sky-600" />
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 0481 734 225"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <Mail className="w-4 h-4 text-sky-600" />
                              Email Address (Optional)
                            </label>
                            <input
                              type="email"
                              placeholder="sarah@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-sky-600" />
                              Canberra Suburb *
                            </label>
                            <select
                              value={suburbSearch}
                              onChange={(e) => setSuburbSearch(e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs font-medium"
                            >
                              {ACT_SUBURBS.map((sub) => (
                                <option key={sub.name} value={sub.name}>
                                  {sub.name} ({sub.postcode}) - {sub.region}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Street Address (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 14 Anketell St, Tuggeranong"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-sky-600 shadow-xs font-medium"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                          >
                            Back
                          </button>

                          <motion.button
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: 1.02 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Confirming...</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-5 h-5" />
                                <span>Submit Booking</span>
                              </>
                            )}
                          </motion.button>
                        </div>
                      </motion.form>
                    )}

                  </AnimatePresence>
                </div>

                {/* Right Dark Gradient Summary Card with Animated Total */}
                <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 text-white p-6 shadow-2xl border border-slate-800 space-y-6">
                  <div className="space-y-1 border-b border-slate-800 pb-4">
                    <div className="text-[10px] font-black uppercase text-lime-400 tracking-wider">LIVE ESTIMATE</div>
                    <h3 className="text-xl font-black text-white">Deal Summary</h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Service:</span>
                      <span className="font-bold text-white capitalize">{selectedService.replace('-', ' ')}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>Rooms / Seats:</span>
                      <span className="font-bold text-white">{roomsCount}</span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-1 pt-2 border-t border-slate-800">
                        <span className="text-slate-400 text-[11px] font-semibold">Selected Add-ons:</span>
                        {selectedAddons.map((a) => (
                          <div key={a} className="flex justify-between text-[11px] text-slate-300 pl-2">
                            <span>• {a.replace('-', ' ')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Big Focal Estimated Total Display */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 text-center">
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">ESTIMATED TOTAL</div>
                    <div className="text-4xl sm:text-5xl font-black text-lime-400">
                      $<AnimatedCounter value={calculatedPrice} />
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold">Includes 20% Auto-Applied Discount</div>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-lime-400 flex-shrink-0" />
                      <span>100% Satisfaction Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>Zero Upfront Credit Card Deposit</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

