'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types/sugerencias';

interface UseEventosReturn {
  eventos: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Función para mapear datos de Supabase a la interfaz Event
const mapSupabaseToEvent = (data: any): Event => {
  // Extraer fecha y hora del campo date
  const eventDate = new Date(data.date);
  const dateStr = eventDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const timeStr = eventDate.toTimeString().split(' ')[0].slice(0, 5); // HH:MM

  // Generar categoría basada en el título o usar una por defecto
  const generateCategory = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('música') || titleLower.includes('concierto') || titleLower.includes('festival')) {
      return 'ENTRETENIMIENTO';
    }
    if (titleLower.includes('curso') || titleLower.includes('taller') || titleLower.includes('seminario') || titleLower.includes('charla')) {
      return 'EDUCACION';
    }
    if (titleLower.includes('fútbol') || titleLower.includes('tenis') || titleLower.includes('yoga') || titleLower.includes('caminata') || titleLower.includes('ajedrez')) {
      return 'DEPORTES';
    }
    if (titleLower.includes('gastronomía') || titleLower.includes('comida') || titleLower.includes('degustación')) {
      return 'GASTRONOMIA';
    }
    if (titleLower.includes('teatro') || titleLower.includes('arte') || titleLower.includes('exposición') || titleLower.includes('cine')) {
      return 'ENTRETENIMIENTO';
    }
    return 'ENTRETENIMIENTO'; // Por defecto
  };

  // Generar tags basados en el título y descripción
  const generateTags = (title: string, description: string) => {
    const text = `${title} ${description}`.toLowerCase();
    const tags = [];
    
    if (text.includes('gratis') || text.includes('libre')) tags.push('gratis');
    if (text.includes('familia')) tags.push('familia');
    if (text.includes('niños')) tags.push('niños');
    if (text.includes('música')) tags.push('música');
    if (text.includes('arte')) tags.push('arte');
    if (text.includes('deporte')) tags.push('deporte');
    if (text.includes('comida')) tags.push('comida');
    if (text.includes('local')) tags.push('local');
    if (text.includes('comunidad')) tags.push('comunidad');
    
    return tags.length > 0 ? tags : ['evento', 'local'];
  };

  // Determinar si es gratis basado en el título/descripción
  const isFree = data.title?.toLowerCase().includes('gratis') || 
                 data.title?.toLowerCase().includes('libre') ||
                 data.description?.toLowerCase().includes('gratis') ||
                 data.description?.toLowerCase().includes('libre');

  // Generar precio estimado si no es gratis
  const generatePrice = (title: string, description: string) => {
    if (isFree) return undefined;
    
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('curso') || text.includes('taller')) return 15000;
    if (text.includes('seminario') || text.includes('charla')) return 8000;
    if (text.includes('torneo') || text.includes('competencia')) return 5000;
    if (text.includes('teatro') || text.includes('concierto')) return 6000;
    if (text.includes('exposición') || text.includes('muestra')) return 4000;
    
    return 10000; // Precio por defecto
  };

  // Generar capacidad estimada
  const generateCapacity = (title: string, description: string) => {
    const text = `${title} ${description}`.toLowerCase();
    if (text.includes('taller') || text.includes('curso')) return 20;
    if (text.includes('seminario') || text.includes('charla')) return 50;
    if (text.includes('torneo') || text.includes('competencia')) return 40;
    if (text.includes('festival') || text.includes('fiesta')) return 200;
    if (text.includes('teatro') || text.includes('concierto')) return 100;
    
    return 50; // Capacidad por defecto
  };

  // Generar organizador basado en el business_id o usar uno por defecto
  const generateOrganizer = (businessId: string) => {
    // Por ahora usamos un organizador genérico, pero podrías hacer una consulta adicional
    // para obtener el nombre del comercio asociado
    return 'Organizador Local';
  };

  // Generar barrio basado en la ubicación
  const generateNeighborhood = (location: string) => {
    if (!location) return 'Zona Norte';
    
    const locationLower = location.toLowerCase();
    if (locationLower.includes('cerro')) return 'Cerro de las Rosas';
    if (locationLower.includes('nueva córdoba') || locationLower.includes('nueva cordoba')) return 'Nueva Córdoba';
    if (locationLower.includes('güemes') || locationLower.includes('guemes')) return 'Güemes';
    if (locationLower.includes('centro') || locationLower.includes('plaza')) return 'Centro';
    if (locationLower.includes('san vicente')) return 'San Vicente';
    
    return 'Zona Norte';
  };

  return {
    id: data.id,
    title: data.title,
    description: data.description || 'Evento especial en nuestra comunidad. ¡No te lo pierdas!',
    date: dateStr,
    time: timeStr,
    direction: data.direction || 'Ubicación por confirmar',
    neighborhood: generateNeighborhood(data.location),
    category: generateCategory(data.title),
    banner_url: '/images/logo.jpg', // Imagen por defecto
    price: generatePrice(data.title, data.description),
    isFree,
    organizer: generateOrganizer(data.business_id),
    capacity: generateCapacity(data.title, data.description),
    tags: generateTags(data.title, data.description),
  };
};

export function useEventos(): UseEventosReturn {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar eventos futuros ordenados por fecha
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .not('title', 'is', null) // Solo eventos con título
        .not('title', 'eq', '') // Excluir títulos vacíos
        .gte('date', new Date().toISOString().split('T')[0]) // Solo eventos futuros
        .order('date', { ascending: true });

      if (fetchError) {
        throw new Error(`Error al cargar eventos: ${fetchError.message}`);
      }

      // Mapear datos de Supabase a la interfaz Event
      const mappedEventos = (data || []).map(mapSupabaseToEvent);
      setEventos(mappedEventos);

    } catch (err) {
      console.error('Error fetching eventos:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return {
    eventos,
    loading,
    error,
    refetch: fetchEventos,
  };
}

