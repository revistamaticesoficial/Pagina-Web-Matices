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
  banner_url: string | null;
  flag: string | null;
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
  time: string;
  location: string | null;
  place: string | null;
  direction: string | null;
  open_time: string | null;
  close_time: string | null;
  created_at: string;
  banner_url: string | null;
  comercio?: {
    name: string;
    logo_url: string | null;
  };
}

export interface AdminEdition {
  id: string;
  title: string;
  month: string;
  year: number;
  image: string | null;
  filename: string | null;
  pdf_url: string | null;
  flipbook_url: string | null;
  position: number;
  created_at: string;
  updated_at: string;
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

export interface AdminAnnouncements {
  id: string;
  title: string;
  image_url: string;
  alt_text: string | null;
  click_url: string | null;
  is_active: boolean;
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
    
    // Transformar el resultado para que coincida con AdminComercio
    return {
      ...result,
      isActive: true, // Por ahora todos están activos
      owner: undefined, // Por ahora no incluimos la información del propietario
      description: null,
      logo_url: null,
      banners_url: null,
      contact_email: null,
      web_url: null,
      schedules: null
    } as AdminComercio;
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
    
    // Transformar el resultado para que coincida con AdminComercio
    return {
      ...result,
      isActive: true, // Por ahora todos están activos
      owner: undefined, // Por ahora no incluimos la información del propietario
      description: null,
      logo_url: null,
      banners_url: null,
      contact_email: null,
      web_url: null,
      schedules: null
    } as AdminComercio;
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

    // Obtener IDs de beneficios para buscar redenciones en lote
    const benefitIds = (data || []).map(b => b.id);
    
    // Obtener conteo de redenciones en una sola query usando supabase RPC o agregación
    const redemptionsMap: Record<string, number> = {};
    
    if (benefitIds.length > 0) {
      try {
        // Intentar obtener redenciones agrupadas por benefit_id
        const { data: redemptionsData, error: redemptionsError } = await supabase
          .from('benefit_redemptions')
          .select('benefit_id')
          .in('benefit_id', benefitIds);

        if (!redemptionsError && redemptionsData) {
          // Contar redenciones por benefit_id, ignorando nulos
          (redemptionsData as { benefit_id: string | null }[]).forEach(({ benefit_id }) => {
            if (!benefit_id) return;
            redemptionsMap[benefit_id] = (redemptionsMap[benefit_id] || 0) + 1;
          });
        }
      } catch (err) {
        console.error('Error loading redemptions:', err);
        // Si falla, continuamos sin los conteos
      }
    }

    // Combinar beneficios con conteos de redenciones
    const benefitsWithRedemptions = (data || []).map(benefit => ({
      ...benefit,
      comercio: undefined,
      redemptions_count: redemptionsMap[benefit.id] || 0,
      isActive: true
    }));

    return benefitsWithRedemptions as AdminBenefit[];
  },

  async createBenefit(data: Partial<AdminBenefit>) {
    const supabase = createSupabaseClient();
    
    // Obtener el usuario autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Usuario no autenticado');
    }

    // Obtener el primer comercio del usuario y usar su ID como business_id
    // Nota: En la práctica, business_id puede referirse al ID de comercios
    let businessId = data.business_id;
    if (!businessId) {
      const { data: comercio, error: comercioError } = await supabase
        .from('comercios')
        .select('id')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (comercioError || !comercio) {
        throw new Error('No se encontró un comercio asociado. Crea un comercio primero en la sección de gestión.');
      }
      businessId = comercio.id;
    }

    // Usar tipos tal como están en la base: 'discount' | 'multipromo'
    const normalizedType = (data.type === 'multipromo' || data.type === 'discount')
      ? data.type
      : 'discount';

    const normalizedFlag = data.flag?.trim()
      ? data.flag.trim().toUpperCase().slice(0, 4)
      : null;

