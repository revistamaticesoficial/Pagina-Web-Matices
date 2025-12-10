'use client';

import { useEffect, useState } from 'react';
import { ShareToInstagramButton } from './ShareToInstagramButton';

interface ShareToInstagramButtonWrapperProps {
  slug: string;
  imageUrl?: string;
}

export function ShareToInstagramButtonWrapper({ slug, imageUrl }: ShareToInstagramButtonWrapperProps) {
  const [fullUrl, setFullUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/articulos/${slug}`;
      setFullUrl(url);
    }
  }, [slug]);

  if (!fullUrl) {
    return null;
  }

  return <ShareToInstagramButton url={fullUrl} imageUrl={imageUrl} />;
}

