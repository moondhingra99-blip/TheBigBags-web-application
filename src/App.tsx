import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { ComparePanel } from './components/ComparePanel';
import { ChatAssistant } from './components/ChatAssistant';

// Import Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { StyleAdvisor } from './pages/StyleAdvisor';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { BlogsPage } from './pages/BlogsPage';
import { FAQPage } from './pages/FAQPage';
import { ComparePage } from './pages/ComparePage';

import { Product } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Main Inner Shell component that has access to the AppContext
const AppInner: React.FC = () => {
  const { currentView, setView } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Scroll to top of window on page transitions
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleQuickViewTrigger = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  // Switch router rendering
  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <Home onQuickView={handleQuickViewTrigger} />;
      case 'shop':
        return <Shop onQuickView={handleQuickViewTrigger} />;
      case 'detail':
        return <ProductDetail />;
      case 'advisor':
        return <StyleAdvisor />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'success':
        return <OrderSuccessPage />;
      case 'dashboard':
        return <UserDashboardPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'faq':
        return <FAQPage />;
      case 'compare':
        return <ComparePage />;
      default:
        return <Home onQuickView={handleQuickViewTrigger} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-gray selection:bg-brand-gold/20 selection:text-brand-black">
      {/* Premium black & gold header navbar */}
      <Navbar />

      {/* Main page content layout */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky, structural comparison panel bar */}
      <ComparePanel />

      {/* Conversational Floating Companion Pooja & Neha */}
      <ChatAssistant />

      {/* Comprehensive brand footer column */}
      <Footer />

      {/* Quick view spec table popup */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={handleCloseQuickView} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
