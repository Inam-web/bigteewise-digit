'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpenCheck, UserCheck, Palette, Box, TrendingUp, Share2, 
  Sparkles, FileText, Search, Compass, Target, Lightbulb, 
  ArrowRight, Star, Users 
} from 'lucide-react';
import { SERVICES } from '../app/Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePathname } from 'next/navigation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ✅ FIXED: Use absolute paths from public folder
const SERVICE_IMAGES = {
  'book-marketing': '/images/services/book-marketing.jpg',
  'author-branding': '/images/services/author-branding-v2.jpg',
  'book-cover-design': '/images/services/book-cover-design-v3.jpg',
  'book-mockup-design': '/images/services/book-mockup-design-v2.jpeg',
  'digital-marketing': '/images/services/digital-marketing.jpg',
  'social-media-marketing': '/images/services/social-media-marketing.jpg',
  'social-media-graphics': '/images/services/social-media-graphics.jpg',
  'content-marketing': '/images/services/content-marketing.jpg',
  'seo': '/images/services/seo.jpg',
  'brand-strategy': '/images/services/brand-strategy.jpg',
  'digital-advertising': '/images/services/digital-advertising.jpg',
  'marketing-strategy': '/images/services/marketing-strategy.jpg',
  'default': '/images/services/default.jpg'
};

