'use client';

import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

// Botón de compartir que abre el menú nativo (Web Share API).
// Desde ese menú, el usuario puede elegir Instagram (post o historia) u otra app.
export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const handleShare = async () => {
    // Construir URL absoluta si hace falta
    let finalUrl = url;
    if (typeof window !== 'undefined') {
      finalUrl = url.startsWith('http')
        ? url
        : `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`;
    }

    // Verificar soporte de Web Share API
    if (typeof navigator === 'undefined' || !navigator.share) {
      alert('La función de compartir no está disponible en este dispositivo.');
      return;
    }

    try {
      await navigator.share({
        title: '¡Mirá este artículo!',
        text: description || 'Te comparto algo interesante:',
        url: finalUrl,
      });
      // El usuario elige la app (Instagram, WhatsApp, etc.) y allí decide si es post o historia
    } catch (error: any) {
      // Si el usuario cancela, no mostramos error
      if (error?.name !== 'AbortError') {
        console.error('Error al compartir:', error);
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 w-full sm:w-auto"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      <span className="text-sm">Compartir</span>
    </Button>
  );
}

interface CopyLinkButtonProps {
  url: string;
}

// Botón gemelo visual de "Compartir" pero que copia el enlace del artículo
export function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let finalUrl = url;
    if (typeof window !== 'undefined') {
      finalUrl = url.startsWith('http')
        ? url
        : `${window.location.origin}${url.startsWith('/') ? url : `/${url}`}`;
    }

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      // Fallback simple si no hay API de portapapeles
      window.prompt('Copiá este enlace:', finalUrl);
      return;
    }

    try {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar el enlace:', error);
      window.prompt('Copiá este enlace:', finalUrl);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 w-full sm:w-auto"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span className="text-sm">Copiado</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span className="text-sm">Copiar link</span>
        </>
      )}
    </Button>
  );
}
