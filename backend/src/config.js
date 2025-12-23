export function loadConfig() {
  const {
    PORT,
    CORS_ORIGIN,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY,
  } = process.env;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[config] SUPABASE_URL or SUPABASE_ANON_KEY not set. Supabase client will not be fully functional until you configure these.');
  }

  return {
    port: PORT || 4000,
    corsOrigin: CORS_ORIGIN || '*',
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
    supabaseServiceRoleKey: SUPABASE_SERVICE_ROLE_KEY,
  };
}
