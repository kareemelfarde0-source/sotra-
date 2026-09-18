import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';
import {
  Product,
  StoreCategory,
  OutfitBundle,
  CustomerOrder,
  FooterSettings,
  SupportSettings,
  WalletSettings,
  GovernorateRate,
  BroadcastNotification,
  SitePromoPopup,
  AdminUser
} from '../types';

// Collection references
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  BUNDLES: 'bundles',
  ORDERS: 'orders',
  SETTINGS: 'storeSettings',
  ADMIN_USERS: 'adminUsers'
} as const;

// -------------------------------------------------------------
// PRODUCTS API
// -------------------------------------------------------------

export function subscribeToProducts(callback: (products: Product[]) => void) {
  const q = collection(db, COLLECTIONS.PRODUCTS);
  return onSnapshot(
    q,
    (snapshot) => {
      const products: Product[] = [];
      snapshot.forEach((docSnap) => {
        products.push({ ...(docSnap.data() as Product), id: docSnap.id });
      });
      // Sort by displayOrder or fallback
      products.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
      callback(products);
    },
    (err) => {
      console.error('Firestore subscribeToProducts error:', err);
    }
  );
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
    const products: Product[] = [];
    snap.forEach((docSnap) => {
      products.push({ ...(docSnap.data() as Product), id: docSnap.id });
    });
    products.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
    return products;
  } catch (error) {
    console.error('fetchAllProducts error:', error);
    return [];
  }
}

export async function saveProductToFirestore(product: Product): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, product.id);
  await setDoc(docRef, {
    ...product,
    updatedAt: new Date().toISOString()
  });
}

export async function saveProductsBatchToFirestore(products: Product[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const prod of products) {
      const docRef = doc(db, COLLECTIONS.PRODUCTS, prod.id);
      batch.set(docRef, {
        ...prod,
        updatedAt: new Date().toISOString()
      });
    }
    await batch.commit();
  } catch (e) {
    console.error('saveProductsBatchToFirestore error:', e);
  }
}

export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// CATEGORIES API
// -------------------------------------------------------------

export function subscribeToCategories(callback: (categories: StoreCategory[]) => void) {
  const q = collection(db, COLLECTIONS.CATEGORIES);
  return onSnapshot(
    q,
    (snapshot) => {
      const categories: StoreCategory[] = [];
      snapshot.forEach((docSnap) => {
        categories.push({ ...(docSnap.data() as StoreCategory), id: docSnap.id });
      });
      callback(categories);
    },
    (err) => {
      console.error('Firestore subscribeToCategories error:', err);
    }
  );
}

export async function fetchAllCategories(): Promise<StoreCategory[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
    const categories: StoreCategory[] = [];
    snap.forEach((docSnap) => {
      categories.push({ ...(docSnap.data() as StoreCategory), id: docSnap.id });
    });
    return categories;
  } catch (error) {
    console.error('fetchAllCategories error:', error);
    return [];
  }
}

export async function saveCategoryToFirestore(category: StoreCategory): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, category.id);
  await setDoc(docRef, {
    ...category,
    updatedAt: new Date().toISOString()
  });
}

export async function saveCategoriesBatchToFirestore(categories: StoreCategory[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const cat of categories) {
      const docRef = doc(db, COLLECTIONS.CATEGORIES, cat.id);
      batch.set(docRef, {
        ...cat,
        updatedAt: new Date().toISOString()
      });
    }
    await batch.commit();
  } catch (e) {
    console.error('saveCategoriesBatchToFirestore error:', e);
  }
}

export async function deleteCategoryFromFirestore(categoryId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// OUTFIT BUNDLES API
// -------------------------------------------------------------

export function subscribeToBundles(callback: (bundles: OutfitBundle[]) => void) {
  const q = collection(db, COLLECTIONS.BUNDLES);
  return onSnapshot(
    q,
    (snapshot) => {
      const bundles: OutfitBundle[] = [];
      snapshot.forEach((docSnap) => {
        bundles.push({ ...(docSnap.data() as OutfitBundle), id: docSnap.id });
      });
      callback(bundles);
    },
    (err) => {
      console.error('Firestore subscribeToBundles error:', err);
    }
  );
}

export async function fetchAllBundles(): Promise<OutfitBundle[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.BUNDLES));
    const bundles: OutfitBundle[] = [];
    snap.forEach((docSnap) => {
      bundles.push({ ...(docSnap.data() as OutfitBundle), id: docSnap.id });
    });
    return bundles;
  } catch (error) {
    console.error('fetchAllBundles error:', error);
    return [];
  }
}

