import 'server-only'

import { createClient } from '@supabase/supabase-js'
import { getRequiredEnv } from './env'
import type { Database } from './types'

export function getSupabaseAdmin() {
  const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY')

  return createClient<Database>(supabaseUrl, serviceRoleKey)
}
