import {
  FooterSettings,
  SupportSettings,
  WalletSettings,
  GovernorateRate,
  BroadcastNotification,
  SitePromoPopup
} from '../types';
import { EGYPT_GOVERNORATES_SHIPPING } from '../data/products';

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  aboutTextAr:
    'علامة أزياء فاخرة متخصصة في الملابس اليومية والستريت وير المعاصر، تجمع بين الأناقة العصرية والراحة الفائقة.',
  aboutTextEn:
    'Premium contemporary apparel brand designed for effortless style, comfortable casuals, and modern streetwear aesthetic.',
  pillar1TitleAr: 'شحن سريع لكافة المحافظات',
  pillar1DescAr: 'توصيل إكسبريس حتى باب المنزل خلال 24 إلى 48 ساعة فقط.',
  pillar2TitleAr: 'استبدال ومعاينة عند الاستلام',
  pillar2DescAr: 'حق المعاينة والتجربة عند الاستلام مع استبدال سهل للمقاس خلال 14 يوماً.',
  pillar3TitleAr: 'خدمة العملاء عبر واتساب',
  pillar3DescAr: 'رد فوري ومباشر مع ممثل الخدمة 24/7 لمتابعة طلبك خطوة بخطوة.',
  instagramUrl: 'https://www.instagram.com/sotra_eg',
  tiktokUrl: 'https://www.tiktok.com/@sotrafashion',
  facebookUrl: 'https://www.facebook.com/sotrafashion',
  copyrightTextAr: 'جميع الحقوق محفوظة لعلامة سوترة.',
  customerServiceNoteAr:
    'عند التواصل، يرجى إرسال: الاسم، رقم الطلب، ونوع الرسالة (مشكلة أو استفسار).'
};

export const DEFAULT_SUPPORT_SETTINGS: SupportSettings = {
  whatsappPhone: '201068989523',
  whatsappDisplay: '+20 10 68989523'
};

export const DEFAULT_WALLET_SETTINGS: WalletSettings = {
  vodafoneCash: '01068989523',
  instapayHandle: 'sotra@instapay',
  instapayPhone: '01068989523',
  orangeCash: '01206898952',
  etisalatCash: '01106898952',
  requireShippingPayment: true
};

export const DEFAULT_GOVERNORATES_RATES: GovernorateRate[] = EGYPT_GOVERNORATES_SHIPPING.map(
  (g) => ({
    id: g.id,
    nameEn: g.nameEn,
    nameAr: g.nameAr,
    fee: g.fee
  })
);

export const DEFAULT_BROADCAST_NOTIFICATION: BroadcastNotification = {
  enabled: true,
  message: '🔥 خصومات حصرية للموسم الجديد! شحن فوري لكافة المحافظات خلال 48 ساعة.',
  messageEn: 'Exclusive new season drop! Fast express shipping nationwide in 48h.',
  type: 'info'
};

export const DEFAULT_PROMO_POPUP: SitePromoPopup = {
  enabled: true,
  imageUrl:
    'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
  titleAr: 'تشكيلة سوترة الصيفية الجديدة وصلت!',
  titleEn: 'NEW SOTRA COLLECTION DROPPED',
  subtitleAr: 'أزياء وستريت وير مميز بخصومات فورية وعروض على الأطقم الكاملة.',
  subtitleEn: 'Premium streetwear outfits with bundle discounts.',
  buttonTextAr: 'تسوق التشكيلة الآن',
  buttonTextEn: 'SHOP NOW',
  targetType: 'category',
  targetId: 'sets'
};

// Storage keys
const KEY_FOOTER = 'sotra_settings_footer';
const KEY_SUPPORT = 'sotra_settings_support';
const KEY_WALLET = 'sotra_settings_wallet';
const KEY_GOVS = 'sotra_settings_governorates';
const KEY_NOTIFICATION = 'sotra_settings_notification';
const KEY_PROMO = 'sotra_settings_promo_popup';

export function getFooterSettings(): FooterSettings {
  try {
    const raw = localStorage.getItem(KEY_FOOTER);
    return raw ? { ...DEFAULT_FOOTER_SETTINGS, ...JSON.parse(raw) } : DEFAULT_FOOTER_SETTINGS;
  } catch {
    return DEFAULT_FOOTER_SETTINGS;
  }
}

export function saveFooterSettings(settings: FooterSettings) {
  localStorage.setItem(KEY_FOOTER, JSON.stringify(settings));
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getSupportSettings(): SupportSettings {
  try {
    const raw = localStorage.getItem(KEY_SUPPORT);
    return raw ? { ...DEFAULT_SUPPORT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SUPPORT_SETTINGS;
  } catch {
    return DEFAULT_SUPPORT_SETTINGS;
  }
}

export function saveSupportSettings(settings: SupportSettings) {
  localStorage.setItem(KEY_SUPPORT, JSON.stringify(settings));
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getWalletSettings(): WalletSettings {
  try {
    const raw = localStorage.getItem(KEY_WALLET);
    return raw ? { ...DEFAULT_WALLET_SETTINGS, ...JSON.parse(raw) } : DEFAULT_WALLET_SETTINGS;
  } catch {
    return DEFAULT_WALLET_SETTINGS;
  }
}

export function saveWalletSettings(settings: WalletSettings) {
  localStorage.setItem(KEY_WALLET, JSON.stringify(settings));
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getGovernoratesRates(): GovernorateRate[] {
  try {
    const raw = localStorage.getItem(KEY_GOVS);
    return raw ? JSON.parse(raw) : DEFAULT_GOVERNORATES_RATES;
  } catch {
    return DEFAULT_GOVERNORATES_RATES;
  }
}

export function saveGovernoratesRates(rates: GovernorateRate[]) {
  localStorage.setItem(KEY_GOVS, JSON.stringify(rates));
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getBroadcastNotification(): BroadcastNotification {
  try {
    const raw = localStorage.getItem(KEY_NOTIFICATION);
    return raw
      ? { ...DEFAULT_BROADCAST_NOTIFICATION, ...JSON.parse(raw) }
      : DEFAULT_BROADCAST_NOTIFICATION;
  } catch {
    return DEFAULT_BROADCAST_NOTIFICATION;
  }
}

export function saveBroadcastNotification(notif: BroadcastNotification) {
  localStorage.setItem(KEY_NOTIFICATION, JSON.stringify(notif));
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getPromoPopupSettings(): SitePromoPopup {
  try {
    const raw = localStorage.getItem(KEY_PROMO);
    return raw ? { ...DEFAULT_PROMO_POPUP, ...JSON.parse(raw) } : DEFAULT_PROMO_POPUP;
  } catch {
    return DEFAULT_PROMO_POPUP;
  }
}

export function savePromoPopupSettings(popup: SitePromoPopup) {
  localStorage.setItem(KEY_PROMO, JSON.stringify(popup));
  window.dispatchEvent(new Event('sotra_settings_updated'));
}
