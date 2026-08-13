'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, ArrowRight, X, User, Tag, BookOpen, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/app/Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hide navbar and lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      const header = document.querySelector('header');
      if (header) header.style.display = 'none';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    return () => {
      const header = document.querySelector('header');
      if (header) header.style.display = '';
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [selectedPost]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedPost) setSelectedPost(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPost]);

  const handleCloseModal = () => setSelectedPost(null);

  // Get first 3 posts only for 3-column layout
  const displayPosts = blogPosts?.slice(0, 3) || [];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-slate-50 text-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <span className="font-extrabold text-blue-600">//</span>
            <span>News & Insights</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Expert Insights on <span className="text-blue-600">Marketing & Design</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Actionable strategies on book marketing, Amazon optimization, author branding, and creative design trends that drive real results.
          </p>
        </div>

        {/* 3-Column Grid - All cards equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayPosts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {post.readTime}
                  </span>
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
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider border border-slate-200/50">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 line-clamp-1">{post.author}</span>
                  </div>
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all duration-300">
                    Read <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
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
            <div className="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-3xl bg-slate-100 shrink-0">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-5 left-5 sm:left-7 right-5 sm:right-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider mb-2 shadow-lg">
                  <BookOpen className="w-3 h-3" />
                  {selectedPost.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-sm line-clamp-2">
                  {selectedPost.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{selectedPost.author}</p>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Author</p>
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
                </div>
              </div>

              <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {selectedPost.content || selectedPost.snippet}
                </p>
              </div>

              {selectedPost.tags && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Tags:</span>
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Want to implement these strategies? Let's discuss your project.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 shrink-0"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}