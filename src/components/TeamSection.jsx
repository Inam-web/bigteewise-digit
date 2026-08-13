'use client';

import React, { useEffect, useRef } from 'react';
import { TEAM_MEMBERS } from '@/app/Data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const TeamSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs sm:text-sm font-bold tracking-wide uppercase mb-4">
            <span className="text-blue-600 font-extrabold">//</span>
            <span>Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Meet Our <span className="text-blue-600">Expert Team</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-3 max-w-2xl mx-auto">
            The creative strategists, book marketing experts, and designers behind BigTeeWise Digital.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TEAM_MEMBERS?.map((member, index) => (
            <div
              key={member.id || member.name}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mt-1 mb-3">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};