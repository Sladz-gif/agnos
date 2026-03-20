export interface FeedPost {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  retweets: number;
  replies: number;
  time: string;
  verified?: boolean;
}

export const feedPosts: FeedPost[] = [
  {
    id: 1,
    author: "Agri Maven",
    username: "agri_maven",
    avatar: "AM",
    content: "Just harvested our first batch of organic tomatoes. Yield was 15% higher than expected! 🍅 The new logistics strategy really paid off. #OrganicFarming #Harvest2026",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000",
    likes: 124,
    retweets: 45,
    replies: 12,
    time: "2h",
    verified: true
  },
  {
    id: 2,
    author: "Poultry Pro",
    username: "poultry_pro",
    avatar: "PP",
    content: "Has anyone experienced a sudden change in market demand for eggs? Looking for advice on optimizing distribution routes. 🐔 #PoultryHelp #AgriAdvice",
    likes: 42,
    retweets: 8,
    replies: 25,
    time: "4h"
  },
  {
    id: 3,
    author: "Green Fields",
    username: "green_fields",
    avatar: "GF",
    content: "New supply chain system installed today! 📦 Operational efficiency is already up by 30%. Highly recommend this setup for anyone looking to optimize their resources.",
    image: "https://images.unsplash.com/photo-1563514223741-21b392796c99?auto=format&fit=crop&q=80&w=1000",
    likes: 89,
    retweets: 12,
    replies: 5,
    time: "6h",
    verified: true
  }
];

export interface Channel {
  id: number;
  name: string;
  slug: string;
  members: number;
  description: string;
  posts: number;
  online: number;
  icon: string;
  banner: string;
  rules?: string[];
  guidelines?: string;
  tags?: string[];
  isAdmin?: boolean;
}

