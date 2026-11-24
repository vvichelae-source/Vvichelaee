export type PageRoute =
  | { page: 'home' }
  | { page: 'apartments' }
  | { page: 'apartment-detail'; slug: string }
  | { page: 'about' }
  | { page: 'contact' }
  | { page: 'booking'; prefill?: BookingPrefill };

export interface ApartmentImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Apartment {
  id: string;
  slug: string;
  name: string;
  location: string;
  neighbourhood: string;
  pricePerNight: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  shortDescription: string;
  fullDescription: string;
  amenities: string[];
  featured: boolean;
  images: ApartmentImage[];
}

export interface BookingPrefill {
  apartmentId?: string;
  arrivalDate?: string;
  departureDate?: string;
  guests?: number;
}

export interface BookingValidationErrors {
  arrivalDate?: string;
  departureDate?: string;
  guests?: string;
}

export interface BookingCalculationResult {
  isValid: boolean;
  nights: number;
  pricePerNight: number;
  totalCost: number;
  errors: BookingValidationErrors;
}

export interface Testimonial {
  id: string;
  label: string;
  guestProfile: string;
  apartmentType: string;
  quote: string;
  note: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
