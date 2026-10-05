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

// Safe fallback client when Supabase cloud is not yet configured
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
  },
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : dummyClient;

// ==========================================
// Authentication Backend Operations
// ==========================================

export async function authSignUp({ email, password, fullName }) {
  if (!isSupabaseConfigured()) {
    // Local Session Persistence
    const mockUser = {
      id: `usr-${Date.now()}`,
      name: fullName,
      email,
      role: 'patron',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('aurelia_current_user', JSON.stringify(mockUser));
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
    role: 'patron'
  };

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

  localStorage.setItem('aurelia_current_user', JSON.stringify(userObj));
  return { user: userObj, error: null };
}

export async function authSignIn({ email, password }) {
  if (!isSupabaseConfigured()) {
    // Local Session Persistence
    const stored = localStorage.getItem('aurelia_current_user');
    const existing = stored ? JSON.parse(stored) : null;
    const name = existing?.email === email ? existing.name : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const user = {
      id: existing?.id || `usr-${Date.now()}`,
      name: name || 'Valued Patron',
      email,
      role: 'patron'
    };
    localStorage.setItem('aurelia_current_user', JSON.stringify(user));
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
    role: 'patron'
  };

  localStorage.setItem('aurelia_current_user', JSON.stringify(userObj));
  return { user: userObj, error: null };
}

export async function authSignOut() {
  localStorage.removeItem('aurelia_current_user');
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('aurelia_current_user');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing stored user', e);
  }
  return null;
}

// ==========================================
// User Profile Backend Operations
// ==========================================

export async function getUserProfile(userId, fallbackUser = null) {
  let profile = {
    id: userId || fallbackUser?.id || `usr-${Date.now()}`,
    name: fallbackUser?.name || 'Valued Patron',
    email: fallbackUser?.email || '',
    phone: '+33 4 93 38 12 00',
    avatar: 'crown', // crown | diamond | sparkles | gem | sun | shield
    role: fallbackUser?.role || 'patron',
    membershipTier: 'Aurelia Gold Patron',
    resortCredits: 250,
    loyaltyPoints: 1250,
    city: 'Monte Carlo',
    country: 'Monaco',
    dietaryPreferences: 'Gourmet / No Dietary Restrictions',
    roomPreferences: 'High Floor, Oceanfront Balcony, Feather Pillows',
    specialNotes: 'Prefers chilled Veuve Clicquot champagne upon suite arrival.',
    createdAt: fallbackUser?.createdAt || new Date(Date.now() - 86400000 * 30).toISOString()
  };

  // Check local cache first
  try {
    const cached = localStorage.getItem(`aurelia_profile_${userId}`);
    if (cached) {
      profile = { ...profile, ...JSON.parse(cached) };
    }
  } catch (e) {
    console.warn('Error reading cached profile', e);
  }

  // Attempt live Supabase fetch
  if (isSupabaseConfigured() && userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        profile = {
          ...profile,
          id: data.id,
          name: data.name || profile.name,
          email: data.email || profile.email,
          phone: data.phone || profile.phone,
          avatar: data.avatar_url || profile.avatar,
          role: data.role || profile.role,
          membershipTier: data.membership_tier || profile.membershipTier,
          resortCredits: data.resort_credits !== undefined && data.resort_credits !== null ? Number(data.resort_credits) : profile.resortCredits,
          city: data.city || profile.city,
          country: data.country || profile.country,
          dietaryPreferences: data.dietary_preferences || profile.dietaryPreferences,
          specialNotes: data.special_notes || profile.specialNotes,
          createdAt: data.created_at || profile.createdAt
        };
        // Update local cache with Supabase data
        localStorage.setItem(`aurelia_profile_${userId}`, JSON.stringify(profile));
      }
    } catch (err) {
      console.warn('[Supabase] Profile fetch error, using local fallback:', err);
    }
  }

  return profile;
}

