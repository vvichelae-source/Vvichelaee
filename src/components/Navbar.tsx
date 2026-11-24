import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageRoute } from '../types/apartment';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (page: PageRoute['page']) => {
    if (page === 'apartments' && currentRoute.page === 'apartment-detail') {
      return true;
    }
    return currentRoute.page === page;
  };

  const handleLinkClick = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  const navItems: { label: string; route: PageRoute; key: PageRoute['page'] }[] = [
    { label: 'Home', route: { page: 'home' }, key: 'home' },
    { label: 'Apartments', route: { page: 'apartments' }, key: 'apartments' },
    { label: 'About', route: { page: 'about' }, key: 'about' },
    { label: 'Contact', route: { page: 'contact' }, key: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F3EDE2]/95 backdrop-blur-sm border-b border-[#34483D]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[4.5rem] sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Vvichelae Stays & Suites Brand Lockup */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick({ page: 'home' });
          }}
          aria-label="Vvichelae Stays & Suites — Home"
          className="shrink-0"
        >
          <BrandMark variant="dark" size="header" />
        </a>

        {/* Zone 2: Desktop navigation links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#34483D]"
        >
          {navItems.map((item) => {
            const active = isActive(item.key);
            return (
              <a
                key={item.key}
                href={item.key === 'home' ? '/' : `/${item.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'text-[#34483D] font-semibold'
                    : 'text-[#34483D]/75 hover:text-[#34483D]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#B9785C]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick({ page: 'booking' })}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] hover:text-[#F3EDE2] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Now
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#34483D] border border-[#34483D]/20 hover:border-[#B9785C] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#34483D]/15 bg-[#F3EDE2] px-4 py-5 space-y-2"
          >
            <div className="pb-3 mb-2 border-b border-[#34483D]/15">
              <BrandMark variant="dark" size="header" showDescriptor />
            </div>
            {navItems.map((item) => {
              const active = isActive(item.key);
              return (
                <a
                  key={item.key}
                  href={item.key === 'home' ? '/' : `/${item.key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-3 py-3 text-base font-medium border-b border-[#34483D]/10 transition-colors ${
                    active
                      ? 'text-[#34483D] font-semibold bg-[#34483D]/5'
                      : 'text-[#34483D]/80 hover:text-[#34483D]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => handleLinkClick({ page: 'booking' })}
                className="w-full py-3.5 px-5 text-center text-sm font-semibold bg-[#34483D] text-[#F3EDE2] hover:bg-[#B9785C] transition-colors cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
