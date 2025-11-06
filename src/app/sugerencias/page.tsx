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
console.log(beneficiosQ);

  const [{ data: comercios }, { data: eventos }, { data: beneficios }] = await Promise.all([
    comerciosQ, eventosQ, beneficiosQ
  ]);
  // Mapear comercios del esquema de DB al tipo esperado por la UI
  const mappedComercios = (comercios ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    description: (c as any).description || '',
    logo: '',
    category: c.category || 'SERVICIOS',
    backgroundColor: '#ffffff',
    location: c.direction || 'Dirección no disponible',
    neighborhood: 'Zona Norte',
    contact: {
      phone: c.phone || ''
    },
    // Campos opcionales provenientes de Supabase
    slug: c.slug,
    logo_url: undefined,
    direction: c.direction || undefined,
    phone: c.phone || undefined,
  }))

  return {
    comercios: mappedComercios,
    eventos: eventos ?? [],
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

  console.log(beneficios);
  return (
    <SugerenciasClient
      initialComercios={comercios as unknown as Comercio[]}
      initialEventos={eventos as unknown as Event[]}
      initialBeneficios={beneficios as unknown as Benefit[]}
      initialTab={resolvedSearchParams?.tab && ['comercios', 'eventos', 'beneficios'].includes(resolvedSearchParams.tab) ? (resolvedSearchParams.tab as 'comercios' | 'eventos' | 'beneficios') : 'comercios'}
    />
  );
}
