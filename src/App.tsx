import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, CURRENCY_RATES, CATEGORIES_DATA } from './data/products';
import { OUTFIT_BUNDLES } from './data/bundles';
import { Product, CartItem, CategoryTab, CurrencyCode, FilterOptions, OutfitBundle, CustomerProfile, CustomerOrder, StoreCategory, OrderStatusType, BroadcastNotification, SitePromoPopup } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HomeStoreView } from './components/HomeStoreView';
import { CategoryCarousel } from './components/CategoryCarousel';
import { PromoBannerShowcase } from './components/PromoBannerShowcase';
import { ProductGrid } from './components/ProductGrid';
import { CategoryPage } from './components/CategoryPage';
import { BundlesSection } from './components/BundlesSection';
import { BundleModal } from './components/BundleModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { FilterDrawer } from './components/FilterDrawer';
import { SearchModal } from './components/SearchModal';
import { NotificationModal } from './components/NotificationModal';
import { MobileMenu } from './components/MobileMenu';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { BroadcastBanner } from './components/BroadcastBanner';
import { PromoPopupModal } from './components/PromoPopupModal';
import { getBroadcastNotification, getPromoPopupSettings } from './utils/storeSettings';

export default function App() {
  // Locale and Currency State - Primary default is Arabic
  const [isArabic, setIsArabic] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sotra_lang');
      if (saved) return saved === 'ar';
      return true; // Primary default is Arabic
    } catch {
      return true;
    }
  });
  const [currency, setCurrency] = useState<CurrencyCode>('EGP');

  // Customer Profile & Address Book (Persisted in localStorage)
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    try {
      const saved = localStorage.getItem('sotra_customer_profile');
      return saved
        ? JSON.parse(saved)
        : {
            name: '',
            phone: '',
            whatsapp: '',
            governorate: 'القاهرة',
            address: ''
          };
    } catch {
      return {
        name: '',
        phone: '',
        whatsapp: '',
        governorate: 'القاهرة',
        address: ''
      };
    }
  });

  // Customer Orders Record (Persisted in localStorage)
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('sotra_customer_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Categories & Dedicated Category Page View
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('all');
  const [activeCategoryView, setActiveCategoryView] = useState<CategoryTab | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    fit: [],
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'featured',
    searchQuery: '',
    onlyDiscounted: false,
    onlyInStock: false
  });

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sotra_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Promo Code State
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Modals & Drawers Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);

  // Selected Product for Detail Modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeColorId, setActiveColorId] = useState<string | undefined>(undefined);

  // Selected Bundle for Customization Modal
  const [activeBundle, setActiveBundle] = useState<OutfitBundle | null>(null);

  // Quick Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Products, Categories, and Bundles (Admin Managed & Persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sotra_products_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  const [categories, setCategories] = useState<StoreCategory[]>(() => {
    try {
      const saved = localStorage.getItem('sotra_categories_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CATEGORIES_DATA.map((c) => ({
      ...c,
      showInShopByCategory: c.id !== 'all' && c.id !== 'sets'
    }));
  });

  const [bundles, setBundles] = useState<OutfitBundle[]>(() => {
    try {
      const saved = localStorage.getItem('sotra_bundles_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return OUTFIT_BUNDLES;
  });

  // Admin Modals
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem('sotra_products_data', JSON.stringify(updatedProducts));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCategories = (updatedCategories: StoreCategory[]) => {
    setCategories(updatedCategories);
    try {
      localStorage.setItem('sotra_categories_data', JSON.stringify(updatedCategories));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveBundles = (updatedBundles: OutfitBundle[]) => {
    setBundles(updatedBundles);
    try {
      localStorage.setItem('sotra_bundles_data', JSON.stringify(updatedBundles));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetDefaults = () => {
    try {
      localStorage.removeItem('sotra_products_data');
      localStorage.removeItem('sotra_categories_data');
      localStorage.removeItem('sotra_bundles_data');
    } catch (e) {
      console.error(e);
    }
    setProducts(PRODUCTS);
    setCategories(
      CATEGORIES_DATA.map((c) => ({
        ...c,
        showInShopByCategory: c.id !== 'all' && c.id !== 'sets'
      }))
    );
    setBundles(OUTFIT_BUNDLES);
    setToastMessage(isArabic ? 'تمت استعادة البيانات الافتراضية بنجاح' : 'Default data restored');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAdminLogout = () => {
    try {
      localStorage.removeItem('sotra_admin_auth');
    } catch (e) {
      console.error(e);
    }
    setIsAdminDashboardOpen(false);
    setToastMessage(isArabic ? 'تم تسجيل الخروج من لوحة الإدارة' : 'Logged out of admin panel');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const shopByCategoryTiles = useMemo(() => {
    return categories.filter((c) => c.showInShopByCategory && c.id !== 'all' && c.id !== 'sets');
  }, [categories]);

  // Quick lookup map for products by ID
  const productsMap = useMemo(() => {
    const map: Record<string, Product> = {};
    products.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, [products]);

  // Sync Language and Direction with HTML document
  useEffect(() => {
    try {
      localStorage.setItem('sotra_lang', isArabic ? 'ar' : 'en');
      document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
      document.documentElement.lang = isArabic ? 'ar' : 'en';
    } catch (e) {
      console.error('Failed to sync language', e);
    }
  }, [isArabic]);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sotra_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cartItems]);

  // Site-wide dynamic settings (Broadcast banner & Promo popup)
  const [notificationSettings, setNotificationSettings] = useState<BroadcastNotification>(() => getBroadcastNotification());
  const [promoSettings, setPromoSettings] = useState<SitePromoPopup>(() => getPromoPopupSettings());
  const [isPromoPopupOpen, setIsPromoPopupOpen] = useState(false);

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setNotificationSettings(getBroadcastNotification());
      setPromoSettings(getPromoPopupSettings());
    };
    window.addEventListener('sotra_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('sotra_settings_updated', handleSettingsUpdate);
  }, []);

  // Show promo popup once upon entrance if enabled and not dismissed with "don't show again"
  useEffect(() => {
    try {
      const isHidden = localStorage.getItem('sotra_hide_promo_popup') === 'true';
      if (!isHidden && promoSettings.enabled) {
        const timer = setTimeout(() => {
          setIsPromoPopupOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, [promoSettings.enabled]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSaveCustomerProfile = (prof: CustomerProfile) => {
    setCustomerProfile(prof);
    try {
      localStorage.setItem('sotra_customer_profile', JSON.stringify(prof));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  };

  const handleAddCustomerOrder = (order: CustomerOrder) => {
    setCustomerOrders((prev) => {
      const updated = [order, ...prev];
      try {
        localStorage.setItem('sotra_customer_orders', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save order', e);
      }
      return updated;
    });
  };

  // Inventory lifecycle & order status handler:
  // "الغاء الطلب يرجع المخزون و اذا تم دفع الشحن ينقص من المخزون"
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatusType) => {
    let updatedProducts = [...products];

    setCustomerOrders((prevOrders) => {
      const orderIndex = prevOrders.findIndex((o) => o.orderId === orderId);
      if (orderIndex === -1) return prevOrders;

      const order = { ...prevOrders[orderIndex] };
      const isDeductingStatus = ['shipping_paid', 'courier', 'delivered'].includes(newStatus);
      const isCancelling = newStatus === 'cancelled';

      // Deduct stock if advancing to shipping_paid, courier, or delivered, and not yet deducted
      if (isDeductingStatus && !order.stockDeducted) {
        order.stockDeducted = true;
        updatedProducts = updatedProducts.map((prod) => {
          const matchingItems = order.items.filter((it) => it.productId === prod.id);
          if (matchingItems.length === 0) return prod;

          let updatedColors = [...prod.colors];
          let updatedSizes = [...prod.sizes];

          matchingItems.forEach((it) => {
            // Deduct from color sizesStock
            updatedColors = updatedColors.map((col) => {
              if (col.name !== it.colorName && col.id !== it.colorName) return col;
              const currentStock = col.sizesStock || [];
              const nextStock = currentStock.map((st) => {
                if (st.size === it.size) {
                  return { ...st, stockCount: Math.max(0, st.stockCount - it.quantity) };
                }
                return st;
              });
              return { ...col, sizesStock: nextStock };
            });

            // Deduct from product sizes
            updatedSizes = updatedSizes.map((sz) => {
              if (sz.size === it.size) {
                const nextCount = Math.max(0, sz.stockCount - it.quantity);
                return { ...sz, stockCount: nextCount, inStock: nextCount > 0 };
              }
              return sz;
            });
          });

          return { ...prod, colors: updatedColors, sizes: updatedSizes };
        });
      }

      // Return stock if cancelling and stock was deducted
      if (isCancelling && order.stockDeducted) {
        order.stockDeducted = false;
        order.cancelledAt = new Date().toISOString();
        updatedProducts = updatedProducts.map((prod) => {
          const matchingItems = order.items.filter((it) => it.productId === prod.id);
          if (matchingItems.length === 0) return prod;

          let updatedColors = [...prod.colors];
          let updatedSizes = [...prod.sizes];

          matchingItems.forEach((it) => {
            // Return to color sizesStock
            updatedColors = updatedColors.map((col) => {
              if (col.name !== it.colorName && col.id !== it.colorName) return col;
              const currentStock = col.sizesStock || [];
              const nextStock = currentStock.map((st) => {
                if (st.size === it.size) {
                  return { ...st, stockCount: st.stockCount + it.quantity };
                }
                return st;
              });
              return { ...col, sizesStock: nextStock };
            });

            // Return to product sizes
            updatedSizes = updatedSizes.map((sz) => {
              if (sz.size === it.size) {
                const nextCount = sz.stockCount + it.quantity;
                return { ...sz, stockCount: nextCount, inStock: nextCount > 0 };
              }
              return sz;
            });
          });

          return { ...prod, colors: updatedColors, sizes: updatedSizes };
        });
      }

      if (newStatus === 'delivered' && !order.deliveredAt) {
        order.deliveredAt = new Date().toISOString();
      }

      order.status = newStatus;
      const statusLabels: Record<string, string> = {
        received: 'تم استلام الطلب',
        shipping_paid: 'تأكيد دفع الشحن',
        courier: 'الطلب بشركة الشحن',
        delivered: 'تم التوصيل بنجاح',
        cancelled: 'تم الغاء الطلب'
      };
      order.statusAr = statusLabels[newStatus] || order.statusAr;

      const nextOrders = [...prevOrders];
      nextOrders[orderIndex] = order;

      try {
        localStorage.setItem('sotra_customer_orders', JSON.stringify(nextOrders));
      } catch (e) {
        console.error('Failed to save updated orders', e);
      }

      return nextOrders;
    });

    setProducts(updatedProducts);
    try {
      localStorage.setItem('sotra_products_data', JSON.stringify(updatedProducts));
    } catch (e) {
      console.error('Failed to save updated products', e);
    }
  };

  // Switch to a Dedicated Category Page
  const handleOpenCategory = (cat: CategoryTab) => {
    if (cat === 'all') {
      setActiveCategoryView(null);
      setSelectedCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveCategoryView(cat);
      setSelectedCategory(cat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filter and Sort Products Logic
  const currentCategoryToFilter = activeCategoryView || selectedCategory;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category Filter
      if (currentCategoryToFilter !== 'all' && currentCategoryToFilter !== 'sets') {
        if (currentCategoryToFilter === 'compressions') {
          if (product.category !== 'compressions' && !product.name.toLowerCase().includes('compression')) {
            return false;
          }
        } else if (currentCategoryToFilter === 'tops') {
          if (product.category !== 'tops' && product.category !== 'compressions') {
            return false;
          }
        } else if (currentCategoryToFilter === 'tanks') {
          if (product.category !== 'tanks') return false;
        } else if (currentCategoryToFilter === 'bottoms') {
          if (product.category !== 'bottoms') return false;
        } else if (currentCategoryToFilter === 'accessories') {
          if (product.category !== 'accessories') return false;
        }
      }

      // Sizes Filter
      if (filters.sizes.length > 0) {
        const hasSize = product.sizes.some(
          (s) => filters.sizes.includes(s.size) && s.inStock
        );
        if (!hasSize) return false;
      }

      // Colors Filter
      if (filters.colors.length > 0) {
        const hasColor = product.colors.some((c) =>
          filters.colors.some(
            (fc) => c.name.toLowerCase().includes(fc.toLowerCase())
          )
        );
        if (!hasColor) return false;
      }

      // Discount Filter
      if (filters.onlyDiscounted && (!product.discountPercent || product.discountPercent <= 0)) {
        return false;
      }

      // Stock Filter
      if (filters.onlyInStock) {
        const anyInStock = product.sizes.some((s) => s.inStock);
        if (!anyInStock) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q) || (product.nameAr && product.nameAr.includes(q));
        const matchesDesc = product.description.toLowerCase().includes(q) || (product.descriptionAr && product.descriptionAr.includes(q));
        const matchesCategory = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') {
        return a.discountedPrice - b.discountedPrice;
      }
      if (filters.sortBy === 'price-high') {
        return b.discountedPrice - a.discountedPrice;
      }
      if (filters.sortBy === 'discount') {
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      }
      return (a.displayOrder ?? 999) - (b.displayOrder ?? 999);
    });
  }, [products, currentCategoryToFilter, filters, searchQuery]);

  // Cart Management
  const handleAddToCart = (
    product: Product,
    colorName: string,
    colorHex: string,
    size: string,
    quantity: number,
    image: string
  ) => {
    const cartId = `${product.id}-${colorName}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          name: product.name,
          nameAr: product.nameAr || product.name,
          colorName,
          colorHex,
          size,
          price: product.discountedPrice,
          originalPrice: product.originalPrice,
          image,
          quantity,
          fit: product.fit,
          fitAr: product.fitAr || product.fit
        }
      ];
    });

    const itemName = isArabic && product.nameAr ? product.nameAr : product.name;
    showToast(isArabic ? `تمت إضافة "${itemName}" إلى الحقيبة` : `Added "${itemName}" to bag`);
  };

  // Add Complete Bundle Set to Cart
  const handleAddBundleToCart = (
    bundle: OutfitBundle,
    selections: Record<string, { colorId: string; size: string }>
  ) => {
    const included = bundle.productIds.map((id) => productsMap[id]).filter(Boolean);
    const bundleOriginalSum = included.reduce((s, p) => s + p.discountedPrice, 0) || bundle.originalPrice;
    const discountRatio = bundle.bundlePrice / bundleOriginalSum;

    included.forEach((product) => {
      const selection = selections[product.id] || {
        colorId: product.colors[0]?.id || '',
        size: product.sizes[0]?.size || 'L'
      };
      const activeColor = product.colors.find((c) => c.id === selection.colorId) || product.colors[0];
      const itemPrice = Math.round(product.discountedPrice * discountRatio);
      const cartId = `bundle-${bundle.id}-${product.id}-${activeColor.name}-${selection.size}`;

      setCartItems((prev) => {
        const existing = prev.find((item) => item.cartId === cartId);
        if (existing) {
          return prev.map((item) =>
            item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            cartId,
            productId: product.id,
            name: `${bundle.name} (${product.name})`,
            nameAr: `${bundle.nameAr} (${product.nameAr || product.name})`,
            colorName: activeColor.name,
            colorHex: activeColor.hex,
            size: selection.size,
            price: itemPrice,
            originalPrice: product.originalPrice,
            image: activeColor.images[0] || bundle.image,
            quantity: 1,
            fit: product.fit,
            fitAr: product.fitAr || product.fit
          }
        ];
      });
    });

    const bundleDisplayName = isArabic ? bundle.nameAr : bundle.name;
    showToast(isArabic ? `🎉 تم إضافة ${bundleDisplayName} بسعر العرض!` : `🎉 Added ${bundleDisplayName} set to bag!`);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product, colorId: string) => {
    const activeColor = product.colors.find((c) => c.id === colorId) || product.colors[0];
    const firstInStockSize = product.sizes.find((s) => s.inStock)?.size || 'M';
    handleAddToCart(
      product,
      activeColor.name,
      activeColor.hex,
      firstInStockSize,
      1,
      activeColor.images[0]
    );
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleApplyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

    if (clean === 'SOTRA10') {
      const discount = subtotal * 0.1;
      setPromoCode('SOTRA10');
      setDiscountAmount(discount);
      return { success: true, message: 'Code SOTRA10 applied! 10% discount added.' };
    }
    if (clean === 'EGYPT50') {
      const discount = Math.min(subtotal, 50);
      setPromoCode('EGYPT50');
      setDiscountAmount(discount);
      return { success: true, message: 'Code EGYPT50 applied! LE 50 discount added.' };
    }
    if (clean === 'WELCOME') {
      const discount = Math.min(subtotal, 100);
      setPromoCode('WELCOME');
      setDiscountAmount(discount);
      return { success: true, message: 'Code WELCOME applied! LE 100 discount added.' };
    }

    return { success: false, message: 'Invalid promo code. Try SOTRA10' };
  };

  const activeFilterCount =
    filters.sizes.length +
    filters.colors.length +
    (filters.onlyDiscounted ? 1 : 0) +
    (filters.onlyInStock ? 1 : 0);

  const resetFilters = () => {
    setFilters({
      category: 'all',
      fit: [],
      sizes: [],
      colors: [],
      minPrice: 0,
      maxPrice: 2000,
      sortBy: 'featured',
      searchQuery: '',
      onlyDiscounted: false,
      onlyInStock: false
    });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOpenBundleById = (bundleId: string) => {
    const foundBundle = OUTFIT_BUNDLES.find((b) => b.id === bundleId);
    if (foundBundle) {
      setActiveBundle(foundBundle);
    }
  };

  const handleSelectProductById = (productId: string) => {
    const prod = productsMap[productId] || PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      setActiveProduct(prod);
      setActiveColorId(undefined);
    }
  };

  // Determine active navigation tab
  const activeNavTab: 'home' | 'new' | 'best' | 'categories' | 'sets' | 'all' = 
    activeCategoryView === 'sets'
      ? 'sets'
      : activeCategoryView === 'all'
      ? 'all'
      : activeCategoryView !== null
      ? 'categories'
      : 'home';

  const handleNavigateTab = (tab: 'home' | 'new' | 'best' | 'categories' | 'sets' | 'all') => {
    if (tab === 'home') {
      setActiveCategoryView(null);
      setSelectedCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'new') {
      if (activeCategoryView !== null) {
        setActiveCategoryView(null);
      }
      setTimeout(() => {
        const el = document.getElementById('new-arrivals-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'best') {
      if (activeCategoryView !== null) {
        setActiveCategoryView(null);
      }
      setTimeout(() => {
        const el = document.getElementById('best-sellers-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'categories') {
      if (activeCategoryView !== null) {
        setActiveCategoryView(null);
      }
      setTimeout(() => {
        const el = document.getElementById('categories-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (tab === 'sets') {
      handleOpenCategory('sets');
    } else if (tab === 'all') {
      if (activeCategoryView !== null) {
        setActiveCategoryView(null);
      }
      setSelectedCategory('all');
      setTimeout(() => {
        const el = document.getElementById('all-products-catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className={`min-h-screen bg-white text-neutral-950 font-sans flex flex-col pb-16 md:pb-0 ${isArabic ? 'font-arabic' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-black text-white px-4 py-2.5 shadow-2xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 animate-in fade-in slide-in-from-top-4">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Site-wide Broadcast / Urgent Notification Banner */}
      <BroadcastBanner notification={notificationSettings} isArabic={isArabic} />

      {/* Main Header & Announcement Bar with Direct Tabs */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        currency={currency}
        onChangeCurrency={setCurrency}
        isArabic={isArabic}
        onToggleLanguage={() => setIsArabic(!isArabic)}
        onGoHome={() => {
          setActiveCategoryView(null);
          setSelectedCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeNavTab={activeNavTab}
        onNavigateTab={handleNavigateTab}
      />

      <main className="flex-1">
        {/* CONDITIONAL ROUTE: If user is on a dedicated Category or Sets page */}
        {activeCategoryView === 'sets' ? (
          <BundlesSection
            bundles={OUTFIT_BUNDLES}
            productsMap={productsMap}
            currency={currency}
            currencyRate={CURRENCY_RATES[currency]}
            onOpenBundleModal={(b) => setActiveBundle(b)}
            isArabic={isArabic}
            isStandalonePage={true}
            onBackToShop={() => {
              setActiveCategoryView(null);
              setSelectedCategory('all');
            }}
            onChangeCategory={(cat) => handleOpenCategory(cat)}
          />
        ) : activeCategoryView ? (
          <CategoryPage
            category={activeCategoryView}
            products={filteredProducts}
            currency={currency}
            currencyRate={CURRENCY_RATES[currency]}
            onSelectProduct={(product, colorId) => {
              setActiveProduct(product);
              setActiveColorId(colorId);
            }}
            onQuickAdd={handleQuickAdd}
            onOpenFilterDrawer={() => setIsFilterOpen(true)}
            activeFilterCount={activeFilterCount}
            onOpenBundleModal={handleOpenBundleById}
            onSelectProductById={handleSelectProductById}
            onBackToShop={() => {
              setActiveCategoryView(null);
              setSelectedCategory('all');
            }}
            onChangeCategory={(cat) => handleOpenCategory(cat)}
            isArabic={isArabic}
          />
        ) : (
          /* PRIMARY HOME STORE VIEW: Merged Experience with Hero, Categories, New Arrivals, Best Sellers, Style 2x2, Full Catalog Grid, and Outfit Sets */
          <HomeStoreView
            products={products}
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              if (cat === 'sets') {
                handleOpenCategory('sets');
              } else {
                setSelectedCategory(cat);
              }
            }}
            bundles={bundles}
            productsMap={productsMap}
            currency={currency}
            currencyRate={CURRENCY_RATES[currency]}
            onSelectProduct={(product, colorId) => {
              setActiveProduct(product);
              setActiveColorId(colorId);
            }}
            onQuickAdd={handleQuickAdd}
            onOpenBundleModal={(bundle) => setActiveBundle(bundle)}
            onOpenFilterDrawer={() => setIsFilterOpen(true)}
            activeFilterCount={activeFilterCount}
            onOpenCategory={(cat) => handleOpenCategory(cat)}
            onShopAll={() => {
              setSelectedCategory('all');
              const el = document.getElementById('all-products-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onNewArrivals={() => {
              const el = document.getElementById('new-arrivals-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            categories={categories}
            shopByCategoryTiles={shopByCategoryTiles}
            isArabic={isArabic}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onAdminTrigger={() => setIsAdminLoginOpen(true)}
        isArabic={isArabic}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp isArabic={isArabic} />

      {/* Customer Profile & Saved Address / Orders Modal */}
      <CustomerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={customerProfile}
        orders={customerOrders}
        onSaveProfile={handleSaveCustomerProfile}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
        isArabic={isArabic}
      />

      {/* Bundle Customization Modal */}
      <BundleModal
        bundle={activeBundle}
        productsMap={productsMap}
        onClose={() => setActiveBundle(null)}
        onAddBundleToCart={handleAddBundleToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
        isArabic={isArabic}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProduct}
        initialColorId={activeColorId}
        allProducts={products}
        onClose={() => {
          setActiveProduct(null);
          setActiveColorId(undefined);
        }}
        onAddToCart={handleAddToCart}
        onOpenBundleModal={handleOpenBundleById}
        onSelectProductById={handleSelectProductById}
        onOpenCategory={(cat) => handleOpenCategory(cat)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
        isArabic={isArabic}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
        promoCode={promoCode}
        discountAmount={discountAmount}
        onApplyPromo={handleApplyPromo}
        isArabic={isArabic}
      />

      {/* Checkout Modal with Vodafone Cash, InstaPay, and Governorates Delivery Fees */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discountAmount={discountAmount}
        promoCode={promoCode}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
        onClearCart={() => {
          setCartItems([]);
          setDiscountAmount(0);
          setPromoCode('');
        }}
        savedProfile={customerProfile}
        onSaveProfile={handleSaveCustomerProfile}
        onAddOrder={handleAddCustomerOrder}
        isArabic={isArabic}
      />

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onChangeFilters={setFilters}
        onResetFilters={resetFilters}
        totalResults={filteredProducts.length}
        isArabic={isArabic}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        onSelectProduct={(p) => {
          setActiveProduct(p);
        }}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
        isArabic={isArabic}
      />

      {/* Drop Alerts / VIP Offers Modal */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onApplyPromoCode={(code) => {
          handleApplyPromo(code);
          setIsCartOpen(true);
        }}
        onShopNewArrivals={() => {
          handleOpenCategory('tops');
        }}
        isArabic={isArabic}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={(cat) => {
          handleOpenCategory(cat);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        currency={currency}
        onChangeCurrency={setCurrency}
        isArabic={isArabic}
        onToggleLanguage={() => setIsArabic(!isArabic)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        isArabic={isArabic}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        orders={customerOrders}
        isArabic={isArabic}
        currency={currency}
        currencyRate={CURRENCY_RATES[currency]}
      />

      {/* Promo Popup Modal on Entrance */}
      <PromoPopupModal
        popup={promoSettings}
        isOpen={isPromoPopupOpen}
        onClose={() => setIsPromoPopupOpen(false)}
        onSelectProductById={(id) => {
          const found = products.find((p) => p.id === id);
          if (found) setActiveProduct(found);
        }}
        onOpenCategory={(cat) => handleOpenCategory(cat)}
        isArabic={isArabic}
      />

      {/* Admin Login Modal (Triggered by 10 clicks on SOTRA logo in footer) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
        }}
        isArabic={isArabic}
      />

      {/* Admin Management Dashboard */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleAdminLogout}
        products={products}
        onSaveProducts={handleSaveProducts}
        categories={categories}
        onSaveCategories={handleSaveCategories}
        bundles={bundles}
        onSaveBundles={handleSaveBundles}
        orders={customerOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onResetDefaults={handleResetDefaults}
        isArabic={isArabic}
      />
    </div>
  );
}
