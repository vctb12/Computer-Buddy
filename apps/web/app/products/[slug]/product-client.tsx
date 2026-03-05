'use client';
import { useEffect, useState } from 'react';
import { getProductBySlug, products } from '@/data/products';
import { ProductCard } from '@/components/product-card';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { storageGet } from '@/lib/storage/get';
import { storageSet } from '@/lib/storage/set';

export function ProductClient({ slug }: { slug: string }) {
  const p = getProductBySlug(slug);
  const [alertTarget, setAlertTarget] = useState('');
  useEffect(() => {
    if (!p) return;
    const list = storageGet<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
    storageSet(STORAGE_KEYS.RECENTLY_VIEWED, [p.slug, ...list.filter((x) => x !== p.slug)].slice(0, 20));
  }, [p]);
  if (!p) return <section className="section"><h1>Product not found</h1></section>;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  return (
    <section className="section">
      <h1>{p.title}</h1>
      <img src={p.images[0]} alt={p.title} />
      <p>AED {p.price_aed}</p>
      <table><tbody>{Object.entries(p.specs).map(([k, v]) => <tr key={k}><th>{k}</th><td>{String(v)}</td></tr>)}</tbody></table>
      <label htmlFor="target">Set price alert</label>
      <input id="target" value={alertTarget} onChange={(e)=>setAlertTarget(e.target.value)} placeholder="Target AED" />
      <button className="button" onClick={()=>{const cur=storageGet<{slug:string;target:number}[]>(STORAGE_KEYS.ALERTS,[]); storageSet(STORAGE_KEYS.ALERTS,[...cur,{slug:p.slug,target:Number(alertTarget||0)}]);}}>Save alert</button>
      <h2>Related products</h2>
      <div className="card-grid">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
    </section>
  );
}
