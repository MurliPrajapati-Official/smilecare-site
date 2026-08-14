import React, { useState, useEffect, useRef, useLayoutEffect, useCallback, ReactNode } from 'react';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import GalleryPage from './components/GalleryPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

const HERO_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
const SECTION2_IMAGE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';
const SECTION3_IMG1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';
const SECTION3_IMG2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';
const SECTION3_BG = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';

const featureBars = ['Advanced Dentistry', 'High Quality Equipment', 'Friendly Staff'];

const services = [
  { name: 'Dental\nVeneers', num: '01', active: true },
  { name: 'Dental\nCrowns', num: '02', active: false },
  { name: 'Teeth\nWhitening', num: '03', active: false },
  { name: 'Dental\nImplants', num: null, active: false },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function useImageWidth(src: string, sectionHeight: number) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!sectionHeight) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const renderWidth = img.naturalWidth * (sectionHeight / img.naturalHeight);
      setWidth(renderWidth);
    };
  }, [src, sectionHeight]);
  return width;
}

function useMaskPositions(sectionElement: HTMLElement | null, cardRefs: React.MutableRefObject<(HTMLElement | null)[]>) {
  const [positions, setPositions] = useState<{ x: number, y: number, sw: number, sh: number }[]>([]);

  useLayoutEffect(() => {
    if (!sectionElement) return;

    const updatePositions = () => {
      const sectionRect = sectionElement.getBoundingClientRect();
      const newPos = cardRefs.current.map(card => {
        if (!card) return { x: 0, y: 0, sw: 0, sh: 0 };
        const cardRect = card.getBoundingClientRect();
        return {
          x: cardRect.left - sectionRect.left,
          y: cardRect.top - sectionRect.top,
          sw: sectionRect.width,
          sh: sectionRect.height
        };
      });
      setPositions(newPos);
    };

    updatePositions();

    const observer = new ResizeObserver(updatePositions);
    observer.observe(sectionElement);
    window.addEventListener('resize', updatePositions);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePositions);
    };
  }, [sectionElement, cardRefs]);

  return positions;
}

