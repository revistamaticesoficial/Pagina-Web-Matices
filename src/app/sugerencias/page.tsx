import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

// Mock data para los negocios sugeridos
const suggestedBusinesses = [
  {
    id: 1,
    name: 'Betos',
    description: 'Lomitos de calidad',
    logo: '/images/logo.jpg',
    category: 'GASTRONOMIA',
    backgroundColor: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Vidón Bar',
    description: 'Bar & Restaurante',
    logo: '/images/logo.jpg',
    category: 'GASTRONOMIA',
    backgroundColor: 'bg-black'
  },
  {
    id: 3,
    name: 'Pizza Libre',
    description: 'Pizzería artesanal',
    logo: '/images/logo.jpg',
    category: 'GASTRONOMIA',
    backgroundColor: 'bg-yellow-400'
  },
  {
    id: 4,
    name: 'Kit Wonder',
    description: 'Productos innovadores',
    logo: '/images/logo.jpg',
    category: 'SERVICIOS',
    backgroundColor: 'bg-orange-400'
  },
  {
    id: 5,
    name: 'Betos',
    description: 'Lomitos de calidad',
    logo: '/images/logo.jpg',
    category: 'GASTRONOMIA',
    backgroundColor: 'bg-green-500'
  },
  {
    id: 6,
    name: 'Betos',
    description: 'Lomitos de calidad',
    logo: '/images/logo.jpg',
    category: 'GASTRONOMIA',
    backgroundColor: 'bg-green-500'
  }
];

const categories = [
  { name: 'COMERCIOS', color: 'bg-blue-600 hover:bg-blue-700' },
  { name: 'EVENTOS', color: 'bg-orange-500 hover:bg-orange-600' },
  { name: 'BENEFICIOS', color: 'bg-green-600 hover:bg-green-700' }
];

export default function SugerenciasPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600/20 to-blue-600/20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/logo.jpg"
            alt="Niños plantando árboles"
            fill
            className="object-cover opacity-30"
            priority
          />
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
            {categories.map((category) => (
              <Button
                key={category.name}
                size="lg"
                className={`${category.color} text-white font-bold text-lg px-12 py-6 rounded-none flex-1 min-h-[80px] text-center`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Businesses Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {suggestedBusinesses.map((business) => (
              <Card key={`${business.id}-${business.name}`} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Logo Section */}
                <div className={`${business.backgroundColor} h-48 flex items-center justify-center relative`}>
                  {business.name === 'Betos' && (
                    <div className="text-white text-center">
                      <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-2 mx-auto">
                        <span className="font-bold text-lg">B</span>
                      </div>
                      <div className="text-2xl font-bold">el verdadero</div>
                      <div className="text-3xl font-bold">LOMITO</div>
                    </div>
                  )}
                  {business.name === 'Vidón Bar' && (
                    <div className="text-white text-center">
                      <div className="text-4xl font-serif italic mb-2">Vidón</div>
                      <div className="text-lg tracking-wider">~ BAR ~</div>
                    </div>
                  )}
                  {business.name === 'Pizza Libre' && (
                    <div className="text-black text-center">
                      <div className="text-3xl font-bold">PIZZA</div>
                      <div className="text-2xl font-serif italic">Libre</div>
                    </div>
                  )}
                  {business.name === 'Kit Wonder' && (
                    <div className="text-white text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <span className="text-2xl font-bold">W</span>
                      </div>
                      <div className="text-lg font-bold">KIT WONDER</div>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {business.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {business.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