export const channels: Channel[] = [
  {
    id: 1,
    name: "Poultry Pros",
    slug: "@poultry_pros",
    members: 12400,
    online: 450,
    description: "The definitive community for commercial and hobbyist poultry farmers.",
    posts: 342,
    icon: "🐔",
    banner: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1000",
    rules: ["Be respectful to others", "No spamming", "Keep discussions related to poultry"],
    guidelines: "Welcome to Poultry Pros! Share your tips, ask questions, and help others grow.",
    tags: ["Help", "Discussion", "Showcase", "Question"],
    isAdmin: true
  },
  {
    id: 2,
    name: "Crop Logistics",
    slug: "@croplogistics",
    members: 8900,
    online: 120,
    description: "Discussing modern supply chain management and agri-business innovations.",
    posts: 198,
    icon: "📦",
    banner: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000",
    rules: ["Accurate info preferred"],
    guidelines: "A hub for managers and professionals.",
    tags: ["Logistics", "Innovation"],
    isAdmin: false
  },
  {
    id: 3,
    name: "Livestock Trading",
    slug: "@livestocktrade",
    members: 21000,
    online: 890,
    description: "Cattle, goats, sheep — market and trade management community.",
    posts: 567,
    icon: "🐄",
    banner: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1000",
    rules: ["Ethical trading only", "No illegal trading"],
    guidelines: "Sharing expertise in market logistics.",
    tags: ["Market", "Trading"],
    isAdmin: false
  }
];

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  category: string;
  seller: {
    name: string;
    rating: number;
    avatar: string;
  };
  inStock: boolean;
  specifications: Record<string, string>;
  reviews_list?: {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export const marketListings: Product[] = [
  {
    id: 1,
    name: "Premium Organic Tomatoes",
    description: "Farm-fresh, vine-ripened organic tomatoes. Grown without synthetic pesticides or fertilizers.",
    price: 12.50,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1546470427-0d4db154ceb7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=1000"
    ],
    category: "Vegetables",
    seller: { name: "Green Fields", rating: 4.9, avatar: "GF" },
    inStock: true,
    specifications: { "Weight": "1kg", "Origin": "Accra", "Type": "Organic" },
    reviews_list: [
      { id: 1, user: "Kofi Mensah", avatar: "KM", rating: 5, comment: "The best tomatoes I've bought this year! So juicy and fresh.", date: "2 days ago" },
      { id: 2, user: "Ama Serwaa", avatar: "AS", rating: 4, comment: "Very good quality, though a bit expensive.", date: "1 week ago" }
    ]
  },
  {
    id: 2,
    name: "Fresh Farm Eggs (Crate)",
    description: "Grade A large brown eggs from free-range chickens. Delivered within 24 hours of laying.",
    price: 35.00,
    rating: 4.9,
    reviews: 230,
    image: "https://images.unsplash.com/photo-1582722134903-b129900379ca?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1582722134903-b129900379ca?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=1000"
    ],
    category: "Poultry",
    seller: { name: "Poultry Pro", rating: 4.7, avatar: "PP" },
    inStock: true,
    specifications: { "Quantity": "30 eggs", "Type": "Free-range" },
    reviews_list: [
      { id: 1, user: "Kwesi Appiah", avatar: "KA", rating: 5, comment: "Consistent quality every time I order.", date: "3 days ago" }
    ]
  },
  {
    id: 3,
    name: "White Maize (50kg Bag)",
    description: "High-quality white maize, dried and sorted. Perfect for milling or livestock feed.",
    price: 450.00,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80&w=1000",
    category: "Grains & Cereals",
    seller: { name: "Savanna Grains", rating: 4.5, avatar: "SG" },
    inStock: true,
    specifications: { "Weight": "50kg", "Variety": "White" },
    reviews_list: [
      { id: 1, user: "John Doe", avatar: "JD", rating: 4, comment: "Good quality grains, well-packaged.", date: "5 days ago" }
    ]
  },
  {
    id: 4,
    name: "Brahman Bull (Yearling)",
    description: "Healthy yearling Brahman bull, vaccinated and pedigree-verified. Excellent for breeding stock.",
    price: 8500.00,
    rating: 5.0,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1000",
    category: "Cattle",
    seller: { name: "Northern Ranches", rating: 4.8, avatar: "NR" },
    inStock: true,
    specifications: { "Age": "14 months", "Breed": "Brahman" },
    reviews_list: [
      { id: 1, user: "Ibrahim Musa", avatar: "IM", rating: 5, comment: "Top-tier livestock. The bull is in great health.", date: "2 weeks ago" }
    ]
  },
  {
    id: 5,
    name: "Organic Honey (500ml)",
    description: "Pure, unprocessed wildflower honey harvested from the Ashanti region forests.",
    price: 45.00,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1000",
    category: "Bee Products",
    seller: { name: "Forest Gold", rating: 4.9, avatar: "FG" },
    inStock: true,
    specifications: { "Volume": "500ml", "Type": "Wildflower" },
    reviews_list: [
      { id: 1, user: "Yaa Boateng", avatar: "YB", rating: 5, comment: "Tastes amazing! Genuine forest honey.", date: "1 month ago" }
    ]
  },
  {
    id: 6,
    name: "Fresh Tilapia (Per kg)",
    description: "Farm-raised tilapia from the Volta Lake. Cleaned and chilled for maximum freshness.",
    price: 28.00,
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1534123235303-ee2f27521313?auto=format&fit=crop&q=80&w=1000",
    category: "Fish & Seafood",
    seller: { name: "Volta Catch", rating: 4.6, avatar: "VC" },
    inStock: true,
    specifications: { "Source": "Volta Lake", "State": "Fresh" },
    reviews_list: [
      { id: 1, user: "Ekow Baidoo", avatar: "EB", rating: 4, comment: "Fresh and clean fish. Highly recommended.", date: "1 week ago" }
    ]
  }
];

