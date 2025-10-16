import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, Eye, ChefHat } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default async function EventosGastronomicos() {
  const { data } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  const eventos = (data || []).map((e: any) => {
    const dateObj = e.date ? new Date(e.date) : null;
    const dateStr = dateObj ? dateObj.toISOString().split('T')[0] : '';
    const timeStr = e.time || (dateObj ? dateObj.toTimeString().slice(0,5) : '');
    return {
      id: e.id as string,
      title: e.title as string,
      description: (e.description as string) || '',
      date: dateStr,
      time: timeStr,
      direction: (e.direction as string) || '',
      organizer: (e.organizer as string) || 'Organizador',
      capacity: typeof e.capacity === 'number' ? e.capacity : undefined,
      banner_url: (e.banner_url as string) || '/images/logo.jpg',
      category: (e.category as string) || 'EVENTO',
      tags: Array.isArray(e.tags) ? e.tags : [],
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-005B82 via-red-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-[#005B82] via-red-600 to-pink-600 bg-clip-text text-transparent">
              🍽️ Eventos
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Descubre experiencias gastronómicas únicas</p>
          </div>
        </div>

        {/* Grid de Eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 h-[440px]">
              {/* Imagen del evento */}
              <div className="relative h-40 flex-1 bg-gradient-to-r from-[#323333] to-[#111111] flex items-center justify-center">
                {evento.banner_url && evento.banner_url !== "/images/logo.jpg" ? (
                  <Image src={evento.banner_url} alt={evento.title} className="w-full h-full object-contain" fill />
                ) : (
                  <ChefHat className="w-16 h-16 text-white" />
                )}
                <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                  {evento.category}
                </div>
              </div>

              {/* Contenido de la card */}
              <div className="p-6 flex flex-col justify-between h-4/6">
              <div className="space-y-2 ">
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
                  {evento.title}
                </h3>
                
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {evento.description}
                </p>
                                
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{evento.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{evento.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{evento.direction}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {evento.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{evento.capacity} personas</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex mb-4 justify-start w-full items-center gap-2">
                  <Link
                    href={`/gestion/eventos/${evento.id}`}
                    className="bg-[#005B82] hover:bg-[#0074B7] active:bg-[#0074B7] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}