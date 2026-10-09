"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BookOpen, X } from 'lucide-react';

export interface GalleryEdition {
  id: string;
  month: string;
  year: number;
  image: string;
  title: string;
  filename: string | null;
  pdf_url: string | null;
  flipbook_url: string | null;
}

export default function EditionsGallery({ editions }: { editions: GalleryEdition[] }) {
  const [active, setActive] = useState<GalleryEdition | null>(null);

  // Cerrar con Escape y bloquear el scroll del fondo mientras el modal está abierto
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {editions.map((edition) => {
          const canRead = Boolean(edition.flipbook_url);
          return (
            <div
              key={edition.id}
              onClick={canRead ? () => setActive(edition) : undefined}
              onKeyDown={canRead ? (e) => { if (e.key === 'Enter') setActive(edition); } : undefined}
              role={canRead ? 'button' : undefined}
              tabIndex={canRead ? 0 : undefined}
              aria-label={canRead ? `Leer Revista Matices ${edition.month} ${edition.year}` : undefined}
              className={`group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${canRead ? 'cursor-pointer' : ''}`}
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

                {canRead && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg" title="Leer online">
                      <BookOpen className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                )}
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
                      onClick={(e) => e.stopPropagation()}
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
          );
        })}
      </div>

      {active && active.flipbook_url && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-2 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Revista Matices ${active.month} ${active.year}`}
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-lg font-bold text-gray-900">
                {active.month} {active.year} · {active.title}
              </h2>
              <button
                onClick={() => setActive(null)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe
              src={active.flipbook_url}
              title={`Revista Matices ${active.month} ${active.year}`}
              className="h-full w-full flex-1 border-0"
              allow="fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
