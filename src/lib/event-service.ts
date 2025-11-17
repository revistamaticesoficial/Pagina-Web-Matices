import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Event = Database['public']['Tables']['events']['Row'];

// Cliente de Supabase para SSR
const createSupabaseClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export const eventService = {
  /**
   * Obtener evento por ID
   */
  async getEventById(id: string): Promise<Event | null> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Error cargando evento por ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getEventById:', error);
      return null;
    }
  },
};

