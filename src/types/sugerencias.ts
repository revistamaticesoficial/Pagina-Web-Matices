export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  neighborhood: string;
  category: string;
  image: string;
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
  discount: string;
  discountPercentage?: number;
  code: string;
  validUntil: string;
  category: string;
  image: string;
  terms: string[];
  isActive: boolean;
  usageLimit?: number;
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
