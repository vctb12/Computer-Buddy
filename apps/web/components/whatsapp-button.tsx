import { STORE_CONFIG } from '@/store.config';

export function WhatsAppButton() {
  return <a className="whatsapp" href={`https://wa.me/${STORE_CONFIG.business.whatsapp}`} aria-label="Chat on WhatsApp">WhatsApp</a>;
}
