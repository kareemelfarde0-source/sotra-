export const SOTRA_WHATSAPP_PHONE = '201068989523';
export const SOTRA_WHATSAPP_DISPLAY = '+20 10 68989523';

export interface WhatsAppSupportMessageParams {
  phone?: string;
  name?: string;
  orderId?: string;
  type?: 'مشكلة' | 'استفسار' | 'problem' | 'inquiry' | string;
  details?: string;
  isArabic?: boolean;
}

export function buildWhatsAppSupportUrl(params: WhatsAppSupportMessageParams = {}): string {
  const isAr = params.isArabic !== false;
  const name = params.name?.trim() || '';
  const order = params.orderId?.trim() || '';
  const type = params.type || (isAr ? 'استفسار' : 'Inquiry');
  const details = params.details?.trim() || '';
  const targetPhone = params.phone?.replace(/[^0-9]/g, '') || SOTRA_WHATSAPP_PHONE;

  let message = '';
  if (isAr) {
    message = `مرحباً خدمة عملاء سوترة (SOTRA Fashion) 👋\n`;
    message += `• الاسم: ${name || '[اكتب اسمك هنا]'}\n`;
    message += `• رقم الطلب: ${order || '[رقم الطلب إن وجد]'}\n`;
    message += `• نوع الرسالة: ${type} (مشكلة / استفسار)\n`;
    if (details) {
      message += `• التفاصيل: ${details}`;
    } else {
      message += `• التفاصيل: [اكتب تفاصيل الاستفسار أو المشكلة هنا]`;
    }
  } else {
    message = `Hello SOTRA Fashion Customer Support 👋\n`;
    message += `• Name: ${name || '[Your Name]'}\n`;
    message += `• Order ID: ${order || '[Order # if applicable]'}\n`;
    message += `• Request Type: ${type} (Problem / Inquiry)\n`;
    if (details) {
      message += `• Details: ${details}`;
    } else {
      message += `• Details: [Describe your inquiry or issue here]`;
    }
  }

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}