export interface NewsComment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorBio?: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: NewsComment[];
  relatedArticles?: number[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "The Future of Smart Logistics in Sub-Saharan Africa",
    excerpt: "New tracking technologies are helping smallholder farmers reduce waste and increase efficiency during peak seasons.",
    content: `
      <p>As market patterns become increasingly unpredictable, farmers across Sub-Saharan Africa are turning to "Smart Logistics" – a suite of technologies that use real-time tracking, market data, and automated routing to deliver products exactly when they're needed.</p>
      
      <h3>The Logistics Challenge in Agriculture</h3>
      <p>Traditional logistics methods often lead to significant waste, with up to 40% of produce lost due to delays or poor routing. In regions where infrastructure is limited, this inefficiency can be catastrophic for smallholder farmers.</p>
      
      <p>Dr. Samuel Mensah, a leading expert at the University of Ghana, explains: "The challenge isn't just having produce; it's moving it. Most farmers suffer from delays which affect quality. Smart logistics removes the guesswork."</p>
      
      <blockquote>
        "The challenge isn't just having produce; it's moving it. Smart logistics removes the guesswork."
      </blockquote>

      <h3>Affordable Innovation</h3>
      <p>While high-tech logistics was once the domain of large commercial farms, new low-cost tracking tools developed by local startups are making these tools accessible to smallholders.</p>
      
      <p>Farmers receive real-time alerts when their products are in transit, allowing them to manage their sales remotely. Early trials in Kenya and Ethiopia have shown efficiency increases of up to 40% while reducing transport costs by half.</p>

      <h3>Looking Ahead</h3>
      <p>The main barrier to widespread adoption remains the initial setup cost and the need for technical literacy. However, government subsidies and cooperative-based sharing models are beginning to bridge this gap, promising a more resilient future for African agriculture.</p>
    `,
    author: "Elena Kwaku",
    authorRole: "Tech & Innovation Correspondent",
    authorBio: "Elena is a tech journalist with over 10 years of experience covering the intersection of technology and agriculture in Africa. She previously worked for the BBC World Service.",
    date: "March 18, 2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1563514223741-21b392796c99?auto=format&fit=crop&q=80&w=1000",
    readTime: "8 min read",
    tags: ["Logistics", "Agri-Tech", "Efficiency", "Africa"],
    likes: 245,
    comments: [
      { id: 1, user: "Kofi Annan", avatar: "KA", content: "This is exactly what we need in the Northern Region. Transport management is our biggest hurdle.", date: "2h ago", likes: 12 },
      { id: 2, user: "Mary Smith", avatar: "MS", content: "Are these tools available for export to neighboring countries?", date: "5h ago", likes: 4 }
    ],
    relatedArticles: [2, 3]
  },
  {
    id: 2,
    title: "Global Commodity Prices: What to Expect in Q2",
    excerpt: "Analysis of grain and livestock market trends as international trade routes stabilize.",
    content: `
      <p>The global agricultural market is showing signs of stabilization after a volatile first quarter. Analysts are closely watching grain and livestock prices as supply chains recover from recent disruptions.</p>
      
      <h3>Grain Market Resilience</h3>
      <p>Maize and wheat prices have dipped slightly as harvest forecasts in the Southern Hemisphere exceed expectations. However, logistics costs remain elevated, which may keep retail prices high in importing nations.</p>
      
      <h3>Livestock Demand</h3>
      <p>Demand for high-quality protein continues to grow in emerging markets. Beef prices are expected to remain firm, while poultry production is seeing a surge in efficiency due to new biosecurity measures.</p>
    `,
    author: "David Mensah",
    authorRole: "Senior Economic Analyst",
    authorBio: "David has over 20 years of experience in agricultural economics and market analysis. He is a regular contributor to major financial news outlets.",
    date: "March 17, 2026",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000",
    readTime: "12 min read",
    tags: ["Markets", "Economy", "Grain", "Livestock"],
    likes: 189,
    comments: [
      { id: 1, user: "Kwame Nkrumah", avatar: "KN", content: "Excellent analysis. The stabilization of trade routes is key for our export strategy.", date: "1d ago", likes: 25 }
    ],
    relatedArticles: [1, 3]
  },
  {
    id: 3,
    title: "Agri-Business: Beyond Production",
    excerpt: "Why top farmers are moving toward supply chain optimization and logistics as their primary metrics.",
    content: `
      <p>Production was just the beginning. The new frontier of sustainable agriculture is "Supply Chain Optimization" – a holistic approach that focuses on reducing waste and improving market access.</p>
    `,
    author: "Sarah Boateng",
    authorRole: "Sustainability Specialist",
    authorBio: "Sarah is a passionate advocate for efficient agriculture. She leads several research projects focused on logistics in tropical farming.",
    date: "March 16, 2026",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    readTime: "10 min read",
    tags: ["Logistics", "Market Access", "Efficiency"],
    likes: 312,
    comments: [
      { id: 1, user: "Ama Serwaa", avatar: "AS", content: "Optimized logistics have transformed my farm's profitability.", date: "2d ago", likes: 45 }
    ],
    relatedArticles: [1, 2]
  }
];

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  completed?: boolean;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorRole: string;
  description: string;
  longDescription: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  students: number;
  image: string;
  modules: CourseModule[];
  learningObjectives: string[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Sustainable Agri-Business",
    instructor: "Dr. Sarah Boateng",
    instructorRole: "Business Specialist, Agri-Tech Research Institute",
    description: "Learn the fundamentals of market access, logistics, and supply chain management.",
    longDescription: "This comprehensive course covers everything from basic logistics to advanced supply chain management. You will learn how to optimize your farm's output, manage distribution routes, and build strong market connections for long-term profitability.",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.9,
    students: 1250,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1000",
    learningObjectives: [
      "Understand the agri-business landscape",
      "Develop a distribution strategy",
      "Manage logistics for farm output",
      "Build market connections"
    ],
    modules: [
      { id: 1, title: "Module 1: Foundations of Agri-Business", duration: "45m", videoUrl: "https://example.com/video1", description: "An overview of market dynamics and agricultural business models." },
      { id: 2, title: "Module 2: Supply Chain Management", duration: "1h 15m", videoUrl: "https://example.com/video2", description: "How produce moves from farm to table and the role of efficient logistics." },
      { id: 3, title: "Module 3: Distribution Strategies", duration: "55m", videoUrl: "https://example.com/video3", description: "Practical guide to various market entry and distribution methods." },
      { id: 4, title: "Module 4: Scaling Your Agri-Business", duration: "1h 30m", videoUrl: "https://example.com/video4", description: "How to grow your operations while maintaining efficiency." }
    ]
  },
  {
    id: 2,
    title: "Advanced Farm Logistics & Management",
    instructor: "Mark Johnson",
    instructorRole: "Logistics Specialist",
    description: "Deep dive into supply chain optimization, inventory control, and distribution protocols for commercial farms.",
    longDescription: "Managing a large-scale agricultural operation requires rigorous attention to logistics. This course provides professional-grade training on optimizing distribution routes, implementing effective inventory control, and designing systems that minimize operational waste.",
    duration: "4 weeks",
    level: "Advanced",
    rating: 4.8,
    students: 850,
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1000",
    learningObjectives: [
      "Develop a comprehensive logistics plan",
      "Implement inventory control systems",
      "Manage distribution routes",
      "Optimize operational efficiency"
    ],
    modules: [
      { id: 1, title: "Module 1: Agri-Logistics Fundamentals", duration: "1h", videoUrl: "https://example.com/video1", description: "Understanding the movement of agricultural goods." },
      { id: 2, title: "Module 2: Inventory System Design", duration: "1h 20m", videoUrl: "https://example.com/video2", description: "Creating efficient systems for tracking farm inputs and outputs." },
      { id: 3, title: "Module 3: Market Access Management", duration: "50m", videoUrl: "https://example.com/video3", description: "Strategies for reaching high-value markets effectively." }
    ]
  }
];

