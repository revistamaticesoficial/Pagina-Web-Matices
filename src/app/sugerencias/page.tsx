'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/Button';
import { useTabNavigation } from '@/hooks/useTabNavigation';
import { usePagination } from '@/hooks/usePagination';
import { ComercioCard } from './components/ComercioCard';
import { EventCard } from './components/EventCard';
import { BenefitCard } from './components/BenefitCard';
import { Pagination } from './components/Pagination';
import { comerciosSugerencias } from '@/data/comercios-sugerencias';
import { eventos } from '@/data/eventos';
import { beneficios } from '@/data/beneficios';
import { TabType } from '@/types/sugerencias';

const categories = [
  { name: 'gastronomía' as TabType, label: 'GASTRONOMÍA', color: 'bg-[#005B82] text-white bg-gradient-to-r from-[#005B82] via-[#004D6E] to-[#003C56] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' },
  { name: 'eventos' as TabType, label: 'EVENTOS', color: 'bg-[#F58220] text-white bg-gradient-to-r from-[#FA780A] via-[#D96400] to-[#D96400] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' },
  { name: 'promociones' as TabType, label: 'PROMOCIONES', color: 'bg-[#3BA740] text-white bg-gradient-to-r from-[#1AA221] via-[#1D8422] to-[#1D8422] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' }
];

function SugerenciasContent() {
  const { currentTab, currentPage, setTab, setPage } = useTabNavigation();

  // Get pagination data for each tab separately
  const eventosPagination = usePagination({
    items: eventos,
    currentPage: currentTab === 'eventos' ? currentPage : 1,
    itemsPerPage: 10
  });

  const beneficiosPagination = usePagination({
    items: beneficios,
    currentPage: currentTab === 'promociones' ? currentPage : 1,
    itemsPerPage: 10
  });

  const comerciosPagination = usePagination({
    items: comerciosSugerencias,
    currentPage: currentTab === 'gastronomía' ? currentPage : 1,
    itemsPerPage: 10
  });

  // Get current pagination data
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
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600/20 to-blue-600/20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/videosug/sugerencia.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Matices se renueva
            </h1>
            <p className="text-xl lg:text-2xl text-white/90">
              Descubrí nuestra nueva imagen
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between max-w-4xl mx-auto">
            {categories.map((category) => (
              <Button
                key={category.name}
                size="lg"
                onClick={() => setTab(category.name)}
                className={`${
                  currentTab === category.name 
                    ? category.color.replace('hover:', '') + ' shadow-lg' 
                    : category.color
                } text-white font-bold text-lg px-12 rounded-md py-6 flex-1 min-h-[80px] text-center transition-all duration-200`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Results Info */}
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

          {/* Cards Grid */}
          <div className={`grid ${getGridCols()} gap-6 max-w-7xl mx-auto`}>
            {renderCards()}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={setPage}
          />
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
