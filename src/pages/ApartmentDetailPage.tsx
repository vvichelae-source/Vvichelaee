import { ArrowLeft, Check } from 'lucide-react';
import { APARTMENTS } from '../data/apartments';
import { PageRoute } from '../types/apartment';
import { formatNaira } from '../utils/booking';
import { BookingCalculator } from '../components/BookingCalculator';
import { LightboxGallery } from '../components/LightboxGallery';
import { ApartmentCard } from '../components/ApartmentCard';

interface ApartmentDetailPageProps {
  slug: string;
  onNavigate: (route: PageRoute) => void;
}

export function ApartmentDetailPage({ slug, onNavigate }: ApartmentDetailPageProps) {
  const apartment = APARTMENTS.find((apt) => apt.slug === slug);

  if (!apartment) {
    return (
      <section className="py-24 bg-[#F3EDE2]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-semibold text-[#34483D] mb-4">
            Apartment Not Found
          </h1>
          <p className="text-base text-[#34483D]/80 mb-8">
            The residence you requested could not be found. Browse our collection of Vvichelae residences in Lagos below.
          </p>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'apartments' })}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Apartments</span>
          </button>
        </div>
      </section>
    );
  }

  const otherApartments = APARTMENTS.filter((apt) => apt.id !== apartment.id).slice(0, 3);

  return (
    <div className="bg-[#F3EDE2]">
      {/* Breadcrumb Back Navigation */}
      <div className="border-b border-[#34483D]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <a
            href="/apartments"
            onClick={(e) => {
              e.preventDefault();
              onNavigate({ page: 'apartments' });
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#34483D] hover:text-[#B9785C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Apartments</span>
          </a>
          <span className="text-xs text-[#34483D]/70 hidden sm:inline">
            Demonstration listing · Availability confirmed upon enquiry
          </span>
        </div>
      </div>

      {/* Apartment Header & Gallery */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#B9785C] mb-2">
              <span>{apartment.location}</span>
              <span aria-hidden="true">·</span>
              <span>Maximum {apartment.maxGuests} guests</span>
              <span aria-hidden="true">·</span>
              <span>
                {apartment.bedrooms} {apartment.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {apartment.bathrooms} {apartment.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#34483D] tracking-tight">
                {apartment.name}
              </h1>
              <div className="md:text-right">
                <span className="font-display text-3xl font-semibold text-[#34483D] tabular-nums">
                  {formatNaira(apartment.pricePerNight)}
                </span>
                <span className="text-sm text-[#34483D]/75 ml-1.5">per night (sample)</span>
              </div>
            </div>
          </div>

          <LightboxGallery images={apartment.images} apartmentName={apartment.name} />
        </div>
      </section>

      {/* Details & Booking Calculator Split */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Description & Amenities */}
            <div className="lg:col-span-7 space-y-10">
              <div className="pt-6 border-t border-[#34483D]/15">
                <h2 className="font-display text-3xl font-semibold text-[#34483D] mb-4">
                  About This Apartment
                </h2>
                <p className="text-base text-[#34483D]/85 leading-relaxed">
                  {apartment.fullDescription}
                </p>
              </div>

              <div className="pt-8 border-t border-[#34483D]/15">
                <h2 className="font-display text-3xl font-semibold text-[#34483D] mb-5">
                  Included Amenities
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {apartment.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-3 p-3.5 border border-[#34483D]/15 text-sm font-medium text-[#34483D]"
                    >
                      <Check
                        className="w-4 h-4 text-[#B9785C] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-[#34483D]/15">
                <h2 className="font-display text-3xl font-semibold text-[#34483D] mb-3">
                  Stay Notes
                </h2>
                <p className="text-sm text-[#34483D]/80 leading-relaxed">
                  All listed rates and amenities on this page are sample demonstration information. Check in and check out times, exact address instructions, and final rates are shared directly by Vvichelae once your requested dates are confirmed.
                </p>
              </div>
            </div>

            {/* Right Column: Booking Cost Calculator */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <BookingCalculator apartment={apartment} onNavigate={onNavigate} />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Apartments */}
      <section className="py-16 border-t border-[#34483D]/15 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
                Continue Exploring
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#34483D]">
                Other Stays in Lagos
              </h2>
            </div>
            <a
              href="/apartments"
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ page: 'apartments' });
              }}
              className="text-sm font-semibold text-[#34483D] underline underline-offset-4 hover:text-[#B9785C] transition-colors"
            >
              View All Apartments
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherApartments.map((other) => (
              <ApartmentCard
                key={other.id}
                apartment={other}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
