import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import type { Announcement } from '@/types/announcement';

const createSupabaseClient = () => createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Servicio para obtener anuncios activos desde Supabase
 */
export const announcementService = {
  /**
   * Obtener todos los anuncios activos desde Supabase
   */
  async getActiveAnnouncements(): Promise<Announcements[]> {
    const supabase = createSupabaseClient();
    
    const now = new Date().toISOString().split('T')[0]; // Solo la fecha sin hora
    
    console.log('[announcement-service] Obteniendo anuncios activos desde Supabase...');
    console.log('[announcement-service] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...');
    
    // Intentar primero sin ordenamiento para ver si el problema es el order by
    let { data, error } = await supabase
      .from('announcements')
      .select('*');
    
    // Si falla, intentar con ordenamiento
    if (error) {
      console.warn('[announcement-service] Error sin order by, intentando con order by...', error.message);
      const retry = await supabase
        .from('announcements')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (retry.error) {
        error = retry.error;
      } else {
        data = retry.data;
        error = null;
      }
    } else {
      // Si funcionó sin order by, ordenar en el cliente
      if (data && data.length > 0) {
        data = data.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      }
    }

    if (error) {
      console.error('[announcement-service] Error fetching announcements:', error);
      console.error('[announcement-service] Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return [];
    }

    console.log('[announcement-service] Anuncios obtenidos de Supabase (sin filtrar):', data?.length || 0);
    
    if (!data || data.length === 0) {
      console.log('[announcement-service] No se encontraron anuncios en Supabase');
      return [];
    }
    
    // Filtrar por is_active en el cliente
    const activeData = data.filter(a => a.is_active === true);
    console.log('[announcement-service] Anuncios activos después de filtrar:', activeData.length);


    // Mapear de la estructura de Supabase al tipo Announcement
    return filtered.map((announcements) => ({
      id: announcements.id,
      title: announcements.title,
      image_url: announcements.image_url,
      alt_text: announcements.alt_text || '',
      is_active: announcements.is_active,
      click_url: announcements.click_url,
      created_at: announcements.created_at,
      updated_at: announcements.updated_at,
    }));
  },

  /**
   * Obtener un anuncio aleatorio activo, excluyendo los mostrados recientemente
   */
  async getRandomActiveAnnouncement(): Promise<Announcement | null> {
    const activeAnnouncements = await this.getActiveAnnouncements();
    
    if (activeAnnouncements.length === 0) {
      return null;
    }
    
    // Obtener anuncios no mostrados recientemente
    const recentlyShown = getRecentlyShownAnnouncements();
    const availableAnnouncements = activeAnnouncements.filter(
      announcement => !recentlyShown.includes(announcement.id)
    );
    
    // Si todos han sido mostrados recientemente, usar todos
    const announcementsToChooseFrom = availableAnnouncements.length > 0 
      ? availableAnnouncements 
      : activeAnnouncements;
    
    const randomIndex = Math.floor(Math.random() * announcementsToChooseFrom.length);
    const selectedAnnouncement = announcementsToChooseFrom[randomIndex];
    
    // Marcar como mostrado
    markAnnouncementAsShown(selectedAnnouncement.id);
    
    return selectedAnnouncement;
  }
};

// Funciones auxiliares para localStorage (mantener compatibilidad)
function getRecentlyShownAnnouncements(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const shown = localStorage.getItem('recently-shown-announcements');
    if (!shown) return [];
    
    const data = JSON.parse(shown);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // Filtrar anuncios mostrados en las últimas 24 horas
    return data
      .filter((item: { id: string; timestamp: number }) => now - item.timestamp < oneDay)
      .map((item: { id: string }) => item.id);
  } catch {
    return [];
  }
}

function markAnnouncementAsShown(announcementId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const shown = localStorage.getItem('recently-shown-announcements');
    const data = shown ? JSON.parse(shown) : [];
    
    // Agregar el nuevo anuncio
    data.push({
      id: announcementId,
      timestamp: Date.now()
    });
    
    // Mantener solo los últimos 10 registros
    const recentData = data.slice(-10);
    
    localStorage.setItem('recently-shown-announcements', JSON.stringify(recentData));
  } catch {
    // Silently fail
  }
}

