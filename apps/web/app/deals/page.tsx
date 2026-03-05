import Link from 'next/link';
import { getDealsProducts } from '@/data/products';

export default function DealsPage() {
  const deals = getDealsProducts();
  return <section className="section"><h1>Deals</h1><p>Limited-time UAE gaming deals.</p><div className="card-grid">{deals.map((d)=> <article key={d.id} className="card"><h2>{d.title}</h2><p>AED {d.price_aed}</p><Link href={`/products/${d.slug}/`}>View</Link></article>)}</div></section>;
}
