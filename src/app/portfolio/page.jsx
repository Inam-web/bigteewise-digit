'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO } from '@/app/Data/content';
import {
  ExternalLink,
  X,
  TrendingUp,
  Tag,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================
   SAFE TEXT HELPER — prevents "Objects are not valid"
========================================================= */
const safeText = (val) => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (typeof val === 'object') {
    if (val.label && typeof val.label === 'string') return val.label;
    if (val.value && typeof val.value === 'string') return val.value;
    if (val.name && typeof val.name === 'string') return val.name;
    if (val.title && typeof val.title === 'string') return val.title;
    return '';
  }
  return '';
};

export default function PortfolioPage({ onOpenQuoteModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const projectRefs = useRef([]);
  const modalContentRef = useRef(null);

  const categories = [
    'All',
    'Book Covers',
    'Author Branding',
    'Book Marketing',
    'Social Media Designs',
    'Branding',
    'Digital Marketing',
  ];

  const filteredPortfolio = (PORTFOLIO || []).filter((item) => {
    if (activeCategory === 'All') return true;
    const itemCategory = safeText(item.category);
    return itemCategory === activeCategory;
  });

  const openModal = (item) => {
    setActiveProjectModal(item);
    setCurrentGalleryIdx(0);
  };

  const closeModal = () => {
    setActiveProjectModal(null);
    setCurrentGalleryIdx(0);
  };

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeProjectModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProjectModal]);

  /* =======================================================
     GSAP — HEADER & FILTER ENTRANCE
  ======================================================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.portfolio-filter-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     GSAP — PROJECT ROWS REVEAL
  ======================================================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      projectRefs.current.forEach((row) => {
        if (!row) return;

        const imageWrap = row.querySelector('.project-image-wrap');
        const imageInner = row.querySelector('.project-image-inner');
        const content = row.querySelector('.project-content');
        const divider = row.querySelector('.project-divider');
        const number = row.querySelector('.project-number');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none none',
          },
        });

        if (divider) {
          tl.fromTo(
            divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: 'power3.inOut' },
            0
          );
        }

        if (number) {
          tl.fromTo(
            number,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.1
          );
        }

        tl.fromTo(
          imageWrap,
          { y: 60, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          0.15
        );

        if (imageInner) {
          tl.fromTo(
            imageInner,
            { scale: 1.1 },
            { scale: 1, duration: 1.4, ease: 'power2.out' },
            0.15
          );
        }

        if (content) {
          tl.fromTo(
            content.children,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: 'power3.out',
            },
            0.35
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredPortfolio]);

  /* =======================================================
     GSAP — MODAL ENTRANCE
  ======================================================= */
  useEffect(() => {
    if (activeProjectModal && modalContentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          modalContentRef.current,
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }, modalContentRef);
      return () => ctx.revert();
    }
  }, [activeProjectModal]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-white overflow-hidden"
    >
      {/* Subtle ambient background texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-8">
        
        {/* Editorial Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20 lg:mb-24 space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <span className="font-extrabold text-blue-600">//</span>
            <span>Selected Works</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 tracking-tight leading-[0.95]">
            Projects that <br className="hidden sm:block" />
            <span className="text-blue-600">define</span> our craft.
          </h2>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
            A curated journey through book marketing campaigns, author brand identities, and digital experiences built to convert.
          </p>
        </div>

        {/* Minimal Filter Bar */}
        <div ref={filterRef} className="flex flex-wrap items-center gap-2 mb-16 sm:mb-20 lg:mb-24 border-b border-slate-200 pb-6">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mr-3 hidden sm:block">
            Filter
          </span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`portfolio-filter-btn px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 ${
                activeCategory === category
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Editorial Projects List */}
        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          {filteredPortfolio.length > 0 ? (
            filteredPortfolio.map((project, index) => {
              const isEven = index % 2 === 0;
              const stepNumber = String(index + 1).padStart(2, '0');
              const aspectClass = isEven ? 'aspect-[4/3]' : 'aspect-[16/10]';

              // Safely extract text from potentially object-based data
              const projectTitle = safeText(project.title);
              const projectClient = safeText(project.client);
              const projectCategory = safeText(project.category);
              const projectDesc = safeText(project.description);
              const projectResults = safeText(project.results);
              const projectLink = typeof project.link === 'string' ? project.link : '';
              const projectImage = typeof project.image === 'string' ? project.image : '';
              const projectTags = Array.isArray(project.tags)
                ? project.tags.map(safeText).filter(Boolean)
                : [];
              const projectFeatures = Array.isArray(project.features)
                ? project.features.map(safeText).filter(Boolean)
                : [];
              const galleryImages = [
                projectImage,
                ...(Array.isArray(project.additionalImages)
                  ? project.additionalImages.filter((img) => typeof img === 'string')
                  : []),
              ].filter(Boolean);

              return (
                <article
                  key={project.id || index}
                  ref={(el) => (projectRefs.current[index] = el)}
                  className="relative"
                >
                  {/* Top Divider */}
                  <div className="project-divider origin-left h-px bg-slate-200 mb-12 sm:mb-16 lg:mb-20" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-center">
                    
                    {/* Number Watermark — Desktop */}
                    <div className="project-number absolute -top-6 sm:-top-10 left-0 lg:left-auto lg:right-0 text-[6rem] sm:text-[8rem] lg:text-[10rem] font-black text-slate-100 leading-none select-none pointer-events-none z-0 opacity-60">
                      {stepNumber}
                    </div>

                    {/* Image Column */}
                    <div
                      className={`relative z-10 lg:col-span-7 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div
                        className="project-image-wrap relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 cursor-pointer group shadow-lg shadow-slate-200/50"
                        onClick={() => openModal(project)}
                      >
                        <div className={`project-image-inner relative w-full ${aspectClass}`}>
                          {projectImage && (
                            <img
                              src={projectImage}
                              alt={projectTitle}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          )}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-500 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                            <span className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm px-6 py-3 rounded-full shadow-xl">
                              Explore Project
                              <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>

                        {/* Category Badge */}
                        {projectCategory && (
                          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                            <span className="inline-block bg-white/95 backdrop-blur-md text-slate-900 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm border border-white/20">
                              {projectCategory}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`project-content relative z-10 lg:col-span-5 ${
                        isEven
                          ? 'lg:order-2 lg:pl-4 xl:pl-8'
                          : 'lg:order-1 lg:pr-4 xl:pr-8'
                      }`}
                    >
                      {/* Mobile Number */}
                      <div className="lg:hidden text-[4rem] font-black text-slate-100 leading-none mb-2">
                        {stepNumber}
                      </div>

                      {projectClient && (
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
                          {projectClient}
                        </p>
                      )}

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight">
                        {projectTitle}
                      </h3>

                      <p className="mt-4 sm:mt-6 text-slate-500 text-sm sm:text-base leading-relaxed">
                        {projectDesc || 'A comprehensive creative solution designed to elevate brand presence and drive measurable audience engagement.'}
                      </p>

                      {/* Tags */}
                      {projectTags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {projectTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider"
                            >
                              <span className="w-1 h-1 rounded-full bg-blue-500" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => openModal(project)}
                          className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 transition-all duration-300 active:scale-95"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>

                        {projectLink && (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors duration-200"
                          >
                            <span>Live Preview</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Results Teaser */}
                      {projectResults && (
                        <div className="mt-8 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider text-blue-800">
                              Key Result
                            </p>
                            <p className="text-sm font-semibold text-blue-900 mt-0.5">
                              {projectResults}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="text-center py-24 border border-dashed border-slate-300 rounded-3xl">
              <p className="text-slate-400 font-semibold text-lg">
                No projects found in this category.
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="mt-4 text-blue-600 font-bold text-sm hover:underline"
              >
                View all projects
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 sm:mt-32 lg:mt-40 pt-16 border-t border-slate-200">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Let's craft something exceptional together. Our team is ready to build your next high-converting campaign.
            </p>
            <button
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-4 rounded-full shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 active:scale-95"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          PREMIUM PROJECT MODAL
      ===================================================== */}
      {activeProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={closeModal}
        >
          <div
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 relative my-auto overflow-hidden"
          >
            {/* Modal Hero Image */}
            <div className="relative h-56 sm:h-80 md:h-96 w-full bg-slate-900 overflow-hidden">
              {(() => {
                const modalTitle = safeText(activeProjectModal.title);
                const modalClient = safeText(activeProjectModal.client);
                const modalCategory = safeText(activeProjectModal.category);
                const modalImages = [
                  typeof activeProjectModal.image === 'string' ? activeProjectModal.image : '',
                  ...(Array.isArray(activeProjectModal.additionalImages)
                    ? activeProjectModal.additionalImages.filter((img) => typeof img === 'string')
                    : []),
                ].filter(Boolean);
                const activeImg = modalImages[currentGalleryIdx] || modalImages[0] || '';

                return (
                  <>
                    {activeImg && (
                      <img
                        src={activeImg}
                        alt={modalTitle}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Close */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-lg transition-all active:scale-95 z-20"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Category */}
                    {modalCategory && (
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                        <span className="inline-block bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                          {modalCategory}
                        </span>
                      </div>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 right-8">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight drop-shadow-sm">
                        {modalTitle}
                      </h3>
                      {modalClient && (
                        <p className="mt-1 text-sm text-blue-200 font-semibold">
                          {modalClient}
                        </p>
                      )}
                    </div>

                    {/* Gallery Nav */}
                    {modalImages.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentGalleryIdx((prev) =>
                              prev === 0 ? modalImages.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-sm transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentGalleryIdx((prev) =>
                              prev === modalImages.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-sm transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {modalImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentGalleryIdx(idx)}
                              className={`h-2 rounded-full transition-all ${
                                currentGalleryIdx === idx
                                  ? 'w-8 bg-white'
                                  : 'w-2 bg-white/50 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
              {(() => {
                const modalDesc = safeText(activeProjectModal.description);
                const modalResults = safeText(activeProjectModal.results);
                const modalLink = typeof activeProjectModal.link === 'string' ? activeProjectModal.link : '';
                const modalFeatures = Array.isArray(activeProjectModal.features)
                  ? activeProjectModal.features.map(safeText).filter(Boolean)
                  : [];
                const modalTags = Array.isArray(activeProjectModal.tags)
                  ? activeProjectModal.tags.map(safeText).filter(Boolean)
                  : [];

                return (
                  <>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {modalDesc || 'Comprehensive creative design and digital media solution tailored to elevate brand visibility and audience engagement.'}
                    </p>

                    {modalFeatures.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          Key Deliverables
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {modalFeatures.map((feat, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {modalResults && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-blue-800">
                            Impact & Results
                          </h4>
                          <p className="text-sm sm:text-base font-bold text-blue-900 mt-0.5">
                            {modalResults}
                          </p>
                        </div>
                      </div>
                    )}

                    {modalTags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <Tag className="w-4 h-4 text-slate-400" />
                        {modalTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                      {modalLink && (
                        <a
                          href={modalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-slate-50 transition-all"
                        >
                          <span>View Live Project</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          closeModal();
                          if (onOpenQuoteModal) onOpenQuoteModal();
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg transition-all active:scale-95"
                      >
                        <span>Request Similar Work</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}