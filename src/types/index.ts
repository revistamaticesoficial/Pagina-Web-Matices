export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  tags: string[];
  image: string;
  video?: string;
  isPremium: boolean;
  publishedAt: string;
  readTime: number;
  author?: string;
  featured?: boolean;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  logo_url: string;
  slug: string;
  direction: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  plan: 'BASICO' | 'DESTACADO' | 'PREMIUM';
  featured?: boolean;
  services?: string[];
  schedule?: string;
  banners_url?: string[];
  tags?: string[];
}

export type Category = 
  | 'NOTICIAS'
  | 'GASTRONOMIA' 
  | 'SERVICIOS'
  | 'ENTRETENIMIENTO'
  | 'DEPORTES'
  | 'INMOBILIARIA'
  | 'SALUD'
  | 'EDUCACION';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
}

export interface NewsletterSignup {
  email: string;
  preferences: Category[];
}

export interface SearchFilters {
  category?: Category;
  neighborhood?: string;
  plan?: Business['plan'];
  featured?: boolean;
}

