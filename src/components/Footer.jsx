'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Sparkles, Phone, Mail, MapPin, ArrowRight, 
  ArrowUpRight, ChevronUp, Clock 
} from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';

const BUSINESS_INFO = {
  shortAbout: "Empowering authors and digital creators with strategic marketing, branding, and web design.",
  address: "Lagos, Nigeria",
  phone: "+234 800 000 0000",
  email: "contact@bigteewise.digital",
  socialHandle: "@bigteewisedigital",
  socialLinks: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

gsap.registerPlugin(ScrollTrigger);

export const Footer = ({ onOpenQuoteModal }) => {
  const footerRef = useRef(null);
  const ctaCardRef = useRef(null);
  const brandColRef = useRef(null);
  const navColRef = useRef(null);
  const servicesColRef = useRef(null);
  const contactColRef = useRef(null);
  const copyrightRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ctaCardRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", force3D: true }
      );

      tl.fromTo(
        [brandColRef.current, navColRef.current, servicesColRef.current, contactColRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power2.out", force3D: true },
        "-=0.7"
      );

      tl.fromTo(
        copyrightRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        "-=0.5"
      );
    });

    return () => mm.revert();
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    navigation: [
      { label: 'Home', href: '#home' },
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Our Team', href: '#team' },
      { label: 'FAQs', href: '#faq' },
    ],
    services: [
      { label: 'Book Marketing', href: '#services', featured: true },
      { label: 'Author Branding', href: '#services', featured: true },
      { label: 'Book Cover Design', href: '#services' },
      { label: '3D Book Mockups', href: '#services' },
      { label: 'Digital Advertising', href: '#services' },
      { label: 'Social Media Marketing', href: '#services' },
      { label: 'SEO & Content Strategy', href: '#services' },
    ],
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
                <span>Start Today</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Ready to Publish, Brand, <br className="hidden sm:block" />
                and <span className="text-blue-500">Scale Your Impact?</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Get a tailored strategy session with our team. No obligations, just actionable insights for your next book or brand launch.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto group bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get Free Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto group bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-8 py-4 rounded-full border border-slate-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Us Now</span>
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
                {BUSINESS_INFO.shortAbout} We specialize in high-converting Book Marketing, Author Branding, and Digital Strategy based in Lagos, Nigeria.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3">
                {[
                  { icon: FacebookIcon, href: BUSINESS_INFO.socialLinks.facebook, label: 'Facebook', color: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
                  { icon: TwitterXIcon, href: BUSINESS_INFO.socialLinks.twitter, label: 'Twitter', color: 'hover:bg-slate-600 hover:border-slate-600' },
                  { icon: InstagramIcon, href: BUSINESS_INFO.socialLinks.instagram, label: 'Instagram', color: 'hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500 hover:border-transparent' },
                  { icon: LinkedinIcon, href: BUSINESS_INFO.socialLinks.linkedin, label: 'LinkedIn', color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]' },
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

              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Avg. Response: Under 2 Hours</span>
              </div>
            </div>

            {/* Navigation Column */}
            <div ref={navColRef} className="lg:col-span-2 sm:pl-4 lg:pl-0">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Navigate
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
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
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
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
                Contact
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
                  className="group flex items-start gap-3 text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="leading-snug pt-1">{BUSINESS_INFO.email}</span>
                </a>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Social Handle</p>
                <p className="text-sm font-bold text-blue-400">{BUSINESS_INFO.socialHandle}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div ref={copyrightRef} className="relative z-10 bg-[#070C1A] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
              <p>© 2025 BigTeeWise Digital. All Rights Reserved.</p>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
              <p>Crafted with precision in Lagos, Nigeria.</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  alert("BigTeeWise Digital Privacy Policy: We safeguard all author manuscripts, creative assets, and client information with strict confidentiality.");
                }}
                className="text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert("BigTeeWise Digital Terms: All creative graphics and campaign strategies are bespoke property for our clients upon project delivery.");
                }}
                className="text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200"
              >
                Terms
              </a>
              
              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="ml-2 w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
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