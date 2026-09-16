import React from 'react';
import { X, Bell, Truck, Tag, Flame, ArrowRight } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPromoCode: (code: string) => void;
  onShopNewArrivals: () => void;
  isArabic: boolean;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onApplyPromoCode,
  onShopNewArrivals,
  isArabic
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'promo',
      icon: Tag,
      iconColor: 'bg-red-100 text-red-600',
      title: 'VIP 10% OFF PROMO CODE: SOTRA10',
      titleAr: 'كود خصم 10% للأعضاء: SOTRA10',
      desc: 'Use promo code SOTRA10 at checkout for an instant 10% discount on all drops.',
      descAr: 'استخدم الكود SOTRA10 عند الدفع للحصول على خصم 10% فوري.',
      time: 'Just now',
      actionCode: 'SOTRA10'
    },
    {
      id: 2,
      type: 'drop',
      icon: Flame,
      iconColor: 'bg-orange-100 text-orange-600',
      title: 'STEALTH COMPRESSION DROP IS LIVE',
      titleAr: 'دفعة تيشيرتات الضغط ستيلث متاحة الآن',
      desc: 'Limited batch restock in Carbon Onyx, Crimson Red, and Electric Cyan.',
      descAr: 'كمية محدودة في الألوان الأسود الكربوني، والأحمر، والسيان.',
      time: '2 hours ago',
      isNewDrop: true
    },
    {
      id: 3,
      type: 'shipping',
      icon: Truck,
      iconColor: 'bg-neutral-100 text-black',
      title: 'FREE EXPRESS DELIVERY ON LE 1000+',
      titleAr: 'شحن سريع مجاني للطلبات فوق 1000 جنيه',
      desc: 'Fast 24 to 48 hours delivery across all Egyptian Governorates.',
      descAr: 'توصيل سريع لكافة المحافظات خلال 24-48 ساعة.',
      time: '1 day ago'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-black text-white">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-red-500" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
              {isArabic ? 'إشعارات سوترة الحصرية' : 'SOTRA Drop Alerts & VIP Offers'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 divide-y divide-neutral-100 max-h-[70vh] overflow-y-auto">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="pt-3 first:pt-0">
                <div className="flex items-start space-x-3">
                  <div className={`p-2.5 rounded-full shrink-0 ${n.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-neutral-950">
                        {isArabic ? n.titleAr : n.title}
                      </h4>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 leading-snug">
                      {isArabic ? n.descAr : n.desc}
                    </p>

                    {n.actionCode && (
                      <button
                        onClick={() => {
                          onApplyPromoCode(n.actionCode);
                          onClose();
                        }}
                        className="mt-2 text-[11px] font-bold text-black bg-neutral-100 hover:bg-black hover:text-white px-2.5 py-1 rounded transition uppercase cursor-pointer flex items-center space-x-1"
                      >
                        <span>Copy &amp; Apply Code</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    {n.isNewDrop && (
                      <button
                        onClick={() => {
                          onShopNewArrivals();
                          onClose();
                        }}
                        className="mt-2 text-[11px] font-bold text-black underline hover:text-red-600 transition cursor-pointer"
                      >
                        Shop Stealth Collection →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
