import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Layers, ShoppingBag, Eye, ExternalLink } from 'lucide-react';
import { ProductPromoBanner, CategoryTab } from '../types';

interface ProductPromoBannerCardProps {
  banner: ProductPromoBanner;
  onOpenBundleModal?: (bundleId: string) => void;
  onSelectProductById?: (productId: string) => void;
  onOpenCategory?: (category: CategoryTab) => void;
  isArabic: boolean;
  variant?: 'card-bottom' | 'modal-featured' | 'inline-banner';
}

export const ProductPromoBannerCard: React.FC<ProductPromoBannerCardProps> = ({
  banner,
  onOpenBundleModal,
  onSelectProductById,
  onOpenCategory,
  isArabic,
  variant = 'card-bottom'
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering parent card click

    if (banner.targetType === 'bundle' && banner.targetId && onOpenBundleModal) {
      onOpenBundleModal(banner.targetId);
    } else if (banner.targetType === 'product' && banner.targetId && onSelectProductById) {
      onSelectProductById(banner.targetId);
    } else if (banner.targetType === 'category' && banner.targetId && onOpenCategory) {
      onOpenCategory(banner.targetId as CategoryTab);
    } else if (banner.targetType === 'link' && banner.targetUrl) {
      window.open(banner.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // Variant 1: Compact Banner attached below/inside product card
  if (variant === 'card-bottom') {
    return (
      <div
        onClick={handleClick}
        className="mt-2 group/banner relative overflow-hidden rounded border border-neutral-200 hover:border-black bg-neutral-50 hover:bg-neutral-100 transition-all duration-200 cursor-pointer p-2 flex items-center space-x-2.5 rtl:space-x-reverse"
      >
        {/* Banner Thumbnail Image */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 overflow-hidden rounded bg-neutral-200">
          <img
            src={banner.image}
            alt={isArabic ? banner.titleAr : banner.title}
            className="w-full h-full object-cover object-top group-hover/banner:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {banner.discountBadgeAr && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[8px] font-black px-1 py-0.2 rounded-bl">
              {isArabic ? banner.discountBadgeAr : banner.discountBadge}
            </span>
          )}
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <span className="inline-flex items-center text-[9px] font-extrabold uppercase px-1 py-0.2 bg-black text-white rounded-[2px] tracking-wider">
              {banner.targetType === 'bundle' ? (
                <>
                  <Layers className="w-2.5 h-2.5 mr-0.5 rtl:ml-0.5" />
                  <span>{isArabic ? 'طقم متناسق' : 'OUTFIT'}</span>
                </>
              ) : banner.targetType === 'product' ? (
                <>
                  <Eye className="w-2.5 h-2.5 mr-0.5 rtl:ml-0.5" />
                  <span>{isArabic ? 'قطعة مكملة' : 'MATCH'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 rtl:ml-0.5" />
                  <span>{isArabic ? 'عرض خاص' : 'DISCOVER'}</span>
                </>
              )}
            </span>
            {banner.discountBadgeAr && (
              <span className="text-[9px] font-bold text-red-600">
                {isArabic ? banner.discountBadgeAr : banner.discountBadge}
              </span>
            )}
          </div>

          <h4 className="text-[11px] sm:text-xs font-bold text-neutral-900 break-words leading-tight mt-0.5 group-hover/banner:text-black transition">
            {isArabic ? banner.titleAr : banner.title}
          </h4>

          <p className="text-[10px] text-neutral-500 truncate">
            {isArabic
              ? banner.targetType === 'bundle'
                ? 'اضغط لاختيار المقاسات لكل قطعة والأطقم'
                : banner.subtitleAr || 'اضغط للعرض والتنسيق'
              : banner.targetType === 'bundle'
              ? 'Click to choose sizes & add bundle set'
              : banner.subtitle || 'Click to view matching match'}
          </p>
        </div>

        {/* Action arrow button */}
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-neutral-300 group-hover/banner:bg-black group-hover/banner:text-white flex items-center justify-center transition">
          <ArrowIcon className="w-3 h-3" />
        </div>
      </div>
    );
  }

  // Variant 2: High-impact modal banner (Complete the Look / Outfit Set builder)
  if (variant === 'modal-featured') {
    return (
      <div className="my-5 relative overflow-hidden rounded-lg border border-neutral-800 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-xl">
        <div className="relative p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Background image tint */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src={banner.image}
              alt=""
              className="w-full h-full object-cover object-top filter blur-xs"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/95 to-neutral-950/85" />
          </div>

          {/* Left / Info side */}
          <div className="relative z-10 flex items-center space-x-3.5 rtl:space-x-reverse flex-1">
            <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden flex-shrink-0 border border-neutral-700 shadow-md">
              <img
                src={banner.image}
                alt={isArabic ? banner.titleAr : banner.title}
                className="w-full h-full object-cover object-top"
              />
              {banner.discountBadgeAr && (
                <div className="absolute top-0 inset-x-0 bg-red-600 text-white text-[9px] font-black text-center py-0.5">
                  {isArabic ? banner.discountBadgeAr : banner.discountBadge}
                </div>
              )}
            </div>

            <div className="space-y-1 text-right sm:text-left rtl:sm:text-right">
              <div className="inline-flex items-center space-x-1.5 rtl:space-x-reverse">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-white text-black rounded font-heading">
                  {banner.targetType === 'bundle'
                    ? (isArabic ? 'تنسيقة الإطلالة المتكاملة' : 'COMPLETE THE LOOK BUNDLE')
                    : (isArabic ? 'قطعة مكملة للإطلالة' : 'RECOMMENDED PAIRING')}
                </span>
                {banner.discountBadgeAr && (
                  <span className="text-[10px] font-extrabold text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800">
                    {isArabic ? banner.discountBadgeAr : banner.discountBadge}
                  </span>
                )}
              </div>

              <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white font-heading">
                {isArabic ? banner.titleAr : banner.title}
              </h4>

              <p className="text-xs text-neutral-300 leading-relaxed max-w-md">
                {isArabic
                  ? banner.subtitleAr || 'احصل على التنسيق الكامل مع إمكانية اختيار المقاس واللون لكل قطعة على حدة.'
                  : banner.subtitle || 'Complete your setup with perfect matching sizes and exclusive bundle savings.'}
              </p>
            </div>
          </div>

          {/* Right / Button side */}
          <div className="relative z-10 w-full sm:w-auto flex-shrink-0">
            <button
              type="button"
              onClick={handleClick}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider transition duration-150 flex items-center justify-center space-x-2 rtl:space-x-reverse cursor-pointer shadow-md rounded"
            >
              {banner.targetType === 'bundle' ? (
                <>
                  <Layers className="w-4 h-4" />
                  <span>{isArabic ? (banner.buttonTextAr || 'تخصيص مقاسات الطقم وإضافته للحقيبة') : (banner.buttonText || 'Customize Sizes & Add Set')}</span>
                </>
              ) : banner.targetType === 'product' ? (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isArabic ? (banner.buttonTextAr || 'عرض المنتج واختيار المقاس') : (banner.buttonText || 'View Product & Sizes')}</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>{isArabic ? (banner.buttonTextAr || 'استكشف التشكيلة الآن') : (banner.buttonText || 'Explore Collection')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Variant 3: Inline horizontal full-width banner
  return (
    <div
      onClick={handleClick}
      className="my-6 relative overflow-hidden rounded-md border border-neutral-300 bg-neutral-950 text-white cursor-pointer group shadow-xl"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={banner.image}
          alt=""
          className="w-full h-full object-cover object-top opacity-35 group-hover:scale-105 transition-transform duration-700 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-red-600 text-white rounded">
              {isArabic ? (banner.badgeAr || 'عرض الأطقم والتنسيقات') : (banner.badge || 'SPECIAL OFFER')}
            </span>
            {banner.discountBadgeAr && (
              <span className="text-xs font-black text-amber-300">
                {isArabic ? banner.discountBadgeAr : banner.discountBadge}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-xl font-black uppercase tracking-tight text-white font-heading">
            {isArabic ? banner.titleAr : banner.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300">
            {isArabic ? banner.subtitleAr : banner.subtitle}
          </p>
        </div>

        <button
          type="button"
          className="px-5 py-2.5 bg-white group-hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider flex items-center space-x-2 rtl:space-x-reverse transition rounded-sm shadow"
        >
          <span>{isArabic ? (banner.buttonTextAr || 'عرض التفاصيل وتحديد المقاسات') : (banner.buttonText || 'Customize & Shop')}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
