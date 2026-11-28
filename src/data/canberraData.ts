export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  navTitle: string;
  category: 'GENERAL' | 'CARPET' | 'UPHOLSTERY' | 'RUG' | 'TILES' | 'COMMERCIAL';
  shortDesc: string;
  fullDesc: string;
  startingPrice: string;
  unit: string;
  image: string;
  differentiators: string[];
  processSteps: { title: string; desc: string }[];
  pricingNotes: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  suburb: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'pricing' | 'process';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}

export const BUSINESS_INFO = {
  name: "Canberra Carpet Cleaning Deals",
  tagline: "17+ years cleaning Canberra carpets. Family-owned. 5.0★ from 80+ verified Google reviews.",
  address: "5 Holford St, Taylor, ACT 2913",
  phone: "0481 734 225",
  phoneFormatted: "0481 734 225",
  telLink: "tel:0481734225",
  email: "info@canberracarpetcleaningdeals.com.au",
  hours: "Mon–Sat 7:00am–7:00pm, same-day booking if booked before 11am",
  founded: "2008",
  yearsExp: "17+",
  jobsCompleted: "100,000+",
  rating: "5.0★",
  reviewCount: "80+",
  logos: {
    main: "/images/logo/logo-white-bg.png",
    alt: "/images/logo/logo-blue-bg.png",
    white: "/images/logo/logo-green-bg.png"
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: "curtains-blinds",
    slug: "curtains-and-blinds-cleaning",
    name: "Curtains & Blinds Cleaning",
    navTitle: "Curtains & Blinds Cleaning",
    category: "GENERAL",
    shortDesc: "On-site curtain and blind cleaning across Canberra ACT, no removal needed. Restores freshness of window treatments.",
    fullDesc: "Our on-site curtain and blind steam cleaning service removes airborne dust, allergens, moisture stains, and odors directly while your drapes remain hanging. Eliminates the hassle of taking down heavy curtains or taking them to dry cleaners.",
    startingPrice: "$25",
    unit: "per m²",
    image: "/pictures/curtain-cleaning.jpg",
    differentiators: [
      "Cleaned directly on-site with zero drapes removal needed",
      "Removes trapped dust, mold spores, and pollen allergens",
      "Safe for delicate silk, velvet, linen, and blockout fabrics",
      "Restores vibrant color and fabric drape freshness",
      "17+ years trusted Canberra window treatment cleaning",
      "100% Satisfaction Guarantee on all curtain cleans"
    ],
    processSteps: [
      { title: "Fabric Inspection", desc: "We check fabric weave, lining type, and moisture sensitivity." },
      { title: "Vacuum & Dusting", desc: "High-HEPA dry vacuuming removes surface dust." },
      { title: "Gentle Steam Wash", desc: "Controlled temperature steam extraction dissolves grime." },
      { title: "Deodorize & Groom", desc: "Antimicrobial deodorizer leaves window drapery fresh." }
    ],
    pricingNotes: [
      "Curtains & Blinds Cleaning: $25 per square metre (m²)",
      "$90 out-call fee applies automatically per booking",
      "20% online booking discount auto-applied in the Instant Quote calculator"
    ]
  },
  {
    id: "carpet-cleaning",
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    navTitle: "Carpet Cleaning",
    category: "CARPET",
    shortDesc: "Truck-mounted hot water extraction from $30/bedroom. Deeper clean, faster drying within 1-2 hours across all Canberra suburbs.",
    fullDesc: "Looking for trusted carpet cleaning in Canberra? We've been steam-cleaning Canberra carpets since 2008 — that's over 17 years and 100,000+ jobs across every ACT suburb. Today, we're rated 5.0★ verified Google reviews, with bedrooms from $30, family/living rooms at $56, and an auto-applied 20% online booking discount ($90 out-call fee applies per booking). Whether you're a Canberra homeowner booking your annual carpet refresh, a busy family dealing with kids and pets, or a tenant preparing for end-of-lease inspection, our team delivers a deeper, faster-drying clean than portable cleaning equipment can achieve.",
    startingPrice: "$30",
    unit: "per bedroom",
    image: "/pictures/carpet-steam-wand-2026-11-27.jpeg",
    differentiators: [
      "Truck-mounted hot water extraction (deeper clean, walk-on dry in 1-2 hours)",
      "17 years cleaning Canberra carpets, knows local building & wool carpet styles",
      "Family-owned and locally based in Taylor, ACT",
      "Eco-friendly, non-toxic, pet and child safe products",
      "100% satisfaction guarantee, fully insured",
      "Same-day service available when booked before 11am"
    ],
    processSteps: [
      { title: "Pre-inspection", desc: "Checking carpet fiber type, wear patterns, and stain locations." },
      { title: "Stain pre-treatment", desc: "Targeted pre-spotting for wine, coffee, pet urine, blood, ink." },
      { title: "Pre-spray & agitation", desc: "Loosening ground-in soil and grease before steam extraction." },
      { title: "Hot water steam extraction", desc: "Industrial truck-mount pressure forces out dirt & moisture." },
      { title: "Sanitising & Deodorising", desc: "Eliminating bacteria and leaving a clean fresh scent." },
      { title: "Carpet Grooming", desc: "Resetting carpet pile for ultra-fast airflow drying." }
    ],
    pricingNotes: [
      "Bedroom: $30 per bedroom",
      "Family Room: $56 | Living / Lounge Room: $56",
      "Staircase: $25 (up to 16 steps) | $40 (more than 16 steps)",
      "$90 out-call fee applies automatically per booking",
      "20% online booking discount auto-applied at checkout"
    ]
  },
  {
    id: "mattress-cleaning",
    slug: "mattress-cleaning",
    name: "Mattress Cleaning",
    navTitle: "Mattress Cleaning",
    category: "GENERAL",
    shortDesc: "Professional mattress steam cleaning removing dust mites, allergens, sweat, urine, bacteria. Custom quotes for single/queen/king.",
    fullDesc: "We spend a third of our lives in bed. Our specialized mattress steam extraction sanitizes deep into mattress foam, destroying dust mites, skin flakes, sweat stains, and allergens for healthier sleep.",
    startingPrice: "$59",
    unit: "per mattress",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    differentiators: [
      "Thermal steam destroys 99.9% of dust mites and bacteria",
      "Specialized urine and sweat stain spot extraction",
      "Eco-friendly non-allergenic sanitizing formulas",
      "Extends mattress life and restores sleeping comfort",
      "Available for Single, Double, Queen, and King sizes",
      "Same-day emergency urine clean-up available"
    ],
    processSteps: [
      { title: "UV Sanitization Check", desc: "Inspecting organic stains and allergen density." },
      { title: "High-Suction Vacuum", desc: "Extracting dead skin cells and dust mites." },
      { title: "Enzyme Steam Treatment", desc: "Dissolving urine and sweat discoloration." },
      { title: "Anti-Bacterial Spray", desc: "Protecting against re-contamination." }
    ],
    pricingNotes: [
      "Single / Double mattress from $59",
      "Queen / King mattress from $79",
      "Combined carpet & mattress discount bundles available"
    ]
  },
  {
    id: "upholstery-cleaning",
    slug: "upholstery-cleaning",
    name: "Upholstery Cleaning",
    navTitle: "Upholstery Cleaning",
    category: "UPHOLSTERY",
    shortDesc: "Sofa & upholstery steam cleaning: $55 per seat, armchairs $65, dining chairs $18 each. Fast drying across Canberra.",
    fullDesc: "Revive your favorite living room furniture. Our upholstery steam cleaning removes food spills, body oils, pet dander, and odors from fabric sofas, sectional recliners, armchairs, and dining seats.",
    startingPrice: "$55",
    unit: "per sofa seat",
    image: "/pictures/whatsapp-nov27/WhatsApp Image 2026-11-26 at 9.11.04 PM.jpeg",
    differentiators: [
      "Sofa & Upholstery: $55 per seat | Armchair: $65 | Dining Chair: $18 each",
      "20% online booking discount auto-applied at checkout",
      "Fabric-safe heat controlled steam extraction",
      "Deodorizes pet body oils and spilled beverages",
      "Optional Scotchgard stain protection barrier",
      "Fast drying within 1 to 2 hours"
    ],
    processSteps: [
      { title: "Fabric Identification", desc: "Determining cotton, polyester, microfibre, or suede type." },
      { title: "Pre-spray Solution", desc: "Breaking down body oils and grime on armrests & cushions." },
      { title: "Delicate Steam Extraction", desc: "Extracting soil without soaking internal foam padding." },
      { title: "Fabric Conditioning", desc: "Restoring soft texture and fresh room fragrance." }
    ],
    pricingNotes: [
      "Sofa & Upholstery: $55 per seat",
      "Armchair: $65 each | Dining Chair: $18 each",
      "$90 out-call fee applies per booking (20% online discount auto-applied)"
    ]
  },
  {
    id: "rug-cleaning",
    slug: "rug-cleaning",
    name: "Rug Cleaning",
    navTitle: "Rug Cleaning",
    category: "RUG",
    shortDesc: "Persian, oriental, wool & synthetic rugs: Small $25, Medium $30, Large $40. 17 years experience, same-day available.",
    fullDesc: "Area rugs add warmth to your home but trap severe grit at the backing. We provide expert gentle washing for valuable wool, Persian, shag pile, and synthetic rugs.",
    startingPrice: "$25",
    unit: "per small rug",
    image: "/pictures/rug-2.jpg",
    differentiators: [
      "Specialized dye-safe pH-balanced washing",
      "Suitable for fine wool, Persian, silk, and synthetic rugs",
      "Deep dust vibration extraction before steam wash",
      "Fringe whitening and edge detailing",
      "17+ years experience in Canberra rug restoration",
      "On-site convenience or off-site wash options"
    ],
    processSteps: [
      { title: "Dye Stability Test", desc: "Ensuring colors will not bleed or run." },
      { title: "Dry Dusting", desc: "Removing abrasive sand & grit embedded in wool fibers." },
      { title: "Soft Steam Wash", desc: "Rinsing with pH-neutral solutions." },
      { title: "Fringe Grooming & Dry", desc: "Hanging or flat drying to retain shape." }
    ],
    pricingNotes: [
      "Small Rug: $25 | Medium Rug: $30 | Large Rug: $40",
      "$90 out-call fee applies per booking",
      "20% online booking discount auto-applied at checkout"
    ]
  },
  {
    id: "flood-restoration",
    slug: "flood-damaged-restoration",
    name: "Water Damage Restoration Canberra",
    navTitle: "Water Damage Restoration Canberra",
    category: "CARPET",
    shortDesc: "Emergency flood/water damage restoration, 24/7 response, truck-mounted water extraction, carpet & sub-floor drying, industrial dehumidifiers.",
    fullDesc: "Immediate emergency response for burst pipes, roof leaks, or washing machine overflows. Our truck-mounted extractors remove standing water fast, followed by structural drying and dehumidification to prevent toxic black mold growth.",
    startingPrice: "Email Us",
    unit: "24/7 Dispatch",
    image: "/pictures/flood-restoration.jpg",
    differentiators: [
      "24/7 Emergency rapid dispatch across Canberra ACT",
      "Industrial truck-mounted heavy water extraction units",
      "Sub-floor and underlay moisture detection meters",
      "Commercial LGR dehumidifiers and high-velocity air movers",
      "Antimicrobial treatments preventing mold & bacteria",
      "Insurance company compliant reports provided"
    ],
    processSteps: [
      { title: "Rapid Arrival & Assessment", desc: "Testing moisture boundaries with thermal meters." },
      { title: "Water Extraction", desc: "Extracting thousands of liters of standing water." },
      { title: "Sanitizer Application", desc: "Treating affected areas with anti-mold solution." },
      { title: "Drying Equipment Setup", desc: "Installing dehumidifiers and turbo blowers for 48 hrs." }
    ],
    pricingNotes: [
      "For Flood & Water Damage Restoration, please email us at info@canberracarpetcleaningdeals.com.au",
      "Direct insurance billing supported",
      "Emergency response callout available 24/7 across Canberra ACT"
    ]
  },
  {
    id: "office-cleaning",
    slug: "office-cleaning",
    name: "Office & Commercial Cleaning Canberra",
    navTitle: "Office & Commercial Cleaning Canberra",
    category: "COMMERCIAL",
    shortDesc: "Commercial cleaning with flexible after-hours scheduling, high-traffic office carpet steam washing, and desk area sanitization.",
    fullDesc: "Keep your commercial workplace presentable and healthy. We steam clean office carpet tiles, executive chairs, waiting room sofas, and boardroom floors across Canberra CBD, Belconnen, and Parliamentary zone offices.",
    startingPrice: "Email Us",
    unit: "commercial rate",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    differentiators: [
      "Flexible after-hours & weekend scheduling (zero office disruption)",
      "High-output truck-mounted commercial steam extraction",
      "Fast drying so carpets are ready for Monday morning staff",
      "Official tax invoices for business expense claiming",
      "Fully insured with $20M public liability coverage",
      "Servicing government offices, medical clinics, and retail"
    ],
    processSteps: [
      { title: "Site Audit & Quote", desc: "Measuring floor areas and identifying high-traffic spots." },
      { title: "After-Hours Execution", desc: "Cleaning while your workspace is closed." },
      { title: "Deep Steam Extraction", desc: "Removing coffee spills & shoe dirt from carpet tiles." },
      { title: "Final Inspection", desc: "Ensuring all desk areas and corridors are pristine." }
    ],
    pricingNotes: [
      "For Office & Commercial Cleaning, please email us at info@canberracarpetcleaningdeals.com.au",
      "Recurring monthly maintenance plans available",
      "Includes tax invoice for business accounting"
    ]
  },
  {
    id: "tiles-grout",
    slug: "tiles-and-grout-cleaning",
    name: "Tiles & Grout Cleaning",
    navTitle: "Tiles & Grout Cleaning",
    category: "TILES",
    shortDesc: "High-pressure rotational steam washing ($10/m²) that restores stained kitchen floors, bathroom tiles, and black grout lines.",
    fullDesc: "Standard mopping only pushes dirty water into porous grout lines. Our specialized rotational tile cleaners use heated pressure up to 1000 PSI to strip years of buildup from kitchen tiles, bathrooms, and entryways.",
    startingPrice: "$10",
    unit: "per m²",
    image: "/pictures/tile-cleaning-pic.jpg",
    differentiators: [
      "Rotational high-pressure steam scrubbing (up to 1000 PSI)",
      "Strips embedded grime from porous cement grout",
      "Eradicates bathroom mold and mildew spores",
      "Protective clear grout sealant application available",
      "Suitable for ceramic, porcelain, slate, and marble",
      "100% Satisfaction Guarantee"
    ],
    processSteps: [
      { title: "Alkaline Pre-treatment", desc: "Dissolving grease & old floor wax buildup." },
      { title: "Rotational Hydro-Scrub", desc: "Enclosed steam pressure washing." },
      { title: "Slurry Extraction", desc: "Vacuuming up dirty water instantly." },
      { title: "Grout Sealant (Optional)", desc: "Sealing grout lines to block future stains." }
    ],
    pricingNotes: [
      "Tiles & Grout Cleaning: $10 per square metre (m²)",
      "$90 out-call fee applies per booking",
      "20% online booking discount auto-applied at checkout"
    ]
  },
  {
    id: "pest-control",
    slug: "pest-control",
    name: "Fleas Treatment & Pest Control",
    navTitle: "Fleas Treatment & Pest Control",
    category: "GENERAL",
    shortDesc: "Carpet fleas treatment ($30/bedroom, $45/living room) & pet-safe pest control. Official end-of-lease certificates.",
    fullDesc: "Mandatory end-of-lease pet flea sprays and general residential pest treatments. We supply official pest certificates required by Canberra real estate agents when moving out with pets.",
    startingPrice: "$30",
    unit: "per bedroom",
    image: "/pictures/carpet-flea-treatment.jpg",
    differentiators: [
      "Official Real Estate End-of-Lease Flea Certificate provided",
      "Targeted extermination for fleas, spiders, cockroaches, and ants",
      "100% pet-safe, child-safe, and odor-free sprays",
      "Same-day combo service alongside carpet steam cleaning",
      "Fully licensed & certified ACT pest technicians",
      "Accepted by all major Canberra real estate agencies"
    ],
    processSteps: [
      { title: "Perimeter Inspection", desc: "Checking skirting boards, carpets, and outdoor nooks." },
      { title: "Targeted Micro-Mist Spray", desc: "Applying residual eco-friendly pest formula." },
      { title: "Flea Life-Cycle Treatment", desc: "Eradicating adult fleas, eggs, and larvae." },
      { title: "Certificate Issuance", desc: "Handing over official lease exit certificate." }
    ],
    pricingNotes: [
      "Fleas Treatment: $30 per bedroom | $45 per living room size",
      "$90 out-call fee applies per booking",
      "20% online booking discount auto-applied at checkout"
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Silvia Passeri",
    date: "May 2026",
    rating: 5,
    comment: "Canberra Carpet Cleaning Deals saved our bond! The carpets in our Gungahlin townhouse were stained from 2 years with a toddler. They look immaculate now. Landlord gave 100% bond return.",
    suburb: "Gungahlin"
  },
  {
    id: "t2",
    name: "Joshua McMillan",
    date: "April 2026",
    rating: 5,
    comment: "Punctual, professional, and very affordable ($27/room price deal). The truck-mounted equipment dried the carpets in under 2 hours. Fantastic job!",
    suburb: "Belconnen"
  },
  {
    id: "t3",
    name: "Lauren Blyton",
    date: "April 2026",
    rating: 5,
    comment: "Our 5-seater lounge had coffee stains and dog hair. The technician was polite, spent 2 hours detailing it, and now it looks like new. Highly recommend!",
    suburb: "Woden Valley"
  },
  {
    id: "t4",
    name: "Archer Casey",
    date: "March 2026",
    rating: 5,
    comment: "Best carpet steam cleaner in Canberra. Used them twice for end of lease cleans. Always prompt and price is exact as quoted online.",
    suburb: "Tuggeranong"
  },
  {
    id: "t5",
    name: "Gagan Grewal",
    date: "March 2026",
    rating: 5,
    comment: "Called at 8:30am for emergency flood extraction after a pipe leak in Dickson. Technician arrived by 9:15am! Saved our flooring.",
    suburb: "Dickson"
  },
  {
    id: "t6",
    name: "Tina Gasnier",
    date: "February 2026",
    rating: 5,
    comment: "Great family-owned local business. Friendly service, pet-safe chemicals, and carpets dried super quick. Will be calling them annually.",
    suburb: "Taylor"
  },
  {
    id: "t7",
    name: "Megan McCarthy",
    date: "February 2026",
    rating: 5,
    comment: "Tile and grout cleaning in our kitchen was magic. All the black grout lines are clean white again. Worth every cent!",
    suburb: "Kingston"
  },
  {
    id: "t8",
    name: "Eve Chen",
    date: "January 2026",
    rating: 5,
    comment: "Used their instant quote calculator and booked online with the 20% discount. Simple, transparent, and great results.",
    suburb: "Braddon"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq1",
    question: "What sort of guarantee do you offer?",
    answer: "We offer a 100% Satisfaction Guarantee on all our work. If you are not satisfied with any area we've cleaned, we will return and re-clean it free of charge. For End of Lease cleaning, we provide a Bond Back Guarantee: if your property manager raises any carpet cleaning concerns during inspection, we return free of charge within 72 hours.",
    category: "pricing"
  },
  {
    id: "faq2",
    question: "Do you offer steam cleaning or dry cleaning?",
    answer: "We offer both, but 99%+ of our customers choose hot water steam extraction because it delivers a deeper clean into carpet fibers and extracts bacteria. Most Canberra real estate property managers explicitly require truck-mounted hot water extraction for end-of-lease handovers.",
    category: "pricing"
  },
  {
    id: "faq3",
    question: "What is included in your carpet steam cleaning service?",
    answer: "Our standard service includes a thorough pre-inspection, optional pre-vacuuming, targeted stain and spot treatment (for wine, coffee, pet urine, ink), pre-spray agitation, hot water steam extraction with truck-mounted power, carpet conditioning, sanitising, and deodorising.",
    category: "process"
  },
  {
    id: "faq4",
    question: "How is the online instant quote calculated?",
    answer: "Our Instant Quote Calculator uses transparent per-item rates with a $90 out-call fee applied automatically to every booking, plus an automatic 20% online booking discount. Final pricing may adjust only for severe soiling or special stain treatments.",
    category: "pricing"
  },
  {
    id: "faq5",
    question: "Can you remove stains from my carpet or couch?",
    answer: "Yes! We specialize in stain extraction for coffee, red wine, pet accidents, grease, tea, and makeup. While we achieve a 95%+ success rate, stain removal depends on stain age, fiber type, and prior DIY chemical attempts.",
    category: "process"
  },
  {
    id: "faq6",
    question: "How long will my carpet or couch take to dry?",
    answer: "Thanks to our high-suction truck-mounted extraction system, carpets typically dry within 1 to 2 hours (up to 4-6 hours on cold humid winter days in Canberra). Couches typically dry within 1 to 2 hours.",
    category: "process"
  },
  {
    id: "faq7",
    question: "How often should I have my carpets professionally cleaned?",
    answer: "We recommend professional steam cleaning at least once every 12 months for average households, or every 6 months for homes with pets, young children, or allergy sufferers.",
    category: "process"
  },
  {
    id: "faq8",
    question: "DIY vs professional carpet cleaning — why the cost?",
    answer: "Hire machines from supermarkets lack water temperature heat (they use tap water) and have weak vacuum suction, often leaving carpets soaked with soap residue that attracts dirt fast. Our commercial truck-mounted equipment (valued at $120,000+) washes at 120°C heat and extracts 98% of water instantly.",
    category: "pricing"
  },
  {
    id: "faq9",
    question: "How long does carpet cleaning take?",
    answer: "Most 3-bedroom Canberra homes take between 45 minutes to 1.5 hours depending on room size and stain severity.",
    category: "process"
  },
  {
    id: "faq10",
    question: "Do you service surrounding NSW areas like Queanbeyan and Yass?",
    answer: "Yes! We service all of Canberra ACT as well as Queanbeyan, Jerrabomberra, Googong, Bungendore, and Yass with zero travel surcharges.",
    category: "process"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "how-often-should-you-clean-carpets-canberra-2026",
    title: "How Often Should You Clean Your Carpets in Canberra? (2026 Guide)",
    date: "07 May 2026",
    readTime: "5 min read",
    excerpt: "Discover how Canberra's seasonal red dust, fireplace soot, and winter humidity impact carpet fiber health, and how often your ACT home needs professional steam cleaning.",
    content: `Canberra experiences unique seasonal conditions — dry dusty summers, fireplace smoke in autumn, and high indoor heating during freezing winter months.

### The 12-Month Rule
For standard ACT households, a professional hot water extraction steam clean every 12 months is mandatory to maintain carpet warranties and prevent abrasive sand particles from cutting carpet fibers at the backing level.

### High-Traffic & Pet Homes (Every 6 Months)
If you have indoor dogs, cats, or young children crawling on the floor, allergens accumulate twice as fast. Bi-annual steam cleaning eliminates dander and organic urine crystals before deep discoloration sets in.

### End-of-Lease Inspections
ACT property managers strictly require digital tax invoice receipts for carpet steam cleaning upon moving out. Booking 2-3 days before key handover ensures carpets are bone dry for final agent walk-throughs.`,
    image: "https://www.canberracarpetcleaningdeals.com.au/assets/images/about/bigsize.jpg"
  },
  {
    id: "b2",
    slug: "carpet-rug-upholstery-cleaning-canberra-complete-guide",
    title: "Carpet, Rug, and Upholstery Cleaning Services in Canberra – A Complete Guide for a Healthier Home",
    date: "26 July 2025",
    readTime: "7 min read",
    excerpt: "Everything Canberra homeowners need to know about steam cleaning vs dry cleaning, couch stain protection, tile grout restoration, and pet odor removal.",
    content: `A clean home starts from the ground up. Over 80% of household dust and pollen settles directly into carpets, fabric couches, and area rugs.

### Why Truck-Mounted Steam Cleaning Wins
Portable DIY machines leave soapy residue that acts like a dirt magnet. Truck-mounted hot water extraction heats water up to 120°C, killing bacteria while extracting water at industrial suction strength.

### Protecting Your Upholstery & Furniture
Fabric lounges absorb sweat, body oil, and beverage spills. Applying Scotchgard stain protector after steam washing creates a hydrophobic shield, allowing liquid spills to bead up on top rather than soak in.

### Sanitizing Area Rugs
Delicate wool and oriental rugs require pH-balanced wash formulas. Regular vacuuming removes surface dust, but professional rug washing removes deep sand that destroys backing threads.`,
    image: "https://www.canberracarpetcleaningdeals.com.au/assets/images/services/carpet-full-service.jpg"
  }
];

export const ACT_SUBURBS_LIST = [
  "Belconnen", "Bruce", "Kaleen", "Lawson", "Florey", "Page", "Scullin", "Hawker", "Weetangera", "Evatt", "Giralang", "Macgregor", "Latham", "Dunlop", "Aranda", "Cook",
  "Gungahlin", "Franklin", "Harrison", "Palmerston", "Ngunnawal", "Amaroo", "Forde", "Bonner", "Casey", "Moncrieff", "Taylor", "Throsby", "Jacka", "Kinlyside",
  "Tuggeranong", "Greenway", "Kambah", "Wanniassa", "Monash", "Gowrie", "Fadden", "Erindale", "Calwell", "Conder", "Gordon", "Banks", "Bonython", "Chisholm", "Gilmore", "Oxley", "Richards",
  "Woden Valley", "Phillip", "Woden", "Curtin", "Garran", "Hughes", "Lyons", "Pearce", "Torrens", "Chifley", "Farrer", "Mawson", "O'Malley",
  "Weston Creek", "Weston", "Holder", "Rivet", "Stirling", "Waramanga", "Chapman", "Duffy",
  "Molonglo Valley", "Coombs", "Wright", "Denman Prospect", "Whitlam",
  "Inner North", "Canberra City", "Braddon", "Turner", "O'Connor", "Lyneham", "Dickson", "Watson", "Ainslie", "Campbell", "Reid font",
  "Inner South", "Barton", "Kingston", "Manuka", "Griffith", "Forrest", "Yarralumla", "Deakin", "Red Hill", "Narrabundah",
  "Queanbeyan & Surrounds", "Queanbeyan", "Jerrabomberra", "Googong", "Karabar", "Bungendore", "Yass"
];

export const GALLERY_IMAGES = [
  { url: "/pictures/carpet-steam-wand-2026-11-27.jpeg", caption: "Deep Carpet Steam Extraction Wand Results in Canberra" },
  { url: "/pictures/whatsapp-nov27/WhatsApp Image 2026-11-26 at 9.11.04 PM.jpeg", caption: "Fabric Sofa Armrest & Cushion Steam Extraction" },
  { url: "/pictures/whatsapp-nov27/WhatsApp Image 2026-11-26 at 9.11.05 PM.jpeg", caption: "Upholstery Lounge Deep Steam Detailing" },
  { url: "/pictures/tile-cleaning-pic.jpg", caption: "High-Pressure Rotational Tile & Patio Hydro-Scrubbing" },
  { url: "/pictures/rug-2.jpg", caption: "Vibrant Area Rug Deep Cleaning & Fiber Restoration" },
  { url: "/pictures/curtain-cleaning.jpg", caption: "On-Site Curtain & Drapery Steam Sanitizing" },
  { url: "/pictures/carpet-flea-treatment.jpg", caption: "Certified Carpet Flea Treatment & Pest Spraying" },
  { url: "/pictures/real_image_1.jpeg", caption: "Truck-Mounted Carpet Steam Extraction in Belconnen" },
  { url: "/pictures/real_image_2.jpeg", caption: "5-Seater Lounge Steam Clean & Stain Removal in Gungahlin" },
  { url: "/pictures/real_image_3.jpeg", caption: "High-Pressure Kitchen Tile & Grout Hydro-Scrubbing" },
  { url: "/pictures/real_image_4.jpeg", caption: "Queen Mattress Allergy & Dust Mite Sanitization" },
  { url: "/pictures/real_image_5.jpeg", caption: "Wool Area Rug Washing & Fringe Detail Restored" },
  { url: "/pictures/real_image_6.jpeg", caption: "Emergency Water Damage Carpet Moisture Extraction" },
  { url: "/pictures/real_image_7.jpeg", caption: "Canberra Branded Service Van & Technician Team" },
  { url: "/pictures/real_image_8.jpeg", caption: "End of Lease Bond Clean Inspection Prep in Woden" },
  { url: "/pictures/real_image_9.jpeg", caption: "Pet Urine & Odour Neutralisation Steam Treatment" },
  { url: "/pictures/real_image_10.jpeg", caption: "Living Room Carpet Deep Fiber Cleaning in Tuggeranong" },
  { url: "/pictures/real_image_11.jpeg", caption: "High-Traffic Commercial Office Carpet Steam Wash" },
  { url: "/pictures/real_image_12.jpeg", caption: "Fabric Sofa Conditioning & Protection Treatment" },
  { url: "/pictures/real_image_13.jpeg", caption: "Staircase Carpet Steam Clean & Edge Detailing" },
  { url: "/pictures/real_image_14.jpeg", caption: "Hallway & Bedroom Carpet Steam Wash in Kingston" },
  { url: "/pictures/real_image_15.jpeg", caption: "Bathroom & Shower Tile Grout Line Restoration" },
  { url: "/pictures/real_image_16.jpeg", caption: "Shag Rug Deep Dust Extraction in Braddon" },
  { url: "/pictures/real_image_17.jpeg", caption: "DHA Defence Relocation Carpet Steam Clean" },
  { url: "/pictures/real_image_18.jpeg", caption: "Red Wine & Coffee Spot Removal Treatment" },
  { url: "/pictures/real_image_19.jpeg", caption: "Armchair & Recline Seat Steam Washing" },
  { url: "/pictures/real_image_20.jpeg", caption: "Canberra Service Van Dispatch at Taylor ACT Base" },
  { url: "/pictures/real_image_21.jpeg", caption: "High-Pressure Rotary Tile Washing in Queanbeyan" },
  { url: "/pictures/real_image_22.jpeg", caption: "Carpet Steam Wash Before & After Comparison" },
  { url: "/pictures/real_image_23.jpeg", caption: "On-Site Drapery & Blind Steam Sanitizing" },
  { url: "/pictures/real_image_24.jpeg", caption: "Certified Flea Spray & Pest Eradication" },
  { url: "/pictures/real_image_25.jpeg", caption: "Final Carpet Pile Grooming & Fast Airflow Drying" }
];

export const VIDEOS_LIST = [
  { id: "v0", title: "Live Carpet & Upholstery Steam Extraction Session", duration: "1:30", videoUrl: "/pictures/cleaning-video-2026-11-26.mp4", thumbnail: "/pictures/carpet-steam-wand-2026-11-27.jpeg" },
  { id: "v0b", title: "Sofa & Lounge Fabric Steam Wand Close-Up", duration: "1:10", videoUrl: "/pictures/whatsapp-nov27/WhatsApp Video 2026-11-26 at 9.11.04 PM.mp4", thumbnail: "/pictures/whatsapp-nov27/WhatsApp Image 2026-11-26 at 9.11.04 PM.jpeg" },
  { id: "v0c", title: "Upholstery Deep Stain & Cushion Extraction", duration: "0:55", videoUrl: "/pictures/whatsapp-nov27/WhatsApp Video 2026-11-26 at 9.11.05 PM.mp4", thumbnail: "/pictures/whatsapp-nov27/WhatsApp Image 2026-11-26 at 9.11.05 PM.jpeg" },
  { id: "v1", title: "Industrial Truck-Mounted Carpet Steam Extraction Demonstration", duration: "1:45", videoUrl: "/pictures/video_26.mp4", thumbnail: "/pictures/real_image_1.jpeg" },
  { id: "v2", title: "Deep Pet Stain & Urine Odour Neutralization In Action", duration: "1:15", videoUrl: "/pictures/video_27.mp4", thumbnail: "/pictures/real_image_2.jpeg" },
  { id: "v3", title: "Rotational High-Pressure Tile & Grout Hydro-Scrubbing", duration: "2:10", videoUrl: "/pictures/video_28.mp4", thumbnail: "/pictures/real_image_3.jpeg" },
  { id: "v4", title: "5-Seater Sofa & Lounge Upholstery Steam Wash", duration: "2:05", videoUrl: "/pictures/video_29.mp4", thumbnail: "/pictures/real_image_4.jpeg" },
  { id: "v5", title: "End of Lease Bond Clean Final Walkthrough & Steam", duration: "3:15", videoUrl: "/pictures/video_30.mp4", thumbnail: "/pictures/real_image_5.jpeg" },
  { id: "v6", title: "Persian & Wool Rug Dye-Safe Steam Restoration", duration: "2:40", videoUrl: "/pictures/video_31.mp4", thumbnail: "/pictures/real_image_6.jpeg" },
  { id: "v7", title: "Emergency Water Damage & Carpet Moisture Extraction", duration: "3:50", videoUrl: "/pictures/video_32.mp4", thumbnail: "/pictures/real_image_7.jpeg" },
  { id: "v8", title: "Commercial Office Carpet Tile Steam Wash Night Dispatch", duration: "4:10", videoUrl: "/pictures/video_33.mp4", thumbnail: "/pictures/real_image_8.jpeg" }
];

