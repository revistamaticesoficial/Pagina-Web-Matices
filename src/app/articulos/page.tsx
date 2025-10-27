import { Suspense } from 'react';
import LandingLayout from '@/components/layout/LandingLayout';
import { articleService } from '@/lib/article-service';
import type { Database } from '@/types/database';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ArticulosClient from '@/components/sections/ArticulosClient';
import { BookOpen } from 'lucide-react';

type Article = Database['public']['Tables']['articles']['Row'];

export const revalidate = 60; // Revalidar cada 60 segundos

async function loadArticles() {
  try {
    const result = await articleService.getAllArticles({
      limit: 24,
      offset: 0,
      isPublished: true
    });
    
    return {
      articles: result.articles,
      total: result.total,
      hasMore: result.hasMore
    };
  } catch (error) {
    console.error('Error loading articles:', error);
    return {
      articles: [],
      total: 0,
      hasMore: false
    };
  }
}

// Skeleton loader
function ArticulosSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ArticulosPage() {
  const { articles, total, hasMore } = await loadArticles();

  return (
    <LandingLayout>
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-[#003c56] to-[#005B82] text-white py-16">
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div className="max-w-4xl">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Artículos de Matices
                </h1>
                <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
                  Todas las noticias, historias y acontecimientos del Cerro de las Rosas
                </p>
                <div className="mt-6 text-lg opacity-80">
                  {total} artículos disponibles
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Últimos Artículos
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Mantente informado con todas las noticias, eventos y novedades del barrio Cerro de las Rosas
                </p>
              </div>

              {/* Articles Grid with Suspense */}
              <ErrorBoundary>
                <Suspense fallback={<ArticulosSkeleton />}>
                  <ArticulosClient initialArticles={articles} total={total} hasMore={hasMore} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </LandingLayout>
  );
}
