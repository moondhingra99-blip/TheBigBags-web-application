import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_PRODUCTS, INITIAL_BLOGS } from './src/data/initialData.js';
import { Product, Order, SupportTicket, Review, BlogPost, AIStyleReport } from './src/types.js';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Set up file-based persistent storage
const DB_FILE = path.join(process.cwd(), 'db.json');

interface DBState {
  products: Product[];
  orders: Order[];
  blogs: BlogPost[];
  tickets: SupportTicket[];
  styleReports: AIStyleReport[];
}

let dbState: DBState = {
  products: INITIAL_PRODUCTS,
  orders: [],
  blogs: INITIAL_BLOGS,
  tickets: [],
  styleReports: []
};

// Load existing database if available
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      dbState = {
        products: parsed.products || INITIAL_PRODUCTS,
        orders: parsed.orders || [],
        blogs: parsed.blogs || INITIAL_BLOGS,
        tickets: parsed.tickets || [],
        styleReports: parsed.styleReports || []
      };
      console.log('Database loaded successfully from', DB_FILE);
    } else {
      saveDB();
    }
  } catch (error) {
    console.error('Error loading database, using defaults:', error);
  }
}

// Save database to disk
function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbState, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving database to disk:', error);
  }
}

loadDB();

// Initialize Gemini AI client safely
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiInstance;
}

// --- API ENDPOINTS ---

// Products Endpoints
app.get('/api/products', (req, res) => {
  res.json(dbState.products);
});

