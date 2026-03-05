'use client';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Product } from '@/data/products';
import { ProductCard } from '@/components/product-card';

export function ProductsClient({ products }: { products: Product[] }) {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams();
  const category = params.get('category') ?? 'all';
  const sort = params.get('sort') ?? 'featured';
  const filtered = useMemo(() => {
    let rows = products.filter((p) => category === 'all' ? true : p.category === category);
    if (sort === 'price-asc') rows = rows.sort((a,b)=>a.price_aed-b.price_aed);
    if (sort === 'price-desc') rows = rows.sort((a,b)=>b.price_aed-a.price_aed);
    if (sort === 'rating') rows = rows.sort((a,b)=>b.rating-a.rating);
    return rows;
  }, [products, category, sort]);
  const setParam = (k: string, v: string) => { const q = new URLSearchParams(params.toString()); q.set(k,v); router.replace(`${pathname}?${q.toString()}`); };
  return (<>
    <div className="card"><label htmlFor="category">Category</label><select id="category" value={category} onChange={(e)=>setParam('category', e.target.value)}><option value="all">All</option><option value="gpu">GPU</option><option value="cpu">CPU</option><option value="prebuilt">Prebuilt</option><option value="monitor">Monitor</option></select>
    <label htmlFor="sort">Sort</label><select id="sort" value={sort} onChange={(e)=>setParam('sort', e.target.value)}><option value="featured">Featured</option><option value="price-asc">Price low-high</option><option value="price-desc">Price high-low</option><option value="rating">Top rated</option></select></div>
    <div className="card-grid">{filtered.length ? filtered.map((p)=><ProductCard key={p.id} product={p} />) : <p>No products found.</p>}</div>
  </>);
}
