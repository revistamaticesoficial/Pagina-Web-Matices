import { Category } from '@/types';

export const APP_CONFIG = {
  name: 'Revista Matices',
  description: 'Revista del Cerro de las Rosas - Córdoba, Argentina',
  tagline: '34 años informando al norte de Córdoba',
  url: 'https://revistamatices.com',
  email: 'info@revistamatices.com',
  phone: '+54 351 123-4567',
  address: 'Av. Rafael Núñez 3000, Cerro de las Rosas, Córdoba, Argentina'
};

export const CATEGORIES: { value: Category; label: string; color: string; icon: string }[] = [
  { value: 'NOTICIAS', label: 'Noticias', color: 'bg-blue-500', icon: 'newspaper' },
  { value: 'GASTRONOMIA', label: 'Gastronomía', color: 'bg-orange-500', icon: 'utensils' },
  { value: 'SERVICIOS', label: 'Servicios', color: 'bg-green-500', icon: 'wrench' },
  { value: 'ENTRETENIMIENTO', label: 'Entretenimiento', color: 'bg-purple-500', icon: 'music' },
  { value: 'DEPORTES', label: 'Deportes', color: 'bg-red-500', icon: 'trophy' },
  { value: 'INMOBILIARIA', label: 'Inmobiliaria', color: 'bg-yellow-500', icon: 'home' },
  { value: 'SALUD', label: 'Salud', color: 'bg-pink-500', icon: 'heart' },
  { value: 'EDUCACION', label: 'Educación', color: 'bg-indigo-500', icon: 'graduation-cap' }
];

export const NEIGHBORHOODS = [
  'Cerro de las Rosas',
  'Nueva Córdoba',
  'Güemes',
  'Centro',
  'Alta Córdoba',
  'General Paz',
  'San Vicente',
  'Pueyrredón'
];

export const BUSINESS_PLANS = [
  { value: 'BASICO', label: 'Básico', color: 'bg-gray-500' },
  { value: 'DESTACADO', label: 'Destacado', color: 'bg-blue-500' },
  { value: 'PREMIUM', label: 'Premium', color: 'bg-yellow-500' }
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61579318061468',
  instagram: 'https://instagram.com/revistamaticesoficial',
  twitter: '/',
  youtube: '/',
  whatsapp: 'https://api.whatsapp.com/send?phone=5493515141456&text=Hola%20te%20escribo%20desde%20la%20web%20de%20Revista%20Matices'
};

export const NAVIGATION = [
  { name: 'Inicio', href: '/', current: true },
  { name: 'Sugerencias', href: '/sugerencias', current: false },
  // { name: 'Artículos', href: '/articulos', current: false },
  // { name: 'Comercios', href: '/comercios', current: false },
  // { name: 'Suscripciones', href: '/suscripciones', current: false },
  { name: '¿Quienes somos?', href: '/nosotros', current: false }
];

export const FOOTER_LINKS = {
  company: [
    { name: 'Sobre nosotros', href: '/nosotros' },
    { name: 'Historia', href: '/nosotros#historia' },
    { name: 'Equipo', href: '/nosotros#equipo' },
    { name: 'Contacto', href: '/contacto' }
  ],
  services: [
    { name: 'Publicidad', href: '/publicidad' },
    { name: 'Suscripciones', href: '/suscripciones' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Newsletter', href: '/newsletter' }
  ],
  legal: [
    { name: 'Términos y condiciones', href: '/terminos' },
    { name: 'Política de privacidad', href: '/privacidad' },
    { name: 'Política de cookies', href: '/cookies' }
  ]
};

