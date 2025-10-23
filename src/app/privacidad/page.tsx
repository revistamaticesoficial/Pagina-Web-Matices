import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad - Revista Matices',
  description: 'Política de privacidad y protección de datos de Revista Matices',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Política de Privacidad
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Última actualización: {new Date().toLocaleDateString('es-AR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              1. Información General
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Revista Matices se compromete a proteger su privacidad y datos personales. Esta política 
              describe cómo recopilamos, utilizamos, almacenamos y protegemos su información personal 
              cuando utiliza nuestro sitio web y servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              2. Información que Recopilamos
            </h2>
            <div className="text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-medium text-foreground mb-3">2.1 Información Personal</h3>
              <p className="mb-4">
                Recopilamos información que usted nos proporciona voluntariamente, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección postal</li>
                <li>Información de contacto para comercios</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">2.2 Información Técnica</h3>
              <p className="mb-4">
                Automáticamente recopilamos cierta información técnica, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Dirección IP</li>
                <li>Tipo de navegador y versión</li>
                <li>Sistema operativo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Fecha y hora de acceso</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              3. Uso de la Información
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos su información personal para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Enviar newsletters y comunicaciones relevantes</li>
              <li>Procesar suscripciones y pagos</li>
              <li>Responder a sus consultas y solicitudes</li>
              <li>Personalizar su experiencia en el sitio web</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              4. Compartir Información
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              No vendemos, alquilamos ni compartimos su información personal con terceros, excepto en 
              las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
              <li>Con su consentimiento explícito</li>
              <li>Para cumplir con obligaciones legales</li>
              <li>Con proveedores de servicios que nos ayudan a operar el sitio web</li>
              <li>En caso de fusión, adquisición o venta de activos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              5. Cookies y Tecnologías Similares
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio web. 
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo. Puede 
              controlar el uso de cookies a través de la configuración de su navegador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              6. Seguridad de los Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su 
              información personal contra acceso no autorizado, alteración, divulgación o destrucción. 
              Sin embargo, ningún método de transmisión por internet es 100% seguro.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              7. Sus Derechos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              De acuerdo con la Ley de Protección de Datos Personales de Argentina, usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos o incompletos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al tratamiento de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              8. Retención de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos su información personal solo durante el tiempo necesario para cumplir con los 
              propósitos descritos en esta política, a menos que la ley requiera un período de retención más largo.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              9. Menores de Edad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente 
              información personal de menores de edad sin el consentimiento de sus padres o tutores.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              10. Cambios a esta Política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre 
              cambios significativos publicando la nueva política en nuestro sitio web con una fecha 
              de actualización revisada.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              11. Contacto
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre esta política de privacidad o desea ejercer sus derechos, 
              puede contactarnos:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
              <li>Email: info@revistamatices.com</li>
              <li>Teléfono: +54 351 123-4567</li>
              <li>Dirección: Av. Rafael Núñez 3000, Cerro de las Rosas, Córdoba, Argentina</li>
            </ul>
          </section>

          <div className="border-t pt-8 mt-12">
            <p className="text-sm text-muted-foreground">
              Esta política de privacidad se rige por las leyes de la República Argentina y cumple 
              con la Ley de Protección de Datos Personales N° 25.326.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
