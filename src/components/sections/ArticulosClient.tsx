'use client'

import { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { usePagination } from '@/hooks/usePagination';
import type { Database } from '@/types/database';

type Article = Database['public']['Tables']['articles']['Row'];

interface ArticulosClientProps {
  initialArticles: Article[];
  total: number;
  hasMore: boolean;
}

export default function ArticulosClient({ initialArticles, total, hasMore }: ArticulosClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const pagination = usePagination({
    items: initialArticles,
    currentPage,
    itemsPerPage
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Próximamente';
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
      'EDUCACION': 'bg-indigo-100 text-indigo-800',
      'CULTURA': 'bg-purple-100 text-purple-800',
      'INFRAESTRUCTURA': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
        {pagination.items.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
              {article.featured_image_url ? (
                <Image 
                  src={article.featured_image_url} 
                  alt={article.title} 
                  width={300} 
                  height={200} 
                  className="object-cover w-full h-full" 
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-700 font-medium text-sm">Artículo Destacado</p>
                    </div>
                  </div>
                </>
              )}

              {/* Premium Badge */}
              {article.is_premium && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  PREMIUM
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {article.excerpt || 'Sin descripción'}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{article.read_time || 5} min</span>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  <span>{article.author_name || 'Redacción Matices'}</span>
                </div>
              </div>

              {/* Read Full Article Button */}
              <Link href={`/articulos/${article.slug}`}>
                <Button className="w-full bg-gradient-to-r from-[#005B82] to-[#003C56] hover:from-[#004D6E] hover:to-[#002839] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Leer Artículo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          <Button
            variant={currentPage === 1 ? "outline" : "default"}
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2"
          >
            Anterior
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 ${currentPage === page ? 'bg-[#005B82] text-white' : ''}`}
            >
              {page}
            </Button>
          ))}

          <Button
            variant={currentPage === pagination.totalPages ? "outline" : "default"}
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-4 py-2"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </>
  );
}

