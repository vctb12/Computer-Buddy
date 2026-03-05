'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, Filter, Search, ShoppingCart, Heart, Eye, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';

interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  price_aed: number;
  compare_at?: number;
  stock: number;
  rating: number;
  images: string[];
  specs: Record<string, string>;
  warranty: string;
  delivery_estimate: string;
  tags: string[];
}

const categories = [
  { id: 'gpu', name: 'Graphics Cards', count: 0 },
  { id: 'cpu', name: 'Processors', count: 0 },
  { id: 'memory', name: 'Memory', count: 0 },
  { id: 'storage', name: 'Storage', count: 0 },
  { id: 'monitor', name: 'Monitors', count: 0 },
  { id: 'peripherals', name: 'Peripherals', count: 0 },
  { id: 'prebuilt-pcs', name: 'Prebuilt PCs', count: 0 },
];

// Calculate counts for each category
const categoryCounts = categories.map(cat => ({
  ...cat,
  count: products.filter(p => p.category === cat.id).length
}));

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter products based on criteria
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    result = result.filter(
      product => product.price_aed >= priceRange[0] && product.price_aed <= priceRange[1]
    );
    
    // Apply in stock filter
    if (inStockOnly) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price_aed - b.price_aed);
        break;
      case 'price-high':
        result.sort((a, b) => b.price_aed - a.price_aed);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Since we don't have date field, we'll sort by ID as a proxy
        result.sort((a, b) => parseFloat(b.id.replace(/\D/g, '')) - parseFloat(a.id.replace(/\D/g, '')));
        break;
      default:
        // Featured sorting (based on rating and stock)
        result.sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.stock - a.stock;
        });
    }
    
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, priceRange, inStockOnly, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden border-gray-600 text-white flex items-center gap-2"
              >
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Hidden on mobile unless toggled */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 15000]);
                    setInStockOnly(false);
                    setSortBy('featured');
                  }}
                  className="text-sm"
                >
                  Reset
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="all"
                      checked={selectedCategory === 'all'}
                      onCheckedChange={() => setSelectedCategory('all')}
                      className="mr-2"
                    />
                    <label htmlFor="all" className="text-sm">All Products</label>
                  </div>
                  {categoryCounts.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(category.id)}
                          className="mr-2"
                        />
                        <label htmlFor={category.id} className="text-sm">{category.name}</label>
                      </div>
                      <span className="text-xs text-gray-400">({category.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    min={0}
                    max={15000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{priceRange[0]} AED</span>
                    <span>{priceRange[1]} AED</span>
                  </div>
                </div>
              </div>

              {/* In Stock Only */}
              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(!!checked)}
                    className="mr-2"
                  />
                  <label htmlFor="in-stock" className="text-sm">In Stock Only</label>
                </div>
              </div>

              {/* Tags/Features */}
              <div>
                <h3 className="font-semibold mb-3">Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="bestseller" className="mr-2" />
                    <label htmlFor="bestseller" className="text-sm">Best Seller</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="new" className="mr-2" />
                    <label htmlFor="new" className="text-sm">New Arrival</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="onsale" className="mr-2" />
                    <label htmlFor="onsale" className="text-sm">On Sale</label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Products</h1>
              <p className="text-gray-400">{filteredProducts.length} products</p>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="mx-auto h-12 w-12 text-gray-600" />
                <h3 className="mt-4 text-lg font-medium">No products found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceRange([0, 15000]);
                    setInStockOnly(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300">
                    <div className="relative">
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="w-full h-48 object-cover"
                      />
                      {product.compare_at && product.compare_at > product.price_aed && (
                        <Badge className="absolute top-2 left-2 bg-red-500">SALE</Badge>
                      )}
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button size="icon" variant="secondary" className="bg-gray-800/80 backdrop-blur-sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="bg-gray-800/80 backdrop-blur-sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{product.title}</CardTitle>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-400">({product.rating})</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold">{product.price_aed} AED</span>
                          {product.compare_at && product.compare_at > product.price_aed && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {product.compare_at} AED
                            </span>
                          )}
                        </div>
                        <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}