export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: string;
  unit: string;
  badge?: string;
  iconName: string;
  features: string[];
  benefits: string[];
  popular?: boolean;
}

export interface SuburbItem {
  name: string;
  postcode: string;
  region: string;
  sameDayAvailable: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  suburb: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  avatarBg: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'carpet' | 'bond' | 'pricing' | 'general';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export interface BookingRecord {
  referenceId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  suburb: string;
  serviceId: string;
  serviceTitle: string;
  roomsCount: number;
  addons: string[];
  preferredDate: string;
  preferredTime: string;
  estimatedPrice: number;
  status: 'Confirmed' | 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
}

export const COMPANY_INFO = {
  name: "Canberra Carpet Cleaning Deals",
  shortName: "Canberra Cleaners",
  phone: "0481 734 225",
  phoneFormatted: "0481 734 225",
  telLink: "tel:0481734225",
  email: "info@canberracarpetcleaningdeals.com.au",
  address: "City Walk, Canberra ACT 2601, Australia",
  hours: "Monday - Sunday: 7:00 AM - 8:00 PM (24/7 Emergency Dispatch)",
  googleRating: 5.0,
  reviewsCount: 489,
  bondGuarantee: "100% Bond Back Guarantee",
  responseMinutes: 15,
  carpetsCleaned: "12,500+",
  actCoverage: "All Canberra ACT & Queanbeyan Suburbs"
};

export const SERVICES: ServiceItem[] = [
  {
    id: "carpet-steam",
    slug: "carpet-steam-cleaning",
    title: "Carpet Steam Cleaning",
    shortDesc: "Deep hot water extraction that destroys bacteria, tough stains, and allergens trapped deep within carpet fibers.",
    fullDesc: "Our high-pressure hot water extraction system reaches deep into carpet fibers to remove stubborn dirt, pet stains, coffee spillages, and dust mites. Leaves carpets soft, sanitized, and fast-drying within 2-4 hours.",
    startingPrice: "$27",
    unit: "per room (min 3 rooms)",
    badge: "Most Popular",
    iconName: "Sparkles",
    popular: true,
    features: [
      "High-pressure hot water steam extraction (up to 120°C)",
      "Non-toxic eco-friendly chemical treatment safe for kids & pets",
      "Stubborn stain & pet odor neutralization included",
      "Free heavy-traffic area pre-spray application",
      "Rapid dry technology (ready to walk on in hours)"
    ],
    benefits: [
      "Extends carpet lifespan significantly",
      "Improves indoor air quality by removing dust & pollen",
      "Restores original carpet texture and vibrant color"
    ]
  },
  {
    id: "end-of-lease",
    slug: "end-of-lease-carpet-cleaning",
    title: "End of Lease Cleaning",
    shortDesc: "Guaranteed 100% Bond Back carpet & property cleaning tailored to pass strict property manager inspections.",
    fullDesc: "Ensure full bond refund with our official End of Lease Cleaning package. We strictly follow real estate check-lists in Canberra and provide a 72-hour free re-clean guarantee if your agent raises any concerns.",
    startingPrice: "$149",
    unit: "package start",
    badge: "100% Bond Guarantee",
    iconName: "ShieldCheck",
    popular: true,
    features: [
      "Full real estate agent checklist compliance",
      "Carpet steam clean + stain removal treatment",
      "Official digital receipt provided for landlord submission",
      "72-Hour free re-clean policy for peace of mind",
      "Combined carpet & pest control bundles available"
    ],
    benefits: [
      "Guaranteed full bond return on carpet clean",
      "Zero stress before moving day key handover",
      "Accepted by all major Canberra real estate agencies"
    ]
  },
  {
    id: "upholstery-couch",
    slug: "upholstery-cleaning",
    title: "Upholstery & Sofa Steam Cleaning",
    shortDesc: "Deep steam sanitization and stain removal for fabric couches, leather lounges, recliners, and dining chairs.",
    fullDesc: "Over time, couches collect dead skin cells, food crumbs, sweat, and body oils. Our gentled yet effective steam extraction revives fabric colors, removes odors, and conditions leather.",
    startingPrice: "$39",
    unit: "per seat",
    badge: "Deep Clean",
    iconName: "Armchair",
    features: [
      "Fabric-safe temperature controlled steam extraction",
      "Leather sofa deep wash and protective conditioning",
      "Pet hair removal & body oil deodorization",
      "Scotchgard fabric protection option available",
      "Fast drying airflow boost"
    ],
    benefits: [
      "Eliminates couch odors completely",
      "Protects expensive lounge suites from permanent discoloration",
      "Refreshes living room aesthetics"
    ]
  },
  {
    id: "tile-grout",
    slug: "tiles-and-grout-cleaning",
    title: "Tile & Grout Cleaning",
    shortDesc: "High-pressure rotational steam washing that strips grime from stained tile surfaces and black grout lines.",
    fullDesc: "Standard mopping only pushes dirt into porous grout lines. Our specialized tile scrubbers apply targeted high-pressure heat to scrub away grime from kitchen tiles, bathrooms, and outdoor patio floors.",
    startingPrice: "$4.50",
    unit: "per sq meter",
    badge: "Grime Destroyer",
    iconName: "Grid",
    features: [
      "High-pressure rotational hydro-steam scrubbing",
      "Deep grout line acid/alkaline deep wash",
      "Mold and mildew spore eradication",
      "Clear or color grout sealant application",
      "Suitable for ceramic, porcelain, and natural stone"
    ],
    benefits: [
      "Brings discolored grout back to original shade",
      "Removes slippery soap scum build-up",
      "Protects grout lines from water penetration"
    ]
  },
  {
    id: "mattress-sanitizing",
    slug: "mattress-cleaning",
    title: "Mattress Sanitization",
    shortDesc: "UV-C light treatment and steam extraction that eliminates dust mites, bedbugs, sweat marks, and allergens.",
    fullDesc: "Sleep on a truly clean bed. We combine high-temp steam cleaning with antimicrobial sanitizer sprays to eliminate allergen triggers, dust mites, and stubborn mattress stains.",
    startingPrice: "$59",
    unit: "per mattress",
    badge: "Hygiene Special",
    iconName: "Bed",
    features: [
      "Anti-dust mite thermal steam treatment",
      "Sanitizing spray targeting bacteria and viruses",
      "Urine, sweat, and spill stain spot removal",
      "Hypoallergenic deodorizer treatment",
      "Double-sided mattress deep clean"
    ],
    benefits: [
      "Significantly improves night allergy symptoms",
      "Eliminates stale sweat and body odors",
      "Extends mattress lifespan"
    ]
  },
  {
    id: "rug-cleaning",
    slug: "rug-cleaning",
    title: "Rug & Tapestry Restoration",
    shortDesc: "Specialized gentle washing for Persian, wool, silk, and synthetic area rugs with fiber color locking.",
    fullDesc: "Delicate area rugs require specialized care to prevent dye bleed or shrink. We inspect fiber types and use custom pH-balanced washing formulas to safely clean decorative rugs.",
    startingPrice: "$45",
    unit: "per rug",
    badge: "Delicate Care",
    iconName: "Layers",
    features: [
      "Rug fiber & dye stability assessment",
      "Deep dust vibration duster treatment",
      "pH-neutral hand wash or soft steam wash",
      "Fringe whitening & fringe detailing",
      "Controlled drying process to prevent mold"
    ],
    benefits: [
      "Safeguards high-value heirloom rugs",
      "Prevents rug fiber rot and fiber stiffness",
      "Restores vibrant original patterns"
    ]
  },
  {
    id: "water-damage",
    slug: "flood-damaged-restoration",
    title: "24/7 Flood & Water Damage Restoration",
    shortDesc: "Emergency rapid water extraction, industrial dehumidification, and structural drying across Canberra.",
    fullDesc: "Pipe burst, heavy storm, or washing machine overflow? Our emergency team responds within 30-45 minutes across ACT with sub-surface water extractors and dehumidifiers.",
    startingPrice: "Custom",
    unit: "quote / emergency",
    badge: "24/7 Emergency",
    iconName: "Droplets",
    features: [
      "30-45 minute emergency arrival guarantee",
      "Industrial truck-mount water extraction unit",
      "Sub-floor and underlay moisture detection",
      "Commercial LGR dehumidifiers & air movers",
      "Direct insurance billings supported"
    ],
    benefits: [
      "Prevents hazardous black mold growth",
      "Saves underlying floorboards and carpet backings",
      "24/7 immediate assistance"
    ]
  },
  {
    id: "pest-control",
    slug: "pest-control",
    title: "End of Lease Pest Control",
    shortDesc: "Targeted flea sprays and general pest treatments required for tenant pet exit agreements.",
    fullDesc: "If you have kept pets during your tenancy, lease agreements in Canberra require a professional flea spray certificate. We provide quick certified spraying alongside carpet cleaning.",
    startingPrice: "$79",
    unit: "per house",
    badge: "Pet Certificate",
    iconName: "Bug",
    features: [
      "Certified flea & pest extermination spray",
      "Official pest control certificate issued on spot",
      "Odorless, pet-safe eco formulation",
      "Covers interior perimeter and exterior carpeted areas",
      "100% Agent acceptance guaranteed"
    ],
    benefits: [
      "Fulfills mandatory lease agreement clause",
      "Completely eradicates fleas & larvae",
      "Convenient same-day combined service"
    ]
  }
];

export const ACT_SUBURBS: SuburbItem[] = [
  // North Canberra
  { name: "Canberra City", postcode: "2601", region: "North Canberra", sameDayAvailable: true },
  { name: "Braddon", postcode: "2612", region: "North Canberra", sameDayAvailable: true },
  { name: "Turner", postcode: "2612", region: "North Canberra", sameDayAvailable: true },
  { name: "O'Connor", postcode: "2602", region: "North Canberra", sameDayAvailable: true },
  { name: "Lyneham", postcode: "2602", region: "North Canberra", sameDayAvailable: true },
  { name: "Dickson", postcode: "2602", region: "North Canberra", sameDayAvailable: true },
  { name: "Watson", postcode: "2602", region: "North Canberra", sameDayAvailable: true },
  { name: "Ainslie", postcode: "2602", region: "North Canberra", sameDayAvailable: true },
  { name: "Campbell", postcode: "2612", region: "North Canberra", sameDayAvailable: true },

  // Belconnen
  { name: "Belconnen", postcode: "2617", region: "Belconnen", sameDayAvailable: true },
  { name: "Bruce", postcode: "2617", region: "Belconnen", sameDayAvailable: true },
  { name: "Kaleen", postcode: "2617", region: "Belconnen", sameDayAvailable: true },
  { name: "Lawson", postcode: "2617", region: "Belconnen", sameDayAvailable: true },
  { name: "Florey", postcode: "2615", region: "Belconnen", sameDayAvailable: true },
  { name: "Page", postcode: "2614", region: "Belconnen", sameDayAvailable: true },
  { name: "Scullin", postcode: "2614", region: "Belconnen", sameDayAvailable: true },
  { name: "Hawker", postcode: "2614", region: "Belconnen", sameDayAvailable: true },
  { name: "Weetangera", postcode: "2614", region: "Belconnen", sameDayAvailable: true },
  { name: "Evatt", postcode: "2617", region: "Belconnen", sameDayAvailable: true },
  { name: "Giralang", postcode: "2617", region: "Belconnen", sameDayAvailable: true },
  { name: "Macgregor", postcode: "2615", region: "Belconnen", sameDayAvailable: true },
  { name: "Latham", postcode: "2615", region: "Belconnen", sameDayAvailable: true },
  { name: "Dunlop", postcode: "2615", region: "Belconnen", sameDayAvailable: true },

  // Gungahlin
  { name: "Gungahlin", postcode: "2912", region: "Gungahlin", sameDayAvailable: true },
  { name: "Franklin", postcode: "2913", region: "Gungahlin", sameDayAvailable: true },
  { name: "Harrison", postcode: "2914", region: "Gungahlin", sameDayAvailable: true },
  { name: "Palmerston", postcode: "2913", region: "Gungahlin", sameDayAvailable: true },
  { name: "Ngunnawal", postcode: "2913", region: "Gungahlin", sameDayAvailable: true },
  { name: "Amaroo", postcode: "2914", region: "Gungahlin", sameDayAvailable: true },
  { name: "Forde", postcode: "2914", region: "Gungahlin", sameDayAvailable: true },
  { name: "Bonner", postcode: "2914", region: "Gungahlin", sameDayAvailable: true },
  { name: "Casey", postcode: "2913", region: "Gungahlin", sameDayAvailable: true },
  { name: "Moncrieff", postcode: "2914", region: "Gungahlin", sameDayAvailable: true },
  { name: "Taylor", postcode: "2913", region: "Gungahlin", sameDayAvailable: true },
  { name: "Throsby", postcode: "2914", region: "Gungahlin", sameDayAvailable: true },

  // South Canberra & Woden Valley
  { name: "Barton", postcode: "2600", region: "South Canberra", sameDayAvailable: true },
  { name: "Kingston", postcode: "2604", region: "South Canberra", sameDayAvailable: true },
  { name: "Manuka", postcode: "2603", region: "South Canberra", sameDayAvailable: true },
  { name: "Griffith", postcode: "2603", region: "South Canberra", sameDayAvailable: true },
  { name: "Yarralumla", postcode: "2600", region: "South Canberra", sameDayAvailable: true },
  { name: "Deakin", postcode: "2600", region: "South Canberra", sameDayAvailable: true },
  { name: "Phillip", postcode: "2606", region: "Woden Valley", sameDayAvailable: true },
  { name: "Woden", postcode: "2606", region: "Woden Valley", sameDayAvailable: true },
  { name: "Curtin", postcode: "2605", region: "Woden Valley", sameDayAvailable: true },
  { name: "Garran", postcode: "2605", region: "Woden Valley", sameDayAvailable: true },
  { name: "Hughes", postcode: "2605", region: "Woden Valley", sameDayAvailable: true },
  { name: "Lyons", postcode: "2606", region: "Woden Valley", sameDayAvailable: true },
  { name: "Pearce", postcode: "2607", region: "Woden Valley", sameDayAvailable: true },

  // Tuggeranong
  { name: "Tuggeranong", postcode: "2900", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Greenway", postcode: "2900", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Kambah", postcode: "2902", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Wanniassa", postcode: "2903", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Monash", postcode: "2904", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Gowrie", postcode: "2904", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Fadden", postcode: "2904", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Erindale", postcode: "2903", region: "Tuggeranong", sameDayAvailable: true },
  { name: "Calwell", postcode: "2905", region: "Tuggeranong", sameDayAvailable: true },

  // Weston Creek & Molonglo Valley
  { name: "Coombs", postcode: "2611", region: "Molonglo Valley", sameDayAvailable: true },
  { name: "Wright", postcode: "2611", region: "Molonglo Valley", sameDayAvailable: true },
  { name: "Denman Prospect", postcode: "2611", region: "Molonglo Valley", sameDayAvailable: true },
  { name: "Weston", postcode: "2611", region: "Weston Creek", sameDayAvailable: true },

  // Queanbeyan / Jerrabomberra
  { name: "Queanbeyan", postcode: "2620", region: "Queanbeyan Region", sameDayAvailable: true },
  { name: "Jerrabomberra", postcode: "2619", region: "Queanbeyan Region", sameDayAvailable: true },
  { name: "Googong", postcode: "2620", region: "Queanbeyan Region", sameDayAvailable: true }
];

export const PRICING_PACKAGES = [
  {
    title: "Starter Clean",
    price: "$89",
    subtitle: "Up to 3 Rooms",
    savings: "Save $15",
    features: [
      "Deep hot water steam extraction",
      "Free high-traffic pre-spray",
      "Light stain spot treatment",
      "Deodorizing spray application",
      "Fast 2-4 hr drying time"
    ],
    ctaText: "Book 3 Rooms Deal",
    popular: false
  },
  {
    title: "Popular Family House",
    price: "$115",
    subtitle: "Up to 4 Rooms + Hallway",
    savings: "Best Value",
    features: [
      "Deep steam clean for 4 bedrooms",
      "Free long hallway or stairs section",
      "Heavy pet hair & stain treatment",
      "Eco-friendly anti-allergen spray",
      "Sanitizing deodorizer treatment",
      "100% Satisfaction Guarantee"
    ],
    ctaText: "Claim $115 Special",
    popular: true
  },
  {
    title: "End of Lease Bond Clean",
    price: "$179",
    subtitle: "Complete Property Bond Clean",
    savings: "100% Bond Guarantee",
    features: [
      "Carpet steam clean to real estate standard",
      "Complimentary pet flea spray certificate option",
      "Heavy grime & high traffic scrub",
      "Official agency tax invoice issued",
      "Free 72-hour re-clean guarantee"
    ],
    ctaText: "Book Bond Clean",
    popular: false
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "r1",
    author: "Sarah Jenkins",
    suburb: "Gungahlin",
    rating: 5,
    date: "3 days ago",
    service: "End of Lease Carpet Clean",
    comment: "Called Canberra Carpet Cleaning Deals last minute for our rental handover in Gungahlin. They came same-day, removed red wine stains our landlord complained about, and we got our full bond back! Outstanding service.",
    avatarBg: "from-sky-500 to-blue-600"
  },
  {
    id: "r2",
    author: "Michael Thornton",
    suburb: "Belconnen",
    rating: 5,
    date: "1 week ago",
    service: "Carpet & Sofa Steam Cleaning",
    comment: "Remarkable job on our 5-seater corner lounge and 3 bedrooms. The carpets look brand new and smelled so fresh without harsh chemical odors. The technician was polite and super efficient.",
    avatarBg: "from-lime-600 to-emerald-700"
  },
  {
    id: "r3",
    author: "Elena Rostova",
    suburb: "Kingston",
    rating: 5,
    date: "2 weeks ago",
    service: "Tile & Grout Cleaning",
    comment: "Our kitchen tile grout lines were completely blackened after years of cooking. Canberra Cleaners blasted away all the grime in under an hour. Highly recommend their tile steam service!",
    avatarBg: "from-blue-600 to-sky-700"
  },
  {
    id: "r4",
    author: "David MacLeod",
    suburb: "Tuggeranong",
    rating: 5,
    date: "3 weeks ago",
    service: "Pet Stain & Odor Removal",
    comment: "Our golden retriever had several accidents on our wool rug. They treated the stains with specialized pet enzymes and now there is zero smell. Very reasonable pricing too ($27/room).",
    avatarBg: "from-lime-500 to-green-600"
  },
  {
    id: "r5",
    author: "Rebecca Miller",
    suburb: "Braddon",
    rating: 5,
    date: "1 month ago",
    service: "Emergency Flood Restoration",
    comment: "Had a burst washing machine hose at 11pm. Their emergency water extraction unit was at my apartment within 35 minutes! Saved my wooden floorboards and carpets from permanent destruction.",
    avatarBg: "from-sky-600 to-indigo-700"
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    question: "How much does carpet cleaning cost in Canberra?",
    answer: "Our carpet steam cleaning starts at just $27 per room (for a minimum of 3 rooms at $89 total). We offer transparent upfront pricing with zero hidden call-out fees. You can use our online Instant Quote Calculator to get an immediate cost estimate.",
    category: "pricing"
  },
  {
    id: "f2",
    question: "How long will my carpets take to dry after steam cleaning?",
    answer: "Thanks to our commercial-grade high-power suction equipment, carpets usually dry within 2 to 4 hours. On warm or windy days in Canberra, drying can take as little as 90 minutes. We recommend leaving windows slightly ajar or turning on ceiling fans to speed up airflow.",
    category: "carpet"
  },
  {
    id: "f3",
    question: "Do you offer a 100% Bond Back Guarantee for rental properties?",
    answer: "Yes! Our End of Lease carpet cleaning strictly follows the official ACT Real Estate cleaning checklists. We provide a tax invoice formatted for property managers, and offer a 72-Hour Free Re-Clean policy if your property manager has any feedback.",
    category: "bond"
  },
  {
    id: "f4",
    question: "Are your cleaning products safe for pets and young children?",
    answer: "Absolutely. We exclusively use non-toxic, eco-friendly, biodegradable cleaning solutions that are non-allergenic and 100% safe for babies, pregnant mothers, cats, and dogs.",
    category: "general"
  },
  {
    id: "f5",
    question: "Can you remove tough pet urine, coffee, and wine stains?",
    answer: "Yes! We specialize in deep stain extraction and pet enzyme treatments that break down urine crystals and organic tannins at the root level rather than masking them with perfume.",
    category: "carpet"
  },
  {
    id: "f6",
    question: "Do you provide same-day carpet cleaning service across Canberra?",
    answer: "Yes, we have local mobile teams stationed across North Canberra, South Canberra, Belconnen, Gungahlin, Tuggeranong, Woden, and Queanbeyan ready for same-day dispatches when booked before 1:00 PM.",
    category: "general"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    slug: "how-to-pass-end-of-lease-carpet-inspection-canberra",
    title: "5 Insider Tips to Pass Your End of Lease Carpet Inspection in Canberra",
    excerpt: "Moving out of your ACT rental? Here is how to ensure your real estate agent approves your carpet steam cleaning invoice and returns 100% of your bond.",
    content: `Moving out of a rental home in Canberra can be stressful. Property managers in the ACT adhere to strict move-out checklists, especially regarding carpets and pest flea certificates.

### 1. Always Hire an Agent-Approved Professional
Canberra real estate agencies require a tax invoice proving steam extraction was performed by a licensed operator. DIY hire machines often leave excess water, resulting in musty smells or mildew.

### 2. Treat Pet Stains & Odors Organically
If you have kept pets, ensure enzyme treatment is applied to destroy subsurface urine crystals before steam extraction.

### 3. Ensure 72-Hour Re-Clean Coverage
Choose a service like Canberra Carpet Cleaning Deals that includes a complimentary 72-Hour Re-Clean Guarantee if your property agent notes any items on inspection day.`,
    author: "Canberra Cleaning Expert",
    date: "August 2, 2026",
    readTime: "4 min read",
    category: "End of Lease",
    image: "/images/hero-carpet.png"
  },
  {
    id: "b2",
    slug: "steam-cleaning-vs-dry-cleaning-carpets",
    title: "Steam Cleaning vs Dry Cleaning: Which is Best for Canberra Homes?",
    excerpt: "Comparing hot water extraction and chemical dry cleaning to see which method removes stubborn Canberra red dirt and pollen better.",
    content: `When selecting carpet cleaning in Canberra, homeowners frequently ask whether steam cleaning or dry cleaning is superior.

### Hot Water Extraction (Steam Cleaning)
Steam cleaning forces hot water and eco-friendly cleaning agents deep into carpet fibers, breaking down dirt, pet dander, and bacteria. The high-powered vacuum then extracts over 95% of the moisture along with deep-seated grime.

### Dry Cleaning
Dry cleaning uses chemical solvents and a rotary pad. While drying takes less time, it primarily cleans surface carpet tips rather than deep fibers.

### Verdict
For allergy relief, deep stain removal, and end-of-lease compliance, Hot Water Steam Cleaning remains the gold standard in Canberra.`,
    author: "Senior Cleaning Technician",
    date: "July 24, 2026",
    readTime: "5 min read",
    category: "Carpet Care",
    image: "/images/couch-clean.png"
  }
];
