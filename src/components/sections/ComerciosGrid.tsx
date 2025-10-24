'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Database } from '@/types/database';
import ComercioCard from '../screens/sugerencias/ComercioCard';

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
        const slug = comercio.slug;
        
        if (!slug) return null;
        
        return (
          <ComercioCard key={comercio.id} comercio={comercio as Comercio} />
        );
      })}
    </div>
  );
}
