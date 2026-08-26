'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ✅ Import Header and Hero normally (they load first)
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// ✅ Lazy load everything else
const MarqueeStrip = dynamic(() => import('@/components/MarqueeStrip'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), { ssr: false });
const ProcessSection = dynamic(() => import('@/components/ProcessSection'), { ssr: false });
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/TeamSection'), { ssr: false });
const BlogSection = dynamic(() => import('@/components/BlogSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const Newsletter = dynamic(() => import('@/components/Newsletter'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

// ✅ Modals
import { InteractiveQuoteModal } from '@/components/InteractiveQuoteModal';
import { Toast } from '@/components/Toast';
import { VideoModal } from '@/components/VideoModal';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Book Marketing');
  const [toastMessage, setToastMessage] = useState(null);

  // ✅ Refresh ScrollTrigger after everything loads
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          const { ScrollTrigger } = require('gsap/ScrollTrigger');
          ScrollTrigger.refresh();
        } catch (e) {}
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenQuote = (serviceName) => {
    setQuoteService(serviceName || 'Book Marketing');
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };

  const handleSuccessToast = (message) => {
    setToastMessage(message);
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  return (
    <main className="min-h-screen bg-slate-900">

      {/* ✅ Header - Loads First */}
      <Header onOpenQuoteModal={handleOpenQuote} />

      {/* ✅ Hero - Loads Second */}
      <Hero onOpenQuoteModal={handleOpenQuote} onOpenVideoModal={handleOpenVideo} />

      {/* ✅ Everything else - Loads After Hero */}
      <MarqueeStrip />
      <AboutSection onOpenQuoteModal={handleOpenQuote} onOpenVideoModal={handleOpenVideo} />
      <ServicesSection onOpenQuoteModal={handleOpenQuote} />
      <ProcessSection />
      <WhyChooseUs onOpenQuoteModal={handleOpenQuote} onOpenVideoModal={handleOpenVideo} />
      <TestimonialsSection />
      <TeamSection />
      <BlogSection />
      <FAQSection />
      <Newsletter onSuccessToast={handleSuccessToast} />
      <ContactSection />
      <Footer onOpenQuoteModal={handleOpenQuote} />

      {/* Modals */}
      <InteractiveQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        preselectedService={quoteService}
        onSuccessToast={handleSuccessToast}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        onOpenQuoteModal={handleOpenQuote}
      />

      <Toast message={toastMessage} onClose={handleCloseToast} />

      <WhatsAppWidget />

    </main>
  );
}