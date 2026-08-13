'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import * as ContentModule from '../app/Data/content';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Bestselling Author',
    companyOrBook: 'The Silent Horizon',
    rating: 5,
    title: 'Exceeded All My Expectations',
    quote: 'BigTeeWise Digital completely transformed my book launch strategy. Their author branding and targeted campaign drove us straight to the Amazon Bestseller list!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'David Adeleke',
    role: 'CEO & Founder',
    companyOrBook: 'Vanguard Media Group',
    rating: 5,
    title: 'Outstanding Digital Growth Partner',
    quote: 'Professional, punctual, and highly results-driven. Their marketing campaigns doubled our digital leads within two months. I cannot recommend them enough.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Self-Published Novelist',
    companyOrBook: 'Whispers in the Dark',
    rating: 5,
    title: 'Incredible Design & Branding',
    quote: 'The 3D book mockups and cover artwork they designed were stunning. It gave my title instant credibility and boosted reader pre-orders immensely.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export default function TestimonialsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const testimonialsList = ContentModule.TESTIMONIALS || DEFAULT_TESTIMONIALS;
  const listLength = testimonialsList.length;

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev + 1) % listLength);
  };

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev - 1 + listLength) % listLength);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.testimonial-header-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // Card Animation with stagger
      gsap.fromTo(
        '.testimonial-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonial-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity,scale',
        }
      );

      // Floating orbs
      gsap.to('.testimonial-orb-1', {
        y: -25,
        x: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.testimonial-orb-2', {
        y: 30,
        x: -15,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // Card hover animations with GSAP
      const cards = document.querySelectorAll('.testimonial-card');
      cards.forEach((card) => {
        const quoteIcon = card.querySelector('.testimonial-quote-icon');
        const content = card.querySelector('.testimonial-content');
        const stars = card.querySelector('.testimonial-stars');
        const avatar = card.querySelector('.testimonial-avatar');

        card.addEventListener('mouseenter', () => {
          // Card lift
          gsap.to(card, {
            y: -8,
            duration: 0.4,
            ease: 'power2.out',
          });

          // Quote icon
          if (quoteIcon) {
            gsap.to(quoteIcon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.4,
              ease: 'power2.out',
            });
          }

          // Content
          if (content) {
            gsap.to(content, {
              y: -2,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          // Stars
          if (stars) {
            gsap.to(stars, {
              scale: 1.05,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          // Avatar
          if (avatar) {
            gsap.to(avatar, {
              scale: 1.05,
              rotate: -3,
              duration: 0.4,
              ease: 'power2.out',
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });

          if (quoteIcon) {
            gsap.to(quoteIcon, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          }

          if (content) {
            gsap.to(content, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          if (stars) {
            gsap.to(stars, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          if (avatar) {
            gsap.to(avatar, {
              scale: 1,
              rotate: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const item1 = testimonialsList[currentIdx];
  const item2 = testimonialsList[(currentIdx + 1) % listLength];

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
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
          <div className="testimonial-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <span className="text-blue-400 font-extrabold">//</span>
            <span>Testimonials</span>
          </div>

          <h2 className="testimonial-header-item text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            What Our <span className="text-blue-400">Clients Say</span>
          </h2>

          <p className="testimonial-header-item text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Read real client feedback from authors, publishers, and business executives who scaled their growth with BigTeeWise Digital.
          </p>

          <div className="testimonial-header-item flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Trusted by 2000+ clients worldwide</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          
          {/* Card 1 */}
          {item1 && (
            <div className="testimonial-card group bg-gradient-to-br from-slate-800/90 to-slate-800/70 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/60 hover:border-blue-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 cursor-pointer relative">
              
              {/* Quote Icon - Decorative */}
              <div className="testimonial-quote-icon absolute top-6 right-6 sm:top-8 sm:right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Quote className="w-12 h-12 sm:w-14 sm:h-14 text-blue-400" strokeWidth={1.5} />
              </div>

              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="testimonial-content relative">
                {/* Rating Stars */}
                <div className="testimonial-stars flex items-center gap-1.5 mb-4">
                  {[...Array(item1.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-2">5.0</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
                  &ldquo;{item1.title}&rdquo;
                </h3>

                {/* Quote Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {item1.quote}
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-5 border-t border-slate-700/40 group-hover:border-blue-500/20 transition-colors duration-300">
                <div className="testimonial-avatar relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-500/10">
                  <Image
                    src={item1.avatar}
                    alt={item1.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base sm:text-lg leading-snug group-hover:text-blue-400 transition-colors duration-300">
                    {item1.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-400">{item1.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item1.companyOrBook}</p>
                </div>
              </div>
            </div>
          )}

          {/* Card 2 (Desktop only) */}
          {item2 && (
            <div className="testimonial-card hidden md:flex group bg-gradient-to-br from-slate-800/90 to-slate-800/70 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/60 hover:border-blue-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 cursor-pointer relative">
              
              {/* Quote Icon - Decorative */}
              <div className="testimonial-quote-icon absolute top-6 right-6 sm:top-8 sm:right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <Quote className="w-12 h-12 sm:w-14 sm:h-14 text-blue-400" strokeWidth={1.5} />
              </div>

              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="testimonial-content relative">
                {/* Rating Stars */}
                <div className="testimonial-stars flex items-center gap-1.5 mb-4">
                  {[...Array(item2.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-2">5.0</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight">
                  &ldquo;{item2.title}&rdquo;
                </h3>

                {/* Quote Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {item2.quote}
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 pt-5 border-t border-slate-700/40 group-hover:border-blue-500/20 transition-colors duration-300">
                <div className="testimonial-avatar relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-blue-500/30 group-hover:ring-blue-400/50 transition-all duration-300 shadow-lg shadow-blue-500/10">
                  <Image
                    src={item2.avatar}
                    alt={item2.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base sm:text-lg leading-snug group-hover:text-blue-400 transition-colors duration-300">
                    {item2.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-400">{item2.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item2.companyOrBook}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Carousel Navigation - Premium Controls */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-blue-600 active:scale-95 text-white flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-blue-500 shadow-lg hover:shadow-blue-600/20 touch-manipulation group"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots Indicator - Premium */}
          <div className="flex items-center gap-2.5">
            {testimonialsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`relative h-2.5 rounded-full transition-all duration-500 ${
                  idx === currentIdx 
                    ? 'w-10 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30' 
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentIdx && (
                  <span className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping-slow" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-slate-800/80 hover:bg-blue-600 active:scale-95 text-white flex items-center justify-center transition-all duration-300 border border-slate-700/50 hover:border-blue-500 shadow-lg hover:shadow-blue-600/20 touch-manipulation group"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
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
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}