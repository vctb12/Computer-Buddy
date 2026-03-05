import { createProduct } from './helpers';
export const laptopProducts = Array.from({ length: 8 }, (_, i) => createProduct({ id: 16000 + i, slug: `gaming-laptop-${16000+i}`, title: `Gaming Laptop ${i+1}`, brand: 'ASUS', category: 'prebuilt', price_aed: 3499 + i * 250, specs: { CPU: 'Core i7', GPU: 'RTX 4060', RAM: '16GB' }, tags: ['laptops', 'uae'] }));
