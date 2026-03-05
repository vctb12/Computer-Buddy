'use client';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';

export function Header() {
  const { count } = useCart();
  return (
    <header className="site-header" aria-label="Main header">
      <div className="container header-inner">
        <Link className="logo" href="/">Computer Buddy UAE</Link>
        <nav aria-label="Primary">
          <ul className="nav-list">
            <li><Link href="/">Home</Link></li><li><Link href="/products/">Products</Link></li><li><Link href="/deals/">Deals</Link></li>
            <li><Link href="/services/">Services</Link></li><li><Link href="/blog/">Blog</Link></li><li><Link href="/support/">Support</Link></li><li><Link href="/about/">About</Link></li>
            <li><Link href="/cart/" aria-label={`Cart with ${count} items`}>Cart ({count})</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
