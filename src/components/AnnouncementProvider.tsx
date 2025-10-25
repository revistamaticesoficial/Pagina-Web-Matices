"use client"

import { AnnouncementPopup, useAnnouncementPopup } from '@/components/AnnouncementPopup'
import { getRandomActiveAnnouncement } from '@/data/announcements'

export function AnnouncementProvider() {
  const activeAnnouncement = getRandomActiveAnnouncement()
  const { showPopup, handleClose, timerActive } = useAnnouncementPopup(activeAnnouncement || undefined)

  if (!showPopup || !activeAnnouncement) {
    return null
  }

  return (
    <AnnouncementPopup
      announcement={activeAnnouncement}
      onClose={handleClose}
    />
  )
}

