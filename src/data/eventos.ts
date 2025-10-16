import { Event } from '@/types/sugerencias';

export const eventos: Event[] = [
  {
    id: '1',
    title: 'Festival de Música del Cerro 2024',
    description: 'Tres días de música en vivo con artistas locales y nacionales. Entrada libre y gratuita.',
    date: '2024-12-25',
    time: '18:00',
    direction: 'Parque del Cerro de las Rosas',
    neighborhood: 'Cerro de las Rosas',
    category: 'ENTRETENIMIENTO',
    banner_url: '/images/logo.jpg',
    isFree: true,
    organizer: 'Municipalidad de Córdoba',
    capacity: 500,
    tags: ['música', 'festival', 'gratis', 'familia']
  }
];