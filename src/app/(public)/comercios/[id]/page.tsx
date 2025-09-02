'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Comercio } from '@/types/sugerencias';
import { comerciosSugerencias } from '@/data/comercios-sugerencias';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Globe, Star, ArrowLeft, Clock, Users, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComercioPage() {
  const params = useParams();
  const router = useRouter();
  const [comercio, setComercio] = useState<Comercio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const comercioEncontrado = comerciosSugerencias.find(
        (c) => c.id === params.id || c.name.toLowerCase().replace(/\s+/g, '-') === params.id
      );
      if (comercioEncontrado) setComercio(comercioEncontrado);
      else router.push('/sugerencias');
      setLoading(false);
    }
  }, [params.id, router]);

  const renderBusinessLogo = () => {
    if (!comercio) return null;
    if (comercio.name === 'Betos') {
      return (
        <div className="text-white text-center">
          <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="font-bold text-3xl">B</span>
          </div>
          <div className="text-3xl font-bold">el verdadero</div>
          <div className="text-4xl font-bold">LOMITO</div>
        </div>
      );
    }
    if (comercio.name === 'Vidón Bar') {
      return (
        <div className="text-white text-center">
          <div className="text-5xl font-serif italic mb-4">Vidón</div>
          <div className="text-xl tracking-wider">~ BAR ~</div>
        </div>
      );
    }
    if (comercio.name === 'Pizza Libre') {
      return (
        <div className="text-black text-center">
          <div className="text-4xl font-bold">PIZZA</div>
          <div className="text-3xl font-serif italic">Libre</div>
        </div>
      );
    }
    if (comercio.name === 'Kit Wonder') {
      return (
        <div className="text-white text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-3xl font-bold">W</span>
          </div>
          <div className="text-2xl font-bold">KIT WONDER</div>
        </div>
      );
    }
    return (
      <div className="text-white text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
          <span className="text-3xl font-bold">{comercio.name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="text-2xl font-bold">{comercio.name}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando comercio...</p>
        </div>
      </div>
    );
  }

  if (!comercio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Comercio no encontrado</h1>
          <p className="text-gray-600 mb-6">El comercio que buscas no existe o ha sido removido.</p>
          <Link href="/sugerencias">
            <Button>Volver a Sugerencias</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/sugerencias">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Sugerencias
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">{comercio.category}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className={`${comercio.backgroundColor} rounded-2xl p-8 mb-8 text-center relative overflow-hidden`}>
            {renderBusinessLogo()}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{comercio.name}</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{comercio.description}</p>
              </div>

              <div className="flex items-center justify-center space-x-8 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">4.8</span>
                  </div>
                  <p className="text-sm text-gray-600">Excelente</p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">+500 clientes</p>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Verificado</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  Ubicación
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-900">{comercio.location}</p>
                    <p className="text-gray-600">{comercio.neighborhood}</p>
                  </div>
                  <div className="text-right">
                    <Button variant="outline" size="sm">Ver en Mapa</Button>
                  </div>
                </div>
              </div>

              {comercio.contact && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
                  <div className="space-y-3">
                    {comercio.contact.phone && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 mr-3 text-green-500" />
                          <span className="text-gray-700">{comercio.contact.phone}</span>
                        </div>
                        <Button variant="outline" size="sm">Llamar</Button>
                      </div>
                    )}
                    {comercio.contact.website && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe className="h-5 w-5 mr-3 text-blue-500" />
                          <span className="text-gray-700">{comercio.contact.website}</span>
                        </div>
                        <Button variant="outline" size="sm">Visitar Sitio</Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {comercio.services && comercio.services.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios Ofrecidos</h3>
                  <div className="flex flex-wrap gap-3">
                    {comercio.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">{service}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-500" />
                Horarios de Atención
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Lunes a Viernes</h4>
                  <p className="text-gray-600">8:00 AM - 10:00 PM</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sábados y Domingos</h4>
                  <p className="text-gray-600">9:00 AM - 11:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">¿Te gustó este comercio?</h3>
              <p className="text-blue-100 mb-6">Comparte tu experiencia y ayúdanos a crecer</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">Dejar Reseña</Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">Compartir</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

