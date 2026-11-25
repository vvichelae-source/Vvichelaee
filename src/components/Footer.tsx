import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/apartments';
import { PageRoute } from '../types/apartment';
import { BrandMark } from './BrandMark';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="bg-[#34483D] text-[#F3EDE2] border-t border-[#F3EDE2]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F3EDE2]/15">
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleNav(e, { page: 'home' })}
              aria-label="Vvichelae Stays & Suites — Home"
              className="inline-block"
            >
              <BrandMark variant="light" size="prominent" showDescriptor />
            </a>
            <p className="text-[#F3EDE2]/85 text-base max-w-sm leading-relaxed">
              {BUSINESS_INFO.tagline} Comfortable, thoughtfully prepared serviced apartments and short let living across Lagos, Nigeria.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#F3EDE2]/80 pt-1">
              <MapPin className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#B9785C]">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, { page: 'home' })}
                  className="text-[#F3EDE2]/85 hover:text-[#F3EDE2] underline-offset-4 hover:underline transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/apartments"
                  onClick={(e) => handleNav(e, { page: 'apartments' })}
                  className="text-[#F3EDE2]/85 hover:text-[#F3EDE2] underline-offset-4 hover:underline transition-colors"
                >
                  Apartments
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, { page: 'about' })}
                  className="text-[#F3EDE2]/85 hover:text-[#F3EDE2] underline-offset-4 hover:underline transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav(e, { page: 'contact' })}
                  className="text-[#F3EDE2]/85 hover:text-[#F3EDE2] underline-offset-4 hover:underline transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  onClick={(e) => handleNav(e, { page: 'booking' })}
                  className="text-[#F3EDE2]/85 hover:text-[#F3EDE2] underline-offset-4 hover:underline transition-colors"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-sans text-xs font-semibold tracking-wider uppercase text-[#B9785C]">
              Contact & Enquiries
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#B9785C] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#34483D] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Chat With Us on WhatsApp</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2.5 text-[#F3EDE2]/90 hover:text-[#F3EDE2] transition-colors pt-1"
              >
                <Mail className="w-4 h-4 text-[#B9785C] shrink-0" aria-hidden="true" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
            </div>
            <p className="text-xs text-[#F3EDE2]/70 pt-2 leading-relaxed">
              Listed apartment rates and details are demonstration samples. All booking enquiries require availability confirmation before a reservation is finalised.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F3EDE2]/70">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.fullName}. {BUSINESS_INFO.location}.</p>
          <p>{BUSINESS_INFO.descriptor} · No online payment collected.</p>
        </div>
      </div>
    </footer>
  );
}
