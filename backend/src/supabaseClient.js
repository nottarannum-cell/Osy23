import { createClient } from '@supabase/supabase-js';
import { loadConfig } from './config.js';

const config = loadConfig();

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  console.warn('[supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY. Set them in your .env file.');
}

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// Example helper: get current time from the database (if you create a function or table later)
export async function exampleQuery() {
  const { data, error } = await supabase.rpc('now');
  if (error) throw error;
  return data;
}
