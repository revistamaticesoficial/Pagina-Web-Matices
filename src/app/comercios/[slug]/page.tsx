import LandingLayout from '@/components/layout/LandingLayout';
import { ComercioDetailContent } from '@/components/sections/ComercioDetailContent';
import { comercioService } from '@/lib/comercio-service';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Configuración de revalidación
export const revalidate = 60; // Revalidar cada 60 segundos

// Generar metadatos dinámicos
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const { comercio } = await comercioService.getComercioBySlug(resolvedParams.slug);
    
    if (!comercio) {
      return {
        title: 'Comercio no encontrado - Matices',
        description: 'El comercio que buscas no está disponible.',
      };
    }

    return {
      title: `${comercio.name} - Comercios de Matices`,
      description: `Descubre ${comercio.name} en el barrio Cerro de las Rosas. ${comercio.direction ? `Ubicado en ${comercio.direction}.` : ''}`,
      keywords: `${comercio.name}, ${comercio.category}, cerro de las rosas, córdoba, comercio local`,
      openGraph: {
        title: `${comercio.name} - Comercios de Matices`,
        description: `Descubre ${comercio.name} en el barrio Cerro de las Rosas.`,
        type: 'website',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Comercio - Matices',
      description: 'Descubre este comercio en el barrio Cerro de las Rosas.',
    };
  }
}

// Componente de loading para el detalle
function ComercioDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ComercioDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  
  // Validación de slug
  if (!resolvedParams.slug || resolvedParams.slug.trim() === '') {
    notFound();
  }

  try {
    const { comercio, benefits } = await comercioService.getComercioBySlug(resolvedParams.slug);
    
    // if (!comercio) {
    //   return notFound();
    // }

    return (
      <LandingLayout>
        <ErrorBoundary>
          <ComercioDetailContent comercio={comercio} benefits={benefits} />
        </ErrorBoundary>
      </LandingLayout>
    );
  } catch (error) {
    console.error('Error loading comercio detail:', error);
    notFound();
  }
}
