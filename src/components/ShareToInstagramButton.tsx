'use client';

import { useState } from 'react';
import { Share2, Instagram, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ShareToInstagramButtonProps {
  url: string;
  imageUrl?: string;
  className?: string;
}

export function ShareToInstagramButton({ url, imageUrl, className }: ShareToInstagramButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleShare = async () => {
    // Usar Web Share API - es la forma estándar y funciona mejor
    await useWebShareAPI();
  };

  const useWebShareAPI = async () => {
    // Verificar si el navegador soporta Web Share API
    if (!navigator.share) {
      setIsSharing(false);
      alert('La función de compartir no está disponible en este dispositivo.');
      return;
    }

    setIsSharing(true);

    try {
      // Usar Web Share API con los datos del artículo
      await navigator.share({
        title: '¡Mirá este artículo!',
        text: 'Te comparto algo interesante:',
        url: url,
      });
      
      // Si llegamos aquí, el usuario compartió exitosamente
      // Nota: Instagram Stories NO permite compartir URLs directamente desde el Share Sheet
      // El usuario puede elegir Instagram y luego crear un post o story manualmente
    } catch (error: any) {
      // El usuario canceló el diálogo de compartir
      if (error.name !== 'AbortError') {
        console.error('Error al compartir:', error);
        // No mostrar alert si el usuario canceló
      }
    } finally {
      setIsSharing(false);
    }
  };

  // Si no hay soporte para Web Share API, no mostrar el botón
  if (typeof window === 'undefined' || !navigator.share) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        onClick={handleShare}
        disabled={isSharing}
        className={`
          inline-flex items-center justify-center gap-2
          bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]
          hover:from-[#9B4DD1] hover:via-[#FF2E2E] hover:to-[#FFC066]
          text-white font-medium
          px-6 py-3
          rounded-lg
          shadow-md hover:shadow-lg
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className || ''}
        `}
      >
        {isSharing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Compartiendo...</span>
          </>
        ) : (
          <>
            <Instagram className="w-5 h-5" />
            <span>Compartir en Instagram</span>
          </>
        )}
      </Button>
      
      {/* Información sobre Instagram Stories */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        title="Información sobre compartir en Instagram"
      >
        <Info className="w-4 h-4" />
      </button>
      
      {showInfo && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
          <h4 className="font-semibold text-gray-900 mb-2">Cómo compartir en Instagram Stories</h4>
          <p className="text-sm text-gray-600 mb-3">
            Instagram Stories no permite compartir URLs directamente. Para compartir este artículo:
          </p>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Haz clic en "Compartir en Instagram"</li>
            <li>Selecciona Instagram desde el menú de compartir</li>
            <li>Instagram abrirá la opción de crear un Post</li>
            <li>Para crear una Story: abre Instagram manualmente, crea una nueva historia y usa el sticker de enlace</li>
          </ol>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-700"
          >
            Entendido
          </button>
        </div>
      )}
    </div>
  );
}

