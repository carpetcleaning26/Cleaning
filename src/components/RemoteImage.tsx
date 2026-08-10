'use client';

import { useState } from 'react';

interface RemoteImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function RemoteImage({ src, alt, className = '', fallbackSrc }: RemoteImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const defaultFallback = "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80";

  return (
    <img
      src={hasError ? (fallbackSrc || defaultFallback) : imgSrc}
      alt={alt}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc || defaultFallback);
        }
      }}
      className={className}
    />
  );
}
