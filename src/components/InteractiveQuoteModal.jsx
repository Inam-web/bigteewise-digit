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
} from "lucide-react";
import gsap from 'gsap';

export const InteractiveQuoteModal = ({
  isOpen,
  onClose,
  preselectedService = "",
  onSuccessToast,
}) => {
  const [selectedService, setSelectedService] = useState(
    preselectedService || "Book Marketing"
  );
  const [bookType, setBookType] = useState("Non-Fiction / Business");
  const [hasDesign, setHasDesign] = useState("No, Need Design");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const modalRef = useRef(null);
  const contentRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      if (onSuccessToast) {
        onSuccessToast(
          "Proposal request submitted! BigTeeWise Digital will contact you shortly."
        );
      }
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setDetails("");
      }, 3000);
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md modal-overlay"
      onClick={onClose}
      data-modal-safe="true"
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
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div ref={contentRef}>
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-in zoom-in duration-300">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                Proposal Request Received! 🎉
              </h3>

              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{name}</strong>. Our lead strategist will
                review your project details for{" "}
                <span className="text-blue-600 font-semibold">
                  {selectedService}
                </span>{" "}
                and send a tailored strategy breakdown to{" "}
                <strong className="text-slate-900">{email}</strong>.
              </p>

              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:scale-95"
              >
                Done & Close
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20">
                  <Calculator className="w-5 h-5" />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    BigTeeWise Digital • Consultation
                  </span>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Request A Custom Proposal
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                Fill in your book or project details below. We'll craft a custom
                campaign breakdown tailored to your sales & branding goals.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-blue-600" />
                    Select Core Goal / Service <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-sm text-slate-900 font-medium outline-none transition-all"
                  >
                    <option value="Book Marketing">
                      📚 Book Marketing Campaign ⭐
                    </option>

                    <option value="Author Branding">
                      👤 Author Personal Branding & EPK ⭐
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
                  selectedService.includes("Author")) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-4 rounded-2xl border border-blue-100/50">
                    {/* Book Type */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-blue-900 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        Book Genre / Type
                      </label>

                      <select
                        value={bookType}
                        onChange={(e) => setBookType(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="Non-Fiction / Business">
                          Non-Fiction / Business / Leadership
                        </option>

                        <option value="Self-Help / Motivation">
                          Self-Help & Personal Growth
                        </option>

                        <option value="Fiction / Thriller / Romance">
                          Fiction / Novel / Memoir
                        </option>

                        <option value="Children's Book">
                          Children's Book / Illustrated
                        </option>
                      </select>
                    </div>

                    {/* Design Status */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-blue-900 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        Cover & 3D Mockup Status
                      </label>

                      <select
                        value={hasDesign}
                        onChange={(e) => setHasDesign(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="No, Need Design">
                          Need New Cover & 3D Mockups
                        </option>

                        <option value="Yes, Have Cover">
                          Already Have Cover, Need Marketing
                        </option>

                        <option value="Full Rebrand Needed">
                          Complete Author Rebrand
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Email <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      required
                      placeholder="+234..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Project Timeline & Key Goals
                  </label>

                  <textarea
                    rows={3}
                    placeholder="Share your expected launch date, sales targets, or specific campaign requests..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl p-3.5 text-sm text-slate-900 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm py-3.5 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Submit Proposal Request</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  By submitting, you agree to our privacy policy. We'll never share your information.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};