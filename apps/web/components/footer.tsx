import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container">
        <div className="card-grid">
          <div><h3>Shop</h3><p><Link href="/products/">All Products</Link> · <Link href="/deals/">Deals</Link></p></div>
          <div><h3>Support</h3><p><Link href="/warranty/">Warranty</Link> · <Link href="/faq/">FAQ</Link></p></div>
          <div><h3>UAE Hours</h3><p>Sun–Thu 10:00–22:00<br/>Fri–Sat 14:00–23:00</p></div>
        </div>
        <p className="muted">© 2026 Computer Buddy · AED pricing · UAE-wide delivery · Cash on Delivery available.</p>
      </div>
    </footer>
  );
}