export async function saveBundleToFirestore(bundle: OutfitBundle): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BUNDLES, bundle.id);
  await setDoc(docRef, {
    ...bundle,
    updatedAt: new Date().toISOString()
  });
}

export async function saveBundlesBatchToFirestore(bundles: OutfitBundle[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const bundle of bundles) {
      const docRef = doc(db, COLLECTIONS.BUNDLES, bundle.id);
      batch.set(docRef, {
        ...bundle,
        updatedAt: new Date().toISOString()
      });
    }
    await batch.commit();
  } catch (e) {
    console.error('saveBundlesBatchToFirestore error:', e);
  }
}

export async function deleteBundleFromFirestore(bundleId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.BUNDLES, bundleId);
  await deleteDoc(docRef);
}

// -------------------------------------------------------------
// ORDERS API
// -------------------------------------------------------------

export function subscribeToOrders(callback: (orders: CustomerOrder[]) => void) {
  const q = collection(db, COLLECTIONS.ORDERS);
  return onSnapshot(
    q,
    (snapshot) => {
      const orders: CustomerOrder[] = [];
      snapshot.forEach((docSnap) => {
        orders.push({ ...(docSnap.data() as CustomerOrder), orderId: docSnap.id });
      });
      // Sort orders descending (newest first)
      orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      callback(orders);
    },
    (err) => {
      console.error('Firestore subscribeToOrders error:', err);
    }
  );
}

export async function createOrderInFirestore(order: CustomerOrder): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, order.orderId);
  await setDoc(docRef, {
    ...order,
    createdAt: new Date().toISOString()
  });
}

export async function updateOrderInFirestore(orderId: string, updates: Partial<CustomerOrder>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

export async function deleteOrderFromFirestore(orderId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await deleteDoc(docRef);
}

export async function deleteAllOrdersFromFirestore(orderIds: string[]): Promise<void> {
  try {
    const batch = writeBatch(db);
    for (const id of orderIds) {
      const docRef = doc(db, COLLECTIONS.ORDERS, id);
      batch.delete(docRef);
    }
    await batch.commit();
  } catch (e) {
    console.error('deleteAllOrdersFromFirestore error:', e);
  }
}

// -------------------------------------------------------------
// STORE SETTINGS API (Footer, Support, Wallets, Rates, Notifications, Promo)
// -------------------------------------------------------------

export async function getSettingDoc<T>(settingKey: string): Promise<T | null> {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, settingKey);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return (snap.data() as { data: T }).data;
    }
    return null;
  } catch (e) {
    console.error(`getSettingDoc [${settingKey}] error:`, e);
    return null;
  }
}

export async function saveSettingDoc<T>(settingKey: string, data: T): Promise<void> {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, settingKey);
    await setDoc(docRef, {
      data,
      updatedAt: new Date().toISOString()
    });
  } catch (e) {
    console.error(`saveSettingDoc [${settingKey}] error:`, e);
  }
}

export function subscribeToSettingDoc<T>(settingKey: string, callback: (data: T | null) => void) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, settingKey);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback((snap.data() as { data: T }).data);
      } else {
        callback(null);
      }
    },
    (err) => {
      console.error(`subscribeToSettingDoc [${settingKey}] error:`, err);
    }
  );
}

// -------------------------------------------------------------
// ADMIN USERS API
// -------------------------------------------------------------

export async function fetchAdminUsersFromFirestore(): Promise<AdminUser[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.ADMIN_USERS));
    const users: AdminUser[] = [];
    snap.forEach((docSnap) => {
      users.push({ ...(docSnap.data() as AdminUser), id: docSnap.id });
    });
    return users;
  } catch (e) {
    console.error('fetchAdminUsersFromFirestore error:', e);
    return [];
  }
}

export async function saveAdminUserToFirestore(user: AdminUser): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ADMIN_USERS, user.id);
  await setDoc(docRef, user);
}

export async function deleteAdminUserFromFirestore(userId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ADMIN_USERS, userId);
  await deleteDoc(docRef);
}