export const dashboardInsights = [
  "Inventory turnover increased by 12% this week",
  "Tomato prices rising in Accra region (+8%)",
  "Maize Plot A harvest schedule optimized",
  "Consider increasing logistical support for Plot B",
];

export const crops = [
  { id: 1, name: "Maize", farm: "Plot A", planted: "2026-01-15", harvest: "2026-04-15", status: "growing" as const, expenses: 2400, yield: 0 },
  { id: 2, name: "Tomatoes", farm: "Greenhouse 1", planted: "2025-12-01", harvest: "2026-03-01", status: "harvested" as const, expenses: 3200, yield: 4280 },
];

export const livestock = [
  { id: 1, type: "Poultry (Layers)", count: 500, age: "8 months", production: "420 units/day", feeding: "3x daily", mortality: 2 },
];

export const kiwiMessages = [
  {
    role: "assistant" as const,
    content: "Hello! I'm **Kiwi**, your AI agriculture assistant. I'm here to help you optimize your farm's performance. How can I assist you today?"
  },
  {
    role: "user" as const,
    content: "What's the status of my tomato harvest?"
  },
  {
    role: "assistant" as const,
    content: "Your tomato harvest in Greenhouse 1 was successful! You achieved a yield of **4,280 kg**, which is 15% above the regional average. Your current stock is being processed for the marketplace."
  }
];

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "order" | "system" | "social" | "market";
  read: boolean;
}

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "New Order Received",
    message: "You have a new order for 5 crates of Premium Organic Tomatoes from Kofi Mensah.",
    time: "5m ago",
    type: "order",
    read: false,
  },
  {
    id: "n2",
    title: "Market Price Alert",
    message: "Maize prices in Accra have increased by 8% today. Check the marketplace for updates.",
    time: "2h ago",
    type: "market",
    read: false,
  },
  {
    id: "n3",
    title: "New Follower",
    message: "Amma Serwaa started following your farm updates.",
    time: "5h ago",
    type: "social",
    read: true,
  },
  {
    id: "n4",
    title: "System Update",
    message: "The new Agnos v2.4 logistics module is now live. Check out the new features!",
    time: "1d ago",
    type: "system",
    read: true,
  },
  {
    id: "n5",
    title: "Payment Confirmed",
    message: "Payment for Order #7284 has been successfully processed and added to your wallet.",
    time: "2d ago",
    type: "order",
    read: true,
  },
];

