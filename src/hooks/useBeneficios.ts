 'use client';

 import { useEffect, useState } from 'react';
 import { supabase } from '@/lib/supabase';
 import { Benefit } from '@/types/sugerencias';

 interface UseBeneficiosReturn {
   beneficios: Benefit[];
   loading: boolean;
   error: string | null;
   refetch: () => Promise<void>;
 }

 // Mapear fila de Supabase (public.benefits) a la interfaz UI Benefit
 const mapSupabaseToBenefit = (row: any): Benefit => {
   const expiresAt = row.expires_at ? new Date(row.expires_at) : null;
   const isActive = expiresAt ? expiresAt.getTime() >= Date.now() : true;

   // Derivar valores para UI
   const discountLabel = row.type === 'coupon' ? 'CUPÓN' : 'SORTEO';
   const validUntil = expiresAt ? expiresAt.toISOString().split('T')[0] : new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

   return {
     id: row.id,
     title: row.title,
     description: row.description || '',
     business: 'Comercio', // Opcional: hacer join para traer el nombre real
     businessLogo: '', // Opcional: video/imagen si existe en tu modelo
     discount: discountLabel,
     discountPercentage: undefined,
     code: row.id, // Fallback simple
     validUntil,
     category: row.type === 'coupon' ? 'Cupón' : 'Sorteo',
     image: '/images/logo.jpg',
     terms: [],
     isActive,
     usageLimit: typeof row.quantity === 'number' ? row.quantity : undefined,
   };
 };

 export function useBeneficios(): UseBeneficiosReturn {
   const [beneficios, setBeneficios] = useState<Benefit[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const fetchBeneficios = async () => {
     try {
       setLoading(true);
       setError(null);

       // Cargar todos los beneficios (puedes filtrar por activos si lo deseas)
       const { data, error: fetchError } = await supabase
         .from('benefits')
         .select('*')
         .order('created_at', { ascending: false });
        
        console.log("beneficios", data);
       if (fetchError) {
         throw new Error(`Error al cargar beneficios: ${fetchError.message}`);
       }

       const mapped = (data || []).map(mapSupabaseToBenefit);
       console.log("mapped", mapped);
       setBeneficios(mapped);
     } catch (err) {
       console.error('Error fetching beneficios:', err);
       setError(err instanceof Error ? err.message : 'Error desconocido');
       setBeneficios([]);
     } finally {
       setLoading(false);
     }
   };

   useEffect(() => {
     fetchBeneficios();
   }, []);

   return {
     beneficios,
     loading,
     error,
     refetch: fetchBeneficios,
   };
 }


