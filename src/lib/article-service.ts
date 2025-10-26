import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Article = Database['public']['Tables']['articles']['Row'];

// Cliente de Supabase para SSR
const createSupabaseClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

export const articleService = {
  /**
   * Obtener todos los artículos con paginación
   */
  async getAllArticles(options: {
    limit?: number;
    offset?: number;
    category?: string;
    search?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
  } = {}): Promise<{
    articles: Article[];
    total: number;
    hasMore: boolean;
  }> {
    const supabase = createSupabaseClient();
    const { limit = 12, offset = 0, category, search, isPublished = true, isFeatured } = options;

    try {
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' });

      // Aplicar filtros
      if (isPublished) {
        query = query.eq('is_published', true);
      }

      if (isFeatured !== undefined) {
        query = query.eq('is_featured', isFeatured);
      }

      if (category) {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // Ordenar por fecha de publicación
      query = query.order('published_at', { ascending: false });

      // Aplicar paginación
      query = query.range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching articles:', error);
        return { articles: [], total: 0, hasMore: false };
      }

      return {
        articles: data || [],
        total: count || 0,
        hasMore: (offset + limit) < (count || 0)
      };
    } catch (error) {
      console.error('Error in getAllArticles:', error);
      return { articles: [], total: 0, hasMore: false };
    }
  },

  /**
   * Obtener artículo por slug
   */
  async getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
        

      if (error) {
        console.error('Error fetching article:', error);
        return null;
      }

      // Incrementar contador de vistas
      if (data) {
        await supabase
          .from('articles')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id);
      }

      return data;
    } catch (error) {
      console.error('Error in getArticleBySlug:', error);
      return null;
    }
  },

  /**
   * Obtener artículos destacados
   */
  async getFeaturedArticles(limit = 5): Promise<Article[]> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured articles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getFeaturedArticles:', error);
      return [];
    }
  },

  /**
   * Obtener últimos artículos
   */
  async getLatestArticles(limit = 10): Promise<Article[]> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching latest articles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getLatestArticles:', error);
      return [];
    }
  },

  /**
   * Obtener artículos por categoría
   */
  async getArticlesByCategory(category: string, limit = 12): Promise<Article[]> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching articles by category:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getArticlesByCategory:', error);
      return [];
    }
  },

  /**
   * Buscar artículos por término de búsqueda
   */
  async searchArticles(searchTerm: string, limit = 12): Promise<Article[]> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error searching articles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchArticles:', error);
      return [];
    }
  },

  /**
   * Obtener artículo relacionado
   */
  async getRelatedArticles(category: string, currentSlug: string, limit = 3): Promise<Article[]> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .neq('slug', currentSlug)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching related articles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRelatedArticles:', error);
      return [];
    }
  },

  /**
   * Obtener categorías disponibles
   */
  async getCategories(): Promise<string[]> {
    const supabase = createSupabaseClient();

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .eq('is_published', true)
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }

      // Obtener categorías únicas
      const categories = [...new Set(data?.map(item => item.category).filter(Boolean))] as string[];
      return categories.sort();
    } catch (error) {
      console.error('Error in getCategories:', error);
      return [];
    }
  }
};

