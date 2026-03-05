import type { Metadata } from 'next';
import { getProductBySlug, products } from '@/data/products';
import { ProductClient } from './product-client';

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProductBySlug(params.slug);
  return { title: p ? `${p.title} | Computer Buddy UAE` : 'Product not found' };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  return (
    <>
      {p ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: p.title, offers: { '@type': 'Offer', priceCurrency: 'AED', price: p.price_aed } }) }} /> : null}
      <ProductClient slug={params.slug} />
    </>
  );
}
