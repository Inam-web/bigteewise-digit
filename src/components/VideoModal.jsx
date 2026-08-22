import React from 'react';
import { X, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../app/Data/content';
import { useLanguage } from '@/i18n/LanguageContext';

export const VideoModal = ({
  isOpen,
  onClose,
  onOpenQuoteModal,
}) => {
  const { t } = useLanguage();

  // Translation helper
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-800">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors z-10"
          aria-label={tr('videoModal.close', 'Close modal')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>
            BigTeeWise Digital • {tr('videoModal.agencyReel', 'Agency Reel')}
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-4">
          {tr('videoModal.title', 'Where Creativity Meets Conversion')}
        </h3>

        {/* Video Player / Showreel */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 mb-6 flex flex-col items-center justify-center p-6 text-center group">

          <img
            src="https://images.pexels.com/photos/15543037/pexels-photo-15543037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"
            alt={tr('videoModal.showreelTitle', 'Agency Showreel')}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="relative z-10 space-y-4 max-w-lg">

            {/* Play Button */}
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>

            <h4 className="text-lg font-bold text-white">
              {tr('videoModal.showreelTitle', 'BigTeeWise Digital Showreel 2025')}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              {tr('videoModal.subtitle', 'Discover how our team in the UK helps authors launch bestselling books, design award-winning covers, and scale digital brand performance.')}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] text-blue-300">
              <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                ★ {tr('videoModal.highlight1', '150+ Book Launches')}
              </span>
              <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                ★ {tr('videoModal.highlight2', 'Amazon #1 Bestsellers')}
              </span>
              <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
                ★ {tr('videoModal.highlight3', 'Full Digital Ads')}
              </span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">

          <div className="text-xs text-slate-400">
            {tr('videoModal.headquartered', 'Headquartered in')}{' '}
            <strong className="text-white">
              {BUSINESS_INFO.location}
            </strong>{' '}
            • {tr('videoModal.globalClients', 'Global Clients')}
          </div>

          {/* Strategy Session */}
          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal();
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <span>{tr('videoModal.ctaButton', 'Book Strategy Session')}</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};

export default VideoModal;