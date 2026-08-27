'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion()) return;
    
    // ✅ REMOVED the mobile check - NOW WORKS ON MOBILE TOO!
    // if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // ✅ OPTIMIZED for mobile
      touchMultiplier: 1.2,
      wheelMultiplier: 0.8,
      smoothTouch: true, // ✅ This enables smooth touch scrolling on mobile
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { duration: 0 });
        }
        return lenis.actualScroll;
      },
      scrollLeft(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { duration: 0 });
        }
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: 'transform',
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}