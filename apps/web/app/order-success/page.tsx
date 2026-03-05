import { Suspense } from 'react';
import { OrderSuccessClient } from './order-success-client';

export default function OrderSuccessPage() {
  return <Suspense fallback={<p>Loading order...</p>}><OrderSuccessClient /></Suspense>;
}
