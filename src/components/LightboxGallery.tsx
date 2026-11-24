import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ApartmentImage } from '../types/apartment';
import { SafeImage } from './SafeImage';

interface LightboxGalleryProps {
  images: ApartmentImage[];
  apartmentName: string;
}

export function LightboxGallery({ images, apartmentName }: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const mainImage = images[0];
  const secondaryImages = images.slice(1);

  return (
    <div>
      {/* Editorial Grid: Large Main Image + Secondary Angles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Hero Photo */}
        <div className="lg:col-span-8">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            aria-label={`Open full view of ${mainImage.caption}`}
            className="group relative w-full aspect-[4/3] overflow-hidden bg-[#34483D]/10 block text-left cursor-pointer"
          >
            <SafeImage
              src={mainImage.src}
              alt={mainImage.alt}
              loading="eager"
              fallbackTitle={apartmentName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-[#34483D]/90 text-[#F3EDE2] backdrop-blur-xs">
              <Expand className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View Gallery ({images.length} Photos)</span>
            </span>
          </button>
        </div>

        {/* Secondary Room Photos */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
          {secondaryImages.map((img, idx) => {
            const actualIndex = idx + 1;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => openLightbox(actualIndex)}
                aria-label={`Open full view of ${img.caption}`}
                className="group relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-[#34483D]/10 block text-left cursor-pointer"
              >
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  fallbackTitle={apartmentName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#34483D]/85 via-[#34483D]/40 to-transparent">
                  <span className="text-xs font-medium text-[#F3EDE2] block truncate">
                    {img.caption}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thumbnail strip for quick inspection */}
      <div className="mt-3 flex items-center justify-between text-xs text-[#34483D]/75">
        <span>Click any photograph to open fullscreen gallery view.</span>
        <span className="tabular-nums">{images.length} photographs of {apartmentName}</span>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${apartmentName} photo gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#34483D]/95 flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Lightbox Header */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl flex items-center justify-between text-[#F3EDE2]"
            >
              <div>
                <p className="font-display text-xl sm:text-2xl font-semibold">
                  {apartmentName}
                </p>
                <p className="text-xs text-[#F3EDE2]/75 tabular-nums">
                  Photo {activeIndex + 1} of {images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close gallery"
                className="inline-flex items-center justify-center w-11 h-11 border border-[#F3EDE2]/30 text-[#F3EDE2] hover:border-[#B9785C] hover:text-[#B9785C] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Stage */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4"
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous photograph"
                className="absolute left-0 sm:left-2 z-10 inline-flex items-center justify-center w-11 h-11 bg-[#34483D]/80 border border-[#F3EDE2]/30 text-[#F3EDE2] hover:bg-[#B9785C] hover:border-[#B9785C] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <motion.div
                key={images[activeIndex].src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="max-h-[68vh] w-full flex flex-col items-center"
              >
                <img
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  referrerPolicy="no-referrer"
                  className="max-h-[62vh] w-auto max-w-full object-contain border border-[#F3EDE2]/15"
                />
                <p className="mt-3 text-sm text-[#F3EDE2]/90 text-center">
                  {images[activeIndex].caption}
                </p>
              </motion.div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next photograph"
                className="absolute right-0 sm:right-2 z-10 inline-flex items-center justify-center w-11 h-11 bg-[#34483D]/80 border border-[#F3EDE2]/30 text-[#F3EDE2] hover:bg-[#B9785C] hover:border-[#B9785C] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3 overflow-x-auto max-w-full pb-1"
            >
              {images.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View photo ${idx + 1}: ${img.caption}`}
                  className={`w-16 h-12 overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    idx === activeIndex
                      ? 'border-[#B9785C] opacity-100'
                      : 'border-transparent opacity-55 hover:opacity-90'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
