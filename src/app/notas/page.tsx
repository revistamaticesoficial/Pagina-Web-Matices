'use client';

import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { usePagination } from '@/hooks/usePagination';
import { mockArticles } from '@/data/articles';
import LandingLayout from '@/components/layout/LandingLayout';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function NotasContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Mostrar 12 notas por página

  const pagination = usePagination({
    items: mockArticles,
    currentPage,
    itemsPerPage
  });

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

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003c56] to-[#005B82] text-white py-16">
          {/* Background Pattern */}
          {/* <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50"></div>
          </div> */}

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Notas de Matices
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
                Todas las noticias, historias y acontecimientos del Cerro de las Rosas
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
                Últimas Notas
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Mantente informado con todas las noticias, eventos y novedades del barrio Cerro de las Rosas
              </p>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
              {pagination.items.map((nota) => (
                <div key={nota.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    {/* Premium Badge */}
                    {nota.isPremium && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        PREMIUM
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(nota.category)}`}>
                        {nota.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {nota.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {nota.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(nota.publishedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{nota.readTime} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        <span>{nota.author}</span>
                      </div>
                    </div>

                    {/* Read Full Note Button */}
                    <Link href={`/notas/${nota.id}`}>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Leer Nota Completa</span>
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
                    className={`px-4 py-2 ${currentPage === page ? 'bg-indigo-600 text-white' : ''}`}
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
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}

export default function NotasPage() {
  return (
    <Suspense fallback={
      <LandingLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-gray-600">Cargando notas...</p>
          </div>
        </div>
      </LandingLayout>
    }>
      <NotasContent />
    </Suspense>
  );
}
