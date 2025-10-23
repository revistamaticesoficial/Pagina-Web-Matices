import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies - Revista Matices',
  description: 'Política de cookies y tecnologías de seguimiento de Revista Matices',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Política de Cookies
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. ¿Qué son las Cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita 
              nuestro sitio web. Estas cookies nos permiten reconocer su dispositivo y recordar información 
              sobre su visita, como sus preferencias de idioma y otras configuraciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Tipos de Cookies que Utilizamos
            </h2>
            
            <div className="text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-medium text-foreground mb-3">2.1 Cookies Esenciales</h3>
              <p className="mb-4">
                Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                <li>Cookies de sesión para mantener su sesión activa</li>
                <li>Cookies de seguridad para proteger contra ataques</li>
                <li>Cookies de funcionalidad básica del sitio</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">2.2 Cookies de Rendimiento</h3>
              <p className="mb-4">
                Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                <li>Google Analytics para análisis de tráfico</li>
                <li>Cookies de seguimiento de páginas visitadas</li>
                <li>Cookies de tiempo de permanencia en el sitio</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">2.3 Cookies de Funcionalidad</h3>
              <p className="mb-4">
                Estas cookies mejoran la funcionalidad del sitio web y personalizan su experiencia:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                <li>Preferencias de idioma</li>
                <li>Configuraciones de accesibilidad</li>
                <li>Preferencias de visualización</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">2.4 Cookies de Marketing</h3>
              <p className="mb-4">
                Estas cookies se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cookies de redes sociales (Facebook, Instagram)</li>
                <li>Cookies de publicidad dirigida</li>
                <li>Cookies de seguimiento de conversiones</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Cookies de Terceros
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nuestro sitio web puede contener cookies de terceros, incluyendo:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento de usuarios</li>
              <li><strong>Redes Sociales:</strong> Para integración con Facebook, Instagram y otras plataformas</li>
              <li><strong>Servicios de Publicidad:</strong> Para mostrar anuncios relevantes</li>
              <li><strong>Servicios de Mapas:</strong> Para mostrar ubicaciones de comercios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Duración de las Cookies
            </h2>
            <div className="text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-medium text-foreground mb-3">4.1 Cookies de Sesión</h3>
              <p className="mb-4">
                Se eliminan cuando cierra su navegador. Se utilizan para mantener su sesión activa durante su visita.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">4.2 Cookies Persistentes</h3>
              <p className="mb-4">
                Permanecen en su dispositivo durante un período determinado o hasta que las elimine manualmente:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cookies de preferencias: hasta 1 año</li>
                <li>Cookies de análisis: hasta 2 años</li>
                <li>Cookies de marketing: hasta 1 año</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Cómo Gestionar las Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Puede controlar y gestionar las cookies de varias maneras:
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-3">5.1 Configuración del Navegador</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  La mayoría de los navegadores le permiten:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Ver qué cookies están almacenadas</li>
                  <li>Eliminar cookies individualmente o todas a la vez</li>
                  <li>Bloquear cookies de terceros</li>
                  <li>Recibir notificaciones antes de que se instalen cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-foreground mb-3">5.2 Enlaces de Configuración por Navegador</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Chrome:</strong> Configuración {'>'} Privacidad y seguridad {'>'} Cookies</li>
                  <li><strong>Firefox:</strong> Opciones {'>'} Privacidad y seguridad {'>'} Cookies</li>
                  <li><strong>Safari:</strong> Preferencias {'>'} Privacidad {'>'} Cookies</li>
                  <li><strong>Edge:</strong> Configuración {'>'} Cookies y permisos del sitio</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Consentimiento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Al continuar utilizando nuestro sitio web, usted consiente el uso de cookies de acuerdo 
              con esta política. Si no está de acuerdo con el uso de cookies, puede configurar su 
              navegador para rechazarlas, aunque esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Cookies Específicas que Utilizamos
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Propósito</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Duración</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">_ga</td>
                    <td className="border border-gray-300 px-4 py-2">Google Analytics - Identificación única</td>
                    <td className="border border-gray-300 px-4 py-2">2 años</td>
                    <td className="border border-gray-300 px-4 py-2">Análisis</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">_gid</td>
                    <td className="border border-gray-300 px-4 py-2">Google Analytics - Identificación de sesión</td>
                    <td className="border border-gray-300 px-4 py-2">24 horas</td>
                    <td className="border border-gray-300 px-4 py-2">Análisis</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">session_id</td>
                    <td className="border border-gray-300 px-4 py-2">Mantener sesión de usuario</td>
                    <td className="border border-gray-300 px-4 py-2">Sesión</td>
                    <td className="border border-gray-300 px-4 py-2">Esencial</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">preferences</td>
                    <td className="border border-gray-300 px-4 py-2">Guardar preferencias del usuario</td>
                    <td className="border border-gray-300 px-4 py-2">1 año</td>
                    <td className="border border-gray-300 px-4 py-2">Funcionalidad</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Actualizaciones de esta Política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta política de cookies ocasionalmente para reflejar cambios en 
              nuestras prácticas o por razones operativas, legales o regulatorias. Le recomendamos 
              revisar esta página periódicamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre nuestra política de cookies, puede contactarnos:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
              <li>Email: info@revistamatices.com</li>
              <li>Teléfono: +54 351 123-4567</li>
              <li>Dirección: Av. Rafael Núñez 3000, Cerro de las Rosas, Córdoba, Argentina</li>
            </ul>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground">
              Esta política de cookies cumple con las regulaciones de protección de datos de Argentina 
              y las mejores prácticas internacionales de privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
