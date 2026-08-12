// src/app/services/[id]/page.js

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Sparkles, 
  BarChart2, 
  ArrowLeft 
} from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../../Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params?.id;
  const [openFaq, setOpenFaq] = useState(null);
  const mainRef = useRef(null);

  // Find corresponding service data or fallback
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  const processSteps = [
    {
      num: '01',
      title: 'Discovery & Strategy',
      desc: `We analyze your goals for ${service.title} and map out a bespoke roadmap tailored strictly to your target audience.`
    },
    {
      num: '02',
      title: 'Execution & Setup',
      desc: `Our team builds, designs, and configures all deliverables with precision, quality, and strict brand alignment.`
    },
    {
      num: '03',
      title: 'Campaign Launch',
      desc: `We deploy the strategy across high-impact channels to maximize reach, engagement, and conversion.`
    },
    {
      num: '04',
      title: 'Optimization & Growth',
      desc: 'Continuous monitoring, data-driven tweaks, and reporting to ensure high performance and long-term ROI.'
    }
  ];

  const valuePillars = [
    {
      icon: <Zap className="w-5 h-5 text-blue-400 max-sm:text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Data-Driven Execution',
      desc: 'Every strategy is backed by industry research and precise metrics to eliminate guesswork.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400 max-sm:text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Guaranteed Quality & Detail',
      desc: 'Dedicated quality control ensuring every graphic, setup, and campaign meets top-tier standards.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-400 max-sm:text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Tailored for Maximum Reach',
      desc: 'No cookie-cutter templates. Everything is customized to position your brand above competitors.'
    },
    {
      icon: <BarChart2 className="w-5 h-5 text-blue-400 max-sm:text-blue-600 group-hover:scale-110 transition-transform duration-300" />,
      title: 'Transparent Reporting',
      desc: 'Clear, quantifiable results and progress tracking so you always know your exact return on investment.'
    }
  ];

  const faqs = [
    {
      q: `How quickly can we get started with ${service.title}?`,
      a: 'Once we finalize the initial discovery call and brief, setup typically begins within 24–48 hours.'
    },
    {
      q: 'What makes your approach different from other agencies?',
      a: 'We combine niche specialization with end-to-end execution. You get dedicated strategy, premium creative assets, and performance optimization in one seamless package.'
    },
    {
      q: 'Can this service be customized to my specific budget?',
      a: 'Yes, we offer flexible tier packages and custom proposals based on your exact objectives and scope.'
    },
    {
      q: 'How do we communicate throughout the project?',
      a: 'You will have direct access to your project lead with regular milestone updates and responsive email support.'
    }
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        '.detail-hero-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      // 2. Hero Proof Card Entrance
      gsap.fromTo(
        '.detail-hero-card',
        { y: 45, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          delay: 0.2,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        }
      );

      // 3. Why It Works Section
      gsap.fromTo(
        '.why-it-works-text',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#why-it-works',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      gsap.fromTo(
        '.value-pillar-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.value-pillar-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // 4. Process Steps Animation
      gsap.fromTo(
        '.process-step-card',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-steps-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      // 5. FAQ Section
      gsap.fromTo(
        '.faq-item-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list-container',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [serviceId]);

  return (
    <main ref={mainRef} className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. COMPACT HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-blue-50/60 via-slate-50 to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb */}
          <div className="detail-hero-item mb-6">
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="detail-hero-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide uppercase shadow-sm hover:bg-blue-200/80 transition-colors duration-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{service.category || 'Specialized Service'}</span>
              </div>

              <h1 className="detail-hero-item text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {service.title} <span className="text-blue-600">Services</span>
              </h1>

              <p className="detail-hero-item text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                {service.fullDesc || service.shortDesc}
              </p>

              {/* Quick Deliverable Bullets */}
              {service.deliverables && (
                <div className="detail-hero-item grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {service.deliverables.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTAs */}
              <div className="detail-hero-item pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${BUSINESS_INFO?.email || 'info@bigteewise.com'}?subject=Inquiry regarding ${service.title}`}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-blue-600/25 transition-all duration-300 flex items-center gap-2 group touch-manipulation"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <a
                  href="#why-it-works"
                  className="bg-white hover:bg-slate-100 hover:border-slate-300 active:scale-95 text-slate-700 font-bold text-sm px-6 py-3 rounded-full border border-slate-200 transition-all duration-300 shadow-sm touch-manipulation"
                >
                  How It Works
                </a>
              </div>
            </div>

            {/* Hero Right Quick Proof Card */}
            <div className="lg:col-span-5 detail-hero-card">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Impact</p>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">Proven Performance</h3>
                  </div>
                  {service.isSpecialization && (
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-white" /> Core Focus
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 transition-colors duration-200 hover:bg-blue-50/40 hover:border-blue-100">
                    <div className="p-2 bg-blue-600/10 text-blue-600 rounded-xl shrink-0 mt-0.5">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Key ROI Highlight</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {service.roiHighlights || 'Delivering measurable growth, brand authority, and sustained engagement.'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                      <div className="text-lg font-black text-slate-900">45+</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Campaigns Completed</div>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                      <div className="text-lg font-black text-slate-900">98%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <span className="text-xs text-slate-500 font-medium">
                    Custom tailored packages available upon request
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DARK "WHY IT WORKS" SECTION */}
      <section id="why-it-works" className="py-14 sm:py-16 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Header */}
            <div className="why-it-works-text lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold uppercase tracking-wider">
                <span>// Why It Works</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                We do things differently. <br className="hidden sm:inline" />
                <span className="text-blue-400">Here is why it works.</span>
              </h2>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                We streamline execution by cutting out agency bloat. You get precise execution focused solely on what moves the needle for {service.title}.
              </p>
            </div>

            {/* Right Value Grid */}
            <div className="value-pillar-grid lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valuePillars.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="value-pillar-card group p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/50 hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 space-y-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600/20">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROCESS STEPS SECTION */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our 4-Step Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A structured workflow designed for clarity, speed, and continuous optimization.
            </p>
          </div>

          <div className="process-steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="process-step-card group relative p-6 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Numbers dark blue on mobile view by default */}
                  <span className="text-3xl font-black text-blue-600/30 max-sm:text-blue-600 group-hover:text-blue-600 transition-colors duration-300">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="faq-list-container space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="faq-item-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-300 hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors duration-200 touch-manipulation"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. FOOTER CTA */}
      <section className="py-12 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to elevate your {service.title}?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
            Contact us today to discuss your objectives and get a personalized execution plan.
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${BUSINESS_INFO?.email || 'info@bigteewise.com'}?subject=Inquiry regarding ${service.title}`}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 active:scale-95 font-extrabold text-sm px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group touch-manipulation"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}