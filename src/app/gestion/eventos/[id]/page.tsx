import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#005B82] via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Evento no encontrado</h1>
          <Link href="/gestion/eventos" className="bg-[#005B82] text-white px-6 py-3 rounded-lg hover:bg-[#003C56] transition-colors">Volver a eventos</Link>
        </div>
      </div>
    )
  }

  const dateObj = data.date ? new Date(data.date as any) : null
  const dateStr = dateObj ? dateObj.toISOString().split('T')[0] : ''
  const timeStr = (data as any).time || (dateObj ? dateObj.toTimeString().slice(0,5) : '')
  const image = (data as any).image || '/images/logo.jpg'
  const category = (data as any).category || 'EVENTO'
  const neighborhood = (data as any).neighborhood || ''
  const capacity = typeof (data as any).capacity === 'number' ? (data as any).capacity : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003C56] via-red-50 to-pink-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/gestion/eventos" className="flex items-center gap-2 text-gray-600 hover:text-[#003C56] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Volver a eventos
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
            <div className="relative h-96 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl overflow-hidden">
              <img 
                src={image} 
                alt={String((data as any).title || '')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {category}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del evento</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoría:</span>
                  <span className="font-semibold">{category}</span>
                </div>
                {neighborhood && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Barrio:</span>
                    <span className="font-semibold">{neighborhood}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="font-semibold">{dateStr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hora:</span>
                  <span className="font-semibold">{timeStr}</span>
                </div>
                {capacity !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacidad:</span>
                    <span className="font-semibold">{capacity} lugares</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {String((data as any).title || '')}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {String((data as any).description || '')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#005B82]" />
                  <div>
                    <p className="font-semibold">Fecha</p>
                    <p>{dateStr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5 text-[#005B82]" />
                  <div>
                    <p className="font-semibold">Hora</p>
                    <p>{timeStr}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#005B82]" />
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <p>{String((data as any).location || '')}</p>
                    {neighborhood && <p className="text-sm text-gray-500">{neighborhood}</p>}
                  </div>
                </div>

                {capacity !== undefined && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-[#005B82]" />
                    <div>
                      <p className="font-semibold">Capacidad</p>
                      <p>{capacity} personas</p>
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