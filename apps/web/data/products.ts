export type Category =
  | "prebuilt" | "gpu" | "cpu" | "ram" | "storage"
  | "mobo" | "psu" | "case" | "cooling" | "keyboard"
  | "mouse" | "headset" | "chair" | "monitor" | "service";

export interface Product {
  id: string;
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
  specs: Record<string, string>;
  warranty_months: number;
  delivery_estimate: string;
  tags: string[];
  featured?: boolean;
  deal_of_week?: boolean;
}

export const products: Product[] = [
  // Graphics Cards
  {
    id: 'gpu-1',
    slug: 'nvidia-geforce-rtx-4090-24gb',
    title: 'NVIDIA GeForce RTX 4090 24GB',
    brand: 'NVIDIA',
    category: 'gpu',
    price_aed: 6499,
    compare_at_aed: 6999,
    stock: 12,
    rating: 4.9,
    review_count: 142,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=RTX+4090'],
    specs: {
      'CUDA Cores': '16384',
      'Base Clock': '2230 MHz',
      'Boost Clock': '2520 MHz',
      'Memory': '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'TGP': '450W',
      'Interface': 'PCIe 4.0 x16',
      'Length': '312 mm'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['bestseller', 'high-end', '4k-gaming'],
    featured: true
  },
  {
    id: 'gpu-2',
    slug: 'nvidia-geforce-rtx-4080-16gb',
    title: 'NVIDIA GeForce RTX 4080 16GB',
    brand: 'NVIDIA',
    category: 'gpu',
    price_aed: 4299,
    compare_at_aed: 4599,
    stock: 8,
    rating: 4.8,
    review_count: 98,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=RTX+4080'],
    specs: {
      'CUDA Cores': '9728',
      'Base Clock': '2205 MHz',
      'Boost Clock': '2505 MHz',
      'Memory': '16GB GDDR6X',
      'Memory Bus': '256-bit',
      'TGP': '320W',
      'Interface': 'PCIe 4.0 x16',
      'Length': '285 mm'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['4k-gaming', 'ray-tracing'],
    featured: true
  },
  {
    id: 'gpu-3',
    slug: 'amd-radeon-rx-7900-xtx-24gb',
    title: 'AMD Radeon RX 7900 XTX 24GB',
    brand: 'AMD',
    category: 'gpu',
    price_aed: 3999,
    compare_at_aed: 4299,
    stock: 5,
    rating: 4.7,
    review_count: 76,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=RX+7900+XTX'],
    specs: {
      'Stream Processors': '6144',
      'Base Clock': '1855 MHz',
      'Boost Clock': '2500 MHz',
      'Memory': '24GB GDDR6',
      'Memory Bus': '384-bit',
      'TGP': '355W',
      'Interface': 'PCIe 4.0 x16',
      'Length': '295 mm'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['4k-gaming', 'vr-ready'],
    featured: true
  },
  {
    id: 'gpu-4',
    slug: 'nvidia-geforce-rtx-4070-ti-12gb',
    title: 'NVIDIA GeForce RTX 4070 Ti 12GB',
    brand: 'NVIDIA',
    category: 'gpu',
    price_aed: 2999,
    compare_at_aed: 3299,
    stock: 15,
    rating: 4.6,
    review_count: 124,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=RTX+4070+Ti'],
    specs: {
      'CUDA Cores': '7680',
      'Base Clock': '2310 MHz',
      'Boost Clock': '2790 MHz',
      'Memory': '12GB GDDR6X',
      'Memory Bus': '192-bit',
      'TGP': '285W',
      'Interface': 'PCIe 4.0 x16',
      'Length': '285 mm'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['qhd-gaming', 'dlss'],
    featured: true
  },

  // Processors
  {
    id: 'cpu-1',
    slug: 'intel-core-i9-14900k',
    title: 'Intel Core i9-14900K',
    brand: 'Intel',
    category: 'cpu',
    price_aed: 1899,
    compare_at_aed: 2199,
    stock: 10,
    rating: 4.9,
    review_count: 89,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=i9-14900K'],
    specs: {
      'Cores': '24 (8P + 16E)',
      'Threads': '32',
      'Base Clock': '3.2 GHz',
      'Max Boost': '5.8 GHz',
      'Cache': '36 MB',
      'TDP': '125W',
      'Socket': 'LGA1700',
      'Generation': '14th Gen'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['overclockable', 'gaming', 'content-creation'],
    featured: true
  },
  
  // Processors
  {
    id: 'cpu-1',
    slug: 'intel-core-i9-14900k',
    title: 'Intel Core i9-14900K',
    brand: 'Intel',
    category: 'cpu',
    price_aed: 1899,
    compare_at: 2199,
    stock: 10,
    rating: 4.9,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=i9-14900K'],
    specs: {
      'Cores': '24 (8P + 16E)',
      'Threads': '32',
      'Base Clock': '3.2 GHz',
      'Max Boost': '5.8 GHz',
      'Cache': '36 MB',
      'TDP': '125W'
    },
    warranty: '3 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['overclockable', 'gaming', 'content-creation']
  },
  {
    id: 'cpu-2',
    slug: 'amd-ryzen-9-7950x',
    title: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    category: 'cpu',
    price_aed: 2199,
    compare_at_aed: 2499,
    stock: 6,
    rating: 4.8,
    review_count: 74,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Ryzen+9+7950X'],
    specs: {
      'Cores': '16',
      'Threads': '32',
      'Base Clock': '4.5 GHz',
      'Max Boost': '5.7 GHz',
      'Cache': '80 MB',
      'TDP': '170W',
      'Socket': 'AM5',
      'Generation': '7000 Series'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['overclockable', 'content-creation', 'multi-threading'],
    featured: true
  },
  {
    id: 'cpu-3',
    slug: 'intel-core-i7-14700k',
    title: 'Intel Core i7-14700K',
    brand: 'Intel',
    category: 'cpu',
    price_aed: 1399,
    compare_at_aed: 1599,
    stock: 12,
    rating: 4.7,
    review_count: 102,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=i7-14700K'],
    specs: {
      'Cores': '20 (8P + 12E)',
      'Threads': '28',
      'Base Clock': '3.4 GHz',
      'Max Boost': '5.6 GHz',
      'Cache': '33 MB',
      'TDP': '125W',
      'Socket': 'LGA1700',
      'Generation': '14th Gen'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['gaming', 'multitasking']
  },
  {
    id: 'cpu-4',
    slug: 'amd-ryzen-7-7800x3d',
    title: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    category: 'cpu',
    price_aed: 1699,
    compare_at_aed: 1899,
    stock: 8,
    rating: 4.9,
    review_count: 156,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Ryzen+7+7800X3D'],
    specs: {
      'Cores': '8',
      'Threads': '16',
      'Base Clock': '4.2 GHz',
      'Max Boost': '5.0 GHz',
      'Cache': '96 MB',
      'TDP': '120W',
      'Socket': 'AM5',
      'Generation': '7000 Series',
      'Feature': '3D V-Cache'
    },
    warranty_months: 36,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['gaming', '3d-v-cache', 'high-clock'],
    featured: true
  },

  // Memory
  {
    id: 'ram-1',
    slug: 'corsair-vengeance-rgb-32gb-ddr5',
    title: 'Corsair Vengeance RGB 32GB DDR5 6000MHz',
    brand: 'Corsair',
    category: 'ram',
    price_aed: 1299,
    compare_at_aed: 1499,
    stock: 20,
    rating: 4.7,
    review_count: 87,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Corsair+32GB'],
    specs: {
      'Capacity': '32GB (2x16GB)',
      'Speed': '6000 MHz',
      'Timings': 'CL36',
      'Voltage': '1.35V',
      'Type': 'DDR5',
      'Kit': 'Dual Channel',
      'RGB': 'Yes'
    },
    warranty_months: 24,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['rgb', 'overclocked', 'dual-channel'],
    featured: true
  },

  // Memory
  {
    id: 'ram-1',
    slug: 'corsair-vengeance-rgb-32gb-ddr5',
    title: 'Corsair Vengeance RGB 32GB DDR5 6000MHz',
    brand: 'Corsair',
    category: 'memory',
    price_aed: 1299,
    compare_at: 1499,
    stock: 20,
    rating: 4.7,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Corsair+32GB'],
    specs: {
      'Capacity': '32GB (2x16GB)',
      'Speed': '6000 MHz',
      'Timings': 'CL36',
      'Voltage': '1.35V',
      'Type': 'DDR5'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['rgb', 'overclocked', 'dual-channel']
  },
  {
    id: 'ram-2',
    slug: 'gskill-trident-z5-rgb-64gb-ddr5',
    title: 'G.Skill Trident Z5 RGB 64GB DDR5 6200MHz',
    brand: 'G.Skill',
    category: 'ram',
    price_aed: 2199,
    compare_at_aed: 2499,
    stock: 10,
    rating: 4.8,
    review_count: 64,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=G.Skill+64GB'],
    specs: {
      'Capacity': '64GB (2x32GB)',
      'Speed': '6200 MHz',
      'Timings': 'CL38',
      'Voltage': '1.40V',
      'Type': 'DDR5',
      'Kit': 'Dual Channel',
      'RGB': 'Yes'
    },
    warranty_months: 24,
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['rgb', 'high-capacity', 'extreme-performance'],
    featured: true
  },
  {
    id: 'ram-3',
    slug: 'crucial-ballistix-16gb-ddr4',
    title: 'Crucial Ballistix 16GB DDR4 3200MHz',
    brand: 'Crucial',
    category: 'memory',
    price_aed: 499,
    compare_at: 599,
    stock: 25,
    rating: 4.5,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Crucial+16GB'],
    specs: {
      'Capacity': '16GB (2x8GB)',
      'Speed': '3200 MHz',
      'Timings': 'CL16',
      'Voltage': '1.35V',
      'Type': 'DDR4'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['budget', 'reliable', 'dual-channel']
  },
  {
    id: 'ram-4',
    slug: 'kingston-fury-beast-32gb-ddr5',
    title: 'Kingston Fury Beast 32GB DDR5 5600MHz',
    brand: 'Kingston',
    category: 'memory',
    price_aed: 999,
    compare_at: 1199,
    stock: 15,
    rating: 4.6,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Kingston+32GB'],
    specs: {
      'Capacity': '32GB (2x16GB)',
      'Speed': '5600 MHz',
      'Timings': 'CL36',
      'Voltage': '1.35V',
      'Type': 'DDR5'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['value', 'performance', 'dual-channel']
  },

  // Storage
  {
    id: 'storage-1',
    slug: 'samsung-980-pro-2tb',
    title: 'Samsung 980 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung',
    category: 'storage',
    price_aed: 899,
    compare_at: 1099,
    stock: 18,
    rating: 4.9,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Samsung+980+PRO'],
    specs: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4',
      'Form Factor': 'M.2 2280',
      'Read Speed': '7000 MB/s',
      'Write Speed': '5000 MB/s'
    },
    warranty: '5 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['nvme', 'high-performance', 'gaming']
  },
  {
    id: 'storage-2',
    slug: 'wd-black-sn850x-4tb',
    title: 'WD Black SN850X 4TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Western Digital',
    category: 'storage',
    price_aed: 1599,
    compare_at: 1799,
    stock: 12,
    rating: 4.8,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=WD+Black+SN850X'],
    specs: {
      'Capacity': '4TB',
      'Interface': 'PCIe 4.0 x4',
      'Form Factor': 'M.2 2280',
      'Read Speed': '7300 MB/s',
      'Write Speed': '6600 MB/s'
    },
    warranty: '5 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['nvme', 'high-capacity', 'extreme-performance']
  },
  {
    id: 'storage-3',
    slug: 'seagate-firecuda-530-1tb',
    title: 'Seagate FireCuda 530 1TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Seagate',
    category: 'storage',
    price_aed: 599,
    compare_at: 699,
    stock: 20,
    rating: 4.7,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=FireCuda+530'],
    specs: {
      'Capacity': '1TB',
      'Interface': 'PCIe 4.0 x4',
      'Form Factor': 'M.2 2280',
      'Read Speed': '7300 MB/s',
      'Write Speed': '6900 MB/s'
    },
    warranty: '5 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['nvme', 'performance', 'gaming']
  },
  {
    id: 'storage-4',
    slug: 'crucial-mx500-2tb',
    title: 'Crucial MX500 2TB SATA III 2.5" SSD',
    brand: 'Crucial',
    category: 'storage',
    price_aed: 449,
    compare_at: 499,
    stock: 30,
    rating: 4.6,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Crucial+MX500'],
    specs: {
      'Capacity': '2TB',
      'Interface': 'SATA III',
      'Form Factor': '2.5"',
      'Read Speed': '560 MB/s',
      'Write Speed': '510 MB/s'
    },
    warranty: '3 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['sata', 'value', 'upgrade']
  },

  // Monitors
  {
    id: 'monitor-1',
    slug: 'asus-rog-strix-27-inch-qhd-240hz',
    title: 'ASUS ROG Strix 27-inch QHD 240Hz Gaming Monitor',
    brand: 'ASUS',
    category: 'monitor',
    price_aed: 1499,
    compare_at: 1699,
    stock: 8,
    rating: 4.8,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=ASUS+ROG+27"'],
    specs: {
      'Size': '27-inch',
      'Resolution': 'QHD (2560x1440)',
      'Refresh Rate': '240Hz',
      'Response Time': '1ms',
      'Panel Type': 'IPS',
      'HDR': 'HDR10'
    },
    warranty: '3 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['gaming', 'qhd', 'high-refresh']
  },
  {
    id: 'monitor-2',
    slug: 'msi-pregaming-24-inch-fhd-144hz',
    title: 'MSI Pro Gaming 24-inch FHD 144Hz Gaming Monitor',
    brand: 'MSI',
    category: 'monitor',
    price_aed: 699,
    compare_at: 799,
    stock: 15,
    rating: 4.5,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=MSI+Pro+24"'],
    specs: {
      'Size': '24-inch',
      'Resolution': 'FHD (1920x1080)',
      'Refresh Rate': '144Hz',
      'Response Time': '1ms',
      'Panel Type': 'VA',
      'HDR': 'HDR Ready'
    },
    warranty: '3 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['gaming', 'fhd', 'budget']
  },
  {
    id: 'monitor-3',
    slug: 'lg-ultrawide-34-inch-quadhd',
    title: 'LG UltraWide 34-inch QuadHD Curved Monitor',
    brand: 'LG',
    category: 'monitor',
    price_aed: 1999,
    compare_at: 2299,
    stock: 5,
    rating: 4.7,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=LG+UltraWide'],
    specs: {
      'Size': '34-inch',
      'Resolution': 'QuadHD (3440x1440)',
      'Aspect Ratio': '21:9',
      'Refresh Rate': '144Hz',
      'Response Time': '1ms',
      'Panel Type': 'VA',
      'Curved': 'Yes (1500R)'
    },
    warranty: '3 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['ultrawide', 'curved', 'productivity']
  },
  {
    id: 'monitor-4',
    slug: 'acer-predator-x34-34-inch-uhd',
    title: 'Acer Predator X34 34-inch UHD Curved Gaming Monitor',
    brand: 'Acer',
    category: 'monitor',
    price_aed: 3499,
    compare_at: 3999,
    stock: 3,
    rating: 4.9,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Acer+Predator'],
    specs: {
      'Size': '34-inch',
      'Resolution': 'UHD (3840x2160)',
      'Aspect Ratio': '21:9',
      'Refresh Rate': '160Hz',
      'Response Time': '0.03ms',
      'Panel Type': 'IPS',
      'HDR': 'HDR400'
    },
    warranty: '3 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['ultrawide', 'uhd', 'premium']
  },

  // Peripherals
  {
    id: 'peripheral-1',
    slug: 'razer-huntsman-v2-linear-optical-switches',
    title: 'Razer Huntsman V2 Linear Optical Switches Gaming Keyboard',
    brand: 'Razer',
    category: 'peripherals',
    price_aed: 599,
    compare_at: 699,
    stock: 12,
    rating: 4.7,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Razer+Huntsman'],
    specs: {
      'Switch Type': 'Linear Optical',
      'Backlight': 'RGB Chroma',
      'Connection': 'Wired',
      'Layout': 'Tenkeyless',
      'Features': 'Analog Optical Switches'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['mechanical', 'rgb', 'gaming']
  },
  {
    id: 'peripheral-2',
    slug: 'logitech-g502-x-plus-lightspeed',
    title: 'Logitech G502 X Plus LIGHTSPEED Wireless Gaming Mouse',
    brand: 'Logitech',
    category: 'peripherals',
    price_aed: 399,
    compare_at: 449,
    stock: 18,
    rating: 4.8,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Logitech+G502'],
    specs: {
      'Sensor': 'HERO 25K',
      'DPI': '25,600 Max',
      'Buttons': '11 programmable',
      'Connection': 'LIGHTSPEED Wireless',
      'Battery Life': 'Up to 95 hours'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['wireless', 'high-dpi', 'programmable']
  },
  {
    id: 'peripheral-3',
    slug: 'steelseries-arctis-7p-wireless',
    title: 'SteelSeries Arctis 7P Wireless Gaming Headset',
    brand: 'SteelSeries',
    category: 'peripherals',
    price_aed: 499,
    compare_at: 549,
    stock: 10,
    rating: 4.6,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=SteelSeries+Arctis'],
    specs: {
      'Driver Size': '40mm',
      'Frequency Response': '10-40,000 Hz',
      'Connection': 'Wireless 2.4GHz',
      'Battery Life': 'Up to 27 hours',
      'Microphone': 'Retractable Boom'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['wireless', 'surround-sound', 'comfortable']
  },
  {
    id: 'peripheral-4',
    slug: 'corsair-void-pro-rgb-wireless',
    title: 'Corsair VOID PRO RGB Wireless Gaming Headset',
    brand: 'Corsair',
    category: 'peripherals',
    price_aed: 349,
    compare_at: 399,
    stock: 14,
    rating: 4.5,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Corsair+VOID'],
    specs: {
      'Driver Size': '50mm',
      'Frequency Response': '20-30,000 Hz',
      'Connection': 'Wireless',
      'Battery Life': 'Up to 16 hours',
      'Microphone': 'Detachable Noise-Canceling'
    },
    warranty: '2 years manufacturer warranty',
    delivery_estimate: '2-3 business days (UAE)',
    tags: ['wireless', 'rgb', 'microphone']
  },

  // Prebuilt PCs
  {
    id: 'pc-1',
    slug: 'computer-buddy-ultra-gaming-pc',
    title: 'Computer Buddy Ultra Gaming PC - RTX 4090',
    brand: 'Computer Buddy',
    category: 'prebuilt-pcs',
    price_aed: 12999,
    compare_at: 14999,
    stock: 3,
    rating: 4.9,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Ultra+Gaming+PC'],
    specs: {
      'CPU': 'Intel Core i9-14900K',
      'GPU': 'NVIDIA RTX 4090 24GB',
      'RAM': '64GB DDR5 6200MHz',
      'Storage': '2TB NVMe SSD + 2TB HDD',
      'PSU': '1600W 80+ Gold',
      'Case': 'Tempered Glass Mid-Tower'
    },
    warranty: '3 years comprehensive warranty',
    delivery_estimate: '3-5 business days (UAE)',
    tags: ['high-end', 'ready-to-use', 'premium']
  },
  {
    id: 'pc-2',
    slug: 'computer-buddy-pro-gaming-pc',
    title: 'Computer Buddy Pro Gaming PC - RTX 4070 Ti',
    brand: 'Computer Buddy',
    category: 'prebuilt-pcs',
    price_aed: 6499,
    compare_at: 7299,
    stock: 7,
    rating: 4.8,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Pro+Gaming+PC'],
    specs: {
      'CPU': 'Intel Core i7-14700K',
      'GPU': 'NVIDIA RTX 4070 Ti 12GB',
      'RAM': '32GB DDR5 6000MHz',
      'Storage': '1TB NVMe SSD',
      'PSU': '850W 80+ Gold',
      'Case': 'RGB Mid-Tower'
    },
    warranty: '3 years comprehensive warranty',
    delivery_estimate: '3-5 business days (UAE)',
    tags: ['mid-range', 'ready-to-use', 'performance']
  },
  {
    id: 'pc-3',
    slug: 'computer-buddy-esports-champion-pc',
    title: 'Computer Buddy Esports Champion PC - AMD',
    brand: 'Computer Buddy',
    category: 'prebuilt-pcs',
    price_aed: 5999,
    compare_at: 6799,
    stock: 5,
    rating: 4.7,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Esports+PC'],
    specs: {
      'CPU': 'AMD Ryzen 7 7800X3D',
      'GPU': 'AMD RX 7900 XTX 24GB',
      'RAM': '32GB DDR5 5600MHz',
      'Storage': '1TB NVMe SSD',
      'PSU': '850W 80+ Gold',
      'Case': 'RGB Mid-Tower'
    },
    warranty: '3 years comprehensive warranty',
    delivery_estimate: '3-5 business days (UAE)',
    tags: ['amd', 'gaming', 'ready-to-use']
  },
  {
    id: 'pc-4',
    slug: 'computer-buddy-content-creator-pc',
    title: 'Computer Buddy Content Creator PC',
    brand: 'Computer Buddy',
    category: 'prebuilt-pcs',
    price_aed: 8999,
    compare_at: 9999,
    stock: 4,
    rating: 4.9,
    images: ['https://placehold.co/400x400/1a1a1a/ffffff?text=Creator+PC'],
    specs: {
      'CPU': 'AMD Ryzen 9 7950X',
      'GPU': 'NVIDIA RTX 4080 16GB',
      'RAM': '64GB DDR5 6200MHz',
      'Storage': '2TB NVMe SSD + 4TB HDD',
      'PSU': '1000W 80+ Platinum',
      'Case': 'Tempered Glass ATX'
    },
    warranty: '3 years comprehensive warranty',
    delivery_estimate: '3-5 business days (UAE)',
    tags: ['content-creation', 'multitasking', 'ready-to-use']
  }
];