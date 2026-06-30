import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, ShoppingBag, Calendar, Gift, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccessPage: React.FC = () => {
  const { activeOrder, setView } = useApp();

  // Fallback if no order is found
  if (!activeOrder) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <CheckCircle className="h-12 w-12 text-brand-gold mx-auto mb-4 animate-pulse" />
        <h2 className="font-display font-black text-2xl text-brand-black">No Recent Transactions</h2>
        <p className="text-xs text-gray-500 mt-2">You haven&apos;t placed any orders in this session yet.</p>
        <button
          onClick={() => setView('shop')}
          className="mt-6 px-5 py-2.5 bg-brand-black text-white rounded-lg text-xs font-bold"
        >
          Explore Bags Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center font-sans">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl space-y-6"
      >
        {/* Animated Green Badge */}
        <div className="relative h-20 w-20 mx-auto flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full border-4 border-emerald-100">
          <CheckCircle className="h-10 w-10" />
          <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
        </div>

        {/* Headings */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase font-black tracking-widest text-brand-gold">Transaction Confirmed</span>
          <h1 className="font-display font-black text-2xl text-brand-black uppercase">Order Placed Successfully!</h1>
          <p className="text-xs text-gray-500 leading-normal">
            Thank you for purchasing from The Big Bags. Your order has been registered in our family workshop.
          </p>
        </div>

        {/* Core Order Metadata details */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs text-left space-y-3">
          <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
            <span className="text-gray-400">Order ID Code:</span>
            <span className="font-bold text-brand-black font-mono uppercase">{activeOrder.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Grand Total Paid:</span>
            <span className="font-black text-brand-black">₹{activeOrder.totalAmount.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payment Channel:</span>
            <span className="font-bold uppercase text-brand-gold">{activeOrder.paymentMethod}</span>
          </div>

          <div className="flex items-start gap-2 border-t border-gray-100 pt-2.5 text-[11px] text-gray-600">
            <Calendar className="h-4.5 w-4.5 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-brand-black">Estimated Handover Delivery:</span>
              <p className="text-gray-500">Dispatch in 24 hours. Expected arrival within 3 to 5 business days.</p>
            </div>
          </div>
        </div>

        {/* Points Loyalty rewards */}
        <div className="p-4 bg-brand-cream border border-brand-gold/15 rounded-2xl text-xs space-y-2.5">
          <div className="flex items-center justify-center gap-2 text-brand-gold font-bold">
            <Gift className="h-4.5 w-4.5 animate-bounce" />
            <span>Daughters Reward Points Added!</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-normal font-sans">
            You have earned <span className="font-bold text-brand-black">+{activeOrder.earnedPoints} Loyalty Points</span> from this purchase! Use them for flat discounts on your next bag.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => setView('shop')}
            className="w-full py-3 bg-brand-black hover:bg-brand-gold text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => setView('dashboard')}
            className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs uppercase rounded-xl transition-all cursor-pointer"
          >
            View My Orders Dashboard
          </button>
        </div>

      </motion.div>
    </div>
  );
};
