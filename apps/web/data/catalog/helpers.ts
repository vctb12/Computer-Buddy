import type { Category, Product } from '@/data/products';

export const img = (name: string) => `https://placehold.co/600x400/0D0D18/00F0A0?text=${encodeURIComponent(name)}&font=raleway`;

export const createProduct = (p: Omit<Product, 'images' | 'rating' | 'review_count' | 'delivery_estimate' | 'warranty_months' | 'stock'> & Partial<Pick<Product, 'images' | 'rating' | 'review_count' | 'delivery_estimate' | 'warranty_months' | 'stock'>>): Product => ({
  ...p,
  images: p.images ?? [img(p.title)],
  rating: p.rating ?? 4.6,
  review_count: p.review_count ?? 30,
  delivery_estimate: p.delivery_estimate ?? 'UAE 1-2 days',
  warranty_months: p.warranty_months ?? 24,
  stock: p.stock ?? 10,
});

export const buildSeries = (startId: number, count: number, category: Category, brand: string, name: string, basePrice: number, specs: Record<string, string | number>) =>
  Array.from({ length: count }, (_, i) =>
    createProduct({
      id: startId + i,
      slug: `${name.toLowerCase().replace(/\s+/g, '-')}-${startId + i}`,
      title: `${name} ${i + 1}`,
      brand,
      category,
      price_aed: basePrice + i * 20,
      compare_at_aed: basePrice + i * 30,
      specs,
      tags: ['uae', category],
      featured: i % 10 === 0,
    })
  );
