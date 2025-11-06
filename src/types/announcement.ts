export interface Announcement {
  id: string
  title: string
  image_url: string
  alt_text: string
  is_active: boolean
  click_url: string | null
  created_at: string
  updated_at: string
}

export interface AnnouncementSettings {
  enabled: boolean
  showDelay: number // en milisegundos
  dismissDuration: number // días que permanece cerrado
}

