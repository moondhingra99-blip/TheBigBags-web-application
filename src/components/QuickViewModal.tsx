import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingCart, Shield, Truck, RotateCcw, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, setView } = useApp();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedColor);
    onClose();
  };

  const handleGoToDetails = () => {
    setView('detail', product.id);
    onClose();
  };

  const hasDiscount = !!product.discountPrice;
  const currentPrice = product.discountPrice || product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
      />

      {/* Content Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 flex flex-col md:flex-row p-6 md:p-8 gap-8"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-brand-black transition-colors rounded-full border border-gray-100 hover:bg-gray-50 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-square w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails list if there are multiple images */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-16 w-16 bg-gray-50 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${selectedImage === img ? 'border-brand-gold' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">
                {product.category}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-brand-black mt-1">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-baseline gap-3 bg-brand-cream border border-brand-gold/10 p-3.5 rounded-lg">
              {hasDiscount ? (
                <>
                  <span className="font-display font-black text-2xl text-brand-black">₹{product.discountPrice?.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                    Save ₹{(product.price - (product.discountPrice || 0)).toLocaleString('en-IN')}
                  </span>
                </>
              ) : (
                <span className="font-display font-black text-2xl text-brand-black">₹{product.price.toLocaleString('en-IN')}</span>
              )}
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              {product.description}
            </p>

            {/* Colors Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Selected Color: <span className="text-brand-gold font-medium">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-all cursor-pointer ${selectedColor === c ? 'border-brand-black bg-brand-black text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">Quantity</label>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-500 hover:text-brand-black transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-gray-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1.5 text-gray-500 hover:text-brand-black transition-colors disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {product.stock > 0 ? (
                <div className="text-[11px] text-gray-500 self-end mb-1">
                  Available Stock: <span className="text-emerald-600 font-bold">{product.stock} items</span>
                </div>
              ) : (
                <div className="text-[11px] text-red-500 font-bold flex items-center gap-1 self-end mb-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Out of stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions & Logistics */}
          <div className="space-y-4 mt-6">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-black hover:bg-brand-gold text-white font-bold text-sm rounded-xl transition-all disabled:bg-gray-100 disabled:text-gray-300 cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{product.stock === 0 ? 'Sold Out' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                onClick={handleGoToDetails}
                className="px-5 py-3 border border-gray-200 hover:border-brand-black text-brand-black hover:bg-gray-50 font-semibold text-sm rounded-xl transition-all cursor-pointer"
              >
                More Info
              </button>
            </div>

            {/* Micro guarantees badges */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex flex-col items-center text-center p-2 rounded bg-gray-50">
                <Shield className="h-4 w-4 text-brand-gold mb-1" />
                <span className="font-medium">Lifetime Support</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded bg-gray-50">
                <Truck className="h-4 w-4 text-brand-gold mb-1" />
                <span className="font-medium">Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded bg-gray-50">
                <RotateCcw className="h-4 w-4 text-brand-gold mb-1" />
                <span className="font-medium">Easy Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
