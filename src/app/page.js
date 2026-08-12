'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenQuote = (serviceName) => {
    setIsQuoteModalOpen(true);
  };
  
  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <Header onOpenQuoteModal={handleOpenQuote} />

      <Hero 
        onOpenQuoteModal={handleOpenQuote} 
        onOpenVideoModal={handleOpenVideo} 
      />

      <MarqueeStrip />

      <AboutSection 
        onOpenQuoteModal={handleOpenQuote} 
        onOpenVideoModal={handleOpenVideo} 
      />

      <ServicesSection 
        onOpenQuoteModal={handleOpenQuote} 
      />
    </main>
  );
}