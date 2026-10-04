# 🏨 Aurelia Grand Resort & Spa — Hotel Booking System

A focused, luxury Hotel Booking Web Application built with **React 19**, **Vite**, **Vanilla CSS**, and **Supabase (PostgreSQL & Realtime)**.

---

## 📑 Core 3-Page Architecture

This streamlined system consists strictly of 3 core pages:

### 1. 🌴 Home Page (`#/`)
- **Luxury Hero Sanctuary**:
  - Immersive oceanfront aesthetics with ambient gold glow.
  - Interactive search bar to filter by check-in, check-out, and guest counts.
- **Suites & Villas Inventory Showcase**:
  - Filter residences by category (*Deluxe Suites*, *Private Villas*, *Presidential Penthouses*).
  - High-definition suite photography, square footage, views, ratings, and amenity badges.
  - **Instant Suite Booking**: Opens the real-time booking modal to calculate nights, taxes, and record reservations into Supabase / local storage.
- **Curated Resort Experiences**:
  - Infinity Lagoon Pool, Michelin-starred dining, Aura Holistic Spa, and 24/7 private concierge.
- **Patron Privileges CTA**:
  - Direct invitation to register or sign in for preferential rates.

### 2. 🔐 Login Page (`#/login`)
- Traditional **Email** and **Password** authentication.
- Show/hide password visibility toggle.
- Input validation and humanized error handling.
- Powered by Supabase Auth with safe local fallback if credentials are pending in `.env`.
- 1-click switch to the Sign Up page or return to Home.

### 3. 📝 Sign Up Page (`#/signup`)
- Traditional registration fields:
  - **Full Name**
  - **Email Address**
  - **Password** (min. 8 characters)
  - **Confirm Password** (real-time mismatch validation)
- Automatically establishes patron profile in Supabase `profiles` table.
- 1-click switch to Login page or return to Home.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS (Tailored HSL midnight obsidian & gold luxury palette)
- **Icons**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL, Realtime, & Auth)

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Supabase (Optional for live cloud)
In `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start local development server
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.