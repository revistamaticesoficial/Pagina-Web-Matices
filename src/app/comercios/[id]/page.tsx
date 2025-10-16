"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import LandingLayout from "@/components/layout/LandingLayout";
import { Comercio } from "@/types/sugerencias";
import {
  MapPin,
  Phone,
  Globe,
  Mail,
  Clock,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  Camera,
  ExternalLink,
  Navigation,
  Copy,
  MessageCircle,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

// Galería de fotos para cada comercio (basado en los videos que existen)
const getCommerceGallery = (commerceId: string, commerceName: string) => {
  const galleryImages: { [key: string]: string[] } = {
    "1": ["/comida/lomito.mp4", "/comida/helado.mp4", "/comida/pizza.mp4"], // Betos
    "2": ["/comida/diet.mp4", "/comida/fornello.mp4", "/comida/topping.mp4"], // Vidón Bar
    "3": ["/comida/Pizza.mp4", "/comida/Pizza 2.mp4", "/comida/Pizza 3.mp4"], // Pizza Libre
    "4": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Kit Wonder
    "5": ["/comida/saludable.mp4", "/comida/diet.mp4", "/comida/fornello.mp4"], // Farmacia del Cerro
    "6": ["/comida/topping.mp4", "/comida/helado.mp4", "/comida/lomito.mp4"], // Gimnasio Fitness Plus
    "7": ["/comida/diet.mp4", "/comida/fornello.mp4", "/comida/topping.mp4"], // Librería Cultura
    "8": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Peluquería Estilo
    "9": ["/comida/lomito.mp4", "/comida/helado.mp4", "/comida/pizza.mp4"], // Ferretería El Martillo
    "10": ["/comida/diet.mp4", "/comida/fornello.mp4", "/comida/topping.mp4"], // Café Central
    "11": ["/comida/saludable.mp4", "/comida/diet.mp4", "/comida/fornello.mp4"], // Veterinaria Mascotas
    "12": ["/comida/topping.mp4", "/comida/helado.mp4", "/comida/lomito.mp4"], // Taller Mecánico Rodriguez
    "13": ["/comida/fornello.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Panadería Artesanal
    "14": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Inmobiliaria Norte
    "15": ["/comida/diet.mp4", "/comida/fornello.mp4", "/comida/topping.mp4"], // Escuela de Música Armonía
    "16": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Supermercado Familia
    "17": ["/comida/saludable.mp4", "/comida/diet.mp4", "/comida/fornello.mp4"], // Clínica Dental Sonrisa
    "18": ["/comida/topping.mp4", "/comida/helado.mp4", "/comida/lomito.mp4"], // Tienda de Ropa Moda
    "19": ["/comida/fornello.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Restaurante Gourmet
    "20": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Centro de Estética Belleza
    "21": ["/comida/lomito.mp4", "/comida/helado.mp4", "/comida/pizza.mp4"], // Lavandería Express
    "22": ["/comida/Pizza.mp4", "/comida/Pizza 2.mp4", "/comida/Pizza 3.mp4"], // Pizzería Don Antonio
    "23": ["/comida/saludable.mp4", "/comida/diet.mp4", "/comida/fornello.mp4"], // Óptica Visión
    "24": ["/comida/topping.mp4", "/comida/helado.mp4", "/comida/lomito.mp4"], // Florería Jardín
    "25": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Heladería Cremosa
    "26": ["/comida/lomito.mp4", "/comida/helado.mp4", "/comida/pizza.mp4"], // Banco Regional
    "27": ["/comida/diet.mp4", "/comida/fornello.mp4", "/comida/topping.mp4"], // Academia de Idiomas Global
    "28": ["/comida/helado.mp4", "/comida/topping.mp4", "/comida/diet.mp4"], // Kiosco 24 Horas
    "29": ["/comida/topping.mp4", "/comida/helado.mp4", "/comida/lomito.mp4"], // Taller de Bicicletas Rueda
    "30": ["/comida/saludable.mp4", "/comida/diet.mp4", "/comida/fornello.mp4"], // Centro Médico Salud
  };

  return (
    galleryImages[commerceId] || [
      "/comida/diet.mp4",
      "/comida/fornello.mp4",
      "/comida/topping.mp4",
    ]
  );
};

export default function ComercioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [comercio, setComercio] = useState<Comercio | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    // if (params.id) {
      const fetchComercio = async () => {
        const { data, error } = await supabase
          .from("comercios")
          .select("*")
          .eq("slug", params.id as string)
          .maybeSingle();
        if (error) {
          console.error('Error cargando comercio:', error);
          return;
        }
        if (data) {
          setComercio(data as any);
        }
      };

      fetchComercio()
    // }
  }, []);


  console.log('comercio: ', (comercio as any)?.banners_url?.[selectedImage]);
  useEffect(() => {
    if (typeof window !== "undefined" && comercio) {
      setShareUrl(
        `${window.location.origin}/comercios/${(comercio as any)?.slug}`
      );
    }
  }, [comercio]);

  // Función para abrir Google Maps con la dirección
  const openInMaps = (comercio: Comercio) => {
    const address = encodeURIComponent(
      `${comercio.location}, ${comercio.neighborhood}, Córdoba, Argentina`
    );
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(mapsUrl, "_blank");
  };

  // Función para compartir usando Web Share API
  const shareCommerce = async (comercio: Comercio) => {
    if (navigator.share && typeof window !== "undefined") {
      try {
        await navigator.share({
          title: comercio.name,
          text: comercio.description,
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
  const shareOnSocialMedia = (platform: string, comercio: Comercio) => {
    const text = encodeURIComponent(
      `Descubre ${comercio.name} en Revista Matices: ${comercio.description}`
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

  // if (!comercio?.id) {
  //   return (
  //     <LandingLayout>
  //       <div className="min-h-screen flex items-center justify-center">
  //         <div className="text-center">
  //           <h1 className="text-2xl font-bold text-gray-900 mb-4">
  //             Comercio no encontrado
  //           </h1>
  //           <p className="text-gray-600 mb-6">
  //             El comercio que buscas no existe o ha sido removido.
  //           </p>
  //           <Button onClick={() => router.back()}>
  //             <ArrowLeft className="w-4 h-4 mr-2" />
  //             Volver
  //           </Button>
  //         </div>
  //       </div>
  //     </LandingLayout>
  //   );
  // }

  return (
    <LandingLayout>
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
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={isFavorited ? "text-red-500 border-red-200" : ""}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`}
                  />
                </Button>
                <Button variant="outline" size="sm">
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
                          src={(comercio as any)?.banners_url?.[selectedImage]}
                          type="video/mp4"
                        />
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <Camera className="w-12 h-12 text-gray-400" />
                        </div>
                      </video>
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
                          {comercio?.name}
                        </h1>
                        <Badge variant="secondary" className="text-sm">
                          {comercio?.category}
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
                    {comercio?.description}
                  </p>

                  {/* Servicios */}
                  {comercio?.tags && comercio?.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Servicios
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {comercio?.tags.map((service, index) => (
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
            </div>

            

            {/* Sidebar con información de contacto */}
            <div className="space-y-6">
              {/* Información de contacto */}
              <Card>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="flex items-center gap-3 mb-4 ">
                  <Image src={comercio?.logo_url || '/images/logo.jpg'} alt={comercio?.name || 'Comercio'} width={80} height={80} className="flex-shrink-0 rounded" />
                  <span className="font-semibold text-gray-900">Sobre este comercio</span>
                  </h3>

                  <div className="p-6 space-y-4">
                    <p>
                      Este establecimiento forma parte de la comunidad del Cerro
                      de las Rosas y se destaca por su compromiso con la calidad
                      y el servicio al cliente.
                    </p>
                    {/* <p>
                      <strong>Barrio:</strong> {comercio.neighborhood}
                    </p> */}
                    <p>
                      <strong>Categoría:</strong> {comercio?.category}
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
                          {comercio?.direction}
                        </p>
                        {/* <p className="text-sm text-gray-600">
                          {comercio.neighborhood}
                        </p> */}
                      </div>
                    </div>

                    {/* Teléfono */}
                    {comercio?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <a
                          href={`tel:${comercio?.phone}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {comercio?.phone}
                        </a>
                      </div>
                    )}

                    {/* Email */}
                    {/* {comercio.contact?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <a
                          href={`mailto:${comercio.contact.email}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {comercio.contact.email}
                        </a>
                      </div>
                    )} */}

                    {/* Website */}
                    {/* {comercio.contact?.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <a
                          href={`https://${comercio.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          {comercio.contact.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )} */}
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-6 space-y-3">
                    {comercio?.phone && (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Llamar ahora
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => comercio && openInMaps(comercio)}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Cómo llegar
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => comercio && shareCommerce(comercio)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/*
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Horarios de Atención
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunes - Viernes</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábado</span>
                      <span className="font-medium">9:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingo</span>
                      <span className="font-medium">Cerrado</span>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

            
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compartir */}
      {showShareModal && comercio && (
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
                  {comercio.description}
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
    </LandingLayout>
  );
}
