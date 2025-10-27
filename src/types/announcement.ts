export interface Announcement {
  id: string
  title: string
  imageUrl: string
  altText: string
  isActive: boolean
  startDate?: string
  endDate?: string
  clickUrl?: string
  createdAt: string
  updatedAt: string
}

export interface AnnouncementSettings {
  enabled: boolean
  showDelay: number // en milisegundos
  dismissDuration: number // días que permanece cerrado
}