export async function updateUserProfile(userId, updatedFields) {
  // Update local user session if name or email changed
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const updatedUser = {
      ...currentUser,
      name: updatedFields.name || currentUser.name,
      email: updatedFields.email || currentUser.email
    };
    localStorage.setItem('aurelia_current_user', JSON.stringify(updatedUser));
  }

  // Retrieve current cached profile and merge
  const currentProfile = await getUserProfile(userId, currentUser);
  const newProfile = {
    ...currentProfile,
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(`aurelia_profile_${userId}`, JSON.stringify(newProfile));

  // Sync to Supabase DB if configured
  if (isSupabaseConfigured() && userId) {
    try {
      const payload = {
        id: userId,
        name: newProfile.name,
        email: newProfile.email,
        phone: newProfile.phone,
        avatar_url: newProfile.avatar,
        membership_tier: newProfile.membershipTier,
        resort_credits: newProfile.resortCredits,
        city: newProfile.city,
        country: newProfile.country,
        dietary_preferences: newProfile.dietaryPreferences,
        special_notes: newProfile.specialNotes,
        updated_at: new Date().toISOString()
      };

      await supabase.from('profiles').upsert(payload);

      // Also sync user metadata if name changed
      if (updatedFields.name) {
        await supabase.auth.updateUser({
          data: { full_name: updatedFields.name }
        });
      }
    } catch (err) {
      console.warn('[Supabase] Profile update warning:', err);
    }
  }

  return newProfile;
}

export async function updateUserPassword(newPassword) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
  }
  return { success: true };
}

// ==========================================
// Hotel Booking & Folio Services
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
  localStorage.setItem('aurelia_hotel_bookings', JSON.stringify(updated));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('reservations').insert([
        {
          id: newBooking.id,
          room_id: bookingData.roomId || bookingData.room_id,
          room_name: bookingData.roomName || bookingData.room_name,
          room_category: bookingData.roomCategory || bookingData.room_category,
          price_per_night: bookingData.pricePerNight || bookingData.price_per_night,
          check_in: bookingData.checkIn || bookingData.check_in,
          check_out: bookingData.checkOut || bookingData.check_out,
          nights: bookingData.nights,
          guests: bookingData.guests,
          guest_name: bookingData.guestName || bookingData.guest_name,
          email: bookingData.email,
          special_requests: bookingData.specialRequests || bookingData.special_requests || '',
          subtotal: bookingData.subtotal,
          tax: bookingData.tax,
          grand_total: bookingData.grandTotal || bookingData.grand_total,
          status: 'confirmed'
        }
      ]);
    } catch (err) {
      console.warn('[Supabase] booking insert warning:', err);
    }
  }

  return newBooking;
}

export async function getUserReservations(userEmail) {
  const localList = getHotelBookings().filter(
    (b) => !userEmail || (b.email && b.email.toLowerCase() === userEmail.toLowerCase())
  );

  let combined = [...localList];

  if (isSupabaseConfigured() && userEmail) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        const mappedRemote = data.map((row) => ({
          id: row.id,
          roomId: row.room_id,
          roomName: row.room_name,
          roomCategory: row.room_category,
          pricePerNight: Number(row.price_per_night),
          checkIn: row.check_in,
          checkOut: row.check_out,
          nights: row.nights,
          guests: row.guests,
          guestName: row.guest_name,
          email: row.email,
          specialRequests: row.special_requests,
          subtotal: Number(row.subtotal),
          tax: Number(row.tax),
          grandTotal: Number(row.grand_total),
          status: row.status || 'confirmed',
          createdAt: row.created_at
        }));

        // Merge without duplicates by ID
        const existingIds = new Set(combined.map((b) => b.id));
        for (const r of mappedRemote) {
          if (!existingIds.has(r.id)) {
            combined.push(r);
            existingIds.add(r.id);
          }
        }
      }
    } catch (err) {
      console.warn('[Supabase] reservations fetch warning:', err);
    }
  }

  // Sort by date descending
  return combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

export async function cancelHotelReservation(reservationId) {
  // Update local storage
  const allBookings = getHotelBookings();
  const updatedBookings = allBookings.map((b) =>
    b.id === reservationId ? { ...b, status: 'cancelled' } : b
  );
  localStorage.setItem('aurelia_hotel_bookings', JSON.stringify(updatedBookings));

  // Update Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', reservationId);
    } catch (err) {
      console.warn('[Supabase] cancel reservation warning:', err);
    }
  }

  return true;
}

export function getHotelBookings() {
  try {
    const raw = localStorage.getItem('aurelia_hotel_bookings');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing stored bookings', e);
  }
  return [];
}

