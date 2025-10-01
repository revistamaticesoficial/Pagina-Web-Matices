import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArticleCard } from '@/components/content/ArticleCard';
import { Separator } from '@/components/ui/Separator';
import { ArrowRight, Star } from 'lucide-react';
import { getFeaturedArticles } from '@/data/articles';

export function FeaturedArticles() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="h-6 w-6 text-yellow-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Artículos Destacados
            </h2>
            <Star className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Las noticias más importantes y relevantes para la comunidad del Cerro de las Rosas
          </p>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {featuredArticles.slice(0, 2).map((article) => (
            <ArticleCard key={article.id} article={article} variant="featured" />
          ))}
        </div>

        {/* Secondary Articles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredArticles.slice(2, 5).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Separator className="mb-8" />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              ¿Quieres leer más artículos?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explora nuestro archivo completo de noticias, reportajes y contenido 
              especial sobre el Cerro de las Rosas y el norte de Córdoba.
            </p>
            <Link href="/notas" className="group">
              <Button size="lg" className="group">
                Ver Todas las Notas
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
