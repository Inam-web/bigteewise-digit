'use client';

import React, { useState } from 'react';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MarqueeStrip from '@/components/MarqueeStrip';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import { TeamSection } from '@/components/TeamSection';
import ProcessSection from '@/components/ProcessSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import StatsBanner from '@/components/StatsBanner';

import { InteractiveQuoteModal } from '@/components/InteractiveQuoteModal';
import { Toast } from '@/components/Toast';
import { VideoModal } from '@/components/VideoModal';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Book Marketing');

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  // Open Quote Modal
  const handleOpenQuote = (serviceName) => {
    setQuoteService(serviceName || 'Book Marketing');
    setIsQuoteModalOpen(true);
  };

  // Close Quote Modal
  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
  };

  // Open Video Modal
  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
  };

  // Close Video Modal
  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };

  // Show Success Toast
  const handleSuccessToast = (message) => {
    setToastMessage(message);
  };

  // Close Toast
  const handleCloseToast = () => {
    setToastMessage(null);
  };

  return (
    <main className="min-h-screen bg-slate-900">

      {/* Header */}
      <Header
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Hero */}
      <Hero
        onOpenQuoteModal={handleOpenQuote}
        onOpenVideoModal={handleOpenVideo}
      />

      {/* Marquee */}
      <MarqueeStrip />

      {/* About */}
      <AboutSection
        onOpenQuoteModal={handleOpenQuote}
        onOpenVideoModal={handleOpenVideo}
      />

      {/* Services */}
      <ServicesSection
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Process */}
      <ProcessSection />

      {/* Why Choose Us */}
      <WhyChooseUs
        onOpenQuoteModal={handleOpenQuote}
        onOpenVideoModal={handleOpenVideo}
      />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Team */}
      <TeamSection />

      {/* Blog */}
      <BlogSection />

      {/* FAQ */}
      <FAQSection />

        {/* Newsletter */}
      <Newsletter
        onSuccessToast={handleSuccessToast}
      />

      {/* Contact */}
      <ContactSection />

      <Footer onOpenQuoteModal={handleOpenQuote} />

      {/* Interactive Quote Modal */}
      <InteractiveQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        preselectedService={quoteService}
        onSuccessToast={handleSuccessToast}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        onOpenQuoteModal={handleOpenQuote}
      />

      {/* Success Toast */}
      <Toast
        message={toastMessage}
        onClose={handleCloseToast}
      />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />

    </main>
  );
}