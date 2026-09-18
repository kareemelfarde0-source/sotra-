import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, LayoutGrid, Grid2X2, Square, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Product, CategoryTab, CurrencyCode } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: CategoryTab;
  onSelectCategory: (category: CategoryTab) => void;
  currency: CurrencyCode;
  currencyRate: number;
  onSelectProduct: (product: Product, initialColorId?: string) => void;
  onQuickAdd: (product: Product, colorId: string) => void;
  onOpenFilterDrawer: () => void;
  activeFilterCount: number;
  onOpenBundleModal?: (bundleId: string) => void;
  onSelectProductById?: (productId: string) => void;
  isArabic: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  currency,
  currencyRate,
  onSelectProduct,
  onQuickAdd,
  onOpenFilterDrawer,
  activeFilterCount,
  onOpenBundleModal,
  onSelectProductById,
  isArabic
}) => {
  // Grid column layout: '1' (single column on mobile), '2' (standard 2-col on mobile), '3' (3-col)
  const [gridLayout, setGridLayout] = useState<'1' | '2' | '3'>('2');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Reset to page 1 whenever category or filtered product count changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, products.length]);

  // Dedicated categories list (without sets, which has its own special section)
  const categories: { id: CategoryTab; label: string; labelAr: string }[] = [
    { id: 'all', label: 'View All', labelAr: 'عرض الكل' },
    { id: 'tops', label: 'Tops', labelAr: 'توبات' },
    { id: 'compressions', label: 'Compressions', labelAr: 'ملابس ضاغطة' },
    { id: 'tanks', label: 'Tanks', labelAr: 'ملابس كت وتانك' },
    { id: 'bottoms', label: 'Bottoms', labelAr: 'بناطيل وشورتات' },
    { id: 'accessories', label: 'Accessories', labelAr: 'اكسسوارات' }
  ];

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const catalogEl = document.getElementById('products-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGoToBundles = () => {
    const el = document.getElementById('bundles-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products-catalog" className="w-full bg-white py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Headline: منتجاتنا */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-neutral-950 uppercase font-heading">
              {isArabic ? 'منتجاتنا' : 'OUR PRODUCTS'}
            </h2>
          </div>

          {/* Quick link to the standalone Sets & Bundles section */}
          <button
            type="button"
            onClick={handleGoToBundles}
            className="self-start sm:self-auto inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white text-neutral-900 rounded-md text-xs font-black uppercase tracking-wider transition cursor-pointer border border-neutral-300 shadow-xs"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-700 hover:text-white" />
            <span>{isArabic ? 'قسم الأطقم والتنسيقات الخاصة' : 'Outfit Sets & Bundles Section'}</span>
          </button>
        </div>

        {/* Category Horizontal Filter Tabs (Product categories only) */}
        <div className="flex items-center space-x-5 overflow-x-auto pb-3 pt-1 border-b border-neutral-200 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs sm:text-sm whitespace-nowrap font-bold tracking-tight pb-1.5 transition-colors duration-150 cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-black border-black font-extrabold'
                    : 'text-neutral-500 border-transparent hover:text-neutral-800'
                }`}
              >
                {isArabic ? cat.labelAr : cat.label}
              </button>
            );
          })}
        </div>

        {/* Grid Toolbar: View Switchers, Products Count, Filter & Sort Button */}
        <div className="flex items-center justify-between py-4 border-b border-neutral-100 text-xs sm:text-sm text-neutral-600 mb-6">
          {/* Left: Grid Layout Switchers */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setGridLayout('1')}
              aria-label="Single column view"
              className={`p-1.5 rounded transition ${
                gridLayout === '1' ? 'text-black bg-neutral-100' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <Square className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => setGridLayout('2')}
              aria-label="2 columns view"
              className={`p-1.5 rounded transition ${
                gridLayout === '2' ? 'text-black bg-neutral-100' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <Grid2X2 className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => setGridLayout('3')}
              aria-label="3 columns compact view"
              className={`p-1.5 rounded transition ${
                gridLayout === '3' ? 'text-black bg-neutral-100' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          {/* Middle: Total products count & pagination status */}
          <div className="text-xs font-semibold text-neutral-500">
            {products.length > 0 ? (
              isArabic
                ? `عرض ${startIndex + 1} - ${Math.min(startIndex + ITEMS_PER_PAGE, products.length)} من أصل ${products.length} منتج`
                : `Showing ${startIndex + 1}-${Math.min(startIndex + ITEMS_PER_PAGE, products.length)} of ${products.length} products`
            ) : (
              isArabic ? '0 منتج' : '0 products'
            )}
          </div>

          {/* Right: Filter & Sort Button with badge if active */}
          <button
            onClick={onOpenFilterDrawer}
            className="flex items-center space-x-1.5 font-bold text-neutral-900 hover:text-black py-1 px-2.5 rounded-sm hover:bg-neutral-100 transition cursor-pointer"
          >
            <span>{isArabic ? 'تصفية وترتيب' : 'Filter & Sort'}</span>
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2]" />
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Product Cards Grid (8 products per page) */}
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              {isArabic ? 'لم يتم العثور على منتجات مطابقة' : 'No products found'}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              {isArabic ? 'يرجى تجربة فلتر آخر أو إعادة ضبط البحث' : 'Try adjusting your filters or search terms.'}
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider"
            >
              {isArabic ? 'عرض كل المنتجات' : 'View All Products'}
            </button>
          </div>
        ) : (
          <>
            <div
              className={`grid gap-x-3 sm:gap-x-5 gap-y-8 sm:gap-y-10 ${
                gridLayout === '1'
                  ? 'grid-cols-1 max-w-lg mx-auto'
                  : gridLayout === '2'
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
              }`}
            >
              {paginatedProducts.map((product) => (
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

            {/* Number of Pages & Pagination Controls (8 products per page) */}
            {totalPages > 1 && (
              <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-600 font-bold">
                  {isArabic
                    ? `الصفحة ${currentPage} من ${totalPages}`
                    : `Page ${currentPage} of ${totalPages}`}
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-xs font-black uppercase rounded border border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white hover:border-black transition flex items-center space-x-1 rtl:space-x-reverse cursor-pointer bg-white"
                  >
                    {isArabic ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                    <span>{isArabic ? 'السابق' : 'Previous'}</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-9 h-9 text-xs font-black rounded transition cursor-pointer flex items-center justify-center ${
                            isActive
                              ? 'bg-black text-white shadow-sm'
                              : 'bg-neutral-50 border border-neutral-200 text-neutral-800 hover:bg-neutral-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-xs font-black uppercase rounded border border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black hover:text-white hover:border-black transition flex items-center space-x-1 rtl:space-x-reverse cursor-pointer bg-white"
                  >
                    <span>{isArabic ? 'التالي' : 'Next'}</span>
                    {isArabic ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
