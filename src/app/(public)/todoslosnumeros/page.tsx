'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TodosLosNumerosPage() {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const handleImageError = (imageUrl: string) => setImageErrors(prev => ({ ...prev, [imageUrl]: true }));

  const todasLasEdiciones = [
    { imageUrl: '/images/ediciones/agosto2025.png', edicionDate: 'agosto 2025', numeroEdicion: 'Año 35 - Nro 406', digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/08/Matices-Agosto-Web.pdf', notasUrl: 'https://www.revistamaticescba.com/numero/406/' },
    { imageUrl: '/images/ediciones/julio2025.png', edicionDate: 'julio 2025', numeroEdicion: 'Año 35 - Nro 405', digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/07/maticesjulio25.pdf', notasUrl: 'https://www.revistamaticescba.com/numero/405/' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 relative">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Todos los Números</h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">Descubre toda la colección de Revista Matices...</p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {todasLasEdiciones.map((edicion, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                {imageErrors[edicion.imageUrl] ? (
                  <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📄</div>
                      <div className="text-sm">Imagen no disponible</div>
                    </div>
                  </div>
                ) : (
                  <Image src={edicion.imageUrl} alt={edicion.edicionDate} width={280} height={360} className="w-full h-72 object-contain bg-gray-50" onError={() => handleImageError(edicion.imageUrl)} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{edicion.edicionDate}</h3>
                <p className="text-sm text-gray-600 mb-5">{edicion.numeroEdicion}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a href={edicion.digitalUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline text-sm px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">Versión Digital</a>
                  <a href={edicion.notasUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline text-sm px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">Ver Notas</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