export interface MarketPair {
  id: string;
  pair: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: string;
  chartData: number[];
}

export const marketPairs: MarketPair[] = [
  { id: "p1", pair: "MAIZE/TOMATO", price: 35.8, change: 4.2, high: 36.5, low: 34.2, volume: "1.2M", chartData: [32, 33, 35, 34, 36, 35, 35.8] },
  { id: "p2", pair: "COCOA/COFFEE", price: 154.2, change: -1.5, high: 158.0, low: 153.2, volume: "450K", chartData: [156, 157, 155, 158, 156, 154, 154.2] },
  { id: "p3", pair: "WHEAT/RICE", price: 12.4, change: 0.8, high: 12.6, low: 12.1, volume: "890K", chartData: [12.1, 12.2, 12.3, 12.5, 12.4, 12.3, 12.4] },
  { id: "p4", pair: "SOY/MAIZE", price: 85.5, change: 12.5, high: 86.0, low: 75.0, volume: "2.1M", chartData: [75, 78, 80, 82, 83, 84, 85.5] },
];

export interface RegionalPrice {
  id: string;
  region: string;
  country: string;
  commodity: string;
  avgPrice: number;
  trend: "up" | "down" | "stable";
  demand: "high" | "medium" | "low";
}

export const regionalPrices: RegionalPrice[] = [
  { id: "r1", region: "Ashanti", country: "Ghana", commodity: "Maize", avgPrice: 450, trend: "up", demand: "high" },
  { id: "r2", region: "Greater Accra", country: "Ghana", commodity: "Maize", avgPrice: 480, trend: "up", demand: "high" },
  { id: "r3", region: "Lagos", country: "Nigeria", commodity: "Rice", avgPrice: 1200, trend: "down", demand: "medium" },
  { id: "r4", region: "Rift Valley", country: "Kenya", commodity: "Wheat", avgPrice: 850, trend: "stable", demand: "medium" },
  { id: "r5", region: "Northern", country: "Ghana", commodity: "Maize", avgPrice: 410, trend: "up", demand: "medium" },
];
