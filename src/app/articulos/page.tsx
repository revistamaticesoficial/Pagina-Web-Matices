import { ArticleCard } from '@/components/content/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { Search, Filter, Clock, Calendar } from 'lucide-react';
import { mockArticles, getArticlesByCategory } from '@/data/articles';
import { CATEGORIES } from '@/data/constants';
import { formatDate } from '@/lib/utils';

export default function ArticulosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Artículos y Noticias
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Mantente informado sobre las últimas noticias, eventos y novedades 
            del Cerro de las Rosas y el norte de Córdoba
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
                  placeholder="Buscar artículos..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      {getArticlesByCategory(category.value).length}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            {/* Latest Articles */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Últimos Artículos</h3>
              <div className="space-y-3">
                {mockArticles.slice(0, 5).map((article) => (
                  <div key={article.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt)}
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
                    Mostrando {mockArticles.length} artículos
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-gray-600">
                    Ordenar por:
                  </span>
                  <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="recent">Más recientes</option>
                    <option value="popular">Más populares</option>
                    <option value="title">Título A-Z</option>
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

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {mockArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
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
                <Button variant="outline" size="sm">8</Button>
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

