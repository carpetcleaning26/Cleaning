'use client';

import { useState, useMemo } from 'react';
import { BUSINESS_INFO, ACT_SUBURBS_LIST } from '@/data/canberraData';
import { Calculator, Check, ArrowRight, RefreshCw, AlertCircle, Home, Building, ShieldCheck, Clock, User, Phone, Mail, MapPin, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function InteractiveCalculator() {
  const [step, setStep] = useState<number>(1);

  // Step 1: Property Info
  const [propertyType, setPropertyType] = useState<'house' | 'apartment'>('house');
  const [occupancy, setOccupancy] = useState<'furnished' | 'empty'>('empty');
  const [stories, setStories] = useState<number>(1);
  const [hasLift, setHasLift] = useState<boolean>(true);
  const [floorNumber, setFloorNumber] = useState<string>('1');

  // Step 2: Service Quantities
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [livingRooms, setLivingRooms] = useState<number>(1);
  const [hallways, setHallways] = useState<number>(1);
  const [stairs, setStairs] = useState<number>(0);
  const [walkinRobes, setWalkinRobes] = useState<number>(0);
  const [rugs, setRugs] = useState<number>(0);
  const [upholsterySeats, setUpholsterySeats] = useState<number>(0);
  const [mattresses, setMattresses] = useState<number>(0);
  const [tileSqm, setTileSqm] = useState<number>(0);
  const [curtains, setCurtains] = useState<number>(0);
  const [pestFleaTreatment, setPestFleaTreatment] = useState<boolean>(false);

  // Step 3: Customer Info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [suburb, setSuburb] = useState('Gungahlin');
  const [streetAddress, setStreetAddress] = useState('');
  const [bookingDate, setBookingDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('7:30am - 10:00am');
  const [notes, setNotes] = useState('');

  // Step 4: Submission State
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  // Pricing Logic
  const priceMath = useMemo(() => {
    const basePropertyFee = 73;
    let servicesTotal = 0;

    servicesTotal += bedrooms * 27;
    servicesTotal += livingRooms * 46;
    servicesTotal += hallways * 27;
    servicesTotal += walkinRobes * 5;
    servicesTotal += stairs * 27;
    servicesTotal += rugs * 32;
    servicesTotal += upholsterySeats * 41;
    servicesTotal += mattresses * 59;
    servicesTotal += tileSqm * 4.5;
    servicesTotal += curtains * 35;
    if (pestFleaTreatment) servicesTotal += 79;

    const subtotalBeforeDiscount = basePropertyFee + servicesTotal;
    const onlineDiscountAmount = Math.round(subtotalBeforeDiscount * 0.20);
    const extraCouponDiscount = couponApplied ? 15 : 0;
    const discountedSubtotal = Math.max(0, subtotalBeforeDiscount - onlineDiscountAmount - extraCouponDiscount);
    const gstAmount = Math.round(discountedSubtotal * 0.10);
    const grandTotal = Math.round(discountedSubtotal + gstAmount);

    return {
      basePropertyFee,
      servicesTotal,
      subtotalBeforeDiscount,
      onlineDiscountAmount,
      extraCouponDiscount,
      discountedSubtotal,
      gstAmount,
      grandTotal
    };
  }, [
    bedrooms, livingRooms, hallways, walkinRobes, stairs, rugs,
    upholsterySeats, mattresses, tileSqm, curtains, pestFleaTreatment,
    couponApplied
  ]);

  const completionPercent = useMemo(() => {
    let p = 25;
    if (step >= 2) p = 50;
    if (step >= 3) p = 75;
    if (step >= 4) p = 100;
    return p;
  }, [step]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'CANBERRA15') {
      setCouponApplied(true);
    }
  };

  const handleFinalBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);

    const selectedServicesList = [];
    if (bedrooms > 0) selectedServicesList.push({ name: 'Bedrooms Steam Clean', quantity: bedrooms, price: bedrooms * 27 });
    if (livingRooms > 0) selectedServicesList.push({ name: 'Living / Dining Areas', quantity: livingRooms, price: livingRooms * 46 });
    if (hallways > 0) selectedServicesList.push({ name: 'Hallway', quantity: hallways, price: hallways * 27 });
    if (stairs > 0) selectedServicesList.push({ name: 'Stairs', quantity: stairs, price: stairs * 27 });
    if (upholsterySeats > 0) selectedServicesList.push({ name: 'Upholstery Couch Seats', quantity: upholsterySeats, price: upholsterySeats * 41 });
    if (rugs > 0) selectedServicesList.push({ name: 'Area Rugs', quantity: rugs, price: rugs * 32 });
    if (pestFleaTreatment) selectedServicesList.push({ name: 'End of Lease Flea Spray', quantity: 1, price: 79 });

    if (selectedServicesList.length === 0) {
      selectedServicesList.push({ name: 'Standard Carpet Steam Package (3 Rooms)', quantity: 1, price: priceMath.grandTotal });
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          email: email || 'no-email@customer.com',
          phone,
          address: streetAddress || 'Canberra ACT',
          suburb: suburb || 'Canberra',
          propertyType: propertyType === 'house' ? 'House / Townhouse' : 'Apartment / Unit',
          selectedServices: selectedServicesList,
          totalAmount: priceMath.grandTotal,
          discountApplied: true,
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookingRef(data.referenceId || `CCCD-${Math.floor(100000 + Math.random() * 900000)}`);
      } else {
        setBookingRef(`CCCD-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } catch (err) {
      setBookingRef(`CCCD-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Banner */}
      <div className="bg-lime-500 text-slate-950 p-4 rounded-2xl font-black text-xs sm:text-sm text-center uppercase tracking-wider shadow-sm mb-8 flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5" />
        <span>20% Off Online Booking Discount — Auto-Applied at Checkout</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Main Step Form Container */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
          
          {/* Header */}
          <div className="space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Instant Quote — Carpet, Rug, Upholstery & Tile Cleaning Canberra
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Build your booking. Our live calculator shows your exact price as you select services. 100% Satisfaction Guarantee or your money back.
            </p>
          </div>

          {/* Stepper Tabs with Framer Motion Sliding Pill */}
          <div className="relative flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-8">
            {[
              { num: 1, label: '1. Property' },
              { num: 2, label: '2. Services' },
              { num: 3, label: '3. Customer' },
              { num: 4, label: '4. Summary' }
            ].map((s) => {
              const isCurrent = step === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setStep(s.num)}
                  className={`relative flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center transition-colors z-10 ${
                    isCurrent ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeInteractiveTab"
                      className="absolute inset-0 bg-sky-600 rounded-xl shadow-md z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Confirmation Screen */}
          {bookingRef ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-lime-100 text-lime-700 flex items-center justify-center">
                <Check className="w-8 h-8 font-bold" />
              </div>
              <div className="space-y-1">
                <span className="text-xs uppercase font-black tracking-widest text-lime-700">Booking Request Received</span>
                <h2 className="text-2xl font-black text-slate-900">Reference: {bookingRef}</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you {name}! Our team in Taylor ACT will contact you shortly to confirm your booking for {bookingDate}.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-sm mx-auto space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Location:</span>
                  <span>{suburb}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Estimated Price:</span>
                  <span className="text-lime-700 font-black">${priceMath.grandTotal} AUD (inc GST)</span>
                </div>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* STEP 1: Property Info */}
              {step === 1 && (
                <motion.div
                  key="istep1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase text-slate-700">Property Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPropertyType('house')}
                        className={`p-4 rounded-2xl border text-left font-bold text-sm flex items-center gap-3 transition-all ${
                          propertyType === 'house' ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-xs' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <Home className="w-5 h-5 text-sky-600" />
                        <span>House / Townhouse</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPropertyType('apartment')}
                        className={`p-4 rounded-2xl border text-left font-bold text-sm flex items-center gap-3 transition-all ${
                          propertyType === 'apartment' ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-xs' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <Building className="w-5 h-5 text-sky-600" />
                        <span>Apartment / Unit</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-black uppercase text-slate-700">Property State</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOccupancy('empty')}
                        className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all ${
                          occupancy === 'empty' ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-xs' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        Empty (End of Lease / Moving)
                      </button>

                      <button
                        type="button"
                        onClick={() => setOccupancy('furnished')}
                        className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all ${
                          occupancy === 'furnished' ? 'bg-sky-50 border-sky-600 text-sky-900 shadow-xs' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        Furnished (Lived-in)
                      </button>
                    </div>
                  </div>

                  {propertyType === 'apartment' && (
                    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Lift Access?</label>
                        <select
                          value={hasLift ? 'yes' : 'no'}
                          onChange={(e) => setHasLift(e.target.value === 'yes')}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                        >
                          <option value="yes">Yes - Elevator Available</option>
                          <option value="no">No - Stairs Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Floor Level</label>
                        <input
                          type="text"
                          value={floorNumber}
                          onChange={(e) => setFloorNumber(e.target.value)}
                          placeholder="e.g. Floor 3"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <span>Next: Select Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Service Quantities */}
              {step === 2 && (
                <motion.div
                  key="istep2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-xs font-bold text-slate-500 mb-2">
                    Adjust quantity (+/-) for your home. Prices update in real-time in the sidebar summary.
                  </div>

                  {/* Quantity Items List */}
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">Bedrooms (Carpet)</div>
                        <div className="text-[11px] text-slate-500">$27 / room after discount</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setBedrooms(Math.max(0, bedrooms - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-6 text-center font-black text-sm text-sky-700">{bedrooms}</span>
                        <button type="button" onClick={() => setBedrooms(bedrooms + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">Living / Dining / Family Rooms</div>
                        <div className="text-[11px] text-slate-500">$46 / area after discount</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setLivingRooms(Math.max(0, livingRooms - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-6 text-center font-black text-sm text-sky-700">{livingRooms}</span>
                        <button type="button" onClick={() => setLivingRooms(livingRooms + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">Hallway</div>
                        <div className="text-[11px] text-slate-500">$27 / hallway</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setHallways(Math.max(0, hallways - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-6 text-center font-black text-sm text-sky-700">{hallways}</span>
                        <button type="button" onClick={() => setHallways(hallways + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">Stairs (flight of 8-16 steps)</div>
                        <div className="text-[11px] text-slate-500">$27 / flight</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setStairs(Math.max(0, stairs - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-6 text-center font-black text-sm text-sky-700">{stairs}</span>
                        <button type="button" onClick={() => setStairs(stairs + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">Upholstery Couch Seats</div>
                        <div className="text-[11px] text-slate-500">$41 / seat</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setUpholsterySeats(Math.max(0, upholsterySeats - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-6 text-center font-black text-sm text-sky-700">{upholsterySeats}</span>
                        <button type="button" onClick={() => setUpholsterySeats(upholsterySeats + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">Area Rugs</div>
                        <div className="text-[11px] text-slate-500">From $32 / rug</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setRugs(Math.max(0, rugs - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="w-6 text-center font-black text-sm text-sky-700">{rugs}</span>
                        <button type="button" onClick={() => setRugs(rugs + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <div className="text-xs font-black text-slate-900">End-of-Lease Pet Flea Spray</div>
                        <div className="text-[11px] text-slate-500">Certified exit certificate ($79)</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={pestFleaTreatment}
                        onChange={(e) => setPestFleaTreatment(e.target.checked)}
                        className="w-5 h-5 accent-lime-600 rounded"
                      />
                    </div>

                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(1)} className="px-5 py-2 rounded-full bg-slate-100 font-bold text-xs">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2">
                      <span>Next: Customer Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Customer Information */}
              {step === 3 && (
                <motion.div
                  key="istep3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
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
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Canberra Suburb *</label>
                      <select
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      >
                        {ACT_SUBURBS_LIST.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. 5 Holford St"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Booking Date</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Window</label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      >
                        <option value="7:30am - 10:00am">7:30am - 10:00am</option>
                        <option value="10:00am - 1:00pm">10:00am - 1:00pm</option>
                        <option value="1:00pm - 4:00pm">1:00pm - 4:00pm</option>
                      </select>
                    </div>
                  </div>

                  {/* Honeypot field */}
                  <input type="text" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(2)} className="px-5 py-2 rounded-full bg-slate-100 font-bold text-xs">Back</button>
                    <button type="button" onClick={() => setStep(4)} className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2">
                      <span>Review Breakdown</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Booking Summary & Live Math */}
              {step === 4 && (
                <motion.form
                  key="istep4"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleFinalBooking}
                  className="space-y-4"
                >
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600 font-semibold">
                      <span>Property Base Call-out Fee:</span>
                      <span>${priceMath.basePropertyFee}.00 AUD</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-semibold">
                      <span>Cleaning Services Subtotal:</span>
                      <span>${priceMath.servicesTotal}.00 AUD</span>
                    </div>
                    <div className="flex justify-between text-lime-700 font-black text-sm pt-1 border-t border-slate-200">
                      <span>Online Booking Discount (-20%):</span>
                      <span>-${priceMath.onlineDiscountAmount}.00 AUD</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-sky-700 font-black">
                        <span>Coupon Discount (CANBERRA15):</span>
                        <span>-$15.00 AUD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>GST (10%):</span>
                      <span>+${priceMath.gstAmount}.00 AUD</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-300">
                      <span>Grand Total:</span>
                      <span className="text-lime-700">${priceMath.grandTotal}.00 AUD</span>
                    </div>
                  </div>

                  {/* Coupon Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. CANBERRA15)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs uppercase font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs"
                    >
                      Apply Coupon
                    </button>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(3)} className="px-5 py-2 rounded-full bg-slate-100 font-bold text-xs">Back</button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
                    >
                      {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      <span>BOOK THIS SERVICE NOW</span>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          )}

        </div>

        {/* Sticky Sidebar "Your Instant Estimate" */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 text-white rounded-3xl p-6 shadow-2xl space-y-6 border border-slate-800">
            
            <div className="space-y-1.5 border-b border-slate-800 pb-4">
              <div className="flex justify-between text-xs font-black text-lime-400 uppercase tracking-wider">
                <span>WIZARD PROGRESS</span>
                <span>{completionPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 to-lime-400 rounded-full"
                  animate={{ width: `${completionPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-xl font-black text-white pt-2">Your Instant Estimate</h3>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Bedrooms ({bedrooms}):</span>
                <span className="font-bold text-white">${bedrooms * 27}</span>
              </div>
              <div className="flex justify-between">
                <span>Living Rooms ({livingRooms}):</span>
                <span className="font-bold text-white">${livingRooms * 46}</span>
              </div>
              <div className="flex justify-between">
                <span>Hallways ({hallways}):</span>
                <span className="font-bold text-white">${hallways * 27}</span>
              </div>
              {upholsterySeats > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Couch Seats ({upholsterySeats}):</span>
                  <span>${upholsterySeats * 41}</span>
                </div>
              )}
              {pestFleaTreatment && (
                <div className="flex justify-between text-lime-400 font-semibold">
                  <span>Flea Spray Cert:</span>
                  <span>$79</span>
                </div>
              )}
            </div>

            {/* Total Display with AnimatedCounter */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">ESTIMATED TOTAL</div>
              <div className="text-4xl font-black text-lime-400">
                $<AnimatedCounter value={priceMath.grandTotal} />
              </div>
              <div className="text-[10px] text-slate-400 font-medium">AUD (inc GST)</div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div>No credit card needed upfront. Pay after clean completion!</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
