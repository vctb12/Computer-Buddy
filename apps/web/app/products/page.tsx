'use client';

import { useMemo, useState } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product-card';

export default function ProductsPage() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let rows = products.filter((p) => (category === 'all' ? true : p.category === category));
    if (sort === 'price-asc') rows = [...rows].sort((a, b) => a.price_aed - b.price_aed);
    if (sort === 'price-desc') rows = [...rows].sort((a, b) => b.price_aed - a.price_aed);
    if (sort === 'rating') rows = [...rows].sort((a, b) => b.rating - a.rating);
    return rows;
  }, [category, sort]);

  return (
    <section className="section">
      <h1>Products</h1>
      <p>Browse UAE-ready gaming hardware with AED pricing.</p>
      <div className="card">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="gpu">GPU</option>
          <option value="cpu">CPU</option>
          <option value="prebuilt">Prebuilt</option>
          <option value="monitor">Monitor</option>
        </select>

        <label htmlFor="sort">Sort</label>
        <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price low-high</option>
          <option value="price-desc">Price high-low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="card-grid">
        {filtered.length ? filtered.map((p) => <ProductCard key={p.id} product={p} />) : <p>No products found.</p>}
      </div>
    </section>
  );
}
