'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  BookOpen,
  TrendingUp,
  Award,
  BarChart3,
  ShieldCheck,
  CalendarCheck2,
  ShoppingBag,
  Globe
} from 'lucide-react';
import gsap from 'gsap';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Hero({ onOpenQuoteModal, onOpenVideoModal }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const featuresRef = useRef([]);
  const ctasRef = useRef([]);
  const socialRef = useRef(null);
  const imageBoxRef = useRef(null);
  const floatTopRef = useRef(null);
  const floatBottomRef = useRef(null);
  const resultsRef = useRef(null);
  const resultItemsRef = useRef([]);
  const statusRef = useRef(null);
  const platformsRef = useRef(null);
  const platformHeadingRef = useRef(null);
  const platformCardsRef = useRef([]);

  // Features data with translation keys
  const features = [
    t('hero.feature1'),
    t('hero.feature2'),
    t('hero.feature3'),
  ];

  // Platforms data with translation keys
  const platforms = [
    { name: t('hero.platformAdobe'), label: t('hero.platformAdobeLabel'), color: 'blue', icon: Globe },
    { name: t('hero.platformShopify'), label: t('hero.platformShopifyLabel'), color: 'emerald', icon: ShoppingBag },
    { name: t('hero.platformAmazon'), label: t('hero.platformAmazonLabel'), color: 'orange', icon: BookOpen },
    { name: t('hero.platformYouTube'), label: t('hero.platformYouTubeLabel'), color: 'red', icon: Play },
    { name: t('hero.platformWordPress'), label: t('hero.platformWordPressLabel'), color: 'cyan', icon: Globe },
    { name: t('hero.platformFacebook'), label: t('hero.platformFacebookLabel'), color: 'blue', icon: TrendingUp },
    { name: t('hero.platformMailchimp'), label: t('hero.platformMailchimpLabel'), color: 'yellow', icon: Star },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      });

      /* Initial states */
      gsap.set(
        [
          badgeRef.current,
          headingRef.current,
          descRef.current,
          socialRef.current,
          imageBoxRef.current,
          floatTopRef.current,
          floatBottomRef.current,
          resultsRef.current,
          statusRef.current,
          platformHeadingRef.current,
          platformsRef.current
        ],
        {
          opacity: 0
        }
      );

      gsap.set(featuresRef.current, {
        opacity: 0
      });

      gsap.set(ctasRef.current, {
        opacity: 0
      });

      gsap.set(resultItemsRef.current, {
        opacity: 0
      });

      gsap.set(platformCardsRef.current, {
        opacity: 0,
        y: 30
      });

      gsap.set(badgeRef.current, {
        y: -20
      });

      gsap.set(headingRef.current, {
        y: 30
      });

      gsap.set(descRef.current, {
        y: 20
      });

      gsap.set(featuresRef.current, {
        y: 15
      });

      gsap.set(ctasRef.current, {
        y: 20
      });

      gsap.set(socialRef.current, {
        y: 15
      });

      gsap.set(imageBoxRef.current, {
        scale: 0.92
      });

      gsap.set(floatTopRef.current, {
        x: -30
      });

      gsap.set(floatBottomRef.current, {
        x: 30
      });

      gsap.set(resultsRef.current, {
        y: 30
      });

      gsap.set(statusRef.current, {
        y: 20
      });

      gsap.set(platformHeadingRef.current, {
        y: 20
      });

      gsap.set(platformsRef.current, {
        y: 20
      });

      /* Main hero animation */
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5
      })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8
          },
          '-=0.25'
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6
          },
          '-=0.5'
        )
        .to(
          featuresRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5
          },
          '-=0.4'
        )
        .to(
          ctasRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.5
          },
          '-=0.3'
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5
          },
          '-=0.3'
        )
        .to(
          imageBoxRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8
          },
          '-=1'
        )
        .to(
          floatTopRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6
          },
          '-=0.4'
        )
        .to(
          floatBottomRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6
          },
          '-=0.5'
        )
        .to(
          resultsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          '-=0.3'
        )
        .to(
          resultItemsRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.55
          },
          '-=0.35'
        )
        .to(
          statusRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6
          },
          '-=0.3'
        )
        .to(
          platformHeadingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6
          },
          '-=0.2'
        )
        .to(
          platformsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5
          },
          '-=0.3'
        )
        .to(
          platformCardsRef.current,
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: 'power3.out'
          },
          '-=0.25'
        );

      /* Floating cards */
      gsap.to(floatTopRef.current, {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to(floatBottomRef.current, {
        y: 8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.5
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [t]);

  const addFeatureRef = (el) => {
    if (el && !featuresRef.current.includes(el)) {
      featuresRef.current.push(el);
    }
  };

  const addCtaRef = (el) => {
    if (el && !ctasRef.current.includes(el)) {
      ctasRef.current.push(el);
    }
  };

  const addResultRef = (el) => {
    if (el && !resultItemsRef.current.includes(el)) {
      resultItemsRef.current.push(el);
    }
  };

  const addPlatformRef = (el) => {
    if (el && !platformCardsRef.current.includes(el)) {
      platformCardsRef.current.push(el);
    }
  };

  // Get color class for platform
  const getColorClass = (color) => {
    const colors = {
      blue: 'hover:border-blue-500/50 hover:shadow-blue-500/5',
      emerald: 'hover:border-emerald-500/50 hover:shadow-emerald-500/5',
      orange: 'hover:border-orange-500/50 hover:shadow-orange-500/5',
      red: 'hover:border-red-500/50 hover:shadow-red-500/5',
      cyan: 'hover:border-cyan-500/50 hover:shadow-cyan-500/5',
      yellow: 'hover:border-yellow-500/50 hover:shadow-yellow-500/5',
    };
    return colors[color] || colors.blue;
  };

  const getIconBgColor = (color) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/15 group-hover:border-blue-500/30',
      emerald: 'bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/15 group-hover:border-emerald-500/30',
      orange: 'bg-orange-500/10 border-orange-500/20 group-hover:bg-orange-500/15 group-hover:border-orange-500/30',
      red: 'bg-red-500/10 border-red-500/20 group-hover:bg-red-500/15 group-hover:border-red-500/30',
      cyan: 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/30',
      yellow: 'bg-yellow-500/10 border-yellow-500/20 group-hover:bg-yellow-500/15 group-hover:border-yellow-500/30',
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-400',
      emerald: 'text-emerald-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
      cyan: 'text-cyan-400',
      yellow: 'text-yellow-400',
    };
    return colors[color] || colors.blue;
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 lg:pb-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* MAIN HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div
              ref={badgeRef}
              className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] sm:text-xs font-semibold tracking-wide uppercase"
            >
              <span className="text-blue-500 font-bold shrink-0">//</span>
              <span className="truncate">{t('hero.badge')}</span>
            </div>

            <h1
              ref={headingRef}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]"
            >
              {t('hero.titleLine1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300">
                {t('hero.titleLine2')}
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="relative inline-block text-blue-500">
                {t('hero.titleLine3')}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/40"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 50 0 100 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            </h1>

            <p
              ref={descRef}
              className="text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0"
            >
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300 pt-1">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={addFeatureRef}
                  className="flex items-center justify-center sm:justify-start gap-2 bg-slate-800/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-slate-700/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                ref={addCtaRef}
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                ref={addCtaRef}
                href="#services"
                className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white font-semibold text-sm sm:text-base px-6 py-3.5 sm:py-4 rounded-full border border-slate-700 hover:border-slate-500 transition-all duration-300 text-center"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>

            <div
              ref={socialRef}
              className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                {[
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100',
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=100&w=100'
                ].map((src, i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-slate-900 overflow-hidden"
                  >
                    <Image fill sizes="36px" src={src} alt="Client" className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">5.0</span>
                </div>

                <p className="text-xs text-slate-400 font-medium">
                  {t('hero.trustedBy')}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                ref={imageBoxRef}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50 group h-[340px] sm:h-[450px]"
              >
                <Image
                  src="https://images.pexels.com/photos/15555955/pexels-photo-15555955.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1000"
                  alt="BigTeeWise Digital Marketing Strategy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

                <button
                  onClick={onOpenVideoModal}
                  className="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl hover:scale-110 hover:bg-blue-500 transition-all duration-300 z-10"
                  title="Watch BigTeeWise Agency Showreel"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
                  <span className="absolute -inset-2 rounded-full border-2 border-blue-400/50 animate-ping pointer-events-none" />
                </button>

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 z-10">
                  <p className="text-[10px] sm:text-xs text-blue-400 uppercase font-bold tracking-wider mb-0.5">
                    {t('hero.featuredSpecialization')}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {t('hero.featuredText')}
                  </p>
                </div>
              </div>

              <div
                ref={floatTopRef}
                className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 bg-white text-slate-900 p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 sm:gap-3 z-20"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div>
                  <div className="text-base sm:text-xl font-extrabold">{t('hero.stat1Number')}</div>
                  <div className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('hero.stat1Label')}
                  </div>
                </div>
              </div>

              <div
                ref={floatBottomRef}
                className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-blue-600 text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-blue-400/30 flex items-center gap-2.5 sm:gap-3 z-20"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <div>
                  <div className="text-base sm:text-xl font-extrabold">{t('hero.stat3Number')}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-blue-100 uppercase tracking-wider">
                    {t('hero.stat3Label')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO RESULTS UI */}
        <div ref={resultsRef} className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* CLIENT IMAGE CARD */}
            <div
              ref={addResultRef}
              className="relative lg:col-span-4 h-[330px] sm:h-[380px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl group"
            >
              <Image
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900"
                alt="BigTeeWise clients and creative strategy"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md text-xs font-semibold text-emerald-300">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                {t('hero.availableForProjects')}
              </div>

              <div className="absolute bottom-5 left-5">
                <div className="text-4xl sm:text-5xl font-extrabold text-white">{t('hero.stat1Number')}</div>
                <p className="text-sm text-slate-300">{t('hero.stat1Label')}</p>
              </div>
            </div>

            {/* STATS + GROWTH */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                ref={addResultRef}
                className="rounded-3xl bg-slate-800 border border-slate-700 p-5 sm:p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full" />

                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-amber-400">
                    <Star className="w-5 h-5 fill-current" />
                  </div>

                  <span className="text-[10px] bg-slate-700 px-3 py-1 rounded-full text-slate-300">
                    {t('hero.clientsServed')}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold">
                  4.9<span className="text-amber-400">★</span>
                </div>

                <p className="text-xs text-slate-400 mt-2">{t('hero.clientSatisfaction')}</p>

                <div className="flex items-center gap-1 mt-5 text-amber-400 text-xs">
                  ★★★★★ <span className="text-slate-400 ml-1">4.9/5</span>
                </div>
              </div>

              <div
                ref={addResultRef}
                className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-500 border border-blue-400/30 p-5 sm:p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 w-36 h-36 bg-white/10 rounded-full" />

                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] bg-white/10 px-3 py-1 rounded-full">
                    {t('hero.dedicatedService')}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold">{t('hero.yearsExperience')}</div>

                <p className="text-xs text-blue-100 mt-2">
                  {t('hero.yearsLabel')}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  <span className="text-[10px] border border-white/30 rounded-full px-2.5 py-1">
                    {t('hero.tagBooks')}
                  </span>
                  <span className="text-[10px] border border-white/30 rounded-full px-2.5 py-1">
                    {t('hero.tagYouTube')}
                  </span>
                  <span className="text-[10px] border border-white/30 rounded-full px-2.5 py-1">
                    {t('hero.tagEcommerce')}
                  </span>
                </div>
              </div>

              <div
                ref={addResultRef}
                className="sm:col-span-2 rounded-3xl bg-white text-slate-900 border border-blue-200 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                    <BarChart3 className="w-3 h-3" />
                    {t('hero.provenResults')}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold mt-3">
                    {t('hero.growthHeading')}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed mt-2 max-w-xl">
                    {t('hero.growthDescription')}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-emerald-500" />
                      {t('hero.dataBacked')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      {t('hero.launchesCount')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      {t('hero.provenStrategy')}
                    </span>
                  </div>
                </div>

                <div className="relative w-full md:w-40 h-32 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=500"
                    alt="BigTeeWise digital strategy"
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-bold">
                    BigTeeWise Digital
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS BAR */}
          <div
            ref={statusRef}
            className="mt-4 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-md px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              {t('hero.statusTakingProjects')}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 border-y sm:border-y-0 sm:border-x border-slate-700 py-3 sm:py-0">
              <CalendarCheck2 className="w-4 h-4 text-blue-400" />
              {t('hero.freeConsultation')}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              {t('hero.provenResults')}
            </div>
          </div>
        </div>

        {/* PLATFORMS */}
        <div className="mt-14 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-slate-800/80">
          <div
            ref={platformHeadingRef}
            className="flex items-center justify-center gap-4 sm:gap-5 mb-7 sm:mb-8"
          >
            <span className="hidden sm:block w-10 sm:w-16 lg:w-20 h-px bg-slate-700" />
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.28em] text-slate-500 uppercase text-center whitespace-nowrap">
              {t('hero.platformsHeading')}
            </p>
            <span className="hidden sm:block w-10 sm:w-16 lg:w-20 h-px bg-slate-700" />
          </div>

          <div
            ref={platformsRef}
            className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
          >
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const colorClass = getColorClass(platform.color);
              const bgClass = getIconBgColor(platform.color);
              const iconColor = getIconColor(platform.color);

              return (
                <div
                  key={index}
                  ref={addPlatformRef}
                  className={`group w-[calc(50%-6px)] sm:w-auto sm:min-w-[175px] lg:min-w-[186px] flex items-center gap-3 px-3.5 sm:px-4 py-3.5 rounded-xl bg-slate-800/90 border border-slate-700/90 ${colorClass} hover:bg-slate-800 hover:-translate-y-1 shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${bgClass}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-bold text-white truncate">
                      {platform.name}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">
                      {platform.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}