import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const createSupabaseClient = () => createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Tipos para el dashboard
export interface DashboardStats {
  comercios: {
    total: number;
    activos: number;
    inactivos: number;
  };
  beneficios: {
    total: number;
    activos: number;
    redimidos: number;
  };
  eventos: {
    total: number;
    proximos: number;
    pasados: number;
  };
  articulos: {
    total: number;
    publicados: number;
    borradores: number;
    vistas: number;
  };
  usuarios: {
    total: number;
    nuevos_mes: number;
  };
}

export interface AdminComercio {
  id: string;
  name: string;
  direction: string | null;
  slug: string;
  category: string | null;
  tags: string[] | null;
  phone: string | null;
  owner_id: string | null;
  social_media: any;
  created_at: string;
  description: string | null;
  logo_url: string | null;
  banners_url: string[] | null;
  isActive: boolean;
  contact_email: string | null;
  web_url: string | null;
  schedules: any;
  // Información de la cuenta asociada
  owner?: {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
    last_sign_in_at: string | null;
    is_onboarding_complete: boolean | null;
  };
}

export interface AdminBenefit {
  id: string;
  business_id: string;
  title: string;
  description: string | null;
  type: "discount" | "multipromo";
  quantity: number;
  valid_from: string | null;
  valid_to: string | null;
  created_at: string;
  expires_at: string | null;
  comercio?: {
    name: string;
    logo_url: string | null;
  };
  redemptions_count?: number;
}

