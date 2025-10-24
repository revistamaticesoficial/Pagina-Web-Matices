import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import LandingLayout from '@/components/layout/LandingLayout';
import { ComercioDetailContent } from '@/components/sections/ComercioDetailContent';
import { notFound } from 'next/navigation';

type Business = Database['public']['Tables']['comercios']['Row'];
type Benefit = Database['public']['Tables']['benefits']['Row'];

// Configuración de revalidación
export const revalidate = 60; // Revalidar cada 60 segundos

async function loadComercio(slug: string): Promise<Business | null> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('comercios')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Error cargando comercio:', error);
    return null;
  }

  return data;
}

async function loadBenefits(comercioId: string): Promise<Benefit[]> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('benefits')
    .select('*')
    .eq('comercio_id', comercioId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error cargando beneficios:', error);
    return [];
  }

  return data || [];
}

export default async function ComercioDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const comercio = await loadComercio(resolvedParams.slug);
  
  if (!comercio) {
    notFound();
  }

  const benefits = await loadBenefits(comercio.id);

  return (
    <LandingLayout>
      <ComercioDetailContent comercio={comercio} benefits={benefits} />
    </LandingLayout>
  );
}
