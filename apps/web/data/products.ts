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

const img = (name: string) => `https://placehold.co/600x400/0D0D18/00F0A0?text=${encodeURIComponent(name)}&font=raleway`;

export const products: Product[] = [
  { id: 1, slug: 'falcon-rtx-4070-rig', title: 'Falcon RTX 4070 Gaming Rig', brand: 'Computer Buddy', category: 'prebuilt', price_aed: 6499, compare_at_aed: 6999, stock: 8, rating: 4.8, review_count: 88, images: [img('Falcon RTX 4070')], specs: { Socket: 'AM5', TDP: 105, GPU: 'RTX 4070', RAM: '32GB DDR5' }, warranty_months: 24, delivery_estimate: 'Dubai next-day', tags: ['1440p', 'featured'], featured: true, deal_of_week: true },
  { id: 2, slug: 'desert-pro-4090', title: 'Desert Pro RTX 4090 Tower', brand: 'Computer Buddy', category: 'prebuilt', price_aed: 12999, stock: 4, rating: 4.9, review_count: 42, images: [img('Desert Pro 4090')], specs: { Socket: 'LGA1700', TDP: 125, GPU: 'RTX 4090', RAM: '64GB DDR5' }, warranty_months: 36, delivery_estimate: 'UAE 1-2 days', tags: ['4k', 'premium'], featured: true },
  { id: 3, slug: 'nvidia-rtx-4060-ti', title: 'NVIDIA RTX 4060 Ti 16GB', brand: 'NVIDIA', category: 'gpu', price_aed: 1799, compare_at_aed: 1999, stock: 18, rating: 4.6, review_count: 120, images: [img('RTX 4060 Ti')], specs: { TGP: 165 }, warranty_months: 24, delivery_estimate: 'Dubai same-day', tags: ['1080p', 'deal'] },
  { id: 4, slug: 'nvidia-rtx-4070-super', title: 'NVIDIA RTX 4070 SUPER', brand: 'NVIDIA', category: 'gpu', price_aed: 2599, stock: 12, rating: 4.8, review_count: 134, images: [img('RTX 4070 SUPER')], specs: { TGP: 220 }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['1440p'], featured: true },
  { id: 5, slug: 'nvidia-rtx-4080-super', title: 'NVIDIA RTX 4080 SUPER', brand: 'NVIDIA', category: 'gpu', price_aed: 4299, stock: 6, rating: 4.9, review_count: 80, images: [img('RTX 4080 SUPER')], specs: { TGP: 320 }, warranty_months: 24, delivery_estimate: 'UAE 1-2 days', tags: ['4k'] },
  { id: 6, slug: 'amd-rx-7900-xt', title: 'AMD Radeon RX 7900 XT', brand: 'AMD', category: 'gpu', price_aed: 3199, compare_at_aed: 3499, stock: 9, rating: 4.7, review_count: 67, images: [img('RX 7900 XT')], specs: { TGP: 300 }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['4k'] },
  { id: 7, slug: 'intel-i5-14600k', title: 'Intel Core i5-14600K', brand: 'Intel', category: 'cpu', price_aed: 1299, stock: 25, rating: 4.7, review_count: 175, images: [img('i5-14600K')], specs: { Socket: 'LGA1700', TDP: 125 }, warranty_months: 36, delivery_estimate: 'Dubai same-day', tags: ['gaming'] },
  { id: 8, slug: 'intel-i7-14700k', title: 'Intel Core i7-14700K', brand: 'Intel', category: 'cpu', price_aed: 1799, stock: 20, rating: 4.8, review_count: 142, images: [img('i7-14700K')], specs: { Socket: 'LGA1700', TDP: 125 }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['streaming'], featured: true },
  { id: 9, slug: 'amd-ryzen-7600x', title: 'AMD Ryzen 5 7600X', brand: 'AMD', category: 'cpu', price_aed: 999, stock: 21, rating: 4.6, review_count: 123, images: [img('Ryzen 7600X')], specs: { Socket: 'AM5', TDP: 105 }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['value'] },
  { id: 10, slug: 'amd-ryzen-7800x3d', title: 'AMD Ryzen 7 7800X3D', brand: 'AMD', category: 'cpu', price_aed: 1699, stock: 14, rating: 4.9, review_count: 210, images: [img('Ryzen 7800X3D')], specs: { Socket: 'AM5', TDP: 120 }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['esports'], featured: true },
  { id: 11, slug: 'corsair-ddr5-32', title: 'Corsair 32GB DDR5 6000', brand: 'Corsair', category: 'ram', price_aed: 499, stock: 30, rating: 4.7, review_count: 98, images: [img('Corsair DDR5 32')], specs: { Type: 'DDR5' }, warranty_months: 60, delivery_estimate: 'Dubai same-day', tags: ['rgb'] },
  { id: 12, slug: 'gskill-ddr5-64', title: 'G.Skill 64GB DDR5 6400', brand: 'G.Skill', category: 'ram', price_aed: 899, stock: 16, rating: 4.8, review_count: 54, images: [img('GSkill DDR5 64')], specs: { Type: 'DDR5' }, warranty_months: 60, delivery_estimate: 'UAE 1 day', tags: ['creator'] },
  { id: 13, slug: 'kingston-ddr4-32', title: 'Kingston 32GB DDR4 3600', brand: 'Kingston', category: 'ram', price_aed: 299, stock: 24, rating: 4.5, review_count: 66, images: [img('Kingston DDR4 32')], specs: { Type: 'DDR4' }, warranty_months: 60, delivery_estimate: 'UAE 1 day', tags: ['budget'] },
  { id: 14, slug: 'samsung-990-pro-2tb', title: 'Samsung 990 Pro 2TB NVMe', brand: 'Samsung', category: 'storage', price_aed: 699, stock: 18, rating: 4.9, review_count: 141, images: [img('Samsung 990 Pro 2TB')], specs: { Interface: 'PCIe 4.0' }, warranty_months: 60, delivery_estimate: 'Dubai same-day', tags: ['fast'], featured: true },
  { id: 15, slug: 'wd-sn850x-1tb', title: 'WD SN850X 1TB NVMe', brand: 'WD', category: 'storage', price_aed: 399, stock: 26, rating: 4.8, review_count: 112, images: [img('SN850X 1TB')], specs: { Interface: 'PCIe 4.0' }, warranty_months: 60, delivery_estimate: 'UAE 1 day', tags: ['gaming'] },
  { id: 16, slug: 'seagate-barracuda-4tb', title: 'Seagate BarraCuda 4TB HDD', brand: 'Seagate', category: 'storage', price_aed: 299, stock: 35, rating: 4.3, review_count: 72, images: [img('Barracuda 4TB')], specs: { Interface: 'SATA' }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['archive'] },
  { id: 17, slug: 'asus-z790-e', title: 'ASUS ROG Z790-E', brand: 'ASUS', category: 'mobo', price_aed: 1699, stock: 10, rating: 4.8, review_count: 60, images: [img('ASUS Z790-E')], specs: { Socket: 'LGA1700', 'Form Factor': 'ATX', 'Memory Type': 'DDR5' }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['enthusiast'] },
  { id: 18, slug: 'msi-b650-tomahawk', title: 'MSI B650 Tomahawk', brand: 'MSI', category: 'mobo', price_aed: 1099, stock: 14, rating: 4.7, review_count: 83, images: [img('MSI B650')], specs: { Socket: 'AM5', 'Form Factor': 'ATX', 'Memory Type': 'DDR5' }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['am5'], featured: true },
  { id: 19, slug: 'gigabyte-b760m', title: 'Gigabyte B760M DS3H', brand: 'Gigabyte', category: 'mobo', price_aed: 649, stock: 17, rating: 4.5, review_count: 45, images: [img('B760M DS3H')], specs: { Socket: 'LGA1700', 'Form Factor': 'mATX', 'Memory Type': 'DDR4' }, warranty_months: 36, delivery_estimate: 'Dubai same-day', tags: ['budget'] },
  { id: 20, slug: 'corsair-rm850e', title: 'Corsair RM850e PSU', brand: 'Corsair', category: 'psu', price_aed: 549, stock: 20, rating: 4.8, review_count: 120, images: [img('RM850e')], specs: { Wattage: 850 }, warranty_months: 84, delivery_estimate: 'UAE 1 day', tags: ['gold'] },
  { id: 21, slug: 'seasonic-focus-750', title: 'Seasonic Focus GX-750', brand: 'Seasonic', category: 'psu', price_aed: 499, stock: 13, rating: 4.8, review_count: 77, images: [img('Focus GX-750')], specs: { Wattage: 750 }, warranty_months: 84, delivery_estimate: 'UAE 1 day', tags: ['gold'] },
  { id: 22, slug: 'coolermaster-v1000', title: 'Cooler Master V1000', brand: 'Cooler Master', category: 'psu', price_aed: 699, stock: 11, rating: 4.7, review_count: 58, images: [img('V1000')], specs: { Wattage: 1000 }, warranty_months: 84, delivery_estimate: 'UAE 1 day', tags: ['high-watt'] },
  { id: 23, slug: 'nzxt-h7-flow', title: 'NZXT H7 Flow', brand: 'NZXT', category: 'case', price_aed: 499, stock: 15, rating: 4.7, review_count: 63, images: [img('NZXT H7 Flow')], specs: { 'Supported Form Factor': 'ATX,mATX' }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['airflow'] },
  { id: 24, slug: 'lianli-o11', title: 'Lian Li O11 Dynamic', brand: 'Lian Li', category: 'case', price_aed: 599, stock: 9, rating: 4.8, review_count: 94, images: [img('Lian Li O11')], specs: { 'Supported Form Factor': 'ATX,mATX' }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['showcase'], featured: true },
  { id: 25, slug: 'deepcool-matrexx-55', title: 'Deepcool Matrexx 55', brand: 'Deepcool', category: 'case', price_aed: 299, stock: 22, rating: 4.4, review_count: 39, images: [img('Matrexx 55')], specs: { 'Supported Form Factor': 'ATX,mATX' }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['budget'] },
  { id: 26, slug: 'arctic-liquid-freezer-ii', title: 'Arctic Liquid Freezer II 360', brand: 'Arctic', category: 'cooling', price_aed: 549, stock: 10, rating: 4.8, review_count: 81, images: [img('Liquid Freezer II')], specs: { Type: 'AIO 360mm' }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['aoi'] },
  { id: 27, slug: 'noctua-nh-d15', title: 'Noctua NH-D15', brand: 'Noctua', category: 'cooling', price_aed: 449, stock: 12, rating: 4.9, review_count: 170, images: [img('NH-D15')], specs: { Type: 'Air Cooler' }, warranty_months: 72, delivery_estimate: 'UAE 1 day', tags: ['silent'] },
  { id: 28, slug: 'razer-blackwidow-v4', title: 'Razer BlackWidow V4', brand: 'Razer', category: 'keyboard', price_aed: 599, stock: 18, rating: 4.6, review_count: 102, images: [img('BlackWidow V4')], specs: { Switch: 'Green' }, warranty_months: 24, delivery_estimate: 'Dubai same-day', tags: ['rgb'] },
  { id: 29, slug: 'logitech-g-pro-x-keyboard', title: 'Logitech G Pro X Keyboard', brand: 'Logitech', category: 'keyboard', price_aed: 499, stock: 16, rating: 4.7, review_count: 98, images: [img('G Pro X Keyboard')], specs: { Switch: 'GX' }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['esports'] },
  { id: 30, slug: 'logitech-g-pro-x-superlight', title: 'Logitech G Pro X Superlight', brand: 'Logitech', category: 'mouse', price_aed: 449, stock: 20, rating: 4.8, review_count: 211, images: [img('G Pro X Superlight')], specs: { DPI: 25600 }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['esports'], featured: true },
  { id: 31, slug: 'razer-viper-v2', title: 'Razer Viper V2 Pro', brand: 'Razer', category: 'mouse', price_aed: 429, stock: 17, rating: 4.7, review_count: 137, images: [img('Viper V2 Pro')], specs: { DPI: 30000 }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['fps'] },
  { id: 32, slug: 'steelseries-arctis-nova-pro', title: 'SteelSeries Arctis Nova Pro', brand: 'SteelSeries', category: 'headset', price_aed: 899, stock: 11, rating: 4.7, review_count: 89, images: [img('Arctis Nova Pro')], specs: { Type: 'Wireless' }, warranty_months: 24, delivery_estimate: 'UAE 1-2 days', tags: ['premium'] },
  { id: 33, slug: 'hyperx-cloud-iii', title: 'HyperX Cloud III', brand: 'HyperX', category: 'headset', price_aed: 399, stock: 19, rating: 4.6, review_count: 74, images: [img('HyperX Cloud III')], specs: { Type: 'Wired' }, warranty_months: 24, delivery_estimate: 'UAE 1 day', tags: ['value'] },
  { id: 34, slug: 'secretlab-evo', title: 'Secretlab TITAN Evo', brand: 'Secretlab', category: 'chair', price_aed: 2099, stock: 7, rating: 4.9, review_count: 65, images: [img('Secretlab Evo')], specs: { Material: 'Neo Hybrid' }, warranty_months: 60, delivery_estimate: 'UAE 2-3 days', tags: ['premium'] },
  { id: 35, slug: 'dxracer-craft', title: 'DXRacer Craft Chair', brand: 'DXRacer', category: 'chair', price_aed: 1599, stock: 8, rating: 4.5, review_count: 48, images: [img('DXRacer Craft')], specs: { Material: 'Fabric' }, warranty_months: 36, delivery_estimate: 'UAE 2-3 days', tags: ['comfort'] },
  { id: 36, slug: 'asus-27-1440p-170hz', title: 'ASUS 27" 1440p 170Hz Monitor', brand: 'ASUS', category: 'monitor', price_aed: 1299, compare_at_aed: 1499, stock: 12, rating: 4.7, review_count: 118, images: [img('ASUS 27 1440p')], specs: { Resolution: '2560x1440' }, warranty_months: 36, delivery_estimate: 'UAE 1 day', tags: ['esports'] },
  { id: 37, slug: 'lg-32-4k-144hz', title: 'LG 32" 4K 144Hz Monitor', brand: 'LG', category: 'monitor', price_aed: 2599, stock: 6, rating: 4.8, review_count: 57, images: [img('LG 32 4K')], specs: { Resolution: '3840x2160' }, warranty_months: 36, delivery_estimate: 'UAE 1-2 days', tags: ['4k'] },
  { id: 38, slug: 'pc-cleaning-service', title: 'PC Deep Cleaning Service', brand: 'Computer Buddy', category: 'service', price_aed: 199, stock: 999, rating: 4.9, review_count: 40, images: [img('PC Cleaning Service')], specs: { Service: 'On-site' }, warranty_months: 0, delivery_estimate: 'Book in 24h', tags: ['service'] },
  { id: 39, slug: 'pc-assembly-service', title: 'PC Assembly + Cable Management', brand: 'Computer Buddy', category: 'service', price_aed: 349, stock: 999, rating: 4.9, review_count: 112, images: [img('PC Assembly Service')], specs: { Service: 'Workshop' }, warranty_months: 1, delivery_estimate: '48h turnaround', tags: ['service'], featured: true },
  { id: 40, slug: 'uae-express-delivery', title: 'UAE Express Delivery Upgrade', brand: 'Computer Buddy', category: 'service', price_aed: 79, stock: 999, rating: 4.6, review_count: 31, images: [img('Express Delivery')], specs: { Service: 'Logistics' }, warranty_months: 0, delivery_estimate: 'Same-day Dubai', tags: ['service'] },
  { id: 41, slug: 'thermal-paste-kit', title: 'Pro Thermal Paste Kit', brand: 'Arctic', category: 'cooling', price_aed: 49, stock: 56, rating: 4.5, review_count: 82, images: [img('Thermal Paste Kit')], specs: { Type: 'Consumable' }, warranty_months: 0, delivery_estimate: 'UAE 1 day', tags: ['maintenance'] },
  { id: 42, slug: 'gpu-support-bracket', title: 'ARGB GPU Support Bracket', brand: 'Deepcool', category: 'case', price_aed: 89, stock: 43, rating: 4.3, review_count: 22, images: [img('GPU Bracket')], specs: { 'Supported Form Factor': 'ATX,mATX' }, warranty_months: 12, delivery_estimate: 'UAE 1 day', tags: ['accessory'] },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (category: Category) => products.filter((p) => p.category === category);
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getDealsProducts = () => products.filter((p) => p.deal_of_week || (p.compare_at_aed ?? 0) > p.price_aed);
export const searchProducts = (q: string) => {
  const s = q.toLowerCase();
  return products.filter((p) => `${p.title} ${p.brand} ${p.tags.join(' ')}`.toLowerCase().includes(s));
};
