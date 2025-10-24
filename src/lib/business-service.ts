import { supabase } from './supabase';
import { 
  BusinessInsert, 
  BusinessHoursInsert, 
  OnboardingData,
  BusinessWithDetails 
} from '@/types/business';

export const businessService = {
  async createBusiness(userId: string, data: OnboardingData): Promise<BusinessWithDetails> {
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .insert({
        owner_id: userId,
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        logo_url: data.logo_url,
      })
      .select()
      .single();

    if (businessError) throw businessError;

    // Crear horarios si existen
    if (data.business_hours && data.business_hours.length > 0) {
      const hoursData: BusinessHoursInsert[] = data.business_hours.map(hour => ({
        business_id: business.id,
        day_of_week: hour.day_of_week,
        open_time: hour.open_time,
        close_time: hour.close_time,
      }));

      const { error: hoursError } = await supabase
        .from('business_hours')
        .insert(hoursData);

      if (hoursError) {
        // Si falla la creación de horarios, eliminar el comercio
        await supabase.from('businesses').delete().eq('id', business.id);
        throw hoursError;
      }
    }

    // Obtener el comercio completo con horarios
    return await this.getBusinessById(business.id);
  },

  /**
   * Obtener comercio por ID con todos sus datos
   */
  async getBusinessById(businessId: string): Promise<BusinessWithDetails | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select(`
        *,
        business_hours(*),
        business_users(*),
        benefits(*),
        events(*)
      `)
      .eq('id', businessId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Obtener comercio por usuario
   */
  async getBusinessByUserId(userId: string): Promise<BusinessWithDetails | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select(`
        *,
        business_hours(*),
        business_users(*),
        benefits(*),
        events(*)
      `)
      .eq('owner_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Actualizar información básica del comercio
   */
  async updateBusiness(businessId: string, updates: Partial<BusinessInsert>): Promise<BusinessWithDetails | null> {
    const { data, error } = await supabase
      .from('businesses')
      .update(updates)
      .eq('id', businessId)
      .select()
      .maybeSingle();

    if (error) throw error;
    return await this.getBusinessById(businessId);
  },

  /**
   * Obtener todos los comercios públicos
   */
  async getAllBusinesses(): Promise<BusinessWithDetails[]> {
    const { data, error } = await supabase
      .from('businesses')
      .select(`
        *,
        business_hours(*),
        business_users(*),
        benefits!inner(*),
        events!inner(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Actualizar horarios de un comercio
   */
  async updateBusinessHours(businessId: string, hours: BusinessHoursInsert[]): Promise<void> {
    // Eliminar horarios existentes
    const { error: deleteError } = await supabase
      .from('business_hours')
      .delete()
      .eq('business_id', businessId);

    if (deleteError) throw deleteError;

    // Insertar nuevos horarios
    if (hours.length > 0) {
      const { error: insertError } = await supabase
        .from('business_hours')
        .insert(hours);

      if (insertError) throw insertError;
    }
  },

  /**
   * Verificar si un comercio está abierto ahora
   */
  isBusinessOpen(businessHours: any[]): boolean {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = domingo, 6 = sábado
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

    const todayHours = businessHours.filter(h => h.day_of_week === currentDay);
    
    return todayHours.some(hour => 
      currentTime >= hour.open_time && currentTime <= hour.close_time
    );
  },

  /**
   * Obtener próximo horario de apertura
   */
  getNextOpenTime(businessHours: any[]): string | null {
    if (businessHours.length === 0) return null;

    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.toTimeString().slice(0, 5);

    // Buscar en los próximos 7 días
    for (let i = 0; i < 7; i++) {
      const checkDay = (currentDay + i) % 7;
      const dayHours = businessHours.filter(h => h.day_of_week === checkDay);
      
      for (const hour of dayHours) {
        if (i === 0 && currentTime < hour.open_time) {
          // Hoy, pero antes de abrir
          return `Abre hoy a las ${hour.open_time}`;
        } else if (i > 0) {
          // Otro día
          const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
          return `Abre el ${dayNames[checkDay]} a las ${hour.open_time}`;
        }
      }
    }

    return null;
  }
};

