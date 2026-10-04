-- ==============================================================================
-- Grand Aurelia Resort & Suites — Supabase Database Schema
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. PROFILES TABLE (Normal Users / VIP Patrons & Preferences)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  membership_tier TEXT DEFAULT 'Diamond Imperial',
  role_title TEXT DEFAULT 'Diamond Imperial VIP',
  points_balance INTEGER DEFAULT 18450,
  address TEXT,
  active_room TEXT,
  preferences JSONB DEFAULT '{
    "pillowType": "Hypoallergenic Goose Down",
    "roomTemp": "20.5°C",
    "welcomeBeverage": "Dom Pérignon Vintage Rosé",
    "turndownTime": "20:30",
    "dietary": "Organic Plant-Based & Fine Caviar",
    "newspaper": "Financial Times & Architectural Digest",
    "fragrancePreference": "Calabrian Bergamot & Amber",
    "dnd": false
  }'::jsonb,
  digital_key JSONB DEFAULT '{
    "status": "active",
    "keycardCode": "GA-RFID-401-ULTRA",
    "roomNumber": "401",
    "wifiCode": "AureliaVIP401!Penthouse"
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROOMS TABLE (Suites, Villas & Penthouse Inventory)
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  number TEXT UNIQUE NOT NULL,
  floor INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'deluxe', 'suite', 'penthouse', 'villa'
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  size INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  bed_type TEXT NOT NULL,
  view TEXT NOT NULL,
  status TEXT DEFAULT 'available', -- 'available', 'occupied', 'cleaning', 'reserved'
  clean_status TEXT DEFAULT 'clean', -- 'clean', 'needs_cleaning', 'in_progress', 'inspected'
  image TEXT,
  gallery TEXT[],
  rating NUMERIC DEFAULT 4.9,
  reviews INTEGER DEFAULT 50,
  description TEXT,
  amenities TEXT[],
  current_guest JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RESERVATIONS TABLE (Guest Stays, Folios & Bookings)
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  room_number TEXT NOT NULL,
  room_name TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  rate_per_night NUMERIC NOT NULL,
  room_total NUMERIC NOT NULL,
  taxes NUMERIC NOT NULL,
  add_ons_total NUMERIC DEFAULT 0,
  grand_total NUMERIC NOT NULL,
  paid_amount NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'paid', -- 'paid', 'pending', 'refunded'
  status TEXT DEFAULT 'checked_in', -- 'confirmed', 'checked_in', 'checked_out', 'cancelled'
  special_requests TEXT,
  add_ons JSONB DEFAULT '[]'::jsonb,
  room_service_charges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONCIERGE & GUEST SERVICE REQUESTS
CREATE TABLE IF NOT EXISTS public.concierge_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  request_type TEXT NOT NULL, -- 'valet', 'linens', 'amenities', 'champagne', 'bellhop', 'dining'
  details TEXT,
  status TEXT DEFAULT 'dispatched', -- 'dispatched', 'in_progress', 'completed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MAINTENANCE & HOUSEKEEPING LOGS
CREATE TABLE IF NOT EXISTS public.maintenance_logs (
  id TEXT PRIMARY KEY,
  room_number TEXT NOT NULL,
  issue TEXT NOT NULL,
  severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  reported_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'resolved'
  assigned_to TEXT
);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concierge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;

-- Allow read access for public / anon client
CREATE POLICY "Allow public read access to rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public read access to profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public update access to profiles" ON public.profiles FOR UPDATE USING (true);
CREATE POLICY "Allow public insert to reservations" ON public.reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to reservations" ON public.reservations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to concierge_requests" ON public.concierge_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on concierge_requests" ON public.concierge_requests FOR SELECT USING (true);

-- Seed Initial Normal User Profile (Countess Sofia De Luca)
INSERT INTO public.profiles (
  id, name, email, phone, avatar_url, membership_tier, role_title, points_balance, address, active_room
) VALUES (
  'usr-03',
  'Countess Sofia De Luca',
  'sofia.deluca@palazzoluxury.eu',
  '+39 06 698 12345',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  'Diamond Imperial',
  'Diamond Imperial VIP',
  18450,
  'Palazzo di San Marco, Via Condotti 18, Rome, Italy',
  '401'
) ON CONFLICT (id) DO NOTHING;
