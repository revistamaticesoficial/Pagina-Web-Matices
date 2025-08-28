'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Newspaper, 
  Heart, 
  Target, 
  Globe,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { APP_CONFIG } from '@/data/constants';
import { TeamCarrousel } from '@/components/sections/TeamCarrousel';

export default function NosotrosPage() {
  // Estado para el carrusel del equipo
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Datos del equipo
  const teamMembers = [
    {
      name: "Karina Marcela Flores",
      role: "Directora",
      image: "/images/team/karina.png",
      color: "text-blue-600"
    },
    {
      name: "Sergio A. Santolini",
      role: "Asesor Comercial",
      image: "/images/team/sergio.png",
      color: "text-green-600"
    },
    {
      name: "Brigitte H. Escalona",
      role: "Coordinador Editorial",
      image: "/images/team/brigitte.png",
      color: "text-purple-600"
    },
    {
      name: "Jessica Avila",
      role: "Publicidad y Ventas",
      image: "/images/team/jesi.png",
      color: "text-pink-600"
    },
    {
      name: "Favio Canderello",
      role: "Diseño y Diagramación",
      image: "/images/team/favio.png",
      color: "text-orange-600"
    },
    {
      name: "Dylan Peralta",
      role: "Programador",
      image: "/images/team/favio.png",
      color: "text-red-600"
    },
    {
      name: "Juan Ignacio",
      role: "Programador",
      image: "/images/team/favio.png",
      color: "text-indigo-600"
    },
    {
      name: "Jetzabel",
      role: "Programadora",
      image: "/images/team/favio.png",
      color: "text-teal-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  // Auto-play del carrusel cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Sobre Revista Matices
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            34 años informando y conectando a la comunidad del Cerro de las Rosas
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Historia Section - Full Width */}
        <section className="mb-20 px-4 sm:px-6 lg:px-20">
  <div className="text-center mb-12">
    <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4 inline-flex items-center">
      <Calendar className="h-3 w-3 mr-1" />
      Desde 1990
    </Badge>
    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
      Nuestra Historia
    </h2>
  </div>

  <div className="max-w-5xl mx-auto">
    <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed text-justify">
      <p className="break-inside-avoid">
        Revistas matices: 35 años de calidad, seriedad y experiencia en publicidad
      </p>
      <p className="break-inside-avoid">
        ofrecemos cientos de servicios organizados por rubros y miles de ejemplares gratuitos entregados 
        puerta a puerta en los principales barrios, zonas residenciales y comerciales del norte de Córdoba.
      </p>
      <p className="break-inside-avoid">
        Somos la mejor alternativa para hacer crecer tu negocio. ¡Contáctanos! Te enviaremos la información 
        que necesitas. Con Matices, tus anuncios estarán presentes en los hogares de nuestros lectores, 
        brindándote beneficios únicos en la promoción de tu negocio. Nuestro compromiso va más allá de la 
        publicidad: construimos puentes entre comerciantes y vecinos, fomentando el crecimiento económico 
        local y fortaleciendo el tejido social de nuestra comunidad.
      </p>
      <p className="break-inside-avoid">
        Nuestro equipo de profesionales, formado por periodistas, diseñadores, comerciales y distribuidores, 
        trabaja incansablemente para mantener la calidad editorial que nos caracteriza. Nos enorgullece 
        ser parte integral de la identidad del Cerro de las Rosas, y continuamos comprometidos con la 
        misión de informar, conectar y fortalecer los lazos que hacen de nuestra comunidad un lugar 
        especial para vivir, trabajar y crecer.
      </p>
    </div>
  </div>
</section>
    <TeamCarrousel />

        {/* Equipo Carrusel */}
        {/* <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quiénes Somos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce a las personas que hacen posible Revista Matices día a día
            </p>
          </div>
          
          <div className="relative max-w-lg mx-auto">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-colors"
              aria-label="Miembro anterior"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-colors"
              aria-label="Siguiente miembro"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div className="overflow-hidden rounded-2xl mb-6">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {teamMembers.map((member, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="relative aspect-square">
                        <div className="w-full h-full overflow-hidden rounded-t-2xl">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-t-2xl" />
                        
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                          <p className="font-semibold text-sm text-white">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <Badge className={`${member.color.replace('text-', 'bg-').replace('-600', '-100')} ${member.color} border-0`}>
                            {member.role}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${member.color.replace('text-', 'bg-')}`}></div>
                            <span className="text-sm text-gray-500">Equipo Matices</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-2 overflow-x-auto pb-4">
              {teamMembers.map((member, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    index === currentSlide 
                      ? 'ring-3 ring-blue-500 ring-opacity-50 scale-105' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Ver ${member.name}`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <p className="text-xs font-medium text-gray-700 truncate w-12">
                      {member.name.split(' ')[0]}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center mt-3">
              <div className="bg-gray-200 rounded-full h-1 w-24">
                <div 
                  className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / teamMembers.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}

