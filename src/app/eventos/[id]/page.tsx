import LandingLayout from '@/components/layout/LandingLayout';
import { EventDetailContent } from '@/components/sections/EventDetailContent';
import { eventService } from '@/lib/event-service';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Configuración de revalidación
export const revalidate = 60; // Revalidar cada 60 segundos

// Generar metadatos dinámicos
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const event = await eventService.getEventById(resolvedParams.id);
    
    if (!event) {
      return {
        title: 'Evento no encontrado - Matices',
        description: 'El evento que buscas no está disponible.',
      };
    }

    return {
      title: `${event.title} - Eventos de Matices`,
      description: event.description || `Descubre ${event.title} en Matices.`,
      keywords: `${event.title}, eventos, córdoba, ${event.location || ''}`,
      openGraph: {
        title: `${event.title} - Eventos de Matices`,
        description: event.description || `Descubre ${event.title}.`,
        type: 'website',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Evento - Matices',
      description: 'Descubre este evento en Matices.',
    };
  }
}

// Componente de loading para el detalle
function EventDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
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
      </div>
    </div>
  );
}

export default async function EventDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  
  // Validación de ID
  if (!resolvedParams.id || resolvedParams.id.trim() === '') {
    notFound();
  }

  try {
    const event = await eventService.getEventById(resolvedParams.id);
    
    if (!event) {
      notFound();
    }

    return (
      <LandingLayout>
        <ErrorBoundary>
          <EventDetailContent event={event} />
        </ErrorBoundary>
      </LandingLayout>
    );
  } catch (error) {
    console.error('Error loading event detail:', error);
    notFound();
  }
}

