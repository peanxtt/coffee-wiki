import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Placeholder - these will be set via environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side admin client (to be used in API routes or server actions)
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  return createClient<Database>(supabaseUrl, serviceRoleKey)
}
