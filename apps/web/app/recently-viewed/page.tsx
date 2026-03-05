'use client';
import Link from 'next/link';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { getProductBySlug } from '@/data/products';

export default function RecentlyViewedPage() {
  const { slugs } = useRecentlyViewed();
  const items = slugs.map((s) => getProductBySlug(s)).filter(Boolean);
  return <section className="section"><h1>Recently Viewed</h1>{items.length===0?<p>No recently viewed products yet.</p>:<div className="card-grid">{items.map((p)=><article key={p!.id} className="card"><h2>{p!.title}</h2><Link href={`/products/${p!.slug}/`}>Open</Link></article>)}</div>}</section>;
}
