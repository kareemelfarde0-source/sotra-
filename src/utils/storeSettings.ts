import {
  FooterSettings,
  SupportSettings,
  WalletSettings,
  GovernorateRate,
  BroadcastNotification,
  SitePromoPopup
} from '../types';
import { EGYPT_GOVERNORATES_SHIPPING } from '../data/products';
import { getSettingDoc, saveSettingDoc, subscribeToSettingDoc } from '../firebase/db';

export const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  aboutTextAr:
    'علامة أزياء فاخرة متخصصة في الملابس اليومية والستريت وير المعاصر، تجمع بين الأناقة العصرية والراحة الفائقة.',
  aboutTextEn:
    'Premium contemporary apparel brand designed for effortless style, comfortable casuals, and modern streetwear aesthetic.',
  pillar1TitleAr: 'شحن سريع لكافة المحافظات',
  pillar1DescAr: 'توصيل إكسبريس حتى باب المنزل خلال 24 إلى 48 ساعة فقط.',
  pillar2TitleAr: 'استبدال ومعاينة عند الاستلام',
  pillar2DescAr: 'حق المعاينة والتجربة عند الاستلام مع استبدال سهل للمقاس خلال 14 يوماً.',
  pillar3TitleAr: 'خامات قطنية مصرية 100%',
  pillar3DescAr: 'أقمشة فاخرة عالية الجودة معالجة ضد الانكماش تدوم لسنوات بأعلى معايير الإتقان.',
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
  requireShippingPayment: true,
  enableVodafoneCash: true,
  enableInstapay: true,
  enableCod: true,
  enableOrangeCash: false,
  enableEtisalatCash: false
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
  enabled: false,
  message: '',
  messageEn: '',
  type: 'info'
};

export const DEFAULT_PROMO_POPUP: SitePromoPopup = {
  enabled: true,
  imageUrl:
    'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
  targetType: 'category',
  targetId: 'sets',
  size: 'md',
  customWidth: 500
};

// Storage keys
const KEY_FOOTER = 'sotra_settings_footer';
const KEY_SUPPORT = 'sotra_settings_support';
const KEY_WALLET = 'sotra_settings_wallet';
const KEY_GOVS = 'sotra_settings_governorates';
const KEY_NOTIFICATION = 'sotra_settings_notification';
const KEY_PROMO = 'sotra_settings_promo_popup';

// In-memory cache synced with Firestore
let cachedFooter: FooterSettings = DEFAULT_FOOTER_SETTINGS;
let cachedSupport: SupportSettings = DEFAULT_SUPPORT_SETTINGS;
let cachedWallet: WalletSettings = DEFAULT_WALLET_SETTINGS;
let cachedGovs: GovernorateRate[] = DEFAULT_GOVERNORATES_RATES;
let cachedNotification: BroadcastNotification = DEFAULT_BROADCAST_NOTIFICATION;
let cachedPromo: SitePromoPopup = DEFAULT_PROMO_POPUP;

// Listeners to Firestore for real-time reactivity
if (typeof window !== 'undefined') {
  subscribeToSettingDoc<FooterSettings>('footer', (data) => {
    if (data) {
      cachedFooter = data;
      localStorage.setItem(KEY_FOOTER, JSON.stringify(data));
      window.dispatchEvent(new Event('sotra_settings_updated'));
    }
  });

  subscribeToSettingDoc<SupportSettings>('support', (data) => {
    if (data) {
      cachedSupport = data;
      localStorage.setItem(KEY_SUPPORT, JSON.stringify(data));
      window.dispatchEvent(new Event('sotra_settings_updated'));
    }
  });

  subscribeToSettingDoc<WalletSettings>('wallet', (data) => {
    if (data) {
      cachedWallet = data;
      localStorage.setItem(KEY_WALLET, JSON.stringify(data));
      window.dispatchEvent(new Event('sotra_settings_updated'));
    }
  });

  subscribeToSettingDoc<GovernorateRate[]>('governorates', (data) => {
    if (data) {
      cachedGovs = data;
      localStorage.setItem(KEY_GOVS, JSON.stringify(data));
      window.dispatchEvent(new Event('sotra_settings_updated'));
    }
  });

  subscribeToSettingDoc<BroadcastNotification>('broadcast_notification', (data) => {
    if (data) {
      cachedNotification = data;
      localStorage.setItem(KEY_NOTIFICATION, JSON.stringify(data));
      window.dispatchEvent(new Event('sotra_settings_updated'));
    }
  });

  subscribeToSettingDoc<SitePromoPopup>('site_promo_popup', (data) => {
    if (data) {
      cachedPromo = data;
      localStorage.setItem(KEY_PROMO, JSON.stringify(data));
      window.dispatchEvent(new Event('sotra_settings_updated'));
    }
  });
}

