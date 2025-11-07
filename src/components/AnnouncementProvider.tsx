"use client"

import { useState, useEffect, useRef } from 'react'
import { AnnouncementPopup } from '@/components/AnnouncementPopup'
import { announcementService } from '@/lib/announcement-service'
import type { Announcement } from '@/types/announcement'

export function AnnouncementProvider() {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Cargar anuncios desde Supabase al montar
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        console.log('[AnnouncementProvider] Cargando anuncios desde Supabase...')
        const activeAnnouncements = await announcementService.getActiveAnnouncements()
        console.log('[AnnouncementProvider] Anuncios cargados:', activeAnnouncements.length)
        setAnnouncements(activeAnnouncements)
        
        if (activeAnnouncements.length > 0) {
          // Obtener el primer anuncio aleatorio
          const firstAnnouncement = await announcementService.getRandomActiveAnnouncement()
          console.log('[AnnouncementProvider] Primer anuncio seleccionado:', firstAnnouncement?.id)
          
          if (firstAnnouncement) {
            setCurrentAnnouncement(firstAnnouncement)
            
            // Iniciar timer de 15 segundos para mostrar el primer popup
            timerRef.current = setTimeout(() => {
              const dismissedKey = `announcement-dismissed-${firstAnnouncement.id}`
              const isDismissed = localStorage.getItem(dismissedKey)
              console.log('[AnnouncementProvider] Timer de 15s completado. Dismissed?', !!isDismissed)
              
              if (!isDismissed) {
                console.log('[AnnouncementProvider] Mostrando popup')
                setShowPopup(true)
              } else {
                console.log('[AnnouncementProvider] Anuncio fue cerrado previamente, no se muestra')
              }
            }, 15000)
          }
        } else {
          console.log('[AnnouncementProvider] No hay anuncios activos')
        }
      } catch (error) {
        console.error('[AnnouncementProvider] Error loading announcements:', error)
      }
    }

    loadAnnouncements()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  // Rotar anuncios cada 15 segundos
  useEffect(() => {
    if (announcements.length === 0) {
      console.log('[AnnouncementProvider] No hay anuncios para rotar')
      return
    }

    // Limpiar intervalo anterior si existe
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    console.log('[AnnouncementProvider] Iniciando rotación cada 15 segundos')

    intervalRef.current = setInterval(async () => {
      try {
        console.log('[AnnouncementProvider] Rotando a nuevo anuncio...')
        // Obtener siguiente anuncio aleatorio
        const nextAnnouncement = await announcementService.getRandomActiveAnnouncement()
        
        if (nextAnnouncement) {
          console.log('[AnnouncementProvider] Nuevo anuncio seleccionado:', nextAnnouncement.id)
          
          // Cerrar popup actual si está abierto
          setShowPopup(false)
          
          // Pequeño delay antes de cambiar al nuevo anuncio
          setTimeout(() => {
            setCurrentAnnouncement(nextAnnouncement)
            
            // Verificar si el nuevo anuncio no fue cerrado
            const dismissedKey = `announcement-dismissed-${nextAnnouncement.id}`
            const isDismissed = localStorage.getItem(dismissedKey)
            
            if (!isDismissed) {
              console.log('[AnnouncementProvider] Mostrando nuevo anuncio')
              setShowPopup(true)
            } else {
              console.log('[AnnouncementProvider] Nuevo anuncio fue cerrado previamente')
            }
          }, 300)
        } else {
          console.log('[AnnouncementProvider] No se pudo obtener nuevo anuncio')
        }
      } catch (error) {
        console.error('[AnnouncementProvider] Error rotating announcement:', error)
      }
    }, 15000) // 15 segundos

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [announcements])

  const handleClose = () => {
    if (currentAnnouncement) {
      // Marcar como cerrado en localStorage para este anuncio específico
      const dismissedKey = `announcement-dismissed-${currentAnnouncement.id}`
      localStorage.setItem(dismissedKey, 'true')
      console.log('[AnnouncementProvider] Anuncio cerrado:', currentAnnouncement.id)
    }
    setShowPopup(false)
  }

  // Debug: mostrar estado actual
  useEffect(() => {
    console.log('[AnnouncementProvider] Estado actual:', {
      hasAnnouncement: !!currentAnnouncement,
      showPopup,
      announcementsCount: announcements.length
    })
  }, [currentAnnouncement, showPopup, announcements.length])

  if (!showPopup || !currentAnnouncement) {
    return null
  }

  return (
    <AnnouncementPopup
      announcement={currentAnnouncement}
      onClose={handleClose}
    />
  )
}

