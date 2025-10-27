import LandingLayout from '@/components/layout/LandingLayout';
import { ComerciosGrid, ComerciosPagination } from '@/components/sections';
import { comercioService } from '@/lib/comercio-service';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense } from 'react';

// Configuración de revalidación
export const revalidate = 60; // Revalidar cada 60 segundos

// Generar metadatos estáticos
export async function generateMetadata() {
  return {
    title: 'Comercios de Matices - Cerro de las Rosas',
    description: 'Descubre todos los comercios del barrio Cerro de las Rosas en Córdoba. Gastronomía, servicios, entretenimiento y más.',
    keywords: 'comercios, cerro de las rosas, córdoba, gastronomía, servicios, barrio',
    openGraph: {
      title: 'Comercios de Matices - Cerro de las Rosas',
      description: 'Descubre todos los comercios del barrio Cerro de las Rosas en Córdoba.',
      type: 'website',
    },
  };
}

async function loadComercios() {
  try {
    const result = await comercioService.getAllComercios({
      limit: 24,
      offset: 0
    });
    
    return {
      comercios: result.comercios,
      total: result.total,
      hasMore: result.hasMore
    };
  } catch (error) {
    console.error('Error loading comercios:', error);
    return {
      comercios: [],
      total: 0,
      hasMore: false
    };
  }
}

// Componente de loading para el grid
function ComerciosGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ComerciosPage() {
  const { comercios, total, hasMore } = await loadComercios();

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003c56] to-[#005B82] text-white py-16">
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Comercios de Matices
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
                Todos los comercios del Cerro de las Rosas
              </p>
              <div className="mt-6 text-lg opacity-80">
                {total} comercios disponibles
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Últimos Comercios
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Encuentra todos los comercios del barrio Cerro de las Rosas
              </p>
            </div>

            {/* Comercios Grid con Suspense y ErrorBoundary */}
            <ErrorBoundary>
              <Suspense fallback={<ComerciosGridSkeleton />}>
                <ComerciosGrid comercios={comercios} />
              </Suspense>
            </ErrorBoundary>

            {/* Pagination - Client Component */}
            <ErrorBoundary>
              <ComerciosPagination 
                totalItems={total} 
                itemsPerPage={24}
                hasMore={hasMore}
              />
            </ErrorBoundary>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}


