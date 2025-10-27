/**
 * Tipos para artículos en el frontend
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author_id: string | null;
  author_name: string | null;
  category: string;
  tags: string[] | null;
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

export type ArticleCategory = 
  | 'NOTICIAS'
  | 'GASTRONOMIA'
  | 'SERVICIOS'
  | 'ENTRETENIMIENTO'
  | 'DEPORTES'
  | 'INMOBILIARIA'
  | 'SALUD'
  | 'EDUCACION'
  | 'CULTURA'
  | 'INFRAESTRUCTURA';

export interface ArticleFilters {
  category?: ArticleCategory;
  search?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
}

export interface ArticlePagination {
  limit?: number;
  offset?: number;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  hasMore: boolean;
}

