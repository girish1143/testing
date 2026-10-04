import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-public-key')
  );
};

// Safe dummy client if keys aren't configured yet
const dummyClient = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  }),
  auth: {
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : dummyClient;

// ==========================================
// Authentication Services
// ==========================================

export async function authSignUp({ email, password, fullName }) {
  if (!isSupabaseConfigured()) {
    // Local session simulation for testing
    const mockUser = {
      id: `usr-${Date.now()}`,
      name: fullName,
      email,
      role: 'guest',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('hotel_auth_user', JSON.stringify(mockUser));
    return { user: mockUser, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });

  if (error) return { user: null, error };

  const userObj = {
    id: data.user.id,
    name: fullName,
    email: data.user.email,
    role: 'guest'
  };

  // Upsert profile in Supabase
  try {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      name: fullName,
      email,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.warn('[Supabase] profile upsert warning:', err);
  }

  localStorage.setItem('hotel_auth_user', JSON.stringify(userObj));
  return { user: userObj, error: null };
}

export async function authSignIn({ email, password }) {
  if (!isSupabaseConfigured()) {
    // Local session simulation for testing
    const stored = localStorage.getItem('hotel_auth_user');
    const existing = stored ? JSON.parse(stored) : null;
    const name = existing?.email === email ? existing.name : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const user = {
      id: existing?.id || `usr-${Date.now()}`,
      name: name || 'Valued Guest',
      email,
      role: 'guest'
    };
    localStorage.setItem('hotel_auth_user', JSON.stringify(user));
    return { user, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return { user: null, error };

  const userObj = {
    id: data.user.id,
    name: data.user.user_metadata?.full_name || email.split('@')[0],
    email: data.user.email,
    role: 'guest'
  };

  localStorage.setItem('hotel_auth_user', JSON.stringify(userObj));
  return { user: userObj, error: null };
}

export async function authSignOut() {
  localStorage.removeItem('hotel_auth_user');
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('hotel_auth_user');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing stored user', e);
  }
  return null;
}

// ==========================================
// Booking Services
// ==========================================

export async function createHotelBooking(bookingData) {
  const localBookings = getHotelBookings();
  const newBooking = {
    id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
    ...bookingData,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };

  const updated = [newBooking, ...localBookings];
  localStorage.setItem('hotel_bookings_v2', JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('reservations').insert([newBooking]);
    } catch (err) {
      console.warn('[Supabase] booking insert warning:', err);
    }
  }

  return newBooking;
}

export function getHotelBookings() {
  try {
    const raw = localStorage.getItem('hotel_bookings_v2');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing stored bookings', e);
  }
  return [];
}
