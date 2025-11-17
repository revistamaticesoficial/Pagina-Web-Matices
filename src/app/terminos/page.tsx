import Link from "next/link"
import { Metadata } from "next"
import LandingLayout from "@/components/layout/LandingLayout"
import { APP_CONFIG } from "@/data/constants"
import { LegalSection } from "@/components/content/LegalSection"

export const metadata: Metadata = {
  title: "Términos y Condiciones - Revista Matices",
  description:
    "Condiciones de uso del ecosistema digital de Revista Matices: artículos, comercios, eventos, beneficios y espacios de anunciantes.",
}

const LAST_UPDATE = "17 de noviembre de 2025"

const quickLinks = [
  { id: "introduccion", label: "Introducción" },
  { id: "servicios", label: "Servicios" },
  { id: "cuentas", label: "Cuentas y acceso" },
  { id: "contenido-terceros", label: "Contenido de terceros" },
  { id: "interacciones", label: "Interacciones y datos" },
  { id: "propiedad", label: "Propiedad intelectual" },
  { id: "publicidad", label: "Publicidad y alianzas" },
  { id: "responsabilidad", label: "Responsabilidad" },
  { id: "modificaciones", label: "Cambios y contacto" },
]

export default function TerminosPage() {
  return (
    <LandingLayout>
      <div className="bg-white">
        <section className="bg-gradient-to-r from-[#003C56] via-[#005B82] to-[#0075A3] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white/75 mb-4">
              Condiciones Legales
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Términos y Condiciones de Uso</h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Este documento describe las reglas que aplican al navegar por nuestro sitio, descargar ediciones
              digitales, participar de beneficios, contactar comercios del Cerro de las Rosas o utilizar el panel
              para anunciantes.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 text-sm text-white/80">
              Última actualización: {LAST_UPDATE}
            </div>
          </div>
          </section>

        <section className="bg-slate-50 px-4 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-2xl bg-white shadow-sm border border-slate-100 p-6 h-fit">
              <p className="text-sm font-semibold text-slate-500 mb-4 tracking-wide uppercase">Índice rápido</p>
              <nav className="space-y-2">
                {quickLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#005B82] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                Recordá consultar también nuestra{" "}
                <Link href="/privacidad" className="text-[#005B82] font-semibold hover:underline">
                  Política de Privacidad
                </Link>{" "}
                para conocer cómo tratamos tus datos.
              </div>
            </aside>

            <div className="space-y-10">
              <LegalSection
                id="introduccion"
                title="1. Introducción y aceptación"
                description={
                  <>
                    Revista Matices opera el portal{" "}
                    <Link href="/" className="text-[#005B82] font-semibold hover:underline">
                      {APP_CONFIG.url.replace("https://", "")}
                    </Link>{" "}
                    y sus secciones asociadas (artículos, comercios, ediciones, eventos, sugerencias, contacto y
                    paneles privados). Al navegar, descargar archivos, pedir turnos/beneficios o iniciar sesión en
                    nuestras áreas administradas por Supabase, aceptás estos términos. Si no estás de acuerdo,
                    te pedimos que te abstengas de utilizar la plataforma.
                  </>
                }
              />

              <LegalSection
                id="servicios"
                title="2. Servicios que ofrece Matices"
                description="Nuestros productos digitales están diseñados para promover el ecosistema del Cerro de las Rosas y el norte de Córdoba. Así funcionan:"
                bullets={[
                  {
                    title: "Artículos y notas",
                    description:
                      "Publicamos contenidos periodísticos y editoriales a través de las rutas /articulos y /notas. El material se gestiona desde el editor interno (ArticleEditor) y puede incluir texto, imágenes, video y etiquetas temáticas.",
                  },
                  {
                    title: "Ediciones digitales",
                    description:
                      "En la sección /ediciones ofrecemos descarga de PDFs alojados en Supabase Storage. Los archivos se entregan tal cual fueron maquetados y no pueden redistribuirse sin autorización escrita.",
                  },
                  {
                    title: "Directorio de comercios y fichas detalladas",
                    description:
                      "Las vistas /comercios y /comercios/[slug] muestran información que los propios negocios cargan mediante el panel administrativo (ComercioModal, ComerciosGrid).",
                  },
                  {
                    title: "Eventos, beneficios y sugerencias",
                    description:
                      "El módulo /sugerencias centraliza tarjetas de comercios, eventos y promociones activas. Los beneficios se canjean a través del ModalPromo, que requiere que aceptes estos términos antes de enviar tus datos.",
                  },
                  {
                    title: "Canales de contacto y soporte",
                    description:
                      "El formulario de /contacto utiliza EmailJS para enviar tus consultas a publicidadnuevosmatices@gmail.com. También ofrecemos enlaces directos a WhatsApp y redes sociales oficiales.",
                  },
                  {
                    title: "Plataforma para anunciantes",
                    description:
                      "Las rutas /admin y /gestion están pensadas para el staff y comercios asociados. Desde allí se administran artículos, beneficios, ediciones, anuncios y estadísticas por medio del adminService.",
                  },
                ]}
              />

              <LegalSection
                id="cuentas"
                title="3. Cuentas, acceso y seguridad"
                description="Determinadas funciones (crear artículos, editar comercios, cargar beneficios o revisar clientes) exigen autenticación mediante Supabase."
                bullets={[
                  {
                    title: "Credenciales personales",
                    description:
                      "Cada usuario registrado posee un perfil en la tabla profiles y debe preservar la confidencialidad de su correo y contraseña. El acceso compartido o la suplantación no están permitidos.",
                  },
                  {
                    title: "Controls de acceso",
                    description:
                      "El middleware descrito en AuthProvider redirige automáticamente a /auth/login cuando alguien sin sesión intenta entrar a /admin o /gestion. Nos reservamos el derecho de suspender cuentas ante usos indebidos.",
                  },
                  {
                    title: "Integridad de los datos",
                    description:
                      "Si publicás información de tu negocio o subís materiales (imágenes en buckets como benefits o articles, PDFs de ediciones, etc.), garantizás que contás con los derechos necesarios y que el contenido es veraz.",
                  },
                ]}
              />

              <LegalSection
                id="contenido-terceros"
                title="4. Contenido editorial y aportado por terceros"
                description="Matices combina producción propia con datos brindados por comercios, anunciantes y miembros de la comunidad."
                bullets={[
                  {
                    title: "Fuentes externas",
                    description:
                      "Las fichas comerciales, eventos y promociones son elaboradas con información enviada por sus responsables a través de adminService.getComercios, EventModal o BenefitModal. Matices no garantiza disponibilidad, precios, horarios ni stock.",
                  },
                  {
                    title: "Comentarios y testimonios",
                    description:
                      "Cualquier cita, reseña o mención de terceros se publica con fines informativos. Las opiniones pertenecen a sus autores.",
                  },
                  {
                    title: "Material multimedia",
                    description:
                      "Las imágenes o videos subidos mediante ImageUpload/MarkdownImageUpload deben respetar derechos de autor. Si detectás contenido no autorizado, escribinos para retirarlo de inmediato.",
                  },
                ]}
              />

              <LegalSection
                id="interacciones"
                title="5. Interacciones, formularios y tratamiento de datos"
                description="Cuando completás un formulario en Matices, procesamos tu información para brindarte el servicio solicitado."
              >
                <ul className="space-y-3 text-slate-600 text-base leading-relaxed">
                  <li>
                    <span className="font-semibold text-slate-900">Contacto editorial/publicitario:</span> el
                    formulario de /contacto solicita nombre, email, título y mensaje. Los datos viajan a través de
                    EmailJS y luego se atienden internamente por nuestro equipo comercial.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Canje de beneficios:</span> el ModalPromo y la
                    API /api/benefits/redeem registran nombre completo, DNI, teléfono y (opcional) email en las
                    tablas benefit_redemptions y benefit_claims de Supabase para validar identidad, controlar stock
                    y evitar duplicados. Compartimos con el comercio sólo lo indispensable para atender tu pedido.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Localización y medios externos:</span> las
                    incrustaciones de Google Maps, enlaces a WhatsApp API y perfiles sociales (Instagram, Facebook)
                    redirigen a servicios que poseen sus propios términos; al usarlos aceptás sus condiciones.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Seguridad:</span> empleamos Supabase como
                    backend gestionado con autenticación y storage cifrado en tránsito. Aun así, ningún sistema es
                    infalible, por lo que te pedimos que no envíes datos sensibles que no sean imprescindibles.
                  </li>
            </ul>
              </LegalSection>

              <LegalSection
                id="propiedad"
                title="6. Propiedad intelectual y uso del contenido"
                description="Todo el material identificado con la marca Revista Matices —incluyendo logotipos, diseños de interfaz, tipografías personalizadas, ediciones descargables y artículos— es propiedad de sus respectivos autores y se encuentra protegido por las leyes de derechos de autor de la República Argentina."
                bullets={[
                  {
                    title: "Licencia limitada",
                    description:
                      "Te autorizamos a leer y compartir enlaces hacia nuestros contenidos para uso personal y no comercial. Queda prohibida la reproducción total o parcial de revistas, notas, imágenes, códigos QR o PDFs sin consentimiento escrito.",
                  },
                  {
                    title: "Marcas de terceros",
                    description:
                      "Los logotipos y marcas que aparecen en fichas de comercios o beneficios pertenecen a sus dueños. Se muestran únicamente para identificar los servicios ofrecidos.",
                  },
                  {
                    title: "Reportes de infracciones",
                    description:
                      "Si creés que algún contenido vulnera tus derechos, escribinos a info@revistamatices.com indicando la URL y la acreditación correspondiente.",
                  },
                ]}
              />

              <LegalSection
                id="publicidad"
                title="7. Publicidad, acuerdos comerciales y anuncios destacados"
                description="Matices ofrece espacios promocionales, anuncios emergentes (AnnouncementProvider) y publicaciones especiales para comercios aliados."
                bullets={[
                  {
                    title: "Briefing y aprobaciones",
                    description:
                      "Todo material publicitario debe cumplir las pautas editoriales y legales vigentes. Nos reservamos el derecho de rechazar piezas que sean engañosas, ofensivas o que vulneren normativas.",
                  },
                  {
                    title: "Responsabilidad comercial",
                    description:
                      "Los términos específicos de una campaña (duración, métricas, pagos) se pactan por contrato con cada anunciante y son independientes de estas Condiciones generales.",
                  },
                  {
                    title: "Contenido patrocinado",
                    description:
                      "Cuando una nota, video o banner responda a un acuerdo comercial, lo identificaremos como tal para mantener la transparencia con nuestra audiencia.",
                  },
                ]}
              />

              <LegalSection
                id="responsabilidad"
                title="8. Limitación de responsabilidad"
                description="Aunque revisamos continuamente el sitio, no podemos garantizar que toda la información esté libre de errores o interrupciones."
                bullets={[
                  {
                    title: "Disponibilidad del servicio",
                    description:
                      "Realizamos tareas de mantenimiento y optimización (revalidación de datos, despliegues de Next.js, actualizaciones de Supabase) que podrían ocasionar breves cortes.",
                  },
                  {
                    title: "Información referencial",
                    description:
                      "Los horarios, precios, beneficios, direcciones o teléfonos son aportados por terceros. Utilízalos como guía y confirmá con el comercio/organizador antes de desplazarte.",
                  },
                  {
                    title: "Daños indirectos",
                    description:
                      "Revista Matices no será responsable por pérdidas de oportunidad, lucro cesante o daños derivados del uso (o imposibilidad de uso) del sitio, salvo dolo o culpa grave comprobada.",
                  },
                ]}
              />

              <LegalSection
                id="modificaciones"
                title="9. Cambios, vigencia y contacto"
                description="Podemos modificar estos términos cuando incorporemos nuevas funcionalidades —por ejemplo, un nuevo tipo de beneficio, un panel adicional o integraciones con terceros—."
              >
                <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                  <p>
                    Publicaremos la versión actualizada en esta misma URL e indicaremos la nueva fecha de vigencia.
                    El uso continuado del sitio luego de los cambios implica tu aceptación. Te recomendamos revisar
                    estas condiciones antes de usar funcionalidades sensibles (cargar datos de clientes, descargar
                    PDFs, canjear beneficios, etc.).
                  </p>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Canales de contacto oficial</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>
                        <span className="font-semibold text-slate-900">Correo:</span>{" "}
                        <a href={`mailto:${APP_CONFIG.email}`} className="text-[#005B82] hover:underline">
                          {APP_CONFIG.email}
                        </a>
                      </li>
                      <li>
                        <span className="font-semibold text-slate-900">Teléfono:</span>{" "}
                        <a href="tel:+543511234567" className="text-[#005B82] hover:underline">
                          {APP_CONFIG.phone}
                        </a>
                      </li>
                      <li>
                        <span className="font-semibold text-slate-900">Dirección:</span> {APP_CONFIG.address}
                      </li>
            </ul>
                    <p className="mt-4 text-sm text-slate-500">
                      Jurisdicción aplicable: República Argentina. Cualquier controversia será resuelta por los
                      tribunales ordinarios de la ciudad de Córdoba.
            </p>
          </div>
        </div>
              </LegalSection>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
