// Comprehensive Hotel Data & State Management for Grand Aurelia Luxury Resort & Suites

export const HOTEL_INFO = {
  name: "Grand Aurelia Resort & Suites",
  tagline: "Ultra-Luxury Oceanfront Haven & World-Class Hospitality",
  stars: 5,
  rating: 4.96,
  reviewsCount: 1420,
  address: "740 Boulevard de la Croisette, Azure Coastline",
  phone: "+1 (800) 845-9200",
  email: "concierge@grandaureliaresort.com",
  checkInTime: "15:00",
  checkOutTime: "11:00",
  taxRate: 0.12, // 12% Hospitality & Luxury Tax
  currency: "$",
};

export const INITIAL_ROOMS = [
  {
    id: "101",
    number: "101",
    floor: 1,
    name: "Deluxe Garden Sanctuary",
    category: "deluxe",
    type: "Deluxe Room",
    price: 280,
    size: 480,
    maxGuests: 2,
    bedType: "King Size Bed",
    view: "Tropical Botanical Gardens",
    status: "available", // 'available' | 'occupied' | 'cleaning' | 'reserved'
    cleanStatus: "clean", // 'clean' | 'needs_cleaning' | 'in_progress' | 'inspected'
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.9,
    reviews: 84,
    description: "Nestled amidst lush botanical flora, the Deluxe Garden Sanctuary offers an oasis of serene tranquility with private stone veranda and artisanal marble bathroom.",
    amenities: ["High-Speed Wi-Fi", "Espresso Machine", "Rainfall Shower", "Smart Climate Control", "Private Veranda", "Organic Toiletries", "Minibar", "55\" 4K TV"],
    currentGuest: null
  },
  {
    id: "102",
    number: "102",
    floor: 1,
    name: "Emerald Palm Suite",
    category: "deluxe",
    type: "Deluxe Room",
    price: 320,
    size: 540,
    maxGuests: 3,
    bedType: "King Bed + Daybed",
    view: "Lagoon Pool & Palms",
    status: "occupied",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.88,
    reviews: 62,
    description: "Direct walk-out access to the heated lagoon pool surrounded by royal palms, tailored for leisure seekers desiring poolside luxury.",
    amenities: ["Pool Walk-out", "High-Speed Wi-Fi", "Deep Soaking Tub", "Soundbar Audio", "Designer Bathrobes", "Minibar", "In-room Safe", "Evening Turndown"],
    currentGuest: {
      name: "Marcus Vance",
      reservationId: "GA-2025-102",
      checkIn: "2026-09-29",
      checkOut: "2026-10-04"
    }
  },
  {
    id: "103",
    number: "103",
    floor: 1,
    name: "Royal Garden Pavilion",
    category: "deluxe",
    type: "Deluxe Suite",
    price: 360,
    size: 600,
    maxGuests: 4,
    bedType: "Two Queen Beds",
    view: "Courtyard & Fountains",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.92,
    reviews: 79,
    description: "Spacious dual-queen configuration adorned in warm neutral textures, ideal for discerning families or executive partners.",
    amenities: ["Dual Vanity Bathroom", "High-Speed Wi-Fi", "Courtyard Patio", "Marshall Speaker", "Nespresso Bar", "Walk-in Closet", "Room Service 24/7"],
    currentGuest: null
  },
  {
    id: "104",
    number: "104",
    floor: 1,
    name: "Azure Courtyard Atelier",
    category: "deluxe",
    type: "Deluxe Room",
    price: 270,
    size: 460,
    maxGuests: 2,
    bedType: "Queen Size Bed",
    view: "Zen Courtyard",
    status: "cleaning",
    cleanStatus: "in_progress",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.85,
    reviews: 45,
    description: "A calming contemporary atelier overlooking the bamboo zen courtyard, tailored for peaceful relaxation and restorative sleep.",
    amenities: ["High-Speed Wi-Fi", "Rainfall Shower", "Smart TV", "Organic Herbal Teas", "Noise-Cancelling Windows", "Hypoallergenic Pillows"],
    currentGuest: null
  },
  {
    id: "201",
    number: "201",
    floor: 2,
    name: "Executive Horizon Suite",
    category: "suite",
    type: "Executive Suite",
    price: 490,
    size: 720,
    maxGuests: 2,
    bedType: "Master California King",
    view: "Panoramic Ocean Horizon",
    status: "occupied",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.97,
    reviews: 112,
    description: "Floor-to-ceiling glass reveals breathtaking Mediterranean vistas. Features a separate salon, cocktail bar, and private balcony lounge.",
    amenities: ["Private Ocean Balcony", "Cocktail Bar Cabinet", "Dedicated Concierge", "Freestanding Soaking Tub", "Bang & Olufsen Audio", "Bespoke Linens", "Valet Parking"],
    currentGuest: {
      name: "Dr. Evelyn Reed",
      reservationId: "GA-2025-201",
      checkIn: "2026-09-30",
      checkOut: "2026-10-05"
    }
  },
  {
    id: "202",
    number: "202",
    floor: 2,
    name: "Sunset Riviera Suite",
    category: "suite",
    type: "Executive Suite",
    price: 530,
    size: 780,
    maxGuests: 3,
    bedType: "King Bed + Plush Sofa Bed",
    view: "Golden Hour Sunset Coast",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.94,
    reviews: 98,
    description: "Positioned directly towards the sunset trajectory, bathing the suite in radiant golden hues every evening. Complete with wine cellar fridge.",
    amenities: ["Sunset Balcony Daybed", "Sub-Zero Wine Fridge", "Italian Marble Bath", "Dyson Supersonic Dryer", "Custom Pillow Menu", "Complimentary Breakfast"],
    currentGuest: null
  },
  {
    id: "203",
    number: "203",
    floor: 2,
    name: "Sapphire Club Suite",
    category: "suite",
    type: "Executive Suite",
    price: 560,
    size: 820,
    maxGuests: 3,
    bedType: "King Bed",
    view: "Marina Bay & Coastal Yachts",
    status: "reserved",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.96,
    reviews: 73,
    description: "Includes exclusive access to the 2nd Floor Executive Sapphire Club Lounge with evening champagne tastings and culinary canapés.",
    amenities: ["Sapphire Club Lounge Access", "High-Floor View", "Express Check-In", "Executive Work Desk", "Nespresso Bar", "Steam Shower", "Butler Service"],
    currentGuest: {
      name: "Arthur Pendelton",
      reservationId: "GA-2025-203",
      checkIn: "2026-10-02",
      checkOut: "2026-10-07"
    }
  },
  {
    id: "204",
    number: "204",
    floor: 2,
    name: "Grand Mediterranean Salon",
    category: "suite",
    type: "Executive Suite",
    price: 510,
    size: 740,
    maxGuests: 4,
    bedType: "Two Double Beds",
    view: "Azure Sea & Palms",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.91,
    reviews: 64,
    description: "Classic European grandeur meets modern coastal minimalism. Generously proportioned double beds with expansive dressing quarters.",
    amenities: ["Double Walk-in Closets", "Oceanfront Terrace", "Smart Home Automation", "65\" OLED TV", "Hermès Bath Amenities", "Daily Fresh Florals"],
    currentGuest: null
  },
  {
    id: "301",
    number: "301",
    floor: 3,
    name: "Presidential Lagoon Villa",
    category: "villa",
    type: "Luxury Villa",
    price: 920,
    size: 1350,
    maxGuests: 4,
    bedType: "Grand California King + Guest Suite",
    view: "Private Lagoon & Open Sea",
    status: "occupied",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.99,
    reviews: 145,
    description: "An extravagant oceanfront villa featuring private infinity plunge pool, outdoor teak dining pavilion, and dedicated 24-hour butler team.",
    amenities: ["Private Infinity Plunge Pool", "24/7 Dedicated Butler", "Teak Dining Pavilion", "In-Villa Private Chef Option", "Private Beach Cabana", "Chauffeur Airport Transfer"],
    currentGuest: {
      name: "Siddharth & Ananya Roy",
      reservationId: "GA-2025-301",
      checkIn: "2026-09-28",
      checkOut: "2026-10-03"
    }
  },
  {
    id: "302",
    number: "302",
    floor: 3,
    name: "Overwater Coral Haven Villa",
    category: "villa",
    type: "Luxury Villa",
    price: 980,
    size: 1420,
    maxGuests: 3,
    bedType: "California King Bed",
    view: "Glass Floor Over Coral Reef",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.98,
    reviews: 130,
    description: "Suspended above crystal turquoise waters with illuminated glass floor viewing panels, hammock over water, and private yacht mooring.",
    amenities: ["Overwater Sun Deck", "Glass Floor Observation Panel", "Private Sea Ladder", "Outdoor Jacuzzi", "Champagne Upon Arrival", "Full In-room Spa Services"],
    currentGuest: null
  },
  {
    id: "303",
    number: "303",
    floor: 3,
    name: "Infinity Cliffside Sanctuary",
    category: "villa",
    type: "Luxury Villa",
    price: 1050,
    size: 1550,
    maxGuests: 4,
    bedType: "Two Master Suites",
    view: "Cliffside Panoramic Coast",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.99,
    reviews: 88,
    description: "Perched dramatically on the cliff edge with dramatic unobstructed oceanic views, dual fire pits, and stone plunge sanctuary.",
    amenities: ["Dual Fire Pits", "Heated Cliffside Pool", "Outdoor Rainfall Showers", "Sonos Sound System", "Private Wine Cellar", "Yacht Charter Credit"],
    currentGuest: null
  },
  {
    id: "304",
    number: "304",
    floor: 3,
    name: "Monte Carlo Villa Retreat",
    category: "villa",
    type: "Luxury Villa",
    price: 880,
    size: 1280,
    maxGuests: 3,
    bedType: "King Bed + Lounger",
    view: "Bay & Marina Skyline",
    status: "cleaning",
    cleanStatus: "needs_cleaning",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.93,
    reviews: 76,
    description: "Infused with Riviera charm and mid-century Italian design, offering a secluded garden jacuzzi and al fresco breakfast pergola.",
    amenities: ["Garden Jacuzzi", "Al Fresco Pergola", "In-villa Barista", "Custom Silk Robes", "Smart Glass Privacy", "Limousine Valet"],
    currentGuest: null
  },
  {
    id: "401",
    number: "401",
    floor: 4,
    name: "The Aurelia Imperial Penthouse",
    category: "penthouse",
    type: "Imperial Penthouse",
    price: 1850,
    size: 2600,
    maxGuests: 6,
    bedType: "Grand Emperor King + 2 Master Suites",
    view: "360° Coastal Bay & Mountain Ridge",
    status: "occupied",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 5.0,
    reviews: 62,
    description: "The crown jewel of Grand Aurelia. Spanning the entire east wing of Floor 4 with private rooftop pool, Steinway grand piano, security detail quarters, and Michelin chef dining suite.",
    amenities: ["Private Rooftop Infinity Pool", "Steinway Grand Piano", "Private Helipad Landing Privilege", "24/7 Private Executive Chef", "Master Sommelier Selection", "Security Escort Suite", "Direct Private Elevator"],
    currentGuest: {
      name: "Countess Sofia De Luca",
      reservationId: "GA-2025-401",
      checkIn: "2026-09-27",
      checkOut: "2026-10-06"
    }
  },
  {
    id: "402",
    number: "402",
    floor: 4,
    name: "Crown Sky Sanctuary Penthouse",
    category: "penthouse",
    type: "Presidential Penthouse",
    price: 1650,
    size: 2250,
    maxGuests: 5,
    bedType: "Two Emperor Kings",
    view: "Infinite Ocean Horizon & Constellations",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.99,
    reviews: 51,
    description: "Retractable glass ceiling over the master bedroom for stargazing, an astronomical telescope, rooftop spa jacuzzi, and full entertainment lounge.",
    amenities: ["Retractable Stargazing Ceiling", "Rooftop Heated Jacuzzi", "Professional Telescope", "Full Cocktail Lounge Bar", "Butler & Concierge Valet", "Private Sauna & Steam Room"],
    currentGuest: null
  },
  {
    id: "403",
    number: "403",
    floor: 4,
    name: "Celestial Two-Story Duplex Penthouse",
    category: "penthouse",
    type: "Duplex Penthouse",
    price: 1720,
    size: 2400,
    maxGuests: 5,
    bedType: "Master Emperor King + Queen Suite",
    view: "Endless Azure Horizon",
    status: "available",
    cleanStatus: "clean",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    gallery: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"],
    rating: 4.98,
    reviews: 48,
    description: "Architectural masterpiece boasting a two-story 24-foot glass wall looking out over the sea, floating spiral staircase, and private cinema room.",
    amenities: ["Private Cinema Room", "Floating Spiral Glass Staircase", "Two-Story Sea Window", "Private Wine Bar", "In-suite Massage Suite", "Priority Yacht Booking"],
    currentGuest: null
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "GA-2025-102",
    guestName: "Marcus Vance",
    email: "marcus.vance@techcorp.io",
    phone: "+1 (415) 890-3321",
    roomNumber: "102",
    roomName: "Emerald Palm Suite",
    checkIn: "2026-09-29",
    checkOut: "2026-10-04",
    nights: 5,
    adults: 2,
    children: 1,
    ratePerNight: 320,
    roomTotal: 1600,
    taxes: 192,
    addOnsTotal: 150,
    grandTotal: 1942,
    paidAmount: 1942,
    paymentStatus: "paid", // 'paid' | 'partial' | 'due'
    status: "checked_in", // 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
    specialRequests: "High floor preference, feather-free pillows, late check-out requested.",
    addOns: [
      { name: "Champagne Breakfast Buffet", price: 90 },
      { name: "Luxury Airport Limousine", price: 60 }
    ],
    roomServiceCharges: [
      { item: "Mediterranean Lobster Tail", price: 65, time: "2026-09-30 20:15" },
      { item: "Golden Aurelia Elixir", price: 28, time: "2026-09-30 21:00" }
    ],
    createdAt: "2026-09-20"
  },
  {
    id: "GA-2025-201",
    guestName: "Dr. Evelyn Reed",
    email: "e.reed@oxford-research.ac.uk",
    phone: "+44 20 7946 0912",
    roomNumber: "201",
    roomName: "Executive Horizon Suite",
    checkIn: "2026-09-30",
    checkOut: "2026-10-05",
    nights: 5,
    adults: 2,
    children: 0,
    ratePerNight: 490,
    roomTotal: 2450,
    taxes: 294,
    addOnsTotal: 220,
    grandTotal: 2964,
    paidAmount: 2964,
    paymentStatus: "paid",
    status: "checked_in",
    specialRequests: "Quiet corner room, extra espresso pods, early morning wake-up call at 07:00.",
    addOns: [
      { name: "Ayurvedic Aromatherapy Spa (2 Guests)", price: 220 }
    ],
    roomServiceCharges: [],
    createdAt: "2026-09-22"
  },
  {
    id: "GA-2025-203",
    guestName: "Arthur Pendelton",
    email: "arthur.pendelton@capitalpartners.com",
    phone: "+1 (212) 555-0199",
    roomNumber: "203",
    roomName: "Sapphire Club Suite",
    checkIn: "2026-10-02",
    checkOut: "2026-10-07",
    nights: 5,
    adults: 1,
    children: 0,
    ratePerNight: 560,
    roomTotal: 2800,
    taxes: 336,
    addOnsTotal: 100,
    grandTotal: 3236,
    paidAmount: 1000,
    paymentStatus: "partial",
    status: "confirmed",
    specialRequests: "Conference room access needed for business presentations.",
    addOns: [
      { name: "Executive Business Lounge Package", price: 100 }
    ],
    roomServiceCharges: [],
    createdAt: "2026-09-25"
  },
  {
    id: "GA-2025-301",
    guestName: "Siddharth & Ananya Roy",
    email: "roy.siddharth@globalventures.in",
    phone: "+91 98201 44521",
    roomNumber: "301",
    roomName: "Presidential Lagoon Villa",
    checkIn: "2026-09-28",
    checkOut: "2026-10-03",
    nights: 5,
    adults: 2,
    children: 1,
    ratePerNight: 920,
    roomTotal: 4600,
    taxes: 552,
    addOnsTotal: 450,
    grandTotal: 5602,
    paidAmount: 5602,
    paymentStatus: "paid",
    status: "checked_in",
    specialRequests: "Anniversary celebration setup: Rose petals, chilled champagne on arrival.",
    addOns: [
      { name: "Sunset Catamaran Charter (Private)", price: 350 },
      { name: "Gourmet Caviar & Vintage Brut", price: 100 }
    ],
    roomServiceCharges: [
      { item: "Imperial Wagyu Ribeye", price: 95, time: "2026-09-29 19:30" }
    ],
    createdAt: "2026-09-15"
  },
  {
    id: "GA-2025-401",
    guestName: "Countess Sofia De Luca",
    email: "sofia.deluca@palazzoluxury.eu",
    phone: "+39 06 698 12345",
    roomNumber: "401",
    roomName: "The Aurelia Imperial Penthouse",
    checkIn: "2026-09-27",
    checkOut: "2026-10-06",
    nights: 9,
    adults: 3,
    children: 0,
    ratePerNight: 1850,
    roomTotal: 16650,
    taxes: 1998,
    addOnsTotal: 1200,
    grandTotal: 19848,
    paidAmount: 19848,
    paymentStatus: "paid",
    status: "checked_in",
    specialRequests: "Private security escort, daily fresh white lilies, organic plant-based private chef dinners.",
    addOns: [
      { name: "Private Helicopter Coastal Transfer", price: 800 },
      { name: "Unlimited In-Penthouse Spa Service", price: 400 }
    ],
    roomServiceCharges: [],
    createdAt: "2026-09-10"
  },
  {
    id: "GA-2025-089",
    guestName: "Elena Rostova",
    email: "elena.rostova@designhaus.de",
    phone: "+49 30 227 3001",
    roomNumber: "103",
    roomName: "Royal Garden Pavilion",
    checkIn: "2026-09-24",
    checkOut: "2026-09-29",
    nights: 5,
    adults: 2,
    children: 0,
    ratePerNight: 360,
    roomTotal: 1800,
    taxes: 216,
    addOnsTotal: 80,
    grandTotal: 2096,
    paidAmount: 2096,
    paymentStatus: "paid",
    status: "checked_out",
    specialRequests: "Quiet corner room, late check-out completed at 13:00.",
    addOns: [{ name: "Artisanal Breakfast Buffet", price: 80 }],
    roomServiceCharges: [],
    createdAt: "2026-09-12"
  }
];

