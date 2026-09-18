import React, { useState } from 'react';
import { X } from 'lucide-react';
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

  if (!isOpen || !popup.enabled || !popup.imageUrl) return null;

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

  // Determine container width based on size settings
  const getMaxWidthClass = () => {
    switch (popup.size) {
      case 'sm':
        return 'max-w-[360px]';
      case 'md':
        return 'max-w-[480px]';
      case 'lg':
        return 'max-w-[620px]';
      case 'xl':
        return 'max-w-[760px]';
      case 'custom':
        return '';
      default:
        return 'max-w-[480px]';
    }
  };

  const customStyle =
    popup.size === 'custom' && popup.customWidth
      ? { maxWidth: `${Math.min(popup.customWidth, 900)}px` }
      : undefined;

  const isClickable = popup.targetType && popup.targetType !== 'none' && popup.targetId;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-300">
      <div
        className={`relative w-full ${getMaxWidthClass()} bg-transparent flex flex-col items-center animate-in zoom-in-95 duration-200`}
        style={customStyle}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-3.5 -right-3.5 rtl:-right-auto rtl:-left-3.5 z-20 w-9 h-9 rounded-full bg-black/90 hover:bg-black text-white flex items-center justify-center border-2 border-white/60 shadow-xl transition hover:scale-105 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pure Image Container - Strictly Image Only without overlay text */}
        <div
          onClick={isClickable ? handleAction : undefined}
          className={`relative w-full rounded-xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800 ${
            isClickable ? 'cursor-pointer group' : ''
          }`}
        >
          <img
            src={popup.imageUrl}
            alt="SOTRA Promotion"
            className={`w-full h-auto max-h-[82vh] object-contain mx-auto block ${
              isClickable ? 'group-hover:scale-[1.01] transition-transform duration-300' : ''
            }`}
          />
        </div>

        {/* Sleek Bottom Control (Don't show again) */}
        <div className="mt-3 flex items-center justify-between w-full px-2 py-1 text-xs text-white/90">
          <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer select-none bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm hover:bg-black/80 transition">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-3.5 h-3.5 accent-white rounded cursor-pointer"
            />
            <span className="text-[11px] font-medium text-neutral-200">
              {isArabic ? 'عدم إظهار هذه النافذة مرة أخرى' : "Don't show this again"}
            </span>
          </label>

          <button
            onClick={handleDismiss}
            className="text-[11px] text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-black/40 hover:bg-black/70 border border-white/10 transition cursor-pointer"
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

