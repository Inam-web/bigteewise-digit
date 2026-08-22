'use client';

import React from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function MarqueeStrip() {
  const { t } = useLanguage();

  // Get marquee items from translations
  const marqueeItemsData = t('marquee.items');

  // Check if we have valid data, fallback to default if not
  const HIGHLIGHTS = Array.isArray(marqueeItemsData) && marqueeItemsData.length > 0
    ? marqueeItemsData
    : [
        { index: '01', title: 'Top Ranked', subtitle: 'Amazon Bestseller Strategy' },
        { index: '02', title: 'Five Star', subtitle: 'Client Rated Agency' },
        { index: '03', title: 'Worldwide', subtitle: 'Global Author Reach' },
        { index: '04', title: '6+ Years', subtitle: 'Proven Industry Mastery' },
        { index: '05', title: 'Real Growth', subtitle: 'Measurable Campaign ROI' },
        { index: '06', title: '148+ Successes', subtitle: 'Published & Scaled Brands' },
      ];

  const marqueeItems = [...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS];

  return (
    <section className="relative w-full bg-[#030712] border-y border-slate-800/80 py-4 sm:py-5 overflow-hidden select-none">
      {/* Seamless Edge Gradient Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#030712] via-[#030712]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#030712] via-[#030712]/90 to-transparent z-20 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max items-center animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] active:[animation-play-state:paused]">
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 sm:gap-8 mx-6 sm:mx-8 group cursor-pointer shrink-0 touch-manipulation"
          >
            <div className="flex items-center gap-3.5">
              {/* Index Tag */}
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-blue-500/70 group-hover:text-blue-400 transition-colors">
                {item.index}
              </span>

              {/* Icon Container (Inline SVG) */}
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all duration-300">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              {/* Label */}
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-200 group-hover:text-white uppercase transition-colors">
                  {item.title}
                </span>
                <span className="text-[11px] font-normal text-slate-500 group-hover:text-slate-400 transition-colors">
                  {item.subtitle}
                </span>
              </div>
            </div>

            {/* Vertical Separator Line */}
            <div className="h-6 w-[1px] bg-slate-800/80 group-hover:bg-slate-700 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}