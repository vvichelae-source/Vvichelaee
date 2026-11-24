import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Send,
} from 'lucide-react';
import { APARTMENTS, BUSINESS_INFO } from '../data/apartments';
import { BookingPrefill } from '../types/apartment';
import {
  addDaysIsoDate,
  buildWhatsAppBookingUrl,
  calculateBookingEstimate,
  formatDisplayDate,
  formatNaira,
  getTodayIsoDate,
} from '../utils/booking';
import { BrandMark } from '../components/BrandMark';
import { SafeImage } from '../components/SafeImage';

interface BookingPageProps {
  prefill?: BookingPrefill;
}

interface FormFieldErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  apartmentId?: string;
  arrivalDate?: string;
  departureDate?: string;
  guests?: string;
}

export function BookingPage({ prefill }: BookingPageProps) {
  const today = useMemo(() => getTodayIsoDate(), []);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [apartmentId, setApartmentId] = useState<string>(
    () => prefill?.apartmentId || APARTMENTS[0].id
  );
  const [arrivalDate, setArrivalDate] = useState<string>(
    () => prefill?.arrivalDate || addDaysIsoDate(today, 2)
  );
  const [departureDate, setDepartureDate] = useState<string>(
    () => prefill?.departureDate || addDaysIsoDate(today, 5)
  );
  const [guestsInput, setGuestsInput] = useState<string>(() =>
    prefill?.guests ? String(prefill.guests) : '1'
  );
  const [message, setMessage] = useState('');

  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'idle' | 'success' | 'preview-unverified' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Sync incoming prefill whenever user navigates from a different apartment card/detail
  useEffect(() => {
    if (prefill?.apartmentId) {
      setApartmentId(prefill.apartmentId);
    }
    if (prefill?.arrivalDate) {
      setArrivalDate(prefill.arrivalDate);
    }
    if (prefill?.departureDate) {
      setDepartureDate(prefill.departureDate);
    }
    if (prefill?.guests) {
      setGuestsInput(String(prefill.guests));
    }
  }, [prefill]);

  const selectedApartment = useMemo(
    () => APARTMENTS.find((apt) => apt.id === apartmentId) || APARTMENTS[0],
    [apartmentId]
  );

  const parsedGuests = guestsInput.trim() === '' ? 0 : Number(guestsInput);

  const calculation = useMemo(
    () =>
      calculateBookingEstimate({
        pricePerNight: selectedApartment.pricePerNight,
        arrivalDate,
        departureDate,
        guests: parsedGuests,
        maxGuests: selectedApartment.maxGuests,
      }),
    [
      selectedApartment.pricePerNight,
      selectedApartment.maxGuests,
      arrivalDate,
      departureDate,
      parsedGuests,
    ]
  );

  const validateAllFields = (): boolean => {
    const errors: FormFieldErrors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    const cleanedPhone = phone.replace(/[\s()+-]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (!selectedApartment) {
      errors.apartmentId = 'Please select an apartment.';
    }

    if (calculation.errors.arrivalDate) {
      errors.arrivalDate = calculation.errors.arrivalDate;
    }
    if (calculation.errors.departureDate) {
      errors.departureDate = calculation.errors.departureDate;
    }
    if (calculation.errors.guests) {
      errors.guests = calculation.errors.guests;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const whatsappUrl = useMemo(() => {
    if (!calculation.isValid) return '#';
    return buildWhatsAppBookingUrl({
      apartment: selectedApartment,
      arrivalDate,
      departureDate,
      nights: calculation.nights,
      guests: parsedGuests,
      totalCost: calculation.totalCost,
      customerName: fullName.trim() || undefined,
    });
  }, [
    arrivalDate,
    calculation,
    departureDate,
    fullName,
    parsedGuests,
    selectedApartment,
  ]);

  const mailtoFallbackUrl = useMemo(() => {
    const subject = `Vvichelae Booking Enquiry: ${selectedApartment.name}`;
    const bodyLines = [
      'Hello Vvichelae,',
      '',
      'I would like to submit a booking enquiry:',
      `Full Name: ${fullName || '-'}`,
      `Email: ${email || '-'}`,
      `Phone: ${phone || '-'}`,
      `Apartment: ${selectedApartment.name} (${selectedApartment.location})`,
      `Arrival Date: ${formatDisplayDate(arrivalDate)}`,
      `Departure Date: ${formatDisplayDate(departureDate)}`,
      `Number of Nights: ${calculation.isValid ? calculation.nights : '-'}`,
      `Number of Guests: ${parsedGuests}`,
      `Estimated Total: ${calculation.isValid ? formatNaira(calculation.totalCost) : '-'}`,
      message.trim() ? `Additional Message: ${message.trim()}` : '',
    ].filter(Boolean);

    return `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
  }, [
    arrivalDate,
    calculation,
    departureDate,
    email,
    fullName,
    message,
    parsedGuests,
    phone,
    selectedApartment,
  ]);

  const handleGuestStep = (delta: number) => {
    const current = Number.isNaN(parsedGuests) ? 1 : parsedGuests;
    const next = Math.max(1, current + delta);
    setGuestsInput(String(next));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setSubmissionStatus({ type: 'idle', message: '' });

    if (!validateAllFields() || !calculation.isValid) {
      return;
    }

    setSubmitting(true);
    try {
      const payload = new URLSearchParams({
        'form-name': 'vvichelae-booking',
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        apartment: selectedApartment.name,
        location: selectedApartment.location,
        arrivalDate,
        departureDate,
        guests: String(parsedGuests),
        nights: String(calculation.nights),
        pricePerNight: formatNaira(selectedApartment.pricePerNight),
        estimatedTotal: formatNaira(calculation.totalCost),
        message: message.trim(),
      }).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload,
      });

      const responseText = await response.text();
      const isSpaShellEcho = responseText.includes('<div id="root"></div>');

      if (!response.ok) {
        setSubmissionStatus({
          type: 'error',
          message:
            'Your booking enquiry could not be submitted through the form endpoint. Please send your enquiry immediately via WhatsApp or email below.',
        });
      } else if (isSpaShellEcho) {
        setSubmissionStatus({
          type: 'preview-unverified',
          message:
            'Your booking details passed validation and are formatted for Netlify Forms (vvichelae-booking). Because this preview environment is not hosted on Netlify, live form storage is inactive here. Use the WhatsApp or Email buttons below to send your completed enquiry right away.',
        });
      } else {
        setSubmissionStatus({
          type: 'success',
          message:
            'Thank you. Your booking enquiry has been received by Vvichelae. We will review availability for your chosen dates and contact you with next steps.',
        });
      }
    } catch {
      setSubmissionStatus({
        type: 'error',
        message:
          'We could not reach the booking form service due to a network error. Please send your booking details directly via WhatsApp or email below.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F3EDE2]">
      {/* Page Header */}
      <section className="border-b border-[#34483D]/15 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B9785C] mb-3">
              {BUSINESS_INFO.fullName} · Reservation Request
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#34483D] tracking-tight">
              Booking Enquiry
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#34483D]/80 max-w-2xl leading-relaxed">
              Complete the enquiry form below or message us directly on WhatsApp. No payment is collected online; {BUSINESS_INFO.fullName} confirms apartment availability and final details directly with you.
            </p>
          </div>
          <div className="shrink-0">
            <BrandMark variant="dark" size="header" showDescriptor />
          </div>
        </div>
      </section>

      {/* Main Booking Form + Live Summary */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <form
              name="vvichelae-booking"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-10 border border-[#34483D]/20 bg-[#F3EDE2]"
            >
              <input type="hidden" name="form-name" value="vvichelae-booking" />
              <p className="hidden">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>

              <h2 className="font-display text-3xl font-semibold text-[#34483D] mb-2">
                Guest & Stay Details
              </h2>
              <p className="text-sm text-[#34483D]/75 mb-7">
                Fields marked with * are required so we can confirm availability for your stay.
              </p>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="booking-fullname"
                    className="block text-sm font-medium text-[#34483D] mb-1.5"
                  >
                    Full Name <span className="text-[#B9785C]">*</span>
                  </label>
                  <input
                    id="booking-fullname"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(hasAttemptedSubmit && fieldErrors.fullName)}
                    className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                  />
                  {hasAttemptedSubmit && fieldErrors.fullName && (
                    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#B9785C]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Email Address <span className="text-[#B9785C]">*</span>
                    </label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(hasAttemptedSubmit && fieldErrors.email)}
                      className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                    />
                    {hasAttemptedSubmit && fieldErrors.email && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#B9785C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Phone Number <span className="text-[#B9785C]">*</span>
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0814 000 0000"
                      aria-invalid={Boolean(hasAttemptedSubmit && fieldErrors.phone)}
                      className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                    />
                    {hasAttemptedSubmit && fieldErrors.phone && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#B9785C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected Apartment */}
                <div>
                  <label
                    htmlFor="booking-apartment"
                    className="block text-sm font-medium text-[#34483D] mb-1.5"
                  >
                    Selected Apartment <span className="text-[#B9785C]">*</span>
                  </label>
                  <select
                    id="booking-apartment"
                    name="apartment"
                    value={apartmentId}
                    onChange={(e) => setApartmentId(e.target.value)}
                    className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                  >
                    {APARTMENTS.map((apt) => (
                      <option key={apt.id} value={apt.id}>
                        {apt.name} ({apt.location}) · {formatNaira(apt.pricePerNight)}/night · Max {apt.maxGuests} guests
                      </option>
                    ))}
                  </select>
                </div>

                {/* Arrival & Departure Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-arrival"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Arrival Date <span className="text-[#B9785C]">*</span>
                    </label>
                    <input
                      id="booking-arrival"
                      name="arrivalDate"
                      type="date"
                      min={today}
                      required
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      aria-invalid={Boolean(calculation.errors.arrivalDate)}
                      className={`w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border ${
                        calculation.errors.arrivalDate
                          ? 'border-[#B9785C]'
                          : 'border-[#34483D]/30 focus:border-[#B9785C]'
                      }`}
                    />
                    {calculation.errors.arrivalDate && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#B9785C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{calculation.errors.arrivalDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-departure"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Departure Date <span className="text-[#B9785C]">*</span>
                    </label>
                    <input
                      id="booking-departure"
                      name="departureDate"
                      type="date"
                      min={
                        arrivalDate && arrivalDate >= today
                          ? addDaysIsoDate(arrivalDate, 1)
                          : addDaysIsoDate(today, 1)
                      }
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      aria-invalid={Boolean(calculation.errors.departureDate)}
                      className={`w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border ${
                        calculation.errors.departureDate
                          ? 'border-[#B9785C]'
                          : 'border-[#34483D]/30 focus:border-[#B9785C]'
                      }`}
                    />
                    {calculation.errors.departureDate && (
                      <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#B9785C]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{calculation.errors.departureDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="booking-guests"
                      className="block text-sm font-medium text-[#34483D]"
                    >
                      Number of Guests <span className="text-[#B9785C]">*</span>
                    </label>
                    <span className="text-xs text-[#34483D]/70 tabular-nums">
                      Maximum {selectedApartment.maxGuests} guests for {selectedApartment.name}
                    </span>
                  </div>
                  <div className="flex items-stretch max-w-xs">
                    <button
                      type="button"
                      onClick={() => handleGuestStep(-1)}
                      aria-label="Decrease guests"
                      className="px-4 border border-r-0 border-[#34483D]/30 text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      id="booking-guests"
                      name="guests"
                      type="number"
                      min={1}
                      step={1}
                      required
                      value={guestsInput}
                      onChange={(e) => setGuestsInput(e.target.value)}
                      aria-invalid={Boolean(calculation.errors.guests)}
                      className={`w-full px-3.5 py-3 text-center text-sm font-medium bg-[#F3EDE2] text-[#34483D] border tabular-nums ${
                        calculation.errors.guests
                          ? 'border-[#B9785C]'
                          : 'border-[#34483D]/30 focus:border-[#B9785C]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => handleGuestStep(1)}
                      aria-label="Increase guests"
                      className="px-4 border border-l-0 border-[#34483D]/30 text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {calculation.errors.guests && (
                    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#B9785C]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{calculation.errors.guests}</span>
                    </p>
                  )}
                </div>

                {/* Additional Message */}
                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-sm font-medium text-[#34483D] mb-1.5"
                  >
                    Additional Message
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your estimated arrival time, stay purpose, or any questions."
                    className="w-full px-3.5 py-3 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                  />
                </div>

                {/* Submission Feedback Banner */}
                {submissionStatus.type !== 'idle' && (
                  <div
                    role="status"
                    className={`p-4 border text-sm space-y-3 ${
                      submissionStatus.type === 'success'
                        ? 'border-[#34483D] bg-[#34483D]/10 text-[#34483D]'
                        : 'border-[#B9785C] bg-[#B9785C]/10 text-[#34483D]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {submissionStatus.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-[#34483D] shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#B9785C] shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <p className="leading-relaxed">{submissionStatus.message}</p>
                    </div>

                    {submissionStatus.type !== 'success' && calculation.isValid && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Send This Booking on WhatsApp</span>
                        </a>
                        <a
                          href={mailtoFallbackUrl}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Email Booking Details</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {submitting ? 'Submitting Enquiry...' : 'Submit Booking Enquiry'}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Summary & Direct Alternatives Sidebar */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="border border-[#34483D]/20 bg-[#F3EDE2]">
              <div className="aspect-[16/10] overflow-hidden bg-[#34483D]/10">
                <SafeImage
                  src={selectedApartment.images[0].src}
                  alt={selectedApartment.images[0].alt}
                  fallbackTitle={selectedApartment.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-xs font-medium text-[#B9785C]">
                    {selectedApartment.location} · Up to {selectedApartment.maxGuests} guests
                  </p>
                  <h2 className="font-display text-3xl font-semibold text-[#34483D] mt-1">
                    {selectedApartment.name}
                  </h2>
                </div>

                <div className="p-4 bg-[#34483D]/5 border border-[#34483D]/15 space-y-2.5 text-sm">
                  {calculation.isValid ? (
                    <>
                      <div className="flex items-center justify-between text-[#34483D]/80">
                        <span>Arrival</span>
                        <span className="font-medium text-[#34483D]">
                          {formatDisplayDate(arrivalDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#34483D]/80">
                        <span>Departure</span>
                        <span className="font-medium text-[#34483D]">
                          {formatDisplayDate(departureDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#34483D]/80">
                        <span>Guests</span>
                        <span className="font-medium text-[#34483D] tabular-nums">
                          {parsedGuests}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[#34483D]/80">
                        <span>Rate × Nights</span>
                        <span className="tabular-nums text-[#34483D]">
                          {formatNaira(selectedApartment.pricePerNight)} × {calculation.nights}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-[#34483D]/15 flex items-baseline justify-between">
                        <span className="font-semibold text-[#34483D]">Estimated Total</span>
                        <span className="font-display text-2xl font-bold text-[#34483D] tabular-nums">
                          {formatNaira(calculation.totalCost)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-[#B9785C] font-medium">
                      Please resolve the highlighted date or guest fields to calculate your estimated stay cost.
                    </p>
                  )}
                </div>

                <p className="text-xs text-[#34483D]/75 leading-relaxed">
                  Displayed prices are sample rates and the total shown is an estimate. Vvichelae must confirm availability and final booking details before a reservation is confirmed.
                </p>

                {/* Direct Contact Alternatives */}
                <div className="pt-4 border-t border-[#34483D]/15 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#34483D]/75">
                    Prefer Direct Contact?
                  </p>

                  {calculation.isValid ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-[#B9785C] text-[#F3EDE2] hover:bg-[#34483D] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enquire via WhatsApp ({BUSINESS_INFO.whatsappDisplay})</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-[#34483D]/35 text-[#F3EDE2] cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enquire via WhatsApp ({BUSINESS_INFO.whatsappDisplay})</span>
                    </button>
                  )}

                  <a
                    href={mailtoFallbackUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Email {BUSINESS_INFO.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
