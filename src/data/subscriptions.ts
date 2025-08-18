import { SubscriptionPlan } from '@/types';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 0,
    period: 'monthly',
    features: [
      'Acceso a artículos básicos',
      'Lista de comercios del barrio',
      'Newsletter semanal',
      'Notificaciones de eventos locales'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    period: 'monthly',
    features: [
      'Todo del plan Básico',
      'Acceso a contenido premium',
      'Artículos exclusivos',
      'Sin publicidades',
      'Acceso prioritario a eventos',
      'Soporte por WhatsApp'
    ],
    popular: true
  },
  {
    id: 'premium-yearly',
    name: 'Premium Anual',
    price: 9999,
    period: 'yearly',
    features: [
      'Todo del plan Premium',
      '2 meses gratis',
      'Contenido exclusivo prioritario',
      'Acceso a archivo histórico',
      'Soporte prioritario 24/7',
      'Descuentos en comercios asociados'
    ]
  }
];

export const getPopularPlan = () => subscriptionPlans.find(plan => plan.popular);
export const getPlanById = (id: string) => subscriptionPlans.find(plan => plan.id === id);

