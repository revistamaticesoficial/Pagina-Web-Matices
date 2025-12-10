import LandingLayout from '@/components/layout/LandingLayout';
import { AccountDashboard } from '@/components/screens/landing/AccountDashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Cuenta - Revista Matices',
  description:
    'Panel personalizado para que los usuarios de Revista Matices consulten eventos asistidos, beneficios canjeados y configuren su perfil.',
};

export default function CuentaPage() {
  return (
    <LandingLayout>
      <AccountDashboard />
    </LandingLayout>
  );
}


