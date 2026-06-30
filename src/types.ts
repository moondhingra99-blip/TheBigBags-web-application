export interface Review {
  id: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpfulVotes: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  specs: { [key: string]: string };
  features: string[];
  capacity?: string;
  material: string;
  waterproof?: boolean;
  laptopSize?: string;
  gender: string; // 'Men' | 'Women' | 'Kids' | 'Unisex'
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  reviews?: Review[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  id: string;
  userEmail: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  discount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid';
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  date: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Open' | 'Resolved';
  date: string;
}

export interface AIStyleReport {
  id: string;
  date: string;
  occasion: string;
  style: string;
  gender: string;
  outfitDescription: string;
  bestCategory: string;
  bestColor: string;
  bestSize: string;
  bestMaterial: string;
  styleScore: number;
  tips: string[];
  recs: string[];
}
