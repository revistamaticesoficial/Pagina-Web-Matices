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
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamMembers = [
    { name: "Karina Marcela Flores", role: "Directora", image: "/images/team/karina.png", color: "text-blue-600" },
    { name: "Sergio A. Santolini", role: "Asesor Comercial", image: "/images/team/sergio.png", color: "text-green-600" },
    { name: "Brigitte H. Escalona", role: "Coordinador Editorial", image: "/images/team/brigitte.png", color: "text-purple-600" },
    { name: "Jessica Avila", role: "Publicidad y Ventas", image: "/images/team/jesi.png", color: "text-pink-600" },
    { name: "Favio Canderello", role: "Diseño y Diagramación", image: "/images/team/favio.png", color: "text-orange-600" },
    { name: "Dylan Peralta", role: "Programador", image: "/images/team/favio.png", color: "text-red-600" },
    { name: "Juan Ignacio", role: "Programador", image: "/images/team/favio.png", color: "text-indigo-600" },
    { name: "Jetzabel", role: "Programadora", image: "/images/team/favio.png", color: "text-teal-600" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % teamMembers.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Sobre Revista Matices</h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">34 años informando y conectando a la comunidad del Cerro de las Rosas</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <section className="mb-20 px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4 inline-flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Desde 1990
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed text-justify">
              <p className="break-inside-avoid">Revistas matices: 35 años de calidad, seriedad y experiencia en publicidad</p>
              <p className="break-inside-avoid">ofrecemos cientos de servicios organizados por rubros y miles de ejemplares gratuitos...</p>
            </div>
          </div>
        </section>
        <TeamCarrousel />
      </div>
    </div>
  );
}

