'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Trash2, Plus, Minus, ShoppingCart, CreditCard, Truck, Wallet } from 'lucide-react';
import { products } from '@/data/products';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
}

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

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate cart totals
  const calculateTotals = () => {
    let subtotal = 0;
    let itemTotal = 0;

    cartItems.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        subtotal += product.price_aed * item.quantity;
        itemTotal += item.quantity;
      }
    });

    // Apply promo code discount if applicable
    let discount = 0;
    if (promoApplied && subtotal >= 500) {
      discount = subtotal * 0.15; // 15% off
    }

    // Calculate VAT (5% on remaining amount after discount)
    let vat = (subtotal - discount) * 0.05;
    
    // VAT waiver if total > 5000 AED
    if (subtotal - discount > 5000) {
      vat = 0;
    }

    const total = subtotal - discount + vat;

    return { subtotal, discount, vat, total, itemTotal };
  };

  const { subtotal, discount, vat, total, itemTotal } = calculateTotals();

  // Handle quantity changes
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'BUDDY15' && subtotal >= 500) {
      setPromoApplied(true);
      setPromoError('');
    } else if (subtotal < 500) {
      setPromoError('Minimum order value of 500 AED required for this promo code');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  // Get product details for each cart item
  const cartWithDetails = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId) as Product;
    return { ...item, product };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8" /> Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-600" />
            <h3 className="mt-4 text-xl font-medium">Your cart is empty</h3>
            <p className="mt-2 text-gray-400">Add some amazing products to your cart!</p>
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartWithDetails.map((item) => (
                <Card key={item.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.title} 
                        className="w-24 h-24 object-contain rounded-lg bg-gray-700"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.product.title}</h3>
                        <p className="text-gray-400 text-sm">{item.product.brand}</p>
                        
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(item.product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-400">({item.product.rating})</span>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-gray-600 rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="rounded-r-none h-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="rounded-l-none h-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold">{(item.product.price_aed * item.quantity).toFixed(2)} AED</p>
                            {item.product.compare_at && item.product.compare_at > item.product.price_aed && (
                              <p className="text-sm text-gray-500 line-through">
                                {(item.product.compare_at * item.quantity).toFixed(2)} AED
                              </p>
                            )}
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeItem(item.productId)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 border-gray-700 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" /> Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({itemTotal} item{itemTotal !== 1 ? 's' : ''})</span>
                      <span>{subtotal.toFixed(2)} AED</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-green-400">
                        <span>Promo Code (BUDDY15): 15% off</span>
                        <span>-{discount.toFixed(2)} AED</span>
                      </div>
                    )}
                    
                    {vat > 0 && (
                      <div className="flex justify-between">
                        <span>VAT (5%)</span>
                        <span>{vat.toFixed(2)} AED</span>
                      </div>
                    )}
                    
                    {vat === 0 && subtotal > 5000 && (
                      <div className="flex justify-between text-green-400">
                        <span>VAT Waived (Order > 5000 AED)</span>
                        <span>-{(subtotal * 0.05).toFixed(2)} AED</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-700 pt-4 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)} AED</span>
                    </div>
                    
                    {/* Promo Code */}
                    <div className="pt-4">
                      <Label htmlFor="promo-code">Have a promo code?</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="promo-code"
                          type="text"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoApplied(false);
                            setPromoError('');
                          }}
                          placeholder="Enter code"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button 
                          onClick={applyPromoCode}
                          variant="outline"
                          className="border-gray-600 text-white"
                        >
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-red-400 text-sm mt-1">{promoError}</p>
                      )}
                    </div>
                    
                    {/* Checkout Button */}
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                      <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                    </Button>
                    
                    {/* Delivery Info */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <div className="flex items-center text-green-400">
                        <Truck className="h-5 w-5 mr-2" />
                        <span>Free delivery on orders over 1000 AED</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        Estimated delivery: 2-3 business days in UAE
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}