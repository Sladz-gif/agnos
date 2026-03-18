export const feedPosts = [
  { id: 1, author: "agri_maven", avatar: "AM", content: "Just harvested our first batch of organic tomatoes. Yield was 15% higher than expected!", likes: 24, comments: 8, time: "2h ago", type: "text" as const },
  { id: 2, author: "poultry_pro", avatar: "PP", content: "Has anyone experienced a sudden drop in egg production during seasonal changes? Looking for advice.", likes: 12, comments: 15, time: "4h ago", type: "question" as const },
  { id: 3, author: "green_fields", avatar: "GF", content: "New drip irrigation system installed. Water usage reduced by 30% across all plots.", likes: 45, comments: 6, time: "6h ago", type: "text" as const },
  { id: 4, author: "cattle_king", avatar: "CK", content: "Milk production per cow increased after switching to the new feeding schedule Kiwi recommended.", likes: 31, comments: 11, time: "8h ago", type: "text" as const },
];

export const channels = [
  { id: 1, name: "Poultry Pros", members: 1240, description: "All things poultry — from broilers to layers.", posts: 342, active: true },
  { id: 2, name: "Crop Science", members: 890, description: "Modern crop management, soil health, and agri-tech.", posts: 198, active: true },
  { id: 3, name: "Livestock Hub", members: 2100, description: "Cattle, goats, sheep — breeding and health management.", posts: 567, active: false },
  { id: 4, name: "Market Watch", members: 3400, description: "Price trends, trade tips, and market analysis.", posts: 890, active: true },
  { id: 5, name: "Organic Farming", members: 760, description: "Sustainable and organic farming practices.", posts: 145, active: true },
];

export const marketListings = [
  { id: 1, name: "Organic Tomatoes", quantity: "500 kg", price: "₵12/kg", location: "Kumasi", seller: "green_fields", category: "Crops" },
  { id: 2, name: "Fresh Eggs (Crate)", quantity: "200 crates", price: "₵35/crate", location: "Accra", seller: "poultry_pro", category: "Poultry" },
  { id: 3, name: "Raw Cow Milk", quantity: "100 L", price: "₵8/L", location: "Tamale", seller: "cattle_king", category: "Dairy" },
  { id: 4, name: "Maize (Dried)", quantity: "2 tons", price: "₵2,800/ton", location: "Techiman", seller: "agri_maven", category: "Crops" },
  { id: 5, name: "Goat (Live)", quantity: "15 heads", price: "₵450/head", location: "Bolgatanga", seller: "livestock_hub", category: "Livestock" },
  { id: 6, name: "Cassava", quantity: "3 tons", price: "₵900/ton", location: "Cape Coast", seller: "root_farmer", category: "Crops" },
];

export const crops = [
  { id: 1, name: "Maize", farm: "Plot A", planted: "2026-01-15", harvest: "2026-04-15", status: "growing" as const, expenses: 2400, yield: 0 },
  { id: 2, name: "Tomatoes", farm: "Greenhouse 1", planted: "2025-12-01", harvest: "2026-03-01", status: "harvested" as const, expenses: 3200, yield: 4280 },
  { id: 3, name: "Rice", farm: "Paddy Field", planted: "2026-02-01", harvest: "2026-06-01", status: "growing" as const, expenses: 5600, yield: 0 },
  { id: 4, name: "Cassava", farm: "Plot C", planted: "2025-09-01", harvest: "2026-09-01", status: "growing" as const, expenses: 1800, yield: 0 },
];

export const livestock = [
  { id: 1, type: "Poultry (Layers)", count: 500, age: "8 months", health: "good" as const, production: "420 eggs/day", feeding: "3x daily", mortality: 2 },
  { id: 2, type: "Cattle (Dairy)", count: 25, age: "2-4 years", health: "good" as const, production: "180 L/day", feeding: "2x daily", mortality: 0 },
  { id: 3, type: "Goats", count: 40, age: "6-18 months", health: "fair" as const, production: "N/A", feeding: "2x daily", mortality: 1 },
  { id: 4, type: "Poultry (Broilers)", count: 300, age: "6 weeks", health: "good" as const, production: "N/A", feeding: "4x daily", mortality: 5 },
];

export const kiwiMessages = [
  { role: "assistant" as const, content: "Good morning! Here's your daily pulse:\n\n📈 **Egg production** is up **12%** this week — your layers are performing well.\n\n🌽 **Maize in Plot A** is on track for an April harvest. Soil moisture is at 42.8%.\n\n💰 **Tomato prices** in Kumasi rose 8% — consider listing your surplus.\n\nWould you like me to analyze anything specific?" },
];

export const dashboardInsights = [
  "Egg production increased by 12% this week",
  "Tomato prices rising in Kumasi region (+8%)",
  "Maize Plot A soil moisture optimal at 42.8%",
  "Consider increasing nitrogen input for Maize Plot B",
];
