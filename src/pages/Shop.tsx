import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Search, Grid, List, SlidersHorizontal, ArrowUpDown, RefreshCw, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface ShopProps {
  onQuickView: (product: any) => void;
}

export const Shop: React.FC<ShopProps> = ({ onQuickView }) => {
  const { products, searchQuery, setSearchQuery } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(6000);
  const [onlyWaterproof, setOnlyWaterproof] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  // Dynamically extract filter lists from current products catalog to prevent static errors
  const categories = useMemo(() => {
    const list = new Set(products.map(p => p.category));
    return ['All', ...Array.from(list)];
  }, [products]);

  const materials = useMemo(() => {
    const list = new Set(products.map(p => p.material.split('&')[0].trim()));
    return ['All', ...Array.from(list).slice(0, 5)];
  }, [products]);

  const genders = ['All', 'Men', 'Women', 'Kids', 'Unisex'];

  // Main filtered products list calculation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Gender filter
    if (selectedGender !== 'All') {
      result = result.filter(p => p.gender === selectedGender || p.gender === 'Unisex');
    }

    // Material filter
    if (selectedMaterial !== 'All') {
      result = result.filter(p => p.material.includes(selectedMaterial));
    }

    // Price range filter
    result = result.filter(p => (p.discountPrice || p.price) <= priceRange);

    // Waterproof filter
    if (onlyWaterproof) {
      result = result.filter(p => p.waterproof);
    }

    // Sort By calculations
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedGender, selectedMaterial, priceRange, onlyWaterproof, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedMaterial('All');
    setPriceRange(6000);
    setOnlyWaterproof(false);
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase text-brand-gold font-bold tracking-widest">Handcrafted Bags</span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">The Big Bags Catalog</h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search matching bags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-brand-gold"
          />
          <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-gray-400" />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Filter Column */}
        <aside className="w-full lg:w-64 space-y-6 flex-shrink-0">
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-black flex items-center gap-2">
                <Filter className="h-4 w-4 text-brand-gold" />
                <span>Filters</span>
              </h3>
              <button
                onClick={handleClearFilters}
                className="text-[10px] font-bold text-brand-gold hover:text-brand-black flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Category</label>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-medium text-left py-1.5 px-2.5 rounded transition-all cursor-pointer ${selectedCategory === cat ? 'bg-brand-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Ideal For</label>
              <div className="flex flex-wrap gap-1.5">
                {genders.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGender(g)}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${selectedGender === g ? 'bg-brand-black border-brand-black text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <span>Max Budget</span>
                <span className="text-brand-gold">₹{priceRange.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full accent-brand-gold h-1.5 bg-gray-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Material Filter */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Core Material</label>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedMaterial(m)}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${selectedMaterial === m ? 'bg-brand-black border-brand-black text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Waterproof Toggle */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Waterproof Only</span>
              <button
                onClick={() => setOnlyWaterproof(!onlyWaterproof)}
                className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${onlyWaterproof ? 'bg-brand-gold' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-1 left-1 bg-white h-4 w-4 rounded-full transition-transform ${onlyWaterproof ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Side: Product Listing Area */}
        <main className="flex-1 space-y-6">
          {/* Controls toolbar */}
          <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-brand-black">{filteredProducts.length}</span> luxury bags
            </span>

            <div className="flex items-center gap-4">
              {/* Sort selector */}
              <div className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs border-0 py-1.5 pl-2 pr-8 bg-transparent focus:outline-none cursor-pointer text-gray-700 font-medium"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Customer Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              {/* View mode buttons */}
              <div className="flex items-center gap-1 border-l border-brand-taupe pl-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-xs cursor-pointer ${viewMode === 'grid' ? 'text-brand-gold bg-brand-linen border border-brand-taupe' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Grid View"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-xs cursor-pointer ${viewMode === 'list' ? 'text-brand-gold bg-brand-linen border border-brand-taupe' : 'text-gray-400 hover:text-gray-600'}`}
                  title="List View"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid/List Results Container */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={onQuickView} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="bg-brand-linen border border-dashed border-brand-taupe rounded-sm p-16 text-center space-y-4">
              <div className="inline-flex p-4 bg-brand-cream text-brand-gold rounded-full border border-brand-taupe/40">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="font-display font-black text-xl text-brand-black">No Bags Match Your Search</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Pooja and Neha haven&apos;t crafted a bag matching that specific configuration yet. Try clearing your filters or resetting the search.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-brand-black hover:bg-brand-gold text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
