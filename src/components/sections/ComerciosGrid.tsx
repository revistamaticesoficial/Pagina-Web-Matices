'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Database } from '@/types/database';

type Business = Database['public']['Tables']['comercios']['Row'];

interface ComerciosGridProps {
  comercios: Business[];
  itemsPerPage?: number;
}

export function ComerciosGrid({ comercios, itemsPerPage = 12 }: ComerciosGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedComercios, setDisplayedComercios] = useState<Business[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedComercios(comercios.slice(startIndex, endIndex));
  }, [comercios, currentPage, itemsPerPage]);

  // Listen for page changes from parent
  useEffect(() => {
    const handlePageChange = (event: CustomEvent) => {
      setCurrentPage(event.detail.page);
    };

    window.addEventListener('comercios-page-change', handlePageChange as EventListener);
    return () => {
      window.removeEventListener('comercios-page-change', handlePageChange as EventListener);
    };
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'NOTICIAS': 'bg-blue-100 text-blue-800',
      'GASTRONOMIA': 'bg-orange-100 text-orange-800',
      'SERVICIOS': 'bg-green-100 text-green-800',
      'ENTRETENIMIENTO': 'bg-purple-100 text-purple-800',
      'DEPORTES': 'bg-red-100 text-red-800',
      'INMOBILIARIA': 'bg-yellow-100 text-yellow-800',
      'SALUD': 'bg-pink-100 text-pink-800',
      'EDUCACION': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (comercios.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No hay comercios disponibles</p>
      </div>
    );
  }

  return (
    <div 
      data-comercios-grid
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12"
    >
      {displayedComercios.map((comercio) => {
        const createdAt = comercio.created_at ?? new Date().toISOString();
        const owner = comercio.owner_id ?? 'Matices';
        const slug = comercio.slug;
        const category = comercio.category ?? 'SERVICIOS';
        const isPremium = false; // Por defecto no es premium
        
        if (!slug) return null;
        
        return (
          <div 
            key={comercio.id} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-gray-700 font-medium text-sm">Comercio Destacado</p>
                        </div>
                      </div>
                    </div>
                </div>

              {/* Premium Badge */}
              {isPremium && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  PREMIUM
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                  {category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                {comercio.name}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {comercio.direction || 'Sin dirección disponible'}
              </p>

              {/* Meta Information */}
              {/* <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Disponible</span>
                  </div>
                </div>
              </div> */}

              {/* Read Full Note Button */}
              <Link href={`/comercios/${slug}`}>
                <Button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Ver Comercio</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
