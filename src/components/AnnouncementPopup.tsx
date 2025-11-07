"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { Announcement } from "@/types/announcement"

interface AnnouncementPopupProps {
  announcement: Announcement
  onClose: () => void
}

export function AnnouncementPopup({ announcement, onClose }: AnnouncementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Pequeño delay para la animación de entrada
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Delay para permitir la animación de salida
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleImageClick = () => {
<<<<<<< HEAD
    const clickUrl = announcement.click_url || (announcement as any).clickUrl;
    if (clickUrl) {
      window.open(clickUrl, '_blank', 'noopener,noreferrer')
=======
    if (announcement.click_url) {
      window.open(announcement.click_url, '_blank', 'noopener,noreferrer')
>>>>>>> dc4c20bd481de098e1673972970a75922e4b145b
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay con fondo negro semi-transparente */}
      <div 
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal - Desktop: imagen grande, Mobile: grid de 3 anuncios */}
      <div 
        className={`relative transition-all duration-300 transform ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Desktop: Imagen grande */}
        <div className="hidden md:block relative w-[70vw] h-[70vh]">
          {/* Botón de cerrar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute -top-12 -right-12 z-10 bg-white/90 hover:bg-white text-black rounded-full shadow-lg"
          >
            <X className="h-6 w-6" />
          </Button>
          
          {/* Imagen del anuncio */}
          <div 
            className={`relative w-full h-full rounded-lg overflow-hidden shadow-2xl ${
<<<<<<< HEAD
              (announcement.click_url || (announcement as any).clickUrl) ? 'cursor-pointer' : ''
            }`}
            onClick={handleImageClick}
          >
            <img
              src={announcement.image_url || (announcement as any).imageUrl}
              alt={announcement.alt_text || (announcement as any).altText || ''}
              className="w-full h-full object-cover"
=======
              announcement.click_url ? 'cursor-pointer' : ''
            }`}
            onClick={handleImageClick}
          >
            <Image
              src={announcement.image_url}
              alt={announcement.alt_text}
              fill
              className="object-cover"
              sizes="70vw"
>>>>>>> dc4c20bd481de098e1673972970a75922e4b145b
            />
          </div>
        </div>

        {/* Mobile: Grid de 3 anuncios */}
        <div className="md:hidden relative w-full max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Anuncios</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Grid de imágenes */}
          <div className="grid grid-cols-1 gap-2 p-4">
            <div
              className={`relative aspect-[4/3] max-h-[140px] rounded-lg overflow-hidden shadow-md ${
<<<<<<< HEAD
                (announcement.click_url || (announcement as any).clickUrl) ? 'cursor-pointer' : ''
              }`}
              onClick={handleImageClick}
            >
              <img
                src={announcement.image_url || (announcement as any).imageUrl}
                alt={announcement.alt_text || (announcement as any).altText || ''}
                className="w-full h-full object-cover"
              />
              {(announcement.click_url || (announcement as any).clickUrl) && (
=======
                announcement.click_url ? 'cursor-pointer' : ''
              }`}
              onClick={handleImageClick}
            >
              <Image
                src={announcement.image_url}
                alt={announcement.alt_text}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
              />
              {announcement.click_url && (
>>>>>>> dc4c20bd481de098e1673972970a75922e4b145b
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white/90 text-black px-2 py-1 rounded text-xs font-medium">
                    Toca para ver más
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook para manejar el estado del popup con localStorage y timer
export function useAnnouncementPopup(announcement?: Announcement) {
  const [showPopup, setShowPopup] = useState(false)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    // Solo mostrar si hay un anuncio activo
<<<<<<< HEAD
    const isActive = announcement?.is_active ?? (announcement as any)?.isActive ?? false;
    if (!announcement || !isActive) {
=======
    if (!announcement || !announcement.is_active) {
>>>>>>> dc4c20bd481de098e1673972970a75922e4b145b
      return
    }

    // Verificar si el popup ya fue cerrado para este anuncio específico
    const dismissedKey = `announcement-dismissed-${announcement.id}`
    const isDismissed = localStorage.getItem(dismissedKey)
    
    if (!isDismissed) {
      // Iniciar timer de 15 segundos
      setTimerActive(true)
      const timer = setTimeout(() => {
        setShowPopup(true)
        setTimerActive(false)
      }, 15000) // 15 segundos

      return () => {
        clearTimeout(timer)
        setTimerActive(false)
      }
    }
  }, [announcement])

  const handleClose = () => {
    if (announcement) {
      // Marcar como cerrado en localStorage para este anuncio específico
      const dismissedKey = `announcement-dismissed-${announcement.id}`
      localStorage.setItem(dismissedKey, 'true')
    }
    setShowPopup(false)
  }

  return {
    showPopup,
    handleClose,
    timerActive
  }
}
