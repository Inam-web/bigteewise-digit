'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, CheckCircle2, ArrowRight, Sparkles, Target, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../app/Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Reduce motion helper
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function AboutSection({ onOpenVideoModal, onOpenQuoteModal }) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ============================================================
  // GSAP ANIMATIONS - OPTIMIZED FOR ALL SCREENS
  // ============================================================
  useEffect(() => {
    if (!sectionRef.current || !isMounted) return;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1279px)').matches;

      if (prefersReducedMotion()) {
        gsap.set([
          '.about-reveal',
          '.about-photo',
          '.about-play-btn',
          '.about-scroll-card',
          '.about-stat',
        ], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'transform,opacity',
        });
        return;
      }

      // ====== DEVICE-SPECIFIC DURATIONS ======
      const dur = isMobile ? 0.5 : (isTablet ? 0.7 : 1);
      const staggerDur = isMobile ? 0.06 : (isTablet ? 0.09 : 0.12);
      const yOffset = isMobile ? 15 : (isTablet ? 25 : 35);

      // ====== SET INITIAL STATES ======
      gsap.set('.about-reveal', {
        opacity: 0,
        y: yOffset,
        willChange: 'transform, opacity',
      });
      gsap.set('.about-photo', {
        opacity: 0,
        scale: isMobile ? 0.98 : 0.96,
        willChange: 'transform, opacity',
      });
      gsap.set('.about-play-btn', {
        opacity: 0,
        scale: 0.7,
        willChange: 'transform, opacity',
      });
      gsap.set('.about-stat', {
        opacity: 0,
        y: isMobile ? 12 : 20,
        willChange: 'transform, opacity',
      });
      gsap.set('.about-scroll-card', {
        opacity: 0,
        y: isMobile ? 25 : 50,
        willChange: 'transform, opacity',
      });

      // ====== MAIN INTRO TIMELINE ======
      const intro = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 85%' : 'top 78%',
          once: true,
        },
      });

      intro
        .to('.about-photo', {
          opacity: 1,
          scale: 1,
          duration: dur,
          stagger: isMobile ? 0.08 : 0.12,
          overwrite: 'auto',
        })
        .to('.about-play-btn', {
          opacity: 1,
          scale: 1,
          duration: isMobile ? 0.5 : 0.7,
          ease: 'back.out(1.6)',
          overwrite: 'auto',
        }, '-=0.4')
        .to('.about-reveal', {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.5 : 0.8,
          stagger: isMobile ? 0.06 : 0.12,
          overwrite: 'auto',
        }, '-=0.25');

      // ====== SCROLL-TRIGGERED CARD ANIMATIONS ======
      const cardsTrigger = ScrollTrigger.create({
        trigger: '.about-scroll-content',
        start: isMobile ? 'top 80%' : 'top 72%',
        onEnter: () => {
          gsap.fromTo('.about-scroll-card',
            { y: isMobile ? 25 : 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: isMobile ? 0.08 : 0.15,
              duration: isMobile ? 0.5 : 0.8,
              ease: 'power3.out',
              overwrite: 'auto',
            }
          );
        },
        once: true,
      });

      // ====== STATS ANIMATION ======
      const statsTrigger = ScrollTrigger.create({
        trigger: '.about-stats',
        start: isMobile ? 'top 90%' : 'top 85%',
        onEnter: () => {
          gsap.fromTo('.about-stat',
            { opacity: 0, y: isMobile ? 12 : 20 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.4 : 0.65,
              stagger: isMobile ? 0.06 : 0.1,
              ease: 'power3.out',
              overwrite: 'auto',
            }
          );
        },
        once: true,
      });

      // ====== FLOATING ANIMATIONS - Desktop only ======
      if (!isMobile && !isTablet) {
        // Orbit floating
        gsap.to('.about-orbit', {
          y: -14,
          x: 6,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: 'auto',
        });

        // Main photo floating
        gsap.to('.about-photo-main', {
          y: -8,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          overwrite: 'auto',
        });

        // Secondary photo floating
        gsap.to('.about-photo-secondary', {
          y: 10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4,
          overwrite: 'auto',
        });

        // ====== PROGRESS BAR ======
        gsap.to('.about-progress', {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // ====== REFRESH SCROLLTRIGGER ======
      ScrollTrigger.refresh();

      // ====== STORE TRIGGERS FOR CLEANUP ======
      return () => {
        cardsTrigger.kill();
        statsTrigger.kill();
      };

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

  // ============================================================
  // DATA
  // ============================================================
  const values = [
    {
      icon: CheckCircle2,
      title: t('about.values.authorPositioningTitle'),
      desc: t('about.values.authorPositioningDesc'),
    },
    {
      icon: TrendingUp,
      title: t('about.values.conversionFocusedTitle'),
      desc: t('about.values.conversionFocusedDesc'),
    },
    {
      icon: Users,
      title: t('about.values.audienceFirstTitle'),
      desc: t('about.values.audienceFirstDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('about.values.longTermValueTitle'),
      desc: t('about.values.longTermValueDesc'),
    },
  ];

  const stats = [
    { value: t('about.stats.projectsValue'), label: t('about.stats.projectsLabel'), color: 'blue' },
    { value: t('about.stats.clientsValue'), label: t('about.stats.clientsLabel'), color: 'dark' },
    { value: t('about.stats.satisfactionValue'), label: t('about.stats.satisfactionLabel'), color: 'light' },
  ];

  // ============================================================
  // COLOR HELPERS
  // ============================================================
  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-600 text-white',
      dark: 'bg-slate-950 text-white',
      light: 'bg-slate-100 text-slate-900',
    };
    return colors[color] || colors.blue;
  };

  const getStatLabelColor = (color) => {
    const colors = {
      blue: 'text-blue-100',
      dark: 'text-slate-400',
      light: 'text-slate-500',
    };
    return colors[color] || colors.blue;
  };

  // ============================================================
  // RENDER
  // ============================================================
  if (!isMounted) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white text-slate-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-slate-100/80 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-12 xl:gap-8 items-start">
          
          {/* STICKY VISUAL AREA */}
          <div className="xl:col-span-6 sticky top-28 self-start pt-4 pb-8 z-20">
            <div className="w-full flex items-center justify-center h-[calc(100vh-9.5rem)] min-h-[480px] max-h-[640px]">
              <div className="relative w-full h-full">

                {/* Soft background frame */}
                <div className="about-orbit absolute inset-2 sm:inset-4 rounded-[2.5rem] border border-blue-100 bg-blue-50/30" />

                {/* Main image */}
                <div className="about-photo about-photo-main absolute left-0 top-4 sm:top-6 w-[65%] h-[55%] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-10">
                  <Image
                    src="https://images.pexels.com/photos/15543037/pexels-photo-15543037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800"
                    alt="BigTeeWise creative strategy team working on book marketing campaigns"
                    fill
                    sizes="(max-width: 1280px) 60vw, 35vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-800">
                      {t('about.studioTag')}
                    </span>
                  </div>
                </div>

                {/* Secondary portrait */}
                <div className="about-photo about-photo-secondary absolute right-0 top-[14%] w-[48%] h-[50%] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-20">
                  <Image
                    src="https://images.pexels.com/photos/7256352/pexels-photo-7256352.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700"
                    alt="BigTeeWise creative director reviewing author branding strategy"
                    fill
                    sizes="(max-width: 1280px) 45vw, 25vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom image */}
                <div className="about-photo absolute left-0 bottom-4 w-[56%] h-[38%] rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-30">
                  <Image
                    src="https://images.pexels.com/photos/8154578/pexels-photo-8154578.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=800"
                    alt="Digital marketing strategy session for authors and brands"
                    fill
                    sizes="(max-width: 1280px) 55vw, 30vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom right image */}
                <div className="about-photo absolute right-0 bottom-4 w-[43%] h-[32%] rounded-[1.75rem] overflow-hidden shadow-xl border-4 border-white z-40">
                  <Image
                    src="https://images.pexels.com/photos/15635247/pexels-photo-15635247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=800"
                    alt="Book branding and cover design materials"
                    fill
                    sizes="(max-width: 1280px) 42vw, 23vw"
                    className="object-cover"
                  />
                </div>

                {/* Play button */}
                <button
                  onClick={onOpenVideoModal}
                  className="about-play-btn absolute left-[50%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl border-4 border-white hover:bg-blue-700 hover:scale-105 transition-all duration-300 z-50"
                  title="Watch Agency Video"
                  aria-label="Watch BigTeeWise Digital agency showreel video"
                >
                  <Play className="w-7 h-7 fill-white ml-1" aria-hidden="true" />
                  <span className="absolute -inset-2 rounded-full border border-blue-500/30 animate-ping pointer-events-none" />
                </button>

                {/* Floating badge */}
                <div className="about-reveal absolute bottom-6 left-3 z-50 bg-slate-950 text-white rounded-xl px-3.5 py-2 shadow-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                    <span className="text-xs font-bold">{t('about.floatingBadge')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SCROLLING CONTENT */}
          <div className="xl:col-span-6 relative z-10">
            <div className="about-scroll-content space-y-5 sm:space-y-6 py-8 xl:py-16">
              
              {/* Intro */}
              <div className="about-scroll-card bg-white/95 backdrop-blur-md rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10">
                <div className="about-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase">
                  <span className="font-extrabold">{"//"}</span>
                  <span>{t('about.badge')}</span>
                </div>
                <h2 className="about-reveal mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08]">
                  {t('about.titlePre')}{' '}
                  <span className="text-blue-600">{t('about.titleHighlight')}</span>{' '}
                  {t('about.titlePost')}
                </h2>
                <p className="about-reveal mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                  {t('about.description1')}
                </p>
                <p className="about-reveal mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
                  {t('about.description2')}
                </p>
              </div>

              {/* Approach */}
              <div className="about-scroll-card bg-slate-950 text-white rounded-[2rem] p-6 sm:p-8 lg:p-9 shadow-xl overflow-hidden relative">
                <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Target className="w-4 h-4" aria-hidden="true" />
                    {t('about.approachBadge')}
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold">
                    {t('about.approachHeading')}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <Sparkles className="w-5 h-5 text-blue-400 mb-3" aria-hidden="true" />
                      <h4 className="font-bold">{t('about.approach1Title')}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                        {t('about.approach1Desc')}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <TrendingUp className="w-5 h-5 text-blue-400 mb-3" aria-hidden="true" />
                      <h4 className="font-bold">{t('about.approach2Title')}</h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                        {t('about.approach2Desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Value points */}
              <div className="about-scroll-card bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="about-reveal grid sm:grid-cols-2 gap-5">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{value.title}</h4>
                          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                            {value.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="about-scroll-card about-stats grid grid-cols-3 gap-2 sm:gap-3">
                {stats.map((stat, index) => {
                  const colorClass = getStatColor(stat.color);
                  const labelColor = getStatLabelColor(stat.color);
                  return (
                    <div key={index} className="about-stat rounded-2xl ${colorClass} p-4 sm:p-5">
                      <div className="text-2xl sm:text-3xl font-black">{stat.value}</div>
                      <p className={`text-[10px] sm:text-xs ${labelColor} font-semibold uppercase tracking-wide mt-1`}>
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Founder / CTA */}
              <div className="about-scroll-card bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-3.5">
                    {/* ✅ Founder Avatar - Peter Taiwo Godswill */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-lg shadow-blue-500/10 shrink-0">
                      <Image
                        src="/images/team/peter.png"
                        alt="Peter Taiwo Godswill - Founder"
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{t('about.founderName') || 'Peter Taiwo Godswill'}</h4>
                      <p className="text-[10px] sm:text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">
                        {t('about.founderRole') || 'Founder & Creative Director'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenQuoteModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-blue-600/20 transition-all duration-300 active:scale-95"
                    aria-label="Work with us - get a free quote"
                  >
                    {t('about.workWithUs') || 'Work With Us'}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="hidden xl:block absolute left-1/2 top-32 bottom-32 w-px bg-slate-200 -translate-x-1/2 pointer-events-none">
          <div className="about-progress absolute top-0 left-0 w-full h-full bg-blue-600 scale-y-0" />
        </div>
      </div>
    </section>
  );
}