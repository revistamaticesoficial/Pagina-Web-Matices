'use client'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { eventos as eventosData } from '@/data/eventos'
import { Event } from '@/types/sugerencias'
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2, Heart, Star, Phone, Mail, Globe, Tag } from 'lucide-react'

const EventDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const [evento, setEvento] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [inscriptos, setInscriptos] = useState<number>(0)
  
  const id = params.id as string

  useEffect(() => {
    // Función para cargar eventos desde localStorage
    const loadEventos = (): Event[] => {
      if (typeof window !== 'undefined') {
        const storedEventos = localStorage.getItem('eventos');
        if (storedEventos) {
          return JSON.parse(storedEventos);
        }
      }
      return eventosData;
    };

    // Función para cargar inscriptos desde localStorage
    const loadInscriptos = (eventoId: string): number => {
      if (typeof window !== 'undefined') {
        const storedInscriptos = localStorage.getItem(`inscriptos_${eventoId}`);
        if (storedInscriptos) {
          return parseInt(storedInscriptos);
        }
      }
      return 0;
    };

    const allEventos = loadEventos();
    const foundEvento = allEventos.find((evento) => evento.id === id);
    setEvento(foundEvento || null);
    setInscriptos(loadInscriptos(id));
    setLoading(false);
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005B82] via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#005B82]"></div>
          <p className="mt-4 text-gray-600">Cargando evento...</p>
        </div>
      </div>
    )
  }
  
  if (!evento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005B82] via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Evento no encontrado</h1>
          <p className="text-gray-600 mb-8">El evento que buscas no existe o ha sido eliminado.</p>
          <button
            onClick={() => router.push('/gestion/eventos')}
            className="bg-[#005B82] text-white px-6 py-3 rounded-lg hover:bg-[003C56] transition-colors"
          >
            Volver a eventos
          </button>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: evento.title,
          text: evento.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href)
      alert('URL copiada al portapapeles')
    }
  }

  const handleInscribirse = () => {
    const nuevosInscriptos = inscriptos + 1;
    setInscriptos(nuevosInscriptos);
    
    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(`inscriptos_${id}`, nuevosInscriptos.toString());
    }
    
    alert('¡Te has inscrito al evento exitosamente!');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003C56] via-red-50 to-pink-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/gestion/eventos')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#003C56] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a eventos
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#003C56] hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Heart className="w-4 h-4" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
            {/* Imagen principal */}
            <div className="relative h-96 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl overflow-hidden">
              <img 
                src={evento.image} 
                alt={evento.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {evento.category}
                  </span>
                  {evento.isFree && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      GRATIS
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Información del evento - Movida debajo de la imagen */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del evento</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoría:</span>
                  <span className="font-semibold">{evento.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Barrio:</span>
                  <span className="font-semibold">{evento.neighborhood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo:</span>
                  <span className="font-semibold">{evento.isFree ? 'Gratuito' : 'De pago'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-semibold">{new Date(evento.date).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="font-semibold">{evento.time}</span>
                </div>
                {evento.capacity && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacidad:</span>
                    <span className="font-semibold">{evento.capacity} lugares</span>
                  </div>
                )}
              </div>
            </div>

            {/* Información detallada del evento */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {evento.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {evento.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {evento.description}
              </p>

              {/* Detalles del evento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#005B82]" />
                  <div>
                    <p className="font-semibold">Fecha</p>
                    <p>{new Date(evento.date).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#005B82]" />
                  <div>
                    <p className="font-semibold">Hora</p>
                    <p>{evento.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#005B82]" />
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <p>{evento.location}</p>
                    <p className="text-sm text-gray-500">{evento.neighborhood}</p>
                  </div>
                </div>

                {evento.capacity && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-[#005B82]" />
                    <div>
                      <p className="font-semibold">Capacidad</p>
                      <p>{evento.capacity} personas</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}


export default EventDetailPage