 'use client';

 import { useState, useRef } from 'react';
 import { Button } from '@/components/ui/Button';
 import LandingLayout from '@/components/layout/LandingLayout';
 import { EventCard, BenefitCard, ComercioCard, Pagination, ModalPromo } from '@/components/screens/sugerencias';
 import { Benefit } from '@/types/sugerencias';
 import HeroSugerencias from './Hero';

 type TabType = 'comercios' | 'eventos' | 'beneficios';

 interface Props {
   initialComercios: any[];
   initialEventos: any[];
   initialBeneficios: any[];
 }

 const categories: { name: TabType; label: string; color: string }[] = [
   { name: 'comercios', label: 'GASTRONOMÍA', color: 'bg-[#005B82] text-white bg-gradient-to-r from-[#005B82] via-[#004D6E] to-[#003C56] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' },
   { name: 'eventos', label: 'EVENTOS', color: 'bg-[#F58220] text-white bg-gradient-to-r from-[#FA780A] via-[#D96400] to-[#D96400] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' },
   { name: 'beneficios', label: 'PROMOCIONES', color: 'bg-[#3BA740] text-white bg-gradient-to-r from-[#1AA221] via-[#1D8422] to-[#1D8422] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:cursor-pointer' }
 ];

 export default function SugerenciasClient({ initialComercios, initialEventos, initialBeneficios }: Props) {
   const [currentTab, setCurrentTab] = useState<TabType>('comercios');
   const [currentPage, setCurrentPage] = useState(1);
   const [isRedeemOpen, setIsRedeemOpen] = useState(false);
   const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
   const sugerenciasRef = useRef<HTMLDivElement>(null);

   const scrollToSugerencias = () => {
    if (sugerenciasRef.current) {
      sugerenciasRef.current.scrollIntoView({ behavior: 'smooth' });
    }
   };

   const itemsPerPage = 10;

   const getItemsForTab = () => {
     switch (currentTab) {
       case 'eventos':
         return initialEventos;
       case 'beneficios':
         return initialBeneficios;
       default:
         return initialComercios;
     }
   };

   const allItems = getItemsForTab();
   const totalItems = allItems.length;
   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
   const startIndex = (currentPage - 1) * itemsPerPage;
   const pageItems = allItems.slice(startIndex, startIndex + itemsPerPage);

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
         <HeroSugerencias categories={categories} setCurrentTab={setCurrentTab} setCurrentPage={setCurrentPage} scrollToSugerencias={scrollToSugerencias} />

         {/* Content Section */}
         <section ref={sugerenciasRef} className="py-16 bg-white">
           <div className="container mx-auto px-4">
             {/* Results Info */}
             <div className="mb-8 text-center">
               <h2 className="text-2xl font-bold text-gray-900 mb-2">
                 {currentTab === 'comercios' && 'Comercios Sugeridos'}
                 {currentTab === 'eventos' && 'Próximos Eventos'}
                 {currentTab === 'beneficios' && 'Beneficios Disponibles'}
               </h2>
               <p className="text-gray-600">
                 <>Mostrando {pageItems.length} de {totalItems} resultados{totalPages > 1 && ` - Página ${currentPage} de ${totalPages}`}</>
               </p>
             </div>

             {/* Cards Grid */}
             <div className={`grid ${getGridCols()} gap-8 max-w-7xl mx-auto`}>
               {currentTab === 'eventos' && pageItems.map((evento: any) => (
                 <EventCard key={evento.id} event={evento} />
               ))}
               {currentTab === 'beneficios' && pageItems.map((beneficio: any) => (
                 <BenefitCard key={beneficio.id} benefit={beneficio} onRedeem={(b) => { setSelectedBenefit(b); setIsRedeemOpen(true); }} />
               ))}
               {currentTab === 'comercios' && pageItems.map((comercio: any) => (
                 <ComercioCard key={comercio.id} comercio={comercio} />
               ))}
             </div>

             {/* Pagination */}
             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
           </div>
         </section>
       </div>

       <ModalPromo isRedeemOpen={isRedeemOpen} setIsRedeemOpen={setIsRedeemOpen} selectedBenefit={selectedBenefit} />
     </LandingLayout>
   );
 }


