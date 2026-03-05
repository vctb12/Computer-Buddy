export const STORE_CONFIG = {
  business: {
    name: 'Computer Buddy',
    email: 'vctb12@gmail.com',
    whatsapp: '971505058609',
    location: 'online',
    hours: '9am–6pm',
    positioning: 'budget',
  },
  delivery: {
    freeThresholdAed: 1500,
    emirates: {
      Dubai: 15,
      'Abu Dhabi': 25,
      Sharjah: 20,
      Ajman: 20,
      'Ras Al Khaimah': 30,
      Fujairah: 35,
      'Umm Al Quwain': 30,
    },
  },
  returns: {
    sealedWindowDays: 7,
    doaWindowDays: 14,
  },
  pricing: {
    vatRate: 0.05,
    promoCode: 'BUDDY15',
    promoThreshold: 500,
    promoRate: 0.15,
    vatWaiveThreshold: 5000,
  },
  checkout: {
    cardCheckoutLabel: 'Pay by Card',
    cardCheckoutUrl: process.env.NEXT_PUBLIC_CARD_CHECKOUT_URL || '',
  },
  integrations: {
    emailMode: (process.env.NEXT_PUBLIC_EMAIL_MODE as 'demo' | 'netlify-function') || 'demo',
    emailProvider: (process.env.NEXT_PUBLIC_EMAIL_PROVIDER as 'resend' | 'sendgrid') || 'resend',
    chatProvider: (process.env.NEXT_PUBLIC_CHAT_PROVIDER as 'crisp' | 'tawk') || 'crisp',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    crispWebsiteId: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || '',
    tawkPropertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || '',
  },
  flags: {
    recentlyViewed: true,
    bundles: true,
    priceDropAlerts: true,
    adminDemo: true,
  },
} as const;
