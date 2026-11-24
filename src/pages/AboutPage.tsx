import { ArrowRight, Check, MapPin } from 'lucide-react';
import { BUSINESS_INFO, HERO_IMAGE } from '../data/apartments';
import { PageRoute } from '../types/apartment';
import { SafeImage } from '../components/SafeImage';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const principles = [
    {
      number: '01',
      title: 'A Welcoming Home Experience',
      body: 'Arriving in a busy city is easier when your accommodation feels calm and personal. Every Vvichelae apartment is arranged to feel warm, lived in, and restful from the moment you step inside.',
    },
    {
      number: '02',
      title: 'Convenient Stays Across Lagos',
      body: 'From mainland hubs like Yaba, Ikeja, and Surulere to Lekki, Victoria Island, and Ikoyi, our demonstration collection connects visitors with neighbourhoods close to where they need to be.',
    },
    {
      number: '03',
      title: 'Thoughtful Everyday Spaces',
      body: 'Whether you need a quiet work corner between Lagos meetings, a kitchen to prepare familiar meals, or a roomy living area for family gatherings, each space serves real daily comfort.',
    },
    {
      number: '04',
      title: 'Clear, Personal Communication',
      body: 'Instead of automated guesswork, enquiries go directly to Vvichelae via WhatsApp, email, or our booking form so availability and stay details are confirmed clearly.',
    },
  ];

  return (
    <div className="bg-[#F3EDE2]">
      {/* Page Hero */}
      <section className="border-b border-[#34483D]/15 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-3">
              About Vvichelae
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-semibold text-[#34483D] tracking-tight text-balance">
              {BUSINESS_INFO.tagline}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#34483D]/80 leading-relaxed">
              Vvichelae is a Lagos short let hospitality brand created to give travellers, business professionals, couples, and families comfortable temporary accommodation that feels genuinely welcoming.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#34483D]">
              <MapPin className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
              <span>Based in {BUSINESS_INFO.location}</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden border border-[#34483D]/15">
              <SafeImage
                src="/src/assets/images/apt6_ikoyi_living_1795554322266.jpg"
                alt="Warm sunlit Vvichelae apartment interior in Lagos"
                loading="eager"
                fallbackTitle="Vvichelae Lagos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hospitality Philosophy */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-2">
              Our Hospitality Approach
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#34483D] tracking-tight text-balance">
              Designed for Rest, Work, and Everyday Living
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((item) => (
              <article
                key={item.number}
                className="p-7 sm:p-8 border border-[#34483D]/15 bg-[#F3EDE2]"
              >
                <span className="font-display text-3xl font-semibold text-[#B9785C] block mb-3">
                  {item.number}.
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#34483D] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#34483D]/80 leading-relaxed">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Welcome */}
      <section className="py-16 sm:py-24 border-t border-[#34483D]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[16/10] overflow-hidden border border-[#34483D]/15">
              <SafeImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fallbackTitle="Vvichelae Living Space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C]">
              Who We Host
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#34483D] tracking-tight">
              Comfortable Stays for Every Visitor to Lagos
            </h2>
            <ul className="space-y-3.5 text-sm sm:text-base text-[#34483D]/85">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#B9785C] shrink-0 mt-1" aria-hidden="true" />
                <span>Travellers visiting Lagos for leisure, events, or short city breaks.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#B9785C] shrink-0 mt-1" aria-hidden="true" />
                <span>Business professionals and corporate guests needing quiet workspaces and dependable WiFi.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#B9785C] shrink-0 mt-1" aria-hidden="true" />
                <span>Couples and solo visitors looking for private, comfortable temporary accommodation.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-[#B9785C] shrink-0 mt-1" aria-hidden="true" />
                <span>Families needing multi bedroom apartments with generous living and dining spaces.</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'apartments' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer"
              >
                <span>Explore Apartments</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'contact' })}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold border border-[#34483D] text-[#34483D] hover:bg-[#34483D] hover:text-[#F3EDE2] transition-colors cursor-pointer"
              >
                Contact Vvichelae
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
