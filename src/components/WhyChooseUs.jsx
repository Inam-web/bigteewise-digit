'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, DollarSign, Users, Award, ShieldCheck, ArrowRight, Sparkles, Target, TrendingUp, Star, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs({ onOpenQuoteModal, onOpenVideoModal }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;

      // Header Animation
      gsap.fromTo(
        '.why-header-item',
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

      // Media Image Card Animation with scale
      gsap.fromTo(
        '.why-media-card',
        { x: -40, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-media-card',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity,scale',
        }
      );

      // Feature Grid Cards Animation with stagger
      gsap.fromTo(
        '.why-feature-card',
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.7 : 1,
          stagger: isMobile ? 0.08 : 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-grid-container',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity,scale',
        }
      );

      // Floating orbs animation
      gsap.to('.why-orb-1', {
        y: -20,
        x: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0,
      });

      gsap.to('.why-orb-2', {
        y: 25,
        x: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // Play button pulse ring
      gsap.to('.why-pulse-ring', {
        scale: 1.4,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
        delay: 0.5,
      });

      // Feature cards hover animations via GSAP
      const cards = document.querySelectorAll('.why-feature-card');
      cards.forEach((card) => {
        const icon = card.querySelector('.why-feature-icon');
        const title = card.querySelector('.why-feature-title');
        const desc = card.querySelector('.why-feature-desc');

        card.addEventListener('mouseenter', () => {
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.4,
              ease: 'power2.out',
            });
          }
          if (title) {
            gsap.to(title, {
              color: '#60a5fa',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
          if (desc) {
            gsap.to(desc, {
              color: '#e2e8f0',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          }
          if (title) {
            gsap.to(title, {
              color: '#ffffff',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
          if (desc) {
            gsap.to(desc, {
              color: '#94a3b8',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });
      });

      // Stat numbers animation
      gsap.fromTo(
        '.why-stat-number',
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.why-stats-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Conversion & ROI Focus',
      description: "We don't just design pretty graphics—we build campaigns engineered for actual sales, book downloads, and lead acquisition.",
      stat: '150+',
      statLabel: 'Projects Delivered'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Author Branding Experts',
      description: 'Deep specialized knowledge in Amazon KDP algorithms, reader funnels, book covers, and press kits.',
      stat: '2000+',
      statLabel: 'Authors Served'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: '8+ Years Expertise',
      description: 'Proven track record with over 150+ successful projects, Bestseller book launches, and corporate growth campaigns.',
      stat: '99%',
      statLabel: 'Satisfaction Rate'
    },
    {
      icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Bespoke Design Quality',
      description: 'Award-winning 3D mockups, book covers, and visual identities crafted to set your brand apart in competitive markets.',
      stat: '4.9★',
      statLabel: 'Client Rating'
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="why-choose-us" 
      className="py-16 sm:py-24 lg:py-28 bg-[#0F172A] text-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="why-orb-1 absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="why-orb-2 absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="why-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <span className="text-blue-400 font-extrabold">//</span>
              <span>Why Choose Us</span>
            </div>

            <h2 className="why-header-item text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Why Trust BigTeeWise Digital <br className="hidden sm:inline" />
              for <span className="text-blue-400">Your Growth?</span>
            </h2>

            <p className="why-header-item text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              We combine creative excellence with strategic thinking to deliver measurable results for authors and businesses worldwide.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="why-header-item bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm px-7 sm:px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 self-start lg:self-auto group"
          >
            <span>Get A Free Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image with Video Button Overlay */}
          <div className="why-media-card lg:col-span-6 relative">
            <div className="relative h-[380px] sm:h-[450px] lg:h-[520px] w-full rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-blue-600/10 group">
              <Image
                src="https://images.pexels.com/photos/32082430/pexels-photo-32082430.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
                alt="BigTeeWise Team Consultation"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent group-hover:from-slate-950/60 transition-colors duration-500" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 border border-white/20 shadow-lg flex items-center gap-2 z-20">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] sm:text-xs font-bold text-slate-900">Creative Strategy Studio</span>
              </div>

              {/* Play Button Overlay */}
              <button
                onClick={onOpenVideoModal}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 hover:bg-blue-500 transition-all duration-300 group/btn z-20"
                title="Watch Agency Showreel"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-0.5 group-hover/btn:scale-110 transition-transform" />
                <span className="why-pulse-ring absolute inset-0 rounded-full border-2 border-blue-400/50 pointer-events-none" />
              </button>

              {/* Bottom Info Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 z-20 shadow-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Based in UK, United Kingdom</p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                  Serving authors & corporate clients worldwide with world-class standard
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 border-b-4 border-r-4 border-blue-500 rounded-br-3xl pointer-events-none z-10 opacity-60" />
            </div>
          </div>

          {/* Right Column: 4 Feature Grid Cards */}
          <div className="why-grid-container lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            
            {features.map((feature, index) => (
              <div
                key={index}
                className="why-feature-card group bg-slate-800/50 hover:bg-slate-800 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700/60 hover:border-blue-500/50 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-600/10 cursor-pointer"
              >
                {/* Icon */}
                <div className="why-feature-icon w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:bg-blue-600/30 group-hover:border-blue-400/50 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="why-feature-title text-sm sm:text-base lg:text-lg font-bold text-white mt-3 sm:mt-4 group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="why-feature-desc text-slate-400 text-xs sm:text-sm leading-relaxed mt-1.5 group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Stat Badge */}
                <div className="why-stat-number mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-black text-blue-400">
                    {feature.stat}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {feature.statLabel}
                  </span>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* Stats Bar - Additional Trust Signal */}
        <div className="why-stats-container mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="why-stat-number bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-700/50 text-center hover:border-blue-500/30 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">150+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Projects Delivered</div>
          </div>
          <div className="why-stat-number bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-700/50 text-center hover:border-blue-500/30 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">2000+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Happy Authors</div>
          </div>
          <div className="why-stat-number bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-700/50 text-center hover:border-blue-500/30 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">99%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Satisfaction Rate</div>
          </div>
          <div className="why-stat-number bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-700/50 text-center hover:border-blue-500/30 transition-all duration-300">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">4.9★</div>
            <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Client Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
}