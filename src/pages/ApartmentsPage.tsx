import { useMemo, useState } from 'react';
import { RotateCcw, SearchX } from 'lucide-react';
import { APARTMENTS, VIDEO_SHOWCASES } from '../data/apartments';
import { PageRoute } from '../types/apartment';
import { formatNaira } from '../utils/booking';
import { ApartmentCard } from '../components/ApartmentCard';
import { VideoShowcase } from '../components/VideoShowcase';

interface ApartmentsPageProps {
  onNavigate: (route: PageRoute) => void;
}

const PRICE_OPTIONS = [
  { label: 'Any nightly budget', value: 'all' },
  { label: 'Up to ₦50,000', value: '50000' },
  { label: 'Up to ₦75,000', value: '75000' },
  { label: 'Up to ₦100,000', value: '100000' },
  { label: 'Up to ₦150,000', value: '150000' },
  { label: 'Up to ₦200,000', value: '200000' },
  { label: 'Up to ₦250,000', value: '250000' },
];

const GUEST_OPTIONS = [
  { label: 'Any guest count', value: 'all' },
  { label: '1+ guests', value: '1' },
  { label: '2+ guests', value: '2' },
  { label: '4+ guests', value: '4' },
  { label: '6 guests', value: '6' },
];

export function ApartmentsPage({ onNavigate }: ApartmentsPageProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<string>('all');
  const [minGuests, setMinGuests] = useState<string>('all');

  const locations = useMemo(
    () => Array.from(new Set(APARTMENTS.map((apt) => apt.location))),
    []
  );

  const filteredApartments = useMemo(() => {
    return APARTMENTS.filter((apt) => {
      if (selectedLocation !== 'all' && apt.location !== selectedLocation) {
        return false;
      }
      if (maxPrice !== 'all' && apt.pricePerNight > Number(maxPrice)) {
        return false;
      }
      if (minGuests !== 'all' && apt.maxGuests < Number(minGuests)) {
        return false;
      }
      return true;
    });
  }, [selectedLocation, maxPrice, minGuests]);

  const hasActiveFilters =
    selectedLocation !== 'all' || maxPrice !== 'all' || minGuests !== 'all';

  const resetFilters = () => {
    setSelectedLocation('all');
    setMaxPrice('all');
    setMinGuests('all');
  };

  return (
    <div className="bg-[#F3EDE2]">
      {/* Page Header */}
      <section className="border-b border-[#34483D]/15 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-3">
            Lagos Short Let Collection
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#34483D] tracking-tight text-balance max-w-3xl">
            Apartments Across Lagos
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#34483D]/80 max-w-2xl leading-relaxed">
            Browse all six demonstration apartment listings across Yaba, Ikeja, Lekki, Surulere, Victoria Island, and Ikoyi. Listed prices are sample nightly rates subject to availability confirmation.
          </p>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section
        aria-label="Filter apartments"
        className="border-b border-[#34483D]/15 bg-[#F3EDE2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* Location Filter */}
            <div className="lg:col-span-4">
              <label
                htmlFor="filter-location"
                className="block text-xs font-semibold uppercase tracking-wider text-[#34483D]/75 mb-2"
              >
                Location
              </label>
              <select
                id="filter-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
              >
                <option value="all">All Lagos Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Filter */}
            <div className="lg:col-span-3">
              <label
                htmlFor="filter-max-price"
                className="block text-xs font-semibold uppercase tracking-wider text-[#34483D]/75 mb-2"
              >
                Maximum Price Per Night
              </label>
              <select
                id="filter-max-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Guest Count Filter */}
            <div className="lg:col-span-3">
              <label
                htmlFor="filter-guests"
                className="block text-xs font-semibold uppercase tracking-wider text-[#34483D]/75 mb-2"
              >
                Number of Guests
              </label>
              <select
                id="filter-guests"
                value={minGuests}
                onChange={(e) => setMinGuests(e.target.value)}
                className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
              >
                {GUEST_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="lg:col-span-2">
              <button
                type="button"
                onClick={resetFilters}
                disabled={!hasActiveFilters}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border transition-colors whitespace-nowrap ${
                  hasActiveFilters
                    ? 'border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] cursor-pointer'
                    : 'border-[#34483D]/20 text-[#34483D]/40 cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>

          {/* Result Count Summary */}
          <div className="mt-5 pt-4 border-t border-[#34483D]/10 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#34483D]/80">
            <p className="font-medium tabular-nums">
              Showing {filteredApartments.length} of {APARTMENTS.length} apartments
            </p>
            {hasActiveFilters && (
              <p className="text-[#B9785C]">
                Active filters: {[
                  selectedLocation !== 'all' ? selectedLocation : null,
                  maxPrice !== 'all' ? `Max ${formatNaira(Number(maxPrice))}` : null,
                  minGuests !== 'all' ? `${minGuests}+ guests` : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Listings Grid or Empty State */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredApartments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApartments.map((apartment) => (
                <ApartmentCard
                  key={apartment.id}
                  apartment={apartment}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-16 px-6 border border-[#34483D]/20 bg-[#F3EDE2]">
              <SearchX
                className="w-10 h-10 text-[#B9785C] mx-auto mb-4"
                aria-hidden="true"
              />
              <h2 className="font-display text-3xl font-semibold text-[#34483D] mb-3">
                No Matching Apartments Found
              </h2>
              <p className="text-sm sm:text-base text-[#34483D]/80 leading-relaxed mb-6">
                We couldn&apos;t find an apartment matching your selection. Try changing your filters to explore more stays.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video 2: Apartments Page Featured Experience */}
      <VideoShowcase
        heading={VIDEO_SHOWCASES.apartmentsExperience.heading}
        subheading={VIDEO_SHOWCASES.apartmentsExperience.subheading}
        videoSrc={VIDEO_SHOWCASES.apartmentsExperience.videoSrc}
        posterSrc={VIDEO_SHOWCASES.apartmentsExperience.posterSrc}
        posterAlt={VIDEO_SHOWCASES.apartmentsExperience.posterAlt}
        previewFrames={VIDEO_SHOWCASES.apartmentsExperience.previewFrames}
        surface="olive"
      />
    </div>
  );
}
