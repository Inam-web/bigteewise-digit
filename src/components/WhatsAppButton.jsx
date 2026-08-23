// src/components/WhatsAppButton.jsx
'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ 
  phoneNumber = '+2348073527146', 
  message = '',
  serviceName = '',
  className = '',
  size = 'default',
  children
}) => {
  // Format phone number (remove any non-numeric characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Create WhatsApp message with service context
  const getWhatsAppMessage = () => {
    let text = message || `Hi! I'm interested in your services`;
    
    // Add service name if provided
    if (serviceName) {
      text = `Hi! I'm interested in your "${serviceName}" service. I'd like to know more about pricing and how you can help me.`;
    }
    
    // Include page URL for context (only in browser)
    if (typeof window !== 'undefined') {
      text += `\n\nI'm on: ${window.location.href}`;
    }
    
    return encodeURIComponent(text);
  };

  const whatsappLink = `https://wa.me/${formattedPhone}?text=${getWhatsAppMessage()}`;

  // Size variants
  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2.5 text-sm',
    large: 'px-6 py-3.5 text-base',
  };

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>{children || (serviceName ? `Inquire About ${serviceName}` : 'Chat on WhatsApp')}</span>
    </a>
  );
};

export default WhatsAppButton;