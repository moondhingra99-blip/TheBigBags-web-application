import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingBag, ArrowRight, Heart, Tag, Truck, Gift, ShieldAlert, BadgePercent } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    rewardPoints,
    setView,
    toggleWishlist
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0); // Flat INR off
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);

  // Subtotal calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);

  // Loyalty points deduction (10 points = ₹1)
  const loyaltyDiscount = useLoyaltyPoints 
    ? Math.min(Math.floor(rewardPoints / 10), subtotal * 0.2) // Cap loyalty discount at 20% order subtotal
    : 0;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess(false);

    const code = couponCode.toUpperCase().trim();
    if (code === 'WELCOME300') {
      if (subtotal < 1500) {
        setCouponError('This coupon requires a minimum purchase of ₹1,500.');
        return;
      }
      setCouponDiscount(300);
      setCouponSuccess(true);
    } else if (code === 'HERITAGE10') {
      setCouponDiscount(Math.round(subtotal * 0.10));
      setCouponSuccess(true);
    } else {
      setCouponError('Invalid coupon code. Try WELCOME300 or HERITAGE10.');
    }
  };

  const shippingCost = subtotal > 1999 ? 0 : subtotal === 0 ? 0 : 150;
  const finalTotal = Math.max(0, subtotal - couponDiscount - loyaltyDiscount + shippingCost);

  const handleProceedToCheckout = () => {
    // We can save any applied discount states to localStorage or context state,
    // but the checkout page itself handles loyalty points/coupons too.
    setView('checkout');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      <div className="border-b border-gray-100 pb-4 mb-8">
        <span className="font-mono text-xs uppercase text-brand-gold font-bold tracking-widest">My Selection</span>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Shopping Bag</h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-brand-linen border border-dashed border-brand-taupe rounded-sm p-16 text-center space-y-4 max-w-lg mx-auto">
          <div className="inline-flex p-4 bg-brand-cream border border-brand-taupe/50 text-brand-gold rounded-full">
            <ShoppingBag className="h-8 w-8 animate-pulse" />
          </div>
          <h3 className="font-display font-black text-xl text-brand-black uppercase">Your Shopping Bag is Empty</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
            Neha and Pooja have designed gorgeous laptop bags, duffels, and sling bags waiting for you. Come explore our heritage catalog!
          </p>
          <button
            onClick={() => setView('shop')}
            className="px-6 py-3 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs uppercase rounded-lg cursor-pointer"
          >
            Start Shopping Bags
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items lists */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-100">
                {cart.map((item, idx) => (
                  <div key={idx} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                    
                    {/* Visual metadata details */}
                    <div className="flex items-center gap-4 min-w-0">
                      <img 
                        src={item.product.images[0]} 
                        alt="" 
                        className="h-20 w-20 rounded-lg object-cover shadow-sm bg-gray-50 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono font-bold uppercase text-brand-gold">{item.product.category}</span>
                        <h4 
                          onClick={() => setView('detail', item.product.id)}
                          className="text-sm font-bold text-gray-800 hover:text-brand-gold transition-colors truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">Color Option: <span className="text-brand-black font-semibold">{item.selectedColor}</span></p>
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center border border-gray-200 rounded-md bg-white">
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                          className="px-2.5 py-1 text-gray-500 hover:text-brand-black transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2.5 py-1 text-gray-500 hover:text-brand-black transition-colors disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>

                      {/* Pricing per item / subtotal */}
                      <div className="text-right min-w-[80px]">
                        <span className="text-sm font-black text-brand-black">
                          ₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-400 block mt-0.5">
                            ₹{(item.product.discountPrice || item.product.price).toLocaleString('en-IN')} each
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 border-l border-gray-100 pl-4">
                        <button
                          onClick={() => toggleWishlist(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Save for Later"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="p-2 text-gray-400 hover:text-brand-black transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Estimated deliveries log */}
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3 text-xs text-gray-600">
              <Truck className="h-5 w-5 text-brand-gold flex-shrink-0" />
              <div>
                <span className="font-bold text-brand-black">Free Shipping eligible!</span> Orders above ₹1,999 dispatch free. Standard dispatch occurs within 24 hours.
              </div>
            </div>
          </div>

          {/* Right: Summary panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black border-b border-gray-50 pb-2">Order Summary</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cart Subtotal</span>
                  <span className="font-bold text-brand-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="flex items-center gap-1">
                      <BadgePercent className="h-4.5 w-4.5" />
                      <span>Coupon Discount</span>
                    </span>
                    <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-amber-600 font-medium">
                    <span className="flex items-center gap-1 font-bold">
                      <Gift className="h-4.5 w-4.5" />
                      <span>Points Redeemed</span>
                    </span>
                    <span>- ₹{loyaltyDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Shipping</span>
                  <span className="font-bold text-brand-black">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 uppercase font-black tracking-wider text-[10px]">Free Shipping</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-50 pt-3 flex justify-between text-sm">
                  <span className="font-bold text-brand-black">Estimated Total</span>
                  <span className="font-display font-black text-lg text-brand-gold">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Reward Points redemption widget */}
              {rewardPoints > 0 && (
                <div className="bg-brand-cream border border-brand-taupe p-4 rounded-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-black">Your Reward Points:</span>
                    <span className="text-xs font-black text-brand-gold font-mono">{rewardPoints} pts</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Redeem your points to get up to 20% discount on this order. (10 points = ₹1)
                  </p>
                  <button
                    onClick={() => setUseLoyaltyPoints(!useLoyaltyPoints)}
                    className={`w-full py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${useLoyaltyPoints ? 'bg-brand-gold border-brand-gold text-brand-black' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
                  >
                    {useLoyaltyPoints ? 'Loyalty Points Applied' : 'Redeem Points Discount'}
                  </button>
                </div>
              )}

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">Apply Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="WELCOME300 or HERITAGE10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs border border-gray-200 px-3 py-2 rounded focus:outline-none focus:border-brand-gold uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && (
                  <p className="text-[10px] text-emerald-600 font-bold animate-pulse">
                    Coupon applied successfully!
                  </p>
                )}
                {couponError && (
                  <p className="text-[10px] text-red-500 font-medium">
                    {couponError}
                  </p>
                )}
              </form>

              {/* Proceed to checkout button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-black/5"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
