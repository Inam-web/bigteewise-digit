'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PROCESS_STEPS } from '../app/Data/content';
import { FileSpreadsheet, Lightbulb, Layers, Smile, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ProcessSection({ onOpenQuoteModal }) {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const iconMap = {
    FileSpreadsheet: <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6" />,
    Lightbulb: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
    Layers: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
    Smile: <Smile className="w-5 h-5 sm:w-6 sm:h-6" />,
  };

  const translatedSteps = t('process.steps');
  const stepsList = Array.isArray(translatedSteps) && translatedSteps.length > 0
    ? translatedSteps.map((step, index) => ({
        number: step.number || `0${index + 1}`,
        iconName: PROCESS_STEPS[index]?.iconName || 'Lightbulb',
        title: step.title,
        desc: step.desc,
      }))
    : PROCESS_STEPS || [];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLetsTalk = () => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal();
    } else {
      scrollToContact();
    }
  };

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
        gsap.set('.process-header-item, .process-card-item, .process-step-number, .process-connector-line', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'transform,opacity'
        });
        return;
      }

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // ✅ Device-specific durations
      const dur = isMobile ? 0.5 : (isTablet ? 0.7 : 1);
      const staggerDur = isMobile ? 0.05 : (isTablet ? 0.08 : 0.12);
      const yOffset = isMobile ? 20 : (isTablet ? 28 : 35);

      // ====== SET INITIAL STATES ======
      gsap.set('.process-header-item', {
        y: yOffset,
        opacity: 0,
        willChange: 'transform, opacity',
      });

      gsap.set('.process-card-item', {
        y: isMobile ? 25 : 50,
        opacity: 0,
        scale: isMobile ? 0.97 : 0.95,
        willChange: 'transform, opacity',
      });

      gsap.set('.process-step-number', {
        scale: 0.5,
        opacity: 0,
        willChange: 'transform, opacity',
      });

      gsap.set('.process-connector-line', {
        scaleX: 0,
        opacity: 0,
        willChange: 'transform, opacity',
      });

      // ====== HEADER ANIMATIONS ======
      const headerTL = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 85%' : 'top 80%',
          once: true,
        },
      });

      headerTL
        .to('.process-header-item', {
          y: 0,
          opacity: 1,
          duration: dur,
          stagger: staggerDur * 1.5,
          overwrite: 'auto',
        });

      // ====== CONNECTOR LINE ======
      gsap.to('.process-connector-line', {
        scaleX: 1,
        opacity: 1,
        duration: isMobile ? 0.8 : 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: '.process-cards-container',
          start: isMobile ? 'top 80%' : 'top 75%',
          once: true,
        },
      });

      // ====== CARD ANIMATIONS ======
      const cards = gsap.utils.toArray('.process-card-item');
      
      cards.forEach((card, index) => {
        // Card entrance
        gsap.fromTo(card,
          { y: isMobile ? 25 : 50, opacity: 0, scale: isMobile ? 0.97 : 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.5 : (isTablet ? 0.7 : 1),
            delay: index * (isMobile ? 0.06 : 0.12),
            ease: 'power4.out',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: card,
              start: isMobile ? 'top 92%' : 'top 88%',
              once: true,
            },
          }
        );

        // Step number with bounce effect
        const stepNumber = card.querySelector('.process-step-number');
        if (stepNumber) {
          gsap.fromTo(stepNumber,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: isMobile ? 0.4 : 0.6,
              delay: index * (isMobile ? 0.06 : 0.12) + (isMobile ? 0.08 : 0.15),
              ease: 'back.out(1.7)',
              overwrite: 'auto',
              scrollTrigger: {
                trigger: card,
                start: isMobile ? 'top 92%' : 'top 88%',
                once: true,
              },
            }
          );
        }

        // ====== FLOATING EFFECT ON ICONS (Desktop only) ======
        if (!isMobile && !isTablet) {
          const icon = card.querySelector('.process-icon');
          if (icon) {
            gsap.to(icon, {
              y: -4,
              duration: 3 + (index * 0.3),
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: index * 0.2,
              overwrite: 'auto',
            });
          }
        }
      });

      // ====== HOVER ANIMATIONS (Desktop only) ======
      if (!isMobile && !isTablet) {
        document.querySelectorAll('.process-card-item').forEach((card) => {
          const icon = card.querySelector('.process-icon');
          const number = card.querySelector('.process-step-number');
          const title = card.querySelector('.process-title');
          const desc = card.querySelector('.process-desc');

          card.addEventListener('mouseenter', () => {
            if (icon) {
              gsap.to(icon, {
                scale: 1.15,
                rotation: 5,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            if (number) {
              gsap.to(number, {
                scale: 1.1,
                rotation: -3,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            if (title) {
              gsap.to(title, {
                color: '#2563eb',
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            if (desc) {
              gsap.to(desc, {
                color: '#1e293b',
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.05,
                overwrite: 'auto',
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
                overwrite: 'auto',
              });
            }

            if (number) {
              gsap.to(number, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            if (title) {
              gsap.to(title, {
                color: '#0f172a',
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }

            if (desc) {
              gsap.to(desc, {
                color: '#475569',
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          });
        });
      }

      // ====== MOBILE TOUCH FEEDBACK ======
      if (isMobile || window.innerWidth < 1024) {
        document.querySelectorAll('.process-card-item').forEach((card) => {
          card.addEventListener('touchstart', () => {
            gsap.to(card, {
              scale: 0.97,
              duration: 0.15,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }, { passive: true });

          card.addEventListener('touchend', () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }, { passive: true });
        });
      }

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
  }, [isMounted, stepsList]);

  if (!isMounted) {
    return null;
  }

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className="py-16 sm:py-24 lg:py-28 bg-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-50/20 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
          <div className="process-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-extrabold tracking-wide uppercase">
            <span className="text-blue-600 font-black" aria-hidden="true">//</span>
            <span>{t('process.badge')}</span>
          </div>

          <h2 className="process-header-item text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('process.heading')}
          </h2>

          <p className="process-header-item text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t('process.subheading')}
          </p>

          <div className="process-header-item flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
            <Sparkles className="w-3 h-3 text-blue-500" aria-hidden="true" />
            <span>{t('process.stepsCount')}</span>
            <Sparkles className="w-3 h-3 text-blue-500" aria-hidden="true" />
          </div>
        </div>

        {/* Process Cards Container */}
        <div className="process-cards-container relative">
          
          {/* Connector Line - Desktop only */}
          <div className="process-connector-line hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-[3px] bg-gradient-to-r from-blue-300/60 via-blue-500 to-blue-300/60 z-0 origin-left" />
          
          <div className="hidden lg:block absolute top-[70px] left-[10%] w-2 h-2 rounded-full bg-blue-400 z-10" />
          <div className="hidden lg:block absolute top-[70px] left-[36%] w-2 h-2 rounded-full bg-blue-400 z-10" />
          <div className="hidden lg:block absolute top-[70px] left-[63%] w-2 h-2 rounded-full bg-blue-400 z-10" />
          <div className="hidden lg:block absolute top-[70px] right-[10%] w-2 h-2 rounded-full bg-blue-400 z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
            {stepsList.map((step, index) => {
              const stepIcon = iconMap[step.iconName] || <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />;
              const stepNumber = step.number || `0${index + 1}`;

              return (
                <div
                  key={step.number || index}
                  className="process-card-item group bg-white hover:bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 text-center flex flex-col items-center relative cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/20 blur-sm" />
                  </div>

                  <div className="relative mb-5 sm:mb-6">
                    <div className="process-icon w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/25 group-hover:shadow-2xl group-hover:shadow-blue-600/40 transition-all duration-300 relative">
                      {stepIcon}
                      <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 animate-ping-slow pointer-events-none" style={{ animationDuration: '2s' }} />
                    </div>

                    <span className="process-step-number absolute -top-2 -right-2 bg-slate-900 text-white text-xs font-black px-2.5 py-0.5 rounded-full border-2 border-white shadow-md shadow-slate-900/20">
                      {stepNumber}
                    </span>
                  </div>

                  <h3 className="process-title text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="process-desc text-slate-600 text-xs sm:text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {step.desc}
                  </p>

                  {index < stepsList.length - 1 && (
                    <div className="lg:hidden absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 text-blue-400/60 bg-white rounded-full p-1 border border-blue-100 shadow-sm">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  )}

                  {index < stepsList.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-[72px] z-20 text-blue-400 bg-white rounded-full p-1.5 border border-blue-100 shadow-sm group-hover:border-blue-300 group-hover:text-blue-600 transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="process-header-item mt-14 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-sm hover:shadow-md transition-all duration-300">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {t('process.ctaText')}
            </span>
            <button 
              onClick={handleLetsTalk}
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm transition-colors duration-200 group cursor-pointer"
              aria-label="Start your project"
            >
              <span>{t('process.ctaButton')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.3);
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