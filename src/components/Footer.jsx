'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Sparkles, Phone, Mail, MapPin, ArrowRight, 
  ArrowUpRight, ChevronUp, Clock, Code, User
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './SocialIcons';
import { useLanguage } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const BUSINESS_INFO = {
  shortAbout: "Empowering authors and digital creators with strategic marketing, branding, and web design.",
  address: "UK, United Kingdom",
  phone: "+234 807 352 7146",
  email: "petergodswill52@gmail.com",
  socialHandle: "@bigteewisedigital",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://www.instagram.com/petertaiwogodswill/",
    tiktok: "https://www.tiktok.com/@bigteewisedigital",
  },
};

export const Footer = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();
  const footerRef = useRef(null);
  const ctaCardRef = useRef(null);
  const brandColRef = useRef(null);
  const navColRef = useRef(null);
  const servicesColRef = useRef(null);
  const contactColRef = useRef(null);
  const copyrightRef = useRef(null);

  const footerLinks = {
    navigation: [
      { id: 'nav-home', label: t('nav.home'), href: '#home' },
      { id: 'nav-about', label: t('nav.about'), href: '#about' },
      { id: 'nav-services', label: t('nav.services'), href: '#services' },
      { id: 'nav-portfolio', label: t('nav.portfolio'), href: '#portfolio' },
      { id: 'nav-testimonials', label: t('nav.testimonials'), href: '#testimonials' },
      { id: 'nav-team', label: t('team.metaTeam') || 'Our Team', href: '#team' },
      { id: 'nav-faq', label: t('faq.badge') || 'FAQs', href: '#faq' },
    ],
    services: [
      { id: 'svc-book-marketing', label: 'Book Marketing', href: '#services', featured: true },
      { id: 'svc-author-branding', label: 'Author Branding', href: '#services', featured: true },
      { id: 'svc-cover-design', label: 'Book Cover Design', href: '#services' },
      { id: 'svc-3d-mockups', label: '3D Book Mockups', href: '#services' },
      { id: 'svc-digital-ads', label: 'Digital Advertising', href: '#services' },
      { id: 'svc-social-media', label: 'Social Media Marketing', href: '#services' },
      { id: 'svc-seo', label: 'SEO & Content Strategy', href: '#services' },
    ],
  };

  // ============================================================
  // GSAP ANIMATIONS - OPTIMIZED FOR ALL SCREENS
  // ============================================================
  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set([
        ctaCardRef.current,
        brandColRef.current,
        navColRef.current,
        servicesColRef.current,
        contactColRef.current,
        copyrightRef.current,
      ], {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: 'transform,opacity',
      });
      return;
    }

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const dur = isMobile ? 0.5 : (isTablet ? 0.7 : 1);
    const staggerDur = isMobile ? 0.08 : (isTablet ? 0.12 : 0.15);
    const yOffset = isMobile ? 20 : (isTablet ? 30 : 40);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: isMobile ? 'top 90%' : 'top 85%',
        once: true,
      },
    });

    // CTA Card
    tl.fromTo(ctaCardRef.current,
      { opacity: 0, y: yOffset, scale: isMobile ? 0.98 : 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: dur + 0.2, ease: 'power4.out', force3D: true }
    );

    // Columns
    tl.fromTo(
      [brandColRef.current, navColRef.current, servicesColRef.current, contactColRef.current],
      { opacity: 0, y: yOffset },
      { opacity: 1, y: 0, duration: dur, stagger: staggerDur, ease: 'power4.out', force3D: true },
      '-=0.5'
    );

    // Copyright
    tl.fromTo(
      copyrightRef.current,
      { opacity: 0, y: isMobile ? 15 : 20 },
      { opacity: 1, y: 0, duration: dur * 0.8, ease: 'power4.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#0B132B] text-white relative overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Top CTA Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div
          ref={ctaCardRef}
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-6 sm:p-10 lg:p-12 rounded-[2rem] border border-slate-800 shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
            <div className="text-center lg:text-left space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{t('footer.ctaBadge')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                {t('footer.ctaHeadingPre')} <br className="hidden sm:block" />
                {t('footer.ctaHeadingPost')} <span className="text-blue-500">{t('footer.ctaHeadingHighlight')}</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {t('footer.ctaSubtext')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto group bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t('footer.ctaBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto group bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-8 py-4 rounded-full border border-slate-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{t('footer.ctaCall')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative z-10 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* Brand Column */}
            <div ref={brandColRef} className="sm:col-span-2 lg:col-span-4 space-y-6">
              <a href="#home" className="inline-flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 group-hover:shadow-blue-600/40 transition-all duration-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="leading-none">
                  <span className="font-extrabold text-xl tracking-tight text-white">BigTeeWise</span>
                  <span className="font-bold text-xl tracking-tight text-blue-500 ml-1">Digital</span>
                </div>
              </a>

              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                {t('footer.tagline')}
              </p>

              <div className="flex items-center gap-3">
                {[
                  { icon: FacebookIcon, href: BUSINESS_INFO.socialLinks.facebook, label: 'Facebook', color: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
                  { icon: TikTokIcon, href: BUSINESS_INFO.socialLinks.tiktok, label: 'TikTok', color: 'hover:bg-black hover:border-slate-600' },
                  { icon: InstagramIcon, href: BUSINESS_INFO.socialLinks.instagram, label: 'Instagram', color: 'hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 hover:border-transparent' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center justify-center transition-all duration-300 hover:text-white hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('footer.responseTime')}</span>
              </div>
            </div>

            {/* Navigation Column */}
            <div ref={navColRef} className="lg:col-span-2 sm:pl-4 lg:pl-0">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {t('footer.navHeading')}
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.id}>
                    <a 
                      href={link.href} 
                      className="group text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200 text-blue-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div ref={servicesColRef} className="lg:col-span-3 sm:pl-4 lg:pl-0">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {t('footer.servicesHeading')}
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.id}>
                    <a 
                      href={link.href} 
                      className={`group text-sm transition-colors duration-200 flex items-center gap-2 ${
                        link.featured ? 'text-blue-400 font-semibold hover:text-blue-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {link.featured && <span className="text-[10px]">★</span>}
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200 text-blue-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div ref={contactColRef} className="lg:col-span-3 sm:pl-4 lg:pl-0">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {t('footer.contactHeading')}
              </h4>
              
              <div className="space-y-4">
                <a 
                  href={`https://maps.google.com/?q=${BUSINESS_INFO.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="leading-snug pt-1">{BUSINESS_INFO.address}</span>
                </a>

                <a 
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="leading-snug pt-1">{BUSINESS_INFO.phone}</span>
                </a>

                <a 
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200 min-w-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="leading-snug pt-1 break-all">{BUSINESS_INFO.email}</span>
                </a>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{t('footer.socialHandle')}</p>
                <p className="text-sm font-bold text-blue-400">{BUSINESS_INFO.socialHandle}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div ref={copyrightRef} className="relative z-10 bg-[#070C1A] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
              <p>© 2026 BigTeeWise Digital. {t('footer.rightsReserved')}</p>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
              <p>{t('footer.crafted')}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
              
              <div className="flex items-center gap-3">
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(t('footer.privacyText'));
                  }}
                  className="text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200"
                >
                  {t('footer.privacyPolicy')}
                </a>
                <span className="w-px h-3 bg-slate-700" />
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(t('footer.termsText'));
                  }}
                  className="text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200"
                >
                  {t('footer.termsOfService')}
                </a>
              </div>

              <span className="hidden md:block w-px h-5 bg-slate-700" />

              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-medium text-slate-400">Built by</span>
                <span className="text-[12px] font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Inam Ullah Afridi
                </span>
                <Code className="w-3.5 h-3.5 text-blue-500/60" />
              </div>

              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                aria-label="Back to top"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;