/**
 * Supabase Database & Cloud Storage Configuration
 * Grand Aurelia Resort & Suites
 * Replaces MongoDB with Supabase PostgreSQL & Realtime engine.
 */

import { supabase, isSupabaseConfigured, SUPABASE_CONFIG } from './supabaseClient';

export const DB_CONFIG = {
  engine: 'Supabase (PostgreSQL & Realtime)',
  url: SUPABASE_CONFIG.url,
  projectId: SUPABASE_CONFIG.projectId,
  isConfigured: isSupabaseConfigured(),
  enableFallback: import.meta.env?.VITE_ENABLE_STORAGE_FALLBACK !== 'false',
  hotelName: import.meta.env?.VITE_APP_NAME || 'Grand Aurelia Resort & Suites',
};

export { supabase, isSupabaseConfigured, SUPABASE_CONFIG };
export default DB_CONFIG;
