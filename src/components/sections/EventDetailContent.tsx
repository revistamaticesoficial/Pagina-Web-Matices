'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Building,
  DoorOpen,
  Square,
} from 'lucide-react';
import type { Database } from '@/types/database';

type Event = Database['public']['Tables']['events']['Row'];

interface EventDetailContentProps {
  event: Event | null;
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Establecer URL de compartir usando useEffect
  useEffect(() => {
    if (typeof window !== 'undefined' && event) {
      setShareUrl(`${window.location.origin}/eventos/${event.id}`);
    }
  }, [event]);

  // Validar que el evento existe
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Evento no encontrado</h1>
          <p className="text-gray-600 mb-6">El evento que buscas no está disponible.</p>
          <Button onClick={() => router.push('/sugerencias?tab=eventos')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Eventos
          </Button>
        </div>
      </div>
    );
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Función para compartir usando Web Share API
  const shareEvent = async () => {
    if (navigator.share && typeof window !== 'undefined') {
      try {
        await navigator.share({
          title: event.title,
          text: event.description || '',
          url: shareUrl,
        });
      } catch (error) {
        // Si falla, mostrar modal de compartir alternativo
        setShowShareModal(true);
      }
    } else {
      // Mostrar modal de compartir alternativo
      setShowShareModal(true);
    }
  };

  // Función para copiar URL al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen del evento */}
      <div className="relative h-80 w-full overflow-hidden rounded-2xl">
        {event.banner_url ? (
          <Image
            src={event.banner_url}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600"></div>
        )}
        
        {/* Overlay oscuro para mejor legibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Botón Volver */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="bg-white/90 hover:bg-white text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>

        {/* Título y fecha */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{event.title}</h1>
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="w-5 h-5" />
            <span className="text-lg">{formatDate(event.date)}</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Acerca del Evento */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acerca del Evento</h2>
            <p className="text-gray-700 leading-relaxed">
              {event.description || 'No hay descripción disponible para este evento.'}
            </p>
          </div>

          {/* Información del Evento */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Fecha */}
            <div className="bg-white border-2 border-black rounded-lg p-4 w-full">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-gray-900" />
                <span className="font-bold text-gray-900">Fecha</span>
              </div>
              <p className="text-gray-700">{formatDate(event.date)}</p>
            </div>

            {/* Hora del Evento */}
            <div className="bg-white border-2 border-black rounded-lg p-4 w-full">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-gray-900" />
                <span className="font-bold text-gray-900">Hora del Evento</span>
              </div>
              <p className="text-gray-700">{event.time || 'No especificada'}</p>
            </div>

            {/* Ubicación */}
            <div className="bg-white border-2 border-black rounded-lg p-4 w-full">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-gray-900" />
                <span className="font-bold text-gray-900">Ubicación</span>
              </div>
              <p className="text-gray-700">
                {event.place || event.location || 'No especificada'}
              </p>
              {event.direction && (
                <p className="text-sm text-gray-600 mt-1">{event.direction}</p>
              )}
            </div>

            {/* Apertura de Puertas */}
            {event.open_time && (
              <div className="bg-white border-2 border-black rounded-lg p-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <DoorOpen className="w-5 h-5 text-gray-900" />
                  <span className="font-bold text-gray-900">Apertura de Puertas</span>
                </div>
                <p className="text-gray-700">{event.open_time}</p>
              </div>
            )}

            {/* Cierre del Evento */}
            {event.close_time && (
              <div className="bg-white border-2 border-black rounded-lg p-4 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <Square className="w-5 h-5 text-gray-900" />
                  <span className="font-bold text-gray-900">Cierre del Evento</span>
                </div>
                <p className="text-gray-700">{event.close_time}</p>
              </div>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={shareEvent}
              variant="outline"
              className="flex-1 border-[#005B82] text-[#005B82] hover:bg-[#005B82]/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir Evento
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de Compartir */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Compartir Evento</h3>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600"
              >
                {copiedToClipboard ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
            <Button
              onClick={() => setShowShareModal(false)}
              variant="outline"
              className="w-full"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
