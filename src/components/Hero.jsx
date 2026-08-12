'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Play, CheckCircle2, Star, BookOpen, TrendingUp } from 'lucide-react';
import gsap from 'gsap';

export default function Hero({ onOpenQuoteModal, onOpenVideoModal }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

      // Left column stagger reveal
      tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.5 })
        .from('.hero-heading', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5')
        .from('.hero-feature', { opacity: 0, y: 15, stagger: 0.1, duration: 0.5 }, '-=0.4')
        .from('.hero-cta', { opacity: 0, y: 20, stagger: 0.15, duration: 0.5 }, '-=0.3')
        .from('.hero-social', { opacity: 0, y: 15, duration: 0.5 }, '-=0.3')
        // Right visual column reveal
        .from('.hero-image-box', { opacity: 0, scale: 0.92, duration: 0.8 }, '-=1')
        .from('.hero-float-top', { opacity: 0, x: -30, duration: 0.6 }, '-=0.4')
        .from('.hero-float-bottom', { opacity: 0, x: 30, duration: 0.6 }, '-=0.5');

      // Continuous subtle floating loop for badges
      gsap.to('.hero-float-top', {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      gsap.to('.hero-float-bottom', {
        y: 8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden"
    >
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Responsively Padded Category Tag Badge */}
            <div className="hero-badge inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] sm:text-xs font-semibold tracking-wide uppercase">
              <span className="text-blue-500 font-bold shrink-0">//</span>
              <span className="truncate">Premier Book Marketing & Digital Strategy</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.15]">
              Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300">Creativity Meets</span> <br className="hidden sm:inline" />
              <span className="relative inline-block text-blue-500">
                Conversion.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Sub-Headline Description */}
            <p className="hero-desc text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              BigTeeWise Digital is a full-service creative agency in Lagos, Nigeria. We combine creative design, strategic marketing, and specialized <span className="text-blue-400 font-semibold">book marketing & author branding</span> to convert attention into measurable revenue.
            </p>

            {/* Key Value Points */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300 pt-1">
              <div className="hero-feature flex items-center justify-center sm:justify-start gap-2 bg-slate-800/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-700/60 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Author Branding Specialists</span>
              </div>
              <div className="hero-feature flex items-center justify-center sm:justify-start gap-2 bg-slate-800/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-700/60 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Amazon Bestseller Campaigns</span>
              </div>
              <div className="hero-feature flex items-center justify-center sm:justify-start gap-2 bg-slate-800/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-700/60 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Data-Driven Digital Ads</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={onOpenQuoteModal}
                className="hero-cta w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Market Your Book / Brand</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href="#services"
                className="hero-cta w-full sm:w-auto bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white font-semibold text-sm sm:text-base px-6 py-3.5 sm:py-4 rounded-full border border-slate-700 hover:border-slate-500 transition-all duration-300 text-center"
              >
                View All Services
              </a>
            </div>

            {/* Social Proof */}
            <div className="hero-social pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-slate-900 overflow-hidden">
                  <Image fill sizes="36px" src="https://images.pexels.com/photos/5648408/pexels-photo-5648408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100" alt="Client" className="object-cover" />
                </div>
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-slate-900 overflow-hidden">
                  <Image fill sizes="36px" src="https://images.pexels.com/photos/5905895/pexels-photo-5905895.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100" alt="Client" className="object-cover" />
                </div>
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-slate-900 overflow-hidden">
                  <Image fill sizes="36px" src="https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100" alt="Client" className="object-cover" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">5.0</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">Trusted by 150+ Authors & Corporate Brands</p>
              </div>
            </div>

          </div>

          {/* Right Column Visual Image & Floating Badges */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Box */}
              <div className="hero-image-box relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50 group h-[340px] xs:h-[380px] sm:h-[450px]">
                <Image
                  src="https://images.pexels.com/photos/15555955/pexels-photo-15555955.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
                  alt="BigTeeWise Digital Marketing Strategy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

                {/* Video Trigger Button */}
                <button
                  onClick={onOpenVideoModal}
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-blue-500 transition-all duration-300 z-10"
                  title="Watch BigTeeWise Agency Showreel"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
                  <span className="absolute -inset-2 rounded-full border-2 border-blue-400/50 animate-ping pointer-events-none" />
                </button>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 z-10">
                  <p className="text-[10px] sm:text-xs text-blue-400 uppercase font-bold tracking-wider mb-0.5">Featured Specialization</p>
                  <p className="text-xs sm:text-sm font-semibold text-white">Book Covers, 3D Mockups & Author Personal Branding</p>
                </div>
              </div>

              {/* Floating Badge (Top Left) */}
              <div className="hero-float-top absolute -top-4 -left-2 sm:-top-6 sm:-left-6 bg-white text-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 sm:gap-3 z-20">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-extrabold text-slate-900">150+</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Book Launches</div>
                </div>
              </div>

              {/* Floating Badge (Bottom Right) */}
              <div className="hero-float-bottom absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-blue-600 text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-blue-400/30 flex items-center gap-2.5 sm:gap-3 z-20">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-extrabold">99%</div>
                  <div className="text-[10px] sm:text-xs font-medium text-blue-100 uppercase tracking-wider">Client ROI</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}