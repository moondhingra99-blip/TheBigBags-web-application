import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Trash2, ShoppingCart, Check, X, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';

export const ComparePage: React.FC = () => {
  const { compareList, toggleCompare, products, addToCart, setView } = useApp();

  const selectedProducts = products.filter(p => compareList.includes(p.id));

  const handleClearAll = () => {
    // Clear all by toggling off each item
    compareList.forEach(id => toggleCompare(id));
  };

  const handleAddToCart = (pId: string, color: string) => {
    addToCart(pId, 1, color);
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <X className="h-12 w-12 text-brand-gold mx-auto mb-4 animate-bounce" />
        <h2 className="font-display font-black text-2xl text-brand-black">No Bags Selected For Comparison</h2>
        <p className="text-xs text-gray-500 mt-2">Add bags to comparison from the shop page to review specifications side-by-side.</p>
        <button
          onClick={() => setView('shop')}
          className="mt-6 px-5 py-2.5 bg-brand-black text-white rounded-lg text-xs font-bold"
        >
          Go to Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-5 mb-8 gap-4">
        <div>
          <button
            onClick={() => setView('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-brand-gold transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Catalog</span>
          </button>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Compare Bags Specs</h1>
        </div>

        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear Comparison Matrix</span>
        </button>
      </div>

      {/* Main Grid table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-gray-600">
            
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-4 sm:p-6 font-display font-bold uppercase text-[10px] text-gray-400 tracking-wider w-48 sm:w-56">Features Matrix</th>
                {selectedProducts.map(p => (
                  <th key={p.id} className="p-4 sm:p-6 min-w-[180px] sm:min-w-[220px]">
                    <div className="space-y-3 relative group">
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="absolute top-0 right-0 p-1.5 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                        title="Remove from Compare"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      
                      <div className="aspect-square h-24 w-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-brand-gold font-bold uppercase tracking-wider block">{p.category}</span>
                        <h4 
                          onClick={() => setView('detail', p.id)}
                          className="font-bold text-gray-800 line-clamp-1 hover:text-brand-gold transition-colors cursor-pointer"
                        >
                          {p.name}
                        </h4>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              
              {/* Row: Price */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Indian Market Price</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 font-display font-black text-sm text-brand-black">
                    {p.discountPrice ? (
                      <div className="space-y-0.5">
                        <span className="block text-brand-gold">₹{p.discountPrice.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-gray-400 line-through">₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <span>₹{p.price.toLocaleString('en-IN')}</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Rating */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Customer Rating Score</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-gray-800">{p.rating}</span>
                      <span className="text-[10px] text-gray-400">({p.reviewsCount} reviews)</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Row: Core Material */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Material Composition</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 font-medium text-gray-800">{p.material}</td>
                ))}
              </tr>

              {/* Row: Dimensions */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Exterior Dimensions</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 text-gray-600">{p.specs.Dimensions || 'Refer description'}</td>
                ))}
              </tr>

              {/* Row: Weight */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Dry Weight</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 text-gray-600">{p.specs.Weight || 'Refer description'}</td>
                ))}
              </tr>

              {/* Row: Capacity */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Storage Volume Capacity</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 text-gray-600 font-bold">{p.specs.Capacity || 'Refer description'}</td>
                ))}
              </tr>

              {/* Row: Laptop Size */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Sleeve Compartment Sizing</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 text-gray-800 font-semibold">{p.laptopSize || 'No Dedicated Sleeve'}</td>
                ))}
              </tr>

              {/* Row: Waterproof */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Weather Sealing Seal</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5">
                    {p.waterproof ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                        <Check className="h-3.5 w-3.5" />
                        <span>Waterproof Canvas</span>
                      </span>
                    ) : (
                      <span className="text-gray-400">High Water-Resistance</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Warranty */}
              <tr className="hover:bg-gray-50/20">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Workshop Warranty Guarantee</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5 flex items-center gap-1.5 text-gray-600 font-medium">
                    <ShieldCheck className="h-4.5 w-4.5 text-brand-gold" />
                    <span>2-3 Years Warranty Guarantee</span>
                  </td>
                ))}
              </tr>

              {/* Row: Actions */}
              <tr className="bg-gray-50/30">
                <td className="p-4 sm:p-5 font-bold text-gray-700">Purchase Actions</td>
                {selectedProducts.map(p => (
                  <td key={p.id} className="p-4 sm:p-5">
                    <button
                      onClick={() => handleAddToCart(p.id, p.colors[0])}
                      disabled={p.stock === 0}
                      className="w-full py-2.5 bg-brand-black hover:bg-brand-gold text-white font-bold text-[11px] rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-gray-100 disabled:text-gray-300 shadow-sm"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>{p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};
