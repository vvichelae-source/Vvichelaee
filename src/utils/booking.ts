import { BUSINESS_INFO } from '../data/apartments';
import {
  Apartment,
  BookingCalculationResult,
  BookingValidationErrors,
} from '../types/apartment';

export function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDaysIsoDate(isoDate: string, days: number): string {
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return getTodayIsoDate();
  }
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return isoDate;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function calculateNights(arrivalDate: string, departureDate: string): number {
  if (!arrivalDate || !departureDate) return 0;
  const startParts = arrivalDate.split('-').map(Number);
  const endParts = departureDate.split('-').map(Number);
  if (
    startParts.length !== 3 ||
    endParts.length !== 3 ||
    startParts.some(Number.isNaN) ||
    endParts.some(Number.isNaN)
  ) {
    return 0;
  }
  const startUtc = Date.UTC(startParts[0], startParts[1] - 1, startParts[2]);
  const endUtc = Date.UTC(endParts[0], endParts[1] - 1, endParts[2]);
  const diffDays = Math.round((endUtc - startUtc) / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function validateBookingInputs(params: {
  arrivalDate: string;
  departureDate: string;
  guests: number;
  maxGuests: number;
}): BookingValidationErrors {
  const { arrivalDate, departureDate, guests, maxGuests } = params;
  const errors: BookingValidationErrors = {};
  const today = getTodayIsoDate();

  if (!arrivalDate || arrivalDate < today) {
    errors.arrivalDate = 'Please select an arrival date that is today or later.';
  }

  if (!departureDate) {
    errors.departureDate = 'Departure date must be after arrival date.';
  } else if (arrivalDate && departureDate <= arrivalDate) {
    errors.departureDate = 'Departure date must be after arrival date.';
  }

  if (!Number.isFinite(guests) || !Number.isInteger(guests) || guests < 1) {
    errors.guests = 'Please enter a valid number of guests.';
  } else if (guests > maxGuests) {
    errors.guests = `This apartment accommodates a maximum of ${maxGuests} guests.`;
  }

  return errors;
}

export function calculateBookingEstimate(params: {
  pricePerNight: number;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  maxGuests: number;
}): BookingCalculationResult {
  const errors = validateBookingInputs({
    arrivalDate: params.arrivalDate,
    departureDate: params.departureDate,
    guests: params.guests,
    maxGuests: params.maxGuests,
  });

  const hasErrors = Object.keys(errors).length > 0;
  if (hasErrors) {
    return {
      isValid: false,
      nights: 0,
      pricePerNight: params.pricePerNight,
      totalCost: 0,
      errors,
    };
  }

  const nights = calculateNights(params.arrivalDate, params.departureDate);
  if (nights <= 0) {
    return {
      isValid: false,
      nights: 0,
      pricePerNight: params.pricePerNight,
      totalCost: 0,
      errors: {
        departureDate: 'Departure date must be after arrival date.',
      },
    };
  }

  return {
    isValid: true,
    nights,
    pricePerNight: params.pricePerNight,
    totalCost: nights * params.pricePerNight,
    errors: {},
  };
}

export function buildWhatsAppBookingMessage(params: {
  apartment: Apartment;
  arrivalDate: string;
  departureDate: string;
  nights: number;
  guests: number;
  totalCost: number;
  customerName?: string;
}): string {
  const { apartment, arrivalDate, departureDate, nights, guests, totalCost, customerName } =
    params;

  const lines = [
    'Hello Vvichelae, I would like to make a booking enquiry.',
    '',
    ...(customerName ? [`Guest Name: ${customerName}`] : []),
    `Apartment: ${apartment.name}`,
    `Location: ${apartment.location}`,
    `Arrival Date: ${formatDisplayDate(arrivalDate)}`,
    `Departure Date: ${formatDisplayDate(departureDate)}`,
    `Number of Nights: ${nights}`,
    `Number of Guests: ${guests}`,
    `Price Per Night: ${formatNaira(apartment.pricePerNight)}`,
    `Estimated Total: ${formatNaira(totalCost)}`,
    '',
    'Please confirm availability and let me know the next steps. Thank you.',
  ];

  return lines.join('\n');
}

export function buildWhatsAppBookingUrl(params: {
  apartment: Apartment;
  arrivalDate: string;
  departureDate: string;
  nights: number;
  guests: number;
  totalCost: number;
  customerName?: string;
}): string {
  const text = encodeURIComponent(buildWhatsAppBookingMessage(params));
  return `${BUSINESS_INFO.whatsappLink}?text=${text}`;
}