export const DINING_MENU = [
  {
    id: "din-01",
    category: "Breakfast & Brunch",
    name: "Royal Beluga & Brioche Benedict",
    description: "Poached pasture-raised farm eggs, Ossetra caviar, butter-toasted brioche, champagne hollandaise.",
    price: 48,
    dietary: ["Chef Special", "Pescatarian"],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-02",
    category: "Breakfast & Brunch",
    name: "Aurelia Golden Acai & Dragonfruit Bowl",
    description: "Organic Amazonian acai, dragonfruit rosettes, wild mountain berries, chia pearls, gold leaf flakes.",
    price: 26,
    dietary: ["Vegan", "Gluten-Free", "Organic"],
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-03",
    category: "Fine Dining",
    name: "Imperial Miyazaki A5 Wagyu Ribeye",
    description: "Charcoal-seared 8oz Miyazaki beef, black winter truffle jus, fondant potato, baby heirloom carrots.",
    price: 135,
    dietary: ["Chef Signature", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-04",
    category: "Fine Dining",
    name: "Mediterranean Blue Lobster Tail",
    description: "Butter-poached Breton blue lobster, saffron emulsion, sea fennel, hand-rolled ink tagliolini.",
    price: 88,
    dietary: ["Pescatarian", "Chef Special"],
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-05",
    category: "Fine Dining",
    name: "Wild Morel & White Truffle Risotto",
    description: "Acquerello aged carnaroli rice, mountain morel mushrooms, 36-month Parmigiano-Reggiano, fresh white truffle shavings.",
    price: 64,
    dietary: ["Vegetarian", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-06",
    category: "Mixology & Cellar",
    name: "The Grand Aurelia Golden 24K Elixir",
    description: "Macallan 18 Rare Cask, smoked Madagascar vanilla, saffron bitters, edible 24K gold flakes, hand-carved ice sphere.",
    price: 42,
    dietary: ["Handcrafted Cocktail"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-07",
    category: "Mixology & Cellar",
    name: "Dom Pérignon Vintage Champagne Brut 2013",
    description: "Served chilled in crystal flutes with chef's canapé selection.",
    price: 360,
    dietary: ["Vintage Champagne"],
    image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-08",
    category: "Spa & Wellness",
    name: "Azure 90-Minute Signature Deep Tissue & Hot Stone",
    description: "Targeted tension release using warm volcanic basalt stones and organic coastal botanicals in our oceanfront pavilion.",
    price: 195,
    dietary: ["Wellness Experience"],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "din-09",
    category: "Excursions",
    name: "Sunset Catamaran & Champagne Cruise",
    description: "2-hour private yacht cruise along the golden coast with private captain, oysters, and chilled vintage champagne.",
    price: 420,
    dietary: ["Private Experience"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
  }
];

export const HOTEL_AMENITIES = [
  {
    id: "amenity-1",
    title: "Lagoon Infinity Oasis",
    subtitle: "Temperature-Controlled Heated Pools",
    description: "Three tiered heated infinity lagoons blending into the azure coastline, flanked by private shaded cabanas with chilled towels and fruit skewers.",
    icon: "Waves",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "amenity-2",
    title: "Azure Spa & Thermal Sanctuary",
    subtitle: "Holistic Rejuvenation & Hydrotherapy",
    description: "World-class wellness center equipped with Finnish saunas, Himalayan salt caves, cold plunge cascades, and private treatment pavilions.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "amenity-3",
    title: "Le Ciel Rooftop Lounge & Bar",
    subtitle: "Michelin-Caliber Culinary Artistry",
    description: "Panoramic rooftop dining led by Executive Chef Jean-Luc Dupont, spotlighting sea-to-table gastronomy and an 1,800-bottle vintage cellar.",
    icon: "Utensils",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "amenity-4",
    title: "Helipad & Private Yacht Mooring",
    subtitle: "Effortless Seamless Arrivals",
    description: "Direct rooftop helipad landings for chartered aerial arrivals, paired with deep-water marina slips catering up to 60-meter mega yachts.",
    icon: "Compass",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80"
  }
];

export const MAINTENANCE_LOGS = [
  {
    id: "maint-1",
    roomNumber: "104",
    issue: "Air conditioning thermostat calibration check",
    severity: "low",
    reportedAt: "2026-10-01 08:30",
    status: "in_progress",
    assignedTo: "Carlos M. (Engineering)"
  },
  {
    id: "maint-2",
    roomNumber: "304",
    issue: "Balcony jacuzzi temperature sensor reset",
    severity: "medium",
    reportedAt: "2026-10-01 09:15",
    status: "pending",
    assignedTo: "Dave K. (Facilities)"
  }
];

export const DEMO_USERS = [
  {
    id: "usr-01",
    name: "Jean-Luc Moreau",
    email: "admin@grandaurelia.com",
    password: "admin123",
    role: "general_manager",
    roleTitle: "General Manager",
    type: "staff",
    department: "Executive Management",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "+33 4 93 39 00 01"
  },
  {
    id: "usr-02",
    name: "Valerie Laurent",
    email: "frontdesk@grandaurelia.com",
    password: "desk123",
    role: "front_desk",
    roleTitle: "Front Desk Supervisor",
    type: "staff",
    department: "Front Desk Operations",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    phone: "+33 4 93 39 00 22"
  },
  {
    id: "usr-03",
    name: "Countess Sofia De Luca",
    email: "sofia.deluca@palazzoluxury.eu",
    password: "patron123",
    role: "vip_patron",
    roleTitle: "Diamond Imperial VIP",
    type: "guest",
    membershipTier: "Diamond Imperial",
    activeRoom: "401",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    phone: "+39 06 698 12345"
  },
  {
    id: "usr-04",
    name: "Marcus Vance",
    email: "marcus.vance@techcorp.io",
    password: "guest123",
    role: "vip_patron",
    roleTitle: "Sapphire Club Member",
    type: "guest",
    membershipTier: "Sapphire Club",
    activeRoom: "102",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    phone: "+1 (415) 890-3321"
  }
];

// LocalStorage helpers to allow stateful actions (booking rooms, checking in/out, changing status)
const STORAGE_KEYS = {
  ROOMS: "grand_aurelia_rooms_v1",
  RESERVATIONS: "grand_aurelia_reservations_v1",
  MAINTENANCE: "grand_aurelia_maintenance_v1",
  USERS: "grand_aurelia_users_v1",
  CURRENT_USER: "grand_aurelia_current_user_v1",
};

export const getStoredRooms = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ROOMS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading rooms from storage", e);
  }
  return INITIAL_ROOMS;
};

export const saveStoredRooms = (rooms) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  } catch (e) {
    console.error("Error saving rooms", e);
  }
};

