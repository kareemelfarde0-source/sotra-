import React, { useState, useRef } from 'react';
import {
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  Database,
  Archive,
  FileText
} from 'lucide-react';
import { Product, StoreCategory, OutfitBundle, CustomerOrder } from '../../types';
import { deleteAllOrdersFromFirestore } from '../../firebase/db';

interface AdminBackupTabProps {
  products: Product[];
  categories: StoreCategory[];
  bundles: OutfitBundle[];
  orders: CustomerOrder[];
  onSaveProducts: (products: Product[]) => void;
  onSaveCategories: (categories: StoreCategory[]) => void;
  onSaveBundles: (bundles: OutfitBundle[]) => void;
  onUpdateOrders: (orders: CustomerOrder[]) => void;
  onResetDefaults: () => void;
  isArabic: boolean;
  onNotify: (msg: string) => void;
}

export const AdminBackupTab: React.FC<AdminBackupTabProps> = ({
  products,
  categories,
  bundles,
  orders,
  onSaveProducts,
  onSaveCategories,
  onSaveBundles,
  onUpdateOrders,
  onResetDefaults,
  isArabic,
  onNotify
}) => {
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Export Full JSON Backup
  const handleExportFullBackup = () => {
    const backupData = {
      version: '2.0',
      timestamp: new Date().toISOString(),
      store: 'SOTRA E-Commerce',
      products,
      categories,
      bundles,
      orders,
      settings: {
        wallet: localStorage.getItem('sotra_wallet_settings'),
        shipping: localStorage.getItem('sotra_governorates_rates'),
        support: localStorage.getItem('sotra_support_settings'),
        footer: localStorage.getItem('sotra_footer_settings'),
        promo: localStorage.getItem('sotra_promo_popup')
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.download = `sotra-store-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify(isArabic ? 'تم تصدير النسخة الاحتياطية بنجاح' : 'Full backup exported successfully');
  };

  // 2. Import & Restore JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);

        if (Array.isArray(data.products)) {
          onSaveProducts(data.products);
        }
        if (Array.isArray(data.categories)) {
          onSaveCategories(data.categories);
        }
        if (Array.isArray(data.bundles)) {
          onSaveBundles(data.bundles);
        }
        if (Array.isArray(data.orders)) {
          onUpdateOrders(data.orders);
        }
        if (data.settings) {
          if (data.settings.wallet) localStorage.setItem('sotra_wallet_settings', data.settings.wallet);
          if (data.settings.shipping) localStorage.setItem('sotra_governorates_rates', data.settings.shipping);
          if (data.settings.support) localStorage.setItem('sotra_support_settings', data.settings.support);
          if (data.settings.footer) localStorage.setItem('sotra_footer_settings', data.settings.footer);
          if (data.settings.promo) localStorage.setItem('sotra_promo_popup', data.settings.promo);
        }

        onNotify(isArabic ? 'تم استيراد واستعادة البيانات بالكامل بنجاح' : 'Backup imported & restored successfully');
      } catch {
        alert(isArabic ? 'الملف غير صالح أو تالف!' : 'Invalid backup file format!');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 3. Export Orders to CSV
  const handleExportOrdersCSV = () => {
    if (orders.length === 0) {
      alert(isArabic ? 'لا توجد طلبات للتصدير' : 'No orders to export');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Governorate', 'Address', 'Total (EGP)', 'Payment Method', 'Status'];
    const rows = orders.map((o) => [
      `"${o.orderId}"`,
      `"${o.date}"`,
      `"${(o.customer?.name || '').replace(/"/g, '""')}"`,
      `"${o.customer?.phone || ''}"`,
      `"${o.customer?.governorate || ''}"`,
      `"${(o.customer?.address || '').replace(/"/g, '""')}"`,
      o.total,
      `"${o.paymentMethod}"`,
      `"${o.statusAr || o.status}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sotra-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify(isArabic ? 'تم تصدير ملف الطلبات بصيغة CSV' : 'Orders exported to CSV');
  };

  // 4. Export Products to CSV
  const handleExportProductsCSV = () => {
    const headers = ['Product ID', 'Name Ar', 'Name En', 'Category', 'Original Price', 'Discounted Price', 'In Stock'];
    const rows = products.map((p) => [
      `"${p.id}"`,
      `"${(p.nameAr || p.name).replace(/"/g, '""')}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      p.originalPrice,
      p.discountedPrice,
      p.inStock ? 'Yes' : 'No'
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sotra-products-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify(isArabic ? 'تم تصدير ملف المنتجات بصيغة CSV' : 'Products exported to CSV');
  };

  // 5. Delete Handlers
  const handleDeleteAllOrders = () => {
    const ids = orders.map((o) => o.orderId);
    onUpdateOrders([]);
    localStorage.removeItem('sotra_customer_orders');
    deleteAllOrdersFromFirestore(ids).catch(console.error);
    setConfirmAction(null);
    onNotify(isArabic ? 'تم حذف جميع الطلبات بنجاح' : 'All orders deleted');
  };

  const handleDeleteCancelledOrders = () => {
    const cancelledIds = orders.filter((o) => o.status === 'cancelled').map((o) => o.orderId);
    const filtered = orders.filter((o) => o.status !== 'cancelled');
    onUpdateOrders(filtered);
    localStorage.setItem('sotra_customer_orders', JSON.stringify(filtered));
    deleteAllOrdersFromFirestore(cancelledIds).catch(console.error);
    setConfirmAction(null);
    onNotify(isArabic ? 'تم حذف الطلبات الملغاة بنجاح' : 'Cancelled orders deleted');
  };

  const handleClearCustomers = () => {
    localStorage.removeItem('sotra_saved_customer_profile');
    localStorage.removeItem('sotra_customers_database');
    setConfirmAction(null);
    onNotify(isArabic ? 'تم مسح بيانات العملاء المحفوظة' : 'Customer database cleared');
  };

  return (
    <div className="space-y-6">
      {/* 1. Backup & Restore Section */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 shadow-xs">
        <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3 mb-4">
          <Database className="w-5 h-5 text-neutral-800" />
          <h3 className="text-sm font-bold text-neutral-900">
            {isArabic ? 'النسخ الاحتياطي الشامل واستعادة البيانات' : 'Full Backup & System Restore'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export Full Backup */}
          <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1.5">
                <Download className="w-4 h-4 text-black" />
                <h4 className="font-bold text-xs text-neutral-900">
                  {isArabic ? 'تصدير نسخة احتياطية كاملة (JSON)' : 'Export Full Store Backup'}
                </h4>
              </div>
              <p className="text-[11px] text-neutral-600 mb-4">
                {isArabic
                  ? 'تحميل ملف JSON يحتوي على جميع المنتجات، الأقسام، الطلبات، الإعدادات، والبيانات الحالية للمتجر.'
                  : 'Download complete store data as a JSON file including products, orders, categories and settings.'}
              </p>
            </div>
            <button
              onClick={handleExportFullBackup}
              className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded flex items-center justify-center space-x-2 rtl:space-x-reverse transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isArabic ? 'تحميل النسخة الاحتياطية' : 'Download Backup File'}</span>
            </button>
          </div>

          {/* Import Backup */}
          <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1.5">
                <Upload className="w-4 h-4 text-black" />
                <h4 className="font-bold text-xs text-neutral-900">
                  {isArabic ? 'استيراد واستعادة نسخة احتياطية' : 'Restore from Backup File'}
                </h4>
              </div>
              <p className="text-[11px] text-neutral-600 mb-4">
                {isArabic
                  ? 'اختر ملف نسخة احتياطية سبق تصديره (.json) لاستعادة كافة البيانات إلى حالتها السابقة.'
                  : 'Select a previously exported JSON backup file to restore all store state.'}
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 text-xs font-bold rounded flex items-center justify-center space-x-2 rtl:space-x-reverse transition cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{isArabic ? 'رفع واستعادة ملف (.json)' : 'Upload & Restore File'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CSV Exports Section */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4 sm:p-6 shadow-xs">
        <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-neutral-100 pb-3 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
          <h3 className="text-sm font-bold text-neutral-900">
            {isArabic ? 'تصدير الجداول والتقارير (Excel / CSV)' : 'Export Reports & Data (CSV / Excel)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleExportOrdersCSV}
            className="p-3.5 border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 rounded-lg text-left rtl:text-right flex items-center justify-between transition cursor-pointer"
          >
            <div>
              <span className="text-xs font-bold text-emerald-950 block">
                {isArabic ? 'تصدير سجل الطلبات (Orders CSV)' : 'Export Orders to CSV'}
              </span>
              <span className="text-[11px] text-emerald-800 block mt-0.5">
                {isArabic ? `إجمالي ${orders.length} طلب مع كامل تفاصيل العملاء والشحن` : `Total ${orders.length} orders`}
              </span>
            </div>
            <Download className="w-4 h-4 text-emerald-700 shrink-0" />
          </button>

          <button
            onClick={handleExportProductsCSV}
            className="p-3.5 border border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-lg text-left rtl:text-right flex items-center justify-between transition cursor-pointer"
          >
            <div>
              <span className="text-xs font-bold text-blue-950 block">
                {isArabic ? 'تصدير كتالوج المنتجات (Products CSV)' : 'Export Products to CSV'}
              </span>
              <span className="text-[11px] text-blue-800 block mt-0.5">
                {isArabic ? `إجمالي ${products.length} منتج بالأسعار والأقسام` : `Total ${products.length} products`}
              </span>
            </div>
            <Download className="w-4 h-4 text-blue-700 shrink-0" />
          </button>
        </div>
      </div>

      {/* 3. Data Deletion & Purge Section */}
      <div className="bg-white border border-red-200 rounded-lg p-4 sm:p-6 shadow-xs">
        <div className="flex items-center space-x-2 rtl:space-x-reverse border-b border-red-100 pb-3 mb-4 text-red-700">
          <Trash2 className="w-5 h-5" />
          <h3 className="text-sm font-bold">
            {isArabic ? 'خيارات الحذف والتنظيف وإعادة التعيين' : 'Data Cleanup & Deletion Controls'}
          </h3>
        </div>

        <div className="space-y-3">
          {/* Delete All Orders */}
          <div className="p-3 border border-neutral-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-neutral-900 block">
                {isArabic ? 'حذف كافة سجلات الطلبات (Clear Orders)' : 'Delete All Orders'}
              </span>
              <span className="text-[11px] text-neutral-500 block">
                {isArabic ? 'سيتم مسح جميع الطلبات الحالية نهائياً من الذاكرة' : 'Permanently remove all orders from storage'}
              </span>
            </div>
            <button
              onClick={() => setConfirmAction('delete_all_orders')}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded border border-red-200 transition cursor-pointer"
            >
              {isArabic ? 'حذف جميع الطلبات' : 'Delete All Orders'}
            </button>
          </div>

          {/* Delete Cancelled Orders Only */}
          <div className="p-3 border border-neutral-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-neutral-900 block">
                {isArabic ? 'حذف الطلبات الملغاة فقط (Purge Cancelled)' : 'Purge Cancelled Orders Only'}
              </span>
              <span className="text-[11px] text-neutral-500 block">
                {isArabic ? 'تنظيف الأرشيف من الطلبات الملغاة لتخفيف المساحة' : 'Remove cancelled orders to clean archive'}
              </span>
            </div>
            <button
              onClick={() => setConfirmAction('delete_cancelled_orders')}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded border border-neutral-300 transition cursor-pointer"
            >
              {isArabic ? 'حذف الملغاة فقط' : 'Purge Cancelled'}
            </button>
          </div>

          {/* Clear Saved Customers */}
          <div className="p-3 border border-neutral-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-neutral-900 block">
                {isArabic ? 'مسح بيانات العملاء المحفوظة' : 'Clear Customer Data'}
              </span>
              <span className="text-[11px] text-neutral-500 block">
                {isArabic ? 'مسح سجلات أرقام هواتف وعناوين العملاء المسجلة محلياً' : 'Remove cached customer addresses and profiles'}
              </span>
            </div>
            <button
              onClick={() => setConfirmAction('clear_customers')}
              className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded border border-neutral-300 transition cursor-pointer"
            >
              {isArabic ? 'مسح بيانات العملاء' : 'Clear Customers'}
            </button>
          </div>

          {/* Reset Store to Defaults */}
          <div className="p-3 border border-amber-300 bg-amber-50/40 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-amber-950 block">
                {isArabic ? 'استعادة ضبط المصنع للمتجر (Reset Store to Defaults)' : 'Reset Store to Default Products'}
              </span>
              <span className="text-[11px] text-amber-800 block">
                {isArabic ? 'إعادة المنتجات والأقسام الافتراضية الأصلية لعلامة سوترة' : 'Restore original SOTRA default product catalog'}
              </span>
            </div>
            <button
              onClick={() => setConfirmAction('reset_defaults')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded transition cursor-pointer"
            >
              {isArabic ? 'استعادة الضبط الأصلي' : 'Reset to Defaults'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-5 space-y-4 shadow-2xl border border-neutral-200">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-bold text-sm text-neutral-900">
                {isArabic ? 'تأكيد الإجراء المطلوب' : 'Confirm Action'}
              </h4>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {confirmAction === 'delete_all_orders' && (isArabic ? 'هل أنت متأكد من حذف جميع الطلبات؟ لا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to delete all orders?')}
              {confirmAction === 'delete_cancelled_orders' && (isArabic ? 'هل تريد حذف جميع الطلبات ذات الحالة "ملغي"؟' : 'Purge all cancelled orders?')}
              {confirmAction === 'clear_customers' && (isArabic ? 'هل تريد مسح بيانات العملاء المسجلة؟' : 'Clear customer database?')}
              {confirmAction === 'reset_defaults' && (isArabic ? 'هل أنت متأكد من استعادة بيانات المتجر الافتراضية؟' : 'Reset store to factory defaults?')}
            </p>
            <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs font-bold rounded cursor-pointer"
              >
                {isArabic ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  if (confirmAction === 'delete_all_orders') handleDeleteAllOrders();
                  if (confirmAction === 'delete_cancelled_orders') handleDeleteCancelledOrders();
                  if (confirmAction === 'clear_customers') handleClearCustomers();
                  if (confirmAction === 'reset_defaults') {
                    onResetDefaults();
                    setConfirmAction(null);
                    onNotify(isArabic ? 'تمت استعادة بيانات المتجر الأصلية' : 'Store reset to defaults');
                  }
                }}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer"
              >
                {isArabic ? 'تأكيد الحذف' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
