import { supabase } from './supabase';
import { Benefit } from '@/types/sugerencias';

export interface RedeemData {
  nombreCompleto: string;
  dni: string;
  telefono: string;
  email?: string;
  benefitId: string;
  generatedCode: string;
  redeemedAt: string;
}

export interface RedeemResponse {
  success: boolean;
  code?: string;
  error?: string;
}

/**
 * Servicio para manejar el canje de beneficios
 */
export class BenefitService {
  /**
   * Canjear un beneficio
   */
  static async redeemBenefit(
    benefit: Benefit,
    formData: {
      nombreCompleto: string;
      dni: string;
      telefono: string;
      email?: string;
    }
  ): Promise<RedeemResponse> {
    try {
      // Verificar si el beneficio está activo
      if (!benefit.isActive) {
        return { success: false, error: 'Este beneficio ya no está disponible' };
      }

      // Llamar al endpoint server-side (valida expiración, stock, duplicados e inserta)
      const response = await fetch('/api/benefits/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          benefit_id: benefit.id,
          full_name: formData.nombreCompleto.trim(),
          dni: formData.dni.trim(),
          phone: formData.telefono.trim(),
          email: formData.email?.trim() || null,
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        return { success: false, error: json?.error || 'No se pudo completar el canje' };
      }

      return { success: true };

    } catch (error) {
      console.error('Error inesperado al canjear beneficio:', error);
      return { success: false, error: 'Error inesperado. Inténtalo nuevamente.' };
    }
  }

  /**
   * Obtener beneficios disponibles
   */
  static async getAvailableBenefits(): Promise<Benefit[]> {
    // Por ahora retorna array vacío, en el futuro se implementará con Supabase
    return [];
  }

  /**
   * Verificar si un beneficio está disponible
   */
  static async checkBenefitAvailability(benefitId: string): Promise<boolean> {
    // Por ahora siempre retorna true, en el futuro se implementará con Supabase
    return true;
  }

  /**
   * Obtener estadísticas de un beneficio
   */
  static async getBenefitStats(benefitId: string) {
    // Por ahora retorna estadísticas mock, en el futuro se implementará con Supabase
    return { redeemedCount: Math.floor(Math.random() * 50) };
  }
}