    // Construir el objeto de inserción de forma condicional
    const insertData: any = {
      banner_url: data.banner_url && data.banner_url.trim() !== '' ? data.banner_url : '',
      title: data.title!,
      description: data.description,
      type: normalizedType,
      quantity: data.quantity || 0,
      valid_from: data.valid_from,
      valid_to: data.valid_to,
      expires_at: data.expires_at || data.valid_to || null,
    };

    insertData.flag = normalizedFlag;

    // Solo incluir business_id si existe la columna (se intentará insertar, si falla será por RLS u otro motivo)
    if (businessId) {
      insertData.business_id = businessId;
    }

    const { data: result, error } = await supabase
      .from('benefits')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateBenefit(id: string, data: Partial<AdminBenefit>) {
    const supabase = createSupabaseClient();
    
    // Usar tipos tal como están en la base: 'discount' | 'multipromo'
    const normalizedType = data.type && (data.type === 'multipromo' || data.type === 'discount')
      ? data.type
      : undefined;
    
    const normalizedFlag = data.flag === undefined
      ? undefined
      : (data.flag?.trim() ? data.flag.trim().toUpperCase().slice(0, 4) : null);

    const updateData: any = {
      title: data.title,
      description: data.description,
      quantity: data.quantity,
      valid_from: data.valid_from,
      valid_to: data.valid_to,
      expires_at: data.expires_at,
    };
    
    // Incluir banner_url solo si se proporciona (permite actualizar o limpiar la imagen)
    if (data.banner_url !== undefined) {
      updateData.banner_url = data.banner_url && data.banner_url.trim() !== '' ? data.banner_url : '';
    }
    
    if (normalizedType !== undefined) {
      updateData.type = normalizedType;
    }

    if (normalizedFlag !== undefined) {
      updateData.flag = normalizedFlag;
    }

    const { data: result, error } = await supabase
      .from('benefits')
      .update(updateData)
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
    
    // Obtener el usuario autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Usuario no autenticado');
    }

    // Obtener el primer comercio del usuario y usar su ID como business_id
    // Nota: En la práctica, business_id puede referirse al ID de comercios
    let businessId = data.business_id;
    if (!businessId) {
      const { data: comercio, error: comercioError } = await supabase
        .from('comercios')
        .select('id')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (comercioError || !comercio) {
        throw new Error('No se encontró un comercio asociado. Crea un comercio primero en la sección de gestión.');
      }
      businessId = comercio.id;
    }

    // Construir el objeto de inserción de forma condicional
    const insertData: any = {
      business_id: businessId,
      title: data.title!,
      description: data.description || null,
      date: data.date!,
      time: data.time || "18:00", // Valor por defecto si no se proporciona
      banner_url: data.banner_url && data.banner_url.trim() !== '' ? data.banner_url : null,
    };

    // Solo incluir location si tiene valor (evita problemas con columnas que pueden no existir)
    if (data.location !== undefined && data.location !== null && data.location.trim() !== '') {
      insertData.location = data.location.trim();
    } else {
      insertData.location = null;
    }

    // Solo incluir place si tiene valor
if (data.place !== undefined && data.place !== null && data.place.trim() !== '') {
  insertData.place = data.place.trim();
} else {
  insertData.place = null;
}

// Solo incluir direction si tiene valor
if (data.direction !== undefined && data.direction !== null && data.direction.trim() !== '') {
  insertData.direction = data.direction.trim();
} else {
  insertData.direction = null;
}

// Solo incluir open_time si tiene valor
if (data.open_time !== undefined && data.open_time !== null && data.open_time.trim() !== '') {
  insertData.open_time = data.open_time.trim();
} else {
  insertData.open_time = null;
}

// Solo incluir close_time si tiene valor
if (data.close_time !== undefined && data.close_time !== null && data.close_time.trim() !== '') {
  insertData.close_time = data.close_time.trim();
} else {
  insertData.close_time = null;
}

