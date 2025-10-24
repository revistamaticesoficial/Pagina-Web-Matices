import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import LandingLayout from '@/components/layout/LandingLayout';
import { ComerciosGrid, ComerciosPagination } from '@/components/sections';

type Business = Database['public']['Tables']['comercios']['Row'];

// Configuración de revalidación
export const revalidate = 60; // Revalidar cada 60 segundos

async function loadComercios(): Promise<Business[]> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('comercios')
    .select('*')
    .not('slug', 'is', null)
    .not('slug', 'eq', '')
    .not('name', 'is', null)
    .not('name', 'eq', '')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comercios:', error);
    return [];
  }

  return data || [];
}

export default async function ComerciosPage() {
  const comercios = await loadComercios();

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003c56] to-[#005B82] text-white py-16">
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Comercios de Matices
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
                Todos los comercios del Cerro de las Rosas
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Últimos Comercios
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Encuentra todos los comercios del barrio Cerro de las Rosas
              </p>
            </div>

            {/* Comercios Grid - Server Component */}
            <ComerciosGrid comercios={comercios} />

            {/* Pagination - Client Component */}
            <ComerciosPagination totalItems={comercios.length} itemsPerPage={12} />
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}


