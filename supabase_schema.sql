-- ==============================================================================
-- Aurelia Grand Resort & Spa — Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/srppcdpyrduuyumbtima/sql
-- ==============================================================================

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'patron',
  phone TEXT,
  avatar_url TEXT,
  membership_tier TEXT DEFAULT 'Aurelia Gold Patron',
  resort_credits NUMERIC DEFAULT 250,
  city TEXT DEFAULT 'Monaco',
  country TEXT DEFAULT 'French Riviera',
  dietary_preferences TEXT DEFAULT 'Gourmet / No Restrictions',
  special_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration helpers for existing databases
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS membership_tier TEXT DEFAULT 'Aurelia Gold Patron';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS resort_credits NUMERIC DEFAULT 250;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'Monaco';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'French Riviera';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS dietary_preferences TEXT DEFAULT 'Gourmet / No Restrictions';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS special_notes TEXT;

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view and update their own profile
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);


-- 2. Reservations Table (Hotel Suite Bookings)
CREATE TABLE IF NOT EXISTS public.reservations (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  room_name TEXT NOT NULL,
  room_category TEXT NOT NULL,
  price_per_night NUMERIC NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  guests INTEGER NOT NULL,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  special_requests TEXT,
  subtotal NUMERIC NOT NULL,
  tax NUMERIC NOT NULL,
  grand_total NUMERIC NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for reservations
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Allow guests to view, insert, and update reservations
CREATE POLICY "Anyone can create hotel reservations" 
ON public.reservations FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own reservations" 
ON public.reservations FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own reservations" 
ON public.reservations FOR UPDATE 
USING (true);