    const { data: result, error } = await supabase
      .from('events')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return result;
  },

  async updateEvent(id: string, data: Partial<AdminEvent>) {
    const supabase = createSupabaseClient();
    
    const updateData: any = {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location !== undefined ? (data.location || null) : undefined,
      banner_url: data.banner_url !== undefined ? (data.banner_url || null) : undefined,
    };

    // Incluir time si se proporciona
    if (data.time !== undefined) {
      updateData.time = data.time || "18:00";
    }

    // Incluir place si se proporciona
if (data.place !== undefined) {
  updateData.place = data.place && data.place.trim() !== '' ? data.place.trim() : null;
}

// Incluir direction si se proporciona
if (data.direction !== undefined) {
  updateData.direction = data.direction && data.direction.trim() !== '' ? data.direction.trim() : null;
}

// Incluir open_time si se proporciona
if (data.open_time !== undefined) {
  updateData.open_time = data.open_time && data.open_time.trim() !== '' ? data.open_time.trim() : null;
}

// Incluir close_time si se proporciona
if (data.close_time !== undefined) {
  updateData.close_time = data.close_time && data.close_time.trim() !== '' ? data.close_time.trim() : null;
}

    const { data: result, error } = await supabase
      .from('events')
      .update(updateData)
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

  // Artículos
  async getArticles(filters?: {
    search?: string;
    category?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const supabase = createSupabaseClient();
    
    let query = supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.isPublished !== undefined) {
      query = query.eq('is_published', filters.isPublished);
    }

    if (filters?.isFeatured !== undefined) {
      query = query.eq('is_featured', filters.isFeatured);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []) as AdminArticle[];
  },

  async getArticleById(id: string): Promise<AdminArticle | null> {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data as AdminArticle | null;
  },

  async createArticle(data: Partial<AdminArticle>) {
    const supabase = createSupabaseClient();
    
    console.log('[createArticle] Starting article creation...')
    console.log('[createArticle] Data received:', data)
    
    const insertData = {
      title: data.title!,
      slug: data.slug!,
      content: data.content!,
      excerpt: data.excerpt || null,
      // Tomar el autor desde author_name o desde un campo suelto 'author' que pueda venir del editor
      author_name: (data as any).author?.trim?.() || data.author_name || null,
      category: data.category!,
      tags: data.tags || null,
      featured_image_url: data.featured_image_url || null,
      video_url: data.video_url || null,
      is_premium: data.is_premium || false,
      is_published: data.is_published || false,
      is_featured: data.is_featured || false,
      read_time: data.read_time || null,
      published_at: data.published_at || null,
    }
    
    console.log('[createArticle] Insert data:', insertData)
    
    try {
      const { data: result, error } = await supabase
        .from('articles')
        .insert(insertData)
        .select()

      console.log('[createArticle] Supabase response:', { data: result, error })

      if (error) {
        console.error('[createArticle] Error details:', error)
        throw error
      }

      if (!result || result.length === 0) {
        throw new Error('No data returned from insert')
      }

      return result[0] as AdminArticle
    } catch (error) {
      console.error('[createArticle] Exception caught:', error)
      throw error
    }
  },

  async updateArticle(id: string, data: Partial<AdminArticle>) {
    const supabase = createSupabaseClient();
    
    const { data: result, error } = await supabase
      .from('articles')
      .update({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author_name: (data as any).author?.trim?.() || data.author_name || null,
        category: data.category,
        tags: data.tags,
        featured_image_url: data.featured_image_url,
        video_url: data.video_url,
        is_premium: data.is_premium,
        is_published: data.is_published,
        is_featured: data.is_featured,
        read_time: data.read_time,
        published_at: data.published_at,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return result as AdminArticle;
  },

  async deleteArticle(id: string) {
    const supabase = createSupabaseClient();
    
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async publishArticle(id: string) {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('articles')
      .update({
        is_published: true,
        published_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as AdminArticle;
  },

  async unpublishArticle(id: string) {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('articles')
      .update({
        is_published: false
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return data as AdminArticle;
  },

  // Anuncios
  async getAnnouncements() {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []) as AdminAnnouncements[];
  },

  async getAnnouncementById(id: string): Promise<AdminAnnouncements | null> {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data as AdminAnnouncements | null;
  },

  async createAnnouncement(data: Partial<AdminAnnouncements>) {
    const supabase = createSupabaseClient();
    
    const insertData = {
      title: data.title!,
      image_url: data.image_url!, // URL de la imagen guardada en Supabase Storage
      alt_text: data.alt_text || null,
      click_url: data.click_url || null,
      is_active: data.is_active ?? true,
    };
    
    console.log('Insertando anuncio en Supabase con image_url:', insertData.image_url)
    
    const { data: result, error } = await supabase
      .from('announcements')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    return result as AdminAnnouncements;
  },

  async updateAnnouncement(id: string, data: Partial<AdminAnnouncements>) {
    const supabase = createSupabaseClient();
    
    const updateData = {
      title: data.title,
      image_url: data.image_url, // URL de la imagen guardada en Supabase Storage
      alt_text: data.alt_text,
      click_url: data.click_url,
      is_active: data.is_active,
    };
    
    console.log('Actualizando anuncio en Supabase con image_url:', updateData.image_url)
    
    const { data: result, error } = await supabase
      .from('announcements')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return result as AdminAnnouncements;
  },

  async deleteAnnouncement(id: string) {
    const supabase = createSupabaseClient();
    
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Ediciones
  async getEditions(filters?: {
    search?: string;
    month?: string;
    year?: number;
    limit?: number;
    offset?: number;
  }) {
    const supabase = createSupabaseClient();
    
    let query = supabase
      .from('editions')
      .select('*')
      .order('position', { ascending: true })
      .order('year', { ascending: false });

    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    if (filters?.month) {
      query = query.eq('month', filters.month);
    }

    if (filters?.year) {
      query = query.eq('year', filters.year);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    return (data || []) as AdminEdition[];
  },

  async getEditionById(id: string): Promise<AdminEdition | null> {
    const supabase = createSupabaseClient();
    
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    return data as AdminEdition | null;
  },

  async createEdition(data: Partial<AdminEdition>) {
    const supabase = createSupabaseClient();
    
    // Si no se indica orden, la nueva edición va al final (posición siguiente)
    let position = data.position;
    if (!position) {
      const { data: last } = await supabase
        .from('editions')
        .select('position')
        .order('position', { ascending: false })
        .limit(1)
        .maybeSingle();
      position = (last?.position ?? 0) + 1;
    }

    const insertData = {
      title: data.title!,
      month: data.month!,
      year: data.year!,
      image: data.image || null,
      filename: data.filename || null,
      pdf_url: data.pdf_url || null,
      flipbook_url: data.flipbook_url?.trim() || null,
      position,
    };
    
    const { data: result, error } = await supabase
      .from('editions')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    return result as AdminEdition;
  },

  async updateEdition(id: string, data: Partial<AdminEdition>) {
    const supabase = createSupabaseClient();
    
    const updateData: any = {
      title: data.title,
      month: data.month,
      year: data.year,
      image: data.image !== undefined ? (data.image || null) : undefined,
      filename: data.filename !== undefined ? (data.filename || null) : undefined,
      pdf_url: data.pdf_url !== undefined ? (data.pdf_url || null) : undefined,
      flipbook_url: data.flipbook_url !== undefined ? (data.flipbook_url?.trim() || null) : undefined,
      position: data.position || undefined,
      updated_at: new Date().toISOString(),
    };

    const { data: result, error } = await supabase
      .from('editions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return result as AdminEdition;
  },

  // Guarda el orden: la edición en el índice i queda con position i + 1
  async reorderEditions(orderedIds: string[]) {
    const supabase = createSupabaseClient();

    const results = await Promise.all(
      orderedIds.map((id, index) =>
        supabase.from('editions').update({ position: index + 1 }).eq('id', id)
      )
    );

    const failed = results.find((r) => r.error);
    if (failed?.error) throw failed.error;
  },

  async deleteEdition(id: string) {
    const supabase = createSupabaseClient();
    
    const { error } = await supabase
      .from('editions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
