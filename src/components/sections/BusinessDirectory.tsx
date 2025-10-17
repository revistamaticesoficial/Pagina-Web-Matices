import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BusinessCard } from '@/components/content/BusinessCard';
import { Separator } from '@/components/ui/Separator';
import { ArrowRight, Store, MapPin } from 'lucide-react';
import { getFeaturedBusinesses } from '@/data/businesses';

export function BusinessDirectory() {
  const featuredBusinesses = getFeaturedBusinesses();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Store className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Comercios Destacados
            </h2>
            <Store className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre los mejores comercios y servicios del Cerro de las Rosas
          </p>
        </div>

        {/* Featured Businesses Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredBusinesses.slice(0, 2).map((business) => (
            <BusinessCard key={business.id} business={business} variant="featured" />
          ))}
        </div>

        {/* Secondary Businesses */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredBusinesses.slice(2, 8).map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 mb-12 shadow-sm">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Comercios registrados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-gray-600">Categorías de servicios</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Servicios disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Comercios verificados</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Separator className="mb-8" />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              ¿Buscas un servicio específico?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora nuestro directorio completo de comercios, servicios y profesionales 
              del Cerro de las Rosas. Encuentra exactamente lo que necesitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/comercios" className="group">
                <Button size="lg" className="group">
                  Ver Directorio Completo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/comercios?plan=PREMIUM" className="group">
                <Button variant="outline" size="lg" className="group">
                  <MapPin className="mr-2 h-4 w-4" />
                  Comercios Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

