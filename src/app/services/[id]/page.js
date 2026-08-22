'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Star,
  ChevronDown,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
  BarChart2,
  Target,
  Layers3,
  Rocket,
  CircleDot,
} from 'lucide-react';

import { SERVICES } from '../../Data/content';
import { InteractiveQuoteModal } from '@/components/InteractiveQuoteModal';
import { Toast } from '@/components/Toast';
import { useLanguage } from '@/i18n/LanguageContext';
import Header from '@/components/Header';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceDetailPage() {
  const { t, locale } = useLanguage();
  const params = useParams();
  const serviceId = params?.id;

  const [openFaq, setOpenFaq] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const mainRef = useRef(null);

  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  // Translation helper
  const tr = (key, fallback) => {
    try {
      const result = t(key);
      if (result === key || result === undefined || result === null) {
        return fallback;
      }
      return result;
    } catch (e) {
      return fallback;
    }
  };

  /*
   * ----------------------------------------------------
   * MODAL / TOAST
   * ----------------------------------------------------
   */

  const handleOpenQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  const handleSuccessToast = (message) => {
    setToastMessage(message);
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  /*
   * ----------------------------------------------------
   * SERVICE CONTENT
   * ----------------------------------------------------
   */

  const deliverables = service.deliverables || [];

  const serviceTitle = service.title;
  const serviceFullDesc = service.fullDesc || service.shortDesc;

  // Get translated category label
  const getCategoryLabel = () => {
    const category = service.category;
    if (category === 'specialization') {
      return tr('services.specialization', 'Specialization');
    } else if (category === 'marketing') {
      return tr('services.digitalMarketingTab', 'Digital Marketing & SEO');
    } else if (category === 'creative') {
      return tr('services.creativeDesignTab', 'Creative Design & Branding');
    }
    return tr('serviceDetailPage.specializedService', 'Specialized Service');
  };

  // Get process steps - ALWAYS return an array
  const getProcessSteps = () => {
    const steps = t('serviceDetailPage.processSteps');
    if (Array.isArray(steps) && steps.length > 0) {
      return steps;
    }
    return [
      { num: '01', label: 'DISCOVER', title: 'Discovery & Strategy', desc: `We analyze your goals for ${service.title} and build a focused roadmap around your audience, positioning, and objectives.`, icon: Target },
      { num: '02', label: 'BUILD', title: 'Execution & Setup', desc: 'Our team develops the creative, strategic, and technical foundation required to execute the service with precision.', icon: Layers3 },
      { num: '03', label: 'LAUNCH', title: 'Campaign Launch', desc: 'We put the strategy into action across the most relevant channels to create visibility, engagement, and momentum.', icon: Rocket },
      { num: '04', label: 'GROW', title: 'Optimization & Growth', desc: 'We monitor performance, identify opportunities, and continuously refine the strategy for stronger long-term results.', icon: TrendingUp },
    ];
  };

  // Get value pillars - ALWAYS return an array
  const getValuePillars = () => {
    const pillars = t('serviceDetailPage.valuePillars');
    if (Array.isArray(pillars) && pillars.length > 0) {
      return pillars.map(p => ({ ...p, icon: p.icon || Zap }));
    }
    return [
      { icon: Zap, title: 'Data-Driven', desc: 'Every important decision is backed by research, performance signals, and measurable objectives.' },
      { icon: ShieldCheck, title: 'Built With Detail', desc: 'From strategy to execution, every deliverable is reviewed for quality and brand consistency.' },
      { icon: TrendingUp, title: 'Growth Focused', desc: 'The goal is not simply to complete tasks. Every action is designed to create meaningful momentum.' },
      { icon: BarChart2, title: 'Transparent', desc: 'Clear communication and measurable progress keep you informed throughout the entire engagement.' },
    ];
  };

  // Get FAQs - ALWAYS return an array
  const getFaqs = () => {
    const faqs = t('serviceDetailPage.faqs');
    if (Array.isArray(faqs) && faqs.length > 0) {
      return faqs;
    }
    return [
      { q: `How quickly can we get started with ${service.title}?`, a: 'Once we finalize the initial discovery call and brief, setup typically begins within 24–48 hours.' },
      { q: 'What makes your approach different from other agencies?', a: 'We combine niche specialization with end-to-end execution. You get dedicated strategy, premium creative assets, and performance optimization in one seamless package.' },
      { q: 'Can this service be customized to my specific budget?', a: 'Yes, we offer flexible tier packages and custom proposals based on your exact objectives and scope.' },
      { q: 'How do we communicate throughout the project?', a: 'You will have direct access to your project lead with regular milestone updates and responsive email support.' },
    ];
  };

  const processSteps = getProcessSteps();
  const valuePillars = getValuePillars();
  const faqs = getFaqs();
  const categoryLabel = getCategoryLabel();

  /*
   * ----------------------------------------------------
   * GSAP
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(
          '.service-reveal, .service-fade, .service-step, .service-stat',
          {
            clearProps: 'all',
          }
        );
        return;
      }

      // Hero animations
      gsap.fromTo(
        '.hero-copy',
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity' }
      );

      gsap.fromTo(
        '.hero-visual',
        { x: 50, opacity: 0, scale: 0.94 },
        { x: 0, opacity: 1, scale: 1, duration: 1.25, delay: 0.15, ease: 'power3.out', clearProps: 'transform,opacity' }
      );

      gsap.to('.hero-orbit', {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.hero-glow', {
        y: 18,
        x: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Statement section
      gsap.fromTo(
        '.statement-line',
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.statement-section', start: 'top 75%', once: true },
        }
      );

      // Blueprint section
      gsap.fromTo(
        '.blueprint-intro',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.blueprint-section', start: 'top 75%', once: true },
        }
      );

      gsap.fromTo(
        '.blueprint-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.blueprint-grid', start: 'top 78%', once: true },
        }
      );

      // Deliverables section
      gsap.fromTo(
        '.deliverable-item',
        { x: -25, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.deliverables-section', start: 'top 75%', once: true },
        }
      );

      gsap.fromTo(
        '.deliverable-panel',
        { x: 35, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.deliverables-section', start: 'top 75%', once: true },
        }
      );

      // Process section
      gsap.fromTo(
        '.process-heading',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.process-section', start: 'top 75%', once: true },
        }
      );

      gsap.fromTo(
        '.process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'power2.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: '.process-track', start: 'top 72%', once: true },
        }
      );

      gsap.fromTo(
        '.process-step',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.process-track', start: 'top 72%', once: true },
        }
      );

      // Stats section
      gsap.fromTo(
        '.service-stat',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-section', start: 'top 78%', once: true },
        }
      );

      // FAQ section
      gsap.fromTo(
        '.faq-item',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-section', start: 'top 78%', once: true },
        }
      );

      // CTA section
      gsap.fromTo(
        '.final-cta-content',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.final-cta', start: 'top 80%', once: true },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [serviceId]);

  return (
    <>
      {/* ✅ HEADER - Rendered at the top */}
      <Header onOpenQuoteModal={handleOpenQuote} />

      <main
        ref={mainRef}
        className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white overflow-hidden pt-20"
      >
        {/* HERO SECTION */}
        <section className="relative min-h-[720px] lg:min-h-[780px] flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/60 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-blue-400/5 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.035]">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
                  backgroundSize: '70px 70px',
                }}
              />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
            <div className="hero-copy mb-12 lg:mb-16">
              <Link
                href={`/${locale}/#services`}
                className="group inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-slate-500 hover:text-blue-600 transition-colors duration-300"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                {tr('serviceDetailPage.backToServices', 'Back to All Services')}
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
              <div className="lg:col-span-7 relative z-10">
                <div className="hero-copy inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[10px] sm:text-xs font-black uppercase tracking-[0.12em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{categoryLabel}</span>
                </div>

                <h1 className="hero-copy text-[clamp(3rem,7vw,6.6rem)] font-black tracking-[-0.055em] leading-[0.88] text-slate-950 max-w-5xl">
                  {serviceTitle}
                  <span className="block text-blue-600 mt-2">
                    {tr('serviceDetailPage.servicesSuffix', 'Services.')}
                  </span>
                </h1>

                <p className="hero-copy mt-8 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600">
                  {serviceFullDesc}
                </p>

                <div className="hero-copy mt-8 flex flex-wrap gap-3">
                  {deliverables.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="hero-copy mt-9 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenQuote}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-6 sm:px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  >
                    {tr('serviceDetailPage.startProject', 'Start a Project')}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <a
                    href={`#blueprint`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 sm:px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {tr('serviceDetailPage.exploreApproach', 'Explore the approach')}
                  </a>
                </div>
              </div>

              <div className="hero-visual lg:col-span-5 relative min-h-[400px] sm:min-h-[480px]">
                <div className="hero-orbit absolute inset-[7%] rounded-full border border-blue-200/60 border-dashed" />
                <div className="hero-orbit absolute inset-[17%] rounded-full border border-slate-200/80 border-dashed" />
                <div className="hero-glow absolute top-[14%] right-[8%] w-28 h-28 rounded-full bg-blue-500/20 blur-3xl" />

                <div className="absolute inset-[12%] sm:inset-[14%] rounded-[2rem] bg-slate-950 shadow-2xl shadow-slate-900/20 overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-[0.2em] text-blue-300 uppercase">
                      {tr('serviceDetailPage.serviceLabel', 'Service')} / {service.category || '01'}
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      {tr('serviceDetailPage.activeLabel', 'Active')}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
                    <div className="relative w-full aspect-square max-w-[250px] rounded-[1.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center">
                      <div className="absolute inset-5 rounded-full border border-blue-400/20" />
                      <div className="absolute inset-10 rounded-full border border-blue-400/10" />
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-600 shadow-[0_0_70px_rgba(37,99,235,0.35)] flex items-center justify-center">
                        <div className="absolute inset-2 rounded-full border border-white/20" />
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute top-[8%] left-[12%] w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <Target className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="absolute bottom-[12%] right-[8%] w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500 font-bold">
                          {tr('serviceDetailPage.focusLabel', 'Focus')}
                        </p>
                        <p className="text-sm font-bold text-white mt-1">
                          {serviceTitle}
                        </p>
                      </div>
                      <span className="text-3xl font-black text-blue-500/30">01</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[7%] -left-2 sm:left-0 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-3">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                    {tr('serviceDetailPage.strategyLabel', 'Strategy')}
                  </p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">
                    {tr('serviceDetailPage.tailoredLabel', 'Tailored for you')}
                  </p>
                </div>

                <div className="absolute bottom-[8%] -right-1 sm:right-0 bg-blue-600 rounded-2xl px-4 py-3 shadow-xl shadow-blue-600/20">
                  <p className="text-[9px] font-black text-blue-100 uppercase tracking-wider">
                    {tr('serviceDetailPage.outcomeLabel', 'Outcome')}
                  </p>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {tr('serviceDetailPage.measurableGrowth', 'Measurable growth')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400">
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">
              {tr('serviceDetailPage.scrollToExplore', 'Scroll to explore')}
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent" />
          </div>
        </section>

        {/* STATEMENT SECTION */}
        <section className="statement-section relative bg-slate-950 text-white py-28 sm:py-36 lg:py-44 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl">
              <div className="statement-line flex items-center gap-3 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
                <span className="w-8 h-px bg-blue-500" />
                {tr('serviceDetailPage.philosophyLabel', 'The philosophy')}
              </div>

              <h2 className="statement-line text-[clamp(2.8rem,6vw,6.5rem)] font-black tracking-[-0.055em] leading-[0.92]">
                {tr('serviceDetailPage.statementLine1', "We don't just")}
                <span className="text-slate-500"> {tr('serviceDetailPage.statementLine1End', 'deliver a service.')}</span>
              </h2>

              <h2 className="statement-line mt-2 text-[clamp(2.8rem,6vw,6.5rem)] font-black tracking-[-0.055em] leading-[0.92] text-blue-500">
                {tr('serviceDetailPage.statementLine2', 'We build momentum.')}
              </h2>

              <p className="statement-line mt-10 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
                {tr('serviceDetailPage.statementDesc', 'Everything we do around {service} is designed to create a stronger position, a clearer message, and a more meaningful connection with your audience.')}
              </p>
            </div>
          </div>
        </section>

        {/* BLUEPRINT SECTION */}
        <section id="blueprint" className="blueprint-section bg-white py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="blueprint-intro max-w-3xl mb-14 lg:mb-20">
              <span className="inline-flex items-center gap-2 text-blue-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]">
                <CircleDot className="w-3.5 h-3.5" />
                {tr('serviceDetailPage.blueprintLabel', 'The Blueprint')}
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.045em] leading-[0.95] text-slate-950">
                {tr('serviceDetailPage.blueprintHeading', 'A smarter way to build your presence.')}
              </h2>

              <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                {tr('serviceDetailPage.blueprintDesc', 'We combine strategy, execution, creative thinking, and continuous optimization into one focused system.')}
              </p>
            </div>

            <div className="blueprint-grid grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {Array.isArray(valuePillars) && valuePillars.map((pillar, index) => {
                const Icon = pillar.icon || Zap;

                return (
                  <div
                    key={index}
                    className="blueprint-card group relative min-h-[250px] p-7 sm:p-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 hover:bg-slate-950 hover:border-slate-950 transition-all duration-500 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-full blur-2xl transition-all duration-500" />

                    <div className="relative flex items-start justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-white group-hover:bg-blue-600 border border-slate-200 group-hover:border-blue-500 flex items-center justify-center transition-all duration-500">
                        <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-4xl font-black text-slate-200 group-hover:text-white/10 transition-colors duration-500">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="relative mt-10">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-white transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm text-slate-500 group-hover:text-slate-400 leading-relaxed max-w-md transition-colors duration-300">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-500" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DELIVERABLES SECTION */}
        <section className="deliverables-section bg-slate-50 py-24 sm:py-28 lg:py-36 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-5">
                <span className="text-blue-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]">
                  {tr('serviceDetailPage.whatYouGetLabel', 'What you get')}
                </span>

                <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.045em] leading-tight text-slate-950">
                  {tr('serviceDetailPage.deliverablesHeading', "Everything you need. Nothing you don't.")}
                </h2>

                <p className="mt-6 text-slate-600 leading-relaxed max-w-lg">
                  {tr('serviceDetailPage.deliverablesDesc', 'Your package is built around the exact requirements of your goals.')}
                </p>

                <div className="mt-9 space-y-3">
                  {deliverables.length > 0 ? (
                    deliverables.map((item, index) => (
                      <div
                        key={index}
                        className="deliverable-item group flex items-center gap-4 py-3.5 border-b border-slate-200"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 border border-blue-100 shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                          {item}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-500">
                      {tr('serviceDetailPage.customDeliverables', 'Custom deliverables are available based on your project requirements.')}
                    </div>
                  )}
                </div>
              </div>

              <div className="deliverable-panel lg:col-span-7">
                <div className="relative rounded-[2rem] bg-slate-950 p-7 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-slate-900/10">
                  <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-12">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">
                          {tr('serviceDetailPage.serviceFocusLabel', 'Service Focus')}
                        </p>
                        <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                          {serviceTitle}
                        </h3>
                      </div>
                      {service.isSpecialization && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider">
                          <Star className="w-3 h-3 fill-white" />
                          {tr('serviceDetailPage.coreFocusLabel', 'Core Focus')}
                        </div>
                      )}
                    </div>

                    <div className="relative h-px bg-slate-800 mb-10">
                      <div className="absolute left-0 top-0 w-1/3 h-px bg-blue-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-9">
                      <div>
                        <p className="text-3xl sm:text-4xl font-black text-white">01</p>
                        <p className="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {tr('serviceDetailPage.strategyStep', 'Strategy')}
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-black text-white">02</p>
                        <p className="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {tr('serviceDetailPage.executionStep', 'Execution')}
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-black text-white">03</p>
                        <p className="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {tr('serviceDetailPage.launchStep', 'Launch')}
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl sm:text-4xl font-black text-white">04</p>
                        <p className="mt-2 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          {tr('serviceDetailPage.growthStep', 'Growth')}
                        </p>
                      </div>
                    </div>

                    {service.roiHighlights && (
                      <div className="mt-12 rounded-2xl border border-slate-800 bg-white/[0.035] p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-600/15 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">
                              {tr('serviceDetailPage.expectedFocusLabel', 'Expected focus')}
                            </p>
                            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                              {service.roiHighlights}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="process-section bg-white py-24 sm:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="process-heading text-center max-w-3xl mx-auto">
              <span className="text-blue-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]">
                {tr('serviceDetailPage.howWeGetThere', 'How we get there')}
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.045em] text-slate-950">
                {tr('serviceDetailPage.processHeading', 'From idea to momentum.')}
              </h2>

              <p className="mt-5 text-slate-600 text-sm sm:text-base leading-relaxed">
                {tr('serviceDetailPage.processDesc', 'A clear four-stage process designed to keep your project moving forward without unnecessary complexity.')}
              </p>
            </div>

            <div className="process-track relative mt-20 lg:mt-24">
              <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-px bg-slate-200 overflow-hidden">
                <div className="process-line h-full w-full bg-blue-600 origin-left" />
              </div>

              <div className="lg:hidden absolute left-6 top-8 bottom-8 w-px bg-slate-200">
                <div className="w-full h-1/2 bg-blue-600" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-7">
                {Array.isArray(processSteps) && processSteps.map((step, index) => {
                  const Icon = step.icon || TrendingUp;

                  return (
                    <div
                      key={index}
                      className="process-step relative lg:text-center pl-16 lg:pl-0"
                    >
                      <div className="absolute lg:relative left-0 lg:left-auto top-0 lg:mx-auto w-14 h-14 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/10 z-10">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>

                      <div className="lg:mt-7">
                        <div className="flex items-center gap-3 lg:justify-center">
                          <span className="text-[10px] font-black tracking-[0.18em] text-blue-600">
                            {step.num}
                          </span>
                          <span className="text-[10px] font-black tracking-[0.16em] text-slate-400">
                            {step.label}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-black text-slate-950">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm text-slate-500 leading-relaxed lg:max-w-[240px] lg:mx-auto">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="stats-section bg-slate-950 text-white py-24 sm:py-28 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-blue-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]">
                {tr('serviceDetailPage.biggerPictureLabel', 'The bigger picture')}
              </span>

              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.045em] leading-tight">
                {tr('serviceDetailPage.resultsHeading', 'Results that speak for themselves.')}
              </h2>
            </div>

            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="service-stat bg-slate-950 p-6 sm:p-8 lg:p-10">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">150+</p>
                <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-500">
                  {tr('serviceDetailPage.statLaunches', 'Book & Brand Launches')}
                </p>
              </div>

              <div className="service-stat bg-slate-950 p-6 sm:p-8 lg:p-10">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">2K+</p>
                <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-500">
                  {tr('serviceDetailPage.statClients', 'Happy Clients & Readers')}
                </p>
              </div>

              <div className="service-stat bg-slate-950 p-6 sm:p-8 lg:p-10">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-500">99%</p>
                <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-500">
                  {tr('serviceDetailPage.statSatisfaction', 'Customer Satisfaction')}
                </p>
              </div>

              <div className="service-stat bg-slate-950 p-6 sm:p-8 lg:p-10">
                <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">8+</p>
                <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-500">
                  {tr('serviceDetailPage.statExperience', 'Years Experience')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faq-section bg-slate-50 py-24 sm:py-28 lg:py-36">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
              <div className="lg:col-span-2 lg:sticky lg:top-24 lg:self-start">
                <span className="text-blue-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.18em]">
                  {tr('serviceDetailPage.questionsLabel', 'Questions')}
                </span>

                <h2 className="mt-5 text-4xl sm:text-5xl font-black tracking-[-0.045em] leading-tight text-slate-950">
                  {tr('serviceDetailPage.faqHeading', 'Everything you need to know.')}
                </h2>

                <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {tr('serviceDetailPage.faqDesc', "Still wondering how the process works? We've answered the questions we hear most often.")}
                </p>

                <button
                  type="button"
                  onClick={handleOpenQuote}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-blue-600 hover:text-blue-700 group"
                >
                  {tr('serviceDetailPage.anotherQuestion', 'Have another question?')}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              <div className="lg:col-span-3 space-y-3">
                {Array.isArray(faqs) && faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={index}
                      className="faq-item bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 transition-colors duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-5 sm:p-6 flex items-center justify-between gap-5 text-left"
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-900">
                          {faq.q}
                        </span>

                        <span
                          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isOpen
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta relative bg-white py-28 sm:py-36 lg:py-44 overflow-hidden border-t border-slate-200">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="final-cta-content relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-blue-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
              {tr('serviceDetailPage.readyLabel', 'Ready when you are')}
            </span>

            <h2 className="mt-6 text-[clamp(3rem,7vw,7rem)] font-black tracking-[-0.06em] leading-[0.88] text-slate-950">
              {tr('serviceDetailPage.ctaHeading', "Let's build something memorable.")}
            </h2>

            <p className="mt-8 max-w-xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
              {tr('serviceDetailPage.ctaDesc', "Tell us what you're building and where you want to go. We'll help turn the idea into a focused execution plan.")}
            </p>

            <button
              type="button"
              onClick={handleOpenQuote}
              className="group mt-9 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-7 py-4 rounded-full shadow-xl shadow-blue-600/20 hover:-translate-y-1 transition-all duration-300"
            >
              {tr('serviceDetailPage.ctaButton', 'Start a Conversation')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </main>

      <InteractiveQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        preselectedService={serviceTitle}
        onSuccessToast={handleSuccessToast}
      />

      <Toast message={toastMessage} onClose={handleCloseToast} />
    </>
  );
}