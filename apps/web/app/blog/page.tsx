import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';

export default function BlogPage() {
  return <section className="section"><h1>Blog</h1><div className="card-grid">{blogPosts.map((p)=><article key={p.id} className="card"><h2><Link href={`/blog/${p.slug}/`}>{p.title}</Link></h2><p>{p.excerpt}</p></article>)}</div></section>;
}
