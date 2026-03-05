'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, MapPin, User, Phone, Mail, Building2, Calendar, Lock, Truck, Wallet } from 'lucide-react';
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

const emirates = [
  'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Fujairah', 
  'Ras Al Khaimah', 'Umm Al Quwain'
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1); // 1: Customer, 2: Address, 3: Payment, 4: Review
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Customer info
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Address info
  const [addressInfo, setAddressInfo] = useState({
    emirate: '',
    area: '',
    address: '',
    deliveryNotes: ''
  });
  
  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod or card
  
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
    if (subtotal >= 500) {
      // Assuming promo code is applied automatically if conditions met
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

  // Get product details for each cart item
  const cartWithDetails = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId) as Product;
    return { ...item, product };
  });

  // Handle form submission for each step
  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerInfo.name && customerInfo.email && customerInfo.phone) {
      setStep(2);
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInfo.emirate && addressInfo.area && addressInfo.address) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true);
      // Clear cart after successful order
      localStorage.removeItem('cart');
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-900/20 border border-green-700 rounded-xl p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-xl text-gray-300 mb-6">
                Thank you for your purchase. Your order has been placed successfully.
              </p>
              <div className="bg-gray-800 rounded-lg p-6 text-left mb-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Order Number:</span>
                    <span className="font-mono">CB-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Items:</span>
                    <span>{itemTotal} {itemTotal === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-bold">{total.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery:</span>
                    <span>2-3 business days</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                A confirmation email has been sent to {customerInfo.email}. 
                If you have any questions, please contact us.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-xl text-gray-400 mb-6">Add some products to your cart before checkout</p>
          <Button>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>
                  1
                </div>
                <span className="text-sm">Customer</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>
                  2
                </div>
                <span className="text-sm">Address</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-400' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>
                  3
                </div>
                <span className="text-sm">Payment</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 4 ? 'text-blue-400' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? 'bg-blue-500 text-white' : 'bg-gray-700'}`}>
                  4
                </div>
                <span className="text-sm">Review</span>
              </div>
            </div>
            
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" /> Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCustomerSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        placeholder="Enter your full name"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          placeholder="your@email.com"
                          className="bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          placeholder="+971 50 123 4567"
                          className="bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                      Continue to Address <MapPin className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Step 2: Address Information */}
            {step === 2 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emirate">Emirate</Label>
                        <Select value={addressInfo.emirate} onValueChange={(value) => setAddressInfo({...addressInfo, emirate: value})}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="Select Emirate" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600 text-white">
                            {emirates.map(emirate => (
                              <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="area">Area/Location</Label>
                        <Input
                          id="area"
                          type="text"
                          value={addressInfo.area}
                          onChange={(e) => setAddressInfo({...addressInfo, area: e.target.value})}
                          placeholder="e.g., Downtown Dubai"
                          className="bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Full Address</Label>
                      <Input
                        id="address"
                        type="text"
                        value={addressInfo.address}
                        onChange={(e) => setAddressInfo({...addressInfo, address: e.target.value})}
                        placeholder="Building name, floor, apartment number, etc."
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery-notes">Delivery Notes (Optional)</Label>
                      <Input
                        id="delivery-notes"
                        type="text"
                        value={addressInfo.deliveryNotes}
                        onChange={(e) => setAddressInfo({...addressInfo, deliveryNotes: e.target.value})}
                        placeholder="Any special instructions for delivery..."
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(1)}
                        className="flex-1 border-gray-600 text-white"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Continue to Payment <CreditCard className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Step 3: Payment Method */}
            {step === 3 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="p-4 border border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-blue-400" />
                            <div>
                              <h3 className="font-medium">Cash on Delivery (COD)</h3>
                              <p className="text-sm text-gray-400">Pay when your order is delivered</p>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="p-4 border border-gray-600 rounded-lg hover:border-blue-500 transition-colors opacity-50">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-blue-400" />
                            <div>
                              <h3 className="font-medium">Credit/Debit Card</h3>
                              <p className="text-sm text-gray-400">Coming soon - Pay online securely</p>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
                    <h4 className="font-medium mb-2">Delivery Information</h4>
                    <p className="text-sm text-gray-400">
                      Your order will be delivered to:<br />
                      <span className="font-medium">{addressInfo.address}, {addressInfo.area}, {addressInfo.emirate}</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(2)}
                      className="flex-1 border-gray-600 text-white"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setStep(4)} 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={paymentMethod === 'card'} // Only COD is available for now
                    >
                      Review Order <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                      <p className="text-yellow-400 text-sm">
                        Online card payments are coming soon. For now, Cash on Delivery is available.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Step 4: Review Order */}
            {step === 4 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" /> Review & Place Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Order Summary */}
                    <Card className="bg-gray-700/30 border-gray-600">
                      <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {cartWithDetails.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <p className="font-medium">{item.product.title}</p>
                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-medium">{(item.product.price_aed * item.quantity).toFixed(2)} AED</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Customer Info */}
                    <Card className="bg-gray-700/30 border-gray-600">
                      <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p><span className="font-medium">Name:</span> {customerInfo.name}</p>
                          <p><span className="font-medium">Email:</span> {customerInfo.email}</p>
                          <p><span className="font-medium">Phone:</span> {customerInfo.phone}</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Delivery Address */}
                    <Card className="bg-gray-700/30 border-gray-600">
                      <CardHeader>
                        <CardTitle>Delivery Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p>{addressInfo.address}</p>
                          <p>{addressInfo.area}, {addressInfo.emirate}</p>
                          {addressInfo.deliveryNotes && (
                            <p className="text-sm text-gray-400 mt-2">Delivery Notes: {addressInfo.deliveryNotes}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Payment Method */}
                    <Card className="bg-gray-700/30 border-gray-600">
                      <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-blue-400" />
                          <div>
                            <h3 className="font-medium">Cash on Delivery (COD)</h3>
                            <p className="text-sm text-gray-400">Pay when your order is delivered</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Price Summary */}
                    <Card className="bg-gray-700/30 border-gray-600">
                      <CardHeader>
                        <CardTitle>Price Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal ({itemTotal} items)</span>
                            <span>{subtotal.toFixed(2)} AED</span>
                          </div>
                          {discount > 0 && (
                            <div className="flex justify-between text-green-400">
                              <span>Promo Discount (15%)</span>
                              <span>-{discount.toFixed(2)} AED</span>
                            </div>
                          )}
                          {vat > 0 ? (
                            <div className="flex justify-between">
                              <span>VAT (5%)</span>
                              <span>{vat.toFixed(2)} AED</span>
                            </div>
                          ) : (
                            <div className="flex justify-between text-green-400">
                              <span>VAT Waived (Order > 5000 AED)</span>
                              <span>-{(subtotal * 0.05).toFixed(2)} AED</span>
                            </div>
                          )}
                          <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                            <span>Total</span>
                            <span>{total.toFixed(2)} AED</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex gap-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep(3)}
                        className="flex-1 border-gray-600 text-white"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handlePlaceOrder} 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartWithDetails.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.product.title}</p>
                        <p className="text-gray-400">x{item.quantity}</p>
                      </div>
                      <p>{(item.product.price_aed * item.quantity).toFixed(2)} AED</p>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{subtotal.toFixed(2)} AED</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount</span>
                        <span>-{discount.toFixed(2)} AED</span>
                      </div>
                    )}
                    {vat > 0 ? (
                      <div className="flex justify-between">
                        <span>VAT (5%)</span>
                        <span>{vat.toFixed(2)} AED</span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-green-400">
                        <span>VAT Waived</span>
                        <span>-{(subtotal * 0.05).toFixed(2)} AED</span>
                      </div>
                    )}
                    <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)} AED</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
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
      </div>
    </div>
  );
}