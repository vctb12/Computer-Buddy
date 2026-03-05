import { Suspense } from 'react';
import { products } from '@/data/products';
import { ProductsClient } from './products-client';

export default function ProductsPage() {
  return (
    <section className="section">
      <h1>Products</h1>
      <p>Browse UAE-ready gaming hardware with AED pricing.</p>
      <Suspense fallback={<p>Loading filters...</p>}>
        <ProductsClient products={products} />
      </Suspense>
    </section>
  );
}