app.post('/api/products', (req, res) => {
  const newProduct: Product = {
    id: `p-${Date.now()}`,
    reviewsCount: 0,
    rating: 5.0,
    reviews: [],
    ...req.body
  };
  dbState.products.push(newProduct);
  saveDB();
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = dbState.products.findIndex(p => p.id === id);
  if (index !== -1) {
    dbState.products[index] = { ...dbState.products[index], ...req.body };
    saveDB();
    res.json(dbState.products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  dbState.products = dbState.products.filter(p => p.id !== id);
  saveDB();
  res.json({ success: true, message: 'Product deleted' });
});

// Reviews Endpoints
app.post('/api/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  const product = dbState.products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const newReview: Review = {
    id: `r-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    verified: true,
    helpfulVotes: 0,
    ...req.body
  };

  if (!product.reviews) product.reviews = [];
  product.reviews.push(newReview);
  product.reviewsCount = product.reviews.length;
  const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  product.rating = parseFloat((sum / product.reviews.length).toFixed(1));

  saveDB();
  res.status(201).json(newReview);
});

// Orders Endpoints
app.get('/api/orders', (req, res) => {
  res.json(dbState.orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder: Order = {
    id: `TBB-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Processing',
    ...req.body
  };

  // Update product stock levels
  newOrder.items.forEach(item => {
    const product = dbState.products.find(p => p.id === item.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
    }
  });

  dbState.orders.push(newOrder);
  saveDB();
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const index = dbState.orders.findIndex(o => o.id === id);
  if (index !== -1) {
    dbState.orders[index] = { ...dbState.orders[index], ...req.body };
    saveDB();
    res.json(dbState.orders[index]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Blogs Endpoints
app.get('/api/blogs', (req, res) => {
  res.json(dbState.blogs);
});

app.post('/api/blogs', (req, res) => {
  const newBlog: BlogPost = {
    id: `b-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: ' नेहा व पूजा धींगड़ा (Neha & Pooja)',
    readTime: '3 min read',
    ...req.body
  };
  dbState.blogs.push(newBlog);
  saveDB();
  res.status(201).json(newBlog);
});

// Support Tickets Endpoints
app.get('/api/tickets', (req, res) => {
  res.json(dbState.tickets);
});

app.post('/api/tickets', (req, res) => {
  const newTicket: SupportTicket = {
    id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'Open',
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  dbState.tickets.push(newTicket);
  saveDB();
  res.status(201).json(newTicket);
});

// AI Style Advisor Endpoint
app.post('/api/style-advisor', async (req, res) => {
  const { outfitDescription, outfitImage, occasion, style, gender, budget } = req.body;
  const ai = getAI();

  if (!ai) {
    // Elegant fallback mock styling advice when no Gemini API Key is provided
    const budgetValue = parseFloat(budget) || 3000;
    const matchingProducts = dbState.products.filter(p => {
      const matchGender = p.gender === 'Unisex' || p.gender === gender;
      const matchPrice = p.price <= budgetValue;
      return matchGender && matchPrice;
    }).slice(0, 2);

    const fallbackResponse: AIStyleReport = {
      id: `REP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      occasion,
      style,
      gender,
      outfitDescription: outfitDescription || 'Demo style request',
      bestCategory: gender === 'Women' ? 'Handbags' : 'Laptop Bags',
      bestColor: outfitDescription?.toLowerCase().includes('blue') ? 'Tan Brown' : 'Midnight Black',
      bestSize: 'Medium Carryall',
      bestMaterial: 'Premium Full-Grain Leather',
      styleScore: 88,
      tips: [
        'Contrast is key: style your outfit with a bold, rich tan leather bag to balance the colors.',
        'Use the detachable shoulder strap of your bag to switch between formal and crossbody casual look.',
        'Match your shoes with the leather trim of the bag for a cohesive, well-thought aesthetic.'
      ],
      recs: matchingProducts.map(p => p.name)
    };

    return res.json({
      report: fallbackResponse,
      demoMode: true,
      adviceText: `Hello from Neha and Pooja! We are currently operating in demo mode since your AI Studio Gemini API Key is not set yet. 

Nevertheless, based on our years of family expertise, we recommend opting for a ${fallbackResponse.bestCategory} bag in ${fallbackResponse.bestColor}. A premium leather look in a ${fallbackResponse.bestSize} size perfectly matches a ${occasion} environment with a ${style} vibe!`
    });
  }

  try {
    const contents: any[] = [];
    let promptText = `You are the AI Fashion Advisor for 'The Big Bags', an Indian bag brand carried forward by two daughters Pooja and Neha.
Analyze the user outfit detail:
- Outfit description: "${outfitDescription || 'Not described'}"
- Occasion: "${occasion}"
- Preferred bag style: "${style}"
- Intended gender category: "${gender}"
- Maximum budget: ₹${budget || 'No limit'}

Our current product catalog includes:
${dbState.products.map(p => `- [ID: ${p.id}] ${p.name} (Category: ${p.category}, Color options: ${p.colors.join(', ')}, Price: ₹${p.price}, Material: ${p.material})`).join('\n')}

Based on the above, suggest the single absolute best bag category, size, color, and material that complements their style and occasion. Suggest exactly 1 or 2 matching bag names from our catalog as 'recs' (provide their actual exact product names). Calculate a "styleScore" from 50 to 100 based on outfit compatibility.
Write 3 valuable styling fashion tips.

Respond ONLY with a JSON object.`;

    if (outfitImage) {
      // If base64 image data is uploaded
      const base64Data = outfitImage.split(',')[1] || outfitImage;
      const mimeType = outfitImage.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
      contents.push({
        inlineData: {
          mimeType,
          data: base64Data
        }
      });
    }

    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bestCategory: { type: Type.STRING },
            bestColor: { type: Type.STRING },
            bestSize: { type: Type.STRING },
            bestMaterial: { type: Type.STRING },
            styleScore: { type: Type.INTEGER },
            tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            recs: { type: Type.ARRAY, items: { type: Type.STRING } },
            fashionAdvice: { type: Type.STRING }
          },
          required: ['bestCategory', 'bestColor', 'bestSize', 'bestMaterial', 'styleScore', 'tips', 'recs', 'fashionAdvice']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    const styleReport: AIStyleReport = {
      id: `REP-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      occasion,
      style,
      gender,
      outfitDescription: outfitDescription || 'Uploaded Outfit Analysis',
      bestCategory: result.bestCategory,
      bestColor: result.bestColor,
      bestSize: result.bestSize,
      bestMaterial: result.bestMaterial,
      styleScore: result.styleScore || 90,
      tips: result.tips || [],
      recs: result.recs || []
    };

    dbState.styleReports.push(styleReport);
    saveDB();

    res.json({
      report: styleReport,
      adviceText: result.fashionAdvice,
      demoMode: false
    });
  } catch (error) {
    console.error('Gemini API Error in advisor:', error);
    res.status(500).json({ error: 'AI processing failed' });
  }
});

// AI Shopping Assistant Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // Array of { role: 'user'|'assistant', content: string }
  const ai = getAI();

  if (!ai) {
    // Realistic fallback responses when no Gemini API Key is provided
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    let responseText = `Hi there! I'm Neha, co-founder of The Big Bags. 🌸 

Currently, I'm running in offline/demo mode since your GEMINI_API_KEY is not configured in the Secrets panel. 

But I can tell you that we handcraft gorgeous, highly-durable bags! Ask me about our signature "Heritage Laptop Backpack" or our "Daughters Signature Handbag". Our family has been making premium bags in India for over 35 years!`;

    if (lastUserMessage.includes('heritage') || lastUserMessage.includes('backpack')) {
      responseText = `Ah, the Heritage Laptop Backpack! This bag is truly close to our hearts. Pooja and I spent months perfecting this design based on our dad's traditional patterns. It's made of water-resistant canvas, full-grain Italian leather trims, and holds a 15.6" laptop perfectly with TSA-friendly flat layouts. It sells for ₹2,999 and has a 2-year warranty!`;
    } else if (lastUserMessage.includes('handbag') || lastUserMessage.includes('women')) {
      responseText = `The Daughters Signature Handbag is one of our best creations! It uses genuine Italian Nappa Leather, hand-painted edges, and comes in rich shades like Tuscan Gold and Burgundy. It's priced at ₹4,999, which is a steal for this grade of luxury leather.`;
    } else if (lastUserMessage.includes('warranty') || lastUserMessage.includes('durability')) {
      responseText = `We believe in lifelong durability! We offer a 1-year warranty on Handbags & Slings, and a full 2-to-3-year comprehensive warranty on our backpacks and duffels. If any stitch ever comes loose, we will repair it for you!`;
    }

    return res.json({
      text: responseText,
      demoMode: true
    });
  }

  try {
    const formattedHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: `You are Neha/Pooja, one of the two daughters who run 'The Big Bags', a premium Indian bag brand built on 35+ years of family expertise in bag craftsmanship.
Keep your replies incredibly warm, friendly, polite, elegant, and professional. Speak with passion about bag materials, durable double-stitching, functional pockets, weight ergonomics, and our family heritage.

Our catalog products are:
${dbState.products.map(p => `- ID: ${p.id}, ${p.name}, Price: ₹${p.price}, Promo: ₹${p.discountPrice || p.price}, Category: ${p.category}, Material: ${p.material}, Rating: ${p.rating}, Stock: ${p.stock}`).join('\n')}

- Use bullet points when comparing or listing bags to make things highly readable.
- If they ask to buy or checkout, direct them to click the "Cart" or "Checkout" button in the menu.
- If they want to find bags for an outfit, suggest they try our "AI Style Advisor" page.
- Limit replies to 2-3 short, friendly paragraphs.`
      }
    });

    // Feed historical messages to initialize chat state if applicable
    if (formattedHistory.length > 0) {
      // Just manually recreate the context or set history if SDK allows,
      // but simpler: we can send the last user message to a chat instance initialized with history!
      (chat as any).history = formattedHistory;
    }

    const lastMessage = messages[messages.length - 1]?.content || 'Hello';
    const response = await chat.sendMessage({ message: lastMessage });

    res.json({
      text: response.text,
      demoMode: false
    });
  } catch (error) {
    console.error('Gemini API Error in chat:', error);
    res.status(500).json({ error: 'AI Assistant failed' });
  }
});

// --- VITE MIDDLEWARE SETUP ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT} with environment ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
