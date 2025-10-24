// Mock data for admin dashboard

export interface Comercio {
    id: string
    name: string
    direction: string | null
    slug: string
    category: string | null
    tags: string[] | null
    phone: string | null
    owner_id: string | null
    social_media: Record<string, string>
    created_at: string
    description: string | null
    logo_url: string | null
    banners_url: string[] | null
    isActive: boolean
    contact_email: string | null
    web_url: string | null
    schedules: Record<string, string> | null
  }
  
  export interface Benefit {
    id: string
    comercio_id: string | null
    title: string
    description: string | null
    code: string | null
    quantity: number
    valid_from: string
    valid_to: string | null
    created_at: string
    updated_at: string
    type: "discount" | "promotion" | "gift" | null
    banner_url: string | null
    quantity_redeemed: number
    isActive: boolean
  }
  
  export interface Event {
    id: string
    comercio_id: string | null
    title: string
    description: string | null
    date: string
    time: string
    place: string | null
    direction: string | null
    inscription_link: string | null
    open_time: string | null
    close_time: string | null
    created_at: string
    isActive: boolean
    banner_url: string | null
  }
  
  export interface Article {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    author: string
    category: string
    tags: string[]
    featured_image: string | null
    published_at: string
    updated_at: string
    isPublished: boolean
    views: number
  }
  
  export const mockComercios: Comercio[] = [
    {
      id: "1",
      name: "Topping",
      direction: "Av. Rafael Núñez 4558",
      slug: "topping",
      category: "Gastronomía",
      tags: ["helados", "postres", "café"],
      phone: "+54 351 514-1456",
      owner_id: null,
      social_media: { instagram: "@topping_cerro", facebook: "ToppingCerro" },
      created_at: "2024-01-15T10:00:00Z",
      description: "Heladería artesanal con los mejores sabores del barrio",
      logo_url: "/ice-cream-logo.png",
      banners_url: ["/colorful-ice-cream-shop.png"],
      isActive: true,
      contact_email: "contacto@topping.com",
      web_url: "https://topping.com",
      schedules: { lunes: "10:00-22:00", martes: "10:00-22:00", miercoles: "10:00-22:00" },
    },
    {
      id: "2",
      name: "Casa Criolla",
      direction: "Av. Rafael Núñez 4620",
      slug: "casa-criolla",
      category: "Gastronomía",
      tags: ["comida criolla", "empanadas", "parrilla"],
      phone: "+54 351 514-2890",
      owner_id: null,
      social_media: { instagram: "@casacriolla", facebook: "CasaCriolla" },
      created_at: "2024-02-10T10:00:00Z",
      description: "Comida criolla tradicional argentina",
      logo_url: "/restaurant-logo.png",
      banners_url: ["/argentine-restaurant.jpg"],
      isActive: true,
      contact_email: "info@casacriolla.com",
      web_url: null,
      schedules: { lunes: "12:00-15:00, 20:00-00:00", martes: "12:00-15:00, 20:00-00:00" },
    },
    {
      id: "3",
      name: "Tortas Rossi",
      direction: "Av. Rafael Núñez 4700",
      slug: "tortas-rossi",
      category: "Gastronomía",
      tags: ["tortas", "pastelería", "eventos"],
      phone: "+54 351 514-3456",
      owner_id: null,
      social_media: { instagram: "@tortasrossi" },
      created_at: "2024-03-05T10:00:00Z",
      description: "Tortas artesanales para todo tipo de eventos",
      logo_url: "/bakery-logo.png",
      banners_url: ["/cake-shop.jpg"],
      isActive: true,
      contact_email: "pedidos@tortasrossi.com",
      web_url: "https://tortasrossi.com",
      schedules: null,
    },
    {
      id: "4",
      name: "Farmacia del Cerro",
      direction: "Av. Rafael Núñez 4550",
      slug: "farmacia-del-cerro",
      category: "Salud",
      tags: ["farmacia", "medicamentos", "salud"],
      phone: "+54 351 514-5678",
      owner_id: null,
      social_media: {},
      created_at: "2024-01-20T10:00:00Z",
      description: "Farmacia de barrio con atención personalizada",
      logo_url: "/pharmacy-logo.png",
      banners_url: null,
      isActive: true,
      contact_email: "farmacia@cerro.com",
      web_url: null,
      schedules: { lunes: "08:00-20:00", martes: "08:00-20:00", miercoles: "08:00-20:00" },
    },
    {
      id: "5",
      name: "Gimnasio Fitness Zone",
      direction: "Av. Rafael Núñez 4800",
      slug: "fitness-zone",
      category: "Deportes",
      tags: ["gimnasio", "fitness", "entrenamiento"],
      phone: "+54 351 514-7890",
      owner_id: null,
      social_media: { instagram: "@fitnesszone_cerro", facebook: "FitnessZoneCerro" },
      created_at: "2024-02-15T10:00:00Z",
      description: "Centro de entrenamiento con equipamiento de última generación",
      logo_url: "/abstract-gym-logo.png",
      banners_url: ["/modern-gym.png"],
      isActive: false,
      contact_email: "info@fitnesszone.com",
      web_url: "https://fitnesszone.com",
      schedules: { lunes: "06:00-22:00", martes: "06:00-22:00", miercoles: "06:00-22:00" },
    },
  ]
  
  export const mockBenefits: Benefit[] = [
    {
      id: "1",
      comercio_id: "1",
      title: "2x1 en helados los martes",
      description: "Comprá un kilo de helado y llevate otro gratis todos los martes",
      code: "MARTES2X1",
      quantity: 100,
      valid_from: "2024-10-01",
      valid_to: "2024-12-31",
      created_at: "2024-09-25T10:00:00Z",
      updated_at: "2024-09-25T10:00:00Z",
      type: "promotion",
      banner_url: "/ice-cream-promotion.jpg",
      quantity_redeemed: 45,
      isActive: true,
    },
    {
      id: "2",
      comercio_id: "2",
      title: "15% de descuento en empanadas",
      description: "Descuento del 15% en docenas de empanadas",
      code: "EMPANADAS15",
      quantity: 50,
      valid_from: "2024-10-15",
      valid_to: "2024-11-30",
      created_at: "2024-10-10T10:00:00Z",
      updated_at: "2024-10-10T10:00:00Z",
      type: "discount",
      banner_url: "/empanadas-discount.jpg",
      quantity_redeemed: 12,
      isActive: true,
    },
    {
      id: "3",
      comercio_id: "3",
      title: "Torta de regalo en tu cumpleaños",
      description: "Torta individual gratis el día de tu cumpleaños",
      code: "CUMPLE2024",
      quantity: 200,
      valid_from: "2024-01-01",
      valid_to: "2024-12-31",
      created_at: "2024-01-01T10:00:00Z",
      updated_at: "2024-01-01T10:00:00Z",
      type: "gift",
      banner_url: "/festive-birthday-cake.png",
      quantity_redeemed: 87,
      isActive: true,
    },
    {
      id: "4",
      comercio_id: "4",
      title: "10% en productos de cuidado personal",
      description: "Descuento en toda la línea de cuidado personal",
      code: "CUIDADO10",
      quantity: 75,
      valid_from: "2024-10-01",
      valid_to: "2024-10-31",
      created_at: "2024-09-28T10:00:00Z",
      updated_at: "2024-09-28T10:00:00Z",
      type: "discount",
      banner_url: null,
      quantity_redeemed: 23,
      isActive: true,
    },
    {
      id: "5",
      comercio_id: "5",
      title: "Primera clase gratis",
      description: "Probá una clase de cualquier disciplina sin cargo",
      code: "PRIMERACLASE",
      quantity: 30,
      valid_from: "2024-09-01",
      valid_to: "2024-09-30",
      created_at: "2024-08-25T10:00:00Z",
      updated_at: "2024-08-25T10:00:00Z",
      type: "gift",
      banner_url: "/gym-class.jpg",
      quantity_redeemed: 30,
      isActive: false,
    },
  ]
  
  export const mockEvents: Event[] = [
    {
      id: "1",
      comercio_id: "1",
      title: "Festival de Helados Artesanales",
      description: "Degustación de nuevos sabores y sorteos especiales",
      date: "2024-11-15",
      time: "18:00:00",
      place: "Topping Cerro de las Rosas",
      direction: "Av. Rafael Núñez 4558",
      inscription_link: "https://topping.com/festival",
      open_time: "18:00:00",
      close_time: "22:00:00",
      created_at: "2024-10-01T10:00:00Z",
      isActive: true,
      banner_url: "/ice-cream-festival.jpg",
    },
    {
      id: "2",
      comercio_id: "2",
      title: "Noche de Folklore y Empanadas",
      description: "Música en vivo y degustación de empanadas regionales",
      date: "2024-11-20",
      time: "20:00:00",
      place: "Casa Criolla",
      direction: "Av. Rafael Núñez 4620",
      inscription_link: null,
      open_time: "20:00:00",
      close_time: "01:00:00",
      created_at: "2024-10-05T10:00:00Z",
      isActive: true,
      banner_url: "/folklore-night.jpg",
    },
    {
      id: "3",
      comercio_id: "3",
      title: "Taller de Decoración de Tortas",
      description: "Aprende técnicas profesionales de decoración",
      date: "2024-11-10",
      time: "15:00:00",
      place: "Tortas Rossi",
      direction: "Av. Rafael Núñez 4700",
      inscription_link: "https://tortasrossi.com/taller",
      open_time: "15:00:00",
      close_time: "18:00:00",
      created_at: "2024-09-30T10:00:00Z",
      isActive: true,
      banner_url: "/cake-decorating-workshop.jpg",
    },
    {
      id: "4",
      comercio_id: "4",
      title: "Charla sobre Prevención de Salud",
      description: "Charla gratuita con profesionales de la salud",
      date: "2024-10-28",
      time: "10:00:00",
      place: "Farmacia del Cerro",
      direction: "Av. Rafael Núñez 4550",
      inscription_link: null,
      open_time: "10:00:00",
      close_time: "12:00:00",
      created_at: "2024-10-15T10:00:00Z",
      isActive: false,
      banner_url: null,
    },
    {
      id: "5",
      comercio_id: "5",
      title: "Maratón de Spinning Solidaria",
      description: "Evento benéfico con clases de spinning",
      date: "2024-12-05",
      time: "09:00:00",
      place: "Gimnasio Fitness Zone",
      direction: "Av. Rafael Núñez 4800",
      inscription_link: "https://fitnesszone.com/maraton",
      open_time: "09:00:00",
      close_time: "13:00:00",
      created_at: "2024-10-20T10:00:00Z",
      isActive: true,
      banner_url: "/spinning-marathon.jpg",
    },
  ]
  
  export const mockArticles: Article[] = [
    {
      id: "1",
      title: "Inauguración del nuevo centro comercial Plaza Norte",
      slug: "inauguracion-plaza-norte",
      excerpt: "Se inauguró Plaza Norte, un nuevo centro comercial que promete revitalizar la zona norte de Córdoba.",
      content: "",
      author: "Redacción Matices",
      category: "Comercio",
      tags: ["comercio", "inauguración", "plaza norte"],
      featured_image: "/bustling-shopping-mall.png",
      published_at: "2024-10-15T10:00:00Z",
      updated_at: "2024-10-15T10:00:00Z",
      isPublished: true,
      views: 1250,
    },
    {
      id: "2",
      title: "Clínica del Cerro amplía servicios de cardiología",
      slug: "clinica-cerro-cardiologia",
      excerpt: "La Clínica del Cerro amplía sus servicios con un nuevo departamento de cardiología de última generación.",
      content: "",
      author: "Dr. Ana Morales",
      category: "Salud",
      tags: ["salud", "cardiología", "clínica"],
      featured_image: "/cardiology-clinic.png",
      published_at: "2024-10-12T10:00:00Z",
      updated_at: "2024-10-12T10:00:00Z",
      isPublished: true,
      views: 890,
    },
    {
      id: "3",
      title: "Escuela Manuel Belgrano celebra 50 años de educación pública",
      slug: "escuela-belgrano-50-anos",
      excerpt: "La Escuela Manuel Belgrano celebra medio siglo de trayectoria educativa en el barrio.",
      content: "",
      author: "Prof. Carlos Ruiz",
      category: "Educación",
      tags: ["educación", "aniversario", "escuela"],
      featured_image: "/school-celebration.jpg",
      published_at: "2024-10-10T10:00:00Z",
      updated_at: "2024-10-10T10:00:00Z",
      isPublished: true,
      views: 2340,
    },
    {
      id: "4",
      title: "Nueva ciclovía conecta el Cerro con el centro",
      slug: "nueva-ciclovia-cerro-centro",
      excerpt:
        "Se inauguró una nueva ciclovía que facilita el tránsito de ciclistas entre el Cerro de las Rosas y el centro de la ciudad.",
      content: "",
      author: "Redacción Matices",
      category: "Infraestructura",
      tags: ["ciclovía", "transporte", "movilidad"],
      featured_image: "/bike-lane.jpg",
      published_at: "2024-10-08T10:00:00Z",
      updated_at: "2024-10-08T10:00:00Z",
      isPublished: true,
      views: 1560,
    },
    {
      id: "5",
      title: "Festival de Arte Urbano en el Cerro",
      slug: "festival-arte-urbano",
      excerpt: "Artistas locales transforman las paredes del barrio en obras de arte durante el festival anual.",
      content: "",
      author: "Laura Fernández",
      category: "Cultura",
      tags: ["arte", "cultura", "festival"],
      featured_image: "/street-art-festival.jpg",
      published_at: "2024-10-05T10:00:00Z",
      updated_at: "2024-10-05T10:00:00Z",
      isPublished: false,
      views: 450,
    },
  ]
  