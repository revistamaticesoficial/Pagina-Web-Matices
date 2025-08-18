import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Play, Calendar, MapPin } from 'lucide-react';
import { APP_CONFIG } from '@/data/constants';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Calendar className="h-3 w-3 mr-1" />
                34 años informando al norte de Córdoba
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Revista{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Matices
                </span>
                {' '}del Cerro
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Tu fuente confiable de noticias locales, comercios del barrio y contenido 
                de interés para la comunidad del Cerro de las Rosas.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">Noticias locales actualizadas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span className="text-gray-700">Directorio de comercios</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-gray-700">Eventos del barrio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <span className="text-gray-700">Contenido premium</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Explorar Artículos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Ver Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Artículos semanales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">20+</div>
                <div className="text-sm text-gray-600">Comercios destacados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5K+</div>
                <div className="text-sm text-gray-600">Lectores mensuales</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/hero-cerro-rosas.jpg"
                alt="Cerro de las Rosas - Córdoba"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900">Cerro de las Rosas</div>
                  <div className="text-sm text-gray-600">Córdoba, Argentina</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">34</div>
                <div className="text-sm opacity-90">Años de trayectoria</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current text-white"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19.3,79.78-31.16,119.65-39.92C503.43,4.88,622.72,1.11,636.47,1.11H0Z"
            opacity=".5"
            className="fill-current text-white"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,120.71-6.19,179.36,3.17,30.92,4.9,61.17,12.43,91.55,22.73,40.71,13.19,81.41,28.34,119.13,47.13,42.15,21.11,82.51,45.85,119.18,75.73,35.65,29.25,67.68,62.12,96.68,98.46,31.24,39.29,58.85,82.9,81.47,129.21,22.62,46.31,40.07,95.27,52.19,146.14V0Z"
            className="fill-current text-white"
          />
        </svg>
      </div>
    </section>
  );
}

