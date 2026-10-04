export const HOTEL_INFO = {
  name: "Aurelia Grand Resort & Spa",
  tagline: "Ultra-Luxury Oceanfront Haven & World-Class Hospitality",
  stars: 5,
  rating: 4.96,
  reviewsCount: 1420,
  address: "740 Boulevard de la Croisette, Azure Coastline",
  phone: "+1 (800) 555-8900",
  email: "concierge@aureliagrand.com",
  checkIn: "15:00",
  checkOut: "11:00",
  currency: "$",
  taxRate: 0.12
};

export const HOTEL_ROOMS = [
  {
    id: "suite-101",
    name: "Deluxe Ocean Sanctuary",
    category: "deluxe",
    type: "Deluxe Suite",
    price: 340,
    size: "520 sq ft",
    maxGuests: 2,
    bedType: "King Size Imperial Bed",
    view: "Panoramic Azure Coastline",
    rating: 4.96,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    description: "Perched above the sapphire coastline, this sun-drenched suite features floor-to-ceiling glass balconies, Italian travertine bathrooms, and bespoke teak furnishings.",
    amenities: ["Ocean View Veranda", "Espresso Bar", "Rainfall Hydro-Shower", "High-Speed Wi-Fi", "Smart Climate Control", "24/7 Concierge"]
  },
  {
    id: "suite-201",
    name: "Emerald Palm Garden Villa",
    category: "villa",
    type: "Private Villa",
    price: 520,
    size: "780 sq ft",
    maxGuests: 3,
    bedType: "Super King + Daybed",
    view: "Lush Botanical Gardens & Private Pool",
    rating: 4.98,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    description: "An intimate sanctuary nestled within private flora gardens. Boasting a heated plunge pool, limestone outdoor bath, and dedicated butler service.",
    amenities: ["Private Plunge Pool", "Outdoor Marble Tub", "Sub-Zero Wine Cellar", "Botanical Terrace", "Organic Bath Amenities", "Valet Parking"]
  },
  {
    id: "suite-301",
    name: "Royal Obsidian Penthouse",
    category: "penthouse",
    type: "Presidential Penthouse",
    price: 890,
    size: "1,250 sq ft",
    maxGuests: 4,
    bedType: "Dual California Kings",
    view: "360° Ocean & Horizon Skyline",
    rating: 5.0,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    description: "The crown jewel of Aurelia Grand. Features wrap-around terraces with private jacuzzi, dining room for eight, grand piano, and private elevator access.",
    amenities: ["Rooftop Jacuzzi", "Private Elevator Access", "Chef's Pantry", "Bespoke Sound System", "Airport Chauffeur", "VIP Lounge Access"]
  },
  {
    id: "suite-401",
    name: "Azure Horizon Suite",
    category: "deluxe",
    type: "Junior Suite",
    price: 290,
    size: "460 sq ft",
    maxGuests: 2,
    bedType: "Queen Luxury Featherbed",
    view: "Harbor & Marina Sunset",
    rating: 4.92,
    reviews: 110,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    description: "Soak in golden hour views over the yacht harbor. Features artisanal woodwork, custom Egyptian linens, and complimentary evening aperitifs.",
    amenities: ["Sunset Balcony", "Nespresso Machine", "Marble Bath", "High-Speed Wi-Fi", "Evening Turndown", "Mini Bar"]
  },
  {
    id: "suite-501",
    name: "Golden Sands Family Pavilion",
    category: "villa",
    type: "Family Villa",
    price: 680,
    size: "960 sq ft",
    maxGuests: 5,
    bedType: "1 King + 2 Queens",
    view: "Direct Beachfront Access",
    rating: 4.94,
    reviews: 83,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    description: "Step straight onto powdery white sands. Designed for seamless family comfort with dual master suites, private sun loungers, and expansive living lounge.",
    amenities: ["Beachfront Walkout", "Dual Master Bedrooms", "Kids Activity Station", "Kitchenette", "Beachside Cabana", "Complimentary Breakfast"]
  },
  {
    id: "suite-601",
    name: "The Celestial Infinity Loft",
    category: "penthouse",
    type: "Duplex Loft",
    price: 760,
    size: "1,100 sq ft",
    maxGuests: 2,
    bedType: "King Size Floating Bed",
    view: "Ocean & Starlit Skyline",
    rating: 4.99,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80",
    description: "Two levels of pure architectural brilliance. Features double-height glass atriums, an indoor suspended fireplace, and private stargazing telescope.",
    amenities: ["Double-Height Glass Atrium", "Floating King Bed", "Smart Home Automation", "In-Room Sommelier Bar", "Telescope Deck", "Spa Pass"]
  }
];

export const HOTEL_AMENITIES = [
  {
    title: "Infinity Lagoon Pool",
    desc: "Heated saltwater lagoon with submerged daybeds and poolside champagne service."
  },
  {
    title: "Michelin-Starred Dining",
    desc: "Three award-winning restaurants curating Mediterranean seafood and fine vintages."
  },
  {
    title: "Aura Holistic Spa",
    desc: "Thermal baths, hydrotherapy circuits, and botanical treatments by master therapists."
  },
  {
    title: "24/7 Private Concierge",
    desc: "Personalized yacht charters, helicopter transfers, and custom island excursions."
  }
];
