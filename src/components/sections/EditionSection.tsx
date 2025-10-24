import Image from 'next/image';

interface Edition {
  id: string;
  month: string;
  year: string;
  image: string;
  title: string;
}

const editions: Edition[] = [
  {
    id: 'enero-2025',
    month: 'Enero',
    year: '2025',
    image: '/images/ediciones/enero2025.png',
    title: 'Año 35 - Nro. 408'
  },
  {
    id: 'febrero-2025',
    month: 'Febrero',
    year: '2025',
    image: '/images/ediciones/febrero2025.png',
    title: 'Año 35 - Nro. 409'
  },
  {
    id: 'marzo-2025',
    month: 'Marzo',
    year: '2025',
    image: '/images/ediciones/marzo2025.png',
    title: 'Año 35 - Nro. 410'
  },
  {
    id: 'abril-2025',
    month: 'Abril',
    year: '2025',
    image: '/images/ediciones/abril2025.png',
    title: 'Año 35 - Nro. 411'
  },
  {
    id: 'mayo-2025',
    month: 'Mayo',
    year: '2025',
    image: '/images/ediciones/mayo2025.png',
    title: 'Año 35 - Nro. 412'
  },
  {
    id: 'junio-2025',
    month: 'Junio',
    year: '2025',
    image: '/images/ediciones/junio2025.png',
    title: 'Año 35 - Nro. 413'
  },
  {
    id: 'julio-2025',
    month: 'Julio',
    year: '2025',
    image: '/images/ediciones/julio2025.png',
    title: 'Año 35 - Nro. 414'
  },
  {
    id: 'agosto-2025',
    month: 'Agosto',
    year: '2025',
    image: '/images/ediciones/agosto2025.png',
    title: 'Año 35 - Nro. 415'
  }
];

export default function EditionSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EDICIONES
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            En esta sección agrupamos todos los números pasados de la Revista Matices, 
            podés descargar la versión digital o leer las notas de ese número.
          </p>
        </div>

        {/* Editions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {editions.map((edition) => (
            <div
              key={edition.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={edition.image}
                  alt={`Revista Matices - ${edition.month} ${edition.year}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Download icon on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {edition.month} {edition.year}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {edition.title}
                </p>
                
                {/* Action buttons */}
                <div className="mt-4 flex gap-2 transition-all duration-300">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                    Ver notas
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}