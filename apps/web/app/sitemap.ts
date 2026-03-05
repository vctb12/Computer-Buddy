import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://computer-buddy.netlify.app';
  const staticRoutes = ['', '/products', '/deals', '/services', '/warranty', '/blog', '/support', '/cart', '/checkout', '/order-success', '/builder', '/about', '/faq'];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}/` })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}/` })),
    ...blogPosts.map((b) => ({ url: `${base}/blog/${b.slug}/` })),
  ];
}