function useStaggeredReveal(count: number, threshold = 0.05) {
  const [visible, setVisible] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    // Immediate fallback check if element is already in or near viewport
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      setVisible(true);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin: '100px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

  const getAnimStyle = (index: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`
  });

  return { ref, setElement, getAnimStyle, visible };
}

interface MaskedCardProps {
  key?: React.Key;
  bgImage: string;
  position?: { x: number; y: number; sw: number; sh: number };
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: ReactNode;
  cardRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}

function MaskedCard({ bgImage, position, imageWidth, focalX, className, children, cardRef, style }: MaskedCardProps) {
  const overflow = position && imageWidth > position.sw ? imageWidth - position.sw : 0;
  const focalOffset = overflow * focalX;

  const bgStyle: React.CSSProperties = position && position.sh > 0 ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: `auto ${position.sh}px`,
    backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
    backgroundRepeat: 'no-repeat'
  } : {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div ref={cardRef} className={className} style={{ ...bgStyle, ...style }}>
      {children}
    </div>
  );
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const totalTime = 2000;
    const steps = 100;
    const stepTime = totalTime / steps;

    const interval = setInterval(() => {
      current++;
      setCount(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 200);
      }
    }, stepTime);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black">
        {count}
      </div>
    </div>
  );
}

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setOpen(false);
  };

  const navItems = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'About', value: 'about' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact', value: 'contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 lg:px-8 py-3 md:py-4 bg-white/85 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div
          onClick={() => handleNavClick('home')}
          className="flex flex-col cursor-pointer group"
        >
          <div className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black group-hover:text-neutral-700 transition-colors">
            <div>Dental</div>
            <div className="-mt-1 font-extrabold">Health</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`text-sm font-bold transition-all cursor-pointer ${currentPage === item.value
                ? 'text-black border-b-2 border-black pb-0.5'
                : 'text-neutral-500 hover:text-black'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 sm:px-6 sm:py-2.5 bg-black text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all hover:scale-105 shadow-md cursor-pointer"
          >
            Book<span className="hidden sm:inline"> Appointment</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center relative z-50 cursor-pointer rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className={`absolute h-0.5 w-5 sm:w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-5 sm:w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
            <span className={`absolute h-0.5 w-5 sm:w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-500 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col justify-center h-full px-6 sm:px-8 gap-4 pt-16 pb-8">
            {navItems.map((item, i) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-left text-2xl sm:text-3xl font-bold transition-all duration-500 cursor-pointer ${currentPage === item.value ? 'text-black font-extrabold underline' : 'text-neutral-600 hover:text-black'
                  } ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
              >
                {item.label}
              </button>
            ))}

            <div
              className={`mt-6 pt-6 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionDelay: open ? '450ms' : '0ms' }}
            >
              <div className="text-xs sm:text-sm font-bold text-black mb-1">24/7 Emergency Line</div>
              <div className="text-xs text-neutral-500 mb-4">+1 (201) 555-0199</div>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full px-6 py-3.5 bg-black rounded-full text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors duration-200 cursor-pointer shadow-md"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const isMobile = useIsMobile();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section 1
  const [s1Node, setS1Node] = useState<HTMLElement | null>(null);
  const s1CardRefs = useRef<(HTMLElement | null)[]>([]);
  const s1Positions = useMaskPositions(s1Node, s1CardRefs);
  const [s1Height, setS1Height] = useState(0);

  useLayoutEffect(() => {
    if (s1Node) {
      setS1Height(s1Node.getBoundingClientRect().height);
    }
  }, [s1Node, s1Positions]);

  const s1ImageWidth = useImageWidth(HERO_IMAGE, s1Height);
  const s1Reveal = useStaggeredReveal(4);

  const setS1Ref = useCallback((el: HTMLElement | null) => {
    setS1Node(el);
    s1Reveal.setElement(el);
  }, [s1Reveal]);

  // Section 2
  const [s2Node, setS2Node] = useState<HTMLElement | null>(null);
  const s2CardRefs = useRef<(HTMLElement | null)[]>([]);
  const s2Positions = useMaskPositions(s2Node, s2CardRefs);
  const [s2Height, setS2Height] = useState(0);

  useLayoutEffect(() => {
    if (s2Node) {
      setS2Height(s2Node.getBoundingClientRect().height);
    }
  }, [s2Node, s2Positions]);

  const s2ImageWidth = useImageWidth(SECTION2_IMAGE, s2Height);
  const s2Reveal = useStaggeredReveal(4);

  const setS2Ref = useCallback((el: HTMLElement | null) => {
    setS2Node(el);
    s2Reveal.setElement(el);
  }, [s2Reveal]);

  // Section 3
  const s3Reveal = useStaggeredReveal(4);

  return (
    <div className="bg-white min-h-screen w-full flex flex-col justify-between">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Dynamic View Content */}
      <main className="w-full flex-1">
        {currentPage === 'home' && (
          <>
            {/* Section 1 - Hero */}
            <section
              ref={setS1Ref}
              className="w-full min-h-[calc(100vh-5rem)] flex flex-col pt-18 md:pt-24 px-3 sm:px-6 lg:px-8 pb-4 gap-2 md:gap-3"
            >
              {featureBars.map((text, i) => (
                <MaskedCard
                  key={i}
                  cardRef={(el: HTMLElement | null) => s1CardRefs.current[i] = el}
                  bgImage={HERO_IMAGE}
                  position={s1Positions[i]}
                  imageWidth={s1ImageWidth}
                  focalX={isMobile ? 0.7 : 0.8}
                  className="w-full h-12 sm:h-16 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-sm"
                  style={s1Reveal.getAnimStyle(i)}
                >
                  <span className="flex items-center justify-center h-full text-black text-sm sm:text-lg md:text-3xl font-bold text-center relative z-10 px-3">
                    {text}
                  </span>
                </MaskedCard>
              ))}

              <MaskedCard
                cardRef={(el: HTMLElement | null) => s1CardRefs.current[3] = el}
                bgImage={HERO_IMAGE}
                position={s1Positions[3]}
                imageWidth={s1ImageWidth}
                focalX={isMobile ? 0.7 : 0.8}
                className="w-full min-h-[440px] sm:min-h-[520px] md:min-h-[620px] lg:min-h-[700px] flex-1 rounded-xl md:rounded-2xl overflow-hidden relative shadow-md p-4 sm:p-6 md:p-8 flex flex-col justify-between"
                style={s1Reveal.getAnimStyle(3)}
              >
                <div className="self-start text-black text-xs md:text-sm font-semibold leading-relaxed max-w-[240px] sm:max-w-[320px] md:max-w-[360px] z-10 bg-white/50 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/50 shadow-sm">
                  We wish to provide professional dental services that match the current technologies
                </div>

                <div className="z-10 mt-auto pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="block text-black text-xs md:text-sm font-bold mb-1 md:mb-2 tracking-wide uppercase">
                      Trusted Dentist in West New York
                    </span>
                    <h1 className="text-black text-[clamp(2.25rem,7.5vw,9.5rem)] font-extrabold leading-[0.85] tracking-tight">
                      Dental<br />Care
                    </h1>
                  </div>
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="self-start sm:self-auto bg-black/90 backdrop-blur-md px-5 py-3 md:px-6 md:py-3.5 rounded-full text-white text-xs md:text-sm font-semibold shadow-lg hover:bg-black transition-all hover:scale-105 cursor-pointer shrink-0"
                  >
                    Free Consultation
                  </button>
                </div>
              </MaskedCard>
            </section>

            {/* Section 2 - Services & Gallery */}
            <section
              ref={setS2Ref}
              className="w-full py-8 md:py-12 px-3 sm:px-6 lg:px-8 flex flex-col gap-3 md:gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">

                <MaskedCard
                  cardRef={(el: HTMLElement | null) => s2CardRefs.current[0] = el}
                  bgImage={SECTION2_IMAGE}
                  position={s2Positions[0]}
                  imageWidth={s2ImageWidth}
                  focalX={isMobile ? 0.65 : 0.8}
                  className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px] p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-md cursor-pointer"
                  style={s2Reveal.getAnimStyle(0)}
                >
                  <div className="text-white md:text-black text-2xl md:text-4xl font-bold z-10">
                    Smile Gallery
                  </div>
                  <div
                    onClick={() => handleNavigate('gallery')}
                    className="text-white md:text-black text-xs md:text-sm font-semibold z-10 hover:underline"
                  >
                    Our cosmetic dental work →
                  </div>
                </MaskedCard>

                <MaskedCard
                  cardRef={(el: HTMLElement | null) => s2CardRefs.current[1] = el}
                  bgImage={SECTION2_IMAGE}
                  position={s2Positions[1]}
                  imageWidth={s2ImageWidth}
                  focalX={isMobile ? 0.65 : 0.8}
                  className="md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative min-h-[260px] sm:min-h-[340px] md:min-h-[580px] p-5 sm:p-6 md:p-8 flex flex-col justify-between shadow-md"
                  style={s2Reveal.getAnimStyle(1)}
                >
                  <div className="text-white text-sm sm:text-base md:text-xl font-semibold leading-relaxed max-w-sm z-10 mt-auto">
                    If you want a gorgeous smile, call us to ask about a smile makeover.
                  </div>
                  <div className="flex justify-end mt-4 z-10">
                    <button
                      onClick={() => handleNavigate('contact')}
                      className="px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-white rounded-full text-black text-xs sm:text-base md:text-lg font-bold hover:scale-105 transition-all shadow-lg cursor-pointer"
                    >
                      Call Us
                    </button>
                  </div>
                </MaskedCard>

                <MaskedCard
                  cardRef={(el: HTMLElement | null) => s2CardRefs.current[2] = el}
                  bgImage={SECTION2_IMAGE}
                  position={s2Positions[2]}
                  imageWidth={s2ImageWidth}
                  focalX={isMobile ? 0.65 : 0.8}
                  className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px] p-5 sm:p-6 md:p-8 flex items-center shadow-md cursor-pointer"
                  style={s2Reveal.getAnimStyle(2)}
                >
                  <div
                    onClick={() => handleNavigate('services')}
                    className="text-white md:text-black text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold leading-[0.9] z-10"
                  >
                    Smile<br />makeover
                  </div>
                </MaskedCard>

                <MaskedCard
                  cardRef={(el: HTMLElement | null) => s2CardRefs.current[3] = el}
                  bgImage={SECTION2_IMAGE}
                  position={s2Positions[3]}
                  imageWidth={s2ImageWidth}
                  focalX={isMobile ? 0.65 : 0.8}
                  className="col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative shadow-md p-3 sm:p-4"
                  style={s2Reveal.getAnimStyle(3)}
                >
                  <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full h-full">
                    {services.map((svc, i) => (
                      <div
                        key={i}
                        onClick={() => handleNavigate('services')}
                        className={`rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between min-h-[130px] sm:min-h-[150px] md:min-h-[180px] transition-all hover:scale-[1.02] cursor-pointer ${svc.active ? 'bg-white/95 shadow-md border border-black/10' : 'bg-white/85 backdrop-blur-md border border-black/10 hover:bg-white/95'}`}
                      >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-black">
                          {svc.name}
                        </h3>
                        {svc.num && (
                          <div className="self-end w-8 h-8 md:w-10 md:h-10 rounded-full border border-black flex items-center justify-center text-xs md:text-sm font-semibold mt-3 text-black">
                            {svc.num}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </MaskedCard>

              </div>
            </section>

            {/* Section 3 - Implant Dentistry */}
            <section
              ref={s3Reveal.ref}
              className="w-full py-8 md:py-12 px-3 sm:px-6 lg:px-8 flex flex-col gap-3 md:gap-4 pb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 w-full">

                {/* Left Column */}
                <div className="flex flex-col gap-4 md:gap-6 flex-1">

                  <div className="rounded-xl md:rounded-2xl bg-stone-100 p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-[260px] shadow-sm" style={s3Reveal.getAnimStyle(0)}>
                    <h2 className="text-[clamp(2.25rem,5.5vw,5.5rem)] font-extrabold leading-[0.95] text-black">
                      Implant<br />Dentistry
                    </h2>
                    <p className="text-xs md:text-sm font-semibold text-black uppercase tracking-wider mt-4">
                      Restore Missing Teeth
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 h-40 sm:h-48 md:h-64" style={s3Reveal.getAnimStyle(1)}>
                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
                      <img src={SECTION3_IMG1} alt="Dental implant procedure" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
                      <img src={SECTION3_IMG2} alt="Dental restoration" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>

                  <div className="rounded-xl md:rounded-2xl bg-zinc-200 p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-h-[140px] md:min-h-[180px] shadow-sm" style={s3Reveal.getAnimStyle(2)}>
                    <div>
                      <p className="text-xs md:text-sm font-semibold text-black mb-1 uppercase tracking-wider">Consultation</p>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight">
                        Dental Restoration Services
                      </h3>
                    </div>
                    <button
                      onClick={() => handleNavigate('contact')}
                      className="px-5 py-3 md:px-7 md:py-4 bg-white rounded-full text-black text-xs sm:text-sm md:text-base font-bold hover:scale-105 transition-transform shadow-md shrink-0 self-start sm:self-auto cursor-pointer"
                    >
                      Book Online
                    </button>
                  </div>

                </div>

                {/* Right Column */}
                <div className="rounded-xl md:rounded-2xl overflow-hidden relative min-h-[380px] sm:min-h-[460px] md:min-h-[600px] shadow-md flex flex-col justify-end p-4 sm:p-6" style={s3Reveal.getAnimStyle(3)}>
                  <img src={SECTION3_BG} alt="Smiling patient" className="absolute inset-0 w-full h-full object-cover" />

                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full">

                    <div
                      onClick={() => handleNavigate('services')}
                      className="bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[130px] sm:min-h-[160px] md:min-h-[180px] shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <h4 className="text-base md:text-xl font-bold text-black leading-tight">
                        The Process<br />of Installing<br />Implants
                      </h4>
                      <div className="self-end w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-black flex items-center justify-center mt-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg] text-black">
                          <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    <div
                      onClick={() => handleNavigate('services')}
                      className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl md:rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[130px] sm:min-h-[160px] md:min-h-[180px] shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <h4 className="text-base md:text-xl font-bold text-white leading-tight">
                        Caring<br />for Dental<br />Implants
                      </h4>
                      <div className="self-end w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center mt-2">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-[-45deg] text-white">
                          <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </section>
          </>

        )}

        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}


