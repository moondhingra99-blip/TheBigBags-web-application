import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowLeftRight, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ComparePanel: React.FC = () => {
  const { compareList, toggleCompare, products, setView, currentView } = useApp();

  const selectedProducts = products.filter(p => compareList.includes(p.id));

  const handleOpenComparison = () => {
    setView('compare');
  };

  if (compareList.length === 0 || currentView === 'compare') return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-brand-black text-white p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4 border border-brand-gold/25"
      >
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="p-2 bg-brand-gold/10 border border-brand-gold/20 rounded-lg text-brand-gold hidden sm:block">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
          <div className="flex gap-2">
            {selectedProducts.map(p => (
              <div key={p.id} className="relative group flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg p-1.5 pr-8">
                <img 
                  src={p.images[0]} 
                  alt="" 
                  className="w-8 h-8 rounded object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold truncate max-w-[80px] sm:max-w-[100px]">
                  {p.name}
                </span>
                <button
                  type="button"
                  onClick={() => toggleCompare(p.id)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-red-400 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {/* Empty slots indicator */}
            {compareList.length < 3 && (
              <div className="border border-dashed border-gray-800 rounded-lg px-3 py-1.5 flex items-center text-gray-600 text-[10px]">
                Add {3 - compareList.length} more...
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleOpenComparison}
            disabled={compareList.length < 2}
            className="px-3 py-2 bg-brand-gold text-brand-black font-bold text-xs rounded hover:bg-brand-gold-dark transition-colors disabled:bg-gray-800 disabled:text-gray-600 disabled:border-transparent border border-brand-gold cursor-pointer"
          >
            Compare ({compareList.length})
          </button>
        </div>
      </motion.div>
    </div>
  );
};
