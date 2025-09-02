import { Database } from './database'

// Database table types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Business = Database['public']['Tables']['comercios']['Row']
export type BusinessHours = Database['public']['Tables']['comercio_schedules']['Row']
export type BusinessUser = Database['public']['Tables']['business_users']['Row']
export type Benefit = Database['public']['Tables']['benefits']['Row']
export type BenefitClaim = Database['public']['Tables']['benefit_redemptions']['Row']
export type Event = Database['public']['Tables']['events']['Row']

// Insert types for forms
export type BusinessInsert = Database['public']['Tables']['comercios']['Insert']
export type BusinessHoursInsert = Database['public']['Tables']['comercio_schedules']['Insert']
export type BenefitInsert = Database['public']['Tables']['benefits']['Insert']
export type EventInsert = Database['public']['Tables']['events']['Insert']

// Extended types with relationships
export type BusinessWithDetails = Business & {
  comercio_schedules: BusinessHours[]
  benefits?: Benefit[]
  events?: Event[]
}

export type ProfileWithBusiness = Profile & {
  business?: BusinessWithDetails
}

// Onboarding types
export interface OnboardingStep1Data {
  name: string
  description: string
  address: string
  phone: string
}

export interface OnboardingStep2Data {
  logo_url?: string
  business_hours: {
    day_of_week: number
    open_time: string
    close_time: string
  }[]
}

export type OnboardingData = OnboardingStep1Data & OnboardingStep2Data

// Business hours helpers
export interface DaySchedule {
  day_of_week: number
  day_name: string
  open_time: string
  close_time: string
  is_closed: boolean
}

export const DAYS_OF_WEEK = [
  'Domingo',
  'Lunes', 
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
] as const

export type DayOfWeek = typeof DAYS_OF_WEEK[number]

