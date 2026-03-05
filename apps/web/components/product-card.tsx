'use client';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { PriceDisplay } from '@/components/price-display';
import { RatingStars } from '@/components/rating-stars';
import { useCart } from '@/context/cart-context';

export function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();
  return (
    <article className="card">
      <img src={product.images[0]} alt={product.title} loading="lazy" />
      <h3><Link href={`/products/${product.slug}/`}>{product.title}</Link></h3>
      <PriceDisplay price={product.price_aed} compareAt={product.compare_at_aed} />
      <RatingStars rating={product.rating} />
      <button className="button primary" aria-label={`Add ${product.title} to cart`} onClick={() => dispatch({ type: 'ADD_ITEM', product })}>Add to cart</button>
    </article>
  );
}
