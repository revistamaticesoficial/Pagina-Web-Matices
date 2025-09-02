'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from './components/DashboardLayout';
import { BusinessOverview } from './components/BusinessOverview';

export default function DashboardPage() {
  const router = useRouter();
  const { authState } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push('/auth/login');
    }
  }, [authState.isLoading, authState.isAuthenticated, router]);

  // Redirect to register onboarding if no business
  useEffect(() => {
    if (authState.user && !authState.user.business) {
      router.push('/auth/register');
    }
  }, [authState.user, router]);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated || !authState.user?.business) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Bienvenido, {authState.user.firstName}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestiona tu comercio desde este panel de control
          </p>
        </div>

        {/* Business overview */}
        <BusinessOverview business={authState.user.business} />

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Crear Beneficio
            </h3>
            <p className="text-gray-600 mb-4">
              Ofrece cupones o promociones a los usuarios
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Crear Beneficio
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nuevo Evento
            </h3>
            <p className="text-gray-600 mb-4">
              Anuncia eventos especiales en tu comercio
            </p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Crear Evento
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Editar Información
            </h3>
            <p className="text-gray-600 mb-4">
              Actualiza los datos de tu comercio
            </p>
            <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              Editar Comercio
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

