import type { Announcement } from '@/types/announcement'

// Array de anuncios disponibles
export const mockAnnouncements: Announcement[] = [
  {
    id: 'announcement-001',
    title: 'Nueva Edición de Revista Matices',
    image_url: '/images/publicidad1.png',
    alt_text: 'Anuncio de la nueva edición de Revista Matices del Cerro',
    is_active: true,
    click_url: '/sugerencias',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'announcement-002',
    title: 'Descuentos Exclusivos en Comercios del Barrio',
    image_url: '/images/publicidad2.png',
    alt_text: 'Descuentos especiales en comercios del Cerro de las Rosas',
    is_active: true,
    click_url: '/',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'announcement-003',
    title: 'Eventos del Mes en el Cerro',
    image_url: '/images/publicidad1.png',
    alt_text: 'Próximos eventos en el barrio Cerro de las Rosas',
    is_active: true,
    click_url: '/sugerencias?tab=beneficios',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

// Función para obtener un anuncio aleatorio activo
export function getRandomActiveAnnouncement(): Announcement | null {
  const activeAnnouncements = mockAnnouncements.filter(announcement => announcement.is_active)
  
  if (activeAnnouncements.length === 0) {
    return null
  }
  
  // Obtener anuncios no mostrados recientemente
  const recentlyShown = getRecentlyShownAnnouncements()
  const availableAnnouncements = activeAnnouncements.filter(
    announcement => !recentlyShown.includes(announcement.id)
  )
  
  // Si todos han sido mostrados recientemente, usar todos
  const announcementsToChooseFrom = availableAnnouncements.length > 0 
    ? availableAnnouncements 
    : activeAnnouncements
  
  const randomIndex = Math.floor(Math.random() * announcementsToChooseFrom.length)
  const selectedAnnouncement = announcementsToChooseFrom[randomIndex]
  
  // Marcar como mostrado
  markAnnouncementAsShown(selectedAnnouncement.id)
  
  return selectedAnnouncement
}

// Función para obtener anuncios mostrados recientemente (últimas 24 horas)
function getRecentlyShownAnnouncements(): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const shown = localStorage.getItem('recently-shown-announcements')
    if (!shown) return []
    
    const data = JSON.parse(shown)
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    
    // Filtrar anuncios mostrados en las últimas 24 horas
    return data
      .filter((item: { id: string; timestamp: number }) => now - item.timestamp < oneDay)
      .map((item: { id: string }) => item.id)
  } catch {
    return []
  }
}

// Función para marcar un anuncio como mostrado
function markAnnouncementAsShown(announcementId: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const shown = localStorage.getItem('recently-shown-announcements')
    const data = shown ? JSON.parse(shown) : []
    
    // Agregar el nuevo anuncio
    data.push({
      id: announcementId,
      timestamp: Date.now()
    })
    
    // Mantener solo los últimos 10 registros
    const recentData = data.slice(-10)
    
    localStorage.setItem("recently-shown-announcements", JSON.stringify(recentData));
  } catch {
    // Silently fail
  }
}

// Función para obtener el anuncio activo (mantener compatibilidad)
export function getActiveAnnouncement(): Announcement | null {
  return getRandomActiveAnnouncement();
}
