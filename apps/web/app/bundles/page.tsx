'use client';
import { getBundleProducts } from '@/data/products';
import { useCart } from '@/context/cart-context';

export default function BundlesPage() {
  const { dispatch } = useCart();
  const bundles = getBundleProducts();
  return <section className="section"><h1>Bundles & Kits</h1><div className="card-grid">{bundles.map((b)=><article key={b.id} className="card"><h2>{b.title}</h2><p>AED {b.price_aed}</p><button className="button primary" onClick={()=>dispatch({type:'ADD_ITEM',product:b})}>Add bundle</button></article>)}</div></section>;
}
