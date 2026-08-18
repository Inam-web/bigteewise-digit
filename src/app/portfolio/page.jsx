'use client';

import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Globe,
  Sparkles,
  CheckCircle2,
  Eye,
  X,
  Star,
  Compass,
  Layers,
  TrendingUp,
  Feather,
  Clock,
  History,
  Target,
  Video,
  Search,
  ShoppingBag,
  FileText,
  MapPin,
  Bookmark,
  BookOpen,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PROJECT DATA
============================================================ */

const PROJECT = {
  number: '01',
  label: 'AUTHOR PLATFORM / BOOK EXPERIENCE',
  title: 'Entre el Amor',
  mutedTitle: 'y las Sombras.',
  client: 'A. E. Fábregas & S. B. Brieva',
  year: '2025',
  website: 'https://alejandrofabregasescayola.com/',
  hero: '/images/portfolio/project1/hero-cover.jpeg',

  covers: [
    '/images/portfolio/project1/cover-tomo1.jpeg',
    '/images/portfolio/project1/cover-tomo2.jpeg',
    '/images/portfolio/project1/cover-tomo3.jpeg',
    '/images/portfolio/project1/cover-tomo4.jpeg',
  ],

  mockups: [
    '/images/portfolio/project1/mockup-1.jpeg',
    '/images/portfolio/project1/mockup-2.jpeg',
    '/images/portfolio/project1/mockup-3.jpeg',
  ],

  reviews: [
    {
      id: 1,
      name: 'Amazon Reader',
      platform: 'Amazon España',
      rating: 5,
      text: 'Una novela de la trilogía totalmente real, escrita a cuatro manos. Una historia que habla de muchos temas de gran profundidad y que deja huella.',
      image: '/images/portfolio/project1/review-1.jpeg',
    },
    {
      id: 2,
      name: 'Amazon Reader',
      platform: 'Amazon España',
      rating: 5,
      text: 'La lectura resulta adictiva y hace que quieras seguir leyendo para descubrir qué ocurre después. Una historia real que consigue atraparte desde el principio.',
      image: '/images/portfolio/project1/review-2.jpeg',
    },
    {
      id: 3,
      name: 'Amazon Reader',
      platform: 'Amazon España',
      rating: 5,
      text: 'Una historia basada en hechos reales, marcada por el exilio, las decisiones de la vida y las relaciones entre las personas. Una lectura que deja ganas de saber más.',
      image: '/images/portfolio/project1/review-3.jpeg',
    },
    {
      id: 4,
      name: 'Amazon Reader',
      platform: 'Amazon España',
      rating: 5,
      text: 'Una historia sobre el amor, la vida y las decisiones que tomamos. Los personajes y sus experiencias consiguen transmitir emociones que permanecen después de terminar la lectura.',
      image: '/images/portfolio/project1/review-4.jpeg',
    },
  ],

  intro:
    'A cinematic digital experience for a real-life literary trilogy shaped by exile, love, faith, memory and redemption.',

  story:
    'Entre el Amor y las Sombras follows more than fifty years of a shared life. The project needed to present that story with the intimacy of a personal archive while giving the books a clear, modern digital home.',

  challenge:
    'The experience had to connect the trilogy, the authors, their history, the visual archive and the reader journey without making the website feel like a conventional book catalogue.',

  philosophy:
    'The photographs show the smiles, but not the tears. They show the celebrations, but not the nights of uncertainty. The story exists in everything between those moments.',

  books: [
    {
      title: 'Destinos Cruzados',
      text: 'The first volume introduces a story of love, faith and perseverance shaped by exile and separation.',
    },
    {
      title: 'Entre la Esperanza y el Silencio',
      text: 'The second volume moves into a Spain awakening to democracy, where family history reveals an unexpected truth.',
    },
    {
      title: 'Resurgir desde el Silencio',
      text: 'The third volume follows the rebuilding of a life in Valencia through art, faith, family and love.',
    },
    {
      title: 'La trilogía',
      text: 'Three chapters of one deeply personal journey, transformed into a literary legacy for the next generation.',
    },
  ],

  authors: [
    {
      name: 'Alejandro Fábregas',
      text: 'Spanish philologist and writer from Madrid, whose life and work are marked by exile, belonging and the search for identity across three continents.',
    },
    {
      name: 'Susana Brieva',
      text: 'Cuban writer and artist whose perspective brings the resilient female voice at the heart of the trilogy.',
    },
  ],

  deliverables: [
    'Author website and trilogy presentation',
    'Book-focused visual storytelling',
    'Reader acquisition and first-chapter journey',
    'Author biographies and personal history',
    'Gallery and archival storytelling',
    'Amazon and book discovery touchpoints',
  ],

  timeline: [
    {
      era: '1960s',
      title: 'Exile & Separation',
      desc: 'Leaving Havana under turbulent political conflict, leaving behind homes and family to preserve identity and memory in handwritten letters.',
    },
    {
      era: '1980s',
      title: 'Transition & Discovery',
      desc: 'Navigating democratic awakening in Spain, where long-buried family documents revealed unexpected connections across continents.',
    },
    {
      era: '2000s',
      title: 'Resurgence & Art',
      desc: 'Rebuilding life in Valencia through literature, fine arts, and spiritual resilience, crafting the foundation of the trilogy.',
    },
    {
      era: '2025',
      title: 'The Digital Heritage',
      desc: 'Transforming over fifty years of personal archive into a published literary trilogy and an immersive author platform.',
    },
  ],

  craftPillars: [
    {
      number: '01',
      title: 'Archival Palette & Texture',
      desc: 'Deep monochrome tones paired with subtle sepia highlights mirror vintage photograph albums and historical paper.',
    },
    {
      number: '02',
      title: 'Philological Typography',
      desc: 'Refined serif typography honoring Spanish literary traditions and balancing the co-authorship of Fábregas & Brieva.',
    },
    {
      number: '03',
      title: 'Documentary Atmosphere',
      desc: 'Integrating historical photographs, original covers, and reader testimonials into a seamless editorial canvas.',
    },
  ],

  funnelSteps: [
    {
      step: '01',
      title: 'Archival Discovery',
      desc: 'Engaging historical hooks and visual excerpts invite readers to explore the backstory behind the 50-year memoir.',
    },
    {
      step: '02',
      title: 'First-Chapter Excerpt',
      desc: 'Frictionless preview access lets readers immerse themselves in Destinos Cruzados before buying.',
    },
    {
      step: '03',
      title: 'Direct Amazon Acquisition',
      desc: 'Seamless touchpoints lead directly to Amazon España print and Kindle editions with 5★ reader social proof.',
    },
  ],
};

const PROJECT_TWO = {
  number: '02',
  label: 'BOOK MARKETING · AUTHOR WEBSITE · AMAZON A+ · CINEMATIC TRAILER',
  title: 'The Sea Stone',
  mutedTitle: 'Sisters.',
  client: 'Eleanor Buchanan',
  year: '2026',
  status: 'Completed',
  website: 'https://www.amazon.com/dp/B0FCY6K6CL',
  goodreads: 'https://www.goodreads.com/author/show/57048341.Eleanor_Buchanan',
  heroImage: '/images/portfolio/project2/hero-cover.jpeg',
  coverImage: '/images/portfolio/project2/cover.png',
  mockup1: '/images/portfolio/project2/mockup-1.jpeg',

  genre: 'Historical Fiction · Romance',
  series: 'The Sea Stone Sisters',
  authorLocation: 'York, England',
  authorInstagram: 'https://www.instagram.com/eleanorbuchananbooks/',

  authorBio:
    'After a haphazard early career that took her around the world, Eleanor Buchanan settled in York and began writing award-winning romance, historical, and time-slip novels under various pseudonyms.',

  intro:
    'A full-service book marketing and digital presentation engagement for a spellbinding family saga of love, loss, secrets and finding your way home.',

  story:
    'The Sea Stone Sisters combines a historical timeline beginning in 1931 with a present-day story set across international locations. Spanning decades and continents, the story follows four sisters separated by circumstance and connected by inherited rings, ancient standing stones and a long-buried family mystery.',

  challenge:
    'The project needed to create a polished and cohesive online presence that could showcase the book\'s atmosphere, strengthen its Amazon presentation, give the author a professional web presence and provide engaging promotional assets capable of attracting potential readers.',

  philosophy:
    'Four sisters. One mystery. The story lives in the spaces between the rings they inherited and the secrets they kept.',

  solutions: [
    {
      title: 'Amazon A+ Content',
      text: 'Created enhanced visual content for the Amazon listing to complement the book description, communicate its themes and atmosphere, and give potential readers a more immersive presentation of the novel.',
    },
    {
      title: 'Author Website',
      text: 'Built a professional author website that provides readers with a dedicated online destination to discover Eleanor Buchanan and her work.',
    },
    {
      title: 'Book Formatting',
      text: 'Professionally formatted the book interior to provide a clean, polished and reader-friendly presentation.',
    },
    {
      title: 'Cinematic Book Trailer',
      text: 'Created a cinematic promotional trailer designed to visually communicate the sweeping locations, emotional storytelling, family mystery and atmospheric quality of the novel.',
    },
    {
      title: 'SEO Optimization',
      text: 'Optimized the author\'s online presence with search-focused positioning designed to improve discoverability and connect the book with relevant reader searches and interests.',
    },
  ],

  deliverables: [
    'Amazon A+ Content',
    'Author website',
    'Professional book formatting',
    'Cinematic book trailer',
    'SEO optimization',
    'Reader-focused digital positioning',
    'Cohesive visual presentation across marketing channels',
  ],

  stats: [
    { value: 2800, suffix: '+', label: 'Monthly Sales ($)' },
    { value: 1864, suffix: '', label: 'Goodreads Ratings' },
    { value: 4.3, suffix: '/5', label: 'Goodreads Rating' },
    { value: 4.6, suffix: '/5', label: 'Amazon Rating' },
  ],

  results:
    'The project supported a stronger commercial and reader-facing presence for The Sea Stone Sisters, with the book generating $2,800+ in monthly sales and strong reader engagement across major book discovery platforms.',

  narrativePillars: [
    {
      number: '01',
      title: '1931 Historical Arc',
      desc: 'Four sisters torn apart in pre-war Britain, linked by secret vows made at an ancient standing stone in Cornwall.',
    },
    {
      number: '02',
      title: 'Present-Day Discovery',
      desc: 'Inherited antique rings reveal clues across archives in York, London, and international locations to uncover family truth.',
    },
    {
      number: '03',
      title: 'Genre Target Positioning',
      desc: 'Tailored ad copy and visual hooks designed specifically for readers of Kate Morton, Lucinda Riley, and time-slip romance.',
    },
  ],

  aplusModules: [
    {
      number: '01',
      title: 'Atmospheric Brand Banners',
      desc: 'High-impact full-bleed graphics communicating the coastal mood, historical depth, and emotional resonance of the novel.',
    },
    {
      number: '02',
      title: 'Sister & Heirloom Spotlights',
      desc: 'Detailed visual breakdown of the four sisters, their unique rings, and their roles in the dual timeline mystery.',
    },
    {
      number: '03',
      title: 'Series Comparison Grid',
      desc: 'Conversion-focused cross-promotional carousel encouraging readers to pre-order and follow future installments in the series.',
    },
  ],

  growthEcosystem: [
    {
      number: '01',
      title: 'Cinematic Video Trailer',
      desc: 'High-production promotional trailer distributed across Meta, Instagram Reels, and YouTube shorts to drive initial reader hype.',
    },
    {
      number: '02',
      title: 'Amazon PPC & Categories',
      desc: 'Laser-targeted sponsored product ads dominating Time-Slip Romance and British Historical Fiction keywords.',
    },
    {
      number: '03',
      title: 'Goodreads & ARC Blitz',
      desc: 'Coordinated reader outreach generating 1,860+ ratings and 4.6/5 stars across major book review communities.',
    },
    {
      number: '04',
      title: 'SEO & Author Authority',
      desc: 'Search-optimized York author website establishing Eleanor Buchanan as an authoritative figure in historical fiction.',
    },
  ],
};