export function getFooterSettings(): FooterSettings {
  try {
    const raw = localStorage.getItem(KEY_FOOTER);
    return raw ? { ...DEFAULT_FOOTER_SETTINGS, ...JSON.parse(raw) } : cachedFooter;
  } catch {
    return cachedFooter;
  }
}

export function saveFooterSettings(settings: FooterSettings) {
  cachedFooter = settings;
  localStorage.setItem(KEY_FOOTER, JSON.stringify(settings));
  saveSettingDoc('footer', settings).catch(console.error);
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getSupportSettings(): SupportSettings {
  try {
    const raw = localStorage.getItem(KEY_SUPPORT);
    return raw ? { ...DEFAULT_SUPPORT_SETTINGS, ...JSON.parse(raw) } : cachedSupport;
  } catch {
    return cachedSupport;
  }
}

export function saveSupportSettings(settings: SupportSettings) {
  cachedSupport = settings;
  localStorage.setItem(KEY_SUPPORT, JSON.stringify(settings));
  saveSettingDoc('support', settings).catch(console.error);
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getWalletSettings(): WalletSettings {
  try {
    const raw = localStorage.getItem(KEY_WALLET);
    return raw ? { ...DEFAULT_WALLET_SETTINGS, ...JSON.parse(raw) } : cachedWallet;
  } catch {
    return cachedWallet;
  }
}

export function saveWalletSettings(settings: WalletSettings) {
  cachedWallet = settings;
  localStorage.setItem(KEY_WALLET, JSON.stringify(settings));
  saveSettingDoc('wallet', settings).catch(console.error);
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getGovernoratesRates(): GovernorateRate[] {
  try {
    const raw = localStorage.getItem(KEY_GOVS);
    return raw ? JSON.parse(raw) : cachedGovs;
  } catch {
    return cachedGovs;
  }
}

export function saveGovernoratesRates(rates: GovernorateRate[]) {
  cachedGovs = rates;
  localStorage.setItem(KEY_GOVS, JSON.stringify(rates));
  saveSettingDoc('governorates', rates).catch(console.error);
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getBroadcastNotification(): BroadcastNotification {
  try {
    const raw = localStorage.getItem(KEY_NOTIFICATION);
    if (!raw) return cachedNotification;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_BROADCAST_NOTIFICATION, ...parsed };
  } catch {
    return cachedNotification;
  }
}

export function saveBroadcastNotification(notif: BroadcastNotification) {
  cachedNotification = notif;
  localStorage.setItem(KEY_NOTIFICATION, JSON.stringify(notif));
  saveSettingDoc('broadcast_notification', notif).catch(console.error);
  window.dispatchEvent(new Event('sotra_settings_updated'));
}

export function getPromoPopupSettings(): SitePromoPopup {
  try {
    const raw = localStorage.getItem(KEY_PROMO);
    return raw ? { ...DEFAULT_PROMO_POPUP, ...JSON.parse(raw) } : cachedPromo;
  } catch {
    return cachedPromo;
  }
}

export function savePromoPopupSettings(popup: SitePromoPopup) {
  cachedPromo = popup;
  localStorage.setItem(KEY_PROMO, JSON.stringify(popup));
  saveSettingDoc('site_promo_popup', popup).catch(console.error);
  window.dispatchEvent(new Event('sotra_settings_updated'));
}
