import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { SitePromoPopup, CategoryTab } from '../types';

interface PromoPopupModalProps {
  popup: SitePromoPopup;
  isOpen: boolean;
  onClose: () => void;
  onSelectProductById?: (id: string) => void;
  onOpenCategory?: (cat: CategoryTab) => void;
  isArabic: boolean;
}

export const PromoPopupModal: React.FC<PromoPopupModalProps> = ({
  popup,
  isOpen,
  onClose,
  onSelectProductById,
  onOpenCategory,
  isArabic
}) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen || !popup.enabled) return null;

  const handleDismiss = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('sotra_hide_promo_popup', 'true');
      } catch (e) {
        console.error(e);
      }
    }
    onClose();
  };

  const handleAction = () => {
    handleDismiss();
    if (popup.targetType === 'product' && popup.targetId && onSelectProductById) {
      onSelectProductById(popup.targetId);
    } else if (popup.targetType === 'category' && popup.targetId && onOpenCategory) {
      onOpenCategory(popup.targetId as CategoryTab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden border border-neutral-200">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Promo Image */}
        {popup.imageUrl && (
          <div
            onClick={handleAction}
            className="relative w-full h-64 sm:h-72 bg-neutral-900 cursor-pointer overflow-hidden group"
          >
            <img
              src={popup.imageUrl}
              alt={popup.titleEn || popup.titleAr}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="inline-flex items-center space-x-1 rtl:space-x-reverse text-[10px] font-black tracking-widest uppercase bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isArabic ? 'عرض خاص ومميز' : 'SPECIAL OFFER'}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase font-heading leading-tight drop-shadow">
                {isArabic && popup.titleAr ? popup.titleAr : popup.titleEn}
              </h3>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {(popup.subtitleAr || popup.subtitleEn) && (
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {isArabic && popup.subtitleAr ? popup.subtitleAr : popup.subtitleEn}
            </p>
          )}

          {/* Action CTA button */}
          <button
            onClick={handleAction}
            className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-widest transition flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer shadow-md rounded"
          >
            <span>
              {isArabic
                ? popup.buttonTextAr || 'تسوق الآن'
                : popup.buttonTextEn || 'SHOP NOW'}
            </span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          {/* Don't show again checkbox */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3.5 h-3.5 accent-black rounded cursor-pointer"
              />
              <span className="hover:text-black">
                {isArabic ? 'لا تظهر هذه الرسالة مرة أخرى' : "Don't show this again"}
              </span>
            </label>

            <button
              onClick={handleDismiss}
              className="text-neutral-400 hover:text-black font-semibold text-[11px] cursor-pointer"
            >
              {isArabic ? 'إغلاق' : 'Dismiss'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
