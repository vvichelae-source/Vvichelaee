import { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { BUSINESS_INFO, FAQS } from '../data/apartments';
import { PageRoute } from '../types/apartment';
import { FaqAccordion } from '../components/FaqAccordion';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

interface ContactFormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Stay Question');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    status: 'idle' | 'success' | 'preview-unverified' | 'error';
    text: string;
  }>({ status: 'idle', text: '' });

  const validate = (): boolean => {
    const nextErrors: ContactFormErrors = {};
    if (!fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState({ status: 'idle', text: '' });

    if (!validate()) return;

    setSubmitting(true);
    try {
      const encoded = new URLSearchParams({
        'form-name': 'vvichelae-contact',
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject.trim(),
        message: message.trim(),
      }).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      });

      const bodyText = await response.text();
      const isSpaShellEcho = bodyText.includes('<div id="root"></div>');

      if (!response.ok) {
        setSubmitState({
          status: 'error',
          text: 'Your message could not be delivered through the web form server right now. Please contact Vvichelae directly on WhatsApp or by email below.',
        });
      } else if (isSpaShellEcho) {
        setSubmitState({
          status: 'preview-unverified',
          text: 'Your enquiry passed validation, however Netlify form capture is only active when this site is deployed on Netlify. Please send your message directly via WhatsApp or email below.',
        });
      } else {
        setSubmitState({
          status: 'success',
          text: 'Thank you for contacting Vvichelae. Your message has been submitted and our team will respond shortly.',
        });
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch {
      setSubmitState({
        status: 'error',
        text: 'A network error occurred while sending your message. Please reach out via WhatsApp or email instead.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoDirect = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
    subject || 'Vvichelae Enquiry'
  )}&body=${encodeURIComponent(
    `Hello Vvichelae,\n\nName: ${fullName || '-'}\nPhone: ${phone || '-'}\n\n${message || ''}`
  )}`;

  const whatsappDirect = `${BUSINESS_INFO.whatsappLink}?text=${encodeURIComponent(
    `Hello Vvichelae, I have a question regarding ${subject}. ${message ? `\n\n${message}` : ''}`
  )}`;

  return (
    <div className="bg-[#F3EDE2]">
      {/* Page Header */}
      <section className="border-b border-[#34483D]/15 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-3">
            Reach Vvichelae
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#34483D] tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#34483D]/80 max-w-2xl leading-relaxed">
            Have a question about an apartment, stay dates, or availability in Lagos? Connect with us directly on WhatsApp, send an email, or leave a note below.
          </p>
        </div>
      </section>

      {/* Direct Contact Cards + Enquiry Form */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 border border-[#34483D]/20 bg-[#34483D] text-[#F3EDE2]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B9785C] mb-2">
                Fastest Response
              </p>
              <h2 className="font-display text-3xl font-semibold mb-3">
                Chat on WhatsApp
              </h2>
              <p className="text-sm text-[#F3EDE2]/80 leading-relaxed mb-6">
                Message Vvichelae directly on WhatsApp for quick availability checks and stay enquiries.
              </p>
              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-[#B9785C] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#34483D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Chat With Us on WhatsApp</span>
              </a>
            </div>

            <div className="p-7 border border-[#34483D]/15 bg-[#F3EDE2] space-y-5">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#34483D] mb-2">
                  Email & Location
                </h3>
                <p className="text-sm text-[#34483D]/80">
                  Prefer email or planning a multi night stay enquiry? Write to us anytime.
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#34483D]/10 text-sm">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3 text-[#34483D] hover:text-[#B9785C] font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
                <div className="flex items-center gap-3 text-[#34483D]/85">
                  <MapPin className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.location}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold border border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>Email Us</span>
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'booking' })}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer"
                >
                  <span>Booking Form</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <form
              name="vvichelae-contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
              className="p-6 sm:p-10 border border-[#34483D]/20 bg-[#F3EDE2]"
            >
              <input type="hidden" name="form-name" value="vvichelae-contact" />
              <p className="hidden">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>

              <h2 className="font-display text-3xl font-semibold text-[#34483D] mb-2">
                Send a Message
              </h2>
              <p className="text-sm text-[#34483D]/75 mb-7">
                For specific check in dates and apartment cost calculations, you can also use our dedicated Booking Enquiry page.
              </p>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Full Name <span className="text-[#B9785C]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                    />
                    {errors.fullName && (
                      <p role="alert" className="mt-1.5 text-xs text-[#B9785C] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Email Address <span className="text-[#B9785C]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs text-[#B9785C] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0800 000 0000"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-[#34483D] mb-1.5"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                    >
                      <option value="General Stay Question">General Stay Question</option>
                      <option value="Apartment Availability">Apartment Availability</option>
                      <option value="Corporate or Extended Stay">Corporate or Extended Stay</option>
                      <option value="Other Enquiry">Other Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[#34483D] mb-1.5"
                  >
                    Message <span className="text-[#B9785C]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help with your Lagos stay?"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F3EDE2] text-[#34483D] border border-[#34483D]/30 focus:border-[#B9785C]"
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs text-[#B9785C] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {submitState.status !== 'idle' && (
                  <div
                    role="status"
                    className={`p-4 border text-sm space-y-3 ${
                      submitState.status === 'success'
                        ? 'border-[#34483D] bg-[#34483D]/10 text-[#34483D]'
                        : 'border-[#B9785C] bg-[#B9785C]/10 text-[#34483D]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {submitState.status === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-[#34483D] shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#B9785C] shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <p className="leading-relaxed">{submitState.text}</p>
                    </div>
                    {submitState.status !== 'success' && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href={whatsappDirect}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Send via WhatsApp</span>
                        </a>
                        <a
                          href={mailtoDirect}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Send via Email</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 border-t border-[#34483D]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
              Helpful Answers
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#34483D]">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>
    </div>
  );
}
