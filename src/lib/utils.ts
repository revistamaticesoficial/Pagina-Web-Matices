import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Parse 'YYYY-MM-DD' safely as local date (no UTC shift) and return end of local day
export function parseDateOnlyToEndOfLocalDay(dateStr: string): Date {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return new Date(dateStr);
  const [_, y, mo, d] = m;
  return new Date(Number(y), Number(mo) - 1, Number(d), 23, 59, 59, 999);
}

// Safe formatter for labels: if input is 'YYYY-MM-DD', format without UTC shifts
export function formatDateLabel(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const y = Number(dateStr.slice(0, 4));
    const m = Number(dateStr.slice(5, 7));
    const d = Number(dateStr.slice(8, 10));
    // Create local date without timezone shift
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  // Fallback for full ISO/timestamptz
  return new Date(dateStr).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price);
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'NOTICIAS': 'bg-blue-500',
    'GASTRONOMIA': 'bg-orange-500',
    'SERVICIOS': 'bg-green-500',
    'ENTRETENIMIENTO': 'bg-purple-500',
    'DEPORTES': 'bg-red-500',
    'INMOBILIARIA': 'bg-yellow-500',
    'SALUD': 'bg-pink-500',
    'EDUCACION': 'bg-indigo-500'
  };
  return colors[category] || 'bg-gray-500';
}

export function getPlanColor(plan: string): string {
  const colors: Record<string, string> = {
    'BASICO': 'bg-gray-500',
    'DESTACADO': 'bg-blue-500',
    'PREMIUM': 'bg-yellow-500'
  };
  return colors[plan] || 'bg-gray-500';
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
  
  return phone;
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function isPremiumContent(isPremium: boolean): boolean {
  return isPremium;
}

export function getImagePlaceholder(category: string): string {
  const placeholders: Record<string, string> = {
    'NOTICIAS': 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Noticias',
    'GASTRONOMIA': 'https://via.placeholder.com/800x400/F97316/FFFFFF?text=Gastronomía',
    'SERVICIOS': 'https://via.placeholder.com/800x400/22C55E/FFFFFF?text=Servicios',
    'ENTRETENIMIENTO': 'https://via.placeholder.com/800x400/A855F7/FFFFFF?text=Entretenimiento',
    'DEPORTES': 'https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Deportes',
    'INMOBILIARIA': 'https://via.placeholder.com/800x400/EAB308/FFFFFF?text=Inmobiliaria',
    'SALUD': 'https://via.placeholder.com/800x400/EC4899/FFFFFF?text=Salud',
    'EDUCACION': 'https://via.placeholder.com/800x400/6366F1/FFFFFF?text=Educación'
  };
  return placeholders[category] || placeholders['NOTICIAS'];
}

export function getBusinessImagePlaceholder(category: string): string {
  const placeholders: Record<string, string> = {
    'GASTRONOMIA': 'https://via.placeholder.com/400x300/F97316/FFFFFF?text=Gastronomía',
    'SALUD': 'https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Salud',
    'SERVICIOS': 'https://via.placeholder.com/400x300/22C55E/FFFFFF?text=Servicios',
    'DEPORTES': 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Deportes',
    'EDUCACION': 'https://via.placeholder.com/400x300/6366F1/FFFFFF?text=Educación',
    'INMOBILIARIA': 'https://via.placeholder.com/400x300/EAB308/FFFFFF?text=Inmobiliaria',
    'ENTRETENIMIENTO': 'https://via.placeholder.com/400x300/A855F7/FFFFFF?text=Entretenimiento'
  };
  return placeholders[category] || placeholders['SERVICIOS'];
}

