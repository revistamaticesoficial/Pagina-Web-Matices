'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import {
  MapPin,
  Phone,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  Camera,
  Navigation,
  Copy,
  MessageCircle,
  Facebook,
  Twitter,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Database } from '@/types/database';

type Business = Database['public']['Tables']['comercios']['Row'];
type Benefit = Database['public']['Tables']['benefits']['Row'];

interface ComercioDetailContentProps {
  comercio: Business | null;
  benefits: Benefit[];
}

export function ComercioDetailContent({ comercio, benefits }: ComercioDetailContentProps) {
  const router = useRouter();
  
  // Validar que el comercio existe
  if (!comercio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Comercio no encontrado</h1>
          <p className="text-gray-600 mb-6">El comercio que buscas no está disponible.</p>
          <Button onClick={() => router.push('/comercios')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Comercios
          </Button>
        </div>
      </div>
    );
  }
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const benefitsScrollRef = useRef<HTMLDivElement | null>(null);

  // Establecer URL de compartir
  useState(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/comercios/${comercio.slug}`);
    }
  });

  // Función para abrir Google Maps con la dirección
  const openInMaps = (comercio: Business) => {
    const address = encodeURIComponent(
      `${comercio.direction}, Córdoba, Argentina`
    );
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(mapsUrl, "_blank");
  };

  // Función para compartir usando Web Share API
  const shareCommerce = async (comercio: Business) => {
    if (navigator.share && typeof window !== "undefined") {
      try {
        await navigator.share({
          title: comercio.name,
          text: comercio.direction || '',
          url: shareUrl,
        });
      } catch (error) {
        // Si falla, mostrar modal de compartir alternativo
        setShowShareModal(true);
      }
    } else {
      // Mostrar modal de compartir alternativo
      setShowShareModal(true);
    }
  };

  // Función para copiar URL al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  // Función para compartir en redes sociales
  const shareOnSocialMedia = (platform: string, comercio: Business) => {
    const text = encodeURIComponent(
      `Descubre ${comercio.name} en Revista Matices: ${comercio.direction || ''}`
    );
    const url = encodeURIComponent(shareUrl);

    let shareUrlSocial = "";

    switch (platform) {
      case "whatsapp":
        shareUrlSocial = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "facebook":
        shareUrlSocial = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrlSocial = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrlSocial, "_blank");
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>

            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => shareCommerce(comercio)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de fotos */}
            <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Imagen principal */}
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      {comercio?.banners_url && (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        key={selectedImage}
                      >
                        <source
                          src={(comercio as any)?.banners_url?.[selectedImage || 0]}
                          type="video/mp4"
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <Camera className="w-12 h-12 text-gray-400" />
                        </div>
                      </video>
                      )}
                    </div>

                    {/* Indicador de posición */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {selectedImage + 1} / {((comercio as any)?.banners_url?.length || 0)}
                    </div>

                    {/* Miniaturas */}
                    <div className="p-4 bg-gray-50">
                      <div className="flex gap-2 overflow-x-auto">
                        {(comercio as any)?.banners_url?.map((image: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                              selectedImage === index
                                ? "border-blue-500"
                                : "border-gray-200"
                            }`}
                          >
                            <video
                              className="w-full h-full object-cover"
                              muted
                              preload="metadata"
                            >
                              <source src={image} type="video/mp4" />
                              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                <Camera className="w-6 h-6 text-gray-500" />
                              </div>
                            </video>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {comercio.name}
                      </h1>
                      <Badge variant="secondary" className="text-sm">
                        {comercio.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                      <span className="text-gray-600 ml-2 text-sm">
                        (4.8)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {comercio.direction || 'Sin descripción disponible.'}
                </p>

                {/* Servicios */}
                {comercio.tags && comercio.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Servicios
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {comercio.tags.map((service, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-sm"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Carrusel de beneficios */}
            {benefits.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Beneficios de este comercio
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => benefitsScrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => benefitsScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div
                    ref={benefitsScrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
                  >
                    {benefits.map((b) => (
                      <div key={b.id} className="min-w-[300px] max-w-[300px] snap-start">
                        <div className="border border-gray-200 rounded-xl p-4 bg-white h-full flex flex-col justify-between">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {b.type === 'discount' ? 'Descuento' : 'Beneficio'}
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{b.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-3">{b.description || '—'}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Válido hasta {b.valid_to || b.expires_at || '—'}</span>
                            <Button 
                              size="sm" 
                              className="bg-[#005B82] hover:bg-[#003C56]"
                              onClick={() => router.push('/sugerencias?tab=beneficios')}
                            >
                              Ver detalle
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar con información de contacto */}
          <div className="space-y-6">
            {/* Información de contacto */}
            <Card>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="flex items-center gap-3 mb-4">
                <Image src={comercio?.logo_url || '/images/logo.jpg'} alt={comercio?.name || 'Comercio'} width={80} height={80} className="flex-shrink-0 rounded" />
                <span className="font-semibold text-gray-900">Sobre este comercio</span>
                </h3>

                <div className="p-6 space-y-4">
                  <p>
                    Este establecimiento forma parte de la comunidad del Cerro
                    de las Rosas y se destaca por su compromiso con la calidad
                    y el servicio al cliente.
                  </p>
                  <p>
                    <strong>Categoría:</strong> {comercio.category}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Información de Contacto
                </h3>

                <div className="space-y-4">
                  {/* Ubicación */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {comercio.direction}
                      </p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  {comercio.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <a
                        href={`tel:${comercio.phone}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {comercio.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="mt-6 space-y-3">
                  {comercio.phone && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar ahora
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => openInMaps(comercio)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Cómo llegar
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => shareCommerce(comercio)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Compartir */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Compartir comercio
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  {comercio.name}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {comercio.direction || 'Sin descripción disponible.'}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Copiar enlace
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {copiedToClipboard ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {copiedToClipboard && (
                    <p className="text-sm text-green-600 mt-1">
                      ¡Enlace copiado!
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Compartir en redes sociales
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => shareOnSocialMedia("whatsapp", comercio)}
                      className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-600">WhatsApp</span>
                    </button>

                    <button
                      onClick={() => shareOnSocialMedia("facebook", comercio)}
                      className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Facebook className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-600">Facebook</span>
                    </button>

                    <button
                      onClick={() => shareOnSocialMedia("twitter", comercio)}
                      className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                        <Twitter className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-gray-600">Twitter</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
