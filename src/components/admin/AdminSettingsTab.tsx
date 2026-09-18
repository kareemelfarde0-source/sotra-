import React, { useState } from 'react';
import {
  Save,
  Wallet,
  Truck,
  Phone,
  Layout,
  Bell,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import {
  FooterSettings,
  SupportSettings,
  WalletSettings,
  GovernorateRate,
  BroadcastNotification,
  SitePromoPopup,
  Product,
  StoreCategory
} from '../../types';
import {
  getFooterSettings,
  saveFooterSettings,
  getSupportSettings,
  saveSupportSettings,
  getWalletSettings,
  saveWalletSettings,
  getGovernoratesRates,
  saveGovernoratesRates,
  getBroadcastNotification,
  saveBroadcastNotification,
  getPromoPopupSettings,
  savePromoPopupSettings
} from '../../utils/storeSettings';

interface AdminSettingsTabProps {
  products: Product[];
  categories: StoreCategory[];
  isArabic: boolean;
  onNotify: (msg: string) => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  products,
  categories,
  isArabic,
  onNotify
}) => {
  // Settings States
  const [footer, setFooter] = useState<FooterSettings>(getFooterSettings);
  const [support, setSupport] = useState<SupportSettings>(getSupportSettings);
  const [wallet, setWallet] = useState<WalletSettings>(getWalletSettings);
  const [govRates, setGovRates] = useState<GovernorateRate[]>(getGovernoratesRates);
  const [notification, setNotification] = useState<BroadcastNotification>(getBroadcastNotification);
  const [promoPopup, setPromoPopup] = useState<SitePromoPopup>(getPromoPopupSettings);

  // Sub-sections accordion or tabs
  const [currentSection, setCurrentSection] = useState<
    'wallets' | 'shipping' | 'support' | 'footer' | 'notification' | 'promo'
  >('wallets');

  const handleSaveWallets = (e: React.FormEvent) => {
    e.preventDefault();
    saveWalletSettings(wallet);
    onNotify(isArabic ? 'تم حفظ أرقام المحافظ وضوابط الشحن بنجاح!' : 'Wallets saved successfully!');
  };

  const handleSaveGovRates = (e: React.FormEvent) => {
    e.preventDefault();
    saveGovernoratesRates(govRates);
    onNotify(isArabic ? 'تم تحديث تسعيرة شحن المحافظات بنجاح!' : 'Shipping rates updated!');
  };

  const handleSaveSupport = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupportSettings(support);
    onNotify(isArabic ? 'تم حفظ رقم خدمة العملاء بنجاح!' : 'Customer service saved!');
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    saveFooterSettings(footer);
    onNotify(isArabic ? 'تم حفظ نصوص وروابط الفوستر بنجاح!' : 'Footer updated successfully!');
  };

  const handleSaveNotification = (e: React.FormEvent) => {
    e.preventDefault();
    saveBroadcastNotification(notification);
    onNotify(isArabic ? 'تم نشر إشعار المستخدمين المباشر!' : 'Broadcast notification updated!');
  };

  const handleSavePromoPopup = (e: React.FormEvent) => {
    e.preventDefault();
    savePromoPopupSettings(promoPopup);
    onNotify(isArabic ? 'تم حفظ إعدادات النافذة المنبثقة الترويجية!' : 'Promo popup saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-4">
        <h3 className="text-base font-black uppercase tracking-wider text-neutral-950 font-heading">
          {isArabic ? 'إعدادات المتجر والتحكم الشامل' : 'Store Settings & Configurations'}
        </h3>
        <p className="text-xs text-neutral-500 mt-0.5">
          {isArabic
            ? 'تخصيص أرقام المحافظ، شحن المحافظات، الفوستر، خدمة العملاء، الإشعارات، والنافذة المنبثقة'
            : 'Customize wallets, shipping rates, footer content, support numbers, notifications, and popups.'}
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 rounded-lg border border-neutral-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => setCurrentSection('wallets')}
          className={`px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
            currentSection === 'wallets' ? 'bg-black text-white shadow-xs' : 'text-neutral-700 hover:text-black'
          }`}
        >
          <Wallet className="w-3.5 h-3.5" />
          <span>{isArabic ? 'أرقام المحافظ والتحويل' : 'Wallets'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('shipping')}
          className={`px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
            currentSection === 'shipping' ? 'bg-black text-white shadow-xs' : 'text-neutral-700 hover:text-black'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>{isArabic ? 'رسوم شحن المحافظات' : 'Shipping Rates'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('support')}
          className={`px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
            currentSection === 'support' ? 'bg-black text-white shadow-xs' : 'text-neutral-700 hover:text-black'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{isArabic ? 'رقم خدمة العملاء' : 'Support Phone'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('footer')}
          className={`px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
            currentSection === 'footer' ? 'bg-black text-white shadow-xs' : 'text-neutral-700 hover:text-black'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>{isArabic ? 'تعديل الفوستر بالكامل' : 'Footer Content'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('notification')}
          className={`px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
            currentSection === 'notification' ? 'bg-black text-white shadow-xs' : 'text-neutral-700 hover:text-black'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{isArabic ? 'إرسال إشعار للمستخدم' : 'Notification'}</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentSection('promo')}
          className={`px-3 py-1.5 rounded transition cursor-pointer flex items-center space-x-1 rtl:space-x-reverse ${
            currentSection === 'promo' ? 'bg-black text-white shadow-xs' : 'text-neutral-700 hover:text-black'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          <span>{isArabic ? 'النافذة المنبثقة الترويجية' : 'Promo Popup'}</span>
        </button>
      </div>

      {/* SECTION 1: WALLETS & MANDATORY SHIPPING */}
      {currentSection === 'wallets' && (
        <form onSubmit={handleSaveWallets} className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3">
            <Wallet className="w-5 h-5 text-neutral-800" />
            <h4 className="font-bold text-sm text-neutral-900">
              {isArabic ? 'أرقام المحافظ الإلكترونية وضوابط الشحن' : 'Digital Wallets & Shipping Rules'}
            </h4>
          </div>

          {/* Mandatory Shipping Fee Toggle */}
          <div className="p-3 bg-amber-50 rounded-md border border-amber-200 flex items-start space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="reqShipping"
              checked={wallet.requireShippingPayment}
              onChange={(e) => setWallet({ ...wallet, requireShippingPayment: e.target.checked })}
              className="w-4 h-4 mt-0.5 accent-black rounded cursor-pointer"
            />
            <label htmlFor="reqShipping" className="cursor-pointer text-xs">
              <span className="font-black text-amber-950 block">
                {isArabic ? 'إرسال رسوم الشحن إجباري لتأكيد الطلب' : 'Make Shipping Payment Mandatory'}
              </span>
              <span className="text-amber-800 text-[11px] block mt-0.5">
                {isArabic
                  ? 'عند التفعيل، لن يتمكن العميل من إتمام الطلب إلا بعد إدخال رقم المحفظة ورقم التحويل لرسوم الشحن.'
                  : 'Requires customer to input payment reference and sender number for shipping before finishing checkout.'}
              </span>
            </label>
          </div>

          {/* Payment Methods Visibility Toggles (Show / Hide) */}
          <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-xs text-neutral-900">
                {isArabic ? 'إظهار وإخفاء طرق الدفع للعملاء في صفحة الدفع:' : 'Toggle Payment Methods Visibility in Checkout:'}
              </span>
              <span className="text-[10px] text-neutral-500 font-bold">
                {isArabic ? 'حدد الطرق المتاحة فقط' : 'Select active methods'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer bg-white p-2.5 rounded border border-neutral-200 hover:border-black transition">
                <input
                  type="checkbox"
                  checked={wallet.enableVodafoneCash !== false}
                  onChange={(e) => setWallet({ ...wallet, enableVodafoneCash: e.target.checked })}
                  className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                />
                <span className="font-bold text-neutral-900">{isArabic ? 'فودافون كاش' : 'Vodafone Cash'}</span>
              </label>

              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer bg-white p-2.5 rounded border border-neutral-200 hover:border-black transition">
                <input
                  type="checkbox"
                  checked={wallet.enableInstapay !== false}
                  onChange={(e) => setWallet({ ...wallet, enableInstapay: e.target.checked })}
                  className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                />
                <span className="font-bold text-neutral-900">{isArabic ? 'انستا باي (InstaPay)' : 'InstaPay'}</span>
              </label>

              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer bg-white p-2.5 rounded border border-neutral-200 hover:border-black transition">
                <input
                  type="checkbox"
                  checked={wallet.enableCod !== false}
                  onChange={(e) => setWallet({ ...wallet, enableCod: e.target.checked })}
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span className="font-bold text-neutral-900">{isArabic ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</span>
              </label>

              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer bg-white p-2.5 rounded border border-neutral-200 hover:border-black transition">
                <input
                  type="checkbox"
                  checked={wallet.enableOrangeCash === true}
                  onChange={(e) => setWallet({ ...wallet, enableOrangeCash: e.target.checked })}
                  className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                />
                <span className="font-bold text-neutral-900">{isArabic ? 'أورنج كاش' : 'Orange Cash'}</span>
              </label>

              <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer bg-white p-2.5 rounded border border-neutral-200 hover:border-black transition">
                <input
                  type="checkbox"
                  checked={wallet.enableEtisalatCash === true}
                  onChange={(e) => setWallet({ ...wallet, enableEtisalatCash: e.target.checked })}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
                <span className="font-bold text-neutral-900">{isArabic ? 'اتصالات كاش' : 'Etisalat Cash'}</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رقم محفظة فودافون كاش *' : 'Vodafone Cash Number *'}
              </label>
              <input
                type="text"
                required
                value={wallet.vodafoneCash}
                onChange={(e) => setWallet({ ...wallet, vodafoneCash: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'معرف انستاباي (InstaPay Handle) *' : 'InstaPay Handle *'}
              </label>
              <input
                type="text"
                required
                value={wallet.instapayHandle}
                onChange={(e) => setWallet({ ...wallet, instapayHandle: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رقم هاتف انستاباي' : 'InstaPay Phone Number'}
              </label>
              <input
                type="text"
                value={wallet.instapayPhone || ''}
                onChange={(e) => setWallet({ ...wallet, instapayPhone: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رقم محفظة أورنج كاش' : 'Orange Cash Number'}
              </label>
              <input
                type="text"
                value={wallet.orangeCash || ''}
                onChange={(e) => setWallet({ ...wallet, orangeCash: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رقم محفظة اتصالات كاش' : 'Etisalat Cash Number'}
              </label>
              <input
                type="text"
                value={wallet.etisalatCash || ''}
                onChange={(e) => setWallet({ ...wallet, etisalatCash: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase rounded cursor-pointer flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isArabic ? 'حفظ إعدادات المحافظ' : 'Save Wallets'}</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 2: GOVERNORATES SHIPPING RATES */}
      {currentSection === 'shipping' && (
        <form onSubmit={handleSaveGovRates} className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-lg space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Truck className="w-5 h-5 text-neutral-800" />
              <h4 className="font-bold text-sm text-neutral-900">
                {isArabic ? 'تعديل رسوم شحن كافة المحافظات' : 'Governorate Shipping Rates'}
              </h4>
            </div>
            <button
              type="submit"
              className="px-4 py-1.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded cursor-pointer flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isArabic ? 'حفظ كافة الأسعار' : 'Save Rates'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto p-1">
            {govRates.map((gov, idx) => (
              <div
                key={gov.id}
                className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-bold text-xs text-neutral-900 block">
                    {gov.nameAr}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {gov.nameEn}
                  </span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <input
                    type="number"
                    min={0}
                    value={gov.fee}
                    onChange={(e) => {
                      const newRates = [...govRates];
                      newRates[idx].fee = Number(e.target.value);
                      setGovRates(newRates);
                    }}
                    className="w-16 px-1.5 py-1 bg-white border border-neutral-300 rounded font-mono font-bold text-xs text-center"
                  />
                  <span className="text-xs font-bold text-neutral-600">ج.م</span>
                </div>
              </div>
            ))}
          </div>
        </form>
      )}

      {/* SECTION 3: CUSTOMER SERVICE WHATSAPP */}
      {currentSection === 'support' && (
        <form onSubmit={handleSaveSupport} className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3">
            <Phone className="w-5 h-5 text-neutral-800" />
            <h4 className="font-bold text-sm text-neutral-900">
              {isArabic ? 'رقم خدمة العملاء والدعم الفني عبر واتساب' : 'WhatsApp Customer Service Number'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رقم واتساب المباشر (مع كود الدولة دون أصفار أو +) *' : 'WhatsApp Direct Number (e.g. 201068989523) *'}
              </label>
              <input
                type="text"
                required
                value={support.whatsappPhone}
                onChange={(e) => setSupport({ ...support, whatsappPhone: e.target.value.replace(/\D/g, '') })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
              <span className="text-[10px] text-neutral-400 mt-1 block">
                {isArabic ? 'مثال: 201068989523' : 'Example: 201068989523'}
              </span>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'الرقم المعروض للعملاء في الواجهة' : 'Display Number Label'}
              </label>
              <input
                type="text"
                value={support.whatsappDisplay}
                onChange={(e) => setSupport({ ...support, whatsappDisplay: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase rounded cursor-pointer flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isArabic ? 'حفظ رقم خدمة العملاء' : 'Save Support Number'}</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 4: EDITABLE FOOTER */}
      {currentSection === 'footer' && (
        <form onSubmit={handleSaveFooter} className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3">
            <Layout className="w-5 h-5 text-neutral-800" />
            <h4 className="font-bold text-sm text-neutral-900">
              {isArabic ? 'تعديل كل جزء بالفوستر بكل شيء' : 'Complete Footer Customization'}
            </h4>
          </div>

          {/* About SOTRA text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-700">
              {isArabic ? 'نبذة عن سوترة في الفوستر (عربي) *' : 'About SOTRA (Arabic) *'}
            </label>
            <textarea
              rows={2}
              required
              value={footer.aboutTextAr}
              onChange={(e) => setFooter({ ...footer, aboutTextAr: e.target.value })}
              className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded text-xs"
            />
          </div>

          {/* 3 Core Assurance Pillars */}
          <div className="p-3 bg-neutral-50 rounded border border-neutral-200 space-y-3">
            <h5 className="font-bold text-xs text-neutral-900">
              {isArabic ? 'الركائز والضمانات الثلاث في الفوستر' : 'Footer 3 Assurance Pillars'}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Pillar 1 */}
              <div className="p-2 bg-white rounded border border-neutral-200 space-y-1.5">
                <span className="font-bold text-[11px] block text-black">
                  {isArabic ? 'الركيزة 1 (الشحن):' : 'Pillar 1 (Shipping):'}
                </span>
                <input
                  type="text"
                  value={footer.pillar1TitleAr}
                  onChange={(e) => setFooter({ ...footer, pillar1TitleAr: e.target.value })}
                  placeholder="العنوان"
                  className="w-full p-1 border border-neutral-300 rounded text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={footer.pillar1DescAr}
                  onChange={(e) => setFooter({ ...footer, pillar1DescAr: e.target.value })}
                  placeholder="الوصف"
                  className="w-full p-1 border border-neutral-300 rounded text-[11px]"
                />
              </div>

              {/* Pillar 2 */}
              <div className="p-2 bg-white rounded border border-neutral-200 space-y-1.5">
                <span className="font-bold text-[11px] block text-black">
                  {isArabic ? 'الركيزة 2 (الاستبدال):' : 'Pillar 2 (Exchange):'}
                </span>
                <input
                  type="text"
                  value={footer.pillar2TitleAr}
                  onChange={(e) => setFooter({ ...footer, pillar2TitleAr: e.target.value })}
                  placeholder="العنوان"
                  className="w-full p-1 border border-neutral-300 rounded text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={footer.pillar2DescAr}
                  onChange={(e) => setFooter({ ...footer, pillar2DescAr: e.target.value })}
                  placeholder="الوصف"
                  className="w-full p-1 border border-neutral-300 rounded text-[11px]"
                />
              </div>

              {/* Pillar 3 */}
              <div className="p-2 bg-white rounded border border-neutral-200 space-y-1.5">
                <span className="font-bold text-[11px] block text-black">
                  {isArabic ? 'الركيزة 3 (خدمة العملاء):' : 'Pillar 3 (Support):'}
                </span>
                <input
                  type="text"
                  value={footer.pillar3TitleAr}
                  onChange={(e) => setFooter({ ...footer, pillar3TitleAr: e.target.value })}
                  placeholder="العنوان"
                  className="w-full p-1 border border-neutral-300 rounded text-xs font-bold"
                />
                <textarea
                  rows={2}
                  value={footer.pillar3DescAr}
                  onChange={(e) => setFooter({ ...footer, pillar3DescAr: e.target.value })}
                  placeholder="الوصف"
                  className="w-full p-1 border border-neutral-300 rounded text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Social Channels URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رابط إنستغرام Instagram' : 'Instagram URL'}
              </label>
              <input
                type="url"
                value={footer.instagramUrl}
                onChange={(e) => setFooter({ ...footer, instagramUrl: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رابط تيك توك TikTok' : 'TikTok URL'}
              </label>
              <input
                type="url"
                value={footer.tiktokUrl}
                onChange={(e) => setFooter({ ...footer, tiktokUrl: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رابط فيسبوك Facebook' : 'Facebook URL'}
              </label>
              <input
                type="url"
                value={footer.facebookUrl}
                onChange={(e) => setFooter({ ...footer, facebookUrl: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded"
              />
            </div>
          </div>

          {/* Customer Service Notice & Copyright */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'ملاحظة صندوق الدعم في الفوستر' : 'Support Box Note'}
              </label>
              <input
                type="text"
                value={footer.customerServiceNoteAr || ''}
                onChange={(e) => setFooter({ ...footer, customerServiceNoteAr: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded"
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'نص حقوق النشر (Copyright)' : 'Copyright Text'}
              </label>
              <input
                type="text"
                value={footer.copyrightTextAr || ''}
                onChange={(e) => setFooter({ ...footer, copyrightTextAr: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase rounded cursor-pointer flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isArabic ? 'حفظ كافة تفاصيل الفوستر' : 'Save Footer Settings'}</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 5: BROADCAST NOTIFICATION */}
      {currentSection === 'notification' && (
        <form onSubmit={handleSaveNotification} className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3">
            <Bell className="w-5 h-5 text-neutral-800" />
            <h4 className="font-bold text-sm text-neutral-900">
              {isArabic ? 'إرسال إشعار للمستخدمين (شريط علوي مباشر)' : 'Broadcast Live Notification to Users'}
            </h4>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="enableNotif"
              checked={notification.enabled}
              onChange={(e) => setNotification({ ...notification, enabled: e.target.checked })}
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
            <label htmlFor="enableNotif" className="text-xs font-bold text-neutral-900 cursor-pointer">
              {isArabic ? 'تفعيل ظهور شريط الإشعار في أعلى الموقع' : 'Enable Top Notification Bar'}
            </label>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'نوع الإشعار ولون الشريط:' : 'Notification Style:'}
              </label>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <label className="flex items-center space-x-1 rtl:space-x-reverse cursor-pointer">
                  <input
                    type="radio"
                    name="ntype"
                    checked={notification.type === 'info'}
                    onChange={() => setNotification({ ...notification, type: 'info' })}
                    className="accent-black"
                  />
                  <span>{isArabic ? 'داكن أنيق (Info)' : 'Dark'}</span>
                </label>
                <label className="flex items-center space-x-1 rtl:space-x-reverse cursor-pointer">
                  <input
                    type="radio"
                    name="ntype"
                    checked={notification.type === 'alert'}
                    onChange={() => setNotification({ ...notification, type: 'alert' })}
                    className="accent-black"
                  />
                  <span>{isArabic ? 'برتقالي تحذيري (Alert)' : 'Orange Alert'}</span>
                </label>
                <label className="flex items-center space-x-1 rtl:space-x-reverse cursor-pointer">
                  <input
                    type="radio"
                    name="ntype"
                    checked={notification.type === 'urgent'}
                    onChange={() => setNotification({ ...notification, type: 'urgent' })}
                    className="accent-black"
                  />
                  <span>{isArabic ? 'أحمر عاجل (Urgent)' : 'Red Urgent'}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'نص الإشعار (عربي) *' : 'Notification Text (Arabic) *'}
              </label>
              <input
                type="text"
                required
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                placeholder="مثال: خصم 10% اليوم فقط بكود SOTRA10 | شحن فوري"
                className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded font-semibold text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase rounded cursor-pointer flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isArabic ? 'نشر الإشعار الآن' : 'Publish Notification'}</span>
            </button>
          </div>
        </form>
      )}

      {/* SECTION 6: PROMO POPUP MODAL */}
      {currentSection === 'promo' && (
        <form onSubmit={handleSavePromoPopup} className="p-4 sm:p-5 bg-white border border-neutral-200 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3">
            <Layout className="w-5 h-5 text-neutral-800" />
            <h4 className="font-bold text-sm text-neutral-900">
              {isArabic
                ? 'النافذة المنبثقة الترويجية عند فتح الموقع (مربوطة بمنتج أو قسم)'
                : 'Promotional Welcome Popup (Linked to Product or Category)'}
            </h4>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="enablePopup"
              checked={promoPopup.enabled}
              onChange={(e) => setPromoPopup({ ...promoPopup, enabled: e.target.checked })}
              className="w-4 h-4 accent-black rounded cursor-pointer"
            />
            <label htmlFor="enablePopup" className="text-xs font-bold text-neutral-900 cursor-pointer">
              {isArabic ? 'تفعيل ظهور النافذة المنبثقة الترويجية عند فتح الموقع' : 'Enable Promo Popup on site load'}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'رابط صورة البوب أب المنبثقة *' : 'Popup Image URL *'}
              </label>
              <input
                type="url"
                required
                value={promoPopup.imageUrl}
                onChange={(e) => setPromoPopup({ ...promoPopup, imageUrl: e.target.value })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono text-xs"
              />
            </div>

            {/* Size & Width Control */}
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'مقاس النافذة المنبثقة (العرض) *' : 'Popup Size (Width) *'}
              </label>
              <select
                value={promoPopup.size || 'md'}
                onChange={(e) => setPromoPopup({ ...promoPopup, size: e.target.value as any })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-bold"
              >
                <option value="sm">{isArabic ? 'صغير (360px) - مناسب للهاتف' : 'Small (360px)'}</option>
                <option value="md">{isArabic ? 'متوسط (480px) - قياسي متوازن' : 'Medium (480px)'}</option>
                <option value="lg">{isArabic ? 'كبير (600px) - لافت وواضح' : 'Large (600px)'}</option>
                <option value="xl">{isArabic ? 'شاشة عريضة (740px)' : 'Extra Large (740px)'}</option>
                <option value="custom">{isArabic ? 'مقاس مخصص بالبكسل (Custom Width)' : 'Custom Width (px)'}</option>
              </select>
            </div>

            {promoPopup.size === 'custom' && (
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  {isArabic ? 'العرض المخصص بالبكسل (px):' : 'Custom Width (px):'}
                </label>
                <input
                  type="number"
                  min="280"
                  max="1200"
                  value={promoPopup.customWidth || 500}
                  onChange={(e) => setPromoPopup({ ...promoPopup, customWidth: Number(e.target.value) })}
                  className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-mono font-bold"
                />
              </div>
            )}

            {/* Target Type & Target Selector */}
            <div>
              <label className="block font-bold text-neutral-700 mb-1">
                {isArabic ? 'ربط النافذة بـ (Target Type):' : 'Link Popup To:'}
              </label>
              <select
                value={promoPopup.targetType}
                onChange={(e) => setPromoPopup({ ...promoPopup, targetType: e.target.value as any })}
                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-bold"
              >
                <option value="none">{isArabic ? 'بدون توجيه (إغلاق فقط)' : 'None (Just Dismiss)'}</option>
                <option value="category">{isArabic ? 'قسم محدد في المتجر' : 'Category'}</option>
                <option value="product">{isArabic ? 'منتج محدد بالاسم' : 'Specific Product'}</option>
              </select>
            </div>

            {promoPopup.targetType === 'category' && (
              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 mb-1">
                  {isArabic ? 'اختر القسم المستهدف:' : 'Select Target Category:'}
                </label>
                <select
                  value={promoPopup.targetId || ''}
                  onChange={(e) => setPromoPopup({ ...promoPopup, targetId: e.target.value })}
                  className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-bold"
                >
                  <option value="">{isArabic ? '-- اختر القسم --' : '-- Select Category --'}</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {isArabic ? c.nameAr : c.name} ({c.id})
                    </option>
                  ))}
                  <option value="sets">{isArabic ? 'الأطقم والتنسيقات الكاملة' : 'Outfit Sets'}</option>
                </select>
              </div>
            )}

            {promoPopup.targetType === 'product' && (
              <div className="sm:col-span-2">
                <label className="block font-bold text-neutral-700 mb-1">
                  {isArabic ? 'اختر المنتج المستهدف:' : 'Select Target Product:'}
                </label>
                <select
                  value={promoPopup.targetId || ''}
                  onChange={(e) => setPromoPopup({ ...promoPopup, targetId: e.target.value })}
                  className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded font-bold"
                >
                  <option value="">{isArabic ? '-- اختر المنتج --' : '-- Select Product --'}</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {isArabic ? p.nameAr || p.name : p.name} ({p.discountedPrice} ج.م)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase rounded cursor-pointer flex items-center space-x-1.5 rtl:space-x-reverse"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isArabic ? 'حفظ إعدادات النافذة المنبثقة' : 'Save Promo Popup'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
