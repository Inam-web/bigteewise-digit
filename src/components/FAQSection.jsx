'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FAQS } from '@/app/Data/content';
import { Plus, Minus, MessageSquare, PhoneCall, ArrowRight, Sparkles, HelpCircle, Mail, Clock, Shield, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Extended FAQ data - add more questions here
const EXTENDED_FAQS = [
  {
    id: '1',
    question: 'What services do you offer for book marketing?',
    answer: 'We provide full-service book marketing including Amazon ads, social media campaigns, author branding, and PR outreach. Our team handles everything from strategy to execution.'
  },
  {
    id: '2',
    question: 'How long does a typical campaign take?',
    answer: 'Campaign duration varies based on your goals. A typical book launch campaign runs 4-6 weeks, while ongoing marketing can extend 3-6 months. We\'ll create a timeline that works for you.'
  },
  {
    id: '3',
    question: 'Can I request customized marketing plans?',
    answer: 'Absolutely! Every author and book is unique. We create tailored marketing strategies based on your genre, audience, budget, and goals. No cookie-cutter approaches here.'
  },
  {
    id: '4',
    question: 'Do you offer Amazon KDP optimization?',
    answer: 'Yes, we specialize in Amazon KDP category selection, keyword optimization, book descriptions, A+ content, and ad campaign management to help you rank higher and sell more.'
  },
  {
    id: '5',
    question: 'What is the cost of your services?',
    answer: 'Pricing depends on the scope of your project. We offer customized packages starting from $500 for basic services to $5,000+ for full-scale campaigns. Contact us for a free quote.'
  },
  {
    id: '6',
    question: 'How do I get started with BigTeeWise Digital?',
    answer: 'Simply click "Contact Us Now" and fill in your project details. Our team will review your requirements and send a custom proposal within 24 hours.'
  }
];

export default function FAQSection({ onOpenQuoteModal }) {
  const [openFaqId, setOpenFaqId] = useState(EXTENDED_FAQS[0]?.id || '');
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const faqListRef = useRef(null);
  const sideCardRef = useRef(null);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      }

      if (faqListRef.current) {
        gsap.fromTo(
          faqListRef.current.children,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: faqListRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }

      if (sideCardRef.current) {
        gsap.fromTo(
          sideCardRef.current.children,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: sideCardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="py-20 lg:py-28 bg-white text-slate-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <span className="text-blue-600 font-extrabold">//</span>
              <span>FAQs</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Questions? <span className="text-blue-600">We've got answers.</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Everything you need to know about our services, process, and how we help authors and brands grow.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
            <span>{EXTENDED_FAQS.length} Common Questions</span>
          </div>
        </div>

        {/* 2-Column FAQ Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Accordions */}
          <div ref={faqListRef} className="lg:col-span-8 space-y-3">
            {EXTENDED_FAQS.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-400 overflow-hidden border will-change-transform ${
                    isOpen
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-600 shadow-xl shadow-blue-600/20'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100/50'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base focus:outline-none transition-colors duration-200"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`text-[10px] font-black w-6 ${
                        isOpen ? 'text-blue-200' : 'text-slate-400'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base leading-relaxed text-blue-50/90 animate-in fade-in slide-in-from-top-2 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Support Cards */}
          <div ref={sideCardRef} className="lg:col-span-4 space-y-4">
            
            {/* Main Support Card */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1e293b] text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
                <MessageSquare className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Still have questions?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  Our team will answer all your questions about book marketing, pricing, and timelines.
                </p>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-3 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Contact Us Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Contact Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center hover:border-blue-300 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Call Us</p>
                <a href="tel:+2348140009821" className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors">
                  +234 814 000 9821
                </a>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-center hover:border-blue-300 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
                  <Mail className="w-4 h-4" />
                </div>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Email Us</p>
                <a href="mailto:info@bigteewise.com" className="text-xs font-extrabold text-slate-900 hover:text-blue-600 transition-colors">
                  info@bigteewise.com
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 transition-all duration-300">
                <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-600 block">Under 2hrs</span>
                <span className="text-[7px] text-slate-400 uppercase tracking-wider">Response</span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 transition-all duration-300">
                <Shield className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-600 block">100%</span>
                <span className="text-[7px] text-slate-400 uppercase tracking-wider">Satisfaction</span>
              </div>
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200 text-center hover:border-blue-300 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[9px] font-bold text-slate-600 block">24/7</span>
                <span className="text-[7px] text-slate-400 uppercase tracking-wider">Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}