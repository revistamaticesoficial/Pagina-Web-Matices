import Image from 'next/image';
import ButtonDownloadPDFsEdtions from '@/components/ButtonDownloadPDFsEdtions';

interface Edition {
  id: string;
  month: string;
  year: string;
  image: string;
  title: string;
  filename: string;
}

const editions: Edition[] = [
  {
    id: 'octubre-2025',
    month: 'Octubre',
    year: '2025',
    image: '/images/ediciones/octubre2025.png',
    title: 'Año 35 - Nro. 417',
    filename: 'octubre2025.pdf',
  },
  {
    id: 'septiembre-2025',
    month: 'Septiembre',
    year: '2025',
    image: '/images/ediciones/septiembre2025.png',
    title: 'Año 35 - Nro. 416',
    filename: 'septiembre2025.pdf',
  },
  {
    id: 'agosto-2025',
    month: 'Agosto',
    year: '2025',
    image: '/images/ediciones/agosto2025.png',
    title: 'Año 35 - Nro. 415',
    filename: 'agosto2025.pdf',
  },  
  {
    id: 'julio-2025',
    month: 'Julio',
    year: '2025',
    image: '/images/ediciones/julio2025.png',
    title: 'Año 35 - Nro. 414',
    filename: 'julio2025.pdf'
  },
  {
    id: 'junio-2025',
    month: 'Junio',
    year: '2025',
    image: '/images/ediciones/junio2025.png',
    title: 'Año 35 - Nro. 413',
    filename: 'junio2025.pdf'
  }
];

export default function EditionSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {editions.map((edition) => (
            <div
              key={edition.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={edition.image}
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
                  {edition.month} {edition.year}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {edition.title}
                </p>                
                <div className="mt-4 flex gap-2 transition-all duration-300">
                  <ButtonDownloadPDFsEdtions filename={edition.filename} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}