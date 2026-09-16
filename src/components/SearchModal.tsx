import React, { useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Product, CurrencyCode } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currency: CurrencyCode;
  currencyRate: number;
  isArabic: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct,
  currency,
  currencyRate,
  isArabic
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const popularSearches = isArabic
    ? ['كومبريشن', 'أوفرسايز', 'سويت بانتس', 'شورت قطني', 'تانك', 'أسود', 'هودي']
    : ['Compression', 'Oversized Tee', 'Sweatpants', 'Cotton Shorts', 'Tanks', 'Black', 'Hoodie'];

  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.nameAr && p.nameAr.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.descriptionAr && p.descriptionAr.toLowerCase().includes(query))
      )
    : [];

  const formatPrice = (amount: number) => {
    const converted = amount * currencyRate;
    if (currency === 'EGP') return isArabic ? `${amount.toFixed(0)} ج.م` : `LE ${amount.toFixed(2)}`;
    if (currency === 'USD') return `$${converted.toFixed(2)}`;
    if (currency === 'SAR') return `${converted.toFixed(2)} SAR`;
    return `${converted.toFixed(2)} AED`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white shadow-2xl overflow-hidden border border-neutral-200 flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center space-x-3 rtl:space-x-reverse bg-neutral-50">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              isArabic
                ? 'ابحث عن الملابس (مثال: كومبريشن، أوفرسايز، سويت بانتس، شورت)...'
                : 'Search apparel (e.g. Compression, Oversized, Sweatpants, Shorts)...'
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-semibold focus:outline-none placeholder:text-neutral-400 text-neutral-900"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 text-neutral-400 hover:text-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Popular Tags / Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!searchQuery.trim() ? (
            <div>
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{isArabic ? 'عمليات البحث الشائعة' : 'Trending Searches'}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => onSearchChange(term)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white text-neutral-800 text-xs font-medium rounded-full transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  {isArabic ? 'أحدث الملابس الأكثر طلباً' : 'Popular Drops Right Now'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-neutral-50 cursor-pointer border border-neutral-100"
                    >
                      <img
                        src={p.colors[0]?.images[0]}
                        alt={isArabic && p.nameAr ? p.nameAr : p.name}
                        className="w-12 h-14 object-cover shrink-0 bg-neutral-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold uppercase text-neutral-900 break-words leading-tight">
                          {isArabic && p.nameAr ? p.nameAr : p.name}
                        </h5>
                        <p className="text-[11px] font-semibold text-neutral-600 mt-0.5">
                          {formatPrice(p.discountedPrice)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p className="text-sm font-semibold">
                {isArabic ? `لم يتم العثور على نتائج لـ "${searchQuery}"` : `No results found for "${searchQuery}"`}
              </p>
              <p className="text-xs mt-1">
                {isArabic
                  ? 'جرب البحث عن "كومبريشن" أو "سويت بانتس" أو "شورت"'
                  : 'Try searching for "Compression", "Sweatpants", or "Shorts"'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                {isArabic ? `تم العثور على ${filteredProducts.length} نتائج` : `${filteredProducts.length} Results Found`}
              </div>
              <div className="divide-y divide-neutral-100">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center justify-between py-3 hover:bg-neutral-50 px-2 cursor-pointer transition gap-3"
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse flex-1 min-w-0">
                      <img
                        src={p.colors[0]?.images[0]}
                        alt={isArabic && p.nameAr ? p.nameAr : p.name}
                        className="w-14 h-16 object-cover bg-neutral-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold uppercase text-neutral-950 break-words leading-tight">
                          {isArabic && p.nameAr ? p.nameAr : p.name}
                        </h4>
                        <p className="text-xs font-black text-black mt-0.5">
                          {formatPrice(p.discountedPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
