import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, SlidersHorizontal, LayoutGrid, Grid2X2, Square } from 'lucide-react';
import { CategoryTab, CurrencyCode, Product } from '../types';
import { CATEGORIES_DATA } from '../data/products';
import { ProductCard } from './ProductCard';

interface CategoryPageProps {
  category: CategoryTab;
  products: Product[];
  currency: CurrencyCode;
  currencyRate: number;
  onSelectProduct: (product: Product, initialColorId?: string) => void;
  onQuickAdd: (product: Product, colorId: string) => void;
  onOpenFilterDrawer: () => void;
  activeFilterCount: number;
  onBackToShop: () => void;
  onChangeCategory: (cat: CategoryTab) => void;
  onOpenBundleModal?: (bundleId: string) => void;
  onSelectProductById?: (productId: string) => void;
  isArabic: boolean;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  products,
  currency,
  currencyRate,
  onSelectProduct,
  onQuickAdd,
  onOpenFilterDrawer,
  activeFilterCount,
  onBackToShop,
  onChangeCategory,
  onOpenBundleModal,
  onSelectProductById,
  isArabic
}) => {
  const [gridLayout, setGridLayout] = useState<'1' | '2' | '3'>('2');

  const categoryMeta = CATEGORIES_DATA.find((c) => c.id === category) || CATEGORIES_DATA[0];

  const categoryDescriptions: Record<string, { en: string; ar: string }> = {
    tops: {
      en: 'Engineered oversized, raglan, and casual tees cut from heavy combed Egyptian cotton.',
      ar: 'تيشيرتات وتوبات أوفرسايز وراجلان من القطن المصري الفاخر 100% بقصات بارزة ومريحة للأناقة اليومية.'
    },
    compressions: {
      en: 'Second-skin muscle-shaping fitted apparel designed to provide athletic support, sculpt body definition, and maintain cool dry comfort.',
      ar: 'ملابس سليم فيت هندسية تبرز القوام بدقة فائقة مع نسيج ناعم عالي التهوية ومرونة رباعية الاتجاهات.'
    },
    tanks: {
      en: 'Deep-cut breathable and bio-cotton lifestyle tanks designed for effortless style and freedom of movement.',
      ar: 'ملابس تانك وكت كاجوال صيفية مريحة تمنحك إطلالة فريدة وحرية حركة مطلقة.'
    },
    bottoms: {
      en: 'Heavyweight French terry sweatpants and stylish 5.5" inseam shorts built for daily comfort and streetwear aesthetic.',
      ar: 'بناطيل سويت بانتس وشورتات قطن 5.5 إنش مريحة ومصممة بأحدث صيحات الستريت وير الكاجوال.'
    },
    accessories: {
      en: 'Durable travel duffle bags, cushioned socks, and daily essentials for your lifestyle wardrobe.',
      ar: 'حقائب سفر وإكسسوارات وجوارب قطنية أساسية مصممة بأعلى معايير الجودة لتناسب أناقتك اليومية.'
    },
    all: {
      en: 'Explore the complete SOTRA contemporary fashion and lifestyle collection.',
      ar: 'تصفح تشكيلة سوترة الكاملة للأزياء العصرية والستريت وير الفاخر.'
    }
  };

  const currentDesc = categoryDescriptions[category] || categoryDescriptions['all'];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative w-full bg-neutral-950 text-white py-12 sm:py-16 md:py-20 overflow-hidden border-b border-neutral-900">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={categoryMeta.image}
            alt={categoryMeta.name}
            className="w-full h-full object-cover object-top filter blur-xs"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb / Back Link */}
          <button
            onClick={onBackToShop}
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white mb-6 transition cursor-pointer"
          >
            {isArabic ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isArabic ? 'الرئيسية / جميع الأقسام' : 'Home / All Categories'}</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-red-500 block mb-2">
                {isArabic ? 'قسم مخصص' : 'DEDICATED COLLECTION'}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading">
                {isArabic ? categoryMeta.nameAr : categoryMeta.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
                {isArabic ? currentDesc.ar : currentDesc.en}
              </p>
            </div>

            <div className="shrink-0 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 text-xs font-black uppercase tracking-wider self-start md:self-auto">
              {isArabic ? `${products.length} منتج متاح` : `${products.length} ITEMS AVAILABLE`}
            </div>
          </div>
        </div>
      </div>

      {/* Category Horizontal Quick Switch Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES_DATA.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onChangeCategory(cat.id as CategoryTab)}
                  className={`text-xs sm:text-sm whitespace-nowrap font-black uppercase tracking-wider pb-1 transition-all cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-black border-black scale-105'
                      : 'text-neutral-500 border-transparent hover:text-black'
                  }`}
                >
                  {isArabic ? cat.nameAr : cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Category Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between py-3 border-b border-neutral-100 mb-6 text-xs text-neutral-600">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setGridLayout('1')}
              className={`p-1.5 rounded transition ${gridLayout === '1' ? 'text-black bg-neutral-100' : 'text-neutral-400'}`}
              aria-label="1 Column"
            >
              <Square className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridLayout('2')}
              className={`p-1.5 rounded transition ${gridLayout === '2' ? 'text-black bg-neutral-100' : 'text-neutral-400'}`}
              aria-label="2 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridLayout('3')}
              className={`hidden sm:block p-1.5 rounded transition ${gridLayout === '3' ? 'text-black bg-neutral-100' : 'text-neutral-400'}`}
              aria-label="3 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenFilterDrawer}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold uppercase tracking-wider rounded-none text-xs transition cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isArabic ? 'تصفية وترتيب' : 'Filter & Sort'}</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-black">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider">
              {isArabic ? 'لا توجد منتجات مطابقة لخيارات البحث المحددة' : 'No products found matching the criteria'}
            </p>
            <button
              onClick={onBackToShop}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              {isArabic ? 'عرض جميع المنتجات' : 'View All Products'}
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 ${
              gridLayout === '1'
                ? 'grid-cols-1 max-w-md mx-auto'
                : gridLayout === '2'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
            }`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                currencyRate={currencyRate}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isArabic={isArabic}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
