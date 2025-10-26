import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { articleService } from '@/lib/article-service';
import type { Database } from '@/types/database';
import LandingLayout from '@/components/layout/LandingLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Calendar, Clock, User, BookOpen, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Article = Database['public']['Tables']['articles']['Row'];

export const revalidate = 60;

// Generar metadatos dinámicos para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const article = await articleService.getArticleBySlug(resolvedParams.slug);
    
    if (!article) {
      return {
        title: 'Artículo no encontrado - Matices',
        description: 'El artículo que buscas no está disponible.',
      };
    }

    return {
      title: `${article.title} - Revista Matices`,
      description: article.excerpt || article.title,
      keywords: article.tags?.join(', ') || article.category,
      openGraph: {
        title: article.title,
        description: article.excerpt || article.title,
        images: article.featured_image_url ? [article.featured_image_url] : [],
        type: 'article',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Artículo - Matices',
      description: 'Descubre este artículo en Revista Matices.',
    };
  }
}

// Skeleton loader
function ArticleSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-96 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  );
}

export default async function ArticleDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  
  // Validación de slug
  // if (!resolvedParams.slug || resolvedParams.slug.trim() === '') {
  //   notFound();
  // }

  try {
    const article = await articleService.getArticleBySlug(resolvedParams.slug);
    
    // if (!article) {
    //   notFound();
    // }

    // Obtener artículos relacionados
    const relatedArticles = await articleService.getRelatedArticles(
      article.category,
      article.slug,
      3
    );

    return (
      <LandingLayout>
        <ErrorBoundary>
          <div className="min-h-screen bg-white">
          {/* Hero con imagen destacada */}
          <section className="relative h-[60vh] max-h-[600px] overflow-hidden">
            {article.featured_image_url ? (
              <Image
                src={article.featured_image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-[#005B82] to-[#003C56]"></div>
            )}
            <div className="absolute inset-0 bg-black/50"></div>
            
            {/* Contenido del hero */}
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-8">
              <div className="max-w-4xl">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-[#F58220] text-white rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author_name || 'Redacción Matices'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.published_at || article.created_at).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.read_time || 5} min lectura</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón volver */}
            <div className="absolute top-4 left-4 z-10">
              <Link href="/articulos">
                <Button variant="ghost" className="bg-white/90 hover:bg-white text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
            </div>
          </section>

          {/* Contenido principal */}
          <article className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {/* Extracto */}
                {article.excerpt && (
                  <div className="bg-blue-50 border-l-4 border-[#005B82] p-6 mb-8 rounded-r-lg">
                    <p className="text-lg font-medium text-gray-800 italic">
                      {article.excerpt}
                    </p>
                  </div>
                )}

                {/* Contenido del artículo */}
                <div 
                  className="article-content text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compartir en redes sociales */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Compartir:</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Copy className="w-4 h-4" />
                      Copiar link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Artículos relacionados */}
          {relatedArticles.length > 0 && (
            <section className="bg-gray-50 py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Artículos Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {relatedArticles.map((relatedArticle) => (
                    <Link 
                      key={relatedArticle.id} 
                      href={`/articulos/${relatedArticle.slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-200">
                        {relatedArticle.featured_image_url ? (
                          <Image
                            src={relatedArticle.featured_image_url}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <BookOpen className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedArticle.excerpt || 'Sin descripción'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
          </div>
        </ErrorBoundary>
      </LandingLayout>
    );
  } catch (error) {
    console.error('Error loading article detail:', error);
    notFound();
  }
}

