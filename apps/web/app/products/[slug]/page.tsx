'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw } from 'lucide-react';
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

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug) as Product;

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-xl text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Format price with AED currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Gallery */}
          <div>
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title} 
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-gray-800 rounded-lg p-2 ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-20 object-contain rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                {product.compare_at && product.compare_at > product.price_aed && (
                  <Badge className="bg-red-500 ml-2">SALE</Badge>
                )}
              </div>
              <p className="text-gray-400 mb-4">{product.brand}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-400">({product.rating}/5.0)</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">{formatCurrency(product.price_aed)}</span>
                {product.compare_at && product.compare_at > product.price_aed && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatCurrency(product.compare_at)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-600 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={decrementQuantity}
                  className="rounded-r-none"
                >
                  -
                </Button>
                <span className="px-4 py-2">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={incrementQuantity}
                  className="rounded-l-none"
                >
                  +
                </Button>
              </div>
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button variant="outline" className="flex-1 border-gray-600 text-white">
                <Heart className="mr-2 h-5 w-5" /> Wishlist
              </Button>
              <Button variant="outline" className="flex-1 border-gray-600 text-white">
                <Share2 className="mr-2 h-5 w-5" /> Share
              </Button>
            </div>

            {/* Product Highlights */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <Shield className="mx-auto h-6 w-6 text-blue-400 mb-2" />
                <p className="text-sm text-gray-400">{product.warranty}</p>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <Truck className="mx-auto h-6 w-6 text-blue-400 mb-2" />
                <p className="text-sm text-gray-400">{product.delivery_estimate}</p>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <RotateCcw className="mx-auto h-6 w-6 text-blue-400 mb-2" />
                <p className="text-sm text-gray-400">30-Day Returns</p>
              </div>
            </div>

            {/* Tabs for Details */}
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="specs" className="text-white data-[state=active]:bg-blue-600">Specifications</TabsTrigger>
                <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-blue-600">Reviews</TabsTrigger>
                <TabsTrigger value="warranty" className="text-white data-[state=active]:bg-blue-600">Warranty</TabsTrigger>
              </TabsList>
              <TabsContent value="specs" className="mt-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-700 pb-2">
                          <p className="text-sm text-gray-400">{key}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm">John D. - Verified Purchase</span>
                        </div>
                        <p className="text-gray-300">Excellent performance! Runs all the latest games at max settings.</p>
                      </div>
                      <div className="p-4 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm">Sarah M. - Verified Purchase</span>
                        </div>
                        <p className="text-gray-300">Great value for money. Installation was straightforward.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="warranty" className="mt-6">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle>Warranty Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>{product.warranty}</p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Coverage includes manufacturing defects</li>
                        <li>Requires proof of purchase for warranty claims</li>
                        <li>Warranty void if product is misused or modified</li>
                        <li>Contact our support team for warranty assistance</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}