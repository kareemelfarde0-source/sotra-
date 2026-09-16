import { OutfitBundle } from '../types';

export const OUTFIT_BUNDLES: OutfitBundle[] = [
  {
    id: 'bundle-stealth-compression-kit',
    name: 'Stealth Fitted Tee & Shorts Outfit Set',
    nameAr: 'طقم ملابس ستيلث كامل (تيشيرت سليم + شورت قطني)',
    tagline: 'Sleek fitted stretch tee paired with our bestselling 5.5" essential cotton shorts.',
    taglineAr: 'تيشيرت سليم فيت مريح وناعم مع شورت قطني فاخر 5.5 إنش لإطلالة صيفية متكاملة.',
    description: 'The definitive modern apparel set. Engineered for clean lines, lightweight breathability, and unrestricted everyday comfort.',
    descriptionAr: 'طقم ملابس متناسق وعالي الجودة، يمنحك مظهراً عصرياً جذاباً مع خامات قطنية ناعمة ومريحة طوال اليوم.',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop'
    ],
    productIds: [
      'sotra-stealth-compression-tee-01',
      'sotra-essential-cotton-shorts-01'
    ],
    originalPrice: 1270,
    bundlePrice: 999,
    discountPercent: 25,
    badge: 'BEST VALUE',
    badgeAr: 'الأكثر توفيراً'
  },
  {
    id: 'bundle-streetwear-oversized-sweatpants',
    name: 'Rival Oversized Tee & Track Sweatpants Set',
    nameAr: 'طقم ستريت وير (تيشيرت راجلان + سويت بانتس خطين)',
    tagline: 'Heavyweight oversized raglan tee paired with luxe double-stripe sweatpants.',
    taglineAr: 'تيشيرت أوفرسايز راجلان ثقيل مع بنطال سويت بانتس مخطط فائق النعومة.',
    description: 'Designed for the ultimate casual streetwear drape. Made from 100% heavy combed French terry cotton with rich contrasting textures.',
    descriptionAr: 'طقم ملابس أنيق متكامل للخروج الكاجوال اليومي. خامات قطنية مصرية 100% ثقيلة وفاخرة تمنحك إطلالة فريدة.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=900&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=900&auto=format&fit=crop'
    ],
    productIds: [
      'sotra-rival-oversized-tee-02',
      'sotra-essential-stripe-sweatpants-01'
    ],
    originalPrice: 1640,
    bundlePrice: 1390,
    discountPercent: 20,
    badge: 'MOST POPULAR',
    badgeAr: 'الأعلى طلباً'
  },
  {
    id: 'bundle-beast-tank-camo-shorts',
    name: 'Casual Tank & Jacquard Camo Shorts Set',
    nameAr: 'طقم تانك صيفي وشورت جاكار مموه',
    tagline: 'Deep cut bio-cotton casual tank top combined with lightweight stealth jacquard camo shorts.',
    taglineAr: 'تانك قطني كاجوال مريح للأجواء الحارة مع شورت جاكار مموه أنيق وخفيف.',
    description: 'Pure effortless summer comfort. The breathable tank and lightweight jacquard camo tech shorts keep you cool all day long.',
    descriptionAr: 'تصميم صيفي أنيق يمنحك تهوية مثالية وإطلالة كاجوال مريحة مع شورت خفيف سريع الجفاف.',
    image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=900&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop'
    ],
    productIds: [
      'sotra-rival-oversized-tank-01',
      'sotra-stealth-jacquard-shorts-01'
    ],
    originalPrice: 1230,
    bundlePrice: 890,
    discountPercent: 28,
    badge: 'HOT BUNDLE',
    badgeAr: 'عرض خاص'
  }
];
