'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Clock, ArrowRight, X, User, Tag, BookOpen, ChevronRight, Sparkles, Eye, TrendingUp, BookMarked } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function BlogSection() {
  const { t, locale } = useLanguage();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const blogPostsData = t('blog.posts');
  
  const defaultPosts = [
    {
      id: 1,
      title: "7 Proven Steps to Hit Amazon #1 Bestseller in 2025/2026",
      snippet: "Discover how top authors combine KDP category selection, pre-order buzz, and targeted Meta ads to dominate Amazon launch week.",
      image: "https://images.pexels.com/photos/4050301/pexels-photo-4050301.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Book Marketing",
      date: "June 15, 2025",
      readTime: "6 min read",
      author: "BigTeeWise Team",
      tags: ["Amazon KDP", "Bestseller", "Marketing"],
    },
    {
      id: 2,
      title: "Why High-Impact 3D Book Mockups Double Your Ad Click-Through Rate",
      snippet: "Flat book cover images are no longer enough on crowded social feeds. Learn how photorealistic 3D assets turn casual scrollers into buyers.",
      image: "https://images.pexels.com/photos/13501804/pexels-photo-13501804.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Design",
      date: "June 10, 2025",
      readTime: "4 min read",
      author: "BigTeeWise Team",
      tags: ["3D Mockups", "Book Cover", "Conversion"],
    },
    {
      id: 3,
      title: "Building an Author Brand That Commands 5-Figure Keynotes & Bookings",
      snippet: "Your book is your premium business card. Here is how executive authors leverage personal branding to open high-paying corporate doors.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Author Branding",
      date: "June 5, 2025",
      readTime: "5 min read",
      author: "BigTeeWise Team",
      tags: ["Author Branding", "Speaking", "Authority"],
    },
  ];

  const blogPosts = Array.isArray(blogPostsData) && blogPostsData.length > 0 
    ? blogPostsData 
    : defaultPosts;

  const displayPosts = blogPosts?.slice(0, 3) || [];

  const tr = (key, fallback) => {
    try {
      const result = t(key);
      if (result === key || result === undefined || result === null) {
        return fallback;
      }
      return result;
    } catch (e) {
      return fallback;
    }
  };

  // ============================================================
  // GSAP ANIMATIONS - OPTIMIZED FOR ALL SCREENS
  // ============================================================
  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(['.blog-header-item', '.blog-card'], {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'transform,opacity',
        });
        return;
      }

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // ✅ Device-specific durations
      const dur = isMobile ? 0.5 : (isTablet ? 0.7 : 1);
      const staggerDur = isMobile ? 0.06 : (isTablet ? 0.1 : 0.15);
      const yOffset = isMobile ? 20 : (isTablet ? 30 : 40);

      // ====== SET INITIAL STATES ======
      gsap.set('.blog-header-item', {
        y: yOffset,
        opacity: 0,
        willChange: 'transform, opacity',
      });

      gsap.set('.blog-card', {
        y: isMobile ? 30 : 60,
        opacity: 0,
        scale: isMobile ? 0.97 : 0.96,
        willChange: 'transform, opacity',
      });

      // ====== HEADER ANIMATION ======
      gsap.to('.blog-header-item', {
        y: 0,
        opacity: 1,
        duration: dur,
        stagger: staggerDur * 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: isMobile ? 'top 88%' : 'top 85%',
          once: true,
        },
      });

      // ====== CARD ANIMATIONS ======
      gsap.to('.blog-card', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: dur,
        stagger: isMobile ? 0.08 : 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 88%' : 'top 75%',
          once: true,
        },
      });

      // ====== REFRESH SCROLLTRIGGER ======
      ScrollTrigger.refresh();

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMounted]);

  // ============================================================
  // MODAL SCROLL LOCK
  // ============================================================
  useEffect(() => {
    if (selectedPost) {
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    }
    return () => {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [selectedPost]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPost) setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  const handleCloseModal = () => setSelectedPost(null);

  if (!isMounted) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white text-slate-900 overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ===== HEADER ===== */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="blog-header-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-sm">
            <span className="font-extrabold text-blue-600">//</span>
            <span>{tr('blog.badge', 'News & Insights')}</span>
            <Sparkles className="w-3 h-3 text-blue-500 ml-1" />
          </div>

          <h2 className="blog-header-item text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {tr('blog.heading', 'Expert Insights on Marketing & Design')}
            <span className="block text-blue-600 text-2xl sm:text-3xl lg:text-4xl mt-1">
              {tr('blog.headingHighlight', 'For Authors & Creators')}
            </span>
          </h2>

          <p className="blog-header-item text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {tr('blog.subheading', 'Actionable strategies on book marketing, Amazon optimization, author branding, and creative design trends that drive real results.')}
          </p>

          <div className="blog-header-item flex items-center justify-center gap-2 mt-2">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-blue-300" />
            <BookMarked className="w-4 h-4 text-blue-400" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-blue-300" />
          </div>
        </div>

        {/* ===== 3-COLUMN GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayPosts.map((post, index) => (
            <div
              key={post.id || index}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setSelectedPost(post)}
              className="blog-card group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-400/50 hover:-translate-y-3 transition-all duration-500 cursor-pointer flex flex-col h-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-blue-600/30 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3" />
                  {post.category}
                </div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/50">
                  <Clock className="w-3 h-3 text-blue-600" />
                  {post.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-3 relative z-10">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-snug line-clamp-2 min-h-[56px]">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {post.snippet}
                </p>

                {post.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold uppercase tracking-wider border border-slate-200/50 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200/50">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 line-clamp-1">{post.author}</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5 group-hover:gap-2 transition-all duration-300 group-hover:text-blue-700">
                    {tr('blog.readArticle', 'Read')} 
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-3xl" />
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <div className="blog-header-item mt-14 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-5 sm:px-7 py-2.5 sm:py-3 shadow-sm hover:shadow-md transition-all duration-300">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">
              {tr('blog.ctaBottomText', 'Want to be featured in our next article?')}
            </span>
            <button 
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm transition-colors duration-200 group"
              aria-label="Read more insights"
            >
              <span>{tr('blog.ctaBottomBtn', 'Subscribe for Updates')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md modal-overlay"
          onClick={handleCloseModal}
          data-modal-safe="true"
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            data-modal-safe="true"
          >
            {/* Modal Header Image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-3xl bg-slate-100 shrink-0">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 z-20 border border-white/30"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-5 sm:left-7 right-5 sm:right-7">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold uppercase tracking-wider mb-2.5 shadow-lg shadow-blue-600/30">
                  <BookOpen className="w-3 h-3" />
                  {selectedPost.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-lg line-clamp-2">
                  {selectedPost.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{selectedPost.author}</p>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{tr('blog.author', 'Author')}</p>
                  </div>
                </div>
                <div className="h-6 w-px bg-slate-200 hidden sm:block" />
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {selectedPost.readTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    {tr('blog.reads', '1.2K reads')}
                  </span>
                </div>
              </div>

              <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {selectedPost.content || selectedPost.snippet}
                </p>
              </div>

              {selectedPost.tags && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">{tr('blog.tags', 'Tags')}:</span>
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-slate-500 font-medium">
                    {tr('blog.ctaText', 'Want to implement these strategies? Let\'s discuss your project.')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 shrink-0"
                >
                  {tr('blog.closeArticle', 'Close Article')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}