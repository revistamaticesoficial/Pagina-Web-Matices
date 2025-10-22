import GuiaNorteClient from '@/components/screens/guianorte/GuiaNorteClient';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

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
  return {
    comercios: comercios ?? [],
    eventos: eventos ?? [],
    beneficios: (beneficios ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || '',
      discount: row.title.slice(0, 3),
      type: row.type,
      business: 'Comercio',
      businessLogo: '/comida/Pizza.mp4',
      code: row.id,
      validUntil: row.valid_to,
      image: '/images/logo.jpg',
      terms: [],
      isActive: row.expires_at ? new Date(row.expires_at).getTime() >= Date.now() : true,
      usageLimit: typeof row.quantity === 'number' ? row.quantity : undefined,
    })),
  };
}

export default async function GuiaNortePage({ searchParams }: { searchParams: { tab: string } }) {
  const { comercios, eventos, beneficios } = await loadData();
  return (
    <GuiaNorteClient
      initialComercios={comercios as any[]}
      initialEventos={eventos as any[]}
      initialBeneficios={beneficios as any[]}
      initialTab={searchParams?.tab && (searchParams?.tab as 'comercios' | 'eventos' | 'promociones')}
    />
  );
}
