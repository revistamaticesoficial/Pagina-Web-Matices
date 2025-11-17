export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  direction: string;
  neighborhood: string;
  category: string;
  banner_url: string;
  price?: number;
  isFree: boolean;
  organizer: string;
  capacity?: number;
  tags: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  business: string;
  businessLogo: string;
  banner_url: string;
  discount: string;
  discountPercentage?: number;
  flag?: string | null;
  code: string;
  validUntil: string;
  category: string;
  image: string;
  terms: string[];
  isActive: boolean;
  usageLimit?: number;
  type?: "discount" | "multipromo";
}

export interface Comercio {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  backgroundColor: string;
  location: string;
  neighborhood: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  services?: string[];
  // Campos opcionales provenientes de Supabase en vistas/detalles
  slug?: string;
  logo_url?: string;
  direction?: string;
  phone?: string;
  banners_url?: string[];
  tags?: string[];
}

export type TabType = 'comercios' | 'eventos' | 'beneficios';

export type SugerenciaItem = Event | Benefit | Comercio;

export interface PaginationData<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
