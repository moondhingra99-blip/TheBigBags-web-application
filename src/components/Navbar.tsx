import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  User, 
  Award, 
  ShieldAlert, 
  HelpCircle,
  LogOut,
  Settings,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    cart,
    wishlist,
    currentView,
    setView,
    searchQuery,
    setSearchQuery,
    rewardPoints,
    userName
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setView('shop');
  };

  const navCategories = [
    { name: 'All Collections', query: '' },
    { name: 'Laptop & Tech Bags', query: 'Laptop' },
    { name: 'Handbags & Fashion', query: 'Handbags' },
    { name: 'Travel & Duffel Bags', query: 'Travel' },
    { name: 'Sling & Crossbody', query: 'Sling' },
    { name: 'School & College', query: 'School' }
  ];

  const handleCategoryClick = (query: string) => {
    setSearchQuery(query);
    setView('shop');
    setIsShopDropdownOpen(false);
  };

  return (
    <div className="w-full relative z-50">
      {/* 1. Ultra-Clean, Premium Promo Bar */}
      <div className="bg-brand-black text-brand-cream/90 text-[10px] uppercase tracking-[0.25em] py-2 text-center font-mono font-medium border-b border-white/5 select-none">
        Heritage Craftsmanship Since 1991 <span className="text-brand-gold mx-2">•</span> Free Express Shipping on Luxury Collections
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 w-full border-b border-brand-taupe/25 bg-brand-cream/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            
            {/* Logo & Brand Identity */}
            <div className="flex items-center gap-10">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setView('home');
                }} 
                className="flex items-center gap-2.5 text-left cursor-pointer group"
                id="nav-logo"
              >
                <div className="w-8.5 h-8.5 bg-brand-black flex items-center justify-center rounded-xs transition-transform duration-300 group-hover:rotate-6 flex-shrink-0">
                  <span className="text-brand-cream text-xs font-sans font-black tracking-tighter">BB</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif italic font-black text-lg tracking-tight text-brand-black group-hover:text-brand-gold transition-colors duration-300 uppercase leading-none">
                    The Big Bags
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.28em] text-stone-400 uppercase mt-1 leading-none">
                    Est. 1991 • Family Heritage
                  </span>
                </div>
              </button>

              {/* Desktop Navigation Links - Simplified & Accessible */}
              <nav className="hidden md:flex items-center gap-7">
                <button 
                  onClick={() => setView('home')} 
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1.5 hover:text-brand-gold cursor-pointer ${currentView === 'home' ? 'text-brand-gold font-bold' : 'text-stone-500'}`}
                >
                  Home
                  {currentView === 'home' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </button>
                
                {/* Shop Category Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                >
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setView('shop');
                    }}
                    className={`flex items-center gap-1 text-xs uppercase tracking-widest font-semibold transition-all relative py-1.5 hover:text-brand-gold cursor-pointer ${currentView === 'shop' ? 'text-brand-gold font-bold' : 'text-stone-500'}`}
                  >
                    <span>Shop All</span> 
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    {currentView === 'shop' && (
                      <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isShopDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full w-52 bg-brand-cream border border-brand-taupe/30 shadow-xl rounded-xs p-2 mt-1 z-50 overflow-hidden"
                      >
                        <div className="text-[10px] uppercase tracking-wider font-mono text-stone-400 px-3 py-1.5 border-b border-stone-100">
                          Browse Categories
                        </div>
                        {navCategories.map((cat, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleCategoryClick(cat.query)}
                            className="w-full text-left px-3 py-2 text-xs font-medium text-stone-600 hover:text-brand-gold hover:bg-brand-linen/40 transition-all rounded-xs block cursor-pointer"
                          >
                            {cat.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button 
                  onClick={() => setView('blogs')} 
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1.5 hover:text-brand-gold cursor-pointer ${currentView === 'blogs' ? 'text-brand-gold font-bold' : 'text-stone-500'}`}
                >
                  Our Blogs
                  {currentView === 'blogs' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </button>

                <button 
                  onClick={() => setView('faq')} 
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1.5 hover:text-brand-gold cursor-pointer ${currentView === 'faq' ? 'text-brand-gold font-bold' : 'text-stone-500'}`}
                >
                  FAQ & Help
                  {currentView === 'faq' && (
                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </button>
              </nav>
            </div>

            {/* Right Actions Block - Simplified and Decluttered */}
            <div className="flex items-center gap-2 sm:gap-4.5">
              
              {/* Elegant Inline Search Pill */}
              <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative group">
                <input
                  type="text"
                  placeholder="Search bags..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-44 xl:w-52 pl-8 pr-4 py-1.5 text-[11px] font-medium rounded-full border border-brand-taupe/30 bg-brand-cream/80 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold focus:w-56 transition-all duration-300 text-brand-black"
                />
                <Search className="absolute left-3 h-3 w-3 text-stone-400 group-focus-within:text-brand-gold transition-colors" />
              </form>

              {/* AI Style Advisor Capsule Button */}
              <button
                onClick={() => setView('advisor')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-cream rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-md cursor-pointer flex-shrink-0"
                id="ai-advisor-btn"
              >
                <Sparkles className="h-3 w-3 text-brand-cream animate-pulse" />
                <span>AI Style Advisor</span>
              </button>

              {/* Action Icons Line */}
              <div className="flex items-center gap-1 sm:gap-2">
                
                {/* Wishlist Icon */}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setView('shop');
                  }}
                  className="relative p-2 text-stone-500 hover:text-brand-gold transition-colors cursor-pointer"
                  title="My Favorites"
                >
                  <Heart className={`h-4.5 w-4.5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white scale-90">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Cart Icon */}
                <button
                  onClick={() => setView('cart')}
                  className="relative p-2 text-stone-500 hover:text-brand-gold transition-colors cursor-pointer"
                  title="Cart"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[8px] font-bold text-brand-cream scale-90">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Unified Account Dropdown - This completely simplifies the header! */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsAccountDropdownOpen(true)}
                  onMouseLeave={() => setIsAccountDropdownOpen(false)}
                >
                  <button
                    onClick={() => setView('dashboard')}
                    className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 border border-brand-taupe/35 hover:border-brand-gold rounded-full text-stone-500 hover:text-brand-gold bg-brand-linen/20 transition-all cursor-pointer"
                    title="Account Options"
                  >
                    <User className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline text-[10px] font-semibold tracking-wider uppercase">
                      {userName.split(' ')[0]}
                    </span>
                    <ChevronDown className="hidden sm:inline h-3 w-3 opacity-60" />
                  </button>

                  <AnimatePresence>
                    {isAccountDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full w-56 bg-brand-cream border border-brand-taupe/30 shadow-xl rounded-xs p-3 mt-1.5 z-50 text-left"
                      >
                        {/* Member Greeting */}
                        <div className="pb-2 border-b border-stone-100 mb-2">
                          <p className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">Loyalty Member</p>
                          <p className="text-xs font-bold text-brand-black truncate mt-0.5">{userName}</p>
                          <div className="flex items-center gap-1 mt-1 bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded-full w-fit">
                            <Award className="h-3 w-3" />
                            <span className="text-[9px] font-bold tracking-wider font-mono">{rewardPoints} PTS (Gold Status)</span>
                          </div>
                        </div>

                        {/* Customer Direct Navigation options */}
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              setView('dashboard');
                              setIsAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between text-left px-2 py-1.5 text-xs text-stone-600 hover:text-brand-gold hover:bg-brand-linen/40 transition-all rounded-xs font-medium cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Settings className="h-3.5 w-3.5 text-stone-400" />
                              My Account Dashboard
                            </span>
                            <ChevronRight className="h-3 w-3 opacity-40" />
                          </button>

                          <button
                            onClick={() => {
                              setView('faq');
                              setIsAccountDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between text-left px-2 py-1.5 text-xs text-stone-600 hover:text-brand-gold hover:bg-brand-linen/40 transition-all rounded-xs font-medium cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <HelpCircle className="h-3.5 w-3.5 text-stone-400" />
                              Customer Support
                            </span>
                            <ChevronRight className="h-3 w-3 opacity-40" />
                          </button>

                          {/* Admin Console - Beautifully placed out of general customer view */}
                          <div className="border-t border-stone-100/80 my-1.5 pt-1.5">
                            <button
                              onClick={() => {
                                setView('admin');
                                setIsAccountDropdownOpen(false);
                              }}
                              className="w-full flex items-center gap-2 text-left px-2 py-1.5 text-[11px] font-mono font-medium text-stone-500 hover:text-[#205C62] hover:bg-brand-linen/60 transition-all rounded-xs border border-dashed border-brand-taupe/20 cursor-pointer"
                            >
                              <ShieldAlert className="h-3.5 w-3.5" />
                              Atelier Admin Console
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

              {/* Mobile Drawer Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 text-stone-500 hover:text-brand-black transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
              </button>

            </div>
          </div>
        </div>

        {/* 3. Dropdown Overlay click container (closes active menus when clicking in empty space inside the header) */}
        {(isShopDropdownOpen || isAccountDropdownOpen) && (
          <div 
            className="fixed inset-0 z-30 pointer-events-auto" 
            onClick={() => {
              setIsShopDropdownOpen(false);
              setIsAccountDropdownOpen(false);
            }} 
          />
        )}

        {/* 4. Elegant Mobile Drawer Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-brand-taupe/15 bg-brand-cream shadow-inner overflow-hidden"
            >
              <div className="space-y-3 px-5 py-6">
                
                {/* Mobile Search Bar */}
                <form onSubmit={handleSearchSubmit} className="flex items-center relative mb-4">
                  <input
                    type="text"
                    placeholder="Search premium bags..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-brand-taupe/30 bg-brand-linen/30 focus:outline-none focus:border-brand-gold text-brand-black"
                  />
                  <Search className="absolute left-3.5 h-3.5 w-3.5 text-stone-400" />
                </form>

                {/* Primary Mobile Menu Links */}
                <div className="space-y-1.5 font-display">
                  <button 
                    onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left py-2 px-3 text-xs uppercase tracking-widest font-bold border-l-2 ${currentView === 'home' ? 'text-brand-gold bg-brand-linen/25 border-brand-gold' : 'text-stone-600 border-transparent hover:text-brand-gold'}`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => { setSearchQuery(''); setView('shop'); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left py-2 px-3 text-xs uppercase tracking-widest font-bold border-l-2 ${currentView === 'shop' ? 'text-brand-gold bg-brand-linen/25 border-brand-gold' : 'text-stone-600 border-transparent hover:text-brand-gold'}`}
                  >
                    Shop All Bags
                  </button>
                  
                  {/* Category Fast-access list in Mobile Menu */}
                  <div className="pl-4 py-1 space-y-1 border-l border-brand-taupe/15 my-1 bg-brand-linen/10 rounded-r-sm">
                    {navCategories.map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleCategoryClick(cat.query);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left py-1.5 px-2 text-[11px] font-medium text-stone-500 hover:text-brand-gold block cursor-pointer"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => { setView('blogs'); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left py-2 px-3 text-xs uppercase tracking-widest font-bold border-l-2 ${currentView === 'blogs' ? 'text-brand-gold bg-brand-linen/25 border-brand-gold' : 'text-stone-600 border-transparent hover:text-brand-gold'}`}
                  >
                    Heritage Blogs
                  </button>
                  <button 
                    onClick={() => { setView('faq'); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left py-2 px-3 text-xs uppercase tracking-widest font-bold border-l-2 ${currentView === 'faq' ? 'text-brand-gold bg-brand-linen/25 border-brand-gold' : 'text-stone-600 border-transparent hover:text-brand-gold'}`}
                  >
                    FAQs & Help
                  </button>
                  <button 
                    onClick={() => { setView('advisor'); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-between text-left py-2.5 px-3 text-xs uppercase tracking-widest font-bold text-white bg-brand-gold rounded-xs shadow-xs cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 fill-brand-cream text-brand-cream animate-pulse" />
                      AI Style Advisor
                    </span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Mobile User Profile Info & Admin Console */}
                <div className="border-t border-brand-taupe/15 pt-4 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Loyalty Member</p>
                      <p className="text-xs font-bold text-brand-black">{userName}</p>
                    </div>
                    <div className="bg-brand-gold/10 text-brand-gold px-2.5 py-1 rounded-full text-[9px] font-mono font-bold">
                      {rewardPoints} PTS
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }}
                      className="text-center py-2 px-3 text-[10px] uppercase tracking-wider font-bold text-stone-600 border border-brand-taupe/30 rounded-xs hover:border-brand-gold transition-colors cursor-pointer"
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => { setView('admin'); setIsMobileMenuOpen(false); }}
                      className="text-center py-2 px-3 text-[10px] uppercase tracking-wider font-mono font-bold text-stone-500 bg-brand-linen/40 border border-dashed border-brand-taupe/20 rounded-xs hover:bg-brand-linen transition-colors cursor-pointer"
                    >
                      Admin
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};
