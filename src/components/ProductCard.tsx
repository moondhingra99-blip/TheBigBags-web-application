import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Eye, ArrowLeftRight, Star, ShoppingCart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, viewMode = 'grid' }) => {
  const {
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    addToCart,
    setView
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1, product.colors[0]);
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => setView('detail', product.id)}
        className="flex flex-col sm:flex-row bg-brand-linen border border-brand-taupe rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer p-4 gap-6 group"
      >
        {/* Left Side: Images */}
        <div className="relative w-full sm:w-48 h-48 bg-brand-cream flex-shrink-0 overflow-hidden rounded-xs border border-brand-taupe/60">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          
          {/* Discount badge */}
          {discountPercent > 0 && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider rounded-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gold font-bold">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-sans font-bold text-base text-brand-black mt-1 group-hover:text-brand-gold transition-colors uppercase tracking-tight">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {product.colors.map((c, i) => (
                <span key={i} className="px-2 py-0.5 border border-brand-taupe text-[10px] rounded-xs bg-brand-cream text-brand-gray">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-3 border-t border-brand-taupe/40">
            {/* Price section */}
            <div className="flex items-center gap-2">
              {product.discountPrice ? (
                <>
                  <span className="font-serif italic font-bold text-base text-brand-black">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                </>
              ) : (
                <span className="font-serif italic font-bold text-base text-brand-black">₹{product.price.toLocaleString('en-IN')}</span>
              )}
            </div>

            {/* Quick Actions buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                className={`p-2.5 rounded-xs border transition-all cursor-pointer ${isWishlisted ? 'border-red-100 bg-red-50 text-red-500 hover:bg-red-100' : 'border-gray-100 hover:border-gray-200 text-gray-400 hover:text-gray-600'}`}
                title="Add to Wishlist"
              >
                <Heart className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }}
                className={`p-2.5 rounded-xs border transition-all cursor-pointer ${isCompared ? 'border-stone-200 bg-stone-100 text-brand-blue' : 'border-gray-100 hover:border-gray-200 text-gray-400 hover:text-gray-600'}`}
                title="Compare Products"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                className="p-2.5 rounded-xs border border-gray-100 hover:border-gray-200 text-gray-400 hover:text-gray-600 cursor-pointer"
                title="Quick View"
              >
                <Eye className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleAddToCartClick}
                disabled={product.stock === 0}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-black hover:bg-brand-gold text-white rounded-xs text-xs font-bold transition-all disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setView('detail', product.id)}
      className="flex flex-col bg-brand-linen border border-brand-taupe rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group relative"
    >
      {/* Visual Badge labels */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-black uppercase tracking-wider rounded-xs shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-2 py-0.5 bg-brand-black text-brand-gold text-[9px] font-black uppercase tracking-wider rounded-xs shadow-sm flex items-center gap-1">
            <Sparkles className="h-2.5 w-2.5 fill-brand-gold" />
            <span>BEST SELLER</span>
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2 py-0.5 bg-brand-blue text-white text-[9px] font-black uppercase tracking-wider rounded-xs shadow-sm">
            NEW ARRIVAL
          </span>
        )}
      </div>

      {/* Top Image Shell */}
      <div className="relative aspect-square bg-brand-cream overflow-hidden border-b border-brand-taupe">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Hover quick action panel */}
        <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-3 rounded-full bg-white shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="p-3 rounded-full bg-white shadow-xs hover:scale-110 active:scale-95 text-gray-600 hover:text-brand-gold transition-all cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }}
            className={`p-3 rounded-full bg-white shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer ${isCompared ? 'text-brand-blue bg-stone-100' : 'text-gray-600 hover:text-brand-blue'}`}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Information Shell */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-mono uppercase tracking-[0.1em] text-brand-gold font-bold">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-700">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-sans font-bold text-xs sm:text-sm uppercase tracking-tight text-brand-black group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] text-gray-400 line-clamp-1 leading-normal font-sans">
            {product.material}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-brand-taupe/40">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <div className="flex items-center gap-1.5">
                <span className="font-serif italic font-bold text-base text-brand-black">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
            ) : (
              <span className="font-serif italic font-bold text-base text-brand-black">₹{product.price.toLocaleString('en-IN')}</span>
            )}
            <span className={`text-[9px] font-semibold mt-0.5 ${product.stock === 0 ? 'text-red-500' : product.stock < 5 ? 'text-amber-500' : 'text-emerald-600'}`}>
              {product.stock === 0 ? 'Out of Stock' : product.stock < 5 ? `Only ${product.stock} left!` : 'In Stock'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCartClick}
            disabled={product.stock === 0}
            className="p-2.5 bg-brand-black hover:bg-brand-gold text-white rounded-xs transition-colors disabled:bg-gray-100 disabled:text-gray-300 cursor-pointer shadow-xs"
            title="Add to Cart"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
