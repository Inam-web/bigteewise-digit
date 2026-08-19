'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TEAM_MEMBERS } from '@/app/Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MoveUpRight,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================
   INLINE SOCIAL ICONS
========================================================= */

const LinkedinIcon = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.43-2.04A4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* =========================================================
   HELPERS
========================================================= */

const FALLBACK_COLORS = [
  '#2563EB',
  '#7C3AED',
  '#0891B2',
  '#059669',
  '#D97706',
];

const getAccent = (member, index) =>
  member?.accentColor || FALLBACK_COLORS[index % FALLBACK_COLORS.length];

const getInitials = (member) => {
  if (member?.initials) return member.initials;

  return (
    member?.name
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase() || 'TM'
  );
};

/* =========================================================
   TEAM SECTION
========================================================= */

export const TeamSection = () => {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const numberRef = useRef(null);
  const navRef = useRef(null);
  const philosophyRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);

  const members = Array.isArray(TEAM_MEMBERS)
    ? TEAM_MEMBERS.slice(0, 5)
    : [];

  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});

  const member = members[active];
  const accent = getAccent(member, active);

  /* =======================================================
     IMAGE PRELOADING
  ======================================================= */
  useEffect(() => {
    members.forEach((m) => {
      if (m.image) {
        const img = new Image();
        img.src = m.image;
        img.onload = () => {
          setImagesLoaded((prev) => ({ ...prev, [m.id]: true }));
        };
      }
    });
  }, [members]);

  /* =======================================================
     GSAP ENTRANCE ANIMATIONS
  ======================================================= */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        // Set initial states
        gsap.set('.team-reveal', {
          opacity: 0,
          y: 40,
        });

        gsap.set('.team-orb', {
          opacity: 0,
          scale: 0.7,
        });

        gsap.set('.team-card', {
          opacity: 0,
          y: 60,
          scale: 0.96,
        });

        gsap.set('.team-nav-item', {
          opacity: 0,
          y: 30,
        });

        gsap.set('.team-philosophy', {
          opacity: 0,
          y: 50,
        });

        // Main entrance timeline
        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });

        intro
          .to('.team-reveal', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
          })
          .to(
            '.team-orb',
            {
              opacity: 1,
              scale: 1,
              duration: 1.6,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .to(
            '.team-card',
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
            },
            '-=1.2'
          )
          .to(
            '.team-nav-item',
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .to(
            '.team-philosophy',
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.6'
          );

        // Orb floating animation
        if (orbRef.current) {
          gsap.to(orbRef.current, {
            x: 30,
            y: -25,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // Parallax on scroll for background elements
        gsap.to('.team-bg-grid', {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     MEMBER TRANSITION
  ======================================================= */
  const changeMember = useCallback(
    (nextIndex) => {
      if (
        transitioning ||
        nextIndex < 0 ||
        nextIndex >= members.length ||
        nextIndex === active
      ) {
        return;
      }

      if (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setActive(nextIndex);
        return;
      }

      setTransitioning(true);

      const targets = [
        imageRef.current,
        contentRef.current,
        numberRef.current,
      ].filter(Boolean);

      const tl = gsap.timeline({
        onComplete: () => {
          setActive(nextIndex);
          setTransitioning(false);
        },
      });

      tl.to(targets, {
        opacity: 0,
        y: 20,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
      }).to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
      });
    },
    [active, members.length, transitioning]
  );

  /* =======================================================
     STAT COUNTER ANIMATION
  ======================================================= */
  useEffect(() => {
    if (!statsRef.current || !member?.stat?.value) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const statEl = statsRef.current;
    const value = member.stat.value;

    // Check if value is numeric
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;

    gsap.fromTo(
      statEl,
      { innerText: 0 },
      {
        innerText: numericValue,
        duration: 1.2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function () {
          statEl.innerText = Math.round(this.targets()[0].innerText) + (value.includes('%') ? '%' : value.includes('+') ? '+' : '');
        },
      }
    );
  }, [active, member?.stat?.value]);

  /* =======================================================
     HOVER EFFECTS - MAGNETIC BUTTONS
  ======================================================= */
  useEffect(() => {
    if (!sectionRef.current) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const magneticBtns = sectionRef.current.querySelectorAll('.magnetic-btn');

    const handleMouseMove = (e, btn) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = (btn) => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    magneticBtns.forEach((btn) => {
      const moveHandler = (e) => handleMouseMove(e, btn);
      const leaveHandler = () => handleMouseLeave(btn);

      btn.addEventListener('mousemove', moveHandler);
      btn.addEventListener('mouseleave', leaveHandler);

      btn._cleanup = () => {
        btn.removeEventListener('mousemove', moveHandler);
        btn.removeEventListener('mouseleave', leaveHandler);
      };
    });

    return () => {
      magneticBtns.forEach((btn) => {
        if (btn._cleanup) btn._cleanup();
      });
    };
  }, [active]);

  /* =======================================================
     HOVER EFFECTS - NAV ITEMS
  ======================================================= */
  useEffect(() => {
    if (!navRef.current) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const navItems = navRef.current.querySelectorAll('.nav-item');

    navItems.forEach((item) => {
      const bar = item.querySelector('.nav-accent-bar');
      const img = item.querySelector('.nav-img');

      const enterHandler = () => {
        if (!item.classList.contains('nav-active')) {
          gsap.to(bar, {
            width: '40%',
            duration: 0.4,
            ease: 'power3.out',
          });
          if (img) {
            gsap.to(img, {
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        }
      };

      const leaveHandler = () => {
        if (!item.classList.contains('nav-active')) {
          gsap.to(bar, {
            width: '0%',
            duration: 0.4,
            ease: 'power3.out',
          });
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        }
      };

      item.addEventListener('mouseenter', enterHandler);
      item.addEventListener('mouseleave', leaveHandler);

      item._cleanup = () => {
        item.removeEventListener('mouseenter', enterHandler);
        item.removeEventListener('mouseleave', leaveHandler);
      };
    });

    return () => {
      navItems.forEach((item) => {
        if (item._cleanup) item._cleanup();
      });
    };
  }, [active]);

  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        changeMember(Math.min(active + 1, members.length - 1));
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changeMember(Math.max(active - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, members.length, changeMember]);

  /* =======================================================
     EMPTY STATE
  ======================================================= */
  if (!member) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 lg:py-28 xl:py-36"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#ffffff_0%,#f8fbff_52%,#ffffff_100%)]" />

        {/* Grid pattern */}
        <div
          className="team-bg-grid absolute inset-0 opacity-[0.02] sm:opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right,#0f172a 1px,transparent 1px),
              linear-gradient(to bottom,#0f172a 1px,transparent 1px)
            `,
            backgroundSize: 'clamp(48px, 6vw, 72px) clamp(48px, 6vw, 72px)',
          }}
        />

        {/* Primary orb - responsive sizing */}
        <div
          ref={orbRef}
          className="team-orb absolute -right-32 top-12 h-[300px] w-[300px] rounded-full blur-3xl sm:-right-40 sm:top-16 sm:h-[400px] sm:w-[400px] md:-right-48 md:h-[500px] md:w-[500px] lg:-right-52 lg:top-24 lg:h-[600px] lg:w-[600px]"
          style={{
            background: `radial-gradient(
              circle,
              ${accent}18 0%,
              ${accent}08 35%,
              transparent 70%
            )`,
          }}
        />

        {/* Secondary orb */}
        <div className="absolute -bottom-40 -left-24 h-[300px] w-[300px] rounded-full bg-blue-100/25 blur-3xl sm:-bottom-48 sm:-left-32 sm:h-[400px] sm:w-[400px] md:-bottom-60 md:-left-48 md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]" />

        {/* Top divider */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* =================================================
            HEADER
        ================================================= */}
        <header ref={headerRef} className="mb-10 grid gap-8 sm:mb-12 md:mb-14 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="team-reveal mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 backdrop-blur-md sm:mb-6 sm:px-3.5 sm:py-2 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,.1)]" />
              Our Team
              <span className="text-blue-300">/</span>
              BigTeeWise Digital
            </div>

            {/* Heading - improved clamp for small screens */}
            <h2 className="team-reveal text-[clamp(2.2rem,6vw,6.8rem)] font-black leading-[0.9] tracking-[-0.04em] text-slate-950 sm:leading-[0.86] sm:tracking-[-0.065em]">
              The minds
              <br />
              <span className="text-blue-600">behind the work.</span>
            </h2>

            {/* Description */}
            <p className="team-reveal mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:mt-8 sm:text-base sm:leading-7">
              A collective of specialists across creative direction,
              publishing, design, marketing and content — bringing different
              disciplines together to create work that matters.
            </p>
          </div>

          {/* Header Controls */}
          <div className="team-reveal flex items-center gap-4 sm:gap-5">
            <div className="hidden text-right sm:block">
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-[10px]">
                Featured
              </div>
              <div className="mt-1 text-xs font-bold text-slate-800 sm:text-sm">
                5 / 15 Specialists
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous team member"
                disabled={active === 0 || transitioning}
                onClick={() => changeMember(Math.max(active - 1, 0))}
                className="magnetic-btn group flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-slate-900 hover:bg-slate-950 hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
              >
                <ChevronLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-0.5 sm:size-[18px]"
                />
              </button>

              <button
                type="button"
                aria-label="Next team member"
                disabled={active === members.length - 1 || transitioning}
                onClick={() =>
                  changeMember(Math.min(active + 1, members.length - 1))
                }
                className="magnetic-btn group flex h-10 w-10 items-center justify-center rounded-full border border-slate-950 bg-slate-950 text-white shadow-sm transition-all duration-300 hover:translate-x-0.5 hover:border-blue-600 hover:bg-blue-600 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
              >
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 sm:size-[18px]"
                />
              </button>
            </div>
          </div>
        </header>

        {/* =================================================
            FEATURED PERSON CARD
        ================================================= */}
        <div className="team-card overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem] sm:shadow-[0_30px_100px_rgba(15,23,42,0.09)] lg:grid lg:grid-cols-[1fr_1fr] xl:rounded-[2rem]">
          {/* =================================================
              PORTRAIT
          ================================================= */}
          <div
            ref={imageRef}
            className="group relative aspect-[4/5] overflow-hidden bg-slate-100 sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:min-h-[580px] xl:min-h-[680px]"
          >
            {/* Person Image - proper fitting without awkward crop */}
            {member.image ? (
              <img
                key={member.id}
                src={member.image}
                alt={member.name}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                style={{
                  opacity: imagesLoaded[member.id] ? 1 : 0,
                  transition: 'opacity 0.5s ease, transform 1.4s ease-out',
                }}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg,${accent}18,#f8fafc)`,
                }}
              >
                <span
                  className="text-6xl font-black tracking-[-0.08em] sm:text-7xl md:text-8xl"
                  style={{ color: accent }}
                >
                  {getInitials(member)}
                </span>
              </div>
            )}

            {/* Main overlay - gradient from bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/5" />

            {/* Accent overlay */}
            <div
              className="absolute inset-0 opacity-15 mix-blend-screen sm:opacity-20"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${accent},
                  transparent 55%
                )`,
              }}
            />

            {/* Featured badge */}
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6 md:left-7 md:top-7">
              <div className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl sm:px-4 sm:py-2 sm:text-[9px]">
                Featured Specialist
              </div>
            </div>

            {/* Big index - positioned to not overlap on mobile */}
            <div
              ref={numberRef}
              className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 md:bottom-7 md:left-7"
            >
              <span className="text-[clamp(4rem,12vw,10rem)] font-black leading-none tracking-[-0.09em] text-white/85 sm:text-[clamp(5rem,13vw,10rem)]">
                {String(active + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Bottom identity - moved to not overlap with index */}
            <div className="absolute bottom-4 right-4 max-w-[55%] text-right sm:bottom-6 sm:right-6 md:bottom-8 md:right-7">
              <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-[9px]">
                {member.department}
              </div>
              <div className="mt-0.5 text-[10px] font-bold text-white sm:mt-1 sm:text-xs md:text-sm">
                {member.role}
              </div>
            </div>
          </div>

          {/* =================================================
              PROFILE CONTENT
          ================================================= */}
          <div
            ref={contentRef}
            className="relative flex flex-col justify-between bg-white p-5 sm:p-7 md:p-10 lg:min-h-[580px] lg:p-12 xl:p-16"
          >
            {/* Accent edge */}
            <div
              className="absolute right-0 top-0 h-full w-[2px] sm:w-[3px]"
              style={{
                background: `linear-gradient(
                  to bottom,
                  ${accent},
                  ${accent}22 65%,
                  transparent
                )`,
              }}
            />

            {/* Top metadata */}
            <div>
              <div className="mb-6 flex items-center justify-between sm:mb-9">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span
                    className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
                    style={{ backgroundColor: accent }}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
                    {member.department}
                  </span>
                </div>

                <span className="font-mono text-[10px] font-bold text-slate-300 sm:text-xs">
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(members.length).padStart(2, '0')}
                </span>
              </div>

              {/* Name - improved responsive sizing */}
              <h3 className="max-w-xl text-[clamp(1.8rem,4.5vw,5rem)] font-black leading-[0.95] tracking-[-0.04em] text-slate-950 sm:leading-[0.9] sm:tracking-[-0.06em]">
                {member.name}
              </h3>

              {/* Role */}
              <p
                className="mt-3 max-w-lg text-[10px] font-bold uppercase tracking-[0.1em] sm:mt-5 sm:text-xs md:text-sm"
                style={{ color: accent }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <div className="mt-6 max-w-xl border-l-2 border-slate-100 pl-4 sm:mt-9 sm:pl-5 md:pl-6">
                <p className="text-sm leading-7 text-slate-500 sm:text-[15px] sm:leading-7">
                  {member.bio}
                </p>
              </div>

              {/* Expertise */}
              <div className="mt-6 sm:mt-9">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mb-3 sm:text-[9px]">
                  Areas of expertise
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(member.specialties || []).map((specialty, index) => (
                    <span
                      key={`${member.id}-${specialty}-${index}`}
                      className="magnetic-btn inline-flex cursor-default items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[9px] font-semibold text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm sm:px-3.5 sm:py-2 sm:text-[10px]"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom information */}
            <div className="mt-8 border-t border-slate-100 pt-5 sm:mt-10 sm:pt-6 md:mt-12 md:pt-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-7">
                {/* Contribution */}
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Contribution
                  </p>

                  <div className="mt-1 flex items-baseline gap-2 sm:mt-2">
                    <span
                      ref={statsRef}
                      className="text-3xl font-black tracking-[-0.05em] sm:text-4xl"
                      style={{ color: accent }}
                    >
                      {member.stat?.value || '—'}
                    </span>

                    <span className="text-[10px] font-semibold text-slate-400 sm:text-xs">
                      {member.stat?.label || ''}
                    </span>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex items-center gap-2">
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="magnetic-btn group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white sm:h-10 sm:w-10"
                    >
                      <LinkedinIcon />
                    </a>
                  )}

                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} Twitter`}
                      className="magnetic-btn group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:h-10 sm:w-10"
                    >
                      <TwitterIcon />
                    </a>
                  )}

                  {member.socials?.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} Instagram`}
                      className="magnetic-btn group flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500 hover:text-white sm:h-10 sm:w-10"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

       
        {/* =================================================
            FEATURED MEMBER NAVIGATION (NEW APPROACH)
        ================================================= */}
        <div className="mt-8 sm:mt-10">
          {/* Hide scrollbar completely but maintain functionality */}
          <style dangerouslySetInnerHTML={{ __html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }` }} />
          
          <div
            ref={navRef}
            className="hide-scrollbar flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
          >
            {members.map((item, index) => {
              const itemAccent = getAccent(item, index);
              const selected = index === active;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeMember(index)}
                  className={`team-nav-item group relative flex w-[200px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 sm:w-[220px] lg:w-full ${
                    selected
                      ? 'nav-active border-transparent bg-slate-950 shadow-xl'
                      : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  {/* Top Row: Avatar & Arrow Icon */}
                  <div className="flex items-start justify-between">
                    <div
                      className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/10 shadow-sm sm:h-14 sm:w-14"
                      style={{ backgroundColor: `${itemAccent}14` }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="nav-img h-full w-full object-cover object-top transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-xs font-black"
                          style={{ color: itemAccent }}
                        >
                          {getInitials(item)}
                        </div>
                      )}
                    </div>

                    <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300 ${
                      selected ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-800'
                    }`}>
                      <ArrowUpRight size={14} className={`transition-transform duration-300 ${
                        selected ? '' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      }`} />
                    </div>
                  </div>

                  {/* Bottom Row: Text Details */}
                  <div className="mt-5">
                    <p className={`truncate text-[13px] font-bold sm:text-sm ${
                      selected ? 'text-white' : 'text-slate-900'
                    }`}>
                      {item.name}
                    </p>
                    <p className={`mt-0.5 truncate text-[9px] font-bold uppercase tracking-[0.1em] sm:text-[10px] ${
                      selected ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {item.department}
                    </p>
                  </div>

                  {/* Ambient background glow for active state */}
                  {selected && (
                    <div
                      className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-xl transition-all duration-700"
                      style={{ backgroundColor: itemAccent }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Scroll indicator dots strictly for mobile viewing */}
          <div className="mt-2 flex justify-center gap-1.5 lg:hidden">
            {members.map((_, idx) => (
              <div 
                key={`dot-${idx}`} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === active ? 'w-4 bg-slate-800' : 'w-1.5 bg-slate-200'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* =================================================
            WIDER TEAM / PHILOSOPHY
        ================================================= */}
        <div
          ref={philosophyRef}
          className="team-philosophy mt-12 overflow-hidden rounded-2xl bg-slate-950 sm:mt-16 sm:rounded-[1.5rem] lg:mt-20 lg:rounded-[2rem]"
        >
          <div className="relative px-6 py-8 sm:px-10 sm:py-12 md:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-20"
              style={{
                background: `radial-gradient(circle at 80% 30%, ${accent}, transparent 65%)`,
              }}
            />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                  <Sparkles size={12} className="text-blue-400 sm:size-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400 sm:text-[10px]">
                    The wider team
                  </span>
                </div>

                <h4 className="text-2xl font-black leading-tight tracking-[-0.04em] text-white sm:text-3xl md:text-4xl">
                  15 people.
                  <br />
                  <span className="text-slate-500">One creative standard.</span>
                </h4>

                <p className="mt-4 max-w-xl text-xs leading-6 text-slate-400 sm:mt-5 sm:text-sm sm:leading-7">
                  The five specialists featured above represent only part of the
                  wider team. Behind every project is a broader group working
                  across campaign management, advertising, graphic arts,
                  copywriting and community management.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:w-[480px]">
                {['Campaigns', 'Ad Buying', 'Graphic Arts', 'Copywriting'].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-4 text-center transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] sm:px-4 sm:py-5"
                    >
                      <span className="text-[9px] font-semibold leading-tight text-slate-300 sm:text-[10px]">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:gap-6 sm:pt-8">
              <div className="flex -space-x-2 sm:-space-x-3">
                {members.map((item, index) => (
                  <div
                    key={item.id}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-slate-950 bg-slate-800 sm:h-10 sm:w-10"
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-[8px] font-black sm:text-[10px]"
                        style={{ color: getAccent(item, index) }}
                      >
                        {getInitials(item)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-semibold leading-relaxed text-slate-500 sm:text-xs">
                A multidisciplinary team built around quality, strategy and
                creative execution.
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTER META
        ================================================= */}
        <div className="mt-8 flex flex-col gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
          <span>BigTeeWise Digital / Team</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 sm:h-2 sm:w-2" />{' '}
            Creative · Strategy · Execution
          </span>
          <span className="flex items-center gap-1.5 transition-colors hover:text-blue-500 cursor-pointer">
            ← → Explore team <MoveUpRight size={11} className="sm:size-3" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;