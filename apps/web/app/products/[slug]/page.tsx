import type { Metadata } from 'next';
import { getProductBySlug, products } from '@/data/products';
import { ProductCard } from '@/components/product-card';

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProductBySlug(params.slug);
  return { title: p ? `${p.title} | Computer Buddy UAE` : 'Product not found' };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return <section className="section"><h1>Product not found</h1></section>;
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  return (
    <section className="section">
      <h1>{p.title}</h1>
      <img src={p.images[0]} alt={p.title} />
      <p>AED {p.price_aed}</p>
      <p>Warranty: {p.warranty_months} months</p>
      <table><tbody>{Object.entries(p.specs).map(([k, v]) => <tr key={k}><th>{k}</th><td>{String(v)}</td></tr>)}</tbody></table>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: p.title, offers: { '@type': 'Offer', priceCurrency: 'AED', price: p.price_aed } }) }} />
      <h2>Related products</h2>
      <div className="card-grid">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
    </section>
  );
}
