'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Star, 
  ShoppingCart, 
  Search,
  Filter,
  Heart,
  Eye,
  TrendingUp,
  Gem,
  Headphones,
  Monitor,
  Cpu,
  Memory,
  HardDrive
} from 'lucide-react';
import ChatWidget from '@/components/chat/chat-widget';

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'RTX 4090 24GB',
    brand: 'NVIDIA',
    price: 1599.99,
    originalPrice: 1799.99,
    rating: 4.9,
    reviews: 124,
    image: 'https://placehold.co/300x300/0f172a/0ef3a6?text=RTX+4090',
    category: 'GPU',
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Intel i9-14900K',
    brand: 'Intel',
    price: 589.99,
    originalPrice: 649.99,
    rating: 4.8,
    reviews: 89,
    image: 'https://placehold.co/300x300/0f172a/ff00ff?text=i9-14900K',
    category: 'CPU',
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    name: '32GB DDR5 5200MHz',
    brand: 'Corsair',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 210,
    image: 'https://placehold.co/300x300/0f172a/0ef3a6?text=DDR5+32GB',
    category: 'RAM',
    inStock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: '4',
    name: '27" 4K 144Hz Monitor',
    brand: 'ASUS',
    price: 549.99,
    originalPrice: 699.99,
    rating: 4.6,
    reviews: 156,
    image: 'https://placehold.co/300x300/0f172a/ff00ff?text=4K+Monitor',
    category: 'Monitor',
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Mechanical Gaming Keyboard',
    brand: 'Razer',
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 324,
    image: 'https://placehold.co/300x300/0f172a/0ef3a6?text=Gaming+KB',
    category: 'Peripherals',
    inStock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    brand: 'Logitech',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 187,
    image: 'https://placehold.co/300x300/0f172a/ff00ff?text=Gaming+Mouse',
    category: 'Peripherals',
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
];

const categories = [
  { id: 'gpu', name: 'Graphics Cards', icon: <HardDrive className="w-5 h-5" />, count: 128 },
  { id: 'cpu', name: 'Processors', icon: <Cpu className="w-5 h-5" />, count: 96 },
  { id: 'ram', name: 'Memory', icon: <Memory className="w-5 h-5" />, count: 78 },
  { id: 'monitor', name: 'Monitors', icon: <Monitor className="w-5 h-5" />, count: 64 },
  { id: 'peripherals', name: 'Peripherals', icon: <Headphones className="w-5 h-5" />, count: 142 },
  { id: 'games', name: 'Games', icon: <Gamepad2 className="w-5 h-5" />, count: 324 },
];

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = mockProducts.filter(p => p.isFeatured);
  const newProducts = mockProducts.filter(p => p.isNew);
  const onSaleProducts = mockProducts.filter(p => p.originalPrice > p.price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gaming-dark to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 cyber-grid-bg">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gaming-cyber to-gaming-neon">
              Level Up Your Gaming
            </h1>
            <p className="text-xl text-gaming-cyber/80 mb-8 max-w-2xl mx-auto">
              Discover premium gaming hardware, exclusive deals, and expert compatibility advice. 
              Your ultimate destination for high-performance gaming gear.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="neon-button px-8 py-6 text-lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Shop Now
              </Button>
              <Button variant="outline" size="lg" className="border-gaming-cyber text-gaming-cyber hover:bg-gaming-cyber hover:text-gaming-dark px-8 py-6 text-lg">
                <Shield className="mr-2 h-5 w-5" /> Compatibility Check
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gaming-dark/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gaming-cyber">10K+</div>
              <div className="text-gaming-cyber/80">Happy Gamers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gaming-cyber">1K+</div>
              <div className="text-gaming-cyber/80">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gaming-cyber">4.9/5</div>
              <div className="text-gaming-cyber/80">Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gaming-cyber">24/7</div>
              <div className="text-gaming-cyber/80">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border transition-all ${
                  selectedCategory === category.id
                    ? 'border-gaming-cyber bg-gaming-cyber/10'
                    : 'border-gaming-dark hover:border-gaming-cyber/50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 text-gaming-cyber">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gaming-cyber/70">{category.count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gaming-dark/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gaming-cyber/50" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gaming-dark border border-gaming-cyber/30 rounded-lg text-white placeholder-gaming-cyber/50 focus:outline-none focus:ring-2 focus:ring-gaming-cyber"
                />
              </div>
              <Button variant="outline" size="icon" className="border-gaming-cyber text-gaming-cyber">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gaming-dark/50 border border-gaming-cyber/30">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="onsale">On Sale</TabsTrigger>
            </TabsList>
            <TabsContent value="featured" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(activeTab === 'featured' ? featuredProducts : 
                  activeTab === 'new' ? newProducts : 
                  onSaleProducts
                ).map((product) => (
                  <Card key={product.id} className="gaming-card overflow-hidden hover:scale-105 transition-transform">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-gaming-neon text-gaming-dark">NEW</Badge>
                      )}
                      {product.originalPrice > product.price && (
                        <Badge variant="secondary" className="absolute top-2 right-2 bg-red-500/20 text-red-400">
                          SALE
                        </Badge>
                      )}
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button size="icon" variant="secondary" className="bg-gaming-dark/80 backdrop-blur-sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="bg-gaming-dark/80 backdrop-blur-sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.brand}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gaming-cyber/30'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gaming-cyber/70">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                          {product.originalPrice > product.price && (
                            <span className="ml-2 text-sm text-gaming-cyber/50 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full neon-button">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Computer Buddy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border border-gaming-cyber/30 bg-gaming-dark/30">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gaming-cyber/10 mb-4">
                <Zap className="h-8 w-8 text-gaming-cyber" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast Delivery</h3>
              <p className="text-gaming-cyber/70">
                Get your gear delivered in as little as 24 hours with our express shipping options.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gaming-cyber/30 bg-gaming-dark/30">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gaming-cyber/10 mb-4">
                <Shield className="h-8 w-8 text-gaming-cyber" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gaming-cyber/70">
                Find a lower price? We'll match it and give you an extra 10% off.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gaming-cyber/30 bg-gaming-dark/30">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-gaming-cyber/10 mb-4">
                <Gem className="h-8 w-8 text-gaming-cyber" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gaming-cyber/70">
                Our gaming experts are here to help you build the perfect rig.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gaming-cyber/10 to-gaming-neon/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="text-xl text-gaming-cyber/80 mb-8 max-w-2xl mx-auto">
            Join thousands of gamers who trust Computer Buddy for their hardware needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="neon-button px-8 py-6 text-lg">
              <Gamepad2 className="mr-2 h-5 w-5" /> Shop Gaming Gear
            </Button>
            <Button variant="outline" size="lg" className="border-gaming-cyber text-gaming-cyber hover:bg-gaming-cyber hover:text-gaming-dark px-8 py-6 text-lg">
              <TrendingUp className="mr-2 h-5 w-5" /> View Deals
            </Button>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      {isClient && <ChatWidget />}
    </div>
  );
}