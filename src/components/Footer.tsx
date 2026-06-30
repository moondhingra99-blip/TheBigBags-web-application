import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Award, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setView } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-black text-gray-400 border-t border-gray-900 font-sans">
      
      {/* Top Banner Accent */}
      <div className="bg-brand-gold py-3 text-center text-[10px] font-bold text-brand-black tracking-[0.25em] uppercase flex items-center justify-center gap-2 px-4">
        <Sparkles className="h-3.5 w-3.5 fill-brand-black text-brand-black" />
        <span>Handcrafting Indian Excellence Since 1991 • Daughter Run Legacy</span>
      </div>

      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Story Column */}
          <div className="space-y-6">
            <h3 className="font-serif italic text-white text-xl font-black uppercase tracking-tight">
              The Big Bags
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Surrounded by fine leather and the hum of sewing machines since childhood, co-founders Pooja and Neha bring their father's 35 years of bag craftsmanship into a modern, world-class online shopping experience.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 border border-gray-800 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 border border-gray-800 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 border border-gray-800 rounded-full hover:border-brand-gold hover:text-brand-gold transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Options */}
          <div className="space-y-6">
            <h4 className="font-display text-white text-xs font-bold uppercase tracking-widest border-l-2 border-brand-gold pl-3">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setView('shop')} className="hover:text-brand-gold transition-colors text-left">
                  School & College Backpacks
                </button>
              </li>
              <li>
                <button onClick={() => setView('shop')} className="hover:text-brand-gold transition-colors text-left">
                  Professional Laptop Bags
                </button>
              </li>
              <li>
                <button onClick={() => setView('shop')} className="hover:text-brand-gold transition-colors text-left">
                  Fine Handbags & Totes
                </button>
              </li>
              <li>
                <button onClick={() => setView('shop')} className="hover:text-brand-gold transition-colors text-left">
                  Rugged Duffels & Gym Bags
                </button>
              </li>
              <li>
                <button onClick={() => setView('blogs')} className="hover:text-brand-gold transition-colors text-left font-semibold text-amber-100">
                  Read Our Heritage Story
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div className="space-y-6">
            <h4 className="font-display text-white text-xs font-bold uppercase tracking-widest border-l-2 border-brand-gold pl-3">
              Customer Support & Policy
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setView('faq')} className="hover:text-brand-gold transition-colors text-left">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setView('contact')} className="hover:text-brand-gold transition-colors text-left">
                  Contact Us & Submit Tickets
                </button>
              </li>
              <li>
                <button onClick={() => setView('faq')} className="hover:text-brand-gold transition-colors text-left">
                  Return, Refund & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => setView('faq')} className="hover:text-brand-gold transition-colors text-left">
                  Terms of Service & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setView('faq')} className="hover:text-brand-gold transition-colors text-left">
                  Privacy Protection Code
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h4 className="font-display text-white text-xs font-bold uppercase tracking-widest border-l-2 border-brand-gold pl-3">
              Join The Family Inner Circle
            </h4>
            <p className="text-sm text-gray-400">
              Subscribe to get notified about secret collection launches, limited production leather runs, and exclusive discount codes.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex items-center relative">
                <input
                  type="email"
                  required
                  placeholder="Your premium email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 text-sm text-white px-4 py-3 pl-10 rounded-xs focus:outline-none focus:border-brand-gold"
                />
                <Mail className="absolute left-3.5 h-4 w-4 text-gray-500" />
                <button
                  type="submit"
                  className="absolute right-2.5 p-1.5 bg-brand-gold text-brand-black rounded-xs hover:bg-brand-gold-dark transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-brand-gold font-medium animate-pulse">
                  Welcome to the family inner circle! Keep an eye on your inbox.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            © 2026 The Big Bags India. All Rights Reserved. Crafted with love by Pooja and Neha Dhingra.
          </p>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Made with Indian Heritage</span>
            <Heart className="h-3 w-3 text-brand-gold fill-brand-gold" />
          </div>
        </div>
      </div>
    </footer>
  );
};
