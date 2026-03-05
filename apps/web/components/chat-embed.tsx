'use client';
import { useEffect } from 'react';
import { STORE_CONFIG } from '@/store.config';

export function ChatEmbed() {
  useEffect(() => {
    if (STORE_CONFIG.integrations.chatProvider === 'crisp' && STORE_CONFIG.integrations.crispWebsiteId) {
      (window as any).$crisp = [];
      (window as any).CRISP_WEBSITE_ID = STORE_CONFIG.integrations.crispWebsiteId;
      const s = document.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      document.body.appendChild(s);
    }
    if (STORE_CONFIG.integrations.chatProvider === 'tawk' && STORE_CONFIG.integrations.tawkPropertyId) {
      const s = document.createElement('script');
      s.src = `https://embed.tawk.to/${STORE_CONFIG.integrations.tawkPropertyId}`;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}