export interface AdminEvent {
  id: string;
  business_id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  created_at: string;
  comercio?: {
    name: string;
    logo_url: string | null;
  };
}

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string | null;
  author_name: string | null;
  category: string;
  tags: string[];
  featured_image_url: string | null;
  video_url: string | null;
  is_premium: boolean;
  is_published: boolean;
  is_featured: boolean;
  read_time: number | null;
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const adminService = {
  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    const supabase = createSupabaseClient();
    
    try {
      // Comercios
      const { count: comerciosTotal } = await supabase
        .from('comercios')
        .select('*', { count: 'exact', head: true });

      // Beneficios
      const { count: beneficiosTotal } = await supabase
        .from('benefits')
        .select('*', { count: 'exact', head: true });

      const { count: beneficiosActivos } = await supabase
        .from('benefits')
        .select('*', { count: 'exact', head: true })
        .gte('valid_to', new Date().toISOString());

      // Eventos
      const { count: eventosTotal } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      const { count: eventosProximos } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .gte('date', new Date().toISOString().split('T')[0]);

      // Artículos (usando datos mock por ahora)
      const articulosTotal = 0;
      const articulosPublicados = 0;

      // Usuarios
      const { count: usuariosTotal } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Redenciones de beneficios
      const { count: redenciones } = await supabase
        .from('benefit_redemptions')
        .select('*', { count: 'exact', head: true });

      // Vistas de artículos (usando datos mock por ahora)
      const totalVistas = 0;

      return {
        comercios: {
          total: comerciosTotal || 0,
          activos: comerciosTotal || 0, // Asumiendo que todos están activos por ahora
          inactivos: 0
        },
        beneficios: {
          total: beneficiosTotal || 0,
          activos: beneficiosActivos || 0,
          redimidos: redenciones || 0
        },
        eventos: {
          total: eventosTotal || 0,
          proximos: eventosProximos || 0,
          pasados: (eventosTotal || 0) - (eventosProximos || 0)
        },
        articulos: {
          total: articulosTotal || 0,
          publicados: articulosPublicados || 0,
          borradores: (articulosTotal || 0) - (articulosPublicados || 0),
          vistas: totalVistas
        },
        usuarios: {
          total: usuariosTotal || 0,
          nuevos_mes: 0 // TODO: Implementar lógica de nuevos usuarios del mes
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Comercios
  async getComercios(filters?: {
    search?: string;
    category?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const supabase = createSupabaseClient();
    
    let query = supabase
      .from('comercios')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data?.map(comercio => ({
      ...comercio,
      isActive: true, // Por ahora todos están activos
      owner: undefined, // Por ahora no incluimos la información del propietario
      description: null,
      logo_url: null,
      banners_url: null,
      contact_email: null,
      web_url: null,
      schedules: null
    })) as AdminComercio[];
  },

  async createComercio(data: Partial<AdminComercio>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('comercios')
      .insert({
        name: data.name!,
        direction: data.direction,
        slug: data.slug!,
        category: data.category,
        tags: data.tags || [],
        phone: data.phone,
        owner_id: data.owner_id,
        social_media: data.social_media || {},
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateComercio(id: string, data: Partial<AdminComercio>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('comercios')
      .update({
        name: data.name,
        direction: data.direction,
        slug: data.slug,
        category: data.category,
        tags: data.tags || [],
        phone: data.phone,
        social_media: data.social_media,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async deleteComercio(id: string) {
    const supabase = createSupabaseClient();
    
    const { error } = await supabase
      .from('comercios')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Beneficios
  async getBenefits(filters?: {
    search?: string;
    type?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const supabase = createSupabaseClient();
    
    let query = supabase
      .from('benefits')
      .select(`
        *
      `)
      .order('created_at', { ascending: false });

    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    if (filters?.type) {
      query = query.eq('type', filters.type as "discount" | "multipromo");
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Obtener conteo de redenciones
    const benefitsWithRedemptions = await Promise.all(
      (data || []).map(async (benefit) => {
        const { count: redemptions } = await supabase
          .from('benefit_redemptions')
          .select('*', { count: 'exact', head: true })
          .eq('benefit_id', benefit.id);

        return {
          ...benefit,
          comercio: undefined, // Por ahora no incluimos la información del comercio
          redemptions_count: redemptions || 0,
          isActive: true // Por ahora todos están activos
        };
      })
    );

    return benefitsWithRedemptions as AdminBenefit[];
  },

  async createBenefit(data: Partial<AdminBenefit>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('benefits')
      .insert({
        business_id: data.business_id!,
        title: data.title!,
        description: data.description,
        type: data.type as "coupon" | "giveaway",
        quantity: data.quantity || 0,
        valid_from: data.valid_from,
        valid_to: data.valid_to,
        expires_at: data.expires_at,
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateBenefit(id: string, data: Partial<AdminBenefit>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('benefits')
      .update({
        title: data.title,
        description: data.description,
        type: data.type as "coupon" | "giveaway",
        quantity: data.quantity,
        valid_from: data.valid_from,
        valid_to: data.valid_to,
        expires_at: data.expires_at,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async deleteBenefit(id: string) {
    const supabase = createSupabaseClient();
    
    const { error } = await supabase
      .from('benefits')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Eventos
  async getEvents(filters?: {
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
    offset?: number;
  }) {
    const supabase = createSupabaseClient();
    
    let query = supabase
      .from('events')
      .select(`*`)
      .order('date', { ascending: true });

    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    if (filters?.dateFrom) {
      query = query.gte('date', filters.dateFrom);
    }

    if (filters?.dateTo) {
      query = query.lte('date', filters.dateTo);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data?.map(event => ({
      ...event,
      comercio: undefined // Por ahora no incluimos la información del comercio
    })) as AdminEvent[];
  },

  async createEvent(data: Partial<AdminEvent>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('events')
      .insert({
        business_id: data.business_id!,
        title: data.title!,
        description: data.description,
        date: data.date!,
        location: data.location,
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateEvent(id: string, data: Partial<AdminEvent>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('events')
      .update({
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async deleteEvent(id: string) {
    const supabase = createSupabaseClient();
    
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Artículos (temporalmente deshabilitado hasta que se cree la tabla)
  async getArticles(filters?: {
    search?: string;
    category?: string;
    isPublished?: boolean;
    limit?: number;
    offset?: number;
  }) {
    // Mock data hasta que se implemente la tabla articles
    return [] as AdminArticle[];
  },

  async createArticle(data: Partial<AdminArticle>) {
    throw new Error('Función no implementada - tabla articles no existe');
  },

  async updateArticle(id: string, data: Partial<AdminArticle>) {
    throw new Error('Función no implementada - tabla articles no existe');
  },

  async deleteArticle(id: string) {
    throw new Error('Función no implementada - tabla articles no existe');
  },

  async publishArticle(id: string) {
    throw new Error('Función no implementada - tabla articles no existe');
  }
};
