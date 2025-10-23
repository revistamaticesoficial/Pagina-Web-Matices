import { Metadata } from 'next';
import EditionSection from '@/components/sections/EditionSection';
import LandingLayout from '@/components/layout/LandingLayout';

export const metadata: Metadata = {
  title: 'Ediciones - Revista Matices',
  description: 'Todas las ediciones de Revista Matices. Descarga la versión digital o lee las notas de cada número.',
  keywords: 'revista matices, ediciones, números, descarga, digital, córdoba',
};

export default function EdicionesPage() {
  return (
    <LandingLayout>
      <EditionSection />
    </LandingLayout>
  );
}