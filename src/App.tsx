import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { APARTMENTS } from './data/apartments';
import { BookingPrefill, PageRoute } from './types/apartment';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ApartmentsPage } from './pages/ApartmentsPage';
import { ApartmentDetailPage } from './pages/ApartmentDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';

function parseLocationToRoute(): PageRoute {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const search = new URLSearchParams(window.location.search);

  if (pathname === '/' || pathname === '') {
    return { page: 'home' };
  }
  if (pathname === '/apartments') {
    return { page: 'apartments' };
  }
  if (pathname.startsWith('/apartments/')) {
    const slug = pathname.replace('/apartments/', '');
    return { page: 'apartment-detail', slug };
  }
  if (pathname === '/about') {
    return { page: 'about' };
  }
  if (pathname === '/contact') {
    return { page: 'contact' };
  }
  if (pathname === '/booking' || pathname === '/book') {
    const prefill: BookingPrefill = {};
    const aptParam = search.get('apartment');
    const arrivalParam = search.get('arrival');
    const departureParam = search.get('departure');
    const guestsParam = search.get('guests');

    if (aptParam && APARTMENTS.some((a) => a.id === aptParam)) {
      prefill.apartmentId = aptParam;
    }
    if (arrivalParam) prefill.arrivalDate = arrivalParam;
    if (departureParam) prefill.departureDate = departureParam;
    if (guestsParam && !Number.isNaN(Number(guestsParam))) {
      prefill.guests = Number(guestsParam);
    }

    return {
      page: 'booking',
      prefill: Object.keys(prefill).length > 0 ? prefill : undefined,
    };
  }

  return { page: 'home' };
}

function buildUrlForRoute(route: PageRoute): string {
  switch (route.page) {
    case 'home':
      return '/';
    case 'apartments':
      return '/apartments';
    case 'apartment-detail':
      return `/apartments/${route.slug}`;
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'booking': {
      if (!route.prefill) return '/booking';
      const params = new URLSearchParams();
      if (route.prefill.apartmentId) params.set('apartment', route.prefill.apartmentId);
      if (route.prefill.arrivalDate) params.set('arrival', route.prefill.arrivalDate);
      if (route.prefill.departureDate) params.set('departure', route.prefill.departureDate);
      if (route.prefill.guests) params.set('guests', String(route.prefill.guests));
      const qs = params.toString();
      return qs ? `/booking?${qs}` : '/booking';
    }
  }
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() => parseLocationToRoute());

  const navigate = useCallback((nextRoute: PageRoute) => {
    const targetUrl = buildUrlForRoute(nextRoute);
    if (window.location.pathname + window.location.search !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocationToRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const base = 'Vvichelae Stays & Suites';
    if (route.page === 'apartments') {
      document.title = `Apartments | ${base}`;
    } else if (route.page === 'apartment-detail') {
      const apt = APARTMENTS.find((a) => a.slug === route.slug);
      document.title = apt ? `${apt.name} (${apt.location}) | ${base}` : `Apartment | ${base}`;
    } else if (route.page === 'about') {
      document.title = `About | ${base}`;
    } else if (route.page === 'contact') {
      document.title = `Contact | ${base}`;
    } else if (route.page === 'booking') {
      document.title = `Booking Enquiry | ${base}`;
    } else {
      document.title = `${base} | Serviced Apartments • Short-Let Living`;
    }
  }, [route]);

  const routeKey =
    route.page === 'apartment-detail' ? `detail-${route.slug}` : route.page;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F3EDE2] text-[#34483D]">
        <Navbar currentRoute={route} onNavigate={navigate} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={routeKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {route.page === 'home' && <HomePage onNavigate={navigate} />}
              {route.page === 'apartments' && <ApartmentsPage onNavigate={navigate} />}
              {route.page === 'apartment-detail' && (
                <ApartmentDetailPage slug={route.slug} onNavigate={navigate} />
              )}
              {route.page === 'about' && <AboutPage onNavigate={navigate} />}
              {route.page === 'contact' && <ContactPage onNavigate={navigate} />}
              {route.page === 'booking' && <BookingPage prefill={route.prefill} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
