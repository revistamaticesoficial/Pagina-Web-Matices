import LandingLayout from '@/components/layout/LandingLayout';
import { ServiciosClient } from '@/components/screens/landing/ServiciosClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios - Revista Matices',
  description:
    'Conocé los planes de publicidad, contenidos y eventos que ofrecemos en Revista Matices para potenciar tu marca.',
};

export default function ServiciosPage() {
  return (
    <LandingLayout>
      <ServiciosClient />
    </LandingLayout>
  );
}


