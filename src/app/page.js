'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const handleOpenQuoteModal = () => {
    alert('Quote Modal clicked! We will build this component next.');
  };

  const handleOpenVideoModal = () => {
    alert('Video Modal clicked! We will build this component next.');
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Navigation Header */}
      <Header 
        onOpenQuoteModal={handleOpenQuoteModal} 
        activeSection={activeSection} 
      />

      {/* Main Hero Section */}
      <Hero 
        onOpenQuoteModal={handleOpenQuoteModal} 
        onOpenVideoModal={handleOpenVideoModal} 
      />
    </main>
  );
}