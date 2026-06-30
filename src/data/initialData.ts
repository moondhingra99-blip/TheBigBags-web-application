import { Product, BlogPost } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Heritage Laptop Backpack',
    description: 'Decades of family design expertise packed into our signature laptop bag. Features water-resistant premium canvas, Italian leather accents, and an ergonomically balanced suspension strap system.',
    price: 3499,
    discountPrice: 2999,
    category: 'Laptop Bags',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Midnight Black', 'Olive Drab', 'Tan Brown'],
    sizes: ['15.6 inch', '17 inch'],
    stock: 25,
    rating: 4.9,
    reviewsCount: 142,
    material: 'Premium Canvas & Full-Grain Leather',
    waterproof: true,
    laptopSize: '15.6 inch',
    gender: 'Unisex',
    isBestSeller: true,
    isTrending: true,
    specs: {
      'Dimensions': '45 x 30 x 15 cm',
      'Capacity': '25 Liters',
      'Weight': '850 grams',
      'Warranty': '2 Years Limited Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Dedicated padded TSA-friendly laptop compartment',
      'Hidden anti-theft back pocket for passports and wallets',
      'Pass-through luggage strap for seamless travel',
      'Double-stitched stress points for lifelong durability'
    ],
    reviews: [
      {
        id: 'r1',
        userName: 'Aarav Sharma',
        userEmail: 'aarav@example.com',
        rating: 5,
        comment: 'Hands down the best laptop bag I have ever owned. The attention to detail is outstanding, and the weight distribution is like magic. Highly recommend!',
        date: '2026-06-15',
        verified: true,
        helpfulVotes: 24
      },
      {
        id: 'r2',
        userName: 'Priya Patel',
        userEmail: 'priya@example.com',
        rating: 5,
        comment: 'The stitching is immaculate. You can really tell this brand understands craftsmanship. Love the olive color!',
        date: '2026-06-20',
        verified: true,
        helpfulVotes: 12
      }
    ]
  },
  {
    id: '2',
    name: 'Daughters Signature Handbag',
    description: 'Designed by the founders themselves, this exquisite full-grain leather handbag blends traditional Indian handcrafting with chic modern aesthetics. A timeless masterpiece.',
    price: 5999,
    discountPrice: 4999,
    category: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Tuscan Gold', 'Burgundy Wine', 'Nero Black'],
    stock: 12,
    rating: 4.8,
    reviewsCount: 88,
    material: 'Genuine Italian Nappa Leather',
    waterproof: false,
    gender: 'Women',
    isBestSeller: true,
    isNewArrival: true,
    specs: {
      'Dimensions': '32 x 24 x 12 cm',
      'Capacity': '10 Liters',
      'Weight': '600 grams',
      'Warranty': '1 Year Leather Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Hand-painted leather edges',
      'Premium gold-finished custom hardware',
      'Multiple interior organizer pockets with luxury suede lining',
      'Detachable and adjustable shoulder strap'
    ],
    reviews: [
      {
        id: 'r3',
        userName: 'Meera Deshmukh',
        userEmail: 'meera@example.com',
        rating: 5,
        comment: 'This is pure luxury! The Tuscan Gold looks stunning and feels incredibly soft. It goes with every outfit.',
        date: '2026-06-18',
        verified: true,
        helpfulVotes: 19
      }
    ]
  },
  {
    id: '3',
    name: 'Explorer Pro Duffel Bag',
    description: 'An ultra-rugged duffel bag built for weekend getaways and active lifestyles. Crafted with heavy-duty ballistic nylon, lockable zippers, and a dedicated ventilated shoe compartment.',
    price: 3999,
    discountPrice: 3499,
    category: 'Travel Bags',
    images: [
      'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Military Green', 'Charcoal Grey', 'Navy Blue'],
    stock: 30,
    rating: 4.7,
    reviewsCount: 110,
    material: '1680D Ballistic Nylon',
    waterproof: true,
    gender: 'Unisex',
    isTrending: true,
    specs: {
      'Dimensions': '50 x 28 x 25 cm',
      'Capacity': '35 Liters',
      'Weight': '950 grams',
      'Warranty': '3 Years Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Side-access ventilated compartment for muddy shoes or gym gear',
      'Reinforced water-resistant bottom layer',
      'Comfort-molded padded shoulder strap',
      'Quick-grab side handles'
    ],
    reviews: []
  },
  {
    id: '4',
    name: 'Urban Sling & Crossbody Bag',
    description: 'Stay lightweight and secure while cruising the city. Perfect for keys, phone, tablet, and wallet. Features an adjustable seatbelt-grade strap and quick-access magnetic buckle.',
    price: 1999,
    discountPrice: 1499,
    category: 'Sling Bags',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Slate Grey', 'Crimson Red', 'Carbon Black'],
    stock: 45,
    rating: 4.6,
    reviewsCount: 65,
    material: 'Waterproof Ripstop Nylon',
    waterproof: true,
    gender: 'Unisex',
    isNewArrival: true,
    specs: {
      'Dimensions': '28 x 18 x 8 cm',
      'Capacity': '4 Liters',
      'Weight': '350 grams',
      'Warranty': '1 Year Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Fidlock-style quick release magnetic buckle',
      'Padded sleeve fits up to an 11-inch iPad Pro',
      'Hidden security compartment with RFID protection',
      'Breathable 3D mesh back panel'
    ],
    reviews: []
  },
  {
    id: '5',
    name: 'Minimalist Everyday Tote',
    description: 'The ultimate carry-all for work, shopping, or cafe workspace. Designed with structured organic canvas and full-grain leather straps. Elegant and environmentally conscious.',
    price: 2499,
    discountPrice: 1999,
    category: 'Tote Bags',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Cream Beige', 'Forest Green', 'Navy Blue'],
    stock: 18,
    rating: 4.7,
    reviewsCount: 43,
    material: 'Organic Cotton Canvas & Premium Leather',
    waterproof: false,
    gender: 'Women',
    specs: {
      'Dimensions': '38 x 32 x 10 cm',
      'Capacity': '12 Liters',
      'Weight': '400 grams',
      'Warranty': '1 Year Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Thick, durable 16oz organic cotton canvas',
      'Interior zippered safety pouch for valuables',
      'Key ring keeper clasp inside',
      'Spacious main compartment fits 15" MacBook Pro'
    ],
    reviews: []
  },
  {
    id: '6',
    name: 'Active Gym & Duffel Bag',
    description: 'Sleek, lightweight, and engineered for high-intensity lifestyles. Includes built-in water bottle holsters, dry-wet separation pouch, and a fresh mesh breathing vent.',
    price: 2799,
    discountPrice: 2299,
    category: 'Gym Bags',
    images: [
      'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Neon Coral', 'Titanium Black', 'Cobalt Blue'],
    stock: 22,
    rating: 4.5,
    reviewsCount: 37,
    material: 'Anti-Tear Polyester',
    waterproof: true,
    gender: 'Unisex',
    specs: {
      'Dimensions': '46 x 24 x 24 cm',
      'Capacity': '26 Liters',
      'Weight': '500 grams',
      'Warranty': '1 Year Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Integrated wet pocket for swimwear or sweaty gym clothes',
      'Dual stretchy mesh beverage slots',
      'Detachable padded strap with honeycomb mesh breathing',
      'Dual zipper smooth slider'
    ],
    reviews: []
  },
  {
    id: '7',
    name: 'Junior Adventure School Bag',
    description: 'Designed specifically with orthopedic backing to distribute load evenly across growing backs. Vibrant, durable, and packed with functional compartments for books and lunchboxes.',
    price: 1899,
    discountPrice: 1599,
    category: 'School Bags',
    images: [
      'https://images.unsplash.com/photo-1575844265151-50e8a78248c8?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Rocket Blue', 'Unicorn Pink', 'Cosmo Violet'],
    stock: 35,
    rating: 4.8,
    reviewsCount: 54,
    material: 'High-Density Tearproof Polyester',
    waterproof: true,
    gender: 'Kids',
    isTrending: true,
    specs: {
      'Dimensions': '40 x 28 x 18 cm',
      'Capacity': '20 Liters',
      'Weight': '600 grams',
      'Warranty': '1 Year Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Ergonomic S-curve padded shoulder strap with adjustable chest buckle',
      '3M high-visibility reflective striping for evening safety',
      'Reinforced crash-resistant protective rubber bottom studs',
      'Included matching insulated lunch pouch'
    ],
    reviews: []
  },
  {
    id: '8',
    name: 'Vintage Wanderer Travel Backpack',
    description: 'Carrying forward the classic rucksack lineage. Elegant buckle closures mask modern magnetic quick-snaps. Perfect for hiking trails, cross-country travel, and cafe hopping.',
    price: 4499,
    discountPrice: 3899,
    category: 'Backpacks',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    ],
    colors: ['Rustic Brown', 'Classic Sage', 'Dark Indigo'],
    stock: 14,
    rating: 4.9,
    reviewsCount: 74,
    material: 'Waxed Cotton Canvas & Crazy Horse Leather',
    waterproof: true,
    gender: 'Unisex',
    isBestSeller: true,
    specs: {
      'Dimensions': '48 x 32 x 16 cm',
      'Capacity': '28 Liters',
      'Weight': '1.1 kg',
      'Warranty': '2 Years Warranty',
      'Country of Origin': 'India'
    },
    features: [
      'Unique drawstring entry secured by heavy-duty storm flap',
      'Quick-access side zip entry to main compartment',
      'Padded bottom shell to cushion electronics',
      'Stitching reinforced with bar-tack threads'
    ],
    reviews: []
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'From Father to Daughters: Decades of Bag Craftsmanship',
    summary: 'Our founders share the story of growing up in their father\'s manufacturing workshop and how they are bringing traditional quality into modern ecommerce.',
    content: `Surrounded by heaps of fine leather, threads of every thickness, and the persistent rhythm of sewing machines, we grew up learning that a bag is not just an accessory; it is a companion.

Our father spent 35 years crafting premium utility bags for clients across India. He taught us how to judge the grain of leather, how to choose stitches that will survive heavy wear, and how to balance weight distribution.

Today, as daughters taking this legacy online, we combine those decades of rugged, structural expertise with the minimalist and aesthetic requirements of the modern workspace and luxury styling. Every stitch at The Big Bags represents our childhood, our heritage, and our commitment to absolute premium quality.`,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80',
    category: 'Lifestyle & Heritage',
    author: 'Neha & Pooja Dhingra',
    date: 'June 25, 2026',
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: 'The Ultimate Guide to Selecting Your Daily Commute Bag',
    summary: 'Laptop sleeve size, capacity, waterproof requirements—here is everything you need to know before buying a professional commute backpack.',
    content: `When you commute daily, your backpack is essentially your mobile desk. Here is what you should consider:

1. **The Laptop Sleeve:** It should have dense padding on all sides, especially the bottom. A false bottom is key—ensuring that if you drop your bag, your laptop doesn\'t impact the hard floor.
2. **Capacity & Volume:** For daily commute, 20-25 Liters is the sweet spot. Anything larger looks bulky; anything smaller leaves no room for lunch boxes or water bottles.
3. **Material Durability:** Look for Ripstop Canvas or Ballistic Nylon. It must survive public transit, bike rides, and rain showers.
4. **Strap Ergonomics:** Wide, padded S-curve shoulder straps prevent neck stiffness and distribute weight evenly.`,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    category: 'Buying Guides',
    author: 'Pooja Dhingra',
    date: 'June 18, 2026',
    readTime: '4 min read'
  }
];

export const FAQS = [
  {
    q: 'What is the history behind The Big Bags?',
    a: 'We are an Indian family-owned brand with over 35 years of manufacturing experience. The brand was founded by a master bags-craftsman and is today carried forward by his two daughters who grew up in the workshop, marrying traditional craftsmanship with contemporary, modern fashion.'
  },
  {
    q: 'Are your bags waterproof?',
    a: 'Many of our bags are explicitly waterproof or water-resistant, made from 1680D Ballistic Nylon, Waxed Canvas, or Ripstop Polyester. Please check the specific product specifications on the listing page.'
  },
  {
    q: 'Do you offer a warranty on your products?',
    a: 'Yes! We stand behind our quality. We offer a 1-year warranty on Handbags and Sling bags, and a 2-to-3-year comprehensive warranty on all Backpacks and Travel/Duffel bags.'
  },
  {
    q: 'How do I care for my leather/canvas bag?',
    a: 'For leather, we recommend cleaning with a damp soft cloth and applying a leather conditioner once every six months. For canvas, spot cleaning with mild soapy water is best. Avoid machine washing.'
  }
];
