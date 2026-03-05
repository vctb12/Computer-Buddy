import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';

export function generateStaticParams() { return blogPosts.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = blogPosts.find((x) => x.slug === params.slug);
  return { title: p ? `${p.title} | Computer Buddy Blog` : 'Post not found' };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = blogPosts.find((x) => x.slug === params.slug);
  if (!p) return <section className="section"><h1>Post not found</h1></section>;
  const related = blogPosts.filter((x) => x.slug !== p.slug).slice(0, 2);
  return <article className="section"><h1>{p.title}</h1><p className="muted">{p.author} · {p.date} · {p.reading_time}</p><p>{p.content}</p><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'BlogPosting',headline:p.title,datePublished:p.date,author:p.author})}} /><h2>Related</h2><ul>{related.map((r)=><li key={r.id}><a href={`/blog/${r.slug}/`}>{r.title}</a></li>)}</ul></article>;
}
