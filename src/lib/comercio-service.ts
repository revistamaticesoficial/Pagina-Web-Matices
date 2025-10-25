import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Comercio = Database['public']['Tables']['comercios']['Row'];
type Benefit = Database['public']['Tables']['benefits']['Row'];

// Cliente de Supabase para SSR
const createSupabaseClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export const comercioService = {
  /**
   * Obtener todos los comercios públicos con paginación
   */
  async getAllComercios(options: {
    limit?: number;
    offset?: number;
    category?: string;
    search?: string;
  } = {}): Promise<{
    comercios: Comercio[];
    total: number;
    hasMore: boolean;
  }> {
    const supabase = createSupabaseClient();
    const { limit = 24, offset = 0, category, search } = options;

    let query = supabase
      .from('comercios')
      .select('*', { count: 'exact' })
      .not('slug', 'is', null)
      .not('slug', 'eq', '')
      .not('name', 'is', null)
      .not('name', 'eq', '')
      .order('created_at', { ascending: false });

    // Filtrar por categoría si se especifica
    if (category) {
      query = query.eq('category', category);
    }

    // Buscar por nombre o descripción si se especifica
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Aplicar paginación
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching comercios:', error);
      return { comercios: [], total: 0, hasMore: false };
    }

    return {
      comercios: data || [],
      total: count || 0,
      hasMore: (offset + limit) < (count || 0)
    };
  },

  /**
   * Obtener comercio por slug con sus beneficios
   */
  async getComercioBySlug(slug: string): Promise<{
    comercio: Comercio | null;
    benefits: Benefit[];
  }> {
    const supabase = createSupabaseClient();

    // Consulta optimizada con JOIN para obtener comercio y beneficios
    const { data: comercio, error: comercioError } = await supabase
      .from('comercios')
      .select(`id`)
      .eq('slug', slug)
      .maybeSingle();

      if (comercioError) {
        console.error('Error cargando comercio:', comercioError);
        return { comercio: null, benefits: [] };
      }

    const { data: benefits, error: benefitsError } = await supabase
      .from('benefits')
      .select('*')
      .eq('comercio_id', comercio?.id)
      .eq('is_active', true);
      
    if (benefitsError) {
      console.error('Error cargando beneficios:', benefitsError);
      return { comercio: null, benefits: [] };
    }


    return {
      comercio,
      benefits,
    };
  },

  /**
   * Obtener comercio por ID
   */
  async getComercioById(id: string): Promise<Comercio | null> {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('comercios')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error cargando comercio por ID:', error);
      return null;
    }

    return data;
  },

  /**
   * Buscar comercios por término de búsqueda
   */
  async searchComercios(searchTerm: string, limit = 12): Promise<Comercio[]> {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('comercios')
      .select(`
        id,
        name,
        slug,
        category,
        direction,
        phone,
        created_at,
        logo_url,
        banners_url,
        tags,
        description
      `)
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .eq('is_active', true)
      .not('slug', 'is', null)
      .not('slug', 'eq', '')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error buscando comercios:', error);
      return [];
    }

    return data || [];
  },

  /**
   * Obtener comercios por categoría
   */
  async getComerciosByCategory(category: string, limit = 24): Promise<Comercio[]> {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('comercios')
      .select(`
        id,
        name,
        slug,
        category,
        direction,
        phone,
        created_at,
        logo_url,
        banners_url,
        tags,
        description
      `)
      .eq('category', category)
      .eq('is_active', true)
      .not('slug', 'is', null)
      .not('slug', 'eq', '')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error cargando comercios por categoría:', error);
      return [];
    }

    return data || [];
  },

  /**
   * Obtener comercios destacados
   */
  async getFeaturedComercios(limit = 6): Promise<Comercio[]> {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('comercios')
      .select(`
        id,
        name,
        slug,
        category,
        direction,
        phone,
        created_at,
        logo_url,
        banners_url,
        tags,
        description
      `)
      .eq('is_active', true)
      .eq('is_featured', true)
      .not('slug', 'is', null)
      .not('slug', 'eq', '')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error cargando comercios destacados:', error);
      return [];
    }

    return data || [];
  },

  /**
   * Obtener categorías disponibles
   */
  async getCategories(): Promise<string[]> {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('comercios')
      .select('category')
      .eq('is_active', true)
      .not('category', 'is', null);

    if (error) {
      console.error('Error cargando categorías:', error);
      return [];
    }

    // Obtener categorías únicas
    const categories = [...new Set(data?.map(item => item.category).filter(Boolean))];
    return categories.sort();
  }
};
