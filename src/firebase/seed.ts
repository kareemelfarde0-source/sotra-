import {
  fetchAllProducts,
  saveProductToFirestore,
  fetchAllCategories,
  saveCategoryToFirestore,
  fetchAllBundles,
  saveBundleToFirestore,
  getSettingDoc,
  saveSettingDoc,
  fetchAdminUsersFromFirestore,
  saveAdminUserToFirestore
} from './db';
import { PRODUCTS, CATEGORIES_DATA } from '../data/products';
import { OUTFIT_BUNDLES } from '../data/bundles';
import {
  DEFAULT_FOOTER_SETTINGS,
  DEFAULT_SUPPORT_SETTINGS,
  DEFAULT_WALLET_SETTINGS,
  DEFAULT_GOVERNORATES_RATES,
  DEFAULT_BROADCAST_NOTIFICATION,
  DEFAULT_PROMO_POPUP
} from '../utils/storeSettings';
import { DEFAULT_ADMIN_USERS } from '../utils/adminAuth';

let isSeeding = false;

/**
 * Initializes Firestore collections with clean baseline catalog data if the database is currently empty.
 * Once loaded into Firestore, subsequent reads and mutations happen entirely in Firebase Firestore.
 */
export async function initializeFirestoreDataIfNeeded(): Promise<void> {
  if (isSeeding) return;
  isSeeding = true;

  try {
    // 1. Check & Seed Products
    const existingProducts = await fetchAllProducts();
    if (existingProducts.length === 0) {
      console.log('Seeding initial products catalog into Firestore...');
      for (const p of PRODUCTS) {
        await saveProductToFirestore(p);
      }
    }

    // 2. Check & Seed Categories
    const existingCategories = await fetchAllCategories();
    if (existingCategories.length === 0) {
      console.log('Seeding store categories into Firestore...');
      for (const cat of CATEGORIES_DATA) {
        await saveCategoryToFirestore(cat);
      }
    }

    // 3. Check & Seed Bundles
    const existingBundles = await fetchAllBundles();
    if (existingBundles.length === 0) {
      console.log('Seeding outfit bundles into Firestore...');
      for (const bundle of OUTFIT_BUNDLES) {
        await saveBundleToFirestore(bundle);
      }
    }

    // 4. Check & Seed Store Settings
    const footer = await getSettingDoc('footer');
    if (!footer) {
      await saveSettingDoc('footer', DEFAULT_FOOTER_SETTINGS);
    }

    const support = await getSettingDoc('support');
    if (!support) {
      await saveSettingDoc('support', DEFAULT_SUPPORT_SETTINGS);
    }

    const wallet = await getSettingDoc('wallet');
    if (!wallet) {
      await saveSettingDoc('wallet', DEFAULT_WALLET_SETTINGS);
    }

    const governorates = await getSettingDoc('governorates');
    if (!governorates) {
      await saveSettingDoc('governorates', DEFAULT_GOVERNORATES_RATES);
    }

    const notification = await getSettingDoc('broadcast_notification');
    if (!notification) {
      await saveSettingDoc('broadcast_notification', DEFAULT_BROADCAST_NOTIFICATION);
    }

    const promoPopup = await getSettingDoc('site_promo_popup');
    if (!promoPopup) {
      await saveSettingDoc('site_promo_popup', DEFAULT_PROMO_POPUP);
    }

    // 5. Check & Seed Admin Users
    const existingAdminUsers = await fetchAdminUsersFromFirestore();
    if (existingAdminUsers.length === 0) {
      console.log('Seeding administrative users into Firestore...');
      for (const user of DEFAULT_ADMIN_USERS) {
        await saveAdminUserToFirestore(user);
      }
    }

    console.log('Firestore synchronization & baseline seed verified successfully.');
  } catch (error) {
    console.error('Error during Firestore initialization:', error);
  } finally {
    isSeeding = false;
  }
}
