import { ArrowRight } from 'lucide-react';
import { Apartment, PageRoute } from '../types/apartment';
import { formatNaira } from '../utils/booking';
import { SafeImage } from './SafeImage';

interface ApartmentCardProps {
  apartment: Apartment;
  onNavigate: (route: PageRoute) => void;
  compact?: boolean;
  coverImage?: {
    src: string;
    alt: string;
    objectPosition?: string;
  };
}

export function ApartmentCard({
  apartment,
  onNavigate,
  compact = false,
  coverImage,
}: ApartmentCardProps) {
  const mainImage = coverImage ?? apartment.images[0];
  const objectPositionClass = coverImage?.objectPosition ?? 'object-center';

  return (
    <article className="group flex flex-col h-full bg-[#F3EDE2] border border-[#34483D]/15 transition-colors duration-200 hover:border-[#B9785C]">
      {/* Image container with subtle hover zoom */}
      <a
        href={`/apartments/${apartment.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigate({ page: 'apartment-detail', slug: apartment.slug });
        }}
        className="relative aspect-[4/3] overflow-hidden bg-[#34483D]/10 block shrink-0"
      >
        <SafeImage
          src={mainImage.src}
          alt={mainImage.alt}
          fallbackTitle={apartment.name}
          className={`w-full h-full object-cover ${objectPositionClass} transition-transform duration-500 ease-out group-hover:scale-105`}
        />
      </a>

      {/* Card Content */}
      <div className={`flex flex-col flex-1 ${compact ? 'p-5' : 'p-6'}`}>
        {/* Unboxed quiet metadata line */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-medium text-[#34483D]/75 mb-2">
          <span>{apartment.location}</span>
          <span aria-hidden="true">·</span>
          <span>Up to {apartment.maxGuests} guests</span>
        </div>

        <div className="mb-3">
          <h3
            className={`font-display font-semibold text-[#34483D] leading-tight ${
              compact ? 'text-[1.4rem]' : 'text-2xl'
            }`}
          >
            <a
              href={`/apartments/${apartment.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'apartment-detail', slug: apartment.slug });
              }}
              className="hover:text-[#B9785C] transition-colors"
            >
              {apartment.name}
            </a>
          </h3>
        </div>

        <p className="text-sm text-[#34483D]/80 leading-relaxed mb-5 flex-1">
          {apartment.shortDescription}
        </p>

        {/* Price row */}
        <div className="flex items-baseline justify-between pt-4 pb-4 border-t border-[#34483D]/10">
          <div>
            <span className="text-xl font-semibold text-[#34483D] tabular-nums">
              {formatNaira(apartment.pricePerNight)}
            </span>
            <span className="text-xs text-[#34483D]/70 ml-1">per night (sample)</span>
          </div>
        </div>

        {/* Actions */}
        <div
          className={
            compact
              ? 'flex flex-col gap-2.5'
              : 'grid grid-cols-1 sm:grid-cols-2 gap-3'
          }
        >
          <button
            type="button"
            onClick={() =>
              onNavigate({ page: 'apartment-detail', slug: apartment.slug })
            }
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium border border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <span>View Details</span>
          </button>
          <button
            type="button"
            onClick={() =>
              onNavigate({
                page: 'booking',
                prefill: { apartmentId: apartment.id },
              })
            }
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            <span>Book This Apartment</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