const EASE = 'power4.out';
const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

const NAV_LINKS = [
  { label: 'Story', target: '#story' },
  { label: 'Books', target: '#books' },
  { label: 'Work', target: '#work' },
  { label: 'Reviews', target: '#reviews' },
];

const PROJECT_NAV = [
  { id: 'project-01', label: '01', title: 'Entre el Amor', target: '#hero' },
  { id: 'project-02', label: '02', title: 'Sea Stone Sisters', target: '#sea-stone' },
];

/* ============================================================
   ENVIRONMENT HELPERS
============================================================ */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

/* ============================================================
   MAGNETIC HOOK
============================================================ */

function useMagnetic(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref, strength]);
}

function MagneticWrap({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  useMagnetic(ref, strength);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ============================================================
   CUSTOM CURSOR — event-delegated so dynamically mounted
   buttons (modals, carousel) are always covered.
============================================================ */

const CURSOR_SELECTOR = 'a, button, [role="button"], [data-cursor]';

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer()) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let shown = false;

    const handleMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.to([cursor, dot], { autoAlpha: 1, duration: 0.4 });
      }
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    };

    const handleOver = (e) => {
      if (e.target?.closest?.(CURSOR_SELECTOR)) {
        gsap.to(cursor, { scale: 2.4, opacity: 0.55, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(dot, { scale: 0, duration: 0.3, overwrite: 'auto' });
      }
    };

    const handleOut = (e) => {
      if (e.target?.closest?.(CURSOR_SELECTOR)) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(dot, { scale: 1, duration: 0.3, overwrite: 'auto' });
      }
    };

    const handleDown = () => gsap.to(cursor, { scale: 0.85, duration: 0.2, overwrite: 'auto' });
    const handleUp = () => gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: 'auto' });

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 opacity-0 mix-blend-difference lg:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference lg:block"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}

/* ============================================================
   FLOATING PARTICLES — lighter on small screens
============================================================ */

function FloatingParticles({ count }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const total = count ?? (window.innerWidth < 768 ? 12 : 26);
    const particles = [];

    for (let i = 0; i < total; i++) {
      const p = document.createElement('div');
      p.className = 'absolute rounded-full bg-white/[0.05]';
      const size = gsap.utils.random(2, 5);
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${gsap.utils.random(0, 100)}%`;
      p.style.top = `${gsap.utils.random(0, 100)}%`;
      p.style.willChange = 'transform, opacity';
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: gsap.utils.random(-70, 70),
        x: gsap.utils.random(-35, 35),
        opacity: gsap.utils.random(0.1, 0.45),
        duration: gsap.utils.random(5, 11),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 3),
      });
    }

    return () => {
      particles.forEach((p) => gsap.killTweensOf(p));
      particles.forEach((p) => p.remove());
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

/* ============================================================
   SCROLL PROGRESS BAR
============================================================ */

function ScrollProgress() {
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-white/30 via-white/80 to-white/30"
      />
    </div>
  );
}

/* ============================================================
   PRELOADER — cinematic curtain with counter, wipes away
   and hands off to the hero intro timeline.
============================================================ */

function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const [exited, setExited] = useState(false);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      const t = setTimeout(() => {
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.3,
          onComplete: () => {
            setExited(true);
            completeRef.current?.();
          },
        });
      }, 350);
      return () => clearTimeout(t);
    }

    const counter = { val: 0 };

    const tl = gsap.timeline({
      defaults: { ease: EASE },
      onComplete: () => {
        setExited(true);
        completeRef.current?.();
      },
    });

    tl.fromTo(
      '.pre-word',
      { yPercent: 130, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09 },
      0.15
    )
      .fromTo(
        '.pre-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.3, ease: 'power2.inOut', transformOrigin: 'left center' },
        0.3
      )
      .to(
        counter,
        {
          val: 100,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0');
            }
          },
        },
        0.3
      )
      .to('.pre-meta', { autoAlpha: 0, y: -12, duration: 0.4 }, '+=0.2')
      .to(
        root,
        { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'power4.inOut' },
        '-=0.1'
      );

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden={exited}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#090909] ${
        exited ? 'pointer-events-none' : ''
      }`}
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <div className="overflow-hidden">
          <span className="pre-word block text-[10px] font-semibold uppercase tracking-[0.5em] text-white/40">
            Case Study — {PROJECT.number}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <span className="pre-word block text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {PROJECT.title}
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="pre-word block text-3xl font-semibold tracking-tight text-white/30 sm:text-5xl">
              {PROJECT.mutedTitle}
            </span>
          </div>
        </div>

        <div className="pre-meta flex w-56 flex-col gap-3 sm:w-72">
          <div className="h-px w-full origin-left scale-x-0 bg-white/25 pre-line" />
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.3em] text-white/35">
            <span>BigTeeWise</span>
            <span ref={counterRef}>000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MARQUEE — GSAP loop with scroll-velocity boost.
   Renders a static strip when motion is reduced.
============================================================ */

function Marquee({ children, speed = 1, direction = 'left', className = '' }) {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const totalWidth = track.scrollWidth / 2;
    if (!totalWidth) return;
    const dir = direction === 'left' ? -1 : 1;

    gsap.set(track, { x: direction === 'left' ? 0 : -totalWidth });

    const tween = gsap.to(track, {
      x: dir * -totalWidth,
      duration: totalWidth / (60 * speed),
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x);
          return direction === 'left'
            ? ((val % totalWidth) + totalWidth) % totalWidth - totalWidth
            : val % totalWidth;
        }),
      },
    });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedMult = gsap.utils.clamp(1, 3.5, 1 + velocity / 1000);
        gsap.to(tween, { timeScale: speedMult, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [speed, direction]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap" style={{ willChange: 'transform' }}>
        {children}
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   TEXT REVEAL (word by word, 3D flip up)
============================================================ */

function TextReveal({ children, className = '', tag: Tag = 'div', delay = 0 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const words = el.querySelectorAll('.word-wrap');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '110%', rotateX: -80, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          duration: 1,
          delay,
          stagger: 0.035,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  const words = String(children).split(' ');

  return (
    <Tag ref={ref} className={className} style={{ perspective: '700px' }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="word-wrap inline-block" style={{ willChange: 'transform, opacity' }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ============================================================
   ANIMATED COUNTER
============================================================ */

function AnimatedCounter({ value, suffix = '', className = '' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* ============================================================
   SECTION LABEL — consistent editorial kicker
============================================================ */

function SectionLabel({ children, tone = 'light', className = '' }) {
  const color = tone === 'dark' ? 'text-black/40' : 'text-white/35';
  const line = tone === 'dark' ? 'bg-black/20' : 'bg-white/25';
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`h-px w-10 ${line} section-label-line origin-left`} />
      <span className={`section-label text-[10px] font-semibold uppercase tracking-[0.34em] ${color}`}>
        {children}
      </span>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function PortfolioCaseStudy() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const lenisRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, moved: false });

  const [isLoaded, setIsLoaded] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [activeProject, setActiveProject] = useState('project-01');
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  const nextReview = useCallback(
    () => setReviewIndex((c) => (c + 1) % PROJECT.reviews.length),
    []
  );

  const previousReview = useCallback(
    () => setReviewIndex((c) => (c - 1 + PROJECT.reviews.length) % PROJECT.reviews.length),
    []
  );

  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  /* ==========================================================
     LENIS SMOOTH SCROLL — skipped for reduced motion
  ========================================================== */

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Skip Lenis on mobile for native touch scrolling feel
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ==========================================================
     NAV VISIBILITY — native scroll fallback for reduced motion
     (the animated path lives inside the master GSAP effect)
  ========================================================== */

  useEffect(() => {
    if (!prefersReducedMotion()) return;

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setNavVisible(y < lastY || y > 120);
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ==========================================================
     SMOOTH SCROLL TO ANCHOR (Lenis with native fallback)
  ========================================================== */

  const scrollTo = useCallback((target) => {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset: -72,
        duration: 1.8,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    } else {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  /* ==========================================================
     HERO INTRO — runs once the preloader hands off
  ========================================================== */

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero || !isLoaded || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const heroNumber = hero.querySelector('.hero-number');
      const heroLines = hero.querySelectorAll('.hero-title-line');
      const heroMeta = hero.querySelector('.hero-meta');
      const heroMetaGrid = hero.querySelector('.hero-meta-grid');
      const heroTags = hero.querySelectorAll('.hero-tag');
      const heroMedia = hero.querySelector('.hero-media');
      const heroCaption = hero.querySelector('.hero-caption');
      const heroGlow = hero.querySelector('.hero-glow');
      const scrollHint = hero.querySelector('.scroll-hint');

      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (heroGlow) {
        tl.fromTo(heroGlow, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.8, ease: 'power2.out' }, 0);
      }
      if (heroNumber) {
        tl.fromTo(heroNumber, { y: 26, autoAlpha: 0, filter: 'blur(8px)' }, { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.8 }, 0.05);
      }
      if (heroLines.length) {
        tl.fromTo(heroLines, { y: 125, autoAlpha: 0, skewY: 4 }, { y: 0, autoAlpha: 1, skewY: 0, duration: 1.35, stagger: 0.12 }, 0.15);
      }
      if (heroMedia) {
        tl.fromTo(
          heroMedia,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08, autoAlpha: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, autoAlpha: 1, duration: 1.5 },
          0.35
        );
      }
      if (heroCaption) {
        tl.fromTo(heroCaption, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 1.05);
      }
      if (heroMeta) {
        tl.fromTo(heroMeta, { x: -40, autoAlpha: 0, filter: 'blur(6px)' }, { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.9 }, 0.7);
      }
      if (heroMetaGrid) {
        tl.fromTo(heroMetaGrid, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.85);
      }
      if (heroTags.length) {
        tl.fromTo(heroTags, { y: 22, autoAlpha: 0, scale: 0.92 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.06 }, 0.95);
      }
      if (scrollHint) {
        tl.fromTo(scrollHint, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 1.35);
      }
    }, hero);

    return () => ctx.revert();
  }, [isLoaded]);

  /* ==========================================================
     MASTER SCROLL SYSTEM — reveals, parallax, mask wipes and
     the pinned horizontal books gallery (desktop only).
  ========================================================== */

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main || prefersReducedMotion()) return undefined;

    let refreshFrame = 0;

    const ctx = gsap.context(() => {
      /* ---------- HELPERS ---------- */

      function reveal(element, options = {}) {
        const {
          x = -55,
          y = 12,
          scale = 1,
          rotate = 0,
          duration = 1,
          delay = 0,
          start = 'top 84%',
        } = options;

        if (!element || !element.isConnected) return;

        gsap.fromTo(
          element,
          { x, y, scale, rotate, autoAlpha: 0 },
          {
            x: 0, y: 0, scale: 1, rotate: 0, autoAlpha: 1,
            duration, delay, ease: EASE, overwrite: 'auto',
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      function drawLine(element, start = 'top 88%') {
        if (!element || !element.isConnected) return;

        gsap.fromTo(
          element,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.2, ease: EASE,
            scrollTrigger: { trigger: element, start, once: true, invalidateOnRefresh: true },
          }
        );
      }

      function parallaxEl(element, trigger, options = {}) {
        const { yPercent = 8, scale = 1.04, scrub = 1.2 } = options;
        if (!element || !trigger || !element.isConnected) return;

        gsap.fromTo(
          element,
          { yPercent: -yPercent / 2, scale },
          {
            yPercent: yPercent / 2, scale: 1, ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      function maskWipe(element, options = {}) {
        const { start = 'top 85%', end = 'top 40%', from = 'inset(0% 100% 0% 0%)' } = options;
        if (!element || !element.isConnected) return;

        gsap.fromTo(
          element,
          { clipPath: from },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: element, start, end, scrub: 0.6, invalidateOnRefresh: true },
          }
        );
      }

      /* ---------- SECTION LABEL LINES ---------- */

      main.querySelectorAll('.section-label-line').forEach((line) => drawLine(line, 'top 90%'));

      /* ---------- STORY ---------- */

      const story = main.querySelector('.story-section');
      if (story) {
        reveal(story.querySelector('.section-label'), { x: -45, y: 8, duration: 0.85, rotate: -2 });
        story.querySelectorAll('.reveal-copy').forEach((item, index) => {
          reveal(item, { x: index === 0 ? -40 : 40, y: 15, duration: 0.95, delay: index * 0.1 });
        });
        story.querySelectorAll('.story-fact').forEach((fact, index) => {
          reveal(fact, { x: 0, y: 24, duration: 0.8, delay: index * 0.08, start: 'top 88%' });
        });
        story.querySelectorAll('.deco-line').forEach((line) => drawLine(line, 'top 90%'));
      }

      /* ---------- PHILOSOPHY ---------- */

      const philosophy = main.querySelector('.philosophy-section');
      if (philosophy) {
        reveal(philosophy.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        drawLine(philosophy.querySelector('.philosophy-mark'));

        const philBg = philosophy.querySelector('.phil-bg');
        if (philBg) {
          gsap.fromTo(
            philBg,
            { yPercent: -18 },
            {
              yPercent: 18, ease: 'none',
              scrollTrigger: { trigger: philosophy, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            }
          );
        }

        const philMark = philosophy.querySelector('.phil-quote-mark');
        if (philMark) {
          gsap.fromTo(
            philMark,
            { yPercent: 30, autoAlpha: 0 },
            {
              yPercent: -15, autoAlpha: 1, ease: 'none',
              scrollTrigger: { trigger: philosophy, start: 'top bottom', end: 'bottom top', scrub: 1 },
            }
          );
        }
      }

      /* ---------- STATS ---------- */

      const stats = main.querySelector('.stats-section');
      if (stats) {
        stats.querySelectorAll('.stat-card').forEach((card, i) => {
          reveal(card, {
            x: 0, y: 48, scale: 0.96,
            rotate: i % 2 === 0 ? -1.5 : 1.5,
            duration: 0.9, delay: i * 0.09,
          });
        });
      }

      /* ---------- BOOKS — pinned horizontal gallery on lg ---------- */

      const books = main.querySelector('.books-section');
      if (books) {
        reveal(books.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        const booksHint = books.querySelector('.books-hint');
        if (booksHint) reveal(booksHint, { x: 30, y: 0, duration: 0.8 });

        const mm = gsap.matchMedia();

        mm.add('(min-width: 1024px)', () => {
          const track = books.querySelector('.books-track');
          const viewport = books.querySelector('.books-viewport');
          if (!track || !viewport) return;

          const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

          gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: viewport,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              pin: books,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.fromTo(
            books.querySelectorAll('.cover-card'),
            { y: 60, autoAlpha: 0, rotate: (i) => (i % 2 === 0 ? -2 : 2) },
            { y: 0, autoAlpha: 1, rotate: 0, duration: 0.9, stagger: 0.09, ease: EASE, delay: 0.1 }
          );

          const fill = books.querySelector('.books-progress-fill');
          if (fill) {
            gsap.fromTo(
              fill,
              { scaleX: 0 },
              {
                scaleX: 1, ease: 'none',
                scrollTrigger: {
                  trigger: viewport,
                  start: 'top top',
                  end: () => `+=${getDistance()}`,
                  scrub: 0.4,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          books.querySelectorAll('.cover-card img').forEach((image, index) => {
            parallaxEl(image, books, { yPercent: index % 2 === 0 ? -4 : 4, scale: 1.05, scrub: 1.4 });
          });
        });

        mm.add('(max-width: 1023px)', () => {
          books.querySelectorAll('.cover-card').forEach((card, index) => {
            reveal(card, {
              x: 0, y: 64, scale: 0.96,
              rotate: index % 2 === 0 ? -2.5 : 2.5,
              duration: 1, delay: (index % 2) * 0.1,
              start: 'top 88%',
            });
            const image = card.querySelector('img');
            if (image) parallaxEl(image, card, { yPercent: index % 2 === 0 ? -4 : 4, scale: 1.04 });
          });
        });
      }

      /* ---------- WORK ---------- */

      const work = main.querySelector('.work-section');
      if (work) {
        reveal(work.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        const workCopy = work.querySelector('.work-intro .reveal-copy');
        if (workCopy) reveal(workCopy, { x: 50, y: 12, duration: 0.95 });

        work.querySelectorAll('.work-frame').forEach((frame, index) => {
          reveal(frame, {
            x: index % 2 === 0 ? -55 : 55, y: 30, scale: 0.985,
            rotate: index % 2 === 0 ? -1.2 : 1.2,
            duration: 1.1, delay: index * 0.1, start: 'top 85%',
          });
          const media = frame.querySelector('.work-image');
          if (media) {
            maskWipe(media, {
              start: 'top 85%',
              end: 'top 30%',
              from: index % 2 === 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)',
            });
          }
          const image = frame.querySelector('img');
          if (image) parallaxEl(image, frame, { yPercent: index % 2 === 0 ? 6 : -6, scale: 1.05 });
          const caption = frame.querySelector('.work-caption');
          if (caption) reveal(caption, { x: 0, y: 18, duration: 0.7, delay: 0.15, start: 'top 92%' });
        });
      }

      /* ---------- AUTHORS ---------- */

      const authors = main.querySelector('.authors-section');
      if (authors) {
        reveal(authors.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        authors.querySelectorAll('.author-card').forEach((card, index) => {
          reveal(card, {
            x: index === 0 ? -60 : 60, y: 20,
            rotate: index === 0 ? -1.5 : 1.5,
            duration: 1.05, delay: index * 0.12, start: 'top 84%',
          });
        });
      }

      /* ---------- REVIEWS ---------- */

      const reviews = main.querySelector('.reviews-section');
      if (reviews) {
        reviews.querySelectorAll('.content-reveal').forEach((el, i) => {
          reveal(el, { x: i === 0 ? -55 : 55, y: 15, duration: 1 });
        });
        reviews.querySelectorAll('.review-shell').forEach((card, i) => {
          reveal(card, {
            x: 0, y: 40, scale: 0.97,
            rotate: i % 2 === 0 ? -1 : 1,
            duration: 0.9, delay: i * 0.08, start: 'top 90%',
          });
        });
      }

      /* ---------- SCOPE ---------- */

      const scope = main.querySelector('.scope-section');
      if (scope) {
        reveal(scope.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        scope.querySelectorAll('.scope-row').forEach((row, index) => {
          reveal(row, { x: -40, y: 0, duration: 0.8, delay: index * 0.06, start: 'top 92%' });
        });
      }

      /* ---------- CTA ---------- */

      const cta = main.querySelector('.cta-box');
      if (cta) {
        reveal(cta, { x: 0, y: 60, scale: 0.97, duration: 1.2, start: 'top 84%' });
        cta.querySelectorAll('.cta-item').forEach((item, index) => {
          reveal(item, { x: 0, y: 28, duration: 0.8, delay: index * 0.1, start: 'top 88%' });
        });

        const ctaGlow = cta.querySelector('.cta-glow');
        if (ctaGlow) {
          gsap.to(ctaGlow, {
            scale: 1.25, opacity: 0.65, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
          });
        }
      }

      /* ---------- TIMELINE ---------- */

      const timeline = main.querySelector('.timeline-section');
      if (timeline) {
        reveal(timeline.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        timeline.querySelectorAll('.timeline-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 40, scale: 0.97,
            rotate: index % 2 === 0 ? -1 : 1,
            duration: 0.9, delay: index * 0.08, start: 'top 88%',
          });
        });
      }

      /* ---------- CRAFT & DESIGN SYSTEM ---------- */

      const craft = main.querySelector('.craft-section');
      if (craft) {
        reveal(craft.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        craft.querySelectorAll('.craft-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 45, scale: 0.97,
            duration: 0.9, delay: index * 0.1, start: 'top 88%',
          });
        });
      }

      /* ---------- READER FUNNEL ---------- */

      const funnel = main.querySelector('.funnel-section');
      if (funnel) {
        reveal(funnel.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        funnel.querySelectorAll('.funnel-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 45, scale: 0.97,
            duration: 0.9, delay: index * 0.1, start: 'top 88%',
          });
        });
      }

      /* ---------- FOOTER ---------- */

      const footer = main.querySelector('.site-footer');
      if (footer) reveal(footer, { x: 0, y: 20, duration: 0.8 });

      /* ---------- PROJECT 2 — INTRODUCTION ---------- */

      const p2Intro = main.querySelector('.p2-intro-section');
      if (p2Intro) {
        reveal(p2Intro.querySelector('.p2-intro-number'), { x: 0, y: 30, duration: 0.9 });
        p2Intro.querySelectorAll('.p2-intro-title, .p2-intro-title-muted').forEach((line, i) => {
          reveal(line, { x: -80 + i * 30, y: 50, duration: 1.4, delay: 0.1 + i * 0.1 });
        });
        reveal(p2Intro.querySelector('.p2-intro-summary'), { x: -40, y: 20, duration: 1, delay: 0.3 });
        reveal(p2Intro.querySelector('.p2-intro-meta'), { x: 40, y: 30, duration: 1.1, delay: 0.2 });
        const introTags = p2Intro.querySelectorAll('.p2-intro-tag');
        gsap.from(introTags, { y: 20, opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.5, scrollTrigger: { trigger: p2Intro, start: 'top 85%' } });
      }

      /* ---------- PROJECT 2 — HERO ---------- */

      const p2Hero = main.querySelector('.project-two-hero');
      if (p2Hero) {
        const heroText = p2Hero.querySelector('.p2-hero-text');
        if (heroText) {
          reveal(heroText.querySelector('.p2-hero-number'), { x: 0, y: 30, duration: 0.9 });
          heroText.querySelectorAll('.p2-hero-title-line').forEach((line, i) => {
            reveal(line, { x: -60 + i * 20, y: 40, duration: 1.2, delay: 0.08 + i * 0.08 });
          });
          reveal(heroText.querySelector('.p2-hero-meta'), { x: -40, y: 20, duration: 1, delay: 0.18 });
          const metaGrid = heroText.querySelector('.p2-hero-meta-grid');
          if (metaGrid) reveal(metaGrid, { x: 0, y: 24, duration: 0.9, delay: 0.25 });
          const heroTags = heroText.querySelectorAll('.p2-hero-tag');
          gsap.from(heroTags, { x: -30, opacity: 0, duration: 0.7, stagger: 0.05, delay: 0.35, scrollTrigger: { trigger: heroText, start: 'top 90%' } });
        }
        const heroMedia = p2Hero.querySelector('.p2-hero-media');
        if (heroMedia) {
          reveal(heroMedia, { x: 60, y: 40, scale: 0.95, duration: 1.3 });
          gsap.from(heroMedia.querySelector('img'), { scale: 1.2, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: heroMedia, start: 'top 80%' } });
          reveal(heroMedia.querySelector('.p2-hero-caption'), { x: 0, y: 20, duration: 0.8, delay: 0.4 });
        }
      }

      /* ---------- PROJECT 2 — COVER SHOWCASE ---------- */

      const p2Cover = main.querySelector('.p2-cover-section');
      if (p2Cover) {
        reveal(p2Cover.querySelector('.section-label'), { x: 0, y: 20, duration: 0.8 });
        const coverFrame = p2Cover.querySelector('.p2-cover-frame');
        if (coverFrame) {
          reveal(coverFrame, { x: 0, y: 60, scale: 0.96, duration: 1.3, start: 'top 82%' });
          const coverImg = coverFrame.querySelector('.p2-cover-image');
          if (coverImg) {
            gsap.from(coverImg, { scale: 1.15, duration: 2.5, ease: 'power2.out', scrollTrigger: { trigger: coverFrame, start: 'top 80%' } });
          }
        }
      }

      /* ---------- PROJECT 2 — STORY ---------- */

      const p2Story = main.querySelector('.p2-story-section');
      if (p2Story) {
        reveal(p2Story.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        p2Story.querySelectorAll('.p2-story-fact').forEach((fact, i) => {
          reveal(fact, { x: -30, y: 15, duration: 0.8, delay: i * 0.1 });
        });
        p2Story.querySelectorAll('.p2-deco-line').forEach((line) => {
          gsap.from(line, { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: line, start: 'top 85%' } });
        });
        p2Story.querySelectorAll('.p2-reveal-copy').forEach((p, i) => {
          reveal(p, { x: i === 0 ? -40 : 40, y: 20, duration: 1, delay: i * 0.12 });
        });
      }

      /* ---------- PROJECT 2 — PHILOSOPHY ---------- */

      const p2Phil = main.querySelector('.p2-philosophy-section');
      if (p2Phil) {
        reveal(p2Phil.querySelector('.section-label'), { x: 0, y: 20, duration: 0.8 });
        const mark = p2Phil.querySelector('.p2-philosophy-mark');
        if (mark) gsap.from(mark, { scaleX: 0, transformOrigin: 'left center', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: mark, start: 'top 88%' } });
        reveal(p2Phil.querySelector('.p2-phil-quote-mark'), { x: -20, y: 30, duration: 1, delay: 0.05 });
        const quoteBg = p2Phil.querySelector('.p2-phil-bg');
        if (quoteBg) gsap.to(quoteBg, { x: -80, y: 30, ease: 'none', scrollTrigger: { trigger: p2Phil, scrub: 1.2 } });
      }

      /* ---------- PROJECT 2 — STATS ---------- */

      const p2Stats = main.querySelector('.p2-stats-section');
      if (p2Stats) {
        p2Stats.querySelectorAll('.p2-stat-card').forEach((card, i) => {
          reveal(card, {
            x: 0, y: 48, scale: 0.96,
            rotate: i % 2 === 0 ? -1.5 : 1.5,
            duration: 0.9, delay: i * 0.09,
          });
        });
      }

      /* ---------- PROJECT 2 — SOLUTION ---------- */

      const p2Solution = main.querySelector('.p2-solution-section');
      if (p2Solution) {
        reveal(p2Solution.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        const solutionCards = p2Solution.querySelectorAll('.p2-solution-card');
        solutionCards.forEach((card, i) => {
          reveal(card, { x: 0, y: 50, scale: 0.97, duration: 0.9, delay: i * 0.08 });
        });
      }

      /* ---------- PROJECT 2 — MOCKUP (THE EXPERIENCE) ---------- */

      const p2Mockup = main.querySelector('.p2-mockup-section');
      if (p2Mockup) {
        reveal(p2Mockup.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        const mockupCard = p2Mockup.querySelector('.p2-mockup-card');
        if (mockupCard) {
          reveal(mockupCard, { x: 0, y: 70, scale: 0.97, duration: 1.3, start: 'top 80%' });
          const mockupImg = mockupCard.querySelector('.p2-mockup-image');
          if (mockupImg) {
            gsap.from(mockupImg, { scale: 1.1, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: mockupCard, start: 'top 75%' } });
          }
        }
      }

      /* ---------- PROJECT 2 — AUTHOR ---------- */

      const p2Author = main.querySelector('.p2-author-section');
      if (p2Author) {
        reveal(p2Author.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        reveal(p2Author.querySelector('.p2-author-card'), { x: 0, y: 55, scale: 0.98, duration: 1.1 });
      }

      /* ---------- PROJECT 2 — SCOPE ---------- */

      const p2Scope = main.querySelector('.p2-scope-section');
      if (p2Scope) {
        reveal(p2Scope.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        p2Scope.querySelectorAll('.p2-scope-row').forEach((row, index) => {
          reveal(row, { x: -40, y: 0, duration: 0.8, delay: index * 0.06, start: 'top 92%' });
        });
      }

      /* ---------- PROJECT 2 — NARRATIVE ARCHITECTURE ---------- */

      const p2Narrative = main.querySelector('.p2-narrative-section');
      if (p2Narrative) {
        reveal(p2Narrative.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        p2Narrative.querySelectorAll('.p2-narrative-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 45, scale: 0.97,
            duration: 0.9, delay: index * 0.1, start: 'top 88%',
          });
        });
      }

      /* ---------- PROJECT 2 — AMAZON A+ STRATEGY ---------- */

      const p2Aplus = main.querySelector('.p2-aplus-section');
      if (p2Aplus) {
        reveal(p2Aplus.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        p2Aplus.querySelectorAll('.p2-aplus-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 45, scale: 0.97,
            duration: 0.9, delay: index * 0.1, start: 'top 88%',
          });
        });
      }

      /* ---------- PROJECT 2 — MARKETING ECOSYSTEM ---------- */

      const p2Ecosystem = main.querySelector('.p2-ecosystem-section');
      if (p2Ecosystem) {
        reveal(p2Ecosystem.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        p2Ecosystem.querySelectorAll('.p2-ecosystem-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 45, scale: 0.97,
            duration: 0.9, delay: index * 0.08, start: 'top 88%',
          });
        });
      }

      /* ---------- PROJECT 2 — RESULTS ---------- */

      const p2Results = main.querySelector('.p2-results-section');
      if (p2Results) {
        reveal(p2Results.querySelector('.section-label'), { x: 0, y: 20, duration: 0.8 });
      }

      /* ---------- PROJECT 2 — CTA ---------- */

      const p2Cta = main.querySelector('.p2-cta-section .p2-cta-box');
      if (p2Cta) {
        reveal(p2Cta, { x: 0, y: 60, scale: 0.97, duration: 1.2, start: 'top 84%' });
        const p2CtaGlow = p2Cta.querySelector('.p2-cta-glow');
        if (p2CtaGlow) {
          gsap.to(p2CtaGlow, {
            scale: 1.25, opacity: 0.65, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
          });
        }
        gsap.from(p2Cta.querySelectorAll('.p2-cta-item'), { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, delay: 0.3, scrollTrigger: { trigger: p2Cta, start: 'top 80%' } });
      }

      /* ---------- PROJECT 2 — FOOTER ---------- */

      const p2Footer = main.querySelector('.p2-footer');
      if (p2Footer) reveal(p2Footer, { x: 0, y: 20, duration: 0.8 });

      /* ---------- NAV VISIBILITY ---------- */

      ScrollTrigger.create({
        trigger: main,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setNavVisible(self.direction === -1 || self.scroll() > 120);
        },
      });

      refreshFrame = requestAnimationFrame(() => {
        if (main.isConnected) ScrollTrigger.refresh();
      });
    }, main);

    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, []);

  /* ==========================================================
     ACTIVE SECTION TRACKING (nav highlighting)
  ========================================================== */

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const triggers = NAV_LINKS.map(({ target }) => {
      const el = document.querySelector(target);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(target);
        },
      });
    });

    return () => triggers.forEach((t) => t && t.kill());
  }, []);

  /* ==========================================================
     ACTIVE PROJECT TRACKING (for project switcher)
  ========================================================== */

  useEffect(() => {
    const p2Hero = document.querySelector('#sea-stone');
    if (!p2Hero) return;

    const trigger = ScrollTrigger.create({
      trigger: p2Hero,
      start: 'top 55%',
      onEnter: () => setActiveProject('project-02'),
      onLeaveBack: () => setActiveProject('project-01'),
    });

    return () => trigger.kill();
  }, []);

  /* ==========================================================
     MODAL — escape key, scroll lock, Lenis pause
  ========================================================== */

  useLayoutEffect(() => {
    if (!selectedReview) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedReview(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    lenisRef.current?.stop();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      lenisRef.current?.start();
    };
  }, [selectedReview]);

  /* ==========================================================
     REVIEWS — pointer drag support (mouse + touch)
  ========================================================== */

  const handleDragStart = useCallback((e) => {
    dragRef.current = { active: true, startX: e.clientX, moved: false };
  }, []);

  const handleDragMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    if (Math.abs(e.clientX - drag.startX) > 12) drag.moved = true;
  }, []);

  const handleDragEnd = useCallback(
    (e) => {
      const drag = dragRef.current;
      if (!drag.active) return;
      drag.active = false;
      const delta = e.clientX - drag.startX;
      if (Math.abs(delta) > 65) {
        if (delta < 0) nextReview();
        else previousReview();
      }
    },
    [nextReview, previousReview]
  );

  const openReview = useCallback((review) => {
    if (dragRef.current.moved) return;
    setSelectedReview(review);
  }, []);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Preloader onComplete={handlePreloaderDone} />

      <main
        ref={mainRef}
        className="relative min-h-screen overflow-x-clip bg-[#090909] text-white selection:bg-white selection:text-black"
      >
        {/* ====== PORTFOLIO NAVIGATION ====== */}

        <nav
          className={`portfolio-nav fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-700 sm:px-6 sm:pt-5 ${
            navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
          style={{ transitionTimingFunction: EASE_CSS }}
        >
          <div className="mx-auto max-w-[1400px]">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/85 px-5 py-3 shadow-2xl backdrop-blur-2xl">
                {/* Left: Portfolio Link */}
                <Link
                  href="/"
                  className="group flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 transition-all duration-500 hover:text-white"
                >
                  <ArrowLeft className="h-3 w-3 transition-transform duration-500 group-hover:-translate-x-0.5" />
                  Portfolio
                </Link>

                {/* Center: Project Switcher */}
                <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
                  {PROJECT_NAV.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setActiveProject(project.id);
                        scrollTo(project.target);
                      }}
                      className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-500 ${
                        activeProject === project.id
                          ? 'bg-white text-black shadow-lg'
                          : 'text-white/45 hover:text-white/80'
                      }`}
                    >
                      <span className="font-semibold">{project.label}</span>
                      <span className="hidden sm:inline">{project.title}</span>
                    </button>
                  ))}
                </div>

                {/* Right: Active Section + Live Link */}
                <div className="flex items-center gap-5">
                  {activeSection && (
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      {activeSection.replace('#', '')}
                    </span>
                  )}
                  <MagneticWrap strength={0.25} className="shrink-0">
                    <a
                      href={activeProject === 'project-01' ? PROJECT.website : PROJECT_TWO.website}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-500 hover:border-white/25 hover:bg-white hover:text-black"
                    >
                      <span className="hidden sm:inline">Visit</span>
                      <span className="sm:hidden">Live</span>
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </MagneticWrap>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <div className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-[#0a0a0a]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-2xl">
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/50"
                >
                  <ArrowLeft className="h-2.5 w-2.5" />
                  <span>Back</span>
                </Link>

                <div className="flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] p-0.5">
                  {PROJECT_NAV.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        setActiveProject(project.id);
                        scrollTo(project.target);
                      }}
                      className={`rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
                        activeProject === project.id
                          ? 'bg-white text-black'
                          : 'text-white/40'
                      }`}
                    >
                      {project.label}
                    </button>
                  ))}
                </div>

                <a
                  href={activeProject === 'project-01' ? PROJECT.website : PROJECT_TWO.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/50"
                >
                  <span>Live</span>
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* ====== HERO ====== */}

        <section
          id="hero"
          ref={heroRef}
          className="relative flex min-h-screen items-end overflow-hidden px-5 pb-10 pt-28 sm:px-6 md:pb-16 lg:items-center lg:pt-0"
        >
          <div className="hero-glow absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[110px] sm:h-[600px] sm:w-[600px]" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(255,255,255,.07),transparent_38%)]" />
          <FloatingParticles />

          <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-14">
            <div className="hero-text-block order-2 lg:order-1">
              <div className="mb-6 overflow-hidden">
                <div className="hero-number flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                  <span>Case Study {PROJECT.number}</span>
                  <span className="h-px w-8 bg-white/20" />
                  <span className="text-white/25">{PROJECT.label}</span>
                </div>
              </div>

              <h1 className="sr-only">
                {PROJECT.title} {PROJECT.mutedTitle} — Case Study {PROJECT.number}
              </h1>

              <div className="overflow-hidden">
                <div className="hero-title-line text-[clamp(3rem,9.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                  {PROJECT.title}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="hero-title-line text-[clamp(3rem,9.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white/25">
                  {PROJECT.mutedTitle}
                </div>
              </div>

              <p className="hero-meta mt-7 max-w-xl text-sm leading-7 text-white/50 md:text-base md:leading-8">
                {PROJECT.intro}
              </p>

              <div className="hero-meta-grid mt-8 grid max-w-xl grid-cols-3 gap-4 border-y border-white/10 py-5">
                {[
                  { label: 'Client', value: 'A. E. Fábregas & S. B. Brieva' },
                  { label: 'Year', value: PROJECT.year },
                  { label: 'Role', value: 'Design & Development' },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{item.label}</div>
                    <div className="mt-1.5 text-[11px] font-medium leading-5 text-white/70 sm:text-xs">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {['Author Website', 'Book Experience', 'Editorial Design', 'Reader Journey'].map((item) => (
                  <span
                    key={item}
                    className="hero-tag rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] hover:text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-media relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl lg:order-2">
              <Image
                src={PROJECT.hero}
                alt="Entre el Amor y las Sombras — hero cover"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="hero-caption absolute bottom-4 left-4 right-4 flex items-end justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">{PROJECT.client}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{PROJECT.year}</span>
              </div>
            </div>
          </div>

          <div className="scroll-hint absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/30 lg:flex">
            <span>Scroll to explore</span>
            <ArrowDown className="h-3 w-3 animate-bounce" />
            <div className="mt-1 h-12 w-px bg-gradient-to-b from-white/25 to-transparent" />
          </div>
        </section>

        {/* ====== MARQUEE ====== */}

        <Marquee speed={0.8} className="border-y border-white/10 bg-[#0c0c0c] py-5">
          {['Author Platform', 'Book Experience', 'Editorial Design', 'Visual Storytelling', 'Reader Journey', 'Digital Identity'].map((text, i) => (
            <span key={i} className="mx-8 flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-white/25">
              <Sparkles className="h-3 w-3" />
              {text}
            </span>
          ))}
        </Marquee>

        {/* ====== PROJECT STRIP — next case study teaser ====== */}

        <section className="project-strip border-b border-white/10 bg-[#0c0c0c] py-7">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
            <div className="flex min-w-0 items-center gap-4">
              <span className="shrink-0 text-[10px] tracking-[0.25em] text-white/25">
                PROJECT {PROJECT_TWO.number}
              </span>
              <span className="h-px w-10 shrink-0 bg-white/10" />
              <span className="truncate text-xs text-white/45">
                {PROJECT_TWO.title} {PROJECT_TWO.mutedTitle}
              </span>
            </div>
            <Sparkles className="h-4 w-4 shrink-0 text-white/25" />
          </div>
        </section>

        {/* ====== STORY ====== */}

        <section id="story" className="story-section px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div>
              <SectionLabel>The Story</SectionLabel>
              <div className="mt-8 hidden flex-col gap-6 lg:flex">
                {[
                  { label: 'Sector', value: 'Publishing & Literature' },
                  { label: 'Platform', value: 'Author Website & Book Experience' },
                  { label: 'Outcome', value: '5★ rated reader journey on launch' },
                ].map((fact) => (
                  <div key={fact.label} className="story-fact border-l border-white/10 pl-5">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{fact.label}</div>
                    <div className="mt-1.5 text-sm leading-6 text-white/60">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10 md:space-y-12">
              <TextReveal
                tag="h2"
                className="max-w-5xl text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                A story built from more than fifty years of life memory and everything that happened between the photographs.
              </TextReveal>

              <div className="deco-line h-px w-full origin-left bg-white/10" />

              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                <p className="reveal-copy text-sm leading-7 text-white/45 md:text-base md:leading-8">
                  {PROJECT.story}
                </p>
                <p className="reveal-copy text-sm leading-7 text-white/45 md:text-base md:leading-8">
                  {PROJECT.challenge}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:hidden">
                {[
                  { label: 'Sector', value: 'Publishing & Literature' },
                  { label: 'Platform', value: 'Author Website & Book Experience' },
                  { label: 'Outcome', value: '5★ rated reader journey on launch' },
                ].map((fact) => (
                  <div key={fact.label} className="story-fact rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{fact.label}</div>
                    <div className="mt-1.5 text-xs leading-5 text-white/60">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== PHILOSOPHY ====== */}

        <section className="philosophy-section relative overflow-hidden border-y border-white/10 bg-[#111] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="phil-bg pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/[0.025] blur-[100px] md:h-[560px] md:w-[560px]" />
          <span className="phil-quote-mark pointer-events-none absolute -top-8 left-4 select-none font-serif text-[8rem] leading-none text-white/[0.03] sm:text-[11rem] md:left-10 md:text-[18rem]">
            &ldquo;
          </span>

          <div className="relative mx-auto max-w-6xl">
            <SectionLabel>Philosophy</SectionLabel>
            <div className="philosophy-mark mt-8 h-px w-20 origin-left bg-white/25" />

            <TextReveal
              tag="blockquote"
              className="mt-10 max-w-5xl text-2xl font-medium leading-snug tracking-tight text-white/85 sm:text-3xl md:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              {`"${PROJECT.philosophy}"`}
            </TextReveal>

            <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/30">
              <span className="h-px w-8 bg-white/20" />
              <span>The guiding thought behind the design</span>
            </div>
          </div>
        </section>

        {/* ====== TIMELINE / HISTORICAL ARC ====== */}

        <section className="timeline-section border-t border-white/10 bg-[#0c0c0c] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <SectionLabel>Historical Arc</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Fifty years of living memory.
                </TextReveal>
                <p className="mt-2 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-white/20 sm:text-5xl md:text-6xl">
                  Preserved for the next generation.
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                A chronological narrative connecting Havana, Madrid, and Valencia into a unified literary legacy.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {PROJECT.timeline.map((item, i) => (
                <article
                  key={item.era}
                  className="timeline-card group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#111] p-6 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.04] md:p-8"
                >
                  <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">
                      Epoch 0{i + 1}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-bold tracking-wider text-white/80 transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                      {item.era}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-white/45 md:text-sm md:leading-7">
                    {item.desc}
                  </p>
                  <div className="mt-6 h-px w-0 bg-gradient-to-r from-white/30 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== STATS ====== */}

        <section className="stats-section border-b border-white/10 bg-[#0c0c0c] px-5 py-16 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              { value: 3, suffix: '', label: 'Books Published' },
              { value: 50, suffix: '+', label: 'Years of History' },
              { value: 5, suffix: '★', label: 'Reader Rating' },
              { value: 100, suffix: '%', label: 'Custom Design' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="stat-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition-all duration-700 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] md:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-2xl font-bold tabular-nums text-white/90 md:text-4xl"
                />
                <div className="mt-3 text-[9px] uppercase tracking-[0.22em] text-white/30 md:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== BOOKS — pinned horizontal gallery / responsive grid ====== */}

        <section id="books" className="books-section relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:pb-14 lg:pt-28">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <SectionLabel>The Trilogy</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl"
                >
                  Three books. One life.
                </TextReveal>
              </div>
              <div className="books-hint hidden items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/30 lg:flex">
                <span>Scroll to move through the shelf</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="books-viewport relative lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
            <div className="books-track grid grid-cols-1 gap-5 px-5 pb-16 sm:grid-cols-2 sm:px-6 lg:flex lg:w-max lg:items-center lg:gap-6 lg:px-[max(2.5rem,calc((100vw-80rem)/2))] lg:pb-0">
              {PROJECT.books.map((book, i) => (
                <article
                  key={book.title}
                  className="cover-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] p-3 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:shadow-2xl lg:w-[22rem] lg:shrink-0 lg:hover:-translate-y-3"
                >
                  <div className="book-image relative aspect-[3/4] overflow-hidden rounded-[1.1rem]">
                    <Image
                      src={PROJECT.covers[i]}
                      alt={book.title}
                      fill
                      sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 352px"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:opacity-0" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <Eye className="h-8 w-8 text-white/80" />
                    </div>
                  </div>

                  <div className="book-content p-4 md:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                        0{i + 1} / 04
                      </span>
                      <span className="h-px w-6 bg-white/15 transition-all duration-500 group-hover:w-10 group-hover:bg-white/40" />
                    </div>
                    <h3 className="text-base font-semibold leading-snug transition-colors duration-500 group-hover:text-white md:text-lg">
                      {book.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-6 text-white/40">{book.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="books-progress absolute bottom-7 left-1/2 hidden w-64 -translate-x-1/2 lg:block" aria-hidden="true">
              <div className="h-px w-full overflow-hidden bg-white/10">
                <div className="books-progress-fill h-full w-full origin-left scale-x-0 bg-white/70" />
              </div>
            </div>
          </div>
        </section>

        {/* ====== MARQUEE 2 ====== */}

        <Marquee speed={0.6} direction="right" className="border-y border-white/10 bg-[#0c0c0c] py-4">
          {PROJECT.books.map((book, i) => (
            <span key={i} className="mx-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/20">
              <Star className="h-3 w-3 fill-white/10 text-white/10" />
              {book.title}
            </span>
          ))}
        </Marquee>

        {/* ====== WORK — light editorial showcase ====== */}

        <section id="work" className="work-section overflow-hidden bg-[#eae8e2] px-5 py-24 text-[#111] sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="work-intro mb-16 grid gap-10 lg:mb-24 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
              <div>
                <SectionLabel tone="dark">The Work</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="mt-6 max-w-5xl text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
                >
                  A digital world built around the story.
                </TextReveal>
              </div>
              <p className="reveal-copy max-w-sm text-sm leading-7 text-black/50">
                Rather than presenting the website as a conventional collection of screenshots, the interface becomes an editorial canvas where every visual has its own rhythm.
              </p>
            </div>

            <div className="work-frame relative mb-6 overflow-hidden rounded-[2rem] bg-[#dedbd3] p-2.5 shadow-2xl md:mb-10 md:p-5">
              <div className="work-image relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-black md:rounded-[2rem]">
                <Image
                  src={PROJECT.mockups[0]}
                  alt="Main website experience"
                  fill
                  sizes="(max-width: 1023px) 100vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="work-caption flex flex-col justify-between gap-4 px-2 py-4 md:flex-row md:items-center md:px-5 md:py-5">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">01 / Digital Identity</span>
                  <p className="mt-2 text-sm text-black/60">The central experience connects literature, memory and discovery.</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">Desktop Experience</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[.72fr_1.28fr] md:items-start md:gap-10">
              <div className="work-frame md:mt-24">
                <div className="overflow-hidden rounded-[1.8rem] bg-[#dedbd3] p-2.5 shadow-xl md:p-3">
                  <div className="work-image relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-black">
                    <Image
                      src={PROJECT.mockups[1]}
                      alt="Website editorial detail"
                      fill
                      sizes="(max-width: 767px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="work-caption px-2 py-4 md:py-5">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">02 / Editorial Detail</span>
                    <p className="mt-2 text-sm leading-6 text-black/55">Quiet typography and generous composition keep the story at the center.</p>
                  </div>
                </div>
              </div>

              <div className="work-frame">
                <div className="overflow-hidden rounded-[2rem] bg-[#dedbd3] p-2.5 shadow-xl md:p-5">
                  <div className="work-image relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-black md:rounded-[2rem]">
                    <Image
                      src={PROJECT.mockups[2]}
                      alt="Website responsive presentation"
                      fill
                      sizes="(max-width: 767px) 100vw, 65vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="work-caption flex flex-col justify-between gap-4 px-2 py-4 md:flex-row md:items-center md:px-1 md:py-5">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">03 / Reader Journey</span>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-black/55">The interface guides visitors naturally from the visual archive into the books and authors.</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">Responsive System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== EDITORIAL CRAFT & DESIGN SYSTEM ====== */}

        <section className="craft-section border-t border-white/10 bg-[#111] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <SectionLabel>Design & Craft</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Crafted like a museum archive.
                </TextReveal>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                Every interface component, typography choice, and color palette decision was tailored to respect the emotional gravitas of the authors&apos; history.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {PROJECT.craftPillars.map((pillar, i) => (
                <article
                  key={pillar.title}
                  className="craft-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.045] hover:shadow-2xl md:p-10"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                      Pillar 0{i + 1}
                    </span>
                    <Sparkles className="h-4 w-4 text-white/20 transition-all duration-500 group-hover:scale-110 group-hover:text-white/60" />
                  </div>
                  <h3 className="text-xl font-semibold transition-colors duration-500 group-hover:text-white md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {pillar.desc}
                  </p>
                  <div className="mt-8 h-px w-0 bg-gradient-to-r from-white/30 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== AUTHORS ====== */}

        <section className="authors-section px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 md:mb-16">
              <SectionLabel>The Authors</SectionLabel>
              <TextReveal
                tag="h2"
                className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Two voices. One shared history.
              </TextReveal>
            </div>

            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {PROJECT.authors.map((author, i) => (
                <article
                  key={author.name}
                  className="author-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-12"
                >
                  <span className="pointer-events-none absolute -bottom-8 -right-2 select-none text-[8rem] font-semibold leading-none text-white/[0.03] transition-colors duration-700 group-hover:text-white/[0.06] md:text-[11rem]">
                    0{i + 1}
                  </span>

                  <div className="mb-10 flex items-center justify-between md:mb-12">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Author 0{i + 1}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60" />
                  </div>
                  <h3 className="relative text-2xl font-semibold transition-colors duration-500 group-hover:text-white md:text-3xl">
                    {author.name}
                  </h3>
                  <p className="relative mt-5 max-w-lg text-sm leading-7 text-white/45">{author.text}</p>
                  <div className="relative mt-8 h-px w-0 bg-gradient-to-r from-white/25 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== REVIEWS — draggable carousel ====== */}

        <section
          id="reviews"
          className="reviews-section overflow-hidden border-t border-white/10 bg-[#0a0a0a] px-5 py-20 sm:px-6 md:py-28 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-8 md:mb-14 md:flex-row md:items-end">
              <div className="content-reveal">
                <SectionLabel>Reader Feedback</SectionLabel>
                <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
                  Real words.
                  <span className="block text-white/20">Real readers.</span>
                </h2>
              </div>

              <div className="content-reveal flex items-end gap-6">
                <p className="max-w-sm text-sm leading-relaxed text-white/40">
                  The story continued beyond the pages through the people who discovered it, read it and shared their experience.
                </p>
                <div className="hidden shrink-0 gap-2 sm:flex">
                  <MagneticWrap strength={0.4}>
                    <button
                      type="button"
                      onClick={previousReview}
                      aria-label="Previous review"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/50 transition-all duration-500 hover:border-white/30 hover:bg-white hover:text-black"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                  </MagneticWrap>
                  <MagneticWrap strength={0.4}>
                    <button
                      type="button"
                      onClick={nextReview}
                      aria-label="Next review"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/50 transition-all duration-500 hover:border-white/30 hover:bg-white hover:text-black"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </MagneticWrap>
                </div>
              </div>
            </div>

            <div
              className="relative cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerLeave={handleDragEnd}
            >
              <div
                className="flex gap-4 transition-transform duration-700"
                style={{
                  transform: `translate3d(calc(-${reviewIndex} * (min(88vw, 390px) + 1rem)), 0, 0)`,
                  transitionTimingFunction: EASE_CSS,
                }}
              >
                {PROJECT.reviews.map((review, index) => (
                  <article
                    key={review.id}
                    className="review-shell group w-[min(88vw,390px)] shrink-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] transition-all duration-700 hover:-translate-y-2 hover:border-white/25"
                  >
                    <button
                      type="button"
                      onClick={() => openReview(review)}
                      className="relative block w-full cursor-zoom-in overflow-hidden border-b border-white/10 bg-black text-left"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={review.image}
                          alt={`Original reader review ${index + 1}`}
                          fill
                          sizes="390px"
                          className="object-contain p-2 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                          draggable={false}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-xl transition-all duration-500 group-hover:bg-white group-hover:text-black">
                          <Eye className="h-3 w-3" />
                          View Original
                        </div>
                      </div>
                    </button>

                    <div className="flex min-h-[220px] flex-col p-5">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-white text-white" />
                          ))}
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">0{index + 1}</span>
                      </div>
                      <blockquote className="text-sm font-medium leading-6 text-white/80">
                        &ldquo;{review.text}&rdquo;
                      </blockquote>
                      <div className="mt-auto pt-6">
                        <div className="text-xs font-semibold text-white/75">{review.name}</div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/25">
                          {review.platform}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex flex-1 gap-1.5">
                {PROJECT.reviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReviewIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      i === reviewIndex ? 'bg-white/60' : 'bg-white/10 hover:bg-white/25'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/25 tabular-nums">
                {String(reviewIndex + 1).padStart(2, '0')} / {String(PROJECT.reviews.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-4 flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={previousReview}
                aria-label="Previous review"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:bg-white hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Next review"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:bg-white hover:text-black"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/20">
              <Eye className="h-3 w-3" />
              <span>Click a review image to view the original — drag to browse</span>
            </div>
          </div>
        </section>

        {/* ====== REVIEW MODAL ====== */}

        {selectedReview && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-5 md:p-8"
            onClick={() => setSelectedReview(null)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            role="dialog"
            aria-modal="true"
            aria-label={`Original review from ${selectedReview.name}`}
          >
            <div
              className="relative flex max-h-[94vh] w-full max-w-6xl items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] shadow-2xl md:rounded-[2rem]"
              onClick={(e) => e.stopPropagation()}
              style={{ animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              <MagneticWrap strength={0.3} className="absolute right-3 top-3 z-30">
                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  aria-label="Close review"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/70 backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
              </MagneticWrap>
              <div className="max-h-[94vh] w-full overflow-auto p-4 sm:p-6 md:p-10">
                <div className="relative mx-auto w-full max-w-5xl">
                  <Image
                    src={selectedReview.image}
                    alt={`Original review from ${selectedReview.name}`}
                    width={2000}
                    height={1500}
                    priority
                    className="mx-auto h-auto max-h-[82vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====== READER DISCOVERY FUNNEL ====== */}

        <section className="funnel-section border-t border-white/10 bg-[#090909] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <SectionLabel>Reader Journey</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Converting interest into readership.
                </TextReveal>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                A structured three-step experience designed to welcome readers, establish trust, and drive book purchases on Amazon España.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {PROJECT.funnelSteps.map((step, i) => (
                <article
                  key={step.title}
                  className="funnel-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.04] md:p-10"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[9px] uppercase tracking-[0.25em] text-white/40">
                      Stage {step.step}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/70" />
                  </div>
                  <h3 className="text-xl font-semibold transition-colors duration-500 group-hover:text-white md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {step.desc}
                  </p>
                  <div className="mt-8 h-px w-0 bg-gradient-to-r from-white/30 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SCOPE ====== */}

        <section className="scope-section px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionLabel>Scope</SectionLabel>
              <TextReveal
                tag="h2"
                className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
              >
                Every touchpoint connected.
              </TextReveal>
            </div>

            <div>
              {PROJECT.deliverables.map((item, i) => (
                <div
                  key={item}
                  className="scope-row group flex items-start gap-4 border-b border-white/10 py-5 transition-all duration-500 hover:border-white/25 hover:pl-2 md:py-6"
                >
                  <span className="pt-1 text-[10px] tabular-nums text-white/20 transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all duration-500 group-hover:scale-110 group-hover:text-white/60" />
                  <span className="text-sm leading-6 text-white/60 transition-colors duration-500 group-hover:text-white/85 md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}

        <section className="cta-section px-5 pb-14 sm:px-6 md:pb-20">
          <div className="cta-box relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] px-5 py-20 text-center sm:px-6 md:px-12 md:py-28 lg:py-32">
            <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[280px] w-[280px] rounded-full bg-white/[0.05] blur-[80px] md:h-[340px] md:w-[340px]" />
            </div>

            <FloatingParticles count={16} />

            <Sparkles className="cta-item relative mx-auto h-5 w-5 text-white/30" />
            <h2 className="cta-item relative mx-auto mt-7 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
              Explore the story beyond the case study.
            </h2>
            <p className="cta-item relative mx-auto mt-6 max-w-xl text-sm leading-7 text-white/40">
              Visit the live author platform to explore the trilogy, the authors, their history and the reader journey.
            </p>

            <div className="cta-item relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticWrap strength={0.25}>
                <a
                  href={PROJECT.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-500 hover:scale-[1.04] hover:shadow-lg hover:shadow-white/20"
                >
                  <Globe className="h-4 w-4" />
                  Visit Author Website
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </MagneticWrap>

              <MagneticWrap strength={0.25}>
                <button
                  type="button"
                  onClick={() => scrollTo('#books')}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/5"
                >
                  Explore Books
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </MagneticWrap>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}

        <footer className="site-footer border-t border-white/10 px-5 py-8 sm:px-6 md:py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 text-[10px] uppercase tracking-[0.2em] text-white/25 md:flex-row md:items-center">
            <span>Project 01 — Entre el Amor y las Sombras</span>
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/40 transition-colors duration-500 hover:text-white"
            >
              <ArrowLeft className="h-3 w-3 transition-transform duration-500 group-hover:-translate-x-0.5" />
              Back to BigTeeWise
            </Link>
            <span>Case Study / {PROJECT.year}</span>
          </div>
        </footer>

        {/* ============================================================
           PROJECT 02 — THE SEA STONE SISTERS
        ============================================================ */}

        {/* ====== PROJECT 2 — INTRODUCTION ====== */}

        <section className="p2-intro-section relative overflow-hidden border-y border-white/10 bg-[#0a1628] px-5 py-28 sm:px-6 md:py-36 lg:py-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,.04),transparent_50%)]" />
          <FloatingParticles count={20} />

          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
              <div className="md:max-w-3xl">
                <div className="p2-intro-number mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                  <span>Project {PROJECT_TWO.number}</span>
                  <span className="h-px w-12 bg-white/20" />
                  <span className="text-white/25">{PROJECT_TWO.label}</span>
                </div>

                <div className="overflow-hidden">
                  <h2 className="p2-intro-title text-[clamp(3.5rem,11vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
                    {PROJECT_TWO.title}
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <span className="p2-intro-title-muted block text-[clamp(3.5rem,11vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-white/20">
                    {PROJECT_TWO.mutedTitle}
                  </span>
                </div>

                <p className="p2-intro-summary mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg md:leading-9">
                  {PROJECT_TWO.intro}
                </p>
              </div>

              <div className="p2-intro-meta md:max-w-sm">
                <div className="grid grid-cols-2 gap-5 border-y border-white/10 py-6">
                  {[
                    { label: 'Client', value: PROJECT_TWO.client },
                    { label: 'Year', value: PROJECT_TWO.year },
                    { label: 'Genre', value: PROJECT_TWO.genre },
                    { label: 'Series', value: PROJECT_TWO.series },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{item.label}</div>
                      <div className="mt-1.5 text-xs font-medium leading-5 text-white/65">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Book Marketing', 'Amazon A+', 'Author Website', 'Cinematic Trailer', 'SEO'].map((item) => (
                    <span
                      key={item}
                      className="p2-intro-tag rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/50 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — HERO ====== */}

        <section id="sea-stone" className="project-two-hero relative overflow-hidden bg-[#0a1628] px-5 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,.03),transparent_45%)]" />

          <div className="relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-14">
            <div className="p2-hero-text order-2 lg:order-1">
              <div className="mb-6 overflow-hidden">
                <div className="p2-hero-number flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
                  <span>Case Study {PROJECT_TWO.number}</span>
                  <span className="h-px w-8 bg-white/20" />
                  <span className="text-white/25">{PROJECT_TWO.label}</span>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="p2-hero-title-line text-[clamp(3rem,9.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                  {PROJECT_TWO.title}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="p2-hero-title-line text-[clamp(3rem,9.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white/25">
                  {PROJECT_TWO.mutedTitle}
                </div>
              </div>

              <p className="p2-hero-meta mt-7 max-w-xl text-sm leading-7 text-white/50 md:text-base md:leading-8">
                {PROJECT_TWO.intro}
              </p>

              <div className="p2-hero-meta-grid mt-8 grid max-w-xl grid-cols-2 gap-4 border-y border-white/10 py-5 sm:grid-cols-3">
                {[
                  { label: 'Client', value: PROJECT_TWO.client },
                  { label: 'Year', value: PROJECT_TWO.year },
                  { label: 'Genre', value: PROJECT_TWO.genre },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{item.label}</div>
                    <div className="mt-1.5 text-[11px] font-medium leading-5 text-white/70 sm:text-xs">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {['Book Marketing', 'Amazon A+', 'Author Website', 'Cinematic Trailer', 'SEO'].map((item) => (
                  <span
                    key={item}
                    className="p2-hero-tag rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] hover:text-white/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p2-hero-media relative order-1 aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl sm:aspect-[4/5] lg:order-2 lg:aspect-[3/4]">
              <Image
                key="p2-hero-image"
                src={PROJECT_TWO.heroImage}
                alt="The Sea Stone Sisters — hero cover"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="p2-hero-caption absolute bottom-4 left-4 right-4 flex items-end justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/70">{PROJECT_TWO.client}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/45">{PROJECT_TWO.year}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — COVER SHOWCASE ====== */}

        <section className="p2-cover-section relative overflow-hidden bg-[#0a1628] px-5 py-20 sm:px-6 md:py-28 lg:py-36">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.03),transparent_70%)]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="mb-10 flex flex-col items-center gap-4 text-center md:mb-14">
              <SectionLabel className="justify-center">Cover Showcase</SectionLabel>
              <TextReveal
                tag="h3"
                className="p2-cover-heading max-w-2xl text-2xl font-medium tracking-tight md:text-3xl lg:text-4xl"
              >
                A story spanning decades, continents, and the secrets between sisters.
              </TextReveal>
            </div>

            <div className="p2-cover-frame relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 shadow-2xl md:rounded-[2.5rem]">
              <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[2/1] lg:aspect-[2.2/1]">
                <Image
                  src={PROJECT_TWO.coverImage}
                  alt="The Sea Stone Sisters — project cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
                  className="p2-cover-image object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Featured Project</span>
                      <h4 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl lg:text-3xl">
                        {PROJECT_TWO.title} {PROJECT_TWO.mutedTitle}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/40">
                      <span>{PROJECT_TWO.client}</span>
                      <span className="h-px w-6 bg-white/25" />
                      <span>{PROJECT_TWO.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — MARQUEE ====== */}

        <Marquee speed={0.8} className="border-y border-white/10 bg-[#0d1a2e] py-5">
          {['Book Marketing', 'Amazon A+', 'Author Website', 'Cinematic Trailer', 'Book Formatting', 'SEO Optimization'].map((text, i) => (
            <span key={i} className="mx-8 flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-white/25">
              <Sparkles className="h-3 w-3" />
              {text}
            </span>
          ))}
        </Marquee>

        {/* ====== PROJECT 2 — STORY ====== */}

        <section className="p2-story-section bg-[#0a1628] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div>
              <SectionLabel>The Story</SectionLabel>
              <div className="mt-8 hidden flex-col gap-6 lg:flex">
                {[
                  { label: 'Genre', value: PROJECT_TWO.genre },
                  { label: 'Series', value: PROJECT_TWO.series },
                  { label: 'Timeline', value: '1931 — Present Day' },
                ].map((fact) => (
                  <div key={fact.label} className="p2-story-fact border-l border-white/10 pl-5">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{fact.label}</div>
                    <div className="mt-1.5 text-sm leading-6 text-white/60">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-10 md:space-y-12">
              <TextReveal
                tag="h2"
                className="p2-story-heading max-w-5xl text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                Four sisters separated by circumstance, connected by inherited rings and ancient standing stones.
              </TextReveal>

              <div className="p2-deco-line h-px w-full origin-left bg-white/10" />

              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                <p className="p2-reveal-copy text-sm leading-7 text-white/45 md:text-base md:leading-8">
                  {PROJECT_TWO.story}
                </p>
                <p className="p2-reveal-copy text-sm leading-7 text-white/45 md:text-base md:leading-8">
                  {PROJECT_TWO.challenge}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:hidden">
                {[
                  { label: 'Genre', value: PROJECT_TWO.genre },
                  { label: 'Series', value: PROJECT_TWO.series },
                  { label: 'Timeline', value: '1931 — Present Day' },
                ].map((fact) => (
                  <div key={fact.label} className="p2-story-fact rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">{fact.label}</div>
                    <div className="mt-1.5 text-xs leading-5 text-white/60">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — NARRATIVE ARCHITECTURE ====== */}

        <section className="p2-narrative-section border-t border-white/10 bg-[#0d1a2e] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <SectionLabel>Story Architecture</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="p2-narrative-heading mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Dual timelines. Four heirloom rings.
                </TextReveal>
                <p className="mt-2 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] text-white/20 sm:text-5xl md:text-6xl">
                  One long-buried family vow.
                </p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                The marketing strategy anchored directly into the book&apos;s dual-narrative timeline to target avid fans of historical time-slip romance.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {PROJECT_TWO.narrativePillars.map((item, i) => (
                <article
                  key={item.title}
                  className="p2-narrative-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-10"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Pillar 0{i + 1}
                    </span>
                    <Compass className="h-4 w-4 text-blue-300/40 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-300/80" />
                  </div>
                  <h3 className="text-xl font-semibold transition-colors duration-500 group-hover:text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {item.desc}
                  </p>
                  <div className="mt-8 h-px w-0 bg-gradient-to-r from-blue-300/40 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — PHILOSOPHY ====== */}

        <section className="p2-philosophy-section relative overflow-hidden border-y border-white/10 bg-[#0d1a2e] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="p2-phil-bg pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-blue-400/[0.03] blur-[100px] md:h-[560px] md:w-[560px]" />
          <span className="p2-phil-quote-mark pointer-events-none absolute -top-8 left-4 select-none font-serif text-[8rem] leading-none text-white/[0.03] sm:text-[10rem] md:left-10 md:text-[14rem]">
            &ldquo;
          </span>

          <div className="relative mx-auto max-w-6xl">
            <SectionLabel>Philosophy</SectionLabel>
            <div className="p2-philosophy-mark mt-8 h-px w-20 origin-left bg-white/25" />

            <TextReveal
              tag="blockquote"
              className="mt-10 max-w-5xl text-2xl font-medium leading-snug tracking-tight text-white/85 sm:text-3xl md:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              {`"${PROJECT_TWO.philosophy}"`}
            </TextReveal>

            <div className="mt-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/30">
              <span className="h-px w-8 bg-white/20" />
              <span>The guiding thought behind the marketing strategy</span>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — STATS ====== */}

        <section className="p2-stats-section border-b border-white/10 bg-[#0d1a2e] px-5 py-16 sm:px-6 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {PROJECT_TWO.stats.map((stat) => (
              <div
                key={stat.label}
                className="p2-stat-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center transition-all duration-700 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] md:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-2xl font-bold tabular-nums text-white/90 md:text-4xl"
                />
                <div className="mt-3 text-[9px] uppercase tracking-[0.22em] text-white/30 md:text-[10px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== PROJECT 2 — THE SOLUTION ====== */}

        <section className="p2-solution-section bg-[#0a1628] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 md:mb-16">
              <SectionLabel>The Solution</SectionLabel>
              <TextReveal
                tag="h2"
                className="p2-solution-heading mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Five pillars of digital presence.
              </TextReveal>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {PROJECT_TWO.solutions.map((solution, i) => (
                <article
                  key={solution.title}
                  className="p2-solution-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-8"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30">
                      0{i + 1} / 05
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-300/80" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug transition-colors duration-500 group-hover:text-white md:text-xl">
                    {solution.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">{solution.text}</p>
                  <div className="mt-6 h-px w-0 bg-gradient-to-r from-blue-300/40 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — AMAZON A+ VISUAL CONTENT ====== */}

        <section className="p2-aplus-section border-t border-white/10 bg-[#0a1628] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <SectionLabel>Amazon A+ Strategy</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="p2-aplus-heading mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Turning Amazon scrollers into buyers.
                </TextReveal>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                Custom visual modules designed to highlight character dynamics, emotional hooks, and series branding directly on the Amazon book listing.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {PROJECT_TWO.aplusModules.map((module, i) => (
                <article
                  key={module.title}
                  className="p2-aplus-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-10"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Module 0{i + 1}
                    </span>
                    <Layers className="h-4 w-4 text-blue-300/40 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-300/80" />
                  </div>
                  <h3 className="text-xl font-semibold transition-colors duration-500 group-hover:text-white md:text-2xl">
                    {module.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {module.desc}
                  </p>
                  <div className="mt-8 h-px w-0 bg-gradient-to-r from-blue-300/40 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — THE EXPERIENCE (MOCKUP) ====== */}

        <section className="p2-mockup-section relative overflow-hidden border-y border-white/10 bg-[#0d1a2e] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,.04),transparent_60%)]" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-12 md:mb-16">
              <SectionLabel>The Experience</SectionLabel>
              <TextReveal
                tag="h2"
                className="p2-mockup-heading mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Designed around the reader journey.
              </TextReveal>
              <TextReveal
                tag="p"
                className="p2-mockup-subheading mt-6 max-w-2xl text-base leading-8 text-white/45 md:text-lg md:leading-9"
              >
                Every touchpoint — from Amazon discovery to the author website — was crafted to immerse readers in the atmospheric world of The Sea Stone Sisters and guide them toward the story.
              </TextReveal>
            </div>

            <div className="p2-mockup-card group relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 transition-all duration-700 hover:border-white/20 hover:bg-white/[0.03] md:rounded-[2.5rem] md:p-6">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-black/30 md:rounded-[2rem]">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    key="p2-mockup-image"
                    src={PROJECT_TWO.mockup1}
                    alt="The Sea Stone Sisters — project mockup"
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 700px"
                    className="p2-mockup-image object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between px-2 md:mt-5 md:px-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">Reader Experience Preview</span>
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/25">
                  <Eye className="h-3 w-3" />
                  <span>Digital Touchpoints</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — THE AUTHOR ====== */}

        <section className="p2-author-section bg-[#0a1628] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 md:mb-16">
              <SectionLabel>The Author</SectionLabel>
              <TextReveal
                tag="h2"
                className="p2-author-heading mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Eleanor Buchanan.
              </TextReveal>
            </div>

            <article className="p2-author-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-12">
              <span className="pointer-events-none absolute -bottom-8 -right-2 select-none text-[8rem] font-semibold leading-none text-white/[0.03] transition-colors duration-700 group-hover:text-white/[0.06] md:text-[11rem]">
                EB
              </span>

              <div className="mb-10 flex items-center justify-between md:mb-12">
                <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30">
                  Author
                </span>
                <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60" />
              </div>
              <h3 className="relative text-2xl font-semibold transition-colors duration-500 group-hover:text-white md:text-3xl">
                {PROJECT_TWO.client}
              </h3>
              <p className="relative mt-5 max-w-2xl text-sm leading-7 text-white/45 md:text-base md:leading-8">
                {PROJECT_TWO.authorBio}
              </p>

              <div className="relative mt-8 grid max-w-xl grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">Location</div>
                  <div className="mt-1.5 text-xs text-white/60">{PROJECT_TWO.authorLocation}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">Genre</div>
                  <div className="mt-1.5 text-xs text-white/60">{PROJECT_TWO.genre}</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.28em] text-white/30">Instagram</div>
                  <a
                    href={PROJECT_TWO.authorInstagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-block text-xs text-blue-300/70 transition-colors duration-500 hover:text-blue-300"
                  >
                    @eleanorbuchananbooks
                  </a>
                </div>
              </div>

              <div className="relative mt-8 h-px w-0 bg-gradient-to-r from-white/25 to-transparent transition-all duration-700 group-hover:w-full" />
            </article>
          </div>
        </section>

        {/* ====== PROJECT 2 — MARKETING ECOSYSTEM ====== */}

        <section className="p2-ecosystem-section border-t border-white/10 bg-[#0d1a2e] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
              <div>
                <SectionLabel>Marketing Ecosystem</SectionLabel>
                <TextReveal
                  tag="h2"
                  className="p2-ecosystem-heading mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-5xl md:text-6xl"
                >
                  Four channels driving commercial growth.
                </TextReveal>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/40">
                A multi-layered reader acquisition pipeline engineered to maintain consistent monthly sales and high search visibility.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {PROJECT_TWO.growthEcosystem.map((channel, i) => (
                <article
                  key={channel.title}
                  className="p2-ecosystem-card group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-6 transition-all duration-700 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-8"
                >
                  <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">
                      Channel 0{i + 1}
                    </span>
                    <TrendingUp className="h-4 w-4 text-blue-300/50 transition-colors duration-500 group-hover:text-blue-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
                    {channel.title}
                  </h3>
                  <p className="mt-3 text-xs leading-6 text-white/45 md:text-sm md:leading-7">
                    {channel.desc}
                  </p>
                  <div className="mt-6 h-px w-0 bg-gradient-to-r from-blue-300/40 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — SCOPE ====== */}

        <section className="p2-scope-section bg-[#0a1628] px-5 py-24 sm:px-6 md:py-36 lg:py-44">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionLabel>Scope</SectionLabel>
              <TextReveal
                tag="h2"
                className="p2-scope-heading mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
              >
                Every deliverable connected.
              </TextReveal>
            </div>

            <div>
              {PROJECT_TWO.deliverables.map((item, i) => (
                <div
                  key={item}
                  className="p2-scope-row group flex items-start gap-4 border-b border-white/10 py-5 transition-all duration-500 hover:border-white/25 hover:pl-2 md:py-6"
                >
                  <span className="pt-1 text-[10px] tabular-nums text-white/20 transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-300/60 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-300/90" />
                  <span className="text-sm leading-6 text-white/60 transition-colors duration-500 group-hover:text-white/85 md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — RESULTS ====== */}

        <section className="p2-results-section border-y border-white/10 bg-[#0d1a2e] px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <SectionLabel className="justify-center">Results</SectionLabel>
            <TextReveal
              tag="p"
              className="p2-results-text mt-8 text-lg leading-8 text-white/60 md:text-xl md:leading-9 lg:text-2xl lg:leading-10"
            >
              {PROJECT_TWO.results}
            </TextReveal>
          </div>
        </section>

        {/* ====== PROJECT 2 — CTA ====== */}

        <section className="p2-cta-section bg-[#0a1628] px-5 py-16 sm:px-6 md:py-24">
          <div className="p2-cta-box relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] px-5 py-16 text-center sm:px-6 md:px-12 md:py-24">
            <div className="p2-cta-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[280px] w-[280px] rounded-full bg-blue-400/[0.06] blur-[80px] md:h-[340px] md:w-[340px]" />
            </div>

            <FloatingParticles count={14} />

            <div className="p2-cta-item relative">
              <Sparkles className="mx-auto h-5 w-5 text-white/30" />
            </div>

            <h2 className="p2-cta-item relative mx-auto mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Explore the story and discover Eleanor Buchanan&apos;s work.
            </h2>
            <p className="p2-cta-item relative mx-auto mt-6 max-w-xl text-sm leading-7 text-white/40">
              Visit the Amazon listing to discover the book, or explore the author&apos;s presence on Goodreads.
            </p>

            <div className="p2-cta-item relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticWrap strength={0.25}>
                <a
                  href={PROJECT_TWO.website}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-500 hover:scale-[1.04] hover:shadow-lg hover:shadow-white/20"
                >
                  <Globe className="h-4 w-4" />
                  Amazon Listing
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </MagneticWrap>

              <MagneticWrap strength={0.25}>
                <a
                  href={PROJECT_TWO.goodreads}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/5"
                >
                  <Star className="h-4 w-4" />
                  Goodreads
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </MagneticWrap>
            </div>
          </div>
        </section>

        {/* ====== PROJECT 2 — FOOTER ====== */}

        <footer className="p2-footer border-t border-white/10 bg-[#0a1628] px-5 py-8 sm:px-6 md:py-10">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 text-[10px] uppercase tracking-[0.2em] text-white/25 md:flex-row md:items-center">
            <span>Project 02 — The Sea Stone Sisters</span>
            <Link
              href="/"
              className="group flex items-center gap-2 text-white/40 transition-colors duration-500 hover:text-white"
            >
              <ArrowLeft className="h-3 w-3 transition-transform duration-500 group-hover:-translate-x-0.5" />
              Back to BigTeeWise
            </Link>
            <span>Case Study / {PROJECT_TWO.year}</span>
          </div>
        </footer>

        {/* ====== BACK TO TOP ====== */}

        <div className="fixed bottom-5 right-5 z-40 md:bottom-6 md:right-6">
          <MagneticWrap strength={0.4}>
            <button
              type="button"
              onClick={() => {
                if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 2.5 });
                else window.scrollTo({ top: 0, behavior: 'auto' });
              }}
              aria-label="Back to top"
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111]/80 text-white/50 backdrop-blur-xl transition-all duration-700 hover:bg-white hover:text-black ${
                navVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <ArrowUpRight className="h-4 w-4 -rotate-45" />
            </button>
          </MagneticWrap>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        html.lenis,
        html.lenis body {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }

        .lenis.lenis-stopped {
          overflow: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