export const getStoredReservations = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading reservations from storage", e);
  }
  return INITIAL_RESERVATIONS;
};

export const saveStoredReservations = (reservations) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  } catch (e) {
    console.error("Error saving reservations", e);
  }
};

export const getStoredMaintenance = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MAINTENANCE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading maintenance logs", e);
  }
  return MAINTENANCE_LOGS;
};

export const saveStoredMaintenance = (logs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(logs));
  } catch (e) {
    console.error("Error saving maintenance logs", e);
  }
};

export const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading users from storage", e);
  }
  return DEMO_USERS;
};

export const saveStoredUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving users", e);
  }
};

export const getStoredCurrentUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading current user from storage", e);
  }
  return DEMO_USERS[0]; // Default logged-in as General Manager for showcase ease
};

export const saveStoredCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (e) {
    console.error("Error saving current user", e);
  }
};

export const resetAllHotelData = () => {
  localStorage.removeItem(STORAGE_KEYS.ROOMS);
  localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
  localStorage.removeItem(STORAGE_KEYS.MAINTENANCE);
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  return {
    rooms: INITIAL_ROOMS,
    reservations: INITIAL_RESERVATIONS,
    maintenance: MAINTENANCE_LOGS,
    users: DEMO_USERS,
    currentUser: DEMO_USERS[0]
  };
};
