'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../app/Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection({ onOpenVideoModal, onOpenQuoteModal }) {
  const sectionRef = useRef(null);

  const aboutText =
    BUSINESS_INFO?.fullAbout ||
    'BigTeeWise Digital is a full-service creative agency in Lagos, Nigeria. We combine creative design, strategic marketing, and specialized book marketing & author branding to convert attention into measurable revenue.';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Collage Grid Photo Reveal - Slower, relaxed fade & slide
      gsap.fromTo(
        '.about-photo',
        { y: 40, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.22,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // Play Button Pulse Pop - Slower pop-in sequence
      gsap.fromTo(
        '.about-play-btn',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          delay: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // Right Text Sequence Reveal - Unhurried cascade
      gsap.fromTo(
        '.about-text-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // Metrics Counter Grid - Gradual scale and rise
      gsap.fromTo(
        '.about-metric-item',
        { scale: 0.85, opacity: 0, y: 15 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.about-metrics-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* Left Collage Photo Grid */}
          <div className="xl:col-span-6 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative">
              
              {/* Photo 1 - Top Left */}
              <div className="about-photo relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group h-44 md:h-56 lg:h-64">
                <Image
                  src="https://images.pexels.com/photos/15543037/pexels-photo-15543037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
                  alt="BigTeeWise Team Collaborating"
                  fill
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Photo 2 - Top Right */}
              <div className="about-photo relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group h-44 md:h-56 lg:h-64 mt-4 sm:mt-6">
                <Image
                  src="https://images.pexels.com/photos/5648408/pexels-photo-5648408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
                  alt="BigTeeWise Executive Director"
                  fill
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Photo 3 - Bottom Left */}
              <div className="about-photo relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group h-44 md:h-56 lg:h-64 -mt-4 sm:-mt-6">
                <Image
                  src="https://images.pexels.com/photos/8154578/pexels-photo-8154578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
                  alt="Digital Marketing Campaign Strategy"
                  fill
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Photo 4 - Bottom Right */}
              <div className="about-photo relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group h-44 md:h-56 lg:h-64">
                <Image
                  src="https://images.pexels.com/photos/15635247/pexels-photo-15635247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600"
                  alt="Book Branding Materials"
                  fill
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Center Circular Interactive Play Button */}
              <button
                onClick={onOpenVideoModal}
                className="about-play-btn absolute inset-0 m-auto w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl border-4 border-white hover:scale-110 hover:bg-blue-700 transition-all duration-500 ease-out z-10 group"
                title="Watch Agency Video"
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -inset-1 rounded-full border-2 border-blue-400 animate-ping pointer-events-none opacity-75" />
              </button>

              {/* Decorative Blue Corner Accent */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-28 sm:h-28 border-l-4 border-b-4 border-blue-600 rounded-bl-2xl sm:rounded-bl-3xl pointer-events-none" />
            </div>
          </div>

          {/* Right Text Content */}
          <div className="xl:col-span-6 space-y-6">
            
            {/* Tag Badge */}
            <div className="about-text-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <span className="text-blue-600 font-extrabold">//</span>
              <span>About BigTeeWise Digital</span>
            </div>

            {/* Title */}
            <h2 className="about-text-item text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight">
              Transforming <span className="text-blue-600">Ideas & Books</span> into Digital Reality
            </h2>

            {/* Description */}
            <p className="about-text-item text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
              {aboutText}
            </p>

            {/* Key Value Points */}
            <div className="about-text-item grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Author Positioning</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Elevating authors into trusted industry authorities.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Conversion-Focused</h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Every design and campaign is optimized for direct sales.</p>
                </div>
              </div>
            </div>

            {/* Key Metrics Counter Grid */}
            <div className="about-metrics-grid about-text-item grid grid-cols-3 gap-2 md:gap-4 py-5 border-y border-slate-200">
              <div className="about-metric-item p-2 sm:p-3 bg-slate-50 md:bg-transparent rounded-2xl text-center md:text-left">
                <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-blue-600 tracking-tight">150+</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Projects Delivered</div>
              </div>
              <div className="about-metric-item p-2 sm:p-3 bg-slate-50 md:bg-transparent rounded-2xl text-center md:text-left">
                <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">2000+</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Happy Clients</div>
              </div>
              <div className="about-metric-item p-2 sm:p-3 bg-slate-50 md:bg-transparent rounded-2xl text-center md:text-left">
                <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-blue-600 tracking-tight">99%</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider mt-1">Satisfaction Rate</div>
              </div>
            </div>

            {/* CEO Signature Section */}
            <div className="about-text-item flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-blue-600/30 shrink-0">
                  <Image
                    src="https://images.pexels.com/photos/5648408/pexels-photo-5648408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=120&w=120"
                    alt="Tayo Wise Obasa"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">Tayo Wise Obasa</h4>
                  <p className="text-[11px] sm:text-xs font-bold text-blue-600 uppercase tracking-wider">Founder & Creative Director</p>
                </div>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-full shadow-md shadow-blue-600/20 transition-all active:scale-95 duration-300"
              >
                <span>Work With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}