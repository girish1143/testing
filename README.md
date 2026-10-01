# 🏨 Grand Aurelia Resort & Suites — Hotel Management System (HMS)

A luxury Hotel Management & Guest Operations Platform built with **React 19**, **Vite**, and **Vanilla CSS**.

---

## ✨ System Architecture & Key Features

### 1. 🌟 Resort Overview & Availability Engine
- **Hero Availability Bar**: Real-time stay search with check-in, check-out, suite category, and guest counts.
- **Resort Facilities Showcase**: Tiered infinity lagoons, Azure Spa & Thermal Sanctuary, Le Ciel Rooftop Lounge, and private helicopter/yacht mooring.
- **Distinguished Guest Acclaim**: Verified testimonials and reviews.

### 2. 🛏️ Suites, Villas & Penthouses Catalog
- **Interactive Inventory**: Filter by category (*Deluxe Sanctuaries*, *Executive Suites*, *Oceanfront Villas*, *Imperial Penthouses*), status (*Available Only*, *Occupied*), and pricing.
- **Deep-Dive Suite Modal**: High-definition photo galleries, living space measurements (sq.ft / m²), bed arrangements, and 15+ bespoke amenities.

### 3. 🛎️ Front Desk PMS & Interactive Floor Matrix
- **Real-Time KPIs**: Live occupancy rate (%), in-house guest count, rooms awaiting turnover, and daily revenue metrics.
- **Interactive Floor Matrix (Floors 1–4)**: Color-coded room tiles indicating status:
  - 🟢 **Available**: 1-click guest assignment or turnover dispatch
  - 🔴 **Occupied**: In-house guest details, 1-click check-out, and folio access
  - 🔵 **Cleaning**: Real-time turnover status
  - 🟡 **Reserved**: Upcoming arrival check-in action
- **Guest Reservations Desk**: Search and filter by booking code, guest name, email, or room number. 1-click Check-In, Check-Out, and Folio generation.

### 4. 🧹 Housekeeping & Engineering Console
- **Room Sanitation Board**: 1-click status transitions (`Clean & Inspected`, `Cleaning In Progress`, `Needs Turnover`).
- **Maintenance Dispatch**: Log engineering work orders with severity tracking (Low, Medium, High/Urgent) and specialist assignments.

### 5. 🍽️ In-Room Dining & Concierge Services
- **Haute Cuisine Menu**: Breakfast & Brunch, A5 Miyazaki Wagyu, Breton Blue Lobster, Dom Pérignon Vintage, and private excursions.
- **Suite Room Service Folio**: Select in-house room, manage cart quantities, add special delivery instructions, and dispatch directly to room folio.

### 6. 📄 Guest Folio Invoicing & Revenue Analytics
- **Financial Analytics**: Gross revenue, Average Daily Rate (ADR), room charges vs. culinary/concierge revenue, and tax calculations.
- **Official Printable Folio**: Professional, print-ready guest invoices with hotel seal, itemized breakdown, tax computation, and payment status.

### 7. 🔐 Authentication & Access Control (Sign In & Sign Up)
- **Dedicated Portals**:
  - `#/signin`: Sign In page with email/password authentication, show/hide password, and "Remember me" session storage.
  - `#/signup`: Sign Up page supporting both **VIP Patron / Resident** accounts and **Hotel Associate / Staff** registrations with departmental assignment.
- **1-Click Instant Demo Accounts**:
  - 👑 **General Manager** (`admin@grandaurelia.com` / `admin123`)
  - 🛎️ **Front Desk Supervisor** (`frontdesk@grandaurelia.com` / `desk123`)
  - 💎 **Countess Sofia De Luca (Diamond VIP)** (`sofia.deluca@palazzoluxury.eu` / `patron123`)
  - 🌟 **Marcus Vance (Sapphire Club Member)** (`marcus.vance@techcorp.io` / `guest123`)
- **Interactive User Profile Dropdown**:
  - Shows logged-in user avatar, full name, role title, and quick links to personal folios, staff operations, or sign-out.
- **Forgot Password Modal**:
  - Built-in secure reset token dispatch simulation.

### 8. ⌨️ Global Command Palette (`Ctrl + K` / `Cmd + K`)
- Instant keyboard search across suites, patrons, booking IDs, authentication actions, and operations shortcuts.

---

## 🍃 MongoDB & Environment Configuration

The application includes a pre-configured [`.env`](file:///c:/giri/sno/.env) file and [`.env.example`](file:///c:/giri/sno/.env.example) template.

### Key Environment Variables:
- `MONGODB_URI`: Connection string for your MongoDB Atlas Cloud Cluster or local MongoDB instance (`mongodb://localhost:27017/grand_aurelia_hotel`).
- `MONGODB_DATABASE`: Target MongoDB database name (`grand_aurelia_hotel`).
- `PORT`: Backend server port (default: `5000`).
- `JWT_SECRET`: Secret token key used for user session and patron token verification.
- `VITE_API_BASE_URL`: API gateway endpoint for frontend communication.
- `VITE_MONGODB_DATABASE`: Database identifier exposed to the Vite frontend client.

---

## 🚀 Getting Started

```bash
# 1. Clone or navigate to the repository
cd sno

# 2. Review and configure environment variables
# (The .env file is already created for you. You can adjust the MONGODB_URI)

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎨 Design Philosophy
- **Luxury Midnight & Warm Champagne Gold** aesthetic with glassmorphism and subtle lighting.
- Seamless Dark Mode and Light Ivory Mode toggle.
- LocalStorage persistence for all bookings, rooms, and work orders.