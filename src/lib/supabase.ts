import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
  
  if (!data) {
    throw new Error('Profile not found');
  }
  
  return data;
}

// Helper function to get user business from comercios table
export const getUserBusiness = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('comercios')
      .select(`
        *,
        comercio_schedules(*)
      `)
      .eq('owner_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      console.warn('Error fetching business data:', error);
      return null; // Return null instead of throwing
    }
    return data
  } catch (error) {
    console.warn('Error in getUserBusiness:', error);
    return null; // Return null instead of throwing
  }
}

