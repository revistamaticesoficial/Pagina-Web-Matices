import { BusinessCard } from '@/components/content/BusinessCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Search, Filter, MapPin, Star, Crown } from 'lucide-react';
import { mockBusinesses, getBusinessesByCategory, getBusinessesByPlan } from '@/data/businesses';
import { CATEGORIES, BUSINESS_PLANS, NEIGHBORHOODS } from '@/data/constants';

export default function ComerciosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Directorio de Comercios
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Encuentra los mejores comercios, servicios y profesionales 
            del Cerro de las Rosas y alrededores
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar comercios..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Categorías
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-gray-700">{category.label}</span>
                    <Badge 
                      className={`${category.color} text-white border-0 text-xs`}
                    >
                      {getBusinessesByCategory(category.value).length}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Plans */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Planes</h3>
              <div className="space-y-2">
                {BUSINESS_PLANS.map((plan) => (
                  <button
                    key={plan.value}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-gray-700">{plan.label}</span>
                    <Badge 
                      className={`${plan.color} text-white border-0 text-xs`}
                    >
                      {getBusinessesByPlan(plan.value).length}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Barrios</h3>
              <div className="space-y-2">
                {NEIGHBORHOODS.map((neighborhood) => (
                  <button
                    key={neighborhood}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-gray-700">{neighborhood}</span>
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Businesses */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Destacados
              </h3>
              <div className="space-y-3">
                {mockBusinesses.filter(b => b.featured).slice(0, 3).map((business) => (
                  <div key={business.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {business.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <Badge 
                        className={`${business.plan === 'PREMIUM' ? 'bg-yellow-500' : 'bg-blue-500'} text-white border-0 text-xs`}
                      >
                        {business.plan}
                      </Badge>
                      {business.plan === 'PREMIUM' && (
                        <Crown className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Mostrando {mockBusinesses.length} comercios
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-gray-600">
                    Ordenar por:
                  </span>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="featured">Destacados</option>
                    <option value="name">Nombre A-Z</option>
                    <option value="plan">Plan</option>
                    <option value="category">Categoría</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </div>

            {/* Businesses Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {mockBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Anterior
                </Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-3 py-2 text-gray-500">...</span>
                <Button variant="outline" size="sm">5</Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

