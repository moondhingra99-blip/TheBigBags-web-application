import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, CheckCircle, Smartphone, MapPin, Truck, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    placeOrder,
    rewardPoints,
    setView
  } = useApp();

  // Address Form states
  const [shippingName, setShippingName] = useState('Rahul Sharma');
  const [email, setEmail] = useState('rahul.sharma@gmail.com');
  const [phone, setPhone] = useState('9876543210');
  const [addressLine, setAddressLine] = useState('Apt 4B, Heritage Towers, Sector 15');
  const [city, setCity] = useState('Gurugram');
  const [state, setState] = useState('Haryana');
  const [zip, setZip] = useState('122001');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe' | 'upi' | 'cod'>('cod');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal and shipping
  const subtotal = cart.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);
  const shippingCost = subtotal > 1999 ? 0 : 150;
  const finalTotal = subtotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <AlertCircle className="h-12 w-12 text-brand-gold mx-auto mb-4" />
        <h2 className="font-display font-black text-2xl text-brand-black">No Items To Checkout</h2>
        <p className="text-xs text-gray-500 mt-2">Your shopping bag is currently empty.</p>
        <button
          onClick={() => setView('shop')}
          className="mt-6 px-5 py-2.5 bg-brand-black text-white rounded-lg text-xs font-bold"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const addressString = `${addressLine}, ${city}, ${state} - ${zip}`;
      const success = await placeOrder(addressString, paymentMethod);
      if (success) {
        setView('success');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      <div className="border-b border-gray-100 pb-4 mb-8">
        <span className="font-mono text-xs uppercase text-brand-gold font-bold tracking-widest font-mono">Secured Server Encryption</span>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Address Details & Payment */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Shipping Address container */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black flex items-center gap-2 border-b border-gray-50 pb-3">
              <MapPin className="h-4 w-4 text-brand-gold" />
              <span>Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-gray-600">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">Phone Number (10 Digit Mobile)</label>
                <input 
                  type="tel" 
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-gray-600">Street Address / Landmark</label>
                <input 
                  type="text" 
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">City</label>
                <input 
                  type="text" 
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">State / Province</label>
                <input 
                  type="text" 
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-600">ZIP / Postal Code</label>
                <input 
                  type="text" 
                  required
                  pattern="[0-9]{6}"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full p-2.5 bg-gray-50/50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* Payment Options container */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black flex items-center gap-2 border-b border-gray-50 pb-3">
              <CreditCard className="h-4 w-4 text-brand-gold" />
              <span>Payment Methods</span>
            </h3>

            {/* Methods choices */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 border rounded-sm transition-all flex flex-col items-center gap-2 text-center cursor-pointer ${paymentMethod === 'cod' ? 'border-brand-gold bg-brand-cream text-brand-gold font-bold shadow-xs' : 'border-brand-taupe text-brand-gray hover:border-brand-gold'}`}
              >
                <Truck className="h-5 w-5" />
                <span>Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3.5 border rounded-sm transition-all flex flex-col items-center gap-2 text-center cursor-pointer ${paymentMethod === 'upi' ? 'border-brand-gold bg-brand-cream text-brand-gold font-bold shadow-xs' : 'border-brand-taupe text-brand-gray hover:border-brand-gold'}`}
              >
                <Smartphone className="h-5 w-5" />
                <span>UPI QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-3.5 border rounded-sm transition-all flex flex-col items-center gap-2 text-center cursor-pointer ${paymentMethod === 'razorpay' ? 'border-brand-gold bg-brand-cream text-brand-gold font-bold shadow-xs' : 'border-brand-taupe text-brand-gray hover:border-brand-gold'}`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Razorpay Gateway</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`p-3.5 border rounded-sm transition-all flex flex-col items-center gap-2 text-center cursor-pointer ${paymentMethod === 'stripe' ? 'border-brand-gold bg-brand-cream text-brand-gold font-bold shadow-xs' : 'border-brand-taupe text-brand-gray hover:border-brand-gold'}`}
              >
                <CreditCard className="h-5 w-5" />
                <span>Stripe Gateway</span>
              </button>
            </div>

            {/* Razorpay/Stripe Credit details inputs */}
            {(paymentMethod === 'stripe' || paymentMethod === 'razorpay') && (
              <div className="p-4 bg-gray-50 rounded-xl space-y-4 text-xs">
                <div className="flex items-center justify-between text-gray-500 font-mono text-[10px]">
                  <span>SIMULATED ENCRYPTED GATEWAY</span>
                  <span className="text-emerald-600 font-bold">SECURED</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1 col-span-3">
                    <label className="font-bold text-gray-600">Card Number</label>
                    <input 
                      type="text" 
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600">Expiry (MM/YY)</label>
                    <input 
                      type="text" 
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600">CVV / CVC</label>
                    <input 
                      type="password" 
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full p-2 bg-white border border-gray-200 rounded focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI QR Display */}
            {paymentMethod === 'upi' && (
              <div className="p-5 bg-brand-cream border border-brand-taupe rounded-sm flex flex-col items-center text-center space-y-3">
                <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-inner">
                  {/* Real visual placeholder of QR code */}
                  <div className="h-32 w-32 bg-gray-900 flex items-center justify-center p-2 rounded">
                    <div className="grid grid-cols-4 gap-1 w-full h-full text-white text-[6px] font-mono select-none overflow-hidden leading-none text-center">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          <span>■□■□</span>
                          <span>□■□■</span>
                          <span>■■□□</span>
                          <span>□□■■</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-brand-black uppercase block tracking-wider text-[10px]">BHIM UPI QR code</span>
                  <p className="text-gray-500 text-[10px] max-w-xs leading-normal">
                    Scan using GPay, PhonePe, or Paytm. Once you click &quot;Place Order&quot;, we will simulate verifying your reference ID instantly.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-500 leading-relaxed">
                <span className="font-bold text-brand-black block mb-1">Cash on Delivery (COD) Information:</span>
                Enjoy zero convenience charges. Pay our logistics partner with cash or UPI on delivery. Please maintain change if paying with cash.
              </div>
            )}

          </div>

        </div>

        {/* Right Side: Order Review & Submit */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black border-b border-gray-50 pb-2">Review Bags Bag</h3>
            
            <div className="divide-y divide-gray-50 max-h-48 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center gap-3 text-xs">
                  <img src={item.product.images[0]} alt="" className="h-10 w-10 rounded object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate">{item.product.name}</h4>
                    <span className="text-gray-400 font-medium">Qty: {item.quantity} • {item.selectedColor}</span>
                  </div>
                  <span className="font-black text-brand-black">
                    ₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-50 pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Logistics</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 uppercase font-black tracking-wider text-[10px]">Free Shipping</span>
                  ) : (
                    `₹${shippingCost}`
                  )}
                </span>
              </div>
              
              <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
                <span className="font-bold text-brand-black">Total Amount Payable</span>
                <span className="font-display font-black text-lg text-brand-gold">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit checkout button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-black hover:bg-brand-gold text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-black/5 disabled:bg-gray-200 disabled:text-gray-400"
            >
              <span>{isSubmitting ? 'Verifying Encrypted Gate...' : 'Authorize & Place Order'}</span>
            </button>

            {/* Extra trust elements */}
            <div className="text-center text-[10px] text-gray-400 font-medium">
              SSL SECURED • SSL-256 BIT KEY • DURABLE LOGISTICS PAN INDIA
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
