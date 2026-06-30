import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, Award, Shield, RotateCcw, ThumbsUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  onQuickView: (product: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onQuickView }) => {
  const { products, blogs, setView, setSearchQuery } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const heroSlides = [
    {
      id: 1,
      category: "Signature Heritage Series",
      title: "Handcrafted Bags Built with Family Pride",
      subtitle: "Inspired by our dad's 35 years of high-durability mastery. Designed with elegant Italian leather trims, custom gold hardware, and stress-points reinforced for a lifetime of trust.",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Explore Signature Line",
      badge: "Mastery Refined",
      featureTag: "100% Full-Grain Nappa",
      featuredProduct: "The Daughters Signature",
      featuredDesc: "Tuscany Gold Handbag Edition",
      serialNumber: "SER. DHS-1991",
      atelierLocation: "MILAN // NEW DELHI",
      specifications: ["Italian Leather Trims", "Reinforced Base Corners", "Hand-Burnished Edges"],
      hotspots: [
        { top: "25%", left: "45%", text: "Curated Gold Clasps", desc: "Rustproof 24k luster finish with custom stamping" },
        { top: "52%", left: "75%", text: "Full-Grain Nappa", desc: "Sourced from premier local organic tanneries" },
        { top: "82%", left: "38%", text: "Double-Reinforced Base", desc: "Constructed with dual-stitch high-tensile wax thread" }
      ]
    },
    {
      id: 2,
      category: "The Luxe Workspaces",
      title: "Timeless Laptop Bags & Executive Briefcases",
      subtitle: "Engineered with water-resistant ballistic canvas, plush cushioned compartments, and customized layout designs to protect your technology in pure minimalist style.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80",
      buttonText: "View Laptop Bags",
      badge: "Architectural Precision",
      featureTag: "Waterproof canvas shell",
      featuredProduct: "The Heritage Laptop",
      featuredDesc: "Plush padded interior sleeve",
      serialNumber: "SER. LTW-2045",
      atelierLocation: "BENGALURU // PARIS",
      specifications: ["Padded Tech Sleeve", "Ballistic Nylon Base", "Anodized Rustproof Clips"],
      hotspots: [
        { top: "22%", left: "55%", text: "Shock-Absorbent Sleeve", desc: "High-density 8mm neoprene protection vault" },
        { top: "48%", left: "35%", text: "Ballistic Canvas", desc: "1680D double-weave military grade nylon" },
        { top: "78%", left: "62%", text: "Smart Travel Sleeve", desc: "Secure luggage pass-through for rapid airport transit" }
      ]
    },
    {
      id: 3,
      category: "The Modern Escapades",
      title: "Weekend Duffels & High-Durability Travel Bags",
      subtitle: "Spacious, heavy-duty utility fused with streamlined luxury silhouettes. Featuring dual shoe compartments, quick-access travel sleeves, and dual-stitch stress points.",
      image: "https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=1600&q=80",
      buttonText: "See Travel Bags",
      badge: "Ready for Adventure",
      featureTag: "Reinforced double seams",
      featuredProduct: "Explorer Pro Duffel",
      featuredDesc: "Expandable shoe cabin organizer",
      serialNumber: "SER. MDE-8092",
      atelierLocation: "LONDON // TOKYO",
      specifications: ["Shoe Isolation Cabin", "Dual Quick-Access Pockets", "Heavy Duty D-Rings"],
      hotspots: [
        { top: "28%", left: "40%", text: "Expandable Shoe Locker", desc: "Isolated waterproof cabin with integrated air vents" },
        { top: "58%", left: "68%", text: "Quick-Access Travel Bay", desc: "Sized for rapid passport and smartphone retrieval" },
        { top: "84%", left: "44%", text: "Reinforced D-Rings", desc: "Independently stress-tested to support up to 45kg" }
      ]
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!isPaused) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 7000);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const trending = products.filter(p => p.isTrending).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const categories = [
    { name: 'Laptop Bags', desc: 'Crafted for working professionals', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80' },
    { name: 'Handbags', desc: 'Italian Nappa leather elegance', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80' },
    { name: 'Travel Bags', desc: 'Rugged weekend getaway duffels', img: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=300&q=80' },
    { name: 'Sling Bags', desc: 'Waterproof urban crossbodies', img: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=300&q=80' }
  ];

  const handleCategoryClick = (catName: string) => {
    setSearchQuery(catName);
    setView('shop');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. ANIMATED HERO BANNER SECTION (LUXE CARRY CO THEMED) */}
      <section 
        className="relative bg-brand-black text-white min-h-[600px] sm:min-h-[660px] lg:h-[700px] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-none border-b border-brand-taupe/30 select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Architectural Grid Pattern & Ambient Overlay */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-black/20 to-transparent z-10 pointer-events-none" />
        
        {/* Corner Aesthetic Crosshairs */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-white/10 z-20 pointer-events-none select-none hidden md:block">⊕ DESIGN_ATELIER_2026</div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-white/10 z-20 pointer-events-none select-none hidden md:block">AT-00{activeSlide.id} // SECURE</div>
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/10 z-20 pointer-events-none select-none hidden md:block">© ALL RIGHTS PERSISTED</div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-brand-gold/20 z-20 pointer-events-none select-none hidden md:block">LUXE CARRY CO.</div>

        {/* Elegant Vertical Running Text Labels */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-16 pointer-events-none select-none z-30">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-stone-500 origin-center -rotate-90">
            {activeSlide.serialNumber}
          </span>
          <div className="w-[1px] h-12 bg-white/10" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-brand-gold origin-center -rotate-90">
            {activeSlide.atelierLocation}
          </span>
        </div>

        {/* Subtle Ken Burns Zoom Image Overlay */}
        <div className="absolute inset-0 z-0 bg-brand-black">
          <motion.div
            key={`hero-bg-${currentSlide}`}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1.01, opacity: 0.28 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={activeSlide.image} 
              alt={activeSlide.title} 
              className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 via-brand-black/80 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-brand-black to-transparent z-10 pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-20 pl-0 xl:pl-12">
          
          {/* Animated Slide Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Category tag & auto-play pause status indicators */}
            <div className="flex items-center gap-4">
              <motion.div
                key={`badge-${currentSlide}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/15 border border-brand-gold/25 rounded-xs text-brand-gold text-[10px] uppercase tracking-[0.2em] font-semibold shadow-inner"
              >
                <Sparkles className="h-3 w-3 fill-brand-gold animate-pulse text-brand-gold" />
                <span>{activeSlide.category}</span>
              </motion.div>

              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-stone-500">
                <span className={`h-1.5 w-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'}`} />
                <span>{isPaused ? 'Slide Paused' : 'Live Cycle'}</span>
              </div>
            </div>
            
            {/* Split Highlight Heading */}
            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-4xl sm:text-5xl lg:text-6.5xl font-light tracking-tight leading-[1.05] text-brand-cream"
            >
              {activeSlide.title.split(' ').map((word, i) => {
                const lowerWord = word.toLowerCase();
                const isSpecial = lowerWord === 'family' || lowerWord === 'timeless' || lowerWord === 'high-durability' || lowerWord === 'bags' || lowerWord === 'pride' || lowerWord === 'briefcases';
                return (
                  <span key={i} className={isSpecial ? "text-brand-blue font-normal pr-2 bg-gradient-to-r from-brand-blue to-[#68a4b8] bg-clip-text text-transparent inline-block" : "pr-2 inline-block"}>
                    {word}
                  </span>
                );
              })}
            </motion.h1>
            
            {/* Description Subtitle */}
            <motion.p 
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-300 text-xs sm:text-sm max-w-lg leading-relaxed font-sans font-light"
            >
              {activeSlide.subtitle}
            </motion.p>

            {/* Quick Specs list */}
            <motion.div 
              key={`specs-${currentSlide}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden sm:flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/5 pt-4 text-[11px] font-mono tracking-wider text-stone-400"
            >
              {activeSlide.specifications.map((spec, index) => (
                <span key={index} className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-brand-gold rounded-full" />
                  {spec}
                </span>
              ))}
            </motion.div>

            {/* Actions Buttons Container */}
            <motion.div 
              key={`actions-${currentSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 pt-3"
            >
              <button
                onClick={() => setView('shop')}
                className="px-8 py-3.5 bg-brand-gold hover:bg-[#205C62] text-brand-cream font-black text-xs uppercase tracking-[0.2em] rounded-xs hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer shadow-lg shadow-brand-gold/15"
              >
                <span>{activeSlide.buttonText}</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand-cream" />
              </button>
              <button
                onClick={() => setView('advisor')}
                className="px-8 py-3.5 bg-brand-cream/10 hover:bg-brand-cream/15 border border-brand-cream/20 hover:border-brand-cream/30 text-brand-cream font-bold text-xs uppercase tracking-[0.2em] rounded-xs hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <span>Try AI Style Advisor</span>
              </button>
            </motion.div>
          </div>

          {/* Right Showcase Card with Interactive Pulsating Hotspots */}
          <div className="hidden lg:flex lg:col-span-5 justify-center relative">
            <motion.div 
              key={`card-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.95, x: 25 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-80 h-[410px] rounded-xs overflow-hidden border border-brand-taupe/30 shadow-2xl bg-brand-black/40 group cursor-crosshair"
            >
              <img 
                src={activeSlide.image} 
                alt={activeSlide.title} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/25 to-brand-black/10 z-10 pointer-events-none" />
              
              {/* Feature Tag Badge overlay */}
              <div className="absolute top-4 right-4 z-20 px-2 py-1 bg-brand-cream/90 hover:bg-brand-cream text-brand-black border border-brand-taupe text-[9px] font-mono font-bold uppercase tracking-widest rounded-xs shadow-md transition-colors">
                {activeSlide.featureTag}
              </div>

              {/* Floating serial number */}
              <div className="absolute top-4 left-4 z-20 text-[9px] font-mono font-semibold tracking-wider text-white/50 bg-black/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                {activeSlide.serialNumber}
              </div>

              {/* Pulsating Hotspots - Ultra High End Aesthetic Detail */}
              {activeSlide.hotspots.map((h, hidx) => (
                <div 
                  key={hidx}
                  className="absolute z-20 group/hotspot"
                  style={{ top: h.top, left: h.left }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring animation */}
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-brand-blue/30 animate-ping" />
                    {/* Solid center dot */}
                    <button 
                      className="relative h-3 w-3 rounded-full bg-brand-blue border border-brand-cream shadow-xs cursor-pointer focus:outline-none"
                      aria-label="View spec item detail"
                    />
                    
                    {/* Hover tooltip spec panel */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 p-3 bg-brand-black/90 border border-brand-taupe/35 text-white text-[10px] rounded-xs opacity-0 scale-95 pointer-events-none group-hover/hotspot:opacity-100 group-hover/hotspot:scale-100 transition-all duration-300 z-30 shadow-2xl backdrop-blur-md">
                      <div className="font-bold text-brand-gold uppercase tracking-wider font-mono border-b border-white/10 pb-1 mb-1">
                        {h.text}
                      </div>
                      <div className="text-[9px] text-stone-300 font-sans leading-relaxed">
                        {h.desc}
                      </div>
                      <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-brand-black/95" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom floating product box */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-left z-20 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent">
                <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold">{activeSlide.badge}</span>
                <h3 className="font-serif italic font-bold text-brand-cream text-lg mt-1">{activeSlide.featuredProduct}</h3>
                <p className="text-xs text-stone-300 mt-1 font-sans">{activeSlide.featuredDesc}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Elegant Bottom Navigation Controls & Progress Bars */}
        <div className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 z-30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Progress Slots Indicator */}
          <div className="flex items-center gap-3 w-full sm:max-w-xs md:max-w-md">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className="group flex-1 py-3 text-left focus:outline-none cursor-pointer"
              >
                {/* Thin line wrapper */}
                <div className="h-[2px] bg-white/15 rounded-full overflow-hidden relative">
                  {idx === currentSlide && (
                    <motion.div 
                      key={`progress-bar-${idx}-${isPaused}`}
                      initial={{ width: "0%" }}
                      animate={{ width: isPaused ? "100%" : "100%" }}
                      transition={{ 
                        duration: isPaused ? 0 : 7, 
                        ease: "linear"
                      }}
                      className="absolute top-0 left-0 bottom-0 bg-brand-gold"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[9px] font-mono tracking-widest ${idx === currentSlide ? 'text-brand-gold font-bold' : 'text-stone-400 group-hover:text-stone-200'} transition-colors`}>
                    0{idx + 1}
                  </span>
                  <span className={`hidden md:inline text-[9px] uppercase tracking-wider font-semibold ${idx === currentSlide ? 'text-brand-cream' : 'text-stone-500 group-hover:text-stone-300'} transition-colors`}>
                    {slide.badge.split(' ')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Left/Right arrow controls */}
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={prevSlide}
              className="p-2 border border-white/15 rounded-full hover:bg-white/10 hover:border-white/30 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border border-white/15 rounded-full hover:bg-white/10 hover:border-white/30 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* LUXURY TICKER MARQUEE BAR (AS SEEN ON LUXE CARRY CO) */}
      <div className="w-full bg-brand-linen border-y border-brand-taupe/50 py-3 overflow-hidden select-none -mt-16">
        <div className="whitespace-nowrap flex animate-marquee gap-12 text-[10px] font-semibold text-brand-gray uppercase tracking-[0.25em]">
          <span className="flex items-center gap-2">Pure Full-Grain Nappa Leather <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">Double-Stitched Stress Points <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">35-Year Family Craft Legacy <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">7-Day Hassle-Free Exchange <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">Curated Premium Gold Hardware <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          
          {/* Duplicate to create endless loop */}
          <span className="flex items-center gap-2">Pure Full-Grain Nappa Leather <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">Double-Stitched Stress Points <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">35-Year Family Craft Legacy <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">7-Day Hassle-Free Exchange <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
          <span className="flex items-center gap-2">Curated Premium Gold Hardware <Sparkles className="h-3 w-3 text-brand-gold fill-brand-gold" /></span>
        </div>
      </div>

      {/* 2. GUARANTEES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-5 bg-brand-linen border border-brand-taupe rounded-sm shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-3 bg-brand-cream rounded-xs text-brand-gold">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-brand-black">Authentic Indian Leather</h4>
              <p className="text-xs text-brand-gray mt-1 leading-relaxed">Full-grain Nappa leather sourced and hand-trimmed with pure local pride.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-brand-linen border border-brand-taupe rounded-sm shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-3 bg-brand-cream rounded-xs text-brand-gold">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-brand-black">2-3 Years Warranty</h4>
              <p className="text-xs text-brand-gray mt-1 leading-relaxed">We double-stitch stress points and use heavy-duty hardware. We guarantee durability.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-brand-linen border border-brand-taupe rounded-sm shadow-xs hover:shadow-sm transition-shadow">
            <div className="p-3 bg-brand-cream rounded-xs text-brand-gold">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-brand-black">Easy Exchanges</h4>
              <p className="text-xs text-brand-gray mt-1 leading-relaxed">Not exactly the fit or capacity you wanted? Exchange hassle-free within 7 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO CATEGORY GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-md mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">Discover By Need</span>
          <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase">Curated Bag Categories</h2>
          <div className="h-1 w-10 bg-brand-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-64 bg-brand-linen rounded-sm overflow-hidden shadow-xs hover:shadow-md border border-brand-taupe transition-all duration-300 cursor-pointer"
            >
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/40 to-transparent flex flex-col justify-end p-5" />
              <div className="absolute bottom-5 left-5 right-5 space-y-1">
                <h3 className="font-display font-bold text-white text-lg">{cat.name}</h3>
                <p className="text-xs text-stone-200">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS CAROUSEL */}
      {bestSellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Customer Favorites</span>
              <h2 className="font-display font-black text-2xl uppercase tracking-tight">The Best Sellers</h2>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setView('shop'); }}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-gold hover:text-brand-black transition-colors"
            >
              <span>Explore All Bags</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {bestSellers.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={onQuickView} 
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE AI ADVISOR PROMOTION BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-blue text-white rounded-xs p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Ambient light pulse */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-brand-blue text-[9px] font-bold uppercase tracking-[0.2em] rounded-xs shadow-xs">
              <Sparkles className="h-3 w-3 text-brand-blue fill-brand-blue" />
              <span>AI Neural Engine</span>
            </div>
            <h3 className="font-serif italic text-3xl sm:text-4xl tracking-tight leading-tight text-white">
              The Style Advisor
            </h3>
            <p className="text-xs sm:text-sm text-stone-100 leading-relaxed font-sans font-light opacity-95">
              &quot;Upload your outfit. Our AI Style Advisor, calibrated with Pooja and Neha&apos;s fashion philosophy, will analyze your outfit colors, style, occasion, and body balance to recommend the perfect bag format.&quot;
            </p>
            <button
              onClick={() => setView('advisor')}
              className="px-8 py-3.5 bg-brand-black text-white text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-gold hover:text-brand-black transition-colors rounded-xs cursor-pointer mt-4"
            >
              <span>Consult Advisor</span>
            </button>
          </div>

          <div className="w-full lg:w-96 aspect-[4/3] rounded-xs bg-white/10 border border-white/10 p-6 flex flex-col justify-between shadow-inner relative overflow-hidden z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Advisor Demo</span>
                <span className="text-[10px] text-stone-200">Formality Level: High</span>
              </div>
              <div className="space-y-2">
                <div className="text-[11px] text-white font-bold">Input: &quot;Blue Linen Blazer, Tan Leather Shoes&quot;</div>
                <div className="text-[11px] text-brand-gold font-bold">AI Diagnosis:</div>
                <p className="text-[11px] text-stone-100 italic font-sans opacity-95">
                  &quot;To compliment the high contrast of the blue blazer and tan shoes, choose a Tan Brown leather bag. Matches the shoes and provides a high-end European styling look.&quot;
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 pt-3 mt-4 justify-between">
              <span className="text-[10px] text-emerald-300 font-bold">Compatibility: 94%</span>
              <span className="text-[9px] text-stone-200 font-mono">TBB Style Engine v2.1</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDERS STORIES SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 bg-brand-linen rounded-sm border border-brand-taupe shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6 sm:p-10">
          <div className="space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">About Us</span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-brand-black">
              Two Sisters carrying <br />
              Forward a Lifetime Passion
            </h3>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-sans">
              As daughters of a master craftsman who manufactured high-durability bags for leading clients across India for over three decades, we didn't just inherit a business—we inherited a philosophy.
            </p>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed font-sans">
              Our dad taught us how to inspect every grain of leather, how to choose sewing threads that never fail, and how to design straps that protect the shoulders. We combine those strict structural standards with minimalist, elegant aesthetics suitable for today's dynamic life.
            </p>
            <button
              onClick={() => setView('blogs', null, 'b1')}
              className="px-5 py-3 border border-brand-black hover:bg-brand-black text-brand-black hover:text-brand-cream font-bold text-xs rounded-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-brand-cream border border-brand-taupe">
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80" 
                alt="Sisters craft bag together" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-brand-cream border border-brand-taupe mt-6">
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80" 
                alt="Detailed canvas bag trimming" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. RECENT BLOGS PREVIEW */}
      {blogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-bold">Expert Advice</span>
              <h2 className="font-display font-black text-2xl uppercase tracking-tight">Latest Buying Guides</h2>
            </div>
            <button 
              onClick={() => setView('blogs')}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              <span>View All Blogs</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.slice(0, 2).map(blog => (
              <div 
                key={blog.id}
                onClick={() => setView('blogs', null, blog.id)}
                className="group flex flex-col sm:flex-row bg-brand-linen border border-brand-taupe rounded-sm overflow-hidden hover:shadow-sm transition-all duration-300 cursor-pointer"
              >
                <div className="sm:w-48 h-48 sm:h-full relative overflow-hidden bg-brand-cream flex-shrink-0">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] uppercase text-brand-gold font-bold tracking-wider">{blog.category}</span>
                    <h4 className="font-display font-bold text-base text-brand-black group-hover:text-brand-gold transition-colors">{blog.title}</h4>
                    <p className="text-xs text-brand-gray line-clamp-2 leading-relaxed">{blog.summary}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-brand-gray mt-4 border-t border-brand-taupe/40 pt-3">
                    <span>By {blog.author}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-md mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold font-bold">Real Customer Feedback</span>
          <h2 className="font-display font-black text-2xl tracking-tight uppercase">Featured Reviews</h2>
          <div className="h-1 w-10 bg-brand-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-brand-linen border border-brand-taupe rounded-sm shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-brand-gold">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-xs text-brand-gray leading-relaxed italic">
              &quot;I purchased the Daughters Signature leather handbag in Tuscany Gold. The leather is butter-soft and the gold hardware is extremely classy. Outstanding craftsmanship!&quot;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-brand-taupe/40">
              <span className="text-xs font-bold text-brand-black">Ananya Sen</span>
              <span className="text-[10px] text-brand-sage font-bold flex items-center gap-0.5">
                <ThumbsUp className="h-3 w-3 fill-current" /> Verified Buyer
              </span>
            </div>
          </div>

          <div className="p-6 bg-brand-linen border border-brand-taupe rounded-sm shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-brand-gold">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-xs text-brand-gray leading-relaxed italic">
              &quot;The Heritage Laptop Backpack is a game changer for daily office commutes. It holds my laptop, accessories, lunch boxes easily, and distributing weight so shoulders never ache.&quot;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-brand-taupe/40">
              <span className="text-xs font-bold text-brand-black">Rohan Mehta</span>
              <span className="text-[10px] text-brand-sage font-bold flex items-center gap-0.5">
                <ThumbsUp className="h-3 w-3 fill-current" /> Verified Buyer
              </span>
            </div>
          </div>

          <div className="p-6 bg-brand-linen border border-brand-taupe rounded-sm shadow-xs space-y-4">
            <div className="flex items-center gap-1 text-brand-gold">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-xs text-brand-gray leading-relaxed italic">
              &quot;I took the Explorer Pro Duffel Bag on a trip to the Himalayas. It got rained on and dragged around, yet everything stayed completely dry. The shoe compartment is fantastic.&quot;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-brand-taupe/40">
              <span className="text-xs font-bold text-brand-black">Siddharth Roy</span>
              <span className="text-[10px] text-brand-sage font-bold flex items-center gap-0.5">
                <ThumbsUp className="h-3 w-3 fill-current" /> Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
