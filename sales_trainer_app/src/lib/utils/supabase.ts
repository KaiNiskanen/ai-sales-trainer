import { createClient } from '@supabase/supabase-js'

// Our sacred door to the storage facility - using secure service key
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)
