import SugerenciasClient from '@/components/screens/sugerencias/SugerenciasClient';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { Comercio, Event, Benefit } from '@/types/sugerencias';

export const revalidate = 60;

async function loadData() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const comerciosQ = supabase
    .from('comercios')
    .select('*')
    .eq('category', 'GASTRONOMIA')
    .not('name','is',null)
    .not('name','eq','')
    .order('created_at',{ ascending:false })
    .limit(24);

  const eventosQ = supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(24);

  const beneficiosQ = supabase
    .from('benefits')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(24);

  const [{ data: comercios }, { data: eventos }, { data: beneficios }] = await Promise.all([
    comerciosQ, eventosQ, beneficiosQ
  ]);
  // Mapear comercios del esquema de DB al tipo esperado por la UI
  const mappedComercios = (comercios ?? []).map((c) => {
    const comercioData = c as any;
    return {
      id: c.id,
      name: c.name,
      description: comercioData.description || '',
      logo: comercioData.logo_url || '',
      category: c.category || 'SERVICIOS',
      backgroundColor: '#ffffff',
      location: c.direction || 'Dirección no disponible',
      neighborhood: 'Zona Norte',
      contact: {
        phone: c.phone || ''
      },
      // Campos opcionales provenientes de Supabase
      slug: c.slug,
      logo_url: comercioData.logo_url || undefined,
      direction: c.direction || undefined,
      phone: c.phone || undefined,
    };
  })

  // Mapear eventos del esquema de DB al tipo esperado por la UI
  const mappedEventos = (eventos ?? []).map((e) => {
    const eventData = e as any;
    return {
      id: e.id,
      title: e.title,
      description: e.description || '',
      date: e.date,
      time: '18:00', // Valor por defecto, ajustar según necesidad
      direction: e.location || 'Ubicación no disponible',
      neighborhood: 'Zona Norte', // Valor por defecto
      category: 'EVENTOS', // Valor por defecto
      banner_url: eventData.banner_url || '',
      price: undefined, // Valor por defecto
      isFree: true, // Valor por defecto
      organizer: 'Organizador', // Valor por defecto
      capacity: undefined, // Valor por defecto
      tags: [], // Valor por defecto
    };
  });

  return {
    comercios: mappedComercios,
    eventos: mappedEventos,
    beneficios: (beneficios ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || '',
      discount: row.title.slice(0, 3),
      type: row.type,
      business: 'Comercio',
      businessLogo: row.banner_url  || '',
      banner_url: row.banner_url,
      code: row.id,
      validUntil: row.valid_to,
      image: '/images/logo.jpg',
      terms: [],
      isActive: row.expires_at ? new Date(row.expires_at).getTime() >= Date.now() : true,
      usageLimit: typeof row.quantity === 'number' ? row.quantity : undefined,
    })),
  };
}

export default async function SugerenciasPage({ searchParams }: { searchParams: Promise<{ tab: string }> }) {
  const { comercios, eventos, beneficios } = await loadData();
  const resolvedSearchParams = await searchParams;

  return (
    <SugerenciasClient
      initialComercios={comercios as unknown as Comercio[]}
      initialEventos={eventos as unknown as Event[]}
      initialBeneficios={beneficios as unknown as Benefit[]}
      initialTab={resolvedSearchParams?.tab && ['comercios', 'eventos', 'beneficios'].includes(resolvedSearchParams.tab) ? (resolvedSearchParams.tab as 'comercios' | 'eventos' | 'beneficios') : 'comercios'}
    />
  );
}