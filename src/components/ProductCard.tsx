import React, { useState } from 'react';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import { Product, CurrencyCode } from '../types';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  currencyRate: number;
  onSelectProduct: (product: Product, initialColorId?: string) => void;
  onQuickAdd: (product: Product, colorId: string) => void;
  rankBadge?: string;
  isArabic: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  currencyRate,
  onSelectProduct,
  onQuickAdd,
  rankBadge,
  isArabic
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickAddedFeedback, setQuickAddedFeedback] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentImages = activeColor?.images || [];
  const displayImage = isHovered && currentImages.length > 1 ? currentImages[1] : currentImages[0];

  const formatPrice = (amount: number) => {
    const converted = amount * currencyRate;
    if (currency === 'EGP') {
      return `LE ${amount.toFixed(2)}`;
    }
    if (currency === 'USD') {
      return `$${converted.toFixed(2)}`;
    }
    if (currency === 'SAR') {
      return `${converted.toFixed(2)} SAR`;
    }
    return `${converted.toFixed(2)} AED`;
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, activeColor.id);
    setQuickAddedFeedback(true);
    setTimeout(() => setQuickAddedFeedback(false), 1200);
  };

  return (
    <div
      className="group flex flex-col bg-white overflow-hidden text-neutral-900 transition-all duration-200 select-none cursor-pointer"
      onClick={() => onSelectProduct(product, activeColor.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area with Badges & Floating Quick Add */}
      <div className="relative aspect-[3/4] w-full bg-neutral-100 overflow-hidden rounded-lg sm:rounded-xl">
        <img
          src={displayImage}
          alt={`${product.name} - ${activeColor.name}`}
          className="w-full h-full object-cover object-top product-card-img transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Left Badges (Red Discount Pill and/or Custom Written Badge) */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="bg-red-600 text-white text-[9px] sm:text-[10px] font-black tracking-wider px-1.5 py-0.5 uppercase shadow-xs">
              {product.discountPercent}% OFF
            </span>
          ) : null}
          {product.badge ? (
            <span className="bg-neutral-900 text-white text-[9px] sm:text-[10px] font-bold tracking-wider px-1.5 py-0.5 shadow-xs">
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Top Right: Rank Badge (e.g. #1, #2) or Wishlist */}
        <div className="absolute top-2 right-2 z-10 flex items-center space-x-1.5">
          {rankBadge && (
            <span className="bg-neutral-950 text-white text-[10px] font-black px-2 py-0.5 shadow-sm font-mono">
              {rankBadge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            aria-label="Wishlist"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs flex items-center justify-center text-neutral-700 hover:text-red-600 transition shadow-xs"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`}
            />
          </button>
        </div>

        {/* Floating Quick Add Button (Bottom Right) */}
        <button
          onClick={handleQuickAddClick}
          aria-label={`Quick Add ${product.name}`}
          className={`absolute bottom-2.5 right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md transform hover:scale-105 active:scale-95 cursor-pointer ${
            quickAddedFeedback
              ? 'bg-green-600 text-white'
              : 'bg-white hover:bg-neutral-900 text-neutral-900 hover:text-white'
          }`}
        >
          {quickAddedFeedback ? (
            <Check className="w-4 h-4 stroke-[2.5]" />
          ) : (
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
          )}
        </button>
      </div>

      {/* Product Information Area */}
      <div className="pt-2 pb-1.5 flex flex-col flex-grow">
        {/* Color Swatch Dots matching Mavin screenshot */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 mb-1" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => {
              const isSelected = selectedColorIndex === idx;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorIndex(idx)}
                  title={color.name}
                  aria-label={color.name}
                  className={`relative w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-150 flex items-center justify-center ${
                    isSelected ? 'ring-1.5 ring-neutral-900 ring-offset-1 scale-110' : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    border: color.borderHex ? `1px solid ${color.borderHex}` : '1px solid rgba(0,0,0,0.15)'
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Product Title */}
        <h3 className="font-extrabold text-[11px] sm:text-xs tracking-tight text-neutral-950 uppercase leading-snug break-words group-hover:text-neutral-700 transition font-heading">
          {isArabic && product.nameAr ? product.nameAr : product.name}
        </h3>

        {/* Price Display */}
        <div className="flex items-baseline space-x-1.5 rtl:space-x-reverse text-xs sm:text-sm mt-0.5">
          {product.discountedPrice < product.originalPrice ? (
            <>
              <span className="text-neutral-400 line-through font-normal text-[10px] sm:text-xs">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="font-bold text-red-600 text-xs sm:text-sm">
                {formatPrice(product.discountedPrice)}
              </span>
            </>
          ) : (
            <span className="font-bold text-neutral-950 text-xs sm:text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
