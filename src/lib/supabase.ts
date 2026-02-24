import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Verificamos que las variables no sean las de ejemplo o estén vacías antes de inicializar
const isValidConfig = supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey && supabaseAnonKey !== 'tu_anon_key_aqui'

export const supabase = isValidConfig
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any) // Retornamos null si no está configurado, para que los componentes puedan manejarlo
