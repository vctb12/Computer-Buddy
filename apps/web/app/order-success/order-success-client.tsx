'use client';
import { useSearchParams } from 'next/navigation';
import { storageGet } from '@/lib/storage/get';

export function OrderSuccessClient() {
  const p = useSearchParams();
  const id = p.get('id');
  const order = storageGet<{ emirate?: string; shipping?: number }>('cb-last-order', {});
  return <section className="section"><h1>Order successful</h1><p>Your order ID: {id}</p><p>Shipping emirate: {order.emirate ?? 'N/A'}</p><p>Shipping fee: AED {order.shipping ?? 0}</p><p>Demo mode: confirmation email simulated if provider is not configured.</p><a className="button primary" href="https://wa.me/971505058609">WhatsApp support</a></section>;
}
