import { Article } from '@/types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Nueva ciclovía conecta el Cerro de las Rosas con el centro',
    slug: 'nueva-ciclovia-cerro-rosas-centro',
    content: `La Municipalidad de Córdoba inauguró oficialmente la nueva ciclovía que conecta el barrio Cerro de las Rosas con el centro de la ciudad. Esta obra representa una inversión de $45 millones y beneficiará a más de 15.000 vecinos de la zona norte.

La ciclovía tiene una extensión de 3.2 kilómetros y cuenta con iluminación LED, señalización específica para ciclistas y cruces seguros en las intersecciones principales. El proyecto forma parte del Plan de Movilidad Sostenible que busca reducir la dependencia del automóvil y promover medios de transporte más saludables.

"Esta ciclovía es un paso importante hacia una ciudad más sustentable y conectada", expresó el intendente Martín Llaryora durante la inauguración. "Los vecinos del Cerro de las Rosas ahora tienen una alternativa segura y rápida para llegar al centro sin depender del transporte público o el auto".

La obra incluye también la instalación de 25 bicicleteros en puntos estratégicos y la plantación de 120 árboles nativos para mejorar el paisaje urbano. Se espera que la ciclovía esté completamente operativa para fines de diciembre.`,
    excerpt: 'La Municipalidad inauguró una nueva ciclovía que mejora la conectividad entre el barrio norte y el centro de la ciudad, con una inversión de $45 millones.',
    category: 'NOTICIAS',
    tags: ['transporte', 'ciclovia', 'municipalidad', 'sustentabilidad'],
    image: '/images/articles/ciclovia-cerro.jpg',
    isPremium: false,
    publishedAt: '2024-12-15',
    readTime: 3,
    author: 'Redacción Matices',
    featured: true
  },
  {
    id: '2',
    title: 'Restaurante El Fogón del Cerro celebra 15 años de tradición gastronómica',
    slug: 'restaurante-fogon-cerro-15-anos',
    content: `El reconocido restaurante El Fogón del Cerro, ubicado en el corazón del barrio Cerro de las Rosas, celebra este mes sus 15 años de trayectoria ofreciendo la mejor cocina regional de Córdoba.

Fundado por la familia Martínez en 2009, El Fogón del Cerro se ha convertido en un referente gastronómico del norte de la ciudad, especializándose en platos típicos como el locro, las empanadas salteñas y el asado criollo.

"La clave de nuestro éxito ha sido mantener la autenticidad de los sabores tradicionales mientras innovamos en la presentación y el servicio", comenta María Martínez, propietaria del establecimiento. "Nuestros clientes valoran que cada plato cuente una historia, que represente la rica tradición culinaria de nuestro país".

El restaurante ha sido reconocido en múltiples ocasiones por su calidad gastronómica, incluyendo el premio "Mejor Restaurante Regional" otorgado por la Asociación Gastronómica de Córdoba en 2022.

Para celebrar este aniversario, El Fogón del Cerro ofrecerá durante todo el mes un menú especial con platos de la casa a precios promocionales, además de degustaciones gratuitas los fines de semana.`,
    excerpt: 'El Fogón del Cerro celebra 15 años de tradición gastronómica en el barrio, manteniendo los sabores auténticos de la cocina regional cordobesa.',
    category: 'GASTRONOMIA',
    tags: ['restaurante', 'tradicion', 'cocina-regional', 'aniversario'],
    image: '/images/articles/fogon-cerro.jpg',
    isPremium: false,
    publishedAt: '2024-12-14',
    readTime: 4,
    author: 'María González',
    featured: true
  },
  {
    id: '3',
    title: 'Inauguración del nuevo centro comercial Plaza Norte en el Cerro',
    slug: 'inauguracion-plaza-norte-cerro',
    content: `Este sábado se inauguró oficialmente el nuevo centro comercial Plaza Norte, ubicado en la intersección de Avenida Rafael Núñez y Calle 9 de Julio, en el barrio Cerro de las Rosas.

El complejo comercial, que representa una inversión privada de $120 millones, cuenta con 45 locales comerciales distribuidos en dos niveles, estacionamiento para 200 vehículos y un patio de comidas con 12 opciones gastronómicas.

"Plaza Norte viene a satisfacer una necesidad real de los vecinos del norte de Córdoba", explicó Carlos Rodríguez, director del proyecto. "Hasta ahora, los residentes del Cerro de las Rosas y barrios aledaños tenían que trasladarse al centro o a otros centros comerciales más alejados para realizar sus compras".

Entre los comercios que ya confirmaron su presencia se encuentran supermercados, farmacias, bancos, tiendas de ropa y servicios profesionales. Se estima que el centro comercial generará 180 nuevos empleos directos y beneficiará a una población de más de 25.000 personas.

La inauguración contó con la presencia de autoridades municipales y provinciales, quienes destacaron la importancia de este tipo de inversiones para el desarrollo económico local.`,
    excerpt: 'Se inauguró Plaza Norte, un nuevo centro comercial que beneficiará a más de 25.000 vecinos del norte de Córdoba con 45 locales comerciales.',
    category: 'NOTICIAS',
    tags: ['centro-comercial', 'inversion', 'empleo', 'desarrollo-local'],
    image: '/images/articles/plaza-norte.jpg',
    isPremium: false,
    publishedAt: '2024-12-13',
    readTime: 3,
    author: 'Redacción Matices',
    featured: false
  },
  {
    id: '4',
    title: 'Clínica del Cerro amplía servicios de cardiología',
    slug: 'clinica-cerro-amplia-cardiologia',
    content: `La Clínica del Cerro, ubicada en el barrio Cerro de las Rosas, anunció la ampliación de sus servicios de cardiología con la incorporación de tecnología de última generación y nuevos especialistas.

La inversión de $8 millones incluye la adquisición de un nuevo ecocardiógrafo 4D, un laboratorio de hemodinamia y la contratación de tres cardiólogos especialistas en intervencionismo cardíaco.

"Esta ampliación nos permite ofrecer atención cardiológica integral sin que los pacientes tengan que trasladarse al centro de la ciudad", explicó el Dr. Roberto Silva, director médico de la clínica. "Ahora podemos realizar desde consultas básicas hasta procedimientos complejos como cateterismos cardíacos".

La clínica también implementó un sistema de turnos online y atención domiciliaria para pacientes con movilidad reducida. Se estima que estos nuevos servicios beneficiarán a más de 5.000 pacientes de la zona norte de Córdoba.

La inauguración de la nueva área de cardiología se realizará el próximo 20 de diciembre con una jornada de puertas abiertas donde los vecinos podrán conocer las nuevas instalaciones y realizar consultas gratuitas.`,
    excerpt: 'La Clínica del Cerro amplía sus servicios de cardiología con tecnología de última generación y nuevos especialistas, beneficiando a 5.000 pacientes.',
    category: 'SALUD',
    tags: ['clinica', 'cardiologia', 'tecnologia', 'atencion-medica'],
    image: '/images/articles/clinica-cerro.jpg',
    isPremium: true,
    publishedAt: '2024-12-12',
    readTime: 4,
    author: 'Dr. Ana Morales',
    featured: false
  },
  {
    id: '5',
    title: 'Escuela Manuel Belgrano celebra 50 años de educación pública',
    slug: 'escuela-manuel-belgrano-50-anos',
    content: `La Escuela Primaria Manuel Belgrano, ubicada en el barrio Cerro de las Rosas, celebró este mes sus 50 años de servicio educativo a la comunidad cordobesa.

Fundada en 1974, la institución ha formado a más de 3.000 estudiantes y se ha convertido en un referente educativo del norte de la ciudad. La escuela cuenta actualmente con 450 alumnos distribuidos en 18 cursos de nivel primario.

"La Escuela Manuel Belgrano ha sido fundamental para el desarrollo educativo de nuestro barrio", expresó la directora María Elena Fernández. "Nuestros egresados han logrado destacarse en diversos campos profesionales, lo que nos llena de orgullo y nos motiva a seguir mejorando".

Para celebrar este aniversario, la escuela organizó una semana de actividades que incluyó muestras de arte, presentaciones musicales, charlas con ex alumnos destacados y la inauguración de una nueva biblioteca digital.

La institución también recibió reconocimientos de la Municipalidad de Córdoba y el Ministerio de Educación de la provincia por su trayectoria y compromiso con la educación pública de calidad.`,
    excerpt: 'La Escuela Manuel Belgrano celebra 50 años de educación pública, formando a más de 3.000 estudiantes en el barrio Cerro de las Rosas.',
    category: 'EDUCACION',
    tags: ['escuela', 'educacion-publica', 'aniversario', 'comunidad'],
    image: '/images/articles/escuela-belgrano.jpg',
    isPremium: false,
    publishedAt: '2024-12-11',
    readTime: 3,
    author: 'Prof. Carlos Ruiz',
    featured: false
  },
  {
    id: '6',
    title: 'Nuevo complejo deportivo en el Parque del Cerro',
    slug: 'nuevo-complejo-deportivo-parque-cerro',
    content: `La Municipalidad de Córdoba anunció la construcción de un nuevo complejo deportivo en el Parque del Cerro, ubicado en el barrio Cerro de las Rosas. La obra, que comenzará en enero de 2025, incluirá canchas de fútbol 11, tenis, paddle y un gimnasio cubierto.

El proyecto representa una inversión de $35 millones y se desarrollará en un terreno de 15.000 metros cuadrados. El complejo contará con vestuarios, iluminación artificial y un sistema de riego automatizado para mantener las canchas en óptimas condiciones.

"Este complejo deportivo viene a satisfacer una demanda histórica de los vecinos del norte de Córdoba", explicó el secretario de Deportes municipal, Juan Carlos Pérez. "Los jóvenes del barrio tendrán un espacio digno para practicar deportes y desarrollar sus habilidades atléticas".

El complejo también incluirá un área de recreación infantil y espacios verdes para actividades al aire libre. Se estima que la obra estará terminada en 18 meses y beneficiará a más de 10.000 personas de la zona.

La presentación del proyecto contó con la presencia de representantes de clubes deportivos locales y vecinos del barrio, quienes expresaron su satisfacción por esta nueva infraestructura deportiva.`,
    excerpt: 'Se anunció la construcción de un nuevo complejo deportivo en el Parque del Cerro con canchas de fútbol, tenis y paddle, beneficiando a 10.000 vecinos.',
    category: 'DEPORTES',
    tags: ['complejo-deportivo', 'municipalidad', 'inversion', 'parque'],
    image: '/images/articles/complejo-deportivo.jpg',
    isPremium: false,
    publishedAt: '2024-12-10',
    readTime: 4,
    author: 'Redacción Matices',
    featured: true
  },
  {
    id: '7',
    title: 'Inmobiliaria del Cerro presenta nuevos emprendimientos residenciales',
    slug: 'inmobiliaria-cerro-emprendimientos-residenciales',
    content: `La Inmobiliaria del Cerro presentó oficialmente sus nuevos emprendimientos residenciales "Residencial Las Rosas" y "Torres del Cerro", ubicados en el barrio Cerro de las Rosas.

El proyecto "Residencial Las Rosas" consiste en 24 casas de 3 y 4 dormitorios con jardín privado, mientras que "Torres del Cerro" incluye 48 departamentos de 2 y 3 ambientes distribuidos en 4 torres de 12 pisos cada una.

"Estos emprendimientos representan una excelente oportunidad de inversión y residencia en una de las zonas más cotizadas del norte de Córdoba", explicó el director comercial de la inmobiliaria, Roberto Mendoza. "El Cerro de las Rosas ofrece una excelente calidad de vida con todos los servicios necesarios a mano".

Los precios de las casas comienzan en $85.000 y los departamentos desde $45.000, con opciones de financiación a través de bancos oficiales y privados. Se estima que las obras estarán terminadas en 24 meses.

El evento de presentación contó con la presencia de más de 200 personas interesadas en los nuevos emprendimientos, quienes pudieron conocer maquetas, planos y opciones de personalización.`,
    excerpt: 'La Inmobiliaria del Cerro presenta dos nuevos emprendimientos residenciales con 72 unidades en total, desde $45.000.',
    category: 'INMOBILIARIA',
    tags: ['inmobiliaria', 'emprendimientos', 'residencial', 'inversion'],
    image: '/images/articles/residencial-las-rosas.jpg',
    isPremium: true,
    publishedAt: '2024-12-09',
    readTime: 3,
    author: 'Arq. Laura Fernández',
    featured: false
  },
  {
    id: '8',
    title: 'Festival de Música del Cerro: 3 días de arte y cultura',
    slug: 'festival-musica-cerro-arte-cultura',
    content: `El próximo fin de semana se realizará la tercera edición del Festival de Música del Cerro, un evento cultural que reúne a artistas locales y nacionales en el Parque del Cerro de las Rosas.

El festival, que se extenderá durante tres días (viernes, sábado y domingo), contará con la participación de más de 30 bandas y solistas de diversos géneros musicales, desde rock y pop hasta folclore y jazz.

"El Festival de Música del Cerro se ha convertido en un evento cultural de referencia en Córdoba", expresó la organizadora María Soledad Gómez. "Este año esperamos recibir a más de 5.000 personas que disfrutarán de la mejor música en un entorno natural único".

La programación incluye talleres de música para niños, ferias de artesanías, food trucks con gastronomía local y espacios de networking para músicos emergentes. El evento contará con dos escenarios principales y áreas de descanso con sombra natural.

Las entradas están disponibles en la boletería del Parque del Cerro y en puntos de venta autorizados. Los niños menores de 12 años ingresan gratis y habrá descuentos especiales para estudiantes y jubilados.`,
    excerpt: 'El Festival de Música del Cerro regresa con 30 bandas durante 3 días, ofreciendo talleres, ferias y gastronomía local en el Parque del Cerro.',
    category: 'ENTRETENIMIENTO',
    tags: ['festival', 'musica', 'cultura', 'parque', 'arte'],
    image: '/images/articles/festival-musica.jpg',
    isPremium: false,
    publishedAt: '2024-12-08',
    readTime: 4,
    author: 'María Soledad Gómez',
    featured: true
  },
  {
    id: '9',
    title: 'Servicios de limpieza 24/7 llegan al Cerro de las Rosas',
    slug: 'servicios-limpieza-24-7-cerro-rosas',
    content: `La empresa Limpieza Express anunció la expansión de sus servicios al barrio Cerro de las Rosas, ofreciendo limpieza residencial y comercial las 24 horas del día, los 7 días de la semana.

La nueva sucursal, ubicada en Avenida Rafael Núñez 3200, cuenta con un equipo de 15 profesionales capacitados en diversos tipos de limpieza, desde residencial hasta industrial y post-construcción.

"Los vecinos del Cerro de las Rosas ahora pueden acceder a servicios de limpieza profesional a cualquier hora del día", explicó el gerente regional de Limpieza Express, Carlos Rodríguez. "Nuestro servicio incluye limpieza de alfombras, tapizados, ventanas y limpieza profunda de hogares".

La empresa también ofrece servicios especializados como limpieza de piscinas, mantenimiento de jardines y desinfección de espacios. Los precios comienzan en $2.500 para limpieza básica de hogar y $5.000 para limpieza profunda.

Para celebrar la apertura, Limpieza Express ofrecerá descuentos del 20% en todos los servicios durante el primer mes de operaciones.`,
    excerpt: 'Limpieza Express expande sus servicios al Cerro de las Rosas con atención 24/7, ofreciendo limpieza residencial y comercial desde $2.500.',
    category: 'SERVICIOS',
    tags: ['limpieza', 'servicios', '24-7', 'profesional', 'hogar'],
    image: '/images/articles/limpieza-express.jpg',
    isPremium: false,
    publishedAt: '2024-12-07',
    readTime: 3,
    author: 'Redacción Matices',
    featured: false
  },
  {
    id: '10',
    title: 'Nuevo centro de estética y bienestar en el Cerro',
    slug: 'nuevo-centro-estetica-bienestar-cerro',
    content: `Se inauguró oficialmente el Centro de Estética y Bienestar "Belleza Natural", ubicado en el barrio Cerro de las Rosas. El establecimiento ofrece servicios integrales de belleza, spa y bienestar en un ambiente moderno y relajante.

El centro cuenta con 8 cabinas de tratamiento, una sala de masajes, un área de manicura y pedicura, y un espacio de relajación con hidromasaje. Los servicios incluyen tratamientos faciales, corporales, depilación definitiva y masajes terapéuticos.

"Belleza Natural nace de la necesidad de ofrecer servicios de estética de alta calidad en el norte de Córdoba", explicó la propietaria, Dra. Ana María López. "Nuestro equipo de profesionales está capacitado en las últimas técnicas y utiliza productos de primera línea".

El centro también ofrece tratamientos especializados para hombres, servicios de estética dental y consultoría nutricional. Los precios son competitivos con el mercado local, con tratamientos desde $3.500.

Para la inauguración, el centro ofrecerá descuentos del 30% en todos los servicios durante la primera semana y regalos especiales para las primeras 50 clientas.`,
    excerpt: 'Se inauguró "Belleza Natural", un centro de estética y bienestar con 8 cabinas, spa y tratamientos integrales desde $3.500.',
    category: 'SERVICIOS',
    tags: ['estetica', 'bienestar', 'spa', 'belleza', 'tratamientos'],
    image: '/images/articles/belleza-natural.jpg',
    isPremium: false,
    publishedAt: '2024-12-06',
    readTime: 3,
    author: 'Dra. Ana María López',
    featured: false
  },
  {
    id: '11',
    title: 'Panadería Artesanal del Cerro: 30 años de tradición',
    slug: 'panaderia-artesanal-cerro-30-anos',
    content: `La Panadería Artesanal del Cerro celebra este mes sus 30 años de trayectoria en el barrio Cerro de las Rosas, manteniendo viva la tradición de la panadería artesanal cordobesa.

Fundada en 1994 por la familia González, la panadería se ha convertido en un referente gastronómico del norte de la ciudad, especializándose en panes artesanales, facturas caseras y productos de repostería tradicional.

"La clave de nuestro éxito ha sido mantener la calidad artesanal y no ceder a la industrialización", comenta Juan González, propietario de la panadería. "Cada pan se amasa a mano, se fermenta naturalmente y se hornea en hornos de leña, como se hacía hace 100 años".

La panadería ofrece más de 50 variedades de panes, incluyendo pan de campo, pan integral, pan de centeno y panes especiales para celíacos. También elaboran facturas, tortas y pastelería fina para eventos especiales.

Para celebrar este aniversario, la panadería ofrecerá durante todo el mes degustaciones gratuitas, descuentos especiales y la presentación de nuevos productos como panes gourmet y pastelería sin azúcar.`,
    excerpt: 'La Panadería Artesanal del Cerro celebra 30 años de tradición, manteniendo la calidad artesanal con más de 50 variedades de panes.',
    category: 'GASTRONOMIA',
    tags: ['panaderia', 'artesanal', 'tradicion', 'pan', 'reposteria'],
    image: '/images/articles/panaderia-artesanal.jpg',
    isPremium: false,
    publishedAt: '2024-12-05',
    readTime: 4,
    author: 'Juan González',
    featured: false
  },
  {
    id: '12',
    title: 'Nuevo servicio de delivery de farmacia en el Cerro',
    slug: 'nuevo-servicio-delivery-farmacia-cerro',
    content: `La Farmacia del Cerro implementó un nuevo servicio de delivery gratuito que cubre todo el barrio Cerro de las Rosas y zonas aledañas, ofreciendo entrega de medicamentos en menos de 30 minutos.

El servicio, disponible de lunes a domingo de 8:00 a 22:00 horas, incluye la entrega de medicamentos con receta, productos de venta libre, artículos de higiene personal y productos para bebés.

"Este servicio nace de la necesidad de nuestros clientes, especialmente adultos mayores y personas con movilidad reducida", explicó el farmacéutico titular, Dr. Roberto Silva. "Queremos que la atención farmacéutica sea accesible para todos los vecinos del barrio".

El delivery se realiza en motos eléctricas para reducir la contaminación ambiental y los pedidos se pueden realizar por teléfono, WhatsApp o a través de la aplicación móvil de la farmacia. Los medicamentos se entregan en envases especiales que mantienen la temperatura adecuada.

La farmacia también ofrece asesoramiento farmacéutico telefónico y un servicio de recordatorio de medicamentos para pacientes crónicos.`,
    excerpt: 'La Farmacia del Cerro implementa delivery gratuito en 30 minutos, cubriendo todo el barrio con medicamentos y productos de higiene.',
    category: 'SALUD',
    tags: ['farmacia', 'delivery', 'medicamentos', 'servicio', 'salud'],
    image: '/images/articles/farmacia-delivery.jpg',
    isPremium: false,
    publishedAt: '2024-12-04',
    readTime: 3,
    author: 'Dr. Roberto Silva',
    featured: false
  },
  {
    id: '13',
    title: 'Club Atlético Cerro: Campeón de la Liga Regional',
    slug: 'club-atletico-cerro-campeon-liga-regional',
    content: `El Club Atlético Cerro se consagró campeón de la Liga Regional de Fútbol Amateur tras vencer por 2-1 al Club Deportivo Norte en la final disputada en el Estadio Municipal.

El equipo del barrio Cerro de las Rosas logró el título después de una temporada excepcional donde ganó 18 de los 22 partidos disputados, marcando 45 goles y recibiendo solo 12. El delantero estrella, Carlos "El Toro" Rodríguez, fue el goleador del torneo con 18 goles.

"Este título es el fruto del trabajo de todo el club, desde los dirigentes hasta los jugadores y el cuerpo técnico", expresó el entrenador del equipo, Miguel Ángel Gómez. "El Club Atlético Cerro ha demostrado que con trabajo y dedicación se pueden lograr grandes cosas".

El club, fundado en 1985, cuenta con más de 200 socios y ha formado a numerosos jugadores que han llegado al fútbol profesional. La institución también desarrolla actividades deportivas para niños y jóvenes del barrio.

La celebración del título se realizará este sábado en la sede del club con una cena de gala, entrega de medallas y un espectáculo musical para todos los socios y simpatizantes.`,
    excerpt: 'El Club Atlético Cerro se consagra campeón de la Liga Regional tras una temporada excepcional, ganando 18 de 22 partidos.',
    category: 'DEPORTES',
    tags: ['futbol', 'campeon', 'liga-regional', 'club', 'deportes'],
    image: '/images/articles/club-atletico-cerro.jpg',
    isPremium: false,
    publishedAt: '2024-12-03',
    readTime: 4,
    author: 'Redacción Matices',
    featured: true
  },
  {
    id: '14',
    title: 'Nuevo centro de capacitación técnica en el Cerro',
    slug: 'nuevo-centro-capacitacion-tecnica-cerro',
    content: `Se inauguró oficialmente el Centro de Capacitación Técnica "TecnoCerro", ubicado en el barrio Cerro de las Rosas. El establecimiento ofrece cursos de programación, diseño web, marketing digital y otras disciplinas tecnológicas.

El centro cuenta con 3 laboratorios de computación equipados con la última tecnología, un aula de conferencias con capacidad para 50 personas y espacios de coworking para emprendedores tecnológicos.

"TecnoCerro nace de la necesidad de democratizar el acceso a la educación tecnológica en el norte de Córdoba", explicó el director del centro, Ing. Carlos Mendoza. "Nuestros cursos están diseñados para personas de todas las edades y niveles de conocimiento".

La oferta educativa incluye cursos de 3 meses en programación Python, desarrollo web frontend y backend, diseño gráfico digital y marketing en redes sociales. Los precios son accesibles, con cuotas desde $8.000 mensuales.

El centro también ofrece programas de inserción laboral y convenios con empresas tecnológicas locales para prácticas profesionales. Se estima que en su primer año formará a más de 200 estudiantes.`,
    excerpt: 'Se inauguró TecnoCerro, un centro de capacitación técnica que ofrece cursos de programación, diseño web y marketing digital desde $8.000.',
    category: 'EDUCACION',
    tags: ['tecnologia', 'capacitacion', 'programacion', 'educacion', 'digital'],
    image: '/images/articles/tecnocero.jpg',
    isPremium: true,
    publishedAt: '2024-12-02',
    readTime: 4,
    author: 'Ing. Carlos Mendoza',
    featured: false
  },
  {
    id: '15',
    title: 'Feria de Emprendedores del Cerro: Más de 100 stands',
    slug: 'feria-emprendedores-cerro-100-stands',
    content: `La Feria de Emprendedores del Cerro, que se realizará este fin de semana en el Parque del Cerro de las Rosas, contará con más de 100 stands de emprendedores locales y regionales.

El evento, que celebra su quinta edición, reunirá a artesanos, diseñadores, productores gastronómicos y emprendedores tecnológicos de toda la provincia de Córdoba. Se espera la visita de más de 3.000 personas durante los dos días del evento.

"Esta feria es una excelente oportunidad para que los emprendedores del norte de Córdoba den a conocer sus productos y servicios", expresó la organizadora, María Elena Fernández. "También es una forma de fomentar el consumo local y apoyar a la economía regional".

La programación incluye talleres de emprendimiento, charlas motivacionales, networking entre emprendedores y un concurso de pitch para proyectos innovadores. Los visitantes podrán degustar productos gastronómicos, adquirir artesanías únicas y conocer servicios tecnológicos.

La entrada es gratuita y habrá actividades especiales para niños, incluyendo talleres de manualidades y juegos educativos. El evento contará con servicio de food trucks y espacios de descanso.`,
    excerpt: 'La Feria de Emprendedores del Cerro contará con más de 100 stands y 3.000 visitantes esperados, ofreciendo talleres y networking.',
    category: 'ENTRETENIMIENTO',
    tags: ['feria', 'emprendedores', 'artesanias', 'gastronomia', 'tecnologia'],
    image: '/images/articles/feria-emprendedores.jpg',
    isPremium: false,
    publishedAt: '2024-12-01',
    readTime: 3,
    author: 'María Elena Fernández',
    featured: false
  }
];

export const getFeaturedArticles = () => mockArticles.filter(article => article.featured);
export const getLatestArticles = (limit = 6) => mockArticles.slice(0, limit);
export const getArticlesByCategory = (category: string) => mockArticles.filter(article => article.category === category);
export const getArticleBySlug = (slug: string) => mockArticles.find(article => article.slug === slug);

