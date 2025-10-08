'use client';

import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useTabNavigation } from '@/hooks/useTabNavigation';
import { usePagination } from '@/hooks/usePagination';
import { useComercios } from '@/hooks/useComercios';
import { eventos } from '@/data/eventos';
import { beneficios } from '@/data/beneficios';
import { TabType, Benefit } from '@/types/sugerencias';
import LandingLayout from '@/components/layout/LandingLayout';
import { EventCard, BenefitCard, ComercioCard, Pagination, ModalPromo } from '@/components/screens/sugerencias';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const categories = [
  { name: 'comercios' as TabType, label: 'GASTRONOMÍA', color: 'bg-[#005B82] text-white bg-gradient-to-r from-[#005B82] via-[#004D6E] to-[#003C56] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' },
  { name: 'eventos' as TabType, label: 'EVENTOS', color: 'bg-[#F58220] text-white bg-gradient-to-r from-[#FA780A] via-[#D96400] to-[#D96400] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' },
  { name: 'beneficios' as TabType, label: 'PROMOCIONES', color: 'bg-[#3BA740] text-white bg-gradient-to-r from-[#1AA221] via-[#1D8422] to-[#1D8422] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' }
];

function SugerenciasContent() {
  const { currentTab, currentPage, setTab, setPage } = useTabNavigation();
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);

  // Hook para cargar comercios de Supabase
  const { comercios, loading: comerciosLoading, error: comerciosError } = useComercios('gastronomía');

  // Get pagination data for each tab separately
  const eventosPagination = usePagination({
    items: eventos,
    currentPage: currentTab === 'eventos' ? currentPage : 1,
    itemsPerPage: 10
  });

  const beneficiosPagination = usePagination({
    items: beneficios,
    currentPage: currentTab === 'beneficios' ? currentPage : 1,
    itemsPerPage: 10
  });

  const comerciosPagination = usePagination({
    items: comercios,
    currentPage: currentTab === 'comercios' ? currentPage : 1,
    itemsPerPage: 10
  });

  // Get current pagination data
  const getCurrentPaginationData = () => {
    switch (currentTab) {
      case 'eventos':
        return eventosPagination;
      case 'beneficios':
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
      case 'beneficios':
        return beneficiosPagination.items.map((beneficio) => (
          <BenefitCard key={beneficio.id} benefit={beneficio} onRedeem={(b) => { setSelectedBenefit(b); setIsRedeemOpen(true); }} />
        ));
      case 'comercios':
        // Mostrar loading para comercios
        if (comerciosLoading) {
          return (
            <div className="col-span-full flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          );
        }
        
        // Mostrar error para comercios
        if (comerciosError) {
          return (
            <div className="col-span-full text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-lg font-semibold">Error al cargar comercios</p>
                <p className="text-sm text-gray-600">{comerciosError}</p>
              </div>
            </div>
          );
        }
        
        // Mostrar mensaje si no hay comercios
        if (comerciosPagination.items.length === 0) {
          return (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-lg font-semibold">No hay comercios disponibles</p>
                <p className="text-sm">Pronto agregaremos más opciones gastronómicas</p>
              </div>
            </div>
          );
        }
        
        // Mostrar comercios
        return comerciosPagination.items.map((comercio) => (
          <ComercioCard key={comercio.id} comercio={comercio} />
        ));
      default:
        return null;
    }
  };

  const getGridCols = () => {
    if (currentTab === 'beneficios') {
      return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3';
    }
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-r from-green-600/20 to-blue-600/20 overflow-hidden">
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
                  className={`${currentTab === category.name
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
                {currentTab === 'comercios' && comerciosLoading ? (
                  'Cargando comercios...'
                ) : (
                  <>
                    Mostrando {paginationData.items.length} de {paginationData.totalItems} resultados
                    {paginationData.totalPages > 1 && ` - Página ${currentPage} de ${paginationData.totalPages}`}
                  </>
                )}
              </p>
            </div>

            {/* Cards Grid */}
            <div className={`grid ${getGridCols()} gap-8 max-w-7xl mx-auto`}>
              {renderCards()}
            </div>

            {/* Pagination */}
            {!(currentTab === 'comercios' && comerciosLoading) && (
              <Pagination
                currentPage={currentPage}
                totalPages={paginationData.totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </section>
      </div>

      <ModalPromo isRedeemOpen={isRedeemOpen} setIsRedeemOpen={setIsRedeemOpen} selectedBenefit={selectedBenefit} />
    </LandingLayout>
  );
}

export default function SugerenciasPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SugerenciasContent />
    </Suspense>
  );
}
