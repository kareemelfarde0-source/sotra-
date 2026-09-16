import React, { useState, useMemo } from 'react';
import { Search, UserCheck, Phone, MapPin, ShoppingBag, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import { CustomerOrder } from '../../types';

interface AdminCustomersTabProps {
  orders: CustomerOrder[];
  isArabic: boolean;
}

interface AggregatedCustomer {
  phone: string;
  whatsapp: string;
  name: string;
  governorate: string;
  address: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  lastOrderStatus: string;
  lastOrderId: string;
}

export const AdminCustomersTab: React.FC<AdminCustomersTabProps> = ({ orders, isArabic }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregate unique customers from orders
  const customers = useMemo(() => {
    const map = new Map<string, AggregatedCustomer>();

    orders.forEach((order) => {
      const key = order.customer.phone || order.customer.whatsapp || order.customer.name;
      if (!key) return;

      const existing = map.get(key);
      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpent += order.total;
        // Keep latest address/info
        existing.governorate = order.customer.governorate || existing.governorate;
        existing.address = order.customer.address || existing.address;
        existing.whatsapp = order.customer.whatsapp || existing.whatsapp;
      } else {
        map.set(key, {
          phone: order.customer.phone,
          whatsapp: order.customer.whatsapp || order.customer.phone,
          name: order.customer.name,
          governorate: order.customer.governorate,
          address: order.customer.address,
          ordersCount: 1,
          totalSpent: order.total,
          lastOrderDate: order.date,
          lastOrderStatus: order.statusAr || order.status,
          lastOrderId: order.orderId
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.whatsapp.includes(q) ||
        c.governorate.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }, [customers, searchQuery]);

  // Overall metrics
  const totalCustomers = customers.length;
  const totalSpendAll = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpendPerCustomer = totalCustomers > 0 ? Math.round(totalSpendAll / totalCustomers) : 0;

  return (
    <div className="space-y-5">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <div>
          <h3 className="text-base font-black uppercase tracking-wider text-neutral-950 font-heading">
            {isArabic ? 'قسم العملاء والطلبات المسجلة' : 'Customer Registry & Order History'}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            {isArabic
              ? 'سجل كافة العملاء الذين أتموا طلبات مع إجمالي مشترياتهم وتواصل مباشر عبر واتساب'
              : 'Directory of all customers who completed orders with spend totals and direct chat.'}
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">
            {isArabic ? 'إجمالي العملاء المسجلين' : 'Total Customers'}
          </span>
          <span className="text-2xl font-black text-neutral-950">{totalCustomers}</span>
        </div>
        <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">
            {isArabic ? 'إجمالي المبيعات المحققة' : 'Total Customer Spend'}
          </span>
          <span className="text-2xl font-black text-green-700">{totalSpendAll.toLocaleString()} ج.م</span>
        </div>
        <div className="p-3.5 bg-neutral-50 rounded-lg border border-neutral-200">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">
            {isArabic ? 'متوسط قيمة العميل' : 'Avg Customer Value'}
          </span>
          <span className="text-2xl font-black text-neutral-950">{avgSpendPerCustomer.toLocaleString()} ج.م</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-2.5 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder={
            isArabic
              ? 'بحث باسم العميل، الهاتف، الواتساب، أو المحافظة والعنوان...'
              : 'Search customer name, phone, whatsapp, governorate...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 bg-neutral-50 border border-neutral-300 rounded text-xs font-semibold focus:outline-none focus:border-black"
        />
      </div>

      {/* Customers List */}
      {filteredCustomers.length === 0 ? (
        <div className="py-14 text-center border-2 border-dashed border-neutral-200 rounded-lg p-8">
          <UserCheck className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-neutral-700">
            {isArabic ? 'لا يوجد عملاء مسجلين حالياً' : 'No registered customers found'}
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            {isArabic
              ? 'عند قيام أي عميل بطلب أوردر، سيتم حفظ بياناته تلقائياً هنا في السجل'
              : 'Customers will automatically be indexed here upon completing their first order'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCustomers.map((cust, idx) => {
            const cleanPhone = cust.whatsapp.replace(/\D/g, '');
            const waPhone = cleanPhone.startsWith('0') ? `2${cleanPhone}` : cleanPhone;

            return (
              <div
                key={idx}
                className="p-4 bg-white border border-neutral-200 rounded-lg shadow-xs hover:border-neutral-400 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Info Block */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="font-black text-sm text-neutral-950 font-heading">
                      {cust.name}
                    </span>
                    <span className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                      {cust.ordersCount} {isArabic ? 'طلبات' : 'orders'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                    <span className="flex items-center space-x-1 rtl:space-x-reverse font-mono font-bold">
                      <Phone className="w-3 h-3 text-neutral-400" />
                      <span>{cust.phone}</span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>
                        <strong>{cust.governorate}</strong>: {cust.address}
                      </span>
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-500 flex items-center space-x-2 rtl:space-x-reverse">
                    <span>آخر طلب: {cust.lastOrderDate} (حالة: {cust.lastOrderStatus})</span>
                    <span>•</span>
                    <span>كود الطلب: #{cust.lastOrderId}</span>
                  </div>
                </div>

                {/* Spend & Action */}
                <div className="flex items-center justify-between md:justify-end space-x-4 rtl:space-x-reverse border-t md:border-t-0 pt-2 md:pt-0 border-neutral-100 shrink-0">
                  <div className="text-right rtl:text-left">
                    <span className="text-[10px] text-neutral-400 font-bold block uppercase">
                      {isArabic ? 'إجمالي المشتريات' : 'Total Spend'}
                    </span>
                    <span className="font-black text-base text-green-700 font-heading">
                      {cust.totalSpent.toLocaleString()} ج.م
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                      isArabic
                        ? `مرحباً أستاذ ${cust.name}، معك خدمة عملاء سوترة SOTRA. نأمل أن تكون تجربتك مع منتجاتنا ممتازة!`
                        : `Hello ${cust.name}, this is SOTRA Customer Support. We hope you're enjoying your order!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition flex items-center space-x-1.5 rtl:space-x-reverse shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'مراسلة واتساب' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
