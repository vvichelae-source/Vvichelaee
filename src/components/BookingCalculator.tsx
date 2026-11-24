import { useMemo, useState } from 'react';
import { AlertCircle, Calendar, MessageCircle, Minus, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Apartment, PageRoute } from '../types/apartment';
import {
  addDaysIsoDate,
  buildWhatsAppBookingUrl,
  calculateBookingEstimate,
  formatDisplayDate,
  formatNaira,
  getTodayIsoDate,
} from '../utils/booking';

interface BookingCalculatorProps {
  apartment: Apartment;
  onNavigate: (route: PageRoute) => void;
}

export function BookingCalculator({ apartment, onNavigate }: BookingCalculatorProps) {
  const today = useMemo(() => getTodayIsoDate(), []);
  const [arrivalDate, setArrivalDate] = useState<string>(() => addDaysIsoDate(today, 2));
  const [departureDate, setDepartureDate] = useState<string>(() => addDaysIsoDate(today, 5));
  const [guestsInput, setGuestsInput] = useState<string>('1');

  const parsedGuests = guestsInput.trim() === '' ? 0 : Number(guestsInput);

  const calculation = useMemo(
    () =>
      calculateBookingEstimate({
        pricePerNight: apartment.pricePerNight,
        arrivalDate,
        departureDate,
        guests: parsedGuests,
        maxGuests: apartment.maxGuests,
      }),
    [apartment.pricePerNight, apartment.maxGuests, arrivalDate, departureDate, parsedGuests]
  );

  const whatsappUrl = useMemo(() => {
    if (!calculation.isValid) return '#';
    return buildWhatsAppBookingUrl({
      apartment,
      arrivalDate,
      departureDate,
      nights: calculation.nights,
      guests: parsedGuests,
      totalCost: calculation.totalCost,
    });
  }, [apartment, arrivalDate, calculation, departureDate, parsedGuests]);

  const handleGuestStep = (delta: number) => {
    const current = Number.isNaN(parsedGuests) ? 1 : parsedGuests;
    const next = Math.max(1, current + delta);
    setGuestsInput(String(next));
  };

  const handleProceedToBooking = () => {
    if (!calculation.isValid) return;
    onNavigate({
      page: 'booking',
      prefill: {
        apartmentId: apartment.id,
        arrivalDate,
        departureDate,
        guests: parsedGuests,
      },
    });
  };

  return (
    <aside
      aria-label="Booking Cost Calculator"
      className="bg-[#F3EDE2] border border-[#34483D]/20 p-6 sm:p-8"
    >
      <div className="pb-5 border-b border-[#34483D]/15">
        <p className="text-xs font-medium text-[#B9785C] mb-1">
          Estimated Stay Cost
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl sm:text-4xl font-semibold text-[#34483D] tabular-nums">
            {formatNaira(apartment.pricePerNight)}
          </span>
          <span className="text-sm text-[#34483D]/75">per night (sample rate)</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="py-6 space-y-5">
        {/* Arrival Date */}
        <div>
          <label
            htmlFor="calc-arrival"
            className="block text-sm font-medium text-[#34483D] mb-1.5"
          >
            Arrival Date
          </label>
          <div className="relative">
            <input
              id="calc-arrival"
              type="date"
              min={today}
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              aria-invalid={Boolean(calculation.errors.arrivalDate)}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border transition-colors ${
                calculation.errors.arrivalDate
                  ? 'border-[#B9785C]'
                  : 'border-[#34483D]/30 focus:border-[#34483D]'
              }`}
            />
          </div>
          {calculation.errors.arrivalDate && (
            <p
              role="alert"
              className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[#B9785C]"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{calculation.errors.arrivalDate}</span>
            </p>
          )}
        </div>

        {/* Departure Date */}
        <div>
          <label
            htmlFor="calc-departure"
            className="block text-sm font-medium text-[#34483D] mb-1.5"
          >
            Departure Date
          </label>
          <div className="relative">
            <input
              id="calc-departure"
              type="date"
              min={arrivalDate && arrivalDate >= today ? addDaysIsoDate(arrivalDate, 1) : addDaysIsoDate(today, 1)}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              aria-invalid={Boolean(calculation.errors.departureDate)}
              className={`w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border transition-colors ${
                calculation.errors.departureDate
                  ? 'border-[#B9785C]'
                  : 'border-[#34483D]/30 focus:border-[#34483D]'
              }`}
            />
          </div>
          {calculation.errors.departureDate && (
            <p
              role="alert"
              className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[#B9785C]"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{calculation.errors.departureDate}</span>
            </p>
          )}
        </div>

        {/* Number of Guests */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="calc-guests"
              className="block text-sm font-medium text-[#34483D]"
            >
              Number of Guests
            </label>
            <span className="text-xs text-[#34483D]/70 tabular-nums">
              Maximum {apartment.maxGuests} guests
            </span>
          </div>
          <div className="flex items-stretch">
            <button
              type="button"
              onClick={() => handleGuestStep(-1)}
              aria-label="Decrease guests"
              className="px-3.5 border border-r-0 border-[#34483D]/30 text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              id="calc-guests"
              type="number"
              min={1}
              step={1}
              value={guestsInput}
              onChange={(e) => setGuestsInput(e.target.value)}
              aria-invalid={Boolean(calculation.errors.guests)}
              className={`w-full px-3.5 py-2.5 text-center text-sm font-medium bg-[#F3EDE2] text-[#34483D] border tabular-nums ${
                calculation.errors.guests
                  ? 'border-[#B9785C]'
                  : 'border-[#34483D]/30 focus:border-[#34483D]'
              }`}
            />
            <button
              type="button"
              onClick={() => handleGuestStep(1)}
              aria-label="Increase guests"
              className="px-3.5 border border-l-0 border-[#34483D]/30 text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {calculation.errors.guests && (
            <p
              role="alert"
              className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[#B9785C]"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{calculation.errors.guests}</span>
            </p>
          )}
        </div>
      </div>

      {/* Live Booking Summary */}
      <motion.div
        key={`${calculation.isValid}-${calculation.nights}-${calculation.totalCost}`}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        className="p-4 bg-[#34483D]/5 border border-[#34483D]/15 mb-6"
      >
        {calculation.isValid ? (
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center justify-between text-[#34483D]/80">
              <span>Dates</span>
              <span className="font-medium text-[#34483D] text-right">
                {formatDisplayDate(arrivalDate)} to {formatDisplayDate(departureDate)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#34483D]/80">
              <span>Stay duration</span>
              <span className="font-medium text-[#34483D] tabular-nums">
                {calculation.nights} {calculation.nights === 1 ? 'night' : 'nights'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#34483D]/80">
              <span>Calculation</span>
              <span className="tabular-nums text-[#34483D]">
                {formatNaira(apartment.pricePerNight)} × {calculation.nights}
              </span>
            </div>
            <div className="pt-3 border-t border-[#34483D]/15 flex items-baseline justify-between">
              <span className="font-semibold text-[#34483D]">Estimated Total</span>
              <span className="font-display text-2xl font-bold text-[#34483D] tabular-nums">
                {formatNaira(calculation.totalCost)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 text-xs text-[#34483D]/80">
            <Calendar className="w-4 h-4 text-[#B9785C] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Enter valid arrival and departure dates and a guest count within capacity to view your estimated accommodation cost.
            </span>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {calculation.isValid ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Enquire on WhatsApp</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-[#34483D]/35 text-[#F3EDE2] cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Enquire on WhatsApp</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleProceedToBooking}
          disabled={!calculation.isValid}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border transition-colors duration-200 ${
            calculation.isValid
              ? 'border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] cursor-pointer'
              : 'border-[#34483D]/20 text-[#34483D]/40 cursor-not-allowed'
          }`}
        >
          <span>Send Booking Enquiry Form</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-xs text-[#34483D]/70 leading-relaxed">
        No online payment is collected. Displayed total is an estimate only; Vvichelae will confirm availability and final booking details before any reservation is confirmed.
      </p>
    </aside>
  );
}
