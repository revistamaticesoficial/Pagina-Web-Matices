import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import EditionsGallery, { type GalleryEdition } from '@/components/sections/EditionsGallery';

async function loadEditions(): Promise<GalleryEdition[]> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('editions')
    .select('*')
    .order('position', { ascending: true })
    .order('year', { ascending: false });

  if (error) {
    console.error('Error loading editions:', error);
    return [];
  }

  return (data || []).map((edition) => ({
    id: edition.id,
    month: edition.month,
    year: edition.year,
    image: edition.image || '/images/logo.jpg',
    title: edition.title,
    filename: edition.filename || `${edition.month.toLowerCase()}${edition.year}.pdf`,
    pdf_url: edition.pdf_url,
    flipbook_url: edition.flipbook_url,
  }));
}

export default async function EditionSection() {
  const editions = await loadEditions();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EDICIONES
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            En esta sección agrupamos todos los números pasados de la Revista Matices, 
            podés descargar la versión digital o leer las notas de ese número.
          </p>
        </div>

        {editions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay ediciones disponibles aún.</p>
          </div>
        ) : (
          <EditionsGallery editions={editions} />
        )}
      </div>
    </section>
  );
}
