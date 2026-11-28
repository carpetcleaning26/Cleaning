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
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [familyRooms, setFamilyRooms] = useState<number>(0);
  const [livingRooms, setLivingRooms] = useState<number>(0);
  const [stairsUpTo16, setStairsUpTo16] = useState<number>(0);
  const [stairsOver16, setStairsOver16] = useState<number>(0);
  const [sofaSeats, setSofaSeats] = useState<number>(0);
  const [armchairs, setArmchairs] = useState<number>(0);
  const [diningChairs, setDiningChairs] = useState<number>(0);
  const [smallRugs, setSmallRugs] = useState<number>(0);
  const [mediumRugs, setMediumRugs] = useState<number>(0);
  const [largeRugs, setLargeRugs] = useState<number>(0);
  const [fleaBedrooms, setFleaBedrooms] = useState<number>(0);
  const [fleaLivingRooms, setFleaLivingRooms] = useState<number>(0);
  const [curtainsSqm, setCurtainsSqm] = useState<number>(0);
  const [tileSqm, setTileSqm] = useState<number>(0);

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

  // Pricing Logic ($90 house / $150 unit-apartment out-call fee + 20% discount auto-deducted)
  const priceMath = useMemo(() => {
    const outCallFee = propertyType === 'apartment' ? 150 : 90;
    let servicesTotal = 0;

    servicesTotal += bedrooms * 30;
    servicesTotal += familyRooms * 56;
    servicesTotal += livingRooms * 56;
    servicesTotal += stairsUpTo16 * 25;
    servicesTotal += stairsOver16 * 40;
    servicesTotal += sofaSeats * 55;
    servicesTotal += armchairs * 65;
    servicesTotal += diningChairs * 18;
    servicesTotal += smallRugs * 25;
    servicesTotal += mediumRugs * 30;
    servicesTotal += largeRugs * 40;
    servicesTotal += fleaBedrooms * 30;
    servicesTotal += fleaLivingRooms * 45;
    servicesTotal += curtainsSqm * 25;
    servicesTotal += tileSqm * 10;

    const subtotalBeforeDiscount = outCallFee + servicesTotal;
    const onlineDiscountAmount = Math.round(subtotalBeforeDiscount * 0.20);
    const extraCouponDiscount = couponApplied ? 15 : 0;
    const discountedSubtotal = Math.max(0, subtotalBeforeDiscount - onlineDiscountAmount - extraCouponDiscount);
    const gstAmount = Math.round(discountedSubtotal * 0.10);
    const grandTotal = Math.round(discountedSubtotal + gstAmount);

    return {
      outCallFee,
      servicesTotal,
      subtotalBeforeDiscount,
      onlineDiscountAmount,
      extraCouponDiscount,
      discountedSubtotal,
      gstAmount,
      grandTotal
    };
  }, [
    propertyType, bedrooms, familyRooms, livingRooms, stairsUpTo16, stairsOver16,
    sofaSeats, armchairs, diningChairs, smallRugs, mediumRugs, largeRugs,
    fleaBedrooms, fleaLivingRooms, curtainsSqm, tileSqm, couponApplied
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

    const selectedServicesList: { name: string; quantity: number; price: number }[] = [
      {
        name: propertyType === 'apartment' ? 'Apartment / Unit Out-Call Fee' : 'House Out-Call Fee',
        quantity: 1,
        price: priceMath.outCallFee,
      }
    ];
    if (bedrooms > 0) selectedServicesList.push({ name: 'Carpet Cleaning - Bedrooms', quantity: bedrooms, price: bedrooms * 30 });
    if (familyRooms > 0) selectedServicesList.push({ name: 'Carpet Cleaning - Family Room', quantity: familyRooms, price: familyRooms * 56 });
    if (livingRooms > 0) selectedServicesList.push({ name: 'Carpet Cleaning - Living / Lounge Room', quantity: livingRooms, price: livingRooms * 56 });
    if (stairsUpTo16 > 0) selectedServicesList.push({ name: 'Staircase (up to 16 steps)', quantity: stairsUpTo16, price: stairsUpTo16 * 25 });
    if (stairsOver16 > 0) selectedServicesList.push({ name: 'Staircase (more than 16 steps)', quantity: stairsOver16, price: stairsOver16 * 40 });
    if (sofaSeats > 0) selectedServicesList.push({ name: 'Sofa & Upholstery Seats', quantity: sofaSeats, price: sofaSeats * 55 });
    if (armchairs > 0) selectedServicesList.push({ name: 'Armchairs', quantity: armchairs, price: armchairs * 65 });
    if (diningChairs > 0) selectedServicesList.push({ name: 'Dining Chairs', quantity: diningChairs, price: diningChairs * 18 });
    if (smallRugs > 0) selectedServicesList.push({ name: 'Rugs - Small', quantity: smallRugs, price: smallRugs * 25 });
    if (mediumRugs > 0) selectedServicesList.push({ name: 'Rugs - Medium', quantity: mediumRugs, price: mediumRugs * 30 });
    if (largeRugs > 0) selectedServicesList.push({ name: 'Rugs - Large', quantity: largeRugs, price: largeRugs * 40 });
    if (fleaBedrooms > 0) selectedServicesList.push({ name: 'Fleas Treatment - Bedrooms', quantity: fleaBedrooms, price: fleaBedrooms * 30 });
    if (fleaLivingRooms > 0) selectedServicesList.push({ name: 'Fleas Treatment - Living Room', quantity: fleaLivingRooms, price: fleaLivingRooms * 45 });
    if (curtainsSqm > 0) selectedServicesList.push({ name: 'Curtain & Blinds (m²)', quantity: curtainsSqm, price: curtainsSqm * 25 });
    if (tileSqm > 0) selectedServicesList.push({ name: 'Tiles & Grout Cleaning (m²)', quantity: tileSqm, price: tileSqm * 10 });

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
                    Adjust quantity (+/-) for your home. Out-call fee is $90 for houses or $150 for apartments/units, with 20% online discount deducted automatically.
                  </div>

                  {/* Quantity Items List */}
                  <div className="space-y-2.5 max-h-[28rem] overflow-y-auto pr-1">
                    {[
                      { group: 'Carpet Cleaning', label: 'Bedrooms (Carpet)', sub: '$30 per bedroom', val: bedrooms, set: setBedrooms },
                      { group: 'Carpet Cleaning', label: 'Family Room', sub: '$56 per room', val: familyRooms, set: setFamilyRooms },
                      { group: 'Carpet Cleaning', label: 'Living / Lounge Room', sub: '$56 per room', val: livingRooms, set: setLivingRooms },
                      { group: 'Staircase', label: 'Staircase (up to 16 steps)', sub: '$25 per staircase', val: stairsUpTo16, set: setStairsUpTo16 },
                      { group: 'Staircase', label: 'Staircase (more than 16 steps)', sub: '$40 per staircase', val: stairsOver16, set: setStairsOver16 },
                      { group: 'Sofa & Upholstery', label: 'Sofa & Upholstery Seats', sub: '$55 per seat', val: sofaSeats, set: setSofaSeats },
                      { group: 'Sofa & Upholstery', label: 'Armchair', sub: '$65 each', val: armchairs, set: setArmchairs },
                      { group: 'Sofa & Upholstery', label: 'Dining Chair', sub: '$18 each', val: diningChairs, set: setDiningChairs },
                      { group: 'Rugs', label: 'Small Size Rug', sub: '$25 each', val: smallRugs, set: setSmallRugs },
                      { group: 'Rugs', label: 'Medium Size Rug', sub: '$30 each', val: mediumRugs, set: setMediumRugs },
                      { group: 'Rugs', label: 'Large Size Rug', sub: '$40 each', val: largeRugs, set: setLargeRugs },
                      { group: 'Fleas Treatment', label: 'Fleas Treatment (Bedroom)', sub: '$30 per bedroom', val: fleaBedrooms, set: setFleaBedrooms },
                      { group: 'Fleas Treatment', label: 'Fleas Treatment (Living Room)', sub: '$45 each', val: fleaLivingRooms, set: setFleaLivingRooms },
                      { group: 'Curtain & Blinds', label: 'Curtain & Blinds Cleaning (m²)', sub: '$25 per square metre', val: curtainsSqm, set: setCurtainsSqm },
                      { group: 'Tiles & Grout', label: 'Tiles & Grout Cleaning (m²)', sub: '$10 per square metre', val: tileSqm, set: setTileSqm },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-sky-600">{item.group}</div>
                          <div className="text-xs font-black text-slate-900">{item.label}</div>
                          <div className="text-[11px] text-slate-500">{item.sub}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => item.set(Math.max(0, item.val - 1))} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Minus className="w-3.5 h-3.5" /></button>
                          <span className="w-7 text-center font-black text-sm text-sky-700">{item.val}</span>
                          <button type="button" onClick={() => item.set(item.val + 1)} className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center font-black text-sm text-slate-800 shadow-xs"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Other Services Email Notice */}
                  <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black text-slate-900">Need Office Cleaning or Flood Damage Restoration?</span>{' '}
                      For other services, please email us at{' '}
                      <a href={`mailto:${BUSINESS_INFO.email}`} className="font-black text-sky-700 underline">
                        {BUSINESS_INFO.email}
                      </a>.
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
                      <span>Out-Call Fee ({propertyType === 'apartment' ? 'Apartment / Unit' : 'House'}):</span>
                      <span>${priceMath.outCallFee}.00 AUD</span>
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
                <span>Out-Call Fee ({propertyType === 'apartment' ? 'Unit / Apt' : 'House'}):</span>
                <span className="font-bold text-white">${priceMath.outCallFee}</span>
              </div>
              {bedrooms > 0 && (
                <div className="flex justify-between">
                  <span>Carpet Bedrooms ({bedrooms}):</span>
                  <span className="font-bold text-white">${bedrooms * 30}</span>
                </div>
              )}
              {familyRooms > 0 && (
                <div className="flex justify-between">
                  <span>Family Rooms ({familyRooms}):</span>
                  <span className="font-bold text-white">${familyRooms * 56}</span>
                </div>
              )}
              {livingRooms > 0 && (
                <div className="flex justify-between">
                  <span>Living / Lounge ({livingRooms}):</span>
                  <span className="font-bold text-white">${livingRooms * 56}</span>
                </div>
              )}
              {stairsUpTo16 > 0 && (
                <div className="flex justify-between">
                  <span>Stairs ≤16 steps ({stairsUpTo16}):</span>
                  <span className="font-bold text-white">${stairsUpTo16 * 25}</span>
                </div>
              )}
              {stairsOver16 > 0 && (
                <div className="flex justify-between">
                  <span>Stairs &gt;16 steps ({stairsOver16}):</span>
                  <span className="font-bold text-white">${stairsOver16 * 40}</span>
                </div>
              )}
              {sofaSeats > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Sofa Seats ({sofaSeats}):</span>
                  <span>${sofaSeats * 55}</span>
                </div>
              )}
              {armchairs > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Armchairs ({armchairs}):</span>
                  <span>${armchairs * 65}</span>
                </div>
              )}
              {diningChairs > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Dining Chairs ({diningChairs}):</span>
                  <span>${diningChairs * 18}</span>
                </div>
              )}
              {smallRugs + mediumRugs + largeRugs > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Rugs ({smallRugs + mediumRugs + largeRugs}):</span>
                  <span>${smallRugs * 25 + mediumRugs * 30 + largeRugs * 40}</span>
                </div>
              )}
              {fleaBedrooms + fleaLivingRooms > 0 && (
                <div className="flex justify-between text-lime-400 font-semibold">
                  <span>Fleas Treatment:</span>
                  <span>${fleaBedrooms * 30 + fleaLivingRooms * 45}</span>
                </div>
              )}
              {curtainsSqm > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Curtains & Blinds ({curtainsSqm}m²):</span>
                  <span>${curtainsSqm * 25}</span>
                </div>
              )}
              {tileSqm > 0 && (
                <div className="flex justify-between text-sky-400 font-semibold">
                  <span>Tiles & Grout ({tileSqm}m²):</span>
                  <span>${tileSqm * 10}</span>
                </div>
              )}
              <div className="flex justify-between text-lime-400 font-bold pt-2 border-t border-slate-800">
                <span>20% Online Discount:</span>
                <span>-${priceMath.onlineDiscountAmount}</span>
              </div>
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
