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

  const defaultFallback = "/images/hero-carpet.png";

  return (
    <img
      src={hasError ? (fallbackSrc || defaultFallback) : imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc || defaultFallback);
        }
      }}
    />
  );
}
