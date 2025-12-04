import Image from 'next/image';
import ButtonDownloadPDFsEdtions from '@/components/ButtonDownloadPDFsEdtions';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

interface Edition {
  id: string;
  month: string;
  year: number;
  image: string;
  title: string;
  filename: string | null;
  pdf_url: string | null;
}

async function loadEditions(): Promise<Edition[]> {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('editions')
    .select('*')
    .order('year', { ascending: false })
    .order('month', { ascending: false });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {editions.map((edition) => (
              <div
                key={edition.id}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={edition.image || '/images/logo.jpg'}
                    alt={`Revista Matices - ${edition.month} ${edition.year}`}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {edition.month} {edition.year.toString()}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {edition.title}
                  </p>                
                  <div className="mt-4 flex gap-2 transition-all duration-300">
                    {edition.pdf_url ? (
                      <a
                        href={edition.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={edition.filename || `${edition.month.toLowerCase()}${edition.year}.pdf`}
                        className="flex-1"
                      >
                        <button className="w-full bg-gradient-to-br from-[#005B82] to-[#003C56] text-white hover:text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                          Descargar
                        </button>
                      </a>
                    ) : (
                      <p className="text-sm text-gray-400">PDF no disponible</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
