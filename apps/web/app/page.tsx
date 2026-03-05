import Link from 'next/link';
import { categories } from '@/data/categories';
import { getDealsProducts, getFeaturedProducts } from '@/data/products';
import { ProductCard } from '@/components/product-card';

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6);
  const deal = getDealsProducts()[0];
  return (
    <>
      <section className="hero"><p className="eyebrow">Dubai • Abu Dhabi • Sharjah</p><h1>Premium UAE Gaming Storefront</h1><p>AED pricing, COD checkout, and compatibility-checked PC builder.</p><div className="hero-actions"><Link className="button primary" href="/products/">Shop products</Link><Link className="button secondary" href="/builder/">Build your PC</Link></div></section>
      <section className="section"><h2>Trust signals</h2><div className="card-grid"><article className="card"><h3>2-Year Warranty</h3><p>UAE local support and clear claim process.</p></article><article className="card"><h3>COD Available</h3><p>Cash on Delivery supported across emirates.</p></article><article className="card"><h3>Fast Delivery</h3><p>Same-day Dubai and next-day major emirates.</p></article></div></section>
      <section className="section"><h2>Shop by category</h2><div className="card-grid">{categories.map((c)=><article key={c.slug} className="card"><h3>{c.label}</h3><p>{c.description}</p><Link href={`/products/?category=${c.slug}`}>Browse</Link></article>)}</div></section>
      <section className="section"><h2>Featured products</h2><div className="card-grid">{featured.map((p)=><ProductCard key={p.id} product={p} />)}</div></section>
      {deal ? <section className="section muted"><h2>Deal of the week</h2><article className="card"><h3>{deal.title}</h3><p>Now AED {deal.price_aed} for UAE customers.</p><Link className="button primary" href={`/products/${deal.slug}/`}>View deal</Link></article></section> : null}
      <section className="section"><h2>Why choose Computer Buddy</h2><div className="card-grid"><article className="card"><h3>Expert Assembly</h3><p>Thermal tuning, cable management, and stress testing.</p></article><article className="card"><h3>Competitive Pricing</h3><p>Transparent AED pricing with real discounts.</p></article><article className="card"><h3>Local Service Team</h3><p>Walk-in and pickup options in the UAE.</p></article></div></section>
      <section className="section"><h2>Customer reviews</h2><div className="card-grid"><article className="card"><p>“Super fast delivery in Dubai.”</p></article><article className="card"><p>“Builder tool made my parts selection easy.”</p></article><article className="card"><p>“COD checkout was seamless.”</p></article></div></section>
      <section className="section"><h2>Newsletter + blog</h2><p>Read latest gaming hardware guides in our UAE blog.</p><Link href="/blog/">Go to Blog</Link></section>
      <section className="section"><h2>FAQ</h2><div className="card-grid"><article className="card"><h3>Do you deliver outside Dubai?</h3><p>Yes, all emirates.</p></article><article className="card"><h3>Can I pay COD?</h3><p>Yes for eligible orders.</p></article><article className="card"><h3>Is VAT included?</h3><p>Shown at checkout with waiver conditions.</p></article><article className="card"><h3>Can I share builder setup?</h3><p>Yes through URL params.</p></article><article className="card"><h3>Do you support returns?</h3><p>Yes per warranty policy.</p></article><article className="card"><h3>Do you build custom PCs?</h3><p>Yes with validation checks.</p></article></div></section>
    </>
  );
}
