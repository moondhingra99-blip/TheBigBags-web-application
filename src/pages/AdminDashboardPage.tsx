import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Package, ShoppingBag, MessageSquare, Edit3, Save, CheckCircle, RefreshCw, Sparkles, Filter, ShieldAlert, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    orders,
    tickets,
    updateProductStock,
    updateOrderStatus,
    replyToTicket,
    setView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'tickets'>('orders');

  // Edit stock state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editStockValue, setEditStockValue] = useState(0);

  // Reply ticket state
  const [replyTicketId, setReplyTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // 1. KPI Calculations
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);
  const pendingTickets = tickets.filter(t => t.status === 'Pending').length;
  const lowStockCount = products.filter(p => p.stock < 5).length;

  const handleUpdateStock = async (pId: string) => {
    await updateProductStock(pId, editStockValue);
    setEditingProductId(null);
  };

  const handleUpdateStatus = async (oId: string, newStatus: string) => {
    await updateOrderStatus(oId, newStatus);
  };

  const handleReplyTicketSubmit = async (tId: string) => {
    if (ticketReplyText.trim()) {
      await replyToTicket(tId, ticketReplyText);
      setReplyTicketId(null);
      setTicketReplyText('');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Page Title */}
      <div className="border-b border-gray-100 pb-4 mb-8">
        <span className="font-mono text-xs uppercase text-brand-gold font-bold tracking-widest">Pooja &amp; Neha&apos;s Desk</span>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Admin Workshop Control</h1>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-stone-100 rounded-xl text-stone-700">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Total Revenue</span>
            <span className="font-display font-black text-lg text-brand-black">₹{totalSales.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-stone-100 rounded-xl text-brand-blue">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Bags Ordered</span>
            <span className="font-display font-black text-lg text-brand-black">{totalItemsSold} Units</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-stone-100 rounded-xl text-brand-gold">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Pending Tickets</span>
            <span className="font-display font-black text-lg text-brand-black">{pendingTickets} Issues</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[#FFF5F5] rounded-xl text-red-500">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Low Stock Bags</span>
            <span className="font-display font-black text-lg text-brand-black">{lowStockCount} Models</span>
          </div>
        </div>
      </div>

      {/* 3. WORKSPACE SECTIONS */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 gap-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'orders' ? 'text-brand-gold border-b-2 border-brand-gold font-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Manage Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'inventory' ? 'text-brand-gold border-b-2 border-brand-gold font-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Inventory Warehouse ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'tickets' ? 'text-brand-gold border-b-2 border-brand-gold font-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Support Tickets Desk ({tickets.length})
          </button>
        </div>

        {/* SECTION A: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-xs text-gray-400 italic bg-white p-8 border border-gray-100 rounded-xl text-center">No orders placed by customers yet.</p>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                  
                  {/* Order detail banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-3 gap-2">
                    <div className="space-y-1">
                      <span className="font-mono font-bold text-gray-600">ORDER CODE: #{ord.id}</span>
                      <p className="text-[10px] text-gray-400">Placed on: {ord.createdAt} • Address: {ord.shippingAddress}</p>
                    </div>

                    {/* Change fulfillment status selection */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-500">Fulfillment Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className="p-1.5 border border-gray-200 bg-gray-50 rounded focus:outline-none font-bold text-brand-black"
                      >
                        <option value="Ordered">Ordered</option>
                        <option value="Stitched">Stitched (Workshop)</option>
                        <option value="Dispatched">Dispatched (Logistics)</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex gap-3 bg-gray-50 p-2.5 rounded-lg">
                        <img src={it.product.images[0]} alt="" className="h-10 w-10 rounded object-cover flex-shrink-0 bg-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="min-w-0">
                          <h5 className="font-bold text-gray-800 truncate">{it.product.name}</h5>
                          <span className="text-[10px] text-gray-400">{it.selectedColor} • Qty: {it.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment tag */}
                  <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-3">
                    <span>Payment via: <span className="font-bold text-brand-gold uppercase">{ord.paymentMethod}</span></span>
                    <span>Order Subtotal Amount: <span className="font-black text-brand-black text-xs">₹{ord.totalAmount.toLocaleString('en-IN')}</span></span>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* SECTION B: INVENTORY STOCK MANAGEMENT */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm text-xs">
            <div className="p-4 bg-gray-50 font-bold text-brand-black border-b border-gray-100 uppercase tracking-wider text-[10px] flex items-center justify-between">
              <span>Catalog Stock Controls</span>
              <span>Total Styles: {products.length}</span>
            </div>
            
            <div className="divide-y divide-gray-100">
              {products.map((p) => (
                <div key={p.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="h-10 w-10 rounded object-cover shadow-xs bg-gray-50 flex-shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-gray-800">{p.name}</h4>
                      <p className="text-[10px] text-gray-400">Category: {p.category} • Cost: ₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Stock updater field */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {editingProductId === p.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          value={editStockValue}
                          onChange={(e) => setEditStockValue(parseInt(e.target.value) || 0)}
                          className="w-16 p-1 border border-brand-gold rounded focus:outline-none font-bold text-center"
                        />
                        <button
                          onClick={() => handleUpdateStock(p.id)}
                          className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer"
                          title="Save Inventory"
                        >
                          <Save className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingProductId(null)}
                          className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className={`font-mono font-bold ${p.stock < 5 ? 'text-red-500' : 'text-emerald-600'}`}>
                          {p.stock} units
                        </span>
                        <button
                          onClick={() => { setEditingProductId(p.id); setEditStockValue(p.stock); }}
                          className="px-2.5 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>Adjust Stock</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION C: SUPPORT TICKETS DESK */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            {tickets.length === 0 ? (
              <p className="text-xs text-gray-400 italic bg-white p-8 border border-gray-100 rounded-xl text-center">No customer support tickets submitted.</p>
            ) : (
              tickets.map((tic) => (
                <div key={tic.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
                  
                  {/* Ticket head */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-2.5 gap-2">
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

                  {/* Complaint details */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-brand-black">{tic.subject}</h4>
                    <p className="text-gray-600 leading-relaxed font-sans">{tic.message}</p>
                  </div>

                  {/* Actions respond form */}
                  {tic.reply ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-800">Direct Resolved Reply:</span>
                      <p className="text-gray-700 italic font-sans">{tic.reply}</p>
                    </div>
                  ) : replyTicketId === tic.id ? (
                    <div className="p-4 bg-gray-50 rounded-xl space-y-3">
                      <label className="font-bold text-gray-600">Draft Workshop Reply:</label>
                      <textarea
                        rows={2}
                        value={ticketReplyText}
                        onChange={(e) => setTicketReplyText(e.target.value)}
                        placeholder="State when the pickup courier is coming, or details about the stitch repair warranty..."
                        className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded focus:outline-none focus:border-brand-gold"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleReplyTicketSubmit(tic.id)}
                          className="px-3.5 py-1.5 bg-brand-black text-white rounded text-xs font-bold hover:bg-brand-gold hover:text-brand-black cursor-pointer"
                        >
                          Send Official Reply
                        </button>
                        <button
                          onClick={() => { setReplyTicketId(null); setTicketReplyText(''); }}
                          className="px-3.5 py-1.5 bg-gray-200 text-gray-600 rounded text-xs font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end pt-2 border-t border-gray-50">
                      <button
                        onClick={() => { setReplyTicketId(tic.id); setTicketReplyText(`Hi, Pooja here from the workshop desk. We have reviewed your issue. We are dispatching a pickup courier tomorrow to fetch the bag for stitch repairs under our 2-year family warranty. Order details validated.`); }}
                        className="px-3.5 py-1.5 bg-brand-black text-white text-xs font-bold rounded hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
                      >
                        Reply &amp; Resolve Issue
                      </button>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
