'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Target, BarChart3, Megaphone } from 'lucide-react';

interface ServiceFeature {
  title: string;
  description: string;
  details: string;
}

interface ServiceItem {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
  features: ServiceFeature[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'revista-fisica',
    number: '01',
    label: 'Revista Física',
    title: 'Publicidad en Revista Física',
    description:
      'Conectá con tu audiencia de manera tangible y memorable. La revista impresa genera confianza y permanencia que ningún medio digital puede igualar.',
    gradient: 'from-[#0f3b8c] via-[#1a4ea8] to-[#4072d8]',
    icon: Megaphone,
    features: [
      {
        title: 'Formato Flexible',
        description: 'Elegí entre página completa, media o cuarto según tu presupuesto.',
        details:
          'Planificamos tu anuncio según la sección de mayor afinidad y producimos la pieza en los formatos clásicos de la revista: doble página, página completa, media página y otros formatos en módulo.'
      },
      {
        title: 'Calidad papel diario',
        description: 'Impresión en papel couché de alto gramaje.',
        details:
          'trabajamos con papel diario reciclable, contribuyendo a un proceso mas sustentable. Elegimos papel de diario reciclable para ofrecer una edicion responsable y sostenible'
      },
      {
        title: 'Distribución a tu hogar',
        description: 'Llegada garantizada a puntos de alto tráfico.',
        details:
          'La revista se reparte de puerta a puerta mediante un equipo contratado, asegurando la entrega en hogares y comercios.',
      },
      {
        title: 'Diseño a tu medida',
        description: 'Asesoramiento y diseño gráfico profesional.',
        details:
          'Nuestro equipo creativo adapta tus piezas o crea la estética desde cero para que mantengas coherencia con tu identidad visual.'
      }
    ]
  },
  {
    id: 'ecosistema-digital',
    number: '02',
    label: 'Ecosistema Digital',
    title: 'Contenido en Web',
    description:
      'Publicá notas, entrevistas y reseñas en nuestro portal y replicá el alcance en redes sociales con formatos destacados.',
    gradient: 'from-[#F97316] via-[#FB923C] to-[#FDBA74]',
    icon: Sparkles,
    features: [
      {
        title: 'Notas Patrocinadas',
        description: 'Historias que posicionan tu marca con SEO local.',
        details:
          'Redactamos y maquetamos contenidos optimizados para buscadores que quedan visibles en /articulos y se promocionan en home durante la campaña.'
      },
      {
        title: 'Cobertura en Redes',
        description: 'Piezas para Instagram, Facebook y WhatsApp Business.',
        details:
          'Diseñamos carruseles, reels y historias animadas replicando la estética de Matices para mantener coherencia y ampliar la frecuencia de contacto.'
      },
      {
        title: 'Newsletter Comercial',
        description: 'Incluimos tu propuesta en envíos mensuales a la comunidad.',
        details:
          'Amplificá tu promo en nuestra base de lectores con llamadas a la acción que derivan a tu landing o WhatsApp comercial.'
      }
    ]
  },
  {
    id: 'beneficios',
    number: '03',
    label: 'Programa de Beneficios',
    title: 'Multipromos y Cupones Matices',
    description:
      'Impulsá ventas inmediatas con cupones digitales, seguimiento de canjes y difusión automática en la sección Sugerencias.',
    gradient: 'from-[#0f3b8c] via-[#1a4ea8] to-[#4072d8]',
    icon: Target,
    features: [
      {
        title: 'ModalPromo Integrado',
        description: 'Gestión de cupones y validación por DNI.',
        details:
          'Activamos tu beneficio en nuestro ModalPromo, generamos reportes de canjes y te enviamos los leads con datos completos.'
      },
      {
        title: 'Landing Personalizada',
        description: 'Tarjeta exclusiva en /sugerencias con video o imagen.',
        details:
          'Tu negocio aparece con destaque, botones de contacto y métricas de interacción para que midas el rendimiento semanal.'
      },
      {
        title: 'Campañas Cross',
        description: 'Promoción coordinada en redes, newsletter y revistas.',
        details:
          'Sincronizamos la misma promo en todos los canales para maximizar recordación y urgencia durante la vigencia del cupón.'
      }
    ]
  },
  {
    id: 'eventos',
    number: '04',
    label: 'Eventos & Experiencias',
    title: 'Cobertura de Eventos',
    description: 'publicidad de eventos y experiencias en vivo.',
    gradient: 'from-[#F97316] via-[#FB923C] to-[#FDBA74]',
    icon: BarChart3,
    features: [
      {
        title: 'Produccion de Eventos',
        description: 'campaña de publicidad para eventos y experiencias en vivo.',
        details:
          'Planificamos la campaña de publicidad para eventos y experiencias en vivo. Desde la creación de la campaña hasta la ejecución y medición de resultados.'
      },
      {
        title: 'Cobertura en Vivo',
        description: 'fotografía, videos y contenido para redes sociales.',
        details:
          'Generamos contenido en tiempo real y entregamos material editado para que capitalices la acción incluso después del evento. También podemos generar contenido para redes sociales y videos para YouTube.'
      }
    ]
  }
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function ServiciosClient() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = useMemo(() => SERVICES[activeIndex], [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === SERVICES.length - 1 ? 0 : prev + 1));
  };

  const handleFeatureClick = (serviceId: string, featureTitle: string) => {
    const anchor = `${serviceId}-${slugify(featureTitle)}`;
    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-r from-[#003c56] to-[#005B82] py-16 text-white">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/80">
            Servicios Matices
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Soluciones integrales para posicionar tu marca
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Elegí el formato que mejor se adapte a tu estrategia y navegá entre cada propuesta para
            conocer qué incluye.
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 lg:py-20">
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                index === activeIndex
                  ? 'border-transparent bg-gradient-to-r from-[#003d66] via-[#005a8f] to-[#0077b6] text-white shadow-lg shadow-blue-200'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-[#0b6fb8] hover:text-[#0b6fb8]'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {service.label}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${activeService.gradient} p-8 text-white shadow-2xl min-h-[420px] flex flex-col justify-between`}
          >
            <span className="text-7xl font-black text-white/30">{activeService.number}</span>
            <div className="mt-6 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                Plan destacado
              </p>
              <h2 className="text-4xl font-bold leading-tight">{activeService.title}</h2>
              <p className="text-base text-white/80">{activeService.description}</p>
            </div>
            <activeService.icon className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10" />
          </div>

          <div className="rounded-3xl bg-white/95 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 p-3 text-blue-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Lo que incluye</p>
                <p className="text-xl font-bold text-slate-900">{activeService.label}</p>
              </div>
            </div>
            <div className="space-y-3">
              {activeService.features.map((feature) => (
                <button
                  key={feature.title}
                  onClick={() => handleFeatureClick(activeService.id, feature.title)}
                  className="group flex w-full items-start justify-between rounded-2xl border border-blue-50 bg-gradient-to-r from-blue-50 via-white to-white px-4 py-3 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_15px_35px_rgba(15,76,117,0.15)]"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">{feature.title}</p>
                    <p className="text-sm text-slate-500">{feature.description}</p>
                  </div>
                  <span className="text-lg text-blue-300 transition group-hover:text-blue-500">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-2 text-sm font-medium text-blue-800 transition hover:border-blue-400 hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0f4c75] to-[#1b6ca8] px-6 py-2 text-sm font-medium text-white shadow-lg shadow-blue-200 transition hover:brightness-110"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl space-y-12 px-4 pb-16 lg:pb-24">
        {SERVICES.map((service) => (
          <section
            key={service.id}
            className="scroll-mt-24 rounded-3xl border border-slate-100 bg-white/95 p-6 shadow-[0_30px_70px_rgba(15,76,117,0.1)] ring-1 ring-white/70 md:p-8"
            id={service.id}
          >
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                  {service.label}
                </p>
                <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
              </div>
              <p className="text-sm text-slate-500 md:max-w-lg">{service.description}</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {service.features.map((feature) => {
                const anchor = `${service.id}-${slugify(feature.title)}`;
                return (
                  <article
                    key={anchor}
                    id={anchor}
                    className="rounded-2xl border border-blue-50 bg-gradient-to-br from-blue-50 to-white p-5 shadow-inner transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_45px_rgba(15,76,117,0.15)]"
                  >
                    <h4 className="text-lg font-semibold text-slate-900">{feature.title}</h4>
                    <p className="mt-1 text-sm text-slate-500">{feature.description}</p>
                    <p className="mt-3 text-base text-slate-600">{feature.details}</p>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}


