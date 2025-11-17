import Link from "next/link"
import { Metadata } from "next"
import LandingLayout from "@/components/layout/LandingLayout"
import { APP_CONFIG } from "@/data/constants"
import { LegalSection } from "@/components/content/LegalSection"

export const metadata: Metadata = {
  title: "Política de Privacidad - Revista Matices",
  description:
    "Conoce cómo Revista Matices recopila, usa y protege tus datos al navegar, enviar formularios, canjear beneficios o utilizar el panel de anunciantes.",
}

const LAST_UPDATE = "17 de noviembre de 2025"

const quickLinks = [
  { id: "resumen", label: "Resumen" },
  { id: "responsable", label: "Responsable" },
  { id: "datos", label: "Datos que recopilamos" },
  { id: "bases-legales", label: "Bases legales" },
  { id: "seguridad", label: "Seguridad y almacenamiento" },
  { id: "contacto", label: "Cambios y contacto" },
]

export default function PrivacidadPage() {
  return (
    <LandingLayout>
      <div className="bg-white">
        <section className="bg-gradient-to-r from-[#003C56] via-[#005B82] to-[#0075A3] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-white/75 mb-4">
              Protección de Datos
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
              Explicamos qué información se recopila cuando leés artículos, descargás ediciones, completás formularios
              de contacto o canjeás beneficios en Revista Matices, cómo la protegemos y qué derechos podés ejercer.
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
                Complementa esta lectura con nuestra{" "}
                <Link href="/terminos" className="text-[#005B82] font-semibold hover:underline">
                  página de Términos
                </Link>{" "}
                donde detallamos las reglas de uso del sitio.
              </div>
            </aside>

            <div className="space-y-10">
              <LegalSection
                id="resumen"
                title="1. Resumen general"
                description="Revista Matices, medio digital del Cerro de las Rosas, trata datos personales únicamente para operar su portal de noticias, el directorio de comercios, los formularios de contacto y los módulos exclusivos para anunciantes. Nada de lo que recopilamos se vende a terceros."
              />

              <LegalSection
                id="responsable"
                title="2. Responsable del tratamiento"
                description={
                  <>
                    El responsable es <strong>{APP_CONFIG.name}</strong>, con domicilio en {APP_CONFIG.address}. Para
                    cualquier gestión vinculada a tus datos podés escribir a{" "}
                    <a href={`mailto:${APP_CONFIG.email}`} className="text-[#005B82] font-semibold hover:underline">
                      {APP_CONFIG.email}
                    </a>{" "}
                    o llamar al{" "}
                    <a href="tel:+543511234567" className="text-[#005B82] font-semibold hover:underline">
                      {APP_CONFIG.phone}
                    </a>
                    .
                  </>
                }
              />

              <LegalSection
                id="datos"
                title="3. Datos que recopilamos"
                description="Solo pedimos la información imprescindible para cada servicio. Los principales grupos de datos son:"
                bullets={[
                  {
                    title: "Datos de identificación y contacto",
                    description:
                      "Nombre, apellido, dirección de correo, teléfono y, en el caso de comerciantes, datos del negocio (social media, dirección, categoría). Se aportan a través de formularios administrados.",
                  },
                  {
                    title: "Datos de autenticación",
                    description:
                      "Correo electrónico y contraseña cifrada gestionados por nosotros para acceder a /gestion. El perfil asociado incluye rol y fecha de alta.",
                  },
                  {
                    title: "Datos operativos de campañas",
                    description:
                      "Para el canje de beneficios solicitamos nombre completo, DNI, teléfono y email opcional.",
                  },
                  {
                    title: "Datos editoriales cargados por negocios",
                    description:
                      "Las fichas de comercios, eventos, anuncios y ediciones contienen imágenes, logotipos, PDFs o textos que nos facilitan los titulares mediante el panel administrativo.",
                  },
                ]}
              />

              <LegalSection
                id="bases-legales"
                title="4. Bases legales aplicables"
                description="Tratamos tus datos conforme a la Ley 25.326 y normativa complementaria, fundamentándonos en:"
                bullets={[
                  {
                    title: "Consentimiento",
                    description:
                      "Cuando completás formularios voluntarios (contacto, canje de beneficios) aceptás expresamente esta política.",
                  },
                  {
                    title: "Relación contractual",
                    description:
                      "Cuando creamos cuentas de anunciantes o ejecutamos campañas publicitarias debemos manejar los datos necesarios para cumplir el servicio.",
                  },
                  {
                    title: "Interés legítimo",
                    description:
                      "Para monitorear la seguridad del sitio, prevenir abusos y mantener estadísticas agregadas de lectura.",
                  },
                ]}
              />

              <LegalSection
                id="seguridad"
                title="5. Almacenamiento y medidas de seguridad"
                description="Utilizamos Supabase como backend gestionado, con base de datos Postgres y buckets de almacenamiento cifrados en reposo. Las comunicaciones entre tu navegador y nuestros servicios se realizan mediante HTTPS."
              >
                <ul className="space-y-2 text-slate-600 text-base leading-relaxed">
                  <li>Acceso restringido a paneles administrativos.</li>
                  <li>Backups periódicos de tablas críticas.</li>
                  <li>
                    Gestión segura de archivos con URLs con firma y controles de lectura.
                  </li>
            </ul>
              </LegalSection>

              <LegalSection
                id="contacto"
                title="6. Cambios y vías de contacto"
                description="Publicaremos cualquier modificación relevante de esta política en la misma URL y actualizaremos la fecha de vigencia. Mantenerse informado te ayudará a comprender cómo protegemos tus datos."
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Correo:</span>{" "}
                    <a href={`mailto:${APP_CONFIG.email}`} className="text-[#005B82] hover:underline">
                      {APP_CONFIG.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Teléfono:</span>{" "}
                    <a href="tel:+543511234567" className="text-[#005B82] hover:underline">
                      {APP_CONFIG.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Dirección:</span> {APP_CONFIG.address}
                  </p>
                  <p className="text-xs text-slate-500 pt-2">
                    Esta política se rige por las leyes de la República Argentina y por la Autoridad de Aplicación de la
                    Agencia de Acceso a la Información Pública.
                  </p>
                </div>
              </LegalSection>
            </div>
          </div>
        </section>
      </div>
    </LandingLayout>
  )
}
