import { createClient } from '@supabase/supabase-js'
import { getRequiredEnv } from './env'
import type { Database } from './types'

const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
