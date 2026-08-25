import React, { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../app/Data/content';
import {
  X,
  Send,
  Sparkles,
  BookOpen,
  CheckCircle,
  Calculator,
  ArrowRight,
  User,
  Mail,
  Phone,
  Calendar,
  Target,
  AlertCircle,
} from "lucide-react";
import gsap from 'gsap';
import { useLanguage } from '@/i18n/LanguageContext';

export const InteractiveQuoteModal = ({
  isOpen,
  onClose,
  preselectedService = "",
  onSuccessToast,
}) => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(
    preselectedService || t('quoteModal.bookMarketing') || "Book Marketing"
  );
  const [bookType, setBookType] = useState(t('quoteModal.nonFiction') || "Non-Fiction / Business");
  const [hasDesign, setHasDesign] = useState(t('quoteModal.needDesign') || "No, Need Design");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [website, setWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const nameInputRef = useRef(null);

  // Focus management - trap focus inside modal
  useEffect(() => {
    if (isOpen) {
      // Focus the first input after a short delay
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  // Hide navbar and prevent scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      // Hide navbar
      const header = document.querySelector('header');
      if (header) {
        header.style.display = 'none';
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      
      // Lower z-index of other fixed elements
      const fixedElements = document.querySelectorAll('.fixed, .sticky');
      fixedElements.forEach(el => {
        if (el.closest('header') || el.closest('.modal-overlay')) return;
        if (el.getAttribute('data-modal-safe')) return;
        el.style.zIndex = '0';
      });

      // GSAP Animation
      const ctx = gsap.context(() => {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        );
        
        gsap.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power3.out' }
        );
      }, modalRef);

      return () => ctx.revert();
    } else {
      // Restore navbar
      const header = document.querySelector('header');
      if (header) {
        header.style.display = '';
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
      
      // Restore fixed elements
      const fixedElements = document.querySelectorAll('.fixed, .sticky');
      fixedElements.forEach(el => {
        if (el.closest('header') || el.closest('.modal-overlay')) return;
        if (el.getAttribute('data-modal-safe')) return;
        el.style.zIndex = '';
      });
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: selectedService,
          bookType,
          hasDesign,
          details,
          website,
          source: 'quote_modal',
        }),
      });

      const data = await response.json();
      setIsSubmitting(false);

      if (response.ok && data.success) {
        setSubmitted(true);
        if (onSuccessToast) {
          onSuccessToast(t('quoteModal.successMessage'));
        }

        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setName("");
          setEmail("");
          setPhone("");
          setDetails("");
          setWebsite("");
          setErrorMessage("");
        }, 3000);
      } else {
        setErrorMessage(data.error || t('quoteModal.errorMessage'));
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(t('quoteModal.networkError'));
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md modal-overlay"
      onClick={onClose}
      data-modal-safe="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto border border-slate-100"
        onClick={(e) => e.stopPropagation()}
        data-modal-safe="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-all duration-200 z-20"
          aria-label={t('quoteModal.closeModal') || 'Close modal'}
        >
          <X className="w-5 h-5" />
        </button>

        <div ref={contentRef}>
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-in zoom-in duration-300">
                <CheckCircle className="w-10 h-10" aria-hidden="true" />
              </div>

              <h3 id="modal-title" className="text-2xl font-extrabold text-slate-900">
                {t('quoteModal.successTitle') || 'Thank You!'}
              </h3>

              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                {t('quoteModal.successMessage') || 'Your inquiry has been received. We\'ll get back to you within 24 hours.'}
              </p>

              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:scale-95"
                aria-label={t('quoteModal.closeModal') || 'Close modal'}
              >
                {t('quoteModal.closeModal') || 'Close'}
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20" aria-hidden="true">
                  <Calculator className="w-5 h-5" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    BigTeeWise Digital • {t('quoteModal.consultation') || 'Free Consultation'}
                  </span>

                  <h3 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {t('quoteModal.headerTitle') || 'Get Your Free Quote'}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                {t('quoteModal.headerSubtitle') || 'Fill in the details below and we\'ll get back to you within 24 hours.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Anti-spam Honeypot Field */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Error Alert Box */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in" role="alert">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label htmlFor="service-select" className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                    {t('quoteModal.serviceLabel') || 'Select Service'} <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="sr-only">Required</span>
                  </label>

                  <select
                    id="service-select"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all"
                    aria-required="true"
                    aria-label={t('quoteModal.serviceLabel') || 'Select Service'}
                  >
                    <option value={t('quoteModal.bookMarketing') || 'Book Marketing'}>
                      📚 {t('quoteModal.bookMarketing') || 'Book Marketing'} ⭐
                    </option>

                    <option value={t('quoteModal.authorBranding') || 'Author Branding'}>
                      👤 {t('quoteModal.authorBranding') || 'Author Branding'} ⭐
                    </option>

                    {SERVICES.filter((s) => !s.isSpecialization).map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Conditional Book Options */}
                {(selectedService.includes("Book") ||
                  selectedService.includes("Author") ||
                  selectedService.includes(t('quoteModal.bookMarketing') || 'Book Marketing') ||
                  selectedService.includes(t('quoteModal.authorBranding') || 'Author Branding')) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-4 rounded-2xl border border-blue-100/50">
                    {/* Book Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="book-type" className="text-xs font-bold text-blue-900 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                        {t('quoteModal.bookTypeLabel') || 'Book Type'}
                      </label>

                      <select
                        id="book-type"
                        value={bookType}
                        onChange={(e) => setBookType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        aria-label={t('quoteModal.bookTypeLabel') || 'Book Type'}
                      >
                        <option value={t('quoteModal.nonFiction') || 'Non-Fiction'}>
                          {t('quoteModal.nonFiction') || 'Non-Fiction'}
                        </option>

                        <option value={t('quoteModal.selfHelp') || 'Self-Help'}>
                          {t('quoteModal.selfHelp') || 'Self-Help'}
                        </option>

                        <option value={t('quoteModal.fiction') || 'Fiction'}>
                          {t('quoteModal.fiction') || 'Fiction'}
                        </option>

                        <option value={t('quoteModal.childrens') || "Children's"}>
                          {t('quoteModal.childrens') || "Children's"}
                        </option>
                      </select>
                    </div>

                    {/* Design Status */}
                    <div className="space-y-1.5">
                      <label htmlFor="design-status" className="text-xs font-bold text-blue-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                        {t('quoteModal.designStatusLabel') || 'Design Status'}
                      </label>

                      <select
                        id="design-status"
                        value={hasDesign}
                        onChange={(e) => setHasDesign(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        aria-label={t('quoteModal.designStatusLabel') || 'Design Status'}
                      >
                        <option value={t('quoteModal.needDesign') || 'No, Need Design'}>
                          {t('quoteModal.needDesign') || 'No, Need Design'}
                        </option>

                        <option value={t('quoteModal.haveCover') || 'Yes, Have Cover'}>
                          {t('quoteModal.haveCover') || 'Yes, Have Cover'}
                        </option>

                        <option value={t('quoteModal.fullRebrand') || 'Full Rebrand'}>
                          {t('quoteModal.fullRebrand') || 'Full Rebrand'}
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      {t('quoteModal.fullNameLabel') || 'Full Name'} <span className="text-red-500" aria-hidden="true">*</span>
                      <span className="sr-only">Required</span>
                    </label>

                    <input
                      ref={nameInputRef}
                      id="name-input"
                      type="text"
                      required
                      placeholder={t('quoteModal.fullNamePlaceholder') || 'John Doe'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                      aria-required="true"
                      aria-label={t('quoteModal.fullNameLabel') || 'Full Name'}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      {t('quoteModal.emailLabel') || 'Email Address'} <span className="text-red-500" aria-hidden="true">*</span>
                      <span className="sr-only">Required</span>
                    </label>

                    <input
                      id="email-input"
                      type="email"
                      required
                      placeholder={t('quoteModal.emailPlaceholder') || 'john@example.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                      aria-required="true"
                      aria-label={t('quoteModal.emailLabel') || 'Email Address'}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone-input" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      {t('quoteModal.phoneLabel') || 'Phone Number'} <span className="text-red-500" aria-hidden="true">*</span>
                      <span className="sr-only">Required</span>
                    </label>

                    <input
                      id="phone-input"
                      type="tel"
                      required
                      placeholder={t('quoteModal.phonePlaceholder') || '+1 234 567 8900'}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                      aria-required="true"
                      aria-label={t('quoteModal.phoneLabel') || 'Phone Number'}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label htmlFor="details-textarea" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    {t('quoteModal.projectNotesLabel') || 'Project Details'}
                  </label>

                  <textarea
                    id="details-textarea"
                    rows={3}
                    placeholder={t('quoteModal.projectNotesPlaceholder') || 'Tell us about your project...'}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl p-3.5 text-sm text-slate-900 outline-none transition-all resize-none"
                    aria-label={t('quoteModal.projectNotesLabel') || 'Project Details'}
                  />
                </div>

                <div className="text-[10px] text-slate-400 text-center">
                  {t('quoteModal.privacyNotice') || 'Your information is secure. We\'ll never share your data.'}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                  aria-label={isSubmitting ? (t('quoteModal.submitting') || 'Submitting...') : (t('quoteModal.submitQuote') || 'Submit Quote Request')}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      <span>{t('quoteModal.submitting') || 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>{t('quoteModal.submitQuote') || 'Submit Quote Request'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuoteModal;