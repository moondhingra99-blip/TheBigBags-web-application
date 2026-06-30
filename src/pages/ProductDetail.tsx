import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShoppingCart, Heart, Share2, ArrowLeftRight, Check, ShieldCheck, Truck, RotateCcw, MessageSquare, Plus, AlertCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    submitReview,
    setView
  } = useApp();

  const product = products.find(p => p.id === selectedProductId);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'faq'>('specs');

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Initialize variant options on load/change
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedImage(product.images[0]);
      setQuantity(1);
      setReviewComment('');
      setReviewSuccess(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <AlertCircle className="h-12 w-12 text-brand-gold mx-auto mb-4" />
        <h2 className="font-display font-black text-2xl text-brand-black">Bag Detail Unresolved</h2>
        <p className="text-xs text-gray-500 mt-2">Please return to the Catalog and select a bag.</p>
        <button
          onClick={() => setView('shop')}
          className="mt-6 px-5 py-2.5 bg-brand-black text-white rounded-lg text-xs font-bold"
        >
          Go to Catalog
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, selectedColor);
    setView('checkout');
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewComment.trim()) {
      await submitReview(product.id, reviewRating, reviewComment);
      setReviewComment('');
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 5000);
    }
  };

  // Find related products in same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productFAQs = [
    { q: `What is the warranty on ${product.name}?`, a: `This premium item is covered by our family guarantee. We offer a comprehensive 2-year warranty covering material tears, zipper breaks, and stitching issues.` },
    { q: `Is ${product.name} water resistant?`, a: product.waterproof ? 'Yes, this bag is constructed with advanced water-resistant composite fabrics and lockable sealed zippers, providing excellent weather protection.' : 'While this model has high material strength, it uses canvas or leather and is best kept away from heavy downpours.' },
    { q: 'How long does delivery take?', a: 'All our orders are dispatched within 24 hours of confirmation. Delivery across India takes 3 to 5 business days.' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. TOP SECTION: GRID GALLERY & ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Gallery Panel */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative shadow-sm">
            <img 
              src={selectedImage || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails carousels */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`h-20 w-20 rounded-xl overflow-hidden border-2 relative flex-shrink-0 cursor-pointer ${selectedImage === img ? 'border-brand-gold' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product specifications & actions panel */}
        <div className="space-y-6">
          <div>
            <span className="font-mono text-xs uppercase text-brand-gold tracking-widest font-bold">
              {product.category}
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-black mt-1">
              {product.name}
            </h1>
            
            {/* Rating summary */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4.5 w-4.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">{product.rating}</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-brand-gold font-bold">{product.reviewsCount} verified customer reviews</span>
            </div>
          </div>

          {/* Price display with discount details */}
          <div className="p-4 bg-brand-cream border border-brand-gold/15 rounded-xl flex items-baseline gap-4 shadow-inner">
            {product.discountPrice ? (
              <>
                <span className="font-display font-black text-3xl text-brand-black">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-red-600 bg-red-100/60 px-2 py-1 rounded">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF DISCOUNT
                </span>
              </>
            ) : (
              <span className="font-display font-black text-3xl text-brand-black">₹{product.price.toLocaleString('en-IN')}</span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Core materials badge lists */}
          <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4 text-xs">
            <div>
              <span className="text-gray-400">Material Composition:</span>
              <p className="font-semibold text-brand-black mt-0.5">{product.material}</p>
            </div>
            <div>
              <span className="text-gray-400">Laptop Sleeve:</span>
              <p className="font-semibold text-brand-black mt-0.5">{product.laptopSize || 'Not applicable'}</p>
            </div>
          </div>

          {/* Colors Selection Pill */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
              Color Option: <span className="text-brand-gold font-medium">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-2 text-xs font-semibold border rounded-lg transition-all cursor-pointer ${selectedColor === c ? 'border-brand-black bg-brand-black text-white shadow-md' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity selector & Stock indicators */}
          <div className="flex items-center gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">Select Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-500 hover:text-brand-black transition-colors font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="px-4 py-2 text-gray-500 hover:text-brand-black transition-colors font-bold disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>

            <div className="self-end mb-1 space-y-1">
              <span className="text-xs text-gray-400">Inventory Levels:</span>
              <p className={`text-xs font-black uppercase tracking-wider ${product.stock === 0 ? 'text-red-500' : product.stock < 5 ? 'text-amber-500' : 'text-emerald-600'}`}>
                {product.stock === 0 ? 'Out of stock' : product.stock < 5 ? `Only ${product.stock} items left!` : 'In Stock & Ready'}
              </p>
            </div>
          </div>

          {/* Action buttons panel */}
          <div className="space-y-3 pt-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-brand-black hover:bg-brand-gold text-white font-bold text-sm rounded-xl transition-all disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer shadow-md shadow-brand-black/5"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-black font-black text-sm rounded-xl transition-all disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer shadow-md shadow-brand-gold/10"
              >
                Buy It Now
              </button>
            </div>

            {/* Extra product tools */}
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-gray-500 pt-1">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted!' : 'Save to Wishlist'}</span>
              </button>
              <span>•</span>
              <button
                onClick={() => toggleCompare(product.id)}
                className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
              >
                <ArrowLeftRight className={`h-4 w-4 ${isCompared ? 'text-brand-blue' : ''}`} />
                <span>{isCompared ? 'Added to Compare Matrix' : 'Compare Specification'}</span>
              </button>
            </div>
          </div>

          {/* Warranties / shipping notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-6 text-[11px] text-gray-500">
            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-brand-gold flex-shrink-0" />
              <span>Full Family Guarantee Warranty</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg">
              <Truck className="h-5 w-5 text-brand-gold flex-shrink-0" />
              <span>Free Express Delivery Pan India</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg">
              <RotateCcw className="h-5 w-5 text-brand-gold flex-shrink-0" />
              <span>7 Days Easy Hassle Exchange</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. SPECIFICATIONS / REVIEWS / FAQ TABS */}
      <div className="mt-20 border border-gray-100 bg-white rounded-2xl p-6 sm:p-10 shadow-sm">
        <div className="flex border-b border-gray-100 gap-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'specs' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'reviews' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Customer Reviews ({product.reviews?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`pb-4 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${activeTab === 'faq' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Item FAQs
          </button>
        </div>

        <div className="py-8">
          {/* A. Specifications Tab */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-brand-black">Detailed Dimensions & Build</h3>
                <div className="divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden text-xs">
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3 bg-white hover:bg-gray-50/50">
                      <span className="text-gray-400 font-medium">{key}</span>
                      <span className="col-span-2 text-gray-800 font-bold">{val}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-3 p-3 bg-white">
                    <span className="text-gray-400 font-medium">Waterproof</span>
                    <span className="col-span-2 text-gray-800 font-bold">{product.waterproof ? 'Yes (Weather Sealed)' : 'Water Resistant'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-brand-black">Product Features</h3>
                <ul className="space-y-2.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="h-4.5 w-4.5 text-brand-gold flex-shrink-0 bg-brand-cream border border-brand-taupe/40 rounded-full p-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* B. Reviews Tab with Form */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Ratings reviews lists */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-display font-bold text-base text-brand-black border-b border-gray-50 pb-2">Customer Testimonials</h3>
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-800">{rev.userName}</span>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed italic">&quot;{rev.comment}&quot;</p>
                        <div className="flex items-center justify-between pt-1 text-[9px] text-emerald-600 font-bold">
                          <span>Verified Purchase Badge</span>
                          <span className="text-gray-400 font-medium">Helpful votes: {rev.helpfulVotes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">No reviews yet for this bag. Be the first to tell Pooja and Neha about your experience!</p>
                )}
              </div>

              {/* Submit Review Form */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="font-display font-bold text-sm text-brand-black border-b border-gray-100 pb-2">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
                  
                  {/* Rating Stars Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500 block">Rating Stars</label>
                    <div className="flex gap-1.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-1 hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                        >
                          <Star className={`h-5 w-5 ${star <= reviewRating ? 'fill-current' : 'text-gray-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-500 block">Comment Description</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience about the build, zippers, or leather quality..."
                      className="w-full text-xs p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  {reviewSuccess && (
                    <div className="p-2.5 bg-brand-linen text-brand-black border border-brand-taupe rounded text-[10px] font-bold animate-pulse">
                      Thank you! Your verified review has been posted.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-black hover:bg-brand-gold text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* C. FAQs Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-display font-bold text-base text-brand-black mb-4">Frequently Asked Questions</h3>
              {productFAQs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl space-y-1.5">
                  <h4 className="text-xs font-bold text-brand-black">{faq.q}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-8">
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-brand-black">Related Premium Bags</h3>
            <button
              onClick={() => { setView('shop'); }}
              className="text-xs font-bold text-brand-gold hover:text-brand-black transition-colors"
            >
              Browse Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div 
                key={p.id}
                onClick={() => setView('detail', p.id)}
                className="bg-white border border-gray-100 rounded-xl p-3.5 overflow-hidden hover:shadow-lg hover:border-brand-gold/10 transition-all cursor-pointer group"
              >
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative">
                  <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="mt-3.5 space-y-1">
                  <span className="text-[9px] font-mono text-brand-gold font-bold uppercase tracking-wider">{p.category}</span>
                  <h4 className="text-xs font-bold text-gray-800 truncate group-hover:text-brand-gold transition-colors">{p.name}</h4>
                  <span className="text-xs font-black text-brand-black block">₹{p.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
