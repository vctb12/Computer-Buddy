import Link from 'next/link';

export default function NotFound() {
  return <section className="section"><h1>This page went to buy a GPU and never came back.</h1><p>Try these routes:</p><p><Link href="/">Home</Link> · <Link href="/products/">Products</Link></p></section>;
}
