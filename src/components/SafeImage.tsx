import { useState } from 'react';
import { Home } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackTitle,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#34483D]/10 text-[#34483D] p-6 text-center ${className}`}
      >
        <Home className="w-8 h-8 text-[#B9785C] mb-2" aria-hidden="true" />
        <span className="font-display text-lg font-semibold">
          {fallbackTitle || 'Vvichelae Residence'}
        </span>
        <span className="text-xs text-[#34483D]/70 mt-1">Lagos, Nigeria</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
