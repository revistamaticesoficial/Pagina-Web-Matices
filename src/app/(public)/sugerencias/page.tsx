'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useTabNavigation } from '@/hooks/useTabNavigation';
import { usePagination } from '@/hooks/usePagination';
import { ComercioCard } from '@/app/sugerencias/components/ComercioCard';
import { EventCard } from '@/app/sugerencias/components/EventCard';
import { BenefitCard } from '@/app/sugerencias/components/BenefitCard';
import { Pagination } from '@/app/sugerencias/components/Pagination';
import { comerciosSugerencias } from '@/data/comercios-sugerencias';
import { eventos } from '@/data/eventos';
import { beneficios } from '@/data/beneficios';
import { TabType } from '@/types/sugerencias';

const categories = [
  { name: 'gastronomía' as TabType, label: 'GASTRONOMÍA', color: 'bg-blue-600 hover:bg-blue-700 hover:cursor-pointer' },
  { name: 'eventos' as TabType, label: 'EVENTOS', color: 'bg-orange-500 hover:bg-orange-600 hover:cursor-pointer' },
  { name: 'promociones' as TabType, label: 'PROMOCIONES', color: 'bg-green-600 hover:bg-green-700 hover:cursor-pointer' }
];

function SugerenciasContent() {
  const { currentTab, currentPage, setTab, setPage } = useTabNavigation();

  const eventosPagination = usePagination({ items: eventos, currentPage: currentTab === 'eventos' ? currentPage : 1, itemsPerPage: 10 });
  const beneficiosPagination = usePagination({ items: beneficios, currentPage: currentTab === 'promociones' ? currentPage : 1, itemsPerPage: 10 });
  const comerciosPagination = usePagination({ items: comerciosSugerencias, currentPage: currentTab === 'gastronomía' ? currentPage : 1, itemsPerPage: 10 });

  const getCurrentPaginationData = () => {
    switch (currentTab) {
      case 'eventos':
        return eventosPagination;
      case 'promociones':
        return beneficiosPagination;
      default:
        return comerciosPagination;
    }
  };

  const paginationData = getCurrentPaginationData();

  const renderCards = () => {
    switch (currentTab) {
      case 'eventos':
        return eventosPagination.items.map((evento) => (
          <EventCard key={evento.id} event={evento} />
        ));
      case 'promociones':
        return beneficiosPagination.items.map((beneficio) => (
          <BenefitCard key={beneficio.id} benefit={beneficio} />
        ));
      default:
        return comerciosPagination.items.map((comercio) => (
          <ComercioCard key={comercio.id} comercio={comercio} />
        ));
    }
  };

  const getGridCols = () => {
    if (currentTab === 'beneficios') {
      return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
    }
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 bg-gradient-to-r from-green-600/20 to-blue-600/20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/bg.jpg" alt="bg orange matices" fill className="object-cover opacity-80" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Matices se renueva</h1>
            <p className="text-xl lg:text-2xl text-white/90">Descubrí nuestra nueva imagen</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between max-w-4xl mx-auto">
            {categories.map((category) => (
              <Button
                key={category.name}
                size="lg"
                onClick={() => setTab(category.name)}
                className={`${currentTab === category.name ? category.color.replace('hover:', '') + ' shadow-lg' : category.color} text-white font-bold text-lg px-12 py-6 rounded-none flex-1 min-h-[80px] text-center transition-all duration-200`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentTab === 'comercios' && 'Comercios Sugeridos'}
              {currentTab === 'eventos' && 'Próximos Eventos'}
              {currentTab === 'beneficios' && 'Beneficios Disponibles'}
            </h2>
            <p className="text-gray-600">
              Mostrando {paginationData.items.length} de {paginationData.totalItems} resultados
              {paginationData.totalPages > 1 && ` - Página ${currentPage} de ${paginationData.totalPages}`}
            </p>
          </div>

          <div className={`grid ${getGridCols()} gap-6 max-w-7xl mx-auto`}>
            {renderCards()}
          </div>

          <Pagination currentPage={currentPage} totalPages={paginationData.totalPages} onPageChange={setPage} />
        </div>
      </section>
    </div>
  );
}

export default function SugerenciasPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SugerenciasContent />
    </Suspense>
  );
}