export default function ServicesSection({ onOpenQuoteModal }) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState({});
  const sectionRef = useRef(null);

  const iconMap = {
    BookOpenCheck: <BookOpenCheck className="w-5 h-5" />,
    UserCheck: <UserCheck className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    Box: <Box className="w-5 h-5" />,
    TrendingUp: <TrendingUp className="w-5 h-5" />,
    Share2: <Share2 className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    FileText: <FileText className="w-5 h-5" />,
    Search: <Search className="w-5 h-5" />,
    Compass: <Compass className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
    Lightbulb: <Lightbulb className="w-5 h-5" />
  };

  const servicesList = SERVICES || [];

  const filteredServices = servicesList.filter(service => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'specialization') return service.isSpecialization;
    return service.category === selectedCategory;
  });

  // Get translated category labels
  const getCategoryLabel = (category) => {
    if (category === 'specialization') return t('services.specialization') || 'Specialization';
    if (category === 'marketing') return t('services.digitalMarketingTab') || 'Digital Marketing & SEO';
    if (category === 'creative') return t('services.creativeDesignTab') || 'Creative Design & Branding';
    return t('services.specialization') || 'Specialization';
  };

  // ✅ Get the correct image path with fallback
  const getServiceImage = (service) => {
    // Check if service has custom image
    if (service.image) return service.image;
    if (service.coverImage) return service.coverImage;
    
    // Check mapped images
    if (SERVICE_IMAGES[service.id]) return SERVICE_IMAGES[service.id];
    
    // ✅ Use service title to generate a filename (fallback)
    const titleSlug = service.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'default';
    return `/images/services/${titleSlug}.jpg`;
  };

  // Handle image errors
  const handleImageError = (serviceId) => {
    setImageErrors(prev => ({ ...prev, [serviceId]: true }));
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          clearProps: 'transform,opacity',
        }
      );

      const rows = gsap.utils.toArray('.service-row-item');
      rows.forEach((row) => {
        const imageCol = row.querySelector('.service-image-col');
        const cardCol = row.querySelector('.service-card-col');

        if (imageCol && cardCol) {
          gsap.fromTo(
            imageCol,
            { y: 40, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
              clearProps: 'transform,opacity',
            }
          );

          gsap.fromTo(
            cardCol,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.3,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
              clearProps: 'transform,opacity',
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredServices]);

  // Get translated service title
  const getServiceTitle = (service) => {
    if (service.translationKey) {
      return t(service.translationKey) || service.title;
    }
    return service.title;
  };

  // Get translated service description
  const getServiceDesc = (service) => {
    if (service.descTranslationKey) {
      return t(service.descTranslationKey) || service.fullDesc || service.shortDesc;
    }
    return service.fullDesc || service.shortDesc;
  };

  // ✅ Helper to get the current locale from pathname (fallback)
  const getCurrentLocale = () => {
    if (locale) return locale;
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0 && ['en', 'es', 'it', 'de'].includes(segments[0])) {
        return segments[0];
      }
    }
    return 'en';
  };

  const currentLocale = getCurrentLocale();

  return (
    <section ref={sectionRef} id="services" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="services-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
              <span className="text-blue-600 font-black">//</span>
              <span>{t('services.badge')}</span>
            </div>

            <h2 className="services-header-item text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {t('services.heading')}
            </h2>

            <p className="services-header-item text-slate-600 text-base leading-relaxed">
              {t('services.subheading')}
            </p>
          </div>

          <div className="services-header-item flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm px-6 py-3 rounded-full shadow-md shadow-blue-600/20 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation"
            >
              <span>{t('services.requestProposal')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="services-header-item flex flex-wrap items-center gap-2 mb-16 pb-4 border-b border-slate-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {t('services.allServices')} ({servicesList.length})
          </button>

          <button
            onClick={() => setSelectedCategory('specialization')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
              selectedCategory === 'specialization'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{t('services.specializationsTab')}</span>
          </button>

          <button
            onClick={() => setSelectedCategory('marketing')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedCategory === 'marketing'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {t('services.digitalMarketingTab')}
          </button>

          <button
            onClick={() => setSelectedCategory('creative')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
              selectedCategory === 'creative'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {t('services.creativeDesignTab')}
          </button>
        </div>

        {/* Services Showcase List */}
        <div className="space-y-16 lg:space-y-20">
          {filteredServices.map((service, index) => {
            const isEven = index % 2 === 0;
            const stepNumber = String(index + 1).padStart(2, '0');
            
            // ✅ Get image path with fallback
            const imagePath = getServiceImage(service);
            
            // ✅ Check if image has errored
            const hasError = imageErrors[service.id];

            const serviceTitle = getServiceTitle(service);
            const serviceDesc = getServiceDesc(service);
            const categoryLabel = getCategoryLabel(service.category);

            // ✅ Build the correct href with locale
            const serviceHref = `/${currentLocale}/services/${service.id}`;

            return (
              <div 
                key={service.id || index} 
                className={`service-row-item flex flex-col lg:flex-row items-center justify-between gap-0 relative bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden lg:bg-transparent lg:shadow-none lg:border-none lg:overflow-visible ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Compact Image Column */}
                <div className="service-image-col w-full lg:w-[40%] shrink-0 relative z-10">
                  <div className="relative aspect-[4/3] sm:aspect-[1.1/1] rounded-none lg:rounded-[2.2rem] overflow-hidden shadow-none lg:shadow-lg border-none lg:border lg:border-slate-200/80 bg-slate-100">
                    {!hasError ? (
                      <Image 
                        src={imagePath}
                        alt={serviceTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px"
                        quality={80}
                        priority={index < 2}
                        className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                        onError={() => handleImageError(service.id)}
                      />
                    ) : (
                      // ✅ Fallback placeholder when image fails to load
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            {iconMap[service.iconName] || <Sparkles className="w-8 h-8" />}
                          </div>
                          <p className="mt-3 text-sm font-semibold text-slate-600">{serviceTitle}</p>
                          <p className="text-xs text-slate-400">Image coming soon</p>
                        </div>
                      </div>
                    )}

                    {/* Top Stat Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-100 flex items-center gap-2 z-20">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        {iconMap[service.iconName] || <Users className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 leading-none">
                          {service.statTopValue || '45+'}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                          {service.statTopLabel || t('services.projects') || 'PROJECTS'}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Stat Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-100 flex items-center gap-2 z-20">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 leading-none">
                          {service.statBottomValue || '3x'}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                          {service.statBottomLabel || t('services.growth') || 'GROWTH'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dominant Overlapping Content Card */}
                <div 
                  className={`service-card-col w-full lg:w-[68%] relative z-20 mt-0 ${
                    isEven ? 'lg:-ml-12' : 'lg:-mr-12'
                  }`}
                >
                  <div className="bg-transparent lg:bg-white rounded-none lg:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-none lg:shadow-xl border-none lg:border lg:border-slate-200/80 space-y-6">
                    
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-extrabold uppercase tracking-wider">
                        <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md font-black">
                          {stepNumber}
                        </span>
                        <span>{categoryLabel}</span>
                      </div>

                      {service.isSpecialization && (
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>{t('services.specializationBadge')}</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {serviceTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {serviceDesc}
                    </p>

                    {/* Deliverables Grid */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {service.deliverables.slice(0, 4).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Platforms */}
                    {service.platforms && service.platforms.length > 0 && (
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1">
                          {t('services.platforms')}:
                        </span>
                        {service.platforms.map((plat, pIdx) => (
                          <span key={pIdx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                            {plat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <Link
                        href={serviceHref}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center sm:justify-start gap-1.5 transition-colors duration-200 group"
                      >
                        <span>{t('services.learnMore')}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>

                      <button
                        onClick={() => onOpenQuoteModal && onOpenQuoteModal(service.title)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-blue-600/20 transition-all duration-300 touch-manipulation"
                      >
                        <span>{t('services.inquireNow')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}