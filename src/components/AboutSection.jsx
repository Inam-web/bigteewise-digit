'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, CheckCircle2, ArrowRight, Sparkles, Target, TrendingUp, Users, ShieldCheck } from 'lucide-react';
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
    'BigTeeWise Digital is a full-service creative agency in UK, United Kingdom. We combine creative design, strategic marketing, and specialized book marketing & author branding to convert attention into measurable revenue.';

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches;

      gsap.set('.about-reveal', { opacity: 0, y: isMobile ? 20 : 35 });
      gsap.set('.about-photo', { opacity: 0, scale: 0.96 });
      gsap.set('.about-play-btn', { opacity: 0, scale: 0.7 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      intro
        .to('.about-photo', {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.7 : 1,
          stagger: 0.12,
          ease: 'power3.out',
        })
        .to(
          '.about-play-btn',
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.6)',
          },
          '-=0.55'
        )
        .to(
          '.about-reveal',
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.65 : 0.8,
            stagger: isMobile ? 0.08 : 0.12,
            ease: 'power3.out',
          },
          '-=0.35'
        );

      if (!isMobile && !isTablet) {
        gsap.to('.about-orbit', {
          y: -18,
          x: 8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('.about-photo-main', {
          y: -10,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to('.about-photo-secondary', {
          y: 12,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4,
        });

        gsap.fromTo(
          '.about-scroll-card',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-scroll-content',
              start: 'top 72%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to('.about-progress', {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
      }

      gsap.fromTo(
        '.about-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white text-slate-900"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-slate-100/80 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop editorial layout - FIXED */}
        <div className="xl:grid xl:grid-cols-12 xl:gap-8">
          
          {/* STICKY VISUAL AREA - Fixed position wrapper */}
          <div className="xl:col-span-6">
            <div className="xl:sticky xl:top-0 flex items-center min-h-screen">
              <div className="relative w-full h-[560px] sm:h-[620px] lg:h-[660px] xl:h-[700px] max-h-[760px]">

                {/* Large soft frame */}
                <div className="about-orbit absolute inset-4 sm:inset-8 rounded-[2.5rem] border border-blue-100 bg-blue-50/30" />

                {/* Main image */}
                <div className="about-photo about-photo-main absolute left-0 top-10 sm:top-12 w-[68%] h-[57%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-10">
                  <Image
                    src="https://images.pexels.com/photos/15543037/pexels-photo-15543037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800"
                    alt="BigTeeWise creative strategy team"
                    fill
                    sizes="(max-width: 1280px) 60vw, 35vw"
                    className="object-cover"
                  />

                  <div className="absolute top-4 left-4 px-3 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-800">
                      Creative Strategy Studio
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>

                {/* Secondary portrait */}
                <div className="about-photo about-photo-secondary absolute right-0 top-[21%] sm:top-[23%] w-[48%] h-[51%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20">
                  <Image
                    src="https://images.pexels.com/photos/5648408/pexels-photo-5648408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700"
                    alt="BigTeeWise creative director"
                    fill
                    sizes="(max-width: 1280px) 45vw, 25vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom image */}
                <div className="about-photo absolute left-0 bottom-0 sm:bottom-3 w-[57%] h-[38%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-30">
                  <Image
                    src="https://images.pexels.com/photos/8154578/pexels-photo-8154578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=800"
                    alt="Digital marketing strategy"
                    fill
                    sizes="(max-width: 1280px) 55vw, 30vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom right image */}
                <div className="about-photo absolute right-0 bottom-0 sm:bottom-3 w-[43%] h-[29%] rounded-[1.75rem] overflow-hidden shadow-2xl border-4 border-white z-40">
                  <Image
                    src="https://images.pexels.com/photos/15635247/pexels-photo-15635247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=800"
                    alt="Book branding materials"
                    fill
                    sizes="(max-width: 1280px) 42vw, 23vw"
                    className="object-cover"
                  />
                </div>

                {/* Play button */}
                <button
                  onClick={onOpenVideoModal}
                  className="about-play-btn absolute left-[50%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl border-4 border-white hover:bg-blue-700 hover:scale-105 transition-all duration-300 z-50"
                  title="Watch Agency Video"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                  <span className="absolute -inset-2 rounded-full border border-blue-500/30 animate-ping pointer-events-none" />
                </button>

                {/* Floating label */}
                <div className="about-reveal absolute -bottom-3 left-4 sm:left-8 z-50 bg-slate-950 text-white rounded-2xl px-4 py-3 shadow-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold">Strategy • Creativity • Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCROLLING CONTENT - This will determine section height */}
          <div className="xl:col-span-6 relative z-50">
            <div className="about-scroll-content space-y-5 sm:space-y-6 py-8 xl:py-16">
              {/* Added vertical padding to create enough scroll height */}

              {/* Intro */}
              <div className="about-scroll-card bg-white/95 backdrop-blur-md rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10">
                <div className="about-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase">
                  <span className="font-extrabold">{"//"}</span>
                  <span>About BigTeeWise Digital</span>
                </div>

                <h2 className="about-reveal mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08]">
                  Transforming <span className="text-blue-600">Ideas & Books</span> into Digital Reality
                </h2>

                <p className="about-reveal mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                  {aboutText}
                </p>

                <p className="about-reveal mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
                  Our approach goes beyond attractive visuals. We connect strategy, storytelling, design, marketing and digital growth to create brand experiences that stand out and produce meaningful business outcomes.
                </p>
              </div>

              {/* Approach */}
              <div className="about-scroll-card bg-slate-950 text-white rounded-[2rem] p-6 sm:p-8 lg:p-9 shadow-xl overflow-hidden relative">
                <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    Our Approach
                  </div>

                  <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold">
                    Creative work backed by strategy.
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Sparkles className="w-5 h-5 text-blue-400 mb-3" />
                      <h4 className="font-bold">Creative Direction</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                        Strong visual identities, book covers, campaigns and digital experiences built to be remembered.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <TrendingUp className="w-5 h-5 text-blue-400 mb-3" />
                      <h4 className="font-bold">Growth Strategy</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                        Marketing systems designed to turn attention into engagement, leads and measurable growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Value points */}
              <div className="about-scroll-card bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="about-reveal grid sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Author Positioning</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Elevating authors into trusted industry authorities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Conversion-Focused</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Campaigns and designs created around real business goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Audience First</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Every message is shaped around the people you want to reach.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Long-Term Value</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Building digital assets and strategies that continue working beyond launch day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="about-scroll-card about-stats grid grid-cols-3 gap-2 sm:gap-3">
                <div className="about-stat rounded-2xl bg-blue-600 text-white p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-black">150+</div>
                  <p className="text-[10px] sm:text-xs text-blue-100 font-semibold uppercase tracking-wide mt-1">
                    Projects
                  </p>
                </div>

                <div className="about-stat rounded-2xl bg-slate-950 text-white p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-black">2000+</div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wide mt-1">
                    Clients
                  </p>
                </div>

                <div className="about-stat rounded-2xl bg-slate-100 text-slate-900 p-4 sm:p-5">
                  <div className="text-2xl sm:text-3xl font-black">99%</div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide mt-1">
                    Satisfaction
                  </p>
                </div>
              </div>

              {/* Founder / CTA */}
              <div className="about-scroll-card bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-3.5">
                    <div>
                      <h4 className="font-bold text-slate-900">Peter Taiwo Godswill</h4>
                      <p className="text-[10px] sm:text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">
                        Founder & Creative Director
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-blue-600/20 transition-all duration-300 active:scale-95"
                  >
                    Work With Us
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress indicator — desktop only */}
        <div className="hidden xl:block absolute left-1/2 top-32 bottom-32 w-px bg-slate-200 -translate-x-1/2 pointer-events-none">
          <div className="about-progress absolute top-0 left-0 w-full h-full bg-blue-600 scale-y-0" />
        </div>
      </div>
    </section>
  );
}