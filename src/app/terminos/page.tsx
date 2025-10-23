import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Revista Matices',
  description: 'Términos y condiciones de uso de Revista Matices',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Términos y Condiciones
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar Revista Matices, usted acepta estar sujeto a estos términos y condiciones de uso. 
              Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Descripción del Servicio
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Revista Matices es una publicación digital que proporciona información local sobre el Cerro de las Rosas 
              y el norte de Córdoba, Argentina. Nuestros servicios incluyen noticias, información sobre comercios locales, 
              eventos y contenido de interés para la comunidad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Uso Aceptable
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Usted se compromete a utilizar nuestro sitio web de manera responsable y legal. Está prohibido:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Utilizar el sitio para actividades ilegales o no autorizadas</li>
              <li>Interferir con el funcionamiento del sitio web</li>
              <li>Intentar acceder a áreas restringidas del sitio</li>
              <li>Reproducir, distribuir o modificar contenido sin autorización</li>
              <li>Enviar spam o contenido malicioso</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Propiedad Intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Todo el contenido de Revista Matices, incluyendo textos, imágenes, videos, logos y diseño, 
              está protegido por derechos de autor y otras leyes de propiedad intelectual. El contenido 
              no puede ser reproducido, distribuido o utilizado sin el permiso expreso de Revista Matices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Limitación de Responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Revista Matices no se hace responsable por la exactitud, completitud o actualidad de la información 
              proporcionada. El uso del sitio web es bajo su propio riesgo. No garantizamos que el sitio esté 
              libre de errores o interrupciones.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Modificaciones
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
              Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. 
              Es su responsabilidad revisar periódicamente estos términos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través de:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
              <li>Email: info@revistamatices.com</li>
              <li>Teléfono: +54 351 123-4567</li>
              <li>Dirección: Av. Rafael Núñez 3000, Cerro de las Rosas, Córdoba, Argentina</li>
            </ul>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground">
              Estos términos y condiciones se rigen por las leyes de la República Argentina.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
