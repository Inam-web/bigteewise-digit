'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as ContentModule from '../app/Data/content';
import { Star, Quote, Sparkles, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'Kaelen Vaynroth',
    companyOrBook: 'The Silent Horizon',
    rating: 5,
    title: 'Exceeded All My Expectations',
    quote: 'BigTeeWise Digital completely transformed my book launch strategy. Their author branding and targeted campaign drove us straight to the Amazon Bestseller list!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'Zephyrus Thalor',
    companyOrBook: 'Vanguard Media Group',
    rating: 5,
    title: 'Outstanding Digital Growth Partner',
    quote: 'Professional, punctual, and highly results-driven. Their marketing campaigns doubled our digital leads within two months. I cannot recommend them enough.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    name: 'Mireia Solvane',
    companyOrBook: 'Whispers in the Dark',
    rating: 5,
    title: 'Incredible Design & Branding',
    quote: 'The 3D book mockups and cover artwork they designed were stunning. It gave my title instant credibility and boosted reader pre-orders immensely.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 4,
    name: 'Xylophar G. Vex',
    companyOrBook: 'Chronicles of the Void',
    rating: 5,
    title: 'A Game-Changer for Indie Authors',
    quote: 'Their team understood the unique challenges of fantasy marketing. The bespoke campaign they built around my series launch exceeded every sales target I had set.',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 5,
    name: 'Seraphina Moonwhisper',
    companyOrBook: 'Aether Industries',
    rating: 5,
    title: 'Unmatched Creative Vision',
    quote: 'From the initial concept to final execution, BigTeeWise delivered a brand identity that perfectly captured the ethereal quality of my work. Absolutely magical results.',
    avatar: 'https://images.pexels.com/photos/4153141/pexels-photo-4153141.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 6,
    name: 'Dorian Blackwell',
    companyOrBook: 'The Obsidian Codex',
    rating: 5,
    title: 'Precision Marketing at Its Finest',
    quote: 'The data-driven approach they took to my book launch was remarkable. Every ad dollar was optimized, and the ROI spoke for itself. A true strategic partner.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 7,
    name: 'Lyra Starweaver',
    companyOrBook: 'Nebula Publishing',
    rating: 5,
    title: 'Transformed Our Digital Presence',
    quote: 'BigTeeWise rebuilt our entire digital ecosystem from the ground up. The new website, funnels, and ad strategy tripled our subscriber base in just ninety days.',
    avatar: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 8,
    name: 'Thorne Ashford',
    companyOrBook: 'Echoes of Eldoria',
    rating: 5,
    title: 'Beyond What I Imagined Possible',
    quote: 'I came to them with a rough manuscript and a dream. They delivered a full-scale publishing strategy, cover design, and launch plan that landed me a spot on multiple bestseller charts.',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 9,
    name: 'Cassius Vale',
    companyOrBook: 'The Last Spellbinder',
    rating: 5,
    title: 'Elite-Level Author Services',
    quote: 'Their understanding of the literary market is unparalleled. The launch campaign they orchestrated for my trilogy created a sustained sales velocity I did not think was possible for an indie author.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export default function TestimonialsSection() {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);

  const testimonialsList = ContentModule.TESTIMONIALS || DEFAULT_TESTIMONIALS;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ============================================================
  // GSAP ANIMATIONS - OPTIMIZED FOR ALL SCREENS
  // ============================================================
  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.testimonial-header-item, .testimonial-card', {
          opacity: 1,
          y: 0,
          clearProps: 'transform,opacity',
        });
        return;
      }

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // ✅ Device-specific durations
      const dur = isMobile ? 0.5 : (isTablet ? 0.7 : 1);
      const staggerDur = isMobile ? 0.06 : (isTablet ? 0.1 : 0.15);
      const yOffset = isMobile ? 20 : (isTablet ? 30 : 40);

      // ====== SET INITIAL STATES ======
      gsap.set('.testimonial-header-item', {
        y: yOffset,
        opacity: 0,
        willChange: 'transform, opacity',
      });

      gsap.set('.testimonial-card', {
        opacity: 0,
        scale: isMobile ? 0.97 : 0.95,
        willChange: 'transform, opacity',
      });

      // ====== HEADER ANIMATION ======
      gsap.to('.testimonial-header-item', {
        y: 0,
        opacity: 1,
        duration: dur,
        stagger: staggerDur * 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 88%' : 'top 80%',
          once: true,
        },
      });

      // ====== FLOATING ORBS (Desktop only) ======
      if (!isMobile && !isTablet) {
        gsap.to('.testimonial-orb-1', {
          y: -25,
          x: 20,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: 'auto',
        });

        gsap.to('.testimonial-orb-2', {
          y: 30,
          x: -15,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
          overwrite: 'auto',
        });
      }

      // ====== CARD SCROLL-TRIGGERED ANIMATION ======
      // Animate cards when they come into view
      const cards = document.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, scale: isMobile ? 0.97 : 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.5 : 0.8,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      // ====== REFRESH SCROLLTRIGGER ======
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === sectionRef.current || sectionRef.current?.contains(st.trigger)) {
          st.kill();
        }
      });
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="py-16 sm:py-24 lg:py-28 bg-[#0F172A] text-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="testimonial-orb-1 absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="testimonial-orb-2 absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
          <div className="testimonial-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <span className="text-blue-400 font-extrabold" aria-hidden="true">//</span>
            <span>Testimonials</span>
          </div>

          <h2 className="testimonial-header-item text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            What Our <span className="text-blue-400">Clients Say</span>
          </h2>

          <p className="testimonial-header-item text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Read real client feedback from authors, publishers, and business executives who scaled their growth with BigTeeWise Digital.
          </p>

          <div className="testimonial-header-item flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
            <Users className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>Trusted by 2000+ clients worldwide</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
          </div>
        </div>

        {/* Testimonials Marquee Carousel */}
        <div className="carousel-container relative overflow-hidden mb-10">
          <div className="carousel-track flex gap-6 sm:gap-8">
            {[...testimonialsList, ...testimonialsList].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="testimonial-card group flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[520px] bg-gradient-to-br from-slate-800/90 to-slate-800/70 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/60 hover:border-blue-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 cursor-pointer relative"
              >
                {/* Quote Icon - Decorative */}
                <div className="testimonial-quote-icon absolute top-6 right-6 sm:top-8 sm:right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Quote className="w-12 h-12 sm:w-14 sm:h-14 text-blue-400" strokeWidth={1.5} aria-hidden="true" />
                </div>

                {/* Gradient accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="testimonial-content relative">
                  {/* Rating Stars */}
                  <div className="testimonial-stars flex items-center gap-1.5 mb-4">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={0} aria-hidden="true" />
                    ))}
                    <span className="text-xs font-bold text-slate-400 ml-2">5.0</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
                    &ldquo;{item.title}&rdquo;
                  </h3>

                  {/* Quote Text */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {item.quote}
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-5 border-t border-slate-700/40 group-hover:border-blue-500/20 transition-colors duration-300">
                  <div className="testimonial-avatar relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-500/10">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base sm:text-lg leading-snug group-hover:text-blue-400 transition-colors duration-300">
                      {item.name}
                    </h4>
                    {item.role && <p className="text-xs font-semibold text-blue-400">{item.role}</p>}
                    {item.companyOrBook && <p className="text-[11px] text-slate-400 mt-0.5">{item.companyOrBook}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="testimonial-header-item mt-10 text-center">
          <div className="inline-flex items-center gap-4 sm:gap-6 bg-slate-800/40 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2.5 border border-slate-700/50">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              ⭐ 4.9/5 Average Rating
            </span>
            <span className="w-px h-5 bg-slate-700" />
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Based on 500+ Reviews
            </span>
          </div>
        </div>

      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .carousel-track {
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-track {
            animation: none;
          }
        }
        @media (max-width: 767px) {
          .carousel-track {
            animation-duration: 14s;
          }
        }
      `}</style>
    </section>
  );
}