'use client';

import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
};

const PROJECT_TWO = {
  number: '02',
  title: 'Coming',
  mutedTitle: 'Soon.',
};

const EASE = 'power4.out';
const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* ============================================================
   MAGNETIC HOOK (plain JS — no TypeScript annotations)
============================================================ */

function useMagnetic(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref, strength]);
}

/* ============================================================
   MAGNETIC WRAPPER COMPONENT
============================================================ */

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
   CUSTOM CURSOR
============================================================ */

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const handleMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.55, ease: 'power3.out' });
    };

    const handleEnterLink = () => {
      gsap.to(cursor, { scale: 2.2, opacity: 0.6, duration: 0.4, ease: 'power3.out' });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const handleLeaveLink = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMove);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((l) => {
      l.addEventListener('mouseenter', handleEnterLink);
      l.addEventListener('mouseleave', handleLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      links.forEach((l) => {
        l.removeEventListener('mouseenter', handleEnterLink);
        l.removeEventListener('mouseleave', handleLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 mix-blend-difference lg:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference lg:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}

/* ============================================================
   FLOATING PARTICLES
============================================================ */

function FloatingParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];

    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'absolute rounded-full bg-white/[0.04]';
      const size = gsap.utils.random(2, 6);
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${gsap.utils.random(0, 100)}%`;
      p.style.top = `${gsap.utils.random(0, 100)}%`;
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: gsap.utils.random(-80, 80),
        x: gsap.utils.random(-40, 40),
        opacity: gsap.utils.random(0.1, 0.5),
        duration: gsap.utils.random(4, 10),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 3),
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

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
    if (!bar) return;

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
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-white/40 via-white/70 to-white/40"
      />
    </div>
  );
}

/* ============================================================
   MARQUEE
============================================================ */

function Marquee({ children, speed = 1, direction = 'left', className = '' }) {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
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
        const speedMult = gsap.utils.clamp(1, 4, 1 + velocity / 800);
        gsap.to(tween, { timeScale: speedMult, duration: 0.3, ease: 'power2.out' });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [speed, direction]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap">
        {children}
        {children}
      </div>
    </div>
  );
}

/* ============================================================
   TEXT REVEAL (word by word)
============================================================ */

function TextReveal({ children, className = '', tag: Tag = 'div' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll('.word-wrap');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: '110%', rotateX: -90, opacity: 0 },
        {
          y: '0%',
          rotateX: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.04,
          ease: EASE,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const words = children.split(' ');

  return (
    <Tag ref={ref} className={className} style={{ perspective: '600px' }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
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

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
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
   MAIN COMPONENT
============================================================ */

export default function PortfolioCaseStudy() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const lenisRef = useRef(null);

  const [navVisible, setNavVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const nextReview = () =>
    setReviewIndex((c) => (c + 1) % PROJECT.reviews.length);

  const previousReview = () =>
    setReviewIndex((c) => (c - 1 + PROJECT.reviews.length) % PROJECT.reviews.length);

  /* ==========================================================
     LENIS SMOOTH SCROLL
  ========================================================== */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* ==========================================================
     LOADER
  ========================================================== */

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /* ==========================================================
     SMOOTH SCROLL TO ANCHOR
  ========================================================== */

  const scrollTo = useCallback((target) => {
    const el = document.querySelector(target);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.8 });
    }
  }, []);

  /* ==========================================================
     GSAP MASTER LAYOUT EFFECT
  ========================================================== */

  useLayoutEffect(() => {
    const main = mainRef.current;
    const hero = heroRef.current;

    if (!main || !hero) return undefined;

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
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
              invalidateOnRefresh: true,
            },
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

      /* ========== HERO ========== */

      const heroNumber  = hero.querySelector('.hero-number');
      const heroLines   = hero.querySelectorAll('.hero-title-line');
      const heroMeta    = hero.querySelector('.hero-meta');
      const heroTags    = hero.querySelectorAll('.hero-tag');
      const heroMedia   = hero.querySelector('.hero-media');
      const heroGlow    = hero.querySelector('.hero-glow');
      const scrollHint  = hero.querySelector('.scroll-hint');

      const heroTl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.3 });

      if (heroGlow) {
        heroTl.fromTo(
          heroGlow,
          { scale: 0.5, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 2, ease: 'power2.out' },
          0
        );
      }

      if (heroNumber) {
        heroTl.fromTo(
          heroNumber,
          { y: 30, autoAlpha: 0, filter: 'blur(8px)' },
          { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.9 },
          0.1
        );
      }

      if (heroLines.length) {
        heroTl.fromTo(
          heroLines,
          { y: 120, autoAlpha: 0, skewY: 4 },
          { y: 0, autoAlpha: 1, skewY: 0, duration: 1.3, stagger: 0.12 },
          0.2
        );
      }

      if (heroMedia) {
        heroTl.fromTo(
          heroMedia,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08, autoAlpha: 0, rotate: 2 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, autoAlpha: 1, rotate: 0, duration: 1.5 },
          0.35
        );
      }

      if (heroMeta) {
        heroTl.fromTo(
          heroMeta,
          { x: -45, autoAlpha: 0, filter: 'blur(6px)' },
          { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1 },
          0.7
        );
      }

      if (heroTags.length) {
        heroTl.fromTo(
          heroTags,
          { y: 24, autoAlpha: 0, scale: 0.9 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.06 },
          0.9
        );
      }

      if (scrollHint) {
        heroTl.fromTo(
          scrollHint,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          1.4
        );
      }

      const heroImage = heroMedia?.querySelector('img');
      if (heroImage) parallaxEl(heroImage, hero, { yPercent: 10, scale: 1.06 });

      const heroTextBlock = hero.querySelector('.hero-text-block');
      if (heroTextBlock) {
        gsap.to(heroTextBlock, {
          y: -60, ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      /* ========== PROJECT STRIP ========== */

      const strip = main.querySelector('.project-strip');
      if (strip) reveal(strip, { x: 0, y: 30, duration: 0.8 });

      /* ========== STORY ========== */

      const story = main.querySelector('.story-section');
      if (story) {
        reveal(story.querySelector('.section-label'), { x: -45, y: 8, duration: 0.85, rotate: -2 });
        drawLine(story.querySelector('.story-line'));
        story.querySelectorAll('.reveal-copy').forEach((item, index) => {
          reveal(item, { x: index === 0 ? -40 : 40, y: 15, duration: 0.95, delay: index * 0.1 });
        });
        story.querySelectorAll('.deco-line').forEach((line) => drawLine(line, 'top 90%'));
      }

      /* ========== PHILOSOPHY ========== */

      const philosophy = main.querySelector('.philosophy-section');
      if (philosophy) {
        reveal(philosophy.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        drawLine(philosophy.querySelector('.philosophy-mark'));

        const philBg = philosophy.querySelector('.phil-bg');
        if (philBg) {
          gsap.fromTo(
            philBg,
            { yPercent: -15 },
            {
              yPercent: 15, ease: 'none',
              scrollTrigger: {
                trigger: philosophy,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      }

      /* ========== STATS ========== */

      const stats = main.querySelector('.stats-section');
      if (stats) {
        stats.querySelectorAll('.stat-card').forEach((card, i) => {
          reveal(card, {
            x: 0, y: 50, scale: 0.95,
            rotate: i % 2 === 0 ? -2 : 2,
            duration: 0.9, delay: i * 0.1,
          });
        });
      }

      /* ========== BOOKS ========== */

      const books = main.querySelector('.books-section');
      if (books) {
        reveal(books.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        books.querySelectorAll('.cover-card').forEach((card, index) => {
          reveal(card, {
            x: 0, y: 70, scale: 0.96,
            rotate: index % 2 === 0 ? -3 : 3,
            duration: 1, delay: index * 0.1,
            start: 'top 86%',
          });
          const image = card.querySelector('img');
          if (image) parallaxEl(image, card, { yPercent: index % 2 === 0 ? -4 : 4, scale: 1.03 });
        });
      }

      /* ========== WORK ========== */

      const work = main.querySelector('.work-section');
      if (work) {
        reveal(work.querySelector('.section-label'), { x: -35, y: 8, duration: 0.8 });
        const workCopy = work.querySelector('.work-intro .reveal-copy');
        if (workCopy) reveal(workCopy, { x: 50, y: 12, duration: 0.95 });

        work.querySelectorAll('.work-frame').forEach((frame, index) => {
          reveal(frame, {
            x: index % 2 === 0 ? -60 : 60, y: 30, scale: 0.98,
            rotate: index % 2 === 0 ? -1.5 : 1.5,
            duration: 1.1, delay: index * 0.12, start: 'top 84%',
          });
          const image = frame.querySelector('img');
          if (image) parallaxEl(image, frame, { yPercent: index % 2 === 0 ? 5 : -5, scale: 1.04 });
        });
      }

      /* ========== AUTHORS ========== */

      const authors = main.querySelector('.authors-section');
      if (authors) {
        reveal(authors.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        authors.querySelectorAll('.author-card').forEach((card, index) => {
          reveal(card, {
            x: index === 0 ? -60 : 60, y: 20,
            rotate: index === 0 ? -2 : 2,
            duration: 1.05, delay: index * 0.15, start: 'top 84%',
          });
        });
      }

      /* ========== REVIEWS ========== */

      const reviews = main.querySelector('.reviews-section');
      if (reviews) {
        const contentReveal = reviews.querySelector('.content-reveal');
        if (contentReveal) reveal(contentReveal, { x: -55, y: 15, duration: 1 });

        reviews.querySelectorAll('.review-shell').forEach((card, i) => {
          reveal(card, {
            x: 0, y: 40, scale: 0.97,
            rotate: i % 2 === 0 ? -1 : 1,
            duration: 0.9, delay: i * 0.08, start: 'top 88%',
          });
        });
      }

      /* ========== SCOPE ========== */

      const scope = main.querySelector('.scope-section');
      if (scope) {
        reveal(scope.querySelector('.section-label'), { x: -35, y: 8, duration: 0.75 });
        scope.querySelectorAll('.scope-row').forEach((row, index) => {
          reveal(row, { x: -40, y: 0, duration: 0.8, delay: index * 0.07, start: 'top 90%' });
        });
      }

      /* ========== CTA ========== */

      const cta = main.querySelector('.cta-box');
      if (cta) {
        reveal(cta, { x: 0, y: 60, scale: 0.97, duration: 1.2, start: 'top 84%' });
        cta.querySelectorAll('.cta-item').forEach((item, index) => {
          reveal(item, { x: 0, y: 28, duration: 0.8, delay: index * 0.1, start: 'top 87%' });
        });

        const ctaGlow = cta.querySelector('.cta-glow');
        if (ctaGlow) {
          gsap.to(ctaGlow, {
            scale: 1.2, opacity: 0.6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
          });
        }
      }

      /* ========== FOOTER ========== */

      const footer = main.querySelector('.site-footer');
      if (footer) reveal(footer, { x: 0, y: 20, duration: 0.8 });

      /* ========== NAV VISIBILITY ========== */

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
     MODAL ESCAPE
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
     RENDER
  ========================================================== */

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      {/* LOADING OVERLAY */}
      <div
        className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#090909] transition-all duration-1000 ${
          isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Loading</span>
        </div>
      </div>

      <main
        ref={mainRef}
        className="min-h-screen overflow-x-hidden bg-[#090909] text-white selection:bg-white selection:text-black"
      >
        {/* ====== NAVIGATION ====== */}

        <nav
          className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-700 ${
            navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#090909]/80 px-5 py-3 backdrop-blur-xl">
            <MagneticWrap strength={0.2}>
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">Portfolio</span>
            </MagneticWrap>

            <div className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.22em] text-white/40 md:flex">
              {[
                { label: 'Story', target: '#story' },
                { label: 'Books', target: '#books' },
                { label: 'Work',  target: '#work'  },
                { label: 'Reviews', target: '#reviews' },
              ].map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollTo(link.target)}
                  className="relative transition-colors duration-500 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-500 hover:after:w-full"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <MagneticWrap strength={0.3}>
              <a
                href={PROJECT.website}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all duration-500 hover:bg-white hover:text-black"
              >
                Live Site
                <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </MagneticWrap>
          </div>
        </nav>

        {/* ====== HERO ====== */}

        <section
          ref={heroRef}
          className="relative flex min-h-screen items-end overflow-hidden px-6 pb-10 pt-32 md:pb-16 lg:items-center lg:pt-0"
        >
          <div className="hero-glow absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[600px] w-[600px] rounded-full bg-white/[0.04] blur-[120px]" />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.08),transparent_35%)]" />
          <FloatingParticles />

          <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div className="hero-text-block order-2 lg:order-1">
              <div className="mb-7 overflow-hidden">
                <div className="hero-number text-[11px] font-semibold uppercase tracking-[0.35em] text-white/35">
                  PROJECT {PROJECT.number}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="hero-title-line text-[clamp(3.7rem,8vw,8.5rem)] font-semibold leading-[.86] tracking-[-0.065em]">
                  {PROJECT.title}
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="hero-title-line text-[clamp(3.7rem,8vw,8.5rem)] font-semibold leading-[.86] tracking-[-0.065em] text-white/25">
                  {PROJECT.mutedTitle}
                </div>
              </div>

              <p className="hero-meta mt-8 max-w-xl text-sm leading-7 text-white/48 md:text-base">
                {PROJECT.intro}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {['Author Website', 'Book Experience', 'Editorial Design', 'Reader Journey'].map((item) => (
                  <span
                    key={item}
                    className="hero-tag rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-media relative order-1 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl lg:order-2">
              <Image
                src={PROJECT.hero}
                alt="Entre el Amor y las Sombras project"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">{PROJECT.client}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">{PROJECT.year}</span>
              </div>
            </div>
          </div>

          <div className="scroll-hint absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/30 lg:flex">
            <span>Scroll to explore</span>
            <ArrowDown className="h-3 w-3 animate-bounce" />
            <div className="mt-1 h-12 w-px bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </section>

        {/* ====== MARQUEE ====== */}

        <Marquee speed={0.8} className="border-y border-white/10 bg-[#0c0c0c] py-5">
          {['Author Platform', 'Book Experience', 'Editorial Design', 'Visual Storytelling', 'Reader Journey', 'Digital Identity'].map((text, i) => (
            <span key={i} className="mx-8 flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-white/20">
              <Sparkles className="h-3 w-3" />
              {text}
            </span>
          ))}
        </Marquee>

        {/* ====== PROJECT STRIP ====== */}

        <section className="project-strip border-b border-white/10 bg-[#0c0c0c] py-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-[0.25em] text-white/25">PROJECT {PROJECT_TWO.number}</span>
              <span className="h-px w-10 bg-white/10" />
              <span className="text-xs text-white/45">{PROJECT_TWO.title} {PROJECT_TWO.mutedTitle}</span>
            </div>
            <Sparkles className="h-4 w-4 text-white/25" />
          </div>
        </section>

        {/* ====== STORY ====== */}

        <section id="story" className="story-section px-6 py-28 md:py-40">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="section-label text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
                The Story
              </span>
              <div className="story-line mt-5 h-px w-16 origin-left bg-white/20" />
            </div>

            <div className="space-y-12">
              <TextReveal
                tag="h2"
                className="max-w-5xl text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                A story built from more than fifty years of life memory and everything that happened between the photographs.
              </TextReveal>

              <div className="deco-line h-px w-full origin-left bg-white/10" />

              <div className="grid gap-10 md:grid-cols-2">
                <p className="reveal-copy text-sm leading-7 text-white/45 md:text-base">{PROJECT.story}</p>
                <p className="reveal-copy text-sm leading-7 text-white/45 md:text-base">{PROJECT.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PHILOSOPHY ====== */}

        <section className="philosophy-section relative overflow-hidden border-y border-white/10 bg-[#111] px-6 py-28 md:py-40">
          <div className="phil-bg pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[100px]" />

          <div className="relative mx-auto max-w-6xl">
            <span className="section-label text-[10px] uppercase tracking-[0.3em] text-white/25">Philosophy</span>
            <div className="philosophy-mark mt-8 h-px w-20 origin-left bg-white/25" />

            <TextReveal
              tag="blockquote"
              className="mt-10 max-w-5xl text-3xl font-medium leading-tight tracking-tight text-white/85 md:text-5xl lg:text-6xl"
            >
              {`"${PROJECT.philosophy}"`}
            </TextReveal>
          </div>
        </section>

        {/* ====== STATS ====== */}

        <section className="stats-section border-b border-white/10 bg-[#0c0c0c] px-6 py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: 3,   suffix: '',  label: 'Books Published' },
              { value: 50,  suffix: '+', label: 'Years of History' },
              { value: 5,   suffix: '★', label: 'Reader Rating' },
              { value: 100, suffix: '%', label: 'Custom Design' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all duration-700 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] md:p-8"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-3xl font-bold text-white/90 md:text-4xl" />
                <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/30">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ====== BOOKS ====== */}

        <section id="books" className="books-section px-6 py-28 md:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <span className="section-label text-[10px] uppercase tracking-[0.3em] text-white/30">The Trilogy</span>
              <TextReveal tag="h2" className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                Three books. One life.
              </TextReveal>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {PROJECT.books.map((book, i) => (
                <article
                  key={book.title}
                  className="cover-card group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] p-3 transition-all duration-700 hover:-translate-y-3 hover:border-white/25 hover:shadow-2xl"
                >
                  <div className="book-image relative aspect-[3/4] overflow-hidden rounded-[1.1rem]">
                    <Image
                      src={PROJECT.covers[i]}
                      alt={book.title}
                      fill
                      sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 25vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:opacity-0" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <Eye className="h-8 w-8 text-white/80" />
                    </div>
                  </div>

                  <div className="book-content p-5">
                    <div className="mb-3 text-[9px] uppercase tracking-[0.25em] text-white/25">0{i + 1}</div>
                    <h3 className="text-lg font-semibold transition-colors duration-500 group-hover:text-white/90">{book.title}</h3>
                    <p className="mt-3 text-xs leading-6 text-white/40">{book.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== MARQUEE 2 ====== */}

        <Marquee speed={0.6} direction="right" className="border-y border-white/10 bg-[#0c0c0c] py-4">
          {PROJECT.books.map((book, i) => (
            <span key={i} className="mx-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/15">
              <Star className="h-3 w-3 fill-white/10 text-white/10" />
              {book.title}
            </span>
          ))}
        </Marquee>

        {/* ====== WORK ====== */}

        <section id="work" className="work-section overflow-hidden bg-[#eae8e2] px-6 py-28 text-[#111] md:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="work-intro mb-20 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
              <div>
                <span className="section-label text-[10px] uppercase tracking-[0.3em] text-black/35">The Work</span>
                <TextReveal
                  tag="h2"
                  className="mt-5 max-w-5xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[.9] tracking-[-0.06em]"
                >
                  A digital world built around the story.
                </TextReveal>
              </div>
              <p className="reveal-copy max-w-sm text-sm leading-7 text-black/50">
                Rather than presenting the website as a conventional collection of screenshots, the interface becomes an editorial canvas where every visual has its own rhythm.
              </p>
            </div>

            <div className="work-frame relative mb-8 overflow-hidden rounded-[2.5rem] bg-[#dedbd3] p-3 shadow-2xl md:p-5">
              <div className="work-image relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-black">
                <Image src={PROJECT.mockups[0]} alt="Main website experience" fill sizes="(max-width: 1023px) 100vw, 90vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="work-caption flex flex-col justify-between gap-4 px-3 py-5 md:flex-row md:items-center md:px-5">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">01 / Digital Identity</span>
                  <p className="mt-2 text-sm text-black/60">The central experience connects literature, memory and discovery.</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/30">Desktop Experience</span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[.72fr_1.28fr] md:items-start">
              <div className="work-frame md:mt-24">
                <div className="overflow-hidden rounded-[2rem] bg-[#dedbd3] p-3 shadow-xl">
                  <div className="work-image relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-black">
                    <Image src={PROJECT.mockups[1]} alt="Website detail" fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover" />
                  </div>
                  <div className="work-caption px-2 py-5">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-black/35">02 / Editorial Detail</span>
                    <p className="mt-2 text-sm leading-6 text-black/55">Quiet typography and generous composition keep the story at the center.</p>
                  </div>
                </div>
              </div>

              <div className="work-frame">
                <div className="overflow-hidden rounded-[2.5rem] bg-[#dedbd3] p-3 shadow-xl md:p-5">
                  <div className="work-image relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-black">
                    <Image src={PROJECT.mockups[2]} alt="Website presentation" fill sizes="(max-width: 767px) 100vw, 65vw" className="object-cover" />
                  </div>
                  <div className="work-caption flex flex-col justify-between gap-4 px-2 py-5 md:flex-row md:items-center md:px-1">
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

        {/* ====== AUTHORS ====== */}

        <section className="authors-section px-6 py-28 md:py-40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <span className="section-label text-[10px] uppercase tracking-[0.3em] text-white/30">The Authors</span>
              <TextReveal tag="h2" className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                Two voices. One shared history.
              </TextReveal>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {PROJECT.authors.map((author, i) => (
                <article
                  key={author.name}
                  className="author-card group rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 transition-all duration-700 hover:-translate-y-3 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-2xl md:p-12"
                >
                  <div className="mb-12 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">0{i + 1}</span>
                    <MagneticWrap strength={0.5}>
                      <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white/50" />
                    </MagneticWrap>
                  </div>
                  <h3 className="text-2xl font-semibold transition-colors duration-500 group-hover:text-white md:text-3xl">{author.name}</h3>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">{author.text}</p>
                  <div className="mt-8 h-px w-0 bg-gradient-to-r from-white/20 to-transparent transition-all duration-700 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== REVIEWS ====== */}

        <section
          id="reviews"
          className="reviews-section overflow-hidden border-t border-white/10 bg-[#0a0a0a] px-6 py-24 md:py-32 lg:py-40"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="content-reveal">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-white/30" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">Reader Feedback</span>
                </div>
                <h2 className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
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

            <div className="relative overflow-hidden">
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
                      onClick={() => setSelectedReview(review)}
                      className="relative block w-full cursor-zoom-in overflow-hidden border-b border-white/10 bg-black text-left"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={review.image}
                          alt={`Original reader review ${index + 1}`}
                          fill
                          sizes="390px"
                          className="object-contain p-2 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-xl transition-all duration-500 group-hover:bg-white group-hover:text-black">
                          <Eye className="h-3 w-3" />
                          View Original
                        </div>
                      </div>
                    </button>

                    <div className="flex min-h-[225px] flex-col p-5">
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
                        <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/25">{review.platform}</div>
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
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      i === reviewIndex ? 'bg-white/60' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/25">
                {String(reviewIndex + 1).padStart(2, '0')} / {String(PROJECT.reviews.length).padStart(2, '0')}
              </span>
            </div>

            <div className="mt-4 flex gap-2 sm:hidden">
              <button type="button" onClick={previousReview} aria-label="Previous review" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:bg-white hover:text-black">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={nextReview} aria-label="Next review" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:bg-white hover:text-black">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/20">
              <Eye className="h-3 w-3" />
              <span>Click a review image to view the original</span>
            </div>
          </div>
        </section>

        {/* ====== REVIEW MODAL ====== */}

        {selectedReview && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-5 md:p-8"
            onClick={() => setSelectedReview(null)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
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

        {/* ====== SCOPE ====== */}

        <section className="scope-section px-6 py-28 md:py-40">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <span className="section-label text-[10px] uppercase tracking-[0.3em] text-white/30">Scope</span>
              <TextReveal tag="h2" className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Every touchpoint connected.
              </TextReveal>
            </div>

            <div>
              {PROJECT.deliverables.map((item, i) => (
                <div
                  key={item}
                  className="scope-row group flex items-start gap-4 border-b border-white/10 py-6 transition-all duration-500 hover:border-white/25 hover:pl-2"
                >
                  <span className="pt-1 text-[10px] text-white/20 transition-colors duration-500 group-hover:text-white/50">0{i + 1}</span>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all duration-500 group-hover:scale-110 group-hover:text-white/60" />
                  <span className="text-sm leading-6 text-white/60 transition-colors duration-500 group-hover:text-white/80 md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}

        <section className="cta-section px-6 pb-16 md:pb-24">
          <div className="cta-box relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] px-6 py-24 text-center md:px-12 md:py-32">
            <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[300px] w-[300px] rounded-full bg-white/[0.05] blur-[80px]" />
            </div>

            <FloatingParticles />

            <Sparkles className="cta-item relative mx-auto h-5 w-5 text-white/30" />
            <h2 className="cta-item relative mx-auto mt-7 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
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
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-500 hover:scale-[1.05] hover:shadow-lg hover:shadow-white/20"
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

        <footer className="site-footer border-t border-white/10 px-6 py-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-[10px] uppercase tracking-[0.2em] text-white/25 md:flex-row">
            <span>Project 01 — Entre el Amor y las Sombras</span>
            <span>Case Study / 2025</span>
          </div>
        </footer>

        {/* ====== BACK TO TOP ====== */}

        <div className="fixed bottom-6 right-6 z-40">
          <MagneticWrap strength={0.4}>
            <button
              type="button"
              onClick={() => lenisRef.current?.scrollTo(0, { duration: 2.5 })}
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
      `}</style>
    </>
  );
}