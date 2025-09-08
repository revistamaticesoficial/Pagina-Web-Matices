'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Users, Award, Heart, Calendar, MapPin, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react';

export function TeamCarrousel({ teamMembers }: { teamMembers: any[] }) {
  // Estado para el carrusel responsive
  const [currentSlide, setCurrentSlide] = useState(0);

  // Función para obtener el número de cards visibles según el breakpoint
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4; // xl: desktop grande
      if (window.innerWidth >= 1024) return 3; // lg: desktop
      if (window.innerWidth >= 768) return 2;  // md: tablet
      return 1; // mobile
    }
    return 1;
  };

  const [visibleCards, setVisibleCards] = useState(1);

  // Hook para manejar el resize y actualizar las cards visibles
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
      // Ajustar currentSlide si es necesario
      const maxSlide = Math.max(0, teamMembers.length - getVisibleCards());
      if (currentSlide > maxSlide) {
        setCurrentSlide(maxSlide);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, teamMembers.length]);

  // Auto-play del carrusel cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const maxSlide = Math.max(0, teamMembers.length - visibleCards);
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [visibleCards, teamMembers.length]);

  const nextSlide = () => {
    const maxSlide = Math.max(0, teamMembers.length - visibleCards);
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxSlide = Math.max(0, teamMembers.length - visibleCards);
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">

        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quiénes Somos
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas que hacen posible Revista Matices día a día
            </p>
          </div>
          
          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg border border-gray-200 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg border border-gray-200 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            <div className="overflow-hidden mx-8">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
                }}
              >
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                      <div className="relative aspect-square">
                        <div className="w-full h-full overflow-hidden rounded-t-lg">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h4 className="text-white font-bold text-sm mb-1 text-center">
                            {member.name}
                          </h4>
                          <p className="text-white text-xs text-center">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      
                      <CardContent className="p-3">
                        <div className="flex items-center justify-center">
                          <Badge className={`${member.color.replace('text-', 'bg-').replace('-600', '-100')} ${member.color} border-0 text-xs`}>
                            {member.role}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.max(1, teamMembers.length - visibleCards + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
