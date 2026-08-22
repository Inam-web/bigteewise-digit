'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Phone, Clock, Send, CheckCircle2, Mail, 
  ArrowRight, MessageSquare, Sparkles, Zap, AlertCircle 
} from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const businessInfo = {
  address: 'UK, United Kingdom',
  phone: '+234 807 352 7146',
  email: 'petergodswill52@gmail.com',
  socialLinks: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#'
  }
};

const servicesList = [
  { id: '1', title: 'Web Development', isSpecialization: false },
  { id: '2', title: 'Digital Strategy', isSpecialization: false },
  { id: '3', title: 'SEO Optimization', isSpecialization: false }
];

export default function ContactSection({ initialService = '', onSuccessToast }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || t('contact.form.serviceDefault') || 'Book Marketing',
    budget: '$1,000 - $3,000',
    message: '',
    website: '', // Honeypot field for anti-spam
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Contact items with translation keys
  const contactItems = [
    {
      icon: MapPin,
      label: t('contact.info.location'),
      lines: [businessInfo.address],
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: Phone,
      label: t('contact.info.directCall'),
      lines: [businessInfo.phone, businessInfo.email],
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      lines: [t('contact.info.hoursDetail'), 'Weekend: WhatsApp Only'],
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact_section',
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        setSubmitted(true);
        if (typeof onSuccessToast === 'function') {
          onSuccessToast(t('contact.form.successDesc'));
        }
      } else {
        setErrorMessage(data.error || t('contact.form.errorDesc'));
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(t('contact.form.errorDesc'));
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden"
    >
      {/* Ambient Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm">
            <span className="font-extrabold text-blue-600">//</span>
            <span>{t('contact.badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t('contact.heading')}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t('contact.subheading')}
          </p>
        </div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch">
          
          {/* LEFT: Dark Premium Info Panel */}
          <div 
            ref={leftRef} 
            className="lg:col-span-5 relative"
          >
            <div className="h-full bg-slate-900 text-white rounded-[2.2rem] p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
              {/* Inner Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-extrabold tracking-tight mb-2">{t('contact.info.title')}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t('contact.info.subtitle')}
                  </p>
                </div>

                <div className="space-y-5 flex-grow">
                  {contactItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/60 transition-all duration-300"
                    >
                      <div className={`w-11 h-11 rounded-xl ${item.bg} ${item.color} ${item.border} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{item.label}</h4>
                        {item.lines.map((line, i) => (
                          <p 
                            key={i} 
                            className={`text-sm font-semibold leading-snug break-all ${i === 1 && item.label === t('contact.info.directCall') ? 'text-blue-400 hover:text-blue-300 cursor-pointer transition-colors' : 'text-slate-200'}`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Socials */}
                <div className="pt-8 mt-8 border-t border-slate-800">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">{t('contact.socialHeading')}</h4>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: FacebookIcon, href: businessInfo.socialLinks.facebook, color: 'hover:bg-[#1877F2]' },
                      { icon: TwitterXIcon, href: businessInfo.socialLinks.twitter, color: 'hover:bg-slate-700' },
                      { icon: InstagramIcon, href: businessInfo.socialLinks.instagram, color: 'hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-yellow-500' },
                      { icon: LinkedinIcon, href: businessInfo.socialLinks.linkedin, color: 'hover:bg-[#0A66C2]' },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center transition-all duration-300 hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold self-start">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>{t('contact.responseTime')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Panel */}
          <div ref={rightRef} className="lg:col-span-7">
            <div className="h-full bg-white rounded-[2.2rem] p-8 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xl relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none" />

              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t('contact.form.successTitle')}</h3>
                    <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                      {t('contact.form.successDesc')}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          service: initialService || t('contact.form.serviceDefault') || 'Book Marketing',
                          budget: '$1,000 - $3,000',
                          message: '',
                          website: '',
                        });
                        setErrorMessage('');
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                      {t('contact.form.sendAnother')}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-7">
                  {/* Anti-spam Honeypot Field */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="hidden absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
                  />

                  {/* Error Alert Box */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-start gap-3 animate-in fade-in">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{t('contact.form.projectBrief')}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider ml-1">{t('contact.form.nameLabel')} *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={t('contact.form.namePlaceholder')}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-slate-50 border-2 rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-300 ${
                            focusedField === 'name' ? 'border-blue-500 bg-white shadow-md shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider ml-1">{t('contact.form.emailLabel')} *</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder={t('contact.form.emailPlaceholder')}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-slate-50 border-2 rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-300 ${
                            focusedField === 'email' ? 'border-blue-500 bg-white shadow-md shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider ml-1">{t('contact.form.phoneLabel')} *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder={t('contact.form.phonePlaceholder')}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-slate-50 border-2 rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-300 ${
                            focusedField === 'phone' ? 'border-blue-500 bg-white shadow-md shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider ml-1">{t('contact.form.serviceLabel')} *</label>
                      <div className="relative">
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-slate-50 border-2 border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:shadow-md focus:shadow-blue-500/10 rounded-2xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="Book Marketing">⭐ Book Marketing (Specialization)</option>
                          <option value="Author Branding">⭐ Author Branding (Specialization)</option>
                          {servicesList.map((s, idx) => (
                            <option key={s.id || idx} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider ml-1">{t('contact.form.messageLabel')} *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-slate-50 border-2 rounded-2xl px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === 'message' ? 'border-blue-500 bg-white shadow-md shadow-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base py-4 rounded-2xl shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {loading ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t('contact.form.submitting')}</span>
                          </>
                        ) : (
                          <>
                            <span>{t('contact.form.submitBtn')}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
                    </button>
                    
                    <p className="text-center text-[11px] text-slate-400 font-medium mt-4 flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {t('contact.form.freeConsultation')}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}