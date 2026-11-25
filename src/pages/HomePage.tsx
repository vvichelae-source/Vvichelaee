import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import {
  APARTMENTS,
  BUSINESS_INFO,
  FAQS,
  HERO_IMAGE,
  SAMPLE_TESTIMONIALS,
  VIDEO_SHOWCASES,
} from '../data/apartments';
import { PageRoute } from '../types/apartment';
import { ApartmentCard } from '../components/ApartmentCard';
import { FaqAccordion } from '../components/FaqAccordion';
import { SafeImage } from '../components/SafeImage';
import { VideoShowcase } from '../components/VideoShowcase';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

const HOMEPAGE_FEATURED_COVERS: Record<
  string,
  { src: string; alt: string; objectPosition?: string }
> = {
  'studio-yaba': {
    src: '/assets/aistudio/Velora_Luxury_3-Bedroom_Terrace_Duplex_9a66a3fa.jpg',
    alt: 'Studio Apartment in Yaba, Lagos featured living interior with chandelier and sofa seating',
  },
  'one-bedroom-ikeja': {
    src: '/assets/aistudio/Custom_Beds_028773a2.jpg',
    alt: 'One Bedroom Apartment in Ikeja, Lagos featured bedroom with upholstered headboard and modern wardrobe',
  },
  'two-bedroom-lekki': {
    src: '/assets/aistudio/GORGEOUS_2_BEDROOM_SHORTLET_APARTMENT_IN_LEKKI_LAGOS_378f223f.jpg',
    alt: 'Two Bedroom Apartment in Lekki, Lagos featured living room with velvet seating and smart TV',
  },
  'three-bedroom-surulere': {
    src: '/assets/aistudio/33_Stylish_Living_Room_Ideas_That_Make_a_Space_Feel_More_Polished_3702c4e0.jpg',
    alt: 'Three Bedroom Apartment in Surulere, Lagos featured spacious lounge with white sofa and coffee table',
  },
  'luxury-serviced-vi': {
    src: '/assets/aistudio/Oniru_VI_BR_3BA_-_Spacious__Fast_Wifi__Pool__Free_Parking_6da3f726.jpg',
    alt: 'Luxury Serviced Apartment in Victoria Island, Lagos living room with recessed ceiling lighting, sectional sofa, and marble nesting tables',
    objectPosition: 'object-center',
  },
  'premium-shortlet-ikoyi': {
    src: '/assets/aistudio/download__2__b46ab0ab.jpg',
    alt: 'Premium Short Let Apartment in Ikoyi, Lagos double height living area with cream sofas, open kitchen, mezzanine gallery, and illuminated staircase',
    objectPosition: 'object-[center_65%]',
  },
};

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredApartments = APARTMENTS.slice(0, 4);

  const reasons = [
    {
      index: '01',
      title: 'Thoughtful Comfort',
      description:
        'Each apartment is arranged for restful sleep and relaxed living, with air conditioning, smart TVs, and inviting furniture throughout.',
    },
    {
      index: '02',
      title: 'Convenient Lagos Locations',
      description:
        'Choose stays across Yaba, Ikeja, Lekki, Surulere, Victoria Island, and Ikoyi so you are close to work, family, or city life.',
    },
    {
      index: '03',
      title: 'Well Equipped Spaces',
      description:
        'Enjoy steady WiFi, kitchens or kitchenettes for home meals, and practical essentials matched to each apartment type.',
    },
    {
      index: '04',
      title: 'Flexible Short Term Stays',
      description:
        'Book for a few nights or extended visits with transparent nightly estimates and direct personal confirmation.',
    },
  ];

  const bookingSteps = [
    {
      step: '01',
      title: 'Explore available apartments',
      description:
        'Browse our Lagos neighbourhoods and filter by location, nightly budget, and guest capacity.',
    },
    {
      step: '02',
      title: 'Select your dates and calculate cost',
      description:
        'Enter your arrival date, departure date, and number of guests to preview your estimated stay total in Naira.',
    },
    {
      step: '03',
      title: 'Send enquiry and confirm availability',
      description:
        'Submit your booking enquiry form or message us on WhatsApp so Vvichelae can confirm availability and next steps.',
    },
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative bg-[#34483D] text-[#F3EDE2] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28 flex flex-col justify-center"
          >
            <div className="mb-5">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#B9785C]">
                {BUSINESS_INFO.fullName}
              </p>
              <p className="text-xs text-[#F3EDE2]/75 mt-1">
                {BUSINESS_INFO.descriptor} · {BUSINESS_INFO.location}
              </p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-balance">
              Your Comfort. Your Space. Your Stay.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#F3EDE2]/85 leading-relaxed max-w-xl">
              {BUSINESS_INFO.fullName} welcomes travellers, business visitors, couples and families to thoughtfully prepared serviced residences across Lagos, offering a calm and comfortable place to call your own.
            </p>
            <p className="mt-3 text-sm italic font-display text-[#F3EDE2]/75">
              “{BUSINESS_INFO.tagline}”
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'apartments' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#B9785C] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#34483D] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>Explore Apartments</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'booking' })}
                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-[#F3EDE2]/45 text-[#F3EDE2] hover:border-[#F3EDE2] hover:bg-[#F3EDE2]/10 transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Book Your Stay
              </button>
            </div>
          </motion.div>

          {/* Hero Photograph Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:min-h-full overflow-hidden"
          >
            <SafeImage
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              loading="eager"
              fallbackTitle="Vvichelae Lagos Living"
              className="w-full h-full object-cover object-[center_55%]"
            />
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#34483D] to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Apartment Discovery */}
      <section className="py-20 sm:py-28 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-[#34483D]/15"
          >
            {/* Editorial Terracotta Accent Eyebrow */}
            <div className="flex items-center gap-3.5 mb-5">
              <span
                aria-hidden="true"
                className="inline-block w-10 h-[1.5px] bg-[#B9785C] shrink-0"
              />
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rotate-45 bg-[#B9785C] shrink-0"
              />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#B9785C]">
                THE VVICHELAE COLLECTION
              </p>
            </div>

            {/* Asymmetric 12-Column Editorial Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-6">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#34483D] tracking-tight leading-[1.06] text-balance">
                  Discover a Space That Feels Like{' '}
                  <em className="italic font-medium text-[#B9785C]">Yours.</em>
                </h2>
              </div>

              <div className="lg:col-span-6 flex flex-col lg:items-end lg:text-right gap-4">
                <p className="text-sm sm:text-base text-[#34483D]/80 leading-relaxed max-w-lg">
                  From cosy city retreats to spacious serviced residences, find a welcoming place to relax, recharge and enjoy Lagos at your own pace.
                </p>

                <p className="text-xs sm:text-[13px] font-medium tracking-wide text-[#34483D]/70">
                  Yaba · Ikeja · Lekki · Surulere · Victoria Island · Ikoyi
                </p>

                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'apartments' })}
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase bg-[#34483D] text-[#F3EDE2] border border-[#34483D] hover:bg-[#B9785C] hover:border-[#B9785C] transition-colors duration-200 whitespace-nowrap self-start lg:self-end cursor-pointer"
                >
                  <span>EXPLORE OUR RESIDENCES</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7">
            {featuredApartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                onNavigate={onNavigate}
                compact
                coverImage={HOMEPAGE_FEATURED_COVERS[apartment.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Vvichelae */}
      <section className="py-16 sm:py-24 border-t border-[#34483D]/15 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
                Why Choose Vvichelae
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#34483D] tracking-tight text-balance">
                Hospitality Built Around Ease and Warmth
              </h2>
              <p className="mt-4 text-base text-[#34483D]/80 leading-relaxed">
                Whether you are arriving in Lagos for business meetings, visiting loved ones, or taking time to rest, our apartments focus on clean comfort and honest communication.
              </p>

              <div className="mt-8 pt-6 border-t border-[#34483D]/15 space-y-3 text-sm text-[#34483D]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
                  <span>Prime Lagos neighbourhoods: Yaba, Ikeja, Lekki, Surulere, Victoria Island and Ikoyi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
                  <span>Direct personal availability confirmation before reservation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
                  <span>No online payment collected during booking enquiry</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((item) => (
                <motion.div
                  key={item.index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 border border-[#34483D]/15 bg-[#F3EDE2]"
                >
                  <span className="font-display text-2xl font-semibold text-[#B9785C] block mb-2">
                    {item.index}.
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#34483D] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#34483D]/80 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Video Section */}
      <VideoShowcase
        label={VIDEO_SHOWCASES.homeTour.label}
        heading={VIDEO_SHOWCASES.homeTour.heading}
        subheading={VIDEO_SHOWCASES.homeTour.subheading}
        videoSrc={VIDEO_SHOWCASES.homeTour.videoSrc}
        posterSrc={VIDEO_SHOWCASES.homeTour.posterSrc}
        posterAlt={VIDEO_SHOWCASES.homeTour.posterAlt}
        previewFrames={VIDEO_SHOWCASES.homeTour.previewFrames}
        surface="olive"
      />

      {/* 5. How Booking Works */}
      <section className="py-16 sm:py-24 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
              Simple Enquiry Process
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#34483D] tracking-tight text-balance">
              How Booking Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#34483D]/15 pt-10">
            {bookingSteps.map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <span className="font-display text-4xl font-semibold text-[#B9785C] block">
                  {item.step}.
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#34483D]">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#34483D]/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sample Reviews (Clearly Labelled Demonstration Testimonials) */}
      <section className="py-16 sm:py-24 border-t border-[#34483D]/15 bg-[#F3EDE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
              Demonstration Guest Perspectives
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#34483D] tracking-tight text-balance">
              Sample Stay Impressions
            </h2>
            <p className="mt-3 text-sm text-[#34483D]/75 leading-relaxed">
              The examples below are simulated sample testimonials created for demonstration purposes and do not represent verified customer reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SAMPLE_TESTIMONIALS.map((review) => (
              <article
                key={review.id}
                className="p-6 sm:p-8 border border-[#34483D]/15 flex flex-col justify-between bg-[#F3EDE2]"
              >
                <div>
                  <p className="text-xs font-semibold text-[#B9785C] mb-4">
                    {review.label}
                  </p>
                  <blockquote className="font-display text-xl text-[#34483D] leading-relaxed mb-6">
                    “{review.quote}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#34483D]/10">
                  <p className="text-sm font-semibold text-[#34483D]">
                    {review.guestProfile}
                  </p>
                  <p className="text-xs text-[#34483D]/75 mt-0.5">
                    {review.apartmentType}
                  </p>
                  <p className="text-xs text-[#34483D]/60 mt-2 italic">
                    {review.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="py-16 sm:py-24 border-t border-[#34483D]/15 bg-[#F3EDE2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
              Guest Information
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#34483D] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* 8. Final Booking Call to Action */}
      <section className="py-16 sm:py-24 bg-[#34483D] text-[#F3EDE2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-6 h-6 text-[#B9785C] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-balance">
            Ready to Plan Your Next Stay in Lagos?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F3EDE2]/85 max-w-2xl mx-auto leading-relaxed">
            Explore our Lagos residences, calculate your estimated stay cost and send your booking enquiry directly to Vvichelae.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'apartments' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#B9785C] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#34483D] transition-colors cursor-pointer"
            >
              <span>Explore Apartments</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'booking' })}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold border border-[#F3EDE2]/45 text-[#F3EDE2] hover:border-[#F3EDE2] hover:bg-[#F3EDE2]/10 transition-colors cursor-pointer"
            >
              Send Booking Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
