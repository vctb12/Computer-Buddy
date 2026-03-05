'use client';
import { useSearchParams } from 'next/navigation';

export function OrderSuccessClient() {
  const p = useSearchParams();
  const id = p.get('id');
  return <section className="section"><h1>Order successful</h1><p>Your order ID: {id}</p><p>Demo mode: confirmation email simulated.</p><a className="button primary" href="https://wa.me/971500000000">WhatsApp support</a></section>;
}
