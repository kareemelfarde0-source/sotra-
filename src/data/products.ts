import { Product, UserReview } from '../types';
import { PRODUCT_ARABIC_DATA } from './translations';

const RAW_PRODUCTS: Product[] = [
  {
    id: 'sotra-stealth-compression-tee-01',
    name: 'STEALTH SLIM FIT APPAREL TEE',
    fit: 'Slim Fit',
    category: 'compressions',
    originalPrice: 690,
    discountedPrice: 620,
    discountPercent: 10,
    badge: 'HOT',
    rating: 4.8,
    reviewCount: 39,
    description: 'Engineered with soft premium stretch fabric and laser-cut micro-mesh airflow zones across the chest and upper back for ultimate all-day comfort and sleek style.',
    fabric: '85% Ultra-Soft Performance Fabric, 15% Elastane Spandex with 4-Way Stretch.',
    modelInfo: 'Model is 184 cm (6\'0") tall, 84 kg, wearing size L.',
    features: [
      'Contoured geometric seamlines for an elegant silhouette',
      'Laser-perforated chest & back temperature regulation',
      'Anti-chafing flatlock stitching for zero friction',
      'Silicone waist grip band to keep the tee in place',
      'SOTRA Stealth reflective chest insignia'
    ],
    careInstructions: [
      'Machine wash cold (30°C) with like colors',
      'Do not use fabric softeners',
      'Hang dry only — do not tumble dry',
      'Do not iron over print'
    ],
    colors: [
      {
        id: 'c-black-cyan',
        name: 'Jet Black / Ice Cyan',
        hex: '#111827',
        borderHex: '#38bdf8',
        images: [
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-black-red',
        name: 'Jet Black / Crimson Red',
        hex: '#18181b',
        borderHex: '#ef4444',
        images: [
          'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-crimson',
        name: 'Crimson Red Stealth',
        hex: '#dc2626',
        images: [
          'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-cyan',
        name: 'Cyan Blue Pulse',
        hex: '#06b6d4',
        images: [
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 12 },
      { size: 'L', inStock: true, stockCount: 6 },
      { size: 'XL', inStock: true, stockCount: 2 },
      { size: 'XXL', inStock: false, stockCount: 0 },
      { size: '3XL', inStock: true, stockCount: 5 }
    ]
  },
  {
    id: 'sotra-stealth-compression-tee-02',
    name: 'STEALTH STRETCH TEE (PRO EDITION)',
    fit: 'Slim Fit',
    category: 'compressions',
    originalPrice: 690,
    discountedPrice: 620,
    discountPercent: 10,
    badge: 'HOT',
    rating: 4.7,
    reviewCount: 34,
    description: 'Black carbon texture with chest ventilation matrix. Delivers an elegant silhouette and premium soft touch for everyday apparel styling.',
    fabric: '88% Polyamide Microfiber, 12% Spandex.',
    modelInfo: 'Model is 182 cm (5\'11"), 80 kg, wearing size M.',
    features: [
      'Dual-zone flexible stretch construction',
      'Sweat-wicking HydroFast technology',
      'Seamless collar band',
      'Reinforced armhole joints'
    ],
    careInstructions: ['Hand wash or cold cycle', 'Air dry only'],
    colors: [
      {
        id: 'c-all-black',
        name: 'Carbon Onyx',
        hex: '#09090b',
        images: [
          'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-carbon-red',
        name: 'Carbon Red',
        hex: '#991b1b',
        images: [
          'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-carbon-cyan',
        name: 'Electric Cyan',
        hex: '#0284c7',
        images: [
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 15 },
      { size: 'L', inStock: true, stockCount: 9 },
      { size: 'XL', inStock: true, stockCount: 3 },
      { size: 'XXL', inStock: true, stockCount: 2 },
      { size: '3XL', inStock: false, stockCount: 0 }
    ]
  },
  {
    id: 'sotra-stealth-stripe-sweatpants-01',
    name: 'STEALTH STRIPE SWEATPANTS',
    fit: 'Oversized Fit',
    category: 'bottoms',
    originalPrice: 980,
    discountedPrice: 980,
    badge: 'RESTOCKED',
    rating: 4.9,
    reviewCount: 149,
    description: 'Iconic wide-leg streetwear sweatpants featuring heavy 420 GSM loopback cotton fleece and twin contrast side athletic racing stripes. Cut wide through the thigh and hem for that authentic drape.',
    fabric: '100% Premium Egyptian Heavy Loopback Cotton (420 GSM).',
    modelInfo: 'Model is 186 cm (6\'1"), wearing size L with oversized slouch.',
    features: [
      'Heavyweight 420 GSM drape-lock fabric',
      'Dual clean side sport stripes',
      'Deep side pockets with concealed YKK zippers',
      'Extra-long thick cotton drawcord with matte metal aglets',
      'Wide flared open hem bottom'
    ],
    careInstructions: ['Wash inside out at 30°C', 'Do not tumble dry', 'Iron on reverse'],
    colors: [
      {
        id: 'c-black-white',
        name: 'Pitch Black / White Stripe',
        hex: '#0f172a',
        borderHex: '#ffffff',
        images: [
          'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-slate-grey',
        name: 'Slate Heather Grey',
        hex: '#64748b',
        images: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 5 },
      { size: 'M', inStock: true, stockCount: 10 },
      { size: 'L', inStock: true, stockCount: 14 },
      { size: 'XL', inStock: true, stockCount: 7 },
      { size: 'XXL', inStock: true, stockCount: 4 },
      { size: '3XL', inStock: true, stockCount: 2 }
    ]
  },
  {
    id: 'sotra-rival-oversized-tee-01',
    name: 'RIVAL OVERSIZED RAGLAN TEE',
    fit: 'Oversized Fit',
    category: 'tops',
    originalPrice: 690,
    discountedPrice: 690,
    badge: 'RESTOCKED',
    rating: 4.8,
    reviewCount: 36,
    description: 'The definitive oversized streetwear silhouette. Features dropped shoulder raglan color-block sleeves, heavyweight 280 GSM combed cotton, and high-density SOTRA chest micro-embroidery.',
    fabric: '100% Ring-Spun Egyptian Combed Cotton (280 GSM).',
    modelInfo: 'Model is 185 cm tall, wearing size L for true streetwear relaxed fit.',
    features: [
      'Oversized dropped shoulder raglan cut',
      'Twin needle reinforced seams',
      'Thick 1.25" ribbed crewneck collar (won\'t bacon)',
      'Subtle SOTRA high-density rubberized logo'
    ],
    careInstructions: ['Cold machine wash', 'Low iron', 'Dry flat'],
    colors: [
      {
        id: 'c-black-white-raglan',
        name: 'Jet Black / Snow White Raglan',
        hex: '#0a0a0a',
        borderHex: '#ffffff',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-olive-raglan',
        name: 'Military Olive / Black Raglan',
        hex: '#3f4f38',
        images: [
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-royal-blue',
        name: 'Royal Cobalt Blue / Black Raglan',
        hex: '#1e3a8a',
        images: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-vintage-grey',
        name: 'Vintage Slate / Black',
        hex: '#475569',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-all-white',
        name: 'Pure White / Ice Grey',
        hex: '#f8fafc',
        images: [
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 18 },
      { size: 'L', inStock: true, stockCount: 22 },
      { size: 'XL', inStock: true, stockCount: 11 },
      { size: 'XXL', inStock: true, stockCount: 5 },
      { size: '3XL', inStock: true, stockCount: 3 }
    ]
  },
  {
    id: 'sotra-rival-oversized-tank-01',
    name: 'RIVAL OVERSIZED CASUAL TANK',
    fit: 'Oversized Fit',
    category: 'tanks',
    originalPrice: 620,
    discountedPrice: 520,
    discountPercent: 16,
    badge: 'HOT',
    rating: 4.9,
    reviewCount: 42,
    description: 'Designed for warm-weather casual comfort. Deep drop-armholes allow comfortable airflow and relaxed movement, while maintaining an oversized boxy streetwear drape.',
    fabric: '100% Bio-Washed Combed Cotton (260 GSM).',
    modelInfo: 'Model is 183 cm, 86 kg, wearing size L.',
    features: [
      'Raw cut deep armholes with reinforced finish',
      'Boxy streetwear drop hem',
      'Pre-shrunk organic cotton',
      'SOTRA vertical spine print'
    ],
    careInstructions: ['Wash cold with dark colors', 'Do not bleach', 'Air dry'],
    colors: [
      {
        id: 'c-tank-black',
        name: 'Stealth Black',
        hex: '#171717',
        images: [
          'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-tank-olive',
        name: 'Army Olive',
        hex: '#3f4e3c',
        images: [
          'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-tank-grey',
        name: 'Washed Grey',
        hex: '#6b7280',
        images: [
          'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-tank-white',
        name: 'Off White',
        hex: '#f5f5f4',
        images: [
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 9 },
      { size: 'XL', inStock: true, stockCount: 5 },
      { size: 'XXL', inStock: false, stockCount: 0 },
      { size: '3XL', inStock: true, stockCount: 2 }
    ]
  },
  {
    id: 'sotra-rival-oversized-tee-02',
    name: 'RIVAL OVERSIZED TEE (SEASON 2)',
    fit: 'Oversized Fit',
    category: 'tops',
    originalPrice: 690,
    discountedPrice: 650,
    discountPercent: 5,
    rating: 4.8,
    reviewCount: 28,
    description: 'Updated with contrast neck ribbing and extra boxy drape. Structured heavyweight cotton that keeps its shape all day.',
    fabric: '100% Heavy Combed Cotton.',
    modelInfo: 'Model is 185 cm, wearing size L.',
    features: ['Raglan dual-tone sleeves', 'Heavyweight collar', 'Breathable weave'],
    careInstructions: ['Machine wash 30°C', 'Hang dry'],
    colors: [
      {
        id: 'c-b-w-2',
        name: 'Black / Off White',
        hex: '#111827',
        borderHex: '#f3f4f6',
        images: [
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-forest-2',
        name: 'Forest Sage',
        hex: '#1e392a',
        images: [
          'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-blue-2',
        name: 'Navy Cobalt',
        hex: '#172554',
        images: [
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 7 },
      { size: 'M', inStock: true, stockCount: 16 },
      { size: 'L', inStock: true, stockCount: 20 },
      { size: 'XL', inStock: true, stockCount: 8 },
      { size: 'XXL', inStock: true, stockCount: 4 },
      { size: '3XL', inStock: true, stockCount: 1 }
    ]
  },
  {
    id: 'sotra-essential-cotton-shorts-01',
    name: 'ESSENTIAL HEAVYWEIGHT COTTON SHORTS',
    fit: 'Athletic Fit',
    category: 'bottoms',
    originalPrice: 650,
    discountedPrice: 550,
    discountPercent: 15,
    badge: 'HOT',
    rating: 4.9,
    reviewCount: 87,
    description: 'The ultimate 5.5" inseam lifestyle cotton shorts. Built with premium mid-weight French terry cotton with zero restriction and deep zippered pockets.',
    fabric: '95% Compact Cotton, 5% Spandex Terry (320 GSM).',
    modelInfo: 'Model is 184 cm, 85 kg, wearing size L.',
    features: [
      'Comfortable 5.5-inch inseam',
      'Dual deep zip side pockets for secure phone storage',
      'Split side hem for effortless mobility',
      'SOTRA minimal embroidered thigh branding'
    ],
    careInstructions: ['Machine wash cold', 'Tumble dry low or air dry'],
    colors: [
      {
        id: 'c-short-black',
        name: 'Pitch Black',
        hex: '#0a0a0a',
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-short-teal',
        name: 'Deep Sea Teal',
        hex: '#115e59',
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-short-plum',
        name: 'Vintage Plum',
        hex: '#701a75',
        images: [
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-short-mocha',
        name: 'Mocha Taupe',
        hex: '#78350f',
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-short-white',
        name: 'Pure Chalk White',
        hex: '#fafafa',
        images: [
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 9 },
      { size: 'M', inStock: true, stockCount: 25 },
      { size: 'L', inStock: true, stockCount: 30 },
      { size: 'XL', inStock: true, stockCount: 15 },
      { size: 'XXL', inStock: true, stockCount: 8 },
      { size: '3XL', inStock: true, stockCount: 3 }
    ]
  },
  {
    id: 'sotra-essential-stripe-sweatpants-01',
    name: 'ESSENTIAL STRIPE SWEATPANTS',
    fit: 'Relaxed Fit',
    category: 'bottoms',
    originalPrice: 950,
    discountedPrice: 950,
    badge: 'NEW',
    rating: 5.0,
    reviewCount: 19,
    description: 'Luxe streetwear sweatpants in rich seasonal colors. Features double contrast side piping, roomy thigh taper, and custom brushed cotton interior for all-day comfort.',
    fabric: '80% Combed Cotton, 20% Polyester Fleece (380 GSM).',
    modelInfo: 'Model is 185 cm, wearing size L.',
    features: ['Double side stripes', 'Deep fleece pockets', 'Elastic waistband with cord', 'Flared drape'],
    careInstructions: ['Cold wash', 'Do not iron print'],
    colors: [
      {
        id: 'c-sw-maroon',
        name: 'Deep Wine Burgundy',
        hex: '#881337',
        borderHex: '#ffffff',
        images: [
          'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=900&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-sw-green',
        name: 'Botanical Forest Green',
        hex: '#14532d',
        images: [
          'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-sw-black',
        name: 'Midnight Black',
        hex: '#0a0a0a',
        images: [
          'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-sw-blue',
        name: 'Deep Indigo Blue',
        hex: '#1e3a8a',
        images: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 5 },
      { size: 'M', inStock: true, stockCount: 12 },
      { size: 'L', inStock: true, stockCount: 16 },
      { size: 'XL', inStock: true, stockCount: 9 },
      { size: 'XXL', inStock: true, stockCount: 3 },
      { size: '3XL', inStock: true, stockCount: 2 }
    ]
  },
  {
    id: 'sotra-essential-cotton-shorts-02',
    name: 'ESSENTIAL COTTON SHORTS (V2)',
    fit: 'Athletic Fit',
    category: 'bottoms',
    originalPrice: 650,
    discountedPrice: 520,
    discountPercent: 20,
    badge: 'HOT',
    rating: 5.0,
    reviewCount: 3,
    description: 'Clean minimalist cotton shorts in pure lifestyle colorways. Fitted waist with expandable stretch for effortless everyday wear.',
    fabric: '100% Terry Combed Cotton.',
    modelInfo: 'Model is 182 cm, 82 kg wearing M.',
    features: ['5.5" Inseam', 'Zipped back key pocket', 'Reinforced waistband'],
    careInstructions: ['Machine wash 30°C'],
    colors: [
      {
        id: 'c-sh2-teal',
        name: 'Ocean Teal',
        hex: '#0f766e',
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-sh2-white',
        name: 'Chalk White',
        hex: '#f8fafc',
        images: [
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-sh2-purple',
        name: 'Berry Purple',
        hex: '#581c87',
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 14 },
      { size: 'L', inStock: true, stockCount: 18 },
      { size: 'XL', inStock: true, stockCount: 8 },
      { size: 'XXL', inStock: true, stockCount: 2 },
      { size: '3XL', inStock: false, stockCount: 0 }
    ]
  },
  {
    id: 'sotra-stealth-jacquard-shorts-01',
    name: 'STEALTH JACQUARD CAMO SHORTS',
    fit: 'Athletic Fit',
    category: 'bottoms',
    originalPrice: 780,
    discountedPrice: 450,
    discountPercent: 42,
    badge: 'HOT',
    rating: 4.7,
    reviewCount: 52,
    description: 'Subtle tone-on-tone jacquard camo weave with quick-dry moisture management. Featherweight construction designed for warm-weather daily comfort.',
    fabric: '90% Tech Polyester, 10% Elastane.',
    modelInfo: 'Model is 185 cm, wearing size L.',
    features: ['Jacquard stealth camo pattern', 'Heat-sealed zip pockets', 'Reflective SOTRA icon'],
    careInstructions: ['Cold wash', 'Fast drying'],
    colors: [
      {
        id: 'c-camo-black',
        name: 'Black Camo Jacquard',
        hex: '#1c1917',
        images: [
          'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-camo-grey',
        name: 'Shadow Grey Camo',
        hex: '#78716c',
        images: [
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 11 },
      { size: 'L', inStock: true, stockCount: 15 },
      { size: 'XL', inStock: true, stockCount: 6 },
      { size: 'XXL', inStock: false, stockCount: 0 },
      { size: '3XL', inStock: true, stockCount: 2 }
    ]
  },
  {
    id: 'sotra-acid-wash-hoodie-01',
    name: 'HEAVYWEIGHT OVERSIZED HOODIE',
    fit: 'Oversized Fit',
    category: 'tops',
    originalPrice: 1250,
    discountedPrice: 1050,
    discountPercent: 16,
    badge: 'NEW',
    rating: 4.9,
    reviewCount: 63,
    description: '500 GSM ultra-heavyweight brushed fleece hoodie. Designed with a double-layered structured hood, no drawstrings for clean aesthetic, and dropped shoulders.',
    fabric: '100% Heavy Egyptian Fleece Cotton (500 GSM).',
    modelInfo: 'Model is 186 cm, 88 kg wearing L.',
    features: ['Double-layer crossover hood', 'Hidden kangaroo pocket', 'Thick ribbed cuffs and hem'],
    careInstructions: ['Dry clean or cold gentle wash inside out'],
    colors: [
      {
        id: 'c-hoodie-charcoal',
        name: 'Washed Charcoal',
        hex: '#27272a',
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-hoodie-black',
        name: 'Pitch Black',
        hex: '#09090b',
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'S', inStock: true, stockCount: 3 },
      { size: 'M', inStock: true, stockCount: 8 },
      { size: 'L', inStock: true, stockCount: 12 },
      { size: 'XL', inStock: true, stockCount: 9 },
      { size: 'XXL', inStock: true, stockCount: 4 },
      { size: '3XL', inStock: true, stockCount: 2 }
    ]
  },
  {
    id: 'sotra-duffle-bag-01',
    name: 'STEALTH APPAREL DUFFLE TRAVEL BAG (45L)',
    fit: 'Regular Fit',
    category: 'accessories',
    originalPrice: 1100,
    discountedPrice: 890,
    discountPercent: 20,
    badge: 'BESTSELLER',
    rating: 5.0,
    reviewCount: 94,
    description: 'Water-resistant ballistic matte nylon travel duffle bag with isolated ventilated shoe tunnel, organizer compartments, and padded shoulder harness.',
    fabric: '1680D Ballistic Matte Tech-Nylon.',
    modelInfo: '45L Capacity (55cm x 30cm x 28cm).',
    features: ['Ventilated shoe pocket', 'Waterproof zippers', 'Laptop / tablet sleeve', 'SOTRA metal badges'],
    careInstructions: ['Wipe clean with damp cloth'],
    colors: [
      {
        id: 'c-duffle-black',
        name: 'Matte All Black',
        hex: '#0a0a0a',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'L', inStock: true, stockCount: 28 }
    ]
  },
  {
    id: 'sotra-socks-pack-01',
    name: 'SOTRA APPAREL CREW SOCKS (3-PACK)',
    fit: 'Regular Fit',
    category: 'accessories',
    originalPrice: 280,
    discountedPrice: 250,
    discountPercent: 10,
    badge: 'NEW',
    rating: 4.9,
    reviewCount: 112,
    description: 'Thick cushioned arch-support athletic crew socks with high-density SOTRA jacquard branding. Maximum comfort for sneakers and daily casual wear.',
    fabric: '80% Combed Cotton, 17% Polyamide, 3% Elastane.',
    modelInfo: 'One size fits all (EU 40-46 / US 7-12).',
    features: ['Ribbed leg compression', 'Reinforced toe & heel cushion', 'Arch compression band'],
    careInstructions: ['Machine wash warm'],
    colors: [
      {
        id: 'c-socks-white',
        name: 'Triple Crisp White',
        hex: '#ffffff',
        borderHex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=900&auto=format&fit=crop'
        ]
      },
      {
        id: 'c-socks-black',
        name: 'Triple Stealth Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=900&auto=format&fit=crop'
        ]
      }
    ],
    sizes: [
      { size: 'L', inStock: true, stockCount: 50 }
    ]
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'all',
    name: 'All Products',
    nameAr: 'كل المنتجات',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    count: 15
  },
  {
    id: 'tops',
    name: 'Tshirts & Tops',
    nameAr: 'تيشيرتات وتوبات',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    count: 5
  },
  {
    id: 'compressions',
    name: 'Compressions',
    nameAr: 'ملابس ضاغطة',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
    count: 3
  },
  {
    id: 'tanks',
    name: 'Tanks & Sleeveless',
    nameAr: 'ملابس كت وتانك',
    image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=800&auto=format&fit=crop',
    count: 2
  },
  {
    id: 'bottoms',
    name: 'Pants & Shorts',
    nameAr: 'بناطيل وشورتات كاجوال',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    count: 5
  },
  {
    id: 'accessories',
    name: 'Bags & Accessories',
    nameAr: 'حقائب واكسسوارات',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    count: 2
  }
];

export const MOCK_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    author: 'Omar El-Sayed',
    verified: true,
    rating: 5,
    date: '2 days ago',
    sizeBought: 'L',
    colorBought: 'Jet Black / Ice Cyan',
    title: 'The fit on this apparel tee is insane!',
    comment: 'Honestly better than global designer brands. The chest contour lines accentuate the upper body cleanly and the drape is flawless. SOTRA clothing quality is top tier.',
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    author: 'Youssef Mansour',
    verified: true,
    rating: 5,
    date: '5 days ago',
    sizeBought: 'XL',
    colorBought: 'Pitch Black / White Stripe',
    title: 'Sweatpants drape perfectly over chunky sneakers',
    comment: 'Heavy French terry cotton with that real heavyweight feel. Delivered in Cairo within 24 hours. Ordered 2 more pairs right away.',
    helpfulCount: 19
  },
  {
    id: 'rev-3',
    author: 'Ahmed Farouk',
    verified: true,
    rating: 5,
    date: '1 week ago',
    sizeBought: 'M',
    colorBought: 'Stealth Black Tank',
    title: 'Best casual lifestyle tank in Egypt',
    comment: 'The deep arm cuts give maximum airflow and freedom, and the fabric is breathable bio-cotton. Looks so aesthetic with cargo pants or shorts.',
    helpfulCount: 15
  }
];

export const PRODUCT_PROMO_BANNERS: Record<string, import('../types').ProductPromoBanner> = {
  'sotra-stealth-compression-tee-01': {
    id: 'banner-stealth-kit',
    title: 'Stealth Fitted Tee & Shorts Set',
    titleAr: 'طقم ملابس ستيلث كامل (تيشيرت + شورت قطني)',
    subtitle: 'Get full matching outfit with 25% bundle discount',
    subtitleAr: 'احصل على طقم الملابس كاملاً مع خصم 25% واختيار المقاس لكل قطعة',
    badge: 'OUTFIT BUNDLE',
    badgeAr: 'طقم ملابس متناسق',
    discountBadge: 'SAVE 25%',
    discountBadgeAr: 'توفير 25%',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-stealth-compression-kit',
    buttonText: 'Customize & Add Bundle',
    buttonTextAr: 'تخصيص وإضافة الطقم كاملاً'
  },
  'sotra-stealth-compression-tee-02': {
    id: 'banner-stealth-pro-kit',
    title: 'Stealth Pro Set (Stretch Tee + Shorts)',
    titleAr: 'طقم سوترة برو (تيشيرت مطاطي + شورت قطني)',
    subtitle: 'High-stretch fitted top + 5.5" cotton shorts',
    subtitleAr: 'نسق مظهرك اليومي الأنيق ووفر 25% فورياً مع اختيار المقاسات',
    badge: 'MATCHING SET',
    badgeAr: 'طقم متناسق',
    discountBadge: 'SAVE 25%',
    discountBadgeAr: 'خصم 25%',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-stealth-compression-kit',
    buttonText: 'Choose Sizes & Add Set',
    buttonTextAr: 'اختيار المقاسات وإضافة الطقم'
  },
  'sotra-stealth-stripe-sweatpants-01': {
    id: 'banner-streetwear-set',
    title: 'Rival Oversized Tee & Sweatpants Set',
    titleAr: 'طقم ستريت وير (تيشيرت راجلان + سويت بانتس خطين)',
    subtitle: 'Heavyweight oversized tee + dual stripe sweatpants',
    subtitleAr: 'طقم خروج كاجوال متكامل من القطن المصري الثقيل - وفر 20% واختر مقاساتك',
    badge: 'HOT BUNDLE',
    badgeAr: 'طقم ستريت وير',
    discountBadge: 'SAVE 20%',
    discountBadgeAr: 'توفير 20%',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-streetwear-oversized-sweatpants',
    buttonText: 'Customize Outfit Bundle',
    buttonTextAr: 'تخصيص مقاسات الطقم كاملاً'
  },
  'sotra-rival-oversized-tee-01': {
    id: 'banner-rival-set-1',
    title: 'Rival Raglan Tee & Track Sweatpants Set',
    titleAr: 'طقم ستريت وير (تيشيرت راجلان + سويت بانتس)',
    subtitle: 'Pair with our bestselling 420 GSM sweatpants',
    subtitleAr: 'أضف البنطال الكاجوال المخطط واحصل على خصم الطقم 20%',
    badge: 'COMPLETE SET',
    badgeAr: 'طقم ملابس متناسق',
    discountBadge: 'SAVE 20%',
    discountBadgeAr: 'توفير 20%',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-streetwear-oversized-sweatpants',
    buttonText: 'Get Full Set Offer',
    buttonTextAr: 'طلب الطقم بسعر العرض'
  },
  'sotra-rival-oversized-tank-01': {
    id: 'banner-tank-camo-set',
    title: 'Casual Tank & Camo Shorts Complete Outfit',
    titleAr: 'طقم صيفي كاجوال (تانك قطني + شورت جاكار)',
    subtitle: 'Deep cut sleeveless top + lightweight camo shorts',
    subtitleAr: 'تنسيق صيفي كاجوال مريح للأيام الحارة - وفّر 28%',
    badge: 'SUMMER BUNDLE',
    badgeAr: 'عرض صيفي خاص',
    discountBadge: 'SAVE 28%',
    discountBadgeAr: 'توفير 28%',
    image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-beast-tank-camo-shorts',
    buttonText: 'Customize Bundle Set',
    buttonTextAr: 'تخصيص مقاسات الطقم'
  },
  'sotra-rival-oversized-tee-02': {
    id: 'banner-pair-sweatpants',
    title: 'Matching Stealth Stripe Sweatpants',
    titleAr: 'البنطال المكمل: سويت بانتس ستيلث بخطين',
    subtitle: 'Wide leg streetwear drape in heavy French terry',
    subtitleAr: 'انسدال واسع وقطن مصري 420 GSM - اضغط لعرض البنطال والمقاسات',
    badge: 'PERFECT MATCH',
    badgeAr: 'قطعة مكملة',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop',
    targetType: 'product',
    targetId: 'sotra-stealth-stripe-sweatpants-01',
    buttonText: 'View Product & Sizing',
    buttonTextAr: 'عرض البنطال واختيار المقاس'
  },
  'sotra-essential-cotton-shorts-01': {
    id: 'banner-shorts-to-compression',
    title: 'Stealth Fitted Tee & Shorts Kit',
    titleAr: 'طقم ستيلث كامل (تيشيرت سليم + شورت قطني)',
    subtitle: 'Pair this short with fitted tee and save 25%',
    subtitleAr: 'نسق الشورت مع التيشيرت بخصم 25% مع اختيار المقاسات لكل قطعة',
    badge: 'BUNDLE SAVINGS',
    badgeAr: 'طقم ملابس متناسق',
    discountBadge: 'SAVE 25%',
    discountBadgeAr: 'توفير 25%',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-stealth-compression-kit',
    buttonText: 'Customize & Add Bundle',
    buttonTextAr: 'تخصيص وإضافة الطقم كاملاً'
  },
  'sotra-essential-stripe-sweatpants-01': {
    id: 'banner-tops-category',
    title: 'Explore Heavyweight Oversized Tops',
    titleAr: 'تصفح تيشيرتات وتوبات الأوفرسايز المكملة',
    subtitle: '5+ premium colorways to pair with this sweatpants',
    subtitleAr: 'أكثر من 5 ألوان وتصاميم راجلان قطن 100% لتنسيق هذا البنطال',
    badge: 'COLLECTION',
    badgeAr: 'تشكيلة التوبات',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    targetType: 'category',
    targetId: 'tops',
    buttonText: 'Shop Oversized Tops',
    buttonTextAr: 'تصفح التوبات وتنسيق الأطقم'
  },
  'sotra-essential-cotton-shorts-02': {
    id: 'banner-short-v2-bundle',
    title: 'Stealth Casual Apparel Kit',
    titleAr: 'طقم ملابس ستيلث كاجوال مع التيشيرت السليم',
    subtitle: 'Choose your sizes and get exclusive 25% discount',
    subtitleAr: 'اختر مقاساتك وأضف الطقم كاملاً للحقيبة بخصم 25%',
    badge: 'BUNDLE OFFER',
    badgeAr: 'عرض الطقم',
    discountBadge: 'SAVE 25%',
    discountBadgeAr: 'خصم 25%',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-stealth-compression-kit',
    buttonText: 'Customize Bundle Set',
    buttonTextAr: 'تخصيص مقاسات الطقم'
  },
  'sotra-stealth-jacquard-shorts-01': {
    id: 'banner-camo-set-bundle',
    title: 'Casual Tank & Camo Shorts Bundle',
    titleAr: 'طقم تانك صيفي وشورت جاكار',
    subtitle: 'Special offer: 890 EGP instead of 1,230 EGP',
    subtitleAr: 'احصل على التانك مع الشورت بسعر العرض الخاص 890 ج.م بدل 1230 ج.م',
    badge: 'LIMITED DEAL',
    badgeAr: 'عرض خاص',
    discountBadge: 'SAVE 28%',
    discountBadgeAr: 'توفير 28%',
    image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-beast-tank-camo-shorts',
    buttonText: 'Customize & Add Bundle',
    buttonTextAr: 'تخصيص وإضافة الطقم'
  },
  'sotra-acid-wash-hoodie-01': {
    id: 'banner-hoodie-sweatpants',
    title: 'Pair With Stealth Stripe Sweatpants',
    titleAr: 'تنسيق مقترح: سويت بانتس ستيلث بخطين جانبيين',
    subtitle: 'Complete your winter streetwear style',
    subtitleAr: 'طقم الشتاء الفاخر - قطن مصري ثقيل مريح وعصري',
    badge: 'MATCHING PAIR',
    badgeAr: 'تنسيق مقترح',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    targetType: 'product',
    targetId: 'sotra-stealth-stripe-sweatpants-01',
    buttonText: 'View Sweatpants & Sizes',
    buttonTextAr: 'عرض البنطال والمقاسات'
  },
  'sotra-duffle-bag-01': {
    id: 'banner-duffle-sets',
    title: 'Explore SOTRA Apparel & Travel Sets',
    titleAr: 'استكشف أطقم ملابس وحقائب سوترة بخصومات حصرية',
    subtitle: 'Pack your travel bag with matching sets and save up to 28%',
    subtitleAr: 'جهّز حقيبة سفرك وملابسك بأطقم متناسقة توفر حتى 28%',
    badge: 'SETS & GEAR',
    badgeAr: 'الأطقم والتنسيقات',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop',
    targetType: 'category',
    targetId: 'sets',
    buttonText: 'Shop All Outfit Sets',
    buttonTextAr: 'تصفح كل الأطقم والتنسيقات'
  },
  'sotra-socks-pack-01': {
    id: 'banner-socks-all',
    title: 'Complete Your Daily Style',
    titleAr: 'أكمل إطلالتك مع باقي تشكيلة ملابس سوترة',
    subtitle: 'Free shipping on orders above 1,000 EGP',
    subtitleAr: 'شحن مجاني على كل الطلبات بقيمة 1000 ج.م أو أكثر',
    badge: 'FULL CATALOG',
    badgeAr: 'كل الملابس',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    targetType: 'category',
    targetId: 'all',
    buttonText: 'Browse All Catalog',
    buttonTextAr: 'تسوق كل المنتجات'
  }
};

export const FEATURED_PROMO_BANNERS: import('../types').ProductPromoBanner[] = [
  {
    id: 'promo-stealth-bundle',
    title: 'Stealth Fitted Tee & Shorts Kit',
    titleAr: 'طقم ملابس ستيلث كامل (تيشيرت سليم + شورت قطني)',
    subtitle: 'High-performance apparel set with 25% bundle savings. Choose your size for each item.',
    subtitleAr: 'طقم ملابس يومي عالي الجودة مع توفير 25% مع إمكانية اختيار مقاس ولون كل قطعة.',
    badge: 'EXCLUSIVE SET',
    badgeAr: 'طقم حصري',
    discountBadge: 'SAVE 25%',
    discountBadgeAr: 'خصم 25%',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-stealth-compression-kit',
    buttonText: 'Customize Sizes & Add Kit',
    buttonTextAr: 'تخصيص المقاسات وإضافة الطقم'
  },
  {
    id: 'promo-streetwear-bundle',
    title: 'Rival Oversized Tee & Track Sweatpants Set',
    titleAr: 'طقم ستريت وير (تيشيرت راجلان + سويت بانتس)',
    subtitle: 'Heavy 420 GSM French terry sweatpants paired with raglan oversized tee.',
    subtitleAr: 'سويت بانتس ثقيل بخطين جانبيين مع تيشيرت راجلان أوفرسايز - وفر 20%.',
    badge: 'HOT BUNDLE',
    badgeAr: 'طقم ستريت وير',
    discountBadge: 'SAVE 20%',
    discountBadgeAr: 'توفير 20%',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-streetwear-oversized-sweatpants',
    buttonText: 'Customize & Order Set',
    buttonTextAr: 'تخصيص وإضافة الطقم كاملاً'
  },
  {
    id: 'promo-beast-tank-bundle',
    title: 'Casual Tank & Camo Shorts Summer Deal',
    titleAr: 'طقم صيفي كاجوال (تانك بدون أكمام + شورت جاكار)',
    subtitle: 'Deep cut casual sleeveless tank with lightweight camo shorts at 890 EGP only.',
    subtitleAr: 'تانك صيفي قطني مريح مع شورت جاكار مموه خفيف بـ 890 ج.م فقط بدل 1230 ج.م.',
    badge: 'SUMMER DEAL',
    badgeAr: 'عرض صيفي مميز',
    discountBadge: 'SAVE 28%',
    discountBadgeAr: 'توفير 28%',
    image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=800&auto=format&fit=crop',
    targetType: 'bundle',
    targetId: 'bundle-beast-tank-camo-shorts',
    buttonText: 'Get Tank & Shorts Deal',
    buttonTextAr: 'طلب عرض التانك والشورت'
  },
  {
    id: 'promo-oversized-tops',
    title: 'Heavyweight Raglan Oversized Collection',
    titleAr: 'تشكيلة تيشيرتات وتوبات الأوفرسايز الثقيلة',
    subtitle: '100% Egyptian bio-washed cotton, dropped shoulder aesthetics.',
    subtitleAr: 'قطن مصري 100% معالج ضد الانكماش وقصات راجلان دروب شولدر العصرية.',
    badge: 'NEW COLLECTION',
    badgeAr: 'تشكيلة جديدة',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    targetType: 'category',
    targetId: 'tops',
    buttonText: 'Explore All Tops',
    buttonTextAr: 'استكشف تيشيرتات الأوفرسايز'
  }
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((prod) => {
  const arData = PRODUCT_ARABIC_DATA[prod.id];
  const promo = PRODUCT_PROMO_BANNERS[prod.id];
  if (!arData) return { ...prod, promoBanner: promo };
  return {
    ...prod,
    nameAr: arData.nameAr,
    fitAr: arData.fitAr,
    descriptionAr: arData.descriptionAr,
    fabricAr: arData.fabricAr,
    featuresAr: arData.featuresAr,
    promoBanner: promo
  };
});

export const INITIAL_PRODUCTS = PRODUCTS;

export const CURRENCY_RATES: Record<string, number> = {
  EGP: 1,
  USD: 0.02,
  SAR: 0.075,
  AED: 0.073
};

export interface GovernorateShipping {
  id: string;
  nameEn: string;
  nameAr: string;
  fee: number;
}

export const EGYPT_GOVERNORATES_SHIPPING: GovernorateShipping[] = [
  { id: 'cairo', nameEn: 'Cairo', nameAr: 'القاهرة', fee: 45 },
  { id: 'giza', nameEn: 'Giza', nameAr: 'الجيزة', fee: 45 },
  { id: 'alex', nameEn: 'Alexandria', nameAr: 'الإسكندرية', fee: 55 },
  { id: 'qalyubia', nameEn: 'Qalyubia', nameAr: 'القليوبية', fee: 50 },
  { id: 'dakahlia', nameEn: 'Dakahlia / Mansoura', nameAr: 'الدقهلية / المنصورة', fee: 55 },
  { id: 'gharbia', nameEn: 'Gharbia / Tanta', nameAr: 'الغربية / طنطا', fee: 55 },
  { id: 'sharqia', nameEn: 'Sharqia / Zagazig', nameAr: 'الشرقية / الزقازيق', fee: 55 },
  { id: 'monufia', nameEn: 'Monufia', nameAr: 'المنوفية', fee: 55 },
  { id: 'beheira', nameEn: 'Beheira', nameAr: 'البحيرة', fee: 55 },
  { id: 'damietta', nameEn: 'Damietta', nameAr: 'دمياط', fee: 55 },
  { id: 'portsaid', nameEn: 'Port Said', nameAr: 'بورسعيد', fee: 55 },
  { id: 'ismailia', nameEn: 'Ismailia', nameAr: 'الإسماعيلية', fee: 55 },
  { id: 'suez', nameEn: 'Suez', nameAr: 'السويس', fee: 55 },
  { id: 'fayoum', nameEn: 'Fayoum', nameAr: 'الفيوم', fee: 65 },
  { id: 'benisuef', nameEn: 'Beni Suef', nameAr: 'بني سويف', fee: 65 },
  { id: 'minya', nameEn: 'Minya', nameAr: 'المنيا', fee: 70 },
  { id: 'asyut', nameEn: 'Asyut', nameAr: 'أسيوط', fee: 70 },
  { id: 'sohag', nameEn: 'Sohag', nameAr: 'سوهاج', fee: 75 },
  { id: 'qena', nameEn: 'Qena', nameAr: 'قنا', fee: 75 },
  { id: 'luxor', nameEn: 'Luxor', nameAr: 'الأقصر', fee: 80 },
  { id: 'aswan', nameEn: 'Aswan', nameAr: 'أسوان', fee: 80 },
  { id: 'redsea', nameEn: 'Red Sea / Hurghada', nameAr: 'البحر الأحمر / الغردقة', fee: 85 },
  { id: 'southsinai', nameEn: 'South Sinai / Sharm El Sheikh', nameAr: 'جنوب سيناء / شرم الشيخ', fee: 85 },
  { id: 'matrouh', nameEn: 'Matrouh / North Coast', nameAr: 'مطروح / الساحل الشمالي', fee: 80 }
];

export const EGYPT_GOVERNORATES = EGYPT_GOVERNORATES_SHIPPING.map(
  (g) => `${g.nameEn} (${g.nameAr})`
);
