'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TodosLosNumerosPage() {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
  };
  const todasLasEdiciones = [
    {
      imageUrl: '/images/ediciones/agosto2025.png',
      edicionDate: 'agosto 2025',
      numeroEdicion: 'Año 35 - Nro 406',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/08/Matices-Agosto-Web.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/406/',
    },
    {
      imageUrl: '/images/ediciones/julio2025.png',
      edicionDate: 'julio 2025',
      numeroEdicion: 'Año 35 - Nro 405',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/07/maticesjulio25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/405/'
    },
    {
      imageUrl: '/images/ediciones/junio2025.png',
      edicionDate: 'junio 2025',
      numeroEdicion: 'Año 35 - Nro 404',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/06/maticesjunio25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/404/'
    },
    {
      imageUrl: '/images/ediciones/mayo2025.png',   
      edicionDate: 'mayo 2025',
      numeroEdicion: 'Año 35 - Nro 403',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/05/maticesmayo25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/403/'
    },
    {
      imageUrl: '/images/ediciones/abril2025.png',  
      edicionDate: 'abril 2025',
      numeroEdicion: 'Año 35 - Nro 402',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/04/maticesabril25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/402/'
    },
    {
      imageUrl: '/images/ediciones/marzo2025.png',  
      edicionDate: 'marzo 2025',
      numeroEdicion: 'Año 35 - Nro 401',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/03/maticesmarzo25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/401/'
    },
    {
      imageUrl: '/images/ediciones/febrero2025.png',                
      edicionDate: 'febrero 2025',
      numeroEdicion: 'Año 35 - Nro 400',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/02/maticesfebrero25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/400/'
    },
    {
      imageUrl: '/images/ediciones/enero2025.png',      
      edicionDate: 'enero 2025',
      numeroEdicion: 'Año 35 - Nro 399',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2025/01/maticesenero25.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/399/'
    },
    {
      imageUrl: '/images/ediciones/diciembre2024.png',  
      edicionDate: 'diciembre 2024',
      numeroEdicion: 'Año 35 - Nro 398',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2024/12/maticesdiciembre24.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/398/'
    },
    {
      imageUrl: '/images/ediciones/noviembre2024.png',      
      edicionDate: 'noviembre 2024',
      numeroEdicion: 'Año 35 - Nro 397',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2024/11/maticesnoviembre24.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/397/'
    },
    {
      imageUrl: '/images/ediciones/octubre2024.png',        
      edicionDate: 'octubre 2024',
      numeroEdicion: 'Año 35 - Nro 396',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2024/10/maticesoctubre24.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/396/'
    },
    {
      imageUrl: '/images/ediciones/septiembre2024.png', 
      edicionDate: 'septiembre 2024',
      numeroEdicion: 'Año 35 - Nro 395',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2024/09/maticesseptiembre24.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/395/'
    },
    {
      imageUrl: '/images/ediciones/agosto2024.png', 
      edicionDate: 'agosto 2024',
      numeroEdicion: 'Año 35 - Nro 394',
      digitalUrl: 'https://www.revistamaticescba.com/wp-content/uploads/2024/08/maticesagosto24.pdf',
      notasUrl: 'https://www.revistamaticescba.com/numero/394/'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section con Logo */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 relative">
        {/* Logo en esquina superior izquierda */}
        <div className="absolute top-6 left-6 z-10">
          <Image 
            src="/images/logotipo.png" 
            alt="Logo Revista Matices" 
            width={120} 
            height={60}
            className="filter brightness-0 invert"
          />
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Todos los Números
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Descubre toda la colección de Revista Matices desde 1990 hasta la actualidad, en esta sección agrupamos todos los números pasados de la Revista Matices, podés descargar la versión digital o leer las notas de ese número.
          </p>
        </div>
      </section>

      {/* Sección de Ediciones */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {todasLasEdiciones.map((edicion, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                {imageErrors[edicion.imageUrl] ? (
                  <div className="w-full h-72 bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📄</div>
                      <div className="text-sm">Imagen no disponible</div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={edicion.imageUrl}
                    alt={edicion.edicionDate}
                    width={280}
                    height={360}
                    className="w-full h-72 object-contain bg-gray-50"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    onError={() => handleImageError(edicion.imageUrl)}
                  />
                )}
                {/* Overlay para mejor legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {edicion.edicionDate}
                </h3>
                <p className="text-sm text-gray-600 mb-5">{edicion.numeroEdicion}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={edicion.digitalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium hover:underline text-sm px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Versión Digital
                  </a>
                  <a
                    href={edicion.notasUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline text-sm px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Ver Notas
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
