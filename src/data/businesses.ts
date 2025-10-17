import { Business } from '@/types';

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Panadería Don Juan',
    description: 'Panadería artesanal con 25 años en el barrio, especializada en panes artesanales, facturas caseras y repostería tradicional. Horneamos diariamente con ingredientes naturales y técnicas tradicionales.',
    category: 'GASTRONOMIA',
    logo: '/images/businesses/don-juan-logo.jpg',
    images: ['/images/businesses/don-juan-1.jpg', '/images/businesses/don-juan-2.jpg'],
    contact: {
      phone: '0351-123-4567',
      whatsapp: '5493511234567'
    },
    location: {
      address: 'Av. Rafael Núñez 3450',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: true,
    services: ['Pan artesanal', 'Facturas caseras', 'Repostería', 'Catering'],
    schedule: 'Lun-Sáb: 6:00-22:00, Dom: 7:00-21:00'
  },
  {
    id: '2',
    name: 'Restaurante El Fogón del Cerro',
    description: 'Restaurante familiar especializado en cocina regional cordobesa. Ofrecemos los mejores platos tradicionales como locro, empanadas salteñas y asado criollo en un ambiente cálido y acogedor.',
    category: 'GASTRONOMIA',
    logo: '/images/businesses/fogon-logo.jpg',
    images: ['/images/businesses/fogon-1.jpg', '/images/businesses/fogon-2.jpg'],
    contact: {
      phone: '0351-234-5678',
      email: 'info@fogoncerro.com',
      website: 'www.fogoncerro.com'
    },
    location: {
      address: 'Calle 9 de Julio 1250',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'PREMIUM',
    featured: true,
    services: ['Cocina regional', 'Asado criollo', 'Empanadas', 'Catering'],
    schedule: 'Mar-Dom: 12:00-15:00 y 20:00-00:00'
  },
  {
    id: '3',
    name: 'Clínica del Cerro',
    description: 'Centro médico integral que ofrece atención primaria, especialidades médicas y servicios de diagnóstico. Contamos con tecnología de última generación y un equipo de profesionales altamente capacitados.',
    category: 'SALUD',
    logo: '/images/businesses/clinica-logo.jpg',
    images: ['/images/businesses/clinica-1.jpg', '/images/businesses/clinica-2.jpg'],
    contact: {
      phone: '0351-345-6789',
      email: 'info@clinicacerro.com',
      website: 'www.clinicacerro.com'
    },
    location: {
      address: 'Av. Rafael Núñez 3200',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'PREMIUM',
    featured: true,
    services: ['Medicina general', 'Cardiología', 'Pediatría', 'Laboratorio'],
    schedule: 'Lun-Vie: 8:00-20:00, Sáb: 8:00-14:00'
  },
  {
    id: '4',
    name: 'Farmacia del Cerro',
    description: 'Farmacia de barrio con más de 20 años de servicio. Ofrecemos medicamentos, productos de higiene personal y servicio de delivery gratuito en todo el barrio. Asesoramiento farmacéutico personalizado.',
    category: 'SALUD',
    logo: '/images/businesses/farmacia-logo.jpg',
    images: ['/images/businesses/farmacia-1.jpg'],
    contact: {
      phone: '0351-456-7890',
      whatsapp: '5493514567890'
    },
    location: {
      address: 'Calle 9 de Julio 1100',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: false,
    services: ['Medicamentos', 'Productos de higiene', 'Delivery gratuito', 'Asesoramiento'],
    schedule: 'Lun-Dom: 8:00-22:00'
  },
  {
    id: '5',
    name: 'Inmobiliaria del Cerro',
    description: 'Empresa inmobiliaria especializada en el mercado del norte de Córdoba. Ofrecemos servicios de compra, venta y alquiler de propiedades residenciales y comerciales con asesoramiento profesional.',
    category: 'INMOBILIARIA',
    logo: '/images/businesses/inmobiliaria-logo.jpg',
    images: ['/images/businesses/inmobiliaria-1.jpg', '/images/businesses/inmobiliaria-2.jpg'],
    contact: {
      phone: '0351-567-8901',
      email: 'info@inmobiliariacerro.com',
      website: 'www.inmobiliariacerro.com'
    },
    location: {
      address: 'Av. Rafael Núñez 3300',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'PREMIUM',
    featured: true,
    services: ['Compra y venta', 'Alquiler', 'Tasaciones', 'Asesoramiento legal'],
    schedule: 'Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00'
  },
  {
    id: '6',
    name: 'Centro de Estética Belleza Natural',
    description: 'Centro de estética y bienestar que ofrece tratamientos faciales, corporales y de spa. Utilizamos productos de primera línea y técnicas avanzadas para lograr resultados excepcionales.',
    category: 'SERVICIOS',
    logo: '/images/businesses/belleza-logo.jpg',
    images: ['/images/businesses/belleza-1.jpg', '/images/businesses/belleza-2.jpg'],
    contact: {
      phone: '0351-678-9012',
      email: 'info@bellezanatural.com',
      whatsapp: '5493516789012'
    },
    location: {
      address: 'Calle 9 de Julio 1200',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: false,
    services: ['Tratamientos faciales', 'Masajes', 'Depilación', 'Spa'],
    schedule: 'Lun-Sáb: 9:00-20:00'
  },
  {
    id: '7',
    name: 'Limpieza Express',
    description: 'Empresa de servicios de limpieza residencial y comercial con atención 24/7. Ofrecemos limpieza profunda, mantenimiento de jardines y servicios especializados con personal capacitado.',
    category: 'SERVICIOS',
    logo: '/images/businesses/limpieza-logo.jpg',
    images: ['/images/businesses/limpieza-1.jpg'],
    contact: {
      phone: '0351-789-0123',
      whatsapp: '5493517890123'
    },
    location: {
      address: 'Av. Rafael Núñez 3200',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Limpieza residencial', 'Limpieza comercial', 'Jardinería', 'Desinfección'],
    schedule: 'Lun-Dom: 24 horas'
  },
  {
    id: '8',
    name: 'Club Atlético Cerro',
    description: 'Club deportivo con más de 40 años de historia en el barrio. Ofrecemos actividades deportivas para todas las edades, incluyendo fútbol, tenis, natación y gimnasia artística.',
    category: 'DEPORTES',
    logo: '/images/businesses/club-logo.jpg',
    images: ['/images/businesses/club-1.jpg', '/images/businesses/club-2.jpg'],
    contact: {
      phone: '0351-890-1234',
      email: 'info@clubatleticocerro.com'
    },
    location: {
      address: 'Calle 9 de Julio 1300',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: true,
    services: ['Fútbol', 'Tenis', 'Natación', 'Gimnasia'],
    schedule: 'Lun-Dom: 7:00-23:00'
  },
  {
    id: '9',
    name: 'Escuela Manuel Belgrano',
    description: 'Institución educativa pública con 50 años de trayectoria. Ofrecemos educación primaria de calidad con un equipo docente comprometido y programas educativos innovadores.',
    category: 'EDUCACION',
    logo: '/images/businesses/escuela-logo.jpg',
    images: ['/images/businesses/escuela-1.jpg'],
    contact: {
      phone: '0351-901-2345',
      email: 'escuelamanuelbelgrano@educacion.cba.gov.ar'
    },
    location: {
      address: 'Av. Rafael Núñez 3100',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Educación primaria', 'Actividades extraescolares', 'Biblioteca', 'Laboratorio'],
    schedule: 'Lun-Vie: 8:00-17:00'
  },
  {
    id: '10',
    name: 'Centro de Capacitación TecnoCerro',
    description: 'Centro educativo especializado en tecnología que ofrece cursos de programación, diseño web y marketing digital. Contamos con laboratorios equipados y docentes especializados.',
    category: 'EDUCACION',
    logo: '/images/businesses/tecnocero-logo.jpg',
    images: ['/images/businesses/tecnocero-1.jpg'],
    contact: {
      phone: '0351-012-3456',
      email: 'info@tecnocero.com',
      website: 'www.tecnocero.com'
    },
    location: {
      address: 'Calle 9 de Julio 1400',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: false,
    services: ['Programación', 'Diseño web', 'Marketing digital', 'Coworking'],
    schedule: 'Lun-Vie: 9:00-21:00, Sáb: 9:00-17:00'
  },
  {
    id: '11',
    name: 'Supermercado Norte',
    description: 'Supermercado de barrio que ofrece productos frescos, alimentos básicos y artículos de limpieza. Contamos con una amplia variedad de productos a precios competitivos.',
    category: 'SERVICIOS',
    logo: '/images/businesses/supermercado-logo.jpg',
    images: ['/images/businesses/supermercado-1.jpg'],
    contact: {
      phone: '0351-123-7890',
      whatsapp: '5493511237890'
    },
    location: {
      address: 'Av. Rafael Núñez 3500',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Alimentos frescos', 'Productos básicos', 'Limpieza', 'Delivery'],
    schedule: 'Lun-Dom: 8:00-22:00'
  },
  {
    id: '12',
    name: 'Veterinaria Mascotas del Cerro',
    description: 'Clínica veterinaria que ofrece atención médica integral para mascotas. Contamos con consultorio, quirófano y farmacia veterinaria con atención las 24 horas para emergencias.',
    category: 'SALUD',
    logo: '/images/businesses/veterinaria-logo.jpg',
    images: ['/images/businesses/veterinaria-1.jpg'],
    contact: {
      phone: '0351-234-8901',
      whatsapp: '5493512348901'
    },
    location: {
      address: 'Calle 9 de Julio 1500',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: false,
    services: ['Consulta veterinaria', 'Cirugía', 'Vacunación', 'Emergencias 24h'],
    schedule: 'Lun-Vie: 9:00-19:00, Sáb: 9:00-17:00, Emergencias 24h'
  },
  {
    id: '13',
    name: 'Taller Mecánico Rápido',
    description: 'Taller mecánico especializado en mantenimiento y reparación de vehículos. Ofrecemos servicio rápido y garantía en todos nuestros trabajos con precios justos.',
    category: 'SERVICIOS',
    logo: '/images/businesses/taller-logo.jpg',
    images: ['/images/businesses/taller-1.jpg'],
    contact: {
      phone: '0351-345-9012',
      whatsapp: '5493513459012'
    },
    location: {
      address: 'Av. Rafael Núñez 3600',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Mantenimiento', 'Reparación', 'Diagnóstico', 'Cambio de aceite'],
    schedule: 'Lun-Vie: 8:00-18:00, Sáb: 8:00-14:00'
  },
  {
    id: '14',
    name: 'Peluquería Estilo Cerro',
    description: 'Peluquería unisex que ofrece cortes de cabello, coloración, peinados y tratamientos capilares. Utilizamos productos profesionales y técnicas modernas para lograr el look deseado.',
    category: 'SERVICIOS',
    logo: '/images/businesses/peluqueria-logo.jpg',
    images: ['/images/businesses/peluqueria-1.jpg'],
    contact: {
      phone: '0351-456-0123',
      whatsapp: '5493514560123'
    },
    location: {
      address: 'Calle 9 de Julio 1600',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Cortes de cabello', 'Coloración', 'Peinados', 'Tratamientos'],
    schedule: 'Mar-Sáb: 9:00-19:00'
  },
  {
    id: '15',
    name: 'Óptica Visión Clara',
    description: 'Óptica que ofrece exámenes de la vista, armazones de moda y lentes oftálmicos de alta calidad. Contamos con tecnología avanzada para diagnósticos precisos.',
    category: 'SALUD',
    logo: '/images/businesses/optica-logo.jpg',
    images: ['/images/businesses/optica-1.jpg'],
    contact: {
      phone: '0351-567-1234',
      email: 'info@opticavisionclara.com'
    },
    location: {
      address: 'Av. Rafael Núñez 3700',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: false,
    services: ['Exámenes de vista', 'Armazones', 'Lentes oftálmicos', 'Lentes de contacto'],
    schedule: 'Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00'
  },
  {
    id: '16',
    name: 'Café del Cerro',
    description: 'Café de especialidad que ofrece café de origen, pastelería artesanal y un ambiente acogedor para trabajar o socializar. Contamos con WiFi gratuito y espacios de coworking.',
    category: 'GASTRONOMIA',
    logo: '/images/businesses/cafe-logo.jpg',
    images: ['/images/businesses/cafe-1.jpg'],
    contact: {
      phone: '0351-678-2345',
      email: 'info@cafedelcerro.com'
    },
    location: {
      address: 'Calle 9 de Julio 1700',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Café de especialidad', 'Pastelería', 'WiFi gratuito', 'Coworking'],
    schedule: 'Lun-Dom: 7:00-22:00'
  },
  {
    id: '17',
    name: 'Gimnasio Fit Cerro',
    description: 'Gimnasio moderno con equipos de última generación y clases grupales. Ofrecemos entrenamiento personalizado, spinning, yoga y pilates con instructores certificados.',
    category: 'DEPORTES',
    logo: '/images/businesses/gimnasio-logo.jpg',
    images: ['/images/businesses/gimnasio-1.jpg'],
    contact: {
      phone: '0351-789-3456',
      email: 'info@fitcerro.com',
      website: 'www.fitcerro.com'
    },
    location: {
      address: 'Av. Rafael Núñez 3800',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'DESTACADO',
    featured: false,
    services: ['Entrenamiento personalizado', 'Clases grupales', 'Spinning', 'Yoga'],
    schedule: 'Lun-Dom: 6:00-23:00'
  },
  {
    id: '18',
    name: 'Librería El Saber',
    description: 'Librería independiente que ofrece una amplia selección de libros, material escolar y artículos de oficina. Organizamos eventos literarios y clubes de lectura.',
    category: 'EDUCACION',
    logo: '/images/businesses/libreria-logo.jpg',
    images: ['/images/businesses/libreria-1.jpg'],
    contact: {
      phone: '0351-890-4567',
      email: 'info@libreriaelsaber.com'
    },
    location: {
      address: 'Calle 9 de Julio 1800',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Libros', 'Material escolar', 'Eventos literarios', 'Club de lectura'],
    schedule: 'Lun-Vie: 9:00-19:00, Sáb: 9:00-17:00'
  },
  {
    id: '19',
    name: 'Estudio de Tatuajes Arte Vivo',
    description: 'Estudio de tatuajes profesional que ofrece diseños personalizados y trabajos de alta calidad. Utilizamos materiales estériles y técnicas modernas de tatuaje.',
    category: 'SERVICIOS',
    logo: '/images/businesses/tatuajes-logo.jpg',
    images: ['/images/businesses/tatuajes-1.jpg'],
    contact: {
      phone: '0351-901-5678',
      whatsapp: '5493519015678'
    },
    location: {
      address: 'Av. Rafael Núñez 3900',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'BASICO',
    featured: false,
    services: ['Tatuajes personalizados', 'Diseños únicos', 'Piercings', 'Consultas'],
    schedule: 'Mar-Sáb: 12:00-20:00'
  },
  {
    id: '20',
    name: 'Centro de Eventos Las Rosas',
    description: 'Salón de eventos para celebraciones, reuniones corporativas y eventos especiales. Ofrecemos catering, decoración y coordinación completa de eventos.',
    category: 'SERVICIOS',
    logo: '/images/businesses/eventos-logo.jpg',
    images: ['/images/businesses/eventos-1.jpg', '/images/businesses/eventos-2.jpg'],
    contact: {
      phone: '0351-012-6789',
      email: 'info@centroeventoslasrosas.com',
      website: 'www.centroeventoslasrosas.com'
    },
    location: {
      address: 'Calle 9 de Julio 1900',
      neighborhood: 'Cerro de las Rosas'
    },
    plan: 'PREMIUM',
    featured: true,
    services: ['Salón de eventos', 'Catering', 'Decoración', 'Coordinación'],
    schedule: 'Lun-Dom: 9:00-00:00'
  }
];

export const getFeaturedBusinesses = () => mockBusinesses.filter(business => business.featured);
export const getBusinessesByCategory = (category: string) => mockBusinesses.filter(business => business.category === category);
export const getBusinessBySlug = (slug: string) => mockBusinesses.find(business => business.id === slug);
export const getBusinessesByPlan = (plan: string) => mockBusinesses.filter(business => business.plan === plan);

