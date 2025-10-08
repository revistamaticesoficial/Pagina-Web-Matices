'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Comercio } from '@/types/sugerencias';

interface UseComerciosReturn {
  comercios: Comercio[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const mapSupabaseToComercio = (data: any): Comercio => {
  const socialMedia = data.social_media || {};
  const contact = {
    phone: data.phone || undefined,
    email: socialMedia.email || undefined,
    website: socialMedia.website || socialMedia.instagram || undefined,
  };

  // Usar tags como services, o generar algunos por defecto
  const services = data.tags && data.tags.length > 0 
    ? data.tags 
    : ['Servicio Local', 'Atención Personalizada'];


  return {
    id: data.id,
    name: data.name,
    description: data.description,
    logo: "/images/logo.jpg", // Logo por defecto
    category: data.category?.toUpperCase() || 'GASTRONOMÍA',
    backgroundColor: "bg-[#010101]",
    location: data.direction || 'Dirección no disponible',
    neighborhood: 'Zona Norte', // Por defecto, se puede mejorar con geocoding
    contact: Object.keys(contact).length > 0 ? contact : undefined,
    services,
  };
};

export function useComercios(category?: string): UseComerciosReturn {
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComercios = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('comercios')
        .select('*')
        .not('name', 'is', null) // Solo comercios con nombre
        .not('name', 'eq', '') // Excluir nombres vacíos
        .order('created_at', { ascending: false });

      // Filtrar por categoría si se especifica (búsqueda flexible)
      if (category) {
        query = query.ilike('category', `%${category}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw new Error(`Error al cargar comercios: ${fetchError.message}`);
      }

      // Mapear datos de Supabase a la interfaz Comercio
      const mappedComercios = (data || []).map(mapSupabaseToComercio);
      setComercios(mappedComercios);

    } catch (err) {
      console.error('Error fetching comercios:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setComercios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComercios();
  }, [category]);

  return {
    comercios,
    loading,
    error,
    refetch: fetchComercios,
  };
}
