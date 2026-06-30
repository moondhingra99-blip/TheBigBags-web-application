import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Package, MessageSquare, Plus, CheckCircle, RefreshCw, AlertCircle, HelpCircle, User, Sparkles, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UserDashboardPage: React.FC = () => {
  const {
    orders,
    tickets,
    rewardPoints,
    submitSupportTicket,
    setView
  } = useApp();

  // Support ticket form states
  const [ticketCategory, setTicketCategory] = useState('Warranty Claim');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState(false);

  // Active view tab state (Orders vs Support Tickets)
  const [activeTab, setActiveTab] = useState<'orders' | 'tickets'>('orders');

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject.trim() && ticketMessage.trim()) {
      await submitSupportTicket(ticketCategory, ticketSubject, ticketMessage);
      setTicketSubject('');
      setTicketMessage('');
      setTicketSuccess(true);
      setTimeout(() => setTicketSuccess(false), 5000);
    }
  };

  const getOrderStatusStep = (status: string) => {
    const steps = ['ordered', 'stitched', 'dispatched', 'delivered'];
    return steps.indexOf(status.toLowerCase());
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* 1. HERO REWARD BANNER */}
      <section className="bg-brand-black text-white p-6 sm:p-8 rounded-3xl border border-brand-gold/20 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-48 w-48 rounded-full bg-brand-gold blur-3xl -top-20 -left-20" />
        </div>

        <div className="space-y-3 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-gold/20 border border-brand-gold/30 rounded-full text-brand-gold text-xs font-bold uppercase tracking-widest font-mono">
            <Sparkles className="h-3.5 w-3.5 fill-brand-gold" />
            <span>TBB Family Club Member</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Welcome Back, Rahul Sharma!</h1>
          <p className="text-xs text-gray-300 max-w-md">
            As a registered buyer, you earn loyalty points on every purchase. Trade them in for instant flat discounts on new bags.
          </p>
        </div>

        {/* Loyalty details */}
        <div className="relative z-10 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 text-left flex-shrink-0">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/25 rounded-xl text-brand-gold">
            <Award className="h-7 w-7" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Available Balance</span>
            <span className="font-display font-black text-2xl text-brand-gold font-mono">{rewardPoints} PTS</span>
            <p className="text-[9px] text-gray-400 mt-0.5">Worth ₹{(rewardPoints / 10).toLocaleString('en-IN')} off on next bag</p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENTS: REVIEWS OR SUPPORT TICKETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Navigation tabs & details listings */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex border-b border-gray-100 gap-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'orders' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`pb-3 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'tickets' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Support Tickets ({tickets.length})
            </button>
          </div>

          {/* Orders list tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center space-y-4">
                  <Package className="h-8 w-8 text-gray-300 mx-auto" />
                  <p className="text-xs text-gray-400 italic">No orders recorded in your history yet.</p>
                  <button onClick={() => setView('shop')} className="px-5 py-2.5 bg-brand-black text-white rounded text-xs font-bold">
                    Browse Bags Catalog
                  </button>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                    
                    {/* Order header row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-3 gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-500 uppercase">ORDER ID: #{ord.id}</span>
                        <span className="text-[10px] text-gray-400">{ord.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">Total:</span>
                        <span className="font-black text-brand-black">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Stepper Status tracker */}
                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] font-bold uppercase text-gray-400 block tracking-wider">Logistics Dispatch Status:</span>
                      <div className="grid grid-cols-4 gap-2 pt-2 relative">
                        {/* Connecting line */}
                        <div className="absolute top-[13px] left-3 right-3 h-0.5 bg-gray-100 -z-10" />
                        <div 
                          className="absolute top-[13px] left-3 h-0.5 bg-brand-gold -z-10 transition-all duration-500" 
                          style={{ width: `${(getOrderStatusStep(ord.status) / 3) * 100}%` }}
                        />

                        {['Ordered', 'Stitched', 'Dispatched', 'Delivered'].map((step, idx) => {
                          const isActive = getOrderStatusStep(ord.status) >= idx;
                          return (
                            <div key={idx} className="flex flex-col items-center text-center">
                              <div className={`h-7 w-7 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-brand-black border-brand-gold text-brand-gold' : 'bg-white border-gray-100 text-gray-300'}`}>
                                <CheckCircle className="h-4.5 w-4.5" />
                              </div>
                              <span className={`text-[9px] font-bold tracking-tight mt-1 ${isActive ? 'text-brand-black font-black' : 'text-gray-400'}`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order items nested row */}
                    <div className="bg-gray-50 p-3 rounded-xl divide-y divide-gray-100/60 mt-3 text-xs">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="py-2.5 flex items-center gap-3">
                          <img src={it.product.images[0]} alt="" className="h-10 w-10 rounded object-cover flex-shrink-0 bg-white shadow-sm" referrerPolicy="no-referrer" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 truncate">{it.product.name}</h4>
                            <p className="text-[10px] text-gray-400">Color Option: {it.selectedColor} • Qty: {it.quantity}</p>
                          </div>
                          <span className="font-black text-brand-black">₹{((it.product.discountPrice || it.product.price) * it.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer destination details */}
                    <div className="flex items-start gap-2 text-[10px] text-gray-500 border-t border-gray-50 pt-3">
                      <span className="font-bold text-gray-700">Delivery Destination:</span>
                      <p className="truncate">{ord.shippingAddress}</p>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* Support tickets list tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {tickets.length === 0 ? (
                <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center space-y-4">
                  <MessageSquare className="h-8 w-8 text-gray-300 mx-auto" />
                  <p className="text-xs text-gray-400 italic font-sans">No support tickets have been generated yet.</p>
                  <p className="text-[10px] text-gray-400">If you experience a zipper or stitch issue, use the right panel to lodge a ticket.</p>
                </div>
              ) : (
                tickets.map((tic) => (
                  <div key={tic.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-2.5 gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-400">TICKET #{tic.id}</span>
                        <span className="px-2 py-0.5 bg-amber-50 text-brand-gold text-[9px] font-bold rounded uppercase tracking-wider">{tic.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400">{tic.createdAt}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${tic.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-100 text-amber-700'}`}>
                          {tic.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <h4 className="font-bold text-brand-black">{tic.subject}</h4>
                      <p className="text-gray-600 leading-relaxed font-sans">{tic.message}</p>
                    </div>

                    {/* Reply placeholder */}
                    {tic.reply ? (
                      <div className="p-3 bg-amber-50/50 border border-brand-gold/15 rounded-xl text-xs space-y-1 ml-4 relative">
                        <div className="flex items-center gap-1.5 font-bold text-brand-black">
                          <div className="h-5 w-5 rounded-full bg-brand-gold text-brand-black text-[8px] font-bold flex items-center justify-center">NP</div>
                          <span>Pooja (Workshop Reply):</span>
                        </div>
                        <p className="text-gray-600 italic font-sans leading-relaxed pl-6">&quot;{tic.reply}&quot;</p>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 text-gray-400 text-[10px] italic rounded-xl ml-4 flex items-center gap-1.5 font-sans">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin text-brand-gold" />
                        <span>Awaiting daughters workshop diagnosis (Normally replies within 4 hours)...</span>
                      </div>
                    )}

                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Right Side: Create Support Ticket Form */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black border-b border-gray-100 pb-2">
              Lodge Support Ticket
            </h3>
            <p className="text-[10px] text-gray-400 leading-relaxed font-sans">
              Need a stitch repair? Wish to make a warranty claim or return a bag? Submit a direct note to Pooja and Neha’s desk.
            </p>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-gray-500">Ticket Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded focus:outline-none"
                >
                  <option>Warranty Claim</option>
                  <option>Zipper / Stitch Repair</option>
                  <option>Return &amp; Refund Request</option>
                  <option>Delivery Logistics Issue</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-500">Subject Summary</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Broken zip slider on Heritage Backpack"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-500">Message Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what happened. Specify your Order ID if applicable so Pooja can pull up your build details instantly..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                />
              </div>

              {ticketSuccess && (
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded font-bold text-[10px] animate-pulse">
                  Ticket submitted! Pooja and Neha are reviewing.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Submit Direct Ticket
              </button>

            </form>

            <div className="border-t border-gray-50 pt-4 text-center">
              <span className="text-[9px] text-gray-400 block font-sans">Or call our workshop desk directly</span>
              <a href="tel:+919876543210" className="text-xs font-bold text-brand-gold hover:underline flex items-center justify-center gap-1 mt-1">
                <PhoneCall className="h-3.5 w-3.5" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
