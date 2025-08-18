import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Newspaper, 
  Heart, 
  Target, 
  Globe,
  Phone,
  Mail,
  Clock,
  Star
} from 'lucide-react';
import { APP_CONFIG } from '@/data/constants';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Sobre Revista Matices
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            34 años informando y conectando a la comunidad del Cerro de las Rosas
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Historia Section */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
                <Calendar className="h-3 w-3 mr-1" />
                Desde 1990
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Revista Matices nació en 1990 como una iniciativa de un grupo de 
                  vecinos del Cerro de las Rosas que querían mantener informada a 
                  la comunidad sobre las noticias locales, eventos y comercios del barrio.
                </p>
                <p>
                  Comenzamos como una publicación impresa distribuida puerta a puerta, 
                  con un equipo de solo 3 personas y un sueño: crear un medio de 
                  comunicación que reflejara la identidad y valores de nuestro barrio.
                </p>
                <p>
                  A lo largo de estos 34 años, hemos crecido junto con la comunidad, 
                  adaptándonos a los cambios tecnológicos y las nuevas necesidades 
                  de nuestros lectores, pero siempre manteniendo nuestro compromiso 
                  con la información local de calidad.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/historia-matices.jpg"
                alt="Historia de Revista Matices"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">34</div>
                  <div className="text-sm text-gray-600">Años de trayectoria</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Valores */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestra Misión y Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos guiamos por principios que han sido la base de nuestro éxito 
              durante más de tres décadas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-4">
                Misión
              </CardTitle>
              <p className="text-gray-600">
                Informar, conectar y fortalecer a la comunidad del Cerro de las Rosas 
                a través de noticias locales relevantes y contenido de calidad que 
                refleje la identidad de nuestro barrio.
              </p>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-4">
                Valores
              </CardTitle>
              <p className="text-gray-600">
                Compromiso con la verdad, responsabilidad social, respeto por la 
                diversidad, innovación constante y profundo amor por nuestra 
                comunidad y el Cerro de las Rosas.
              </p>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-4">
                Visión
              </CardTitle>
              <p className="text-gray-600">
                Ser el medio de comunicación de referencia para el norte de Córdoba, 
                liderando la transformación digital de la información local y 
                manteniendo nuestra esencia comunitaria.
              </p>
            </Card>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Revista Matices en Números
              </h2>
              <p className="text-xl text-gray-600">
                Nuestro impacto en la comunidad a lo largo de 34 años
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">34</div>
                <div className="text-gray-600">Años de trayectoria</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-gray-600">Artículos semanales</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">5K+</div>
                <div className="text-gray-600">Lectores mensuales</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">20+</div>
                <div className="text-gray-600">Comercios asociados</div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce a las personas que hacen posible Revista Matices día a día
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                María González
              </CardTitle>
              <p className="text-blue-600 font-medium mb-2">Directora General</p>
              <p className="text-gray-600 text-sm">
                Con 25 años en Revista Matices, María lidera nuestro equipo 
                y mantiene la visión editorial que ha hecho grande a la revista.
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                Carlos Rodríguez
              </CardTitle>
              <p className="text-green-600 font-medium mb-2">Editor Jefe</p>
              <p className="text-gray-600 text-sm">
                Periodista con 20 años de experiencia, Carlos supervisa todo 
                el contenido editorial y mantiene los estándares de calidad.
              </p>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                Ana Martínez
              </CardTitle>
              <p className="text-purple-600 font-medium mb-2">Directora Comercial</p>
              <p className="text-gray-600 text-sm">
                Ana gestiona las relaciones con comercios y anunciantes, 
                asegurando la sostenibilidad económica de la revista.
              </p>
            </Card>
          </div>
        </section>

        {/* Cobertura */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nuestra Cobertura
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Revista Matices cubre todo el norte de Córdoba, con especial 
                  énfasis en el Cerro de las Rosas y barrios aledaños. Nuestro 
                  equipo de reporteros locales está presente en todos los eventos 
                  importantes de la comunidad.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Cerro de las Rosas</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Nueva Córdoba</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Güemes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Alta Córdoba</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Image
                  src="/images/cobertura-cordoba.jpg"
                  alt="Cobertura en Córdoba"
                  width={500}
                  height={400}
                  className="rounded-2xl shadow-lg"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Quieres saber más sobre nosotros?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Estamos aquí para responder tus preguntas y escuchar tus sugerencias. 
              ¡Contáctanos!
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">{APP_CONFIG.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">{APP_CONFIG.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Clock className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">Lun-Vie: 9:00-18:00</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="mr-2 h-5 w-5" />
                Enviar Mensaje
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="mr-2 h-5 w-5" />
                Llamar Ahora
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

