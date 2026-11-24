import {useState} from 'react';
import {ImageOff} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-[#232329] via-[#1C1C21] to-[#141417] text-zinc-400"
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-7 h-7 text-[#F59E0B]/80" aria-hidden="true" />
        <span className="text-sm font-medium text-zinc-300 max-w-xs">{fallbackTitle}</span>
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
