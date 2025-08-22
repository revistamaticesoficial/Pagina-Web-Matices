import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
// import { Badge } from '@/components/ui/Badge';
// import { Separator } from '@/components/ui/Separator';
import { Check, Crown, Star, Zap, Shield, Users, Clock } from 'lucide-react';
import { subscriptionPlans } from '@/data/subscriptions';
import { formatPrice } from '@/lib/utils';

export default function SuscripcionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Suscripciones Premium
          </h1>
          <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Accede a contenido exclusivo, sin publicidades y disfruta de 
            todas las ventajas de Revista Matices
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden ${
                plan.popular 
                  ? 'ring-2 ring-purple-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-semibold">
                  <Star className="h-4 w-4 inline mr-1" />
                  Más Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price === 0 ? 'Gratis' : formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 ml-2">
                      /{plan.period === 'monthly' ? 'mes' : 'año'}
                    </span>
                  )}
                </div>
                {plan.period === 'yearly' && plan.price > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    ¡Ahorra 2 meses al año!
                  </p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  size="lg"
                >
                  {plan.price === 0 ? 'Comenzar Gratis' : 'Suscribirse Ahora'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué suscribirse a Revista Matices?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre todas las ventajas de ser parte de nuestra comunidad premium
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Contenido Exclusivo
              </h3>
              <p className="text-gray-600">
                Accede a artículos premium, reportajes especiales y contenido 
                que no encontrarás en ningún otro lugar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sin Publicidades
              </h3>
              <p className="text-gray-600">
                Disfruta de una experiencia de lectura limpia y sin interrupciones 
                publicitarias
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Acceso Prioritario
              </h3>
              <p className="text-gray-600">
                Sé el primero en conocer las noticias y eventos del barrio 
                con acceso prioritario a todo el contenido
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Comunidad Exclusiva
              </h3>
              <p className="text-gray-600">
                Únete a nuestra comunidad premium y conecta con otros 
                vecinos del Cerro de las Rosas
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Resolvemos tus dudas sobre nuestras suscripciones
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Puedo cancelar mi suscripción en cualquier momento?
                </h3>
                <p className="text-gray-600">
                  Sí, puedes cancelar tu suscripción en cualquier momento desde tu 
                  perfil de usuario sin penalizaciones.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Qué métodos de pago aceptan?
                </h3>
                <p className="text-gray-600">
                  Aceptamos tarjetas de crédito, débito y transferencias bancarias. 
                  Todos los pagos son procesados de forma segura.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿El contenido premium incluye todo el archivo histórico?
                </h3>
                <p className="text-gray-600">
                  Sí, con la suscripción premium tienes acceso completo a todo 
                  nuestro archivo de artículos y contenido histórico.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Hay descuentos para estudiantes o jubilados?
                </h3>
                <p className="text-gray-600">
                  Sí, ofrecemos descuentos especiales para estudiantes y jubilados. 
                  Contacta con nuestro equipo para más información.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Puedo compartir mi cuenta con mi familia?
                </h3>
                <p className="text-gray-600">
                  Cada suscripción es individual, pero puedes crear cuentas 
                  familiares con descuentos especiales.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Ofrecen prueba gratuita?
                </h3>
                <p className="text-gray-600">
                  Sí, ofrecemos una prueba gratuita de 7 días para que puedas 
                  experimentar todas las ventajas premium.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Únete a miles de vecinos del Cerro de las Rosas que ya disfrutan 
              de contenido premium y noticias exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Clock className="mr-2 h-5 w-5" />
                Prueba Gratuita 7 Días
              </Button>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Crown className="mr-2 h-5 w-5" />
                Suscribirse Ahora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

