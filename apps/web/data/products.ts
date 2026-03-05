import { prebuiltProducts } from '@/data/catalog/prebuilt';
import { gpuProducts } from '@/data/catalog/gpus';
import { cpuProducts } from '@/data/catalog/cpus';
import { ramProducts } from '@/data/catalog/ram';
import { storageProducts } from '@/data/catalog/storage';
import { moboProducts } from '@/data/catalog/mobos';
import { psuProducts } from '@/data/catalog/psus';
import { caseProducts } from '@/data/catalog/cases';
import { coolingProducts } from '@/data/catalog/cooling';
import { monitorProducts } from '@/data/catalog/monitors';
import { keyboardProducts, mouseProducts, headsetProducts, chairProducts } from '@/data/catalog/peripherals';
import { serviceProducts } from '@/data/catalog/services';
import { laptopProducts } from '@/data/catalog/laptops';
import { consoleProducts } from '@/data/catalog/consoles';
import { bundleProducts } from '@/data/catalog/bundles';

export type Category =
  | 'prebuilt' | 'gpu' | 'cpu' | 'ram' | 'storage' | 'mobo' | 'psu' | 'case' | 'cooling'
  | 'keyboard' | 'mouse' | 'headset' | 'chair' | 'monitor' | 'service';

export interface Product {
  id: number;
  slug: string;
  title: string;
  brand: string;
  category: Category;
  price_aed: number;
  compare_at_aed?: number;
  stock: number;
  rating: number;
  review_count: number;
  images: string[];
  specs: Record<string, string | number>;
  warranty_months: number;
  delivery_estimate: string;
  tags: string[];
  featured?: boolean;
  deal_of_week?: boolean;
}

export const products: Product[] = [
  ...prebuiltProducts,
  ...gpuProducts,
  ...cpuProducts,
  ...ramProducts,
  ...storageProducts,
  ...moboProducts,
  ...psuProducts,
  ...caseProducts,
  ...coolingProducts,
  ...monitorProducts,
  ...keyboardProducts,
  ...mouseProducts,
  ...headsetProducts,
  ...chairProducts,
  ...serviceProducts,
  ...laptopProducts,
  ...consoleProducts,
  ...bundleProducts,
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (category: Category) => products.filter((p) => p.category === category);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getDealsProducts = () => products.filter((p) => p.deal_of_week || (p.compare_at_aed ?? 0) > p.price_aed);
export const getBundleProducts = () => products.filter((p) => p.tags.includes('bundle'));
export const searchProducts = (q: string) => {
  const s = q.toLowerCase();
  return products.filter((p) => `${p.title} ${p.brand} ${p.tags.join(' ')}`.toLowerCase().includes(s));
};
