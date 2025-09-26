'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LandingLayout from '@/components/layout/LandingLayout';
import { mockArticles, getArticleBySlug } from '@/data/articles';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Heart,
  BookOpen,
  Eye,
  MessageCircle,
  Facebook,
  Twitter,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';

export default function NotaIndividualPage() {
  const params = useParams();
  const router = useRouter();
  const [nota, setNota] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const articleId = params.id as string;
      const foundArticle = mockArticles.find(article => article.id === articleId);

      if (foundArticle) {
        setNota(foundArticle);

        // Get related articles (same category, excluding current)
        const related = mockArticles
          .filter(article =>
            article.category === foundArticle.category &&
            article.id !== foundArticle.id
          )
          .slice(0, 3);

        setRelatedArticles(related);
      } else {
        // If article not found, redirect to notas page
        router.push('/notas');
      }

      setLoading(false);
    }
  }, [params.id, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'NOTICIAS': 'bg-blue-100 text-blue-800 border-blue-200',
      'GASTRONOMIA': 'bg-orange-100 text-orange-800 border-orange-200',
      'SERVICIOS': 'bg-green-100 text-green-800 border-green-200',
      'ENTRETENIMIENTO': 'bg-purple-100 text-purple-800 border-purple-200',
      'DEPORTES': 'bg-red-100 text-red-800 border-red-200',
      'INMOBILIARIA': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'SALUD': 'bg-pink-100 text-pink-800 border-pink-200',
      'EDUCACION': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const shareOnSocialMedia = (platform: string) => {
    const url = window.location.href;
    const title = nota?.title || '';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Enlace copiado al portapapeles');
        break;
    }
  };

  if (loading) {
    return (
      <LandingLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-gray-600">Cargando nota...</p>
          </div>
        </div>
      </LandingLayout>
    );
  }

  if (!nota) {
    return (
      <LandingLayout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-red-500">
              <BookOpen className="w-16 h-16" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Nota no encontrada</h1>
            <p className="text-gray-600 mb-6">La nota que buscas no existe o ha sido eliminada.</p>
            <Link href="/notas">
              <Button>Volver a Notas</Button>
            </Link>
          </div>
        </div>
      </LandingLayout>
    );
  }

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section with Back Button */}
        <section className="relative bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <Link href="/notas">
                <Button variant="outline" className="flex items-center space-x-2 hover:bg-indigo-50">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Notas</span>
                </Button>
              </Link>

              {/* Share Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 mr-2">Compartir:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="p-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="p-2 hover:bg-blue-400 hover:border-blue-400"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocialMedia('copy')}
                  className="p-2 hover:bg-gray-50"
                >
                  <LinkIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Article Header */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className={`border ${getCategoryColor(nota.category)}`}>
                  {nota.category}
                </Badge>
                {nota.isPremium && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    PREMIUM
                  </Badge>
                )}
                {nota.featured && (
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                    DESTACADO
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {nota.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {nota.excerpt}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">{nota.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(nota.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{nota.readTime} minutos de lectura</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>1.2K vistas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image Placeholder */}
              <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-gray-600 font-medium">Imagen destacada de la nota</p>
                    <p className="text-sm text-gray-500 mt-1">{nota.title}</p>
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {nota.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-600 mr-2">Etiquetas:</span>
                  {nota.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Engagement */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">Me gusta</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Comentar</span>
                    </button>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Compartir</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Notas Relacionadas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.id} href={`/notas/${relatedArticle.id}`}>
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                            {relatedArticle.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{formatDate(relatedArticle.publishedAt)}</span>
                            <span>{relatedArticle.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Footer */}
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <Link href="/notas">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a todas las notas</span>
                </Button>
              </Link>

              <div className="text-sm text-gray-600">
                Nota {nota.id} de {mockArticles.length}
              </div>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}
