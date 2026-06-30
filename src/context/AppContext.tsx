import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, SupportTicket, BlogPost, CartItem, Review, AIStyleReport } from '../types';

export type AppView = 
  | 'home' 
  | 'shop' 
  | 'detail' 
  | 'advisor' 
  | 'cart' 
  | 'checkout' 
  | 'success' 
  | 'dashboard' 
  | 'admin' 
  | 'blogs' 
  | 'blog-post' 
  | 'faq' 
  | 'about' 
  | 'contact'
  | 'compare';

interface CartProduct {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface AppContextType {
  products: Product[];
  blogs: BlogPost[];
  cart: CartProduct[];
  wishlist: string[];
  compareList: string[];
  orders: Order[];
  tickets: SupportTicket[];
  currentView: AppView;
  selectedProductId: string | null;
  selectedBlogId: string | null;
  lastPlacedOrder: Order | null;
  userEmail: string;
  userName: string;
  rewardPoints: number;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setView: (view: AppView, productId?: string | null, blogId?: string | null) => void;
  addToCart: (productId: string, quantity: number, color: string) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateCartQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  submitReview: (productId: string, rating: number, comment: string) => Promise<void>;
  placeOrder: (shippingAddress: any, paymentMethod: string) => Promise<Order>;
  submitSupportTicket: (name: string, email: string, subject: string, message: string) => Promise<void>;
  createNewProduct: (productData: any) => Promise<void>;
  updateProduct: (id: string, productData: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  createNewBlog: (blogData: any) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  
  // Client local-only persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tbb_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tbb_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareList, setCompareList] = useState<string[]>([]);
  
  // Navigation & flow states
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulated Logged In User
  const [userEmail] = useState('moondhingra.99@gmail.com');
  const [userName] = useState('Moon Dhingra');
  const [rewardPoints, setRewardPoints] = useState(250); // Initial welcome points

  const [isLoading, setIsLoading] = useState(true);

  // Sync cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('tbb_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('tbb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch initial products, blogs, and user specific details from backend
  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.error('Error fetching products:', e);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (e) {
      console.error('Error fetching blogs:', e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error('Error fetching orders:', e);
    }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/tickets');
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (e) {
      console.error('Error fetching tickets:', e);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      await Promise.all([refreshProducts(), fetchBlogs(), fetchOrders(), fetchTickets()]);
      setIsLoading(false);
    };
    initData();
  }, []);

  // Set active view
  const setView = (view: AppView, productId: string | null = null, blogId: string | null = null) => {
    setCurrentView(view);
    if (productId) setSelectedProductId(productId);
    if (blogId) setSelectedBlogId(blogId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert cart state
  const cart: CartProduct[] = cartItems.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return {
      product: p || {
        id: item.productId,
        name: 'Product Details Loading...',
        description: '',
        price: 0,
        category: '',
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'],
        colors: [item.selectedColor],
        stock: 0,
        rating: 5,
        reviewsCount: 0,
        material: '',
        specs: {},
        features: [],
        gender: 'Unisex'
      },
      quantity: item.quantity,
      selectedColor: item.selectedColor
    };
  }).filter(item => item.product.price > 0); // Filter unresolved products safely

  // Add to Cart
  const addToCart = (productId: string, quantity: number, color: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.productId === productId && item.selectedColor === color);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { productId, quantity, selectedColor: color }];
    });
  };

  // Remove from Cart
  const removeFromCart = (productId: string, color: string) => {
    setCartItems(prev => prev.filter(item => !(item.productId === productId && item.selectedColor === color)));
  };

  // Update Cart Quantity
  const updateCartQuantity = (productId: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCartItems(prev => prev.map(item => 
      (item.productId === productId && item.selectedColor === color) 
        ? { ...item, quantity } 
        : item
    ));
  };

  // Clear Cart
  const clearCart = () => setCartItems([]);

  // Toggle Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Toggle Comparison
  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), productId]; // Keep max 3 items
      }
      return [...prev, productId];
    });
  };

  // Submit Review to Backend
  const submitReview = async (productId: string, rating: number, comment: string) => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, userEmail, rating, comment })
      });
      if (res.ok) {
        await refreshProducts();
      }
    } catch (e) {
      console.error('Error submitting review:', e);
    }
  };

  // Place Order on Backend
  const placeOrder = async (shippingAddress: any, paymentMethod: string): Promise<Order> => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 0);
    // Reward points discount (10 points = ₹1 discount)
    const discountApplied = Math.min(Math.floor(rewardPoints / 10), subtotal * 0.2); // Cap at 20% order subtotal
    const total = subtotal - discountApplied;

    const orderPayload = {
      userEmail,
      customerName: userName,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.discountPrice || item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        image: item.product.images[0]
      })),
      subtotal,
      discount: discountApplied,
      total,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (!res.ok) throw new Error('Order creation failed');
      const orderData: Order = await res.json();
      
      // Update orders in state
      setOrders(prev => [...prev, orderData]);
      setLastPlacedOrder(orderData);
      
      // Update reward points (Deduct spent, add 1 point per ₹10 spent)
      const pointsDeducted = discountApplied * 10;
      const pointsEarned = Math.floor(total / 10);
      setRewardPoints(prev => Math.max(0, prev - pointsDeducted + pointsEarned));

      // Clear the cart
      clearCart();
      setView('success');
      return orderData;
    } catch (e) {
      console.error('Error processing order checkout:', e);
      throw e;
    }
  };

  // Submit Support Ticket to Backend
  const submitSupportTicket = async (name: string, email: string, subject: string, message: string) => {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(prev => [...prev, data]);
      }
    } catch (e) {
      console.error('Error submitting support ticket:', e);
    }
  };

  // Admin: Create Product
  const createNewProduct = async (productData: any) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        await refreshProducts();
      }
    } catch (e) {
      console.error('Error creating product:', e);
    }
  };

  // Admin: Update Product
  const updateProduct = async (id: string, productData: any) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      if (res.ok) {
        await refreshProducts();
      }
    } catch (e) {
      console.error('Error updating product:', e);
    }
  };

  // Admin: Delete Product
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await refreshProducts();
      }
    } catch (e) {
      console.error('Error deleting product:', e);
    }
  };

  // Admin: Update Order Status
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch (e) {
      console.error('Error updating order status:', e);
    }
  };

  // Admin: Create Blog
  const createNewBlog = async (blogData: any) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
      });
      if (res.ok) {
        await fetchBlogs();
      }
    } catch (e) {
      console.error('Error creating blog:', e);
    }
  };

  return (
    <AppContext.Provider value={{
      products,
      blogs,
      cart,
      wishlist,
      compareList,
      orders,
      tickets,
      currentView,
      selectedProductId,
      selectedBlogId,
      lastPlacedOrder,
      userEmail,
      userName,
      rewardPoints,
      isLoading,
      searchQuery,
      setSearchQuery,
      setView,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      toggleCompare,
      submitReview,
      placeOrder,
      submitSupportTicket,
      createNewProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      createNewBlog,
      refreshProducts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside an AppProvider');
  return context;
};
