// src/components/FloatingWhatsApp.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = ({ 
  phoneNumber = '+2348073527146',
  message = "Hi! I'd like to know more about your services.",
  serviceName = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Show button after scrolling
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Only generate message on client side to avoid hydration mismatch
  const getMessage = () => {
    let text = message;
    if (serviceName) {
      text = `Hi! I'm interested in your "${serviceName}" service. Can you tell me more about pricing and how you can help?`;
    }
    // Only add URL on client side
    if (typeof window !== 'undefined') {
      text += `\n\nI'm on: ${window.location.href}`;
    }
    return encodeURIComponent(text);
  };

  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${getMessage()}`;

  // ✅ Don't render anything on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
    >
      {/* Tooltip */}
      {showTooltip && isVisible && (
        <div className="absolute bottom-full right-0 mb-3 bg-white text-slate-800 text-sm font-semibold px-4 py-2 rounded-xl shadow-xl border border-slate-200 whitespace-nowrap animate-pulse">
          Need help? Chat with us! 👋
          <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-slate-200"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all duration-300 hover:-translate-y-1 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-14 h-14 flex items-center justify-center">
          <MessageCircle className="w-7 h-7" />
        </div>
        <span className="pr-4 font-bold text-sm hidden sm:inline-block">
          Chat with us
        </span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;