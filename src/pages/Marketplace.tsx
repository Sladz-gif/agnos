import { marketListings } from "@/lib/mockData";
import { ShoppingCart, Star, Search, Filter, ArrowRight, ShieldCheck, Truck, ChevronDown, ChevronRight, Leaf, Dog, Package, PenLine, Clock, Sparkles, Zap, Factory, Wheat, Plus, LayoutGrid, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/lib/userData";
import { LineChart, BarChart3, TrendingUp, Globe, Activity } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const categories = [
  {
    name: "Food & Produce",
    icon: Wheat,
    subcategories: [
      { name: "Vegetables", items: ["Leafy Greens", "Root Veggies", "Tubers", "Pods", "Bulbs"] },
      { name: "Fruits", items: ["Tropical", "Citrus", "Berries", "Melons", "Stone Fruits"] },
      { name: "Grains & Cereals", items: ["Maize", "Rice", "Wheat", "Barley", "Millet"] },
      { name: "Legumes", items: ["Beans", "Peas", "Lentils", "Soybeans"] },
      { name: "Honey & Bee Products", items: ["Wildflower Honey", "Manuka Honey", "Beeswax", "Propolis"] },
      { name: "Fish & Seafood", items: ["Tilapia", "Catfish", "Shrimp", "Oysters"] },
      { name: "Meat & Poultry", items: ["Beef", "Chicken", "Goat", "Pork", "Eggs"] }
    ]
  },
  {
    name: "Agri-Cosmetics",
    icon: Sparkles,
    subcategories: [
      { name: "Essential Oils", items: ["Lavender", "Eucalyptus", "Peppermint", "Tea Tree"] },
      { name: "Skincare", items: ["Shea Butter", "Cocoa Butter", "Aloe Vera", "Coconut Oil"] },
      { name: "Natural Dyes", items: ["Indigo", "Henna", "Turmeric Dye"] },
      { name: "Soaps", items: ["Handmade Herbal", "Black Soap", "Honey Soap"] }
    ]
  },
  {
    name: "Bio-Energy",
    icon: Zap,
    subcategories: [
      { name: "Bio-Fuels", items: ["Biodiesel", "Ethanol", "Biogas"] },
      { name: "Solid Biomass", items: ["Wood Pellets", "Charcoal", "Agricultural Residue"] },
      { name: "Bio-Fertilizers", items: ["Liquid Bio-Fertilizer", "Compost Tea"] }
    ]
  },
  {
    name: "Industrial Fiber",
    icon: Factory,
    subcategories: [
      { name: "Textiles", items: ["Cotton", "Hemp", "Silk", "Wool", "Flax"] },
      { name: "Construction", items: ["Bamboo", "Thatch", "Straw Bales"] },
      { name: "Paper & Pulp", items: ["Sugar Cane Bagasse", "Rice Straw Paper"] }
    ]
  },
  {
    name: "Livestock & Breeding",
    icon: Dog,
    subcategories: [
      { name: "Cattle", items: ["Brahman", "Holstein", "Angus"] },
      { name: "Poultry", items: ["Day-old Chicks", "Broilers", "Layers"] },
      { name: "Small Ruminants", items: ["Boer Goats", "Sahelian Sheep"] }
    ]
  },
  {
    name: "Input & Supplies",
    icon: Package,
    subcategories: [
      { name: "Seeds & Seedlings", items: ["Hybrid", "Organic", "GMO"] },
      { name: "Fertilizers", items: ["Organic", "Chemical", "Liquid"] },
      { name: "Agro-Chemicals", items: ["Pesticides", "Herbicides", "Fungicides"] },
      { name: "Animal Feed", items: ["Poultry Mash", "Cattle Pellets", "Fish Feed"] }
    ]
  }
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("Food & Produce");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [cartCount, setCartCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleApplyFilter = () => {
    setActiveCategory(tempCategory);
    // You might want to filter products based on selectedSubcategories here as well
    setIsFilterOpen(false);
  };

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const handleBuyNow = (product: any) => {
    navigate("/checkout", { state: { product } });
  };

  const filteredProducts = useMemo(() => {
    return marketListings.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !activeCategory || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
    toast.success(`${product.name} added to cart`, {
      description: "You can view your items in the checkout page.",
      action: {
        label: "Checkout",
        onClick: () => navigate("/checkout", { state: { product } })
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 md:px-6">
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Agnos Marketplace</h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] mt-1">Trade farm produce, inputs and bio-energy</p>
          </div>
          <Button 
            variant="outline" 
            className="h-10 border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-all font-black uppercase tracking-widest text-[10px] flex gap-2 w-fit"
            onClick={() => navigate("/market-analysis")}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Market Analysis
          </Button>
        </div>

        <div className="flex items-center gap-3 w-full">
          <div className="flex flex-1 items-center gap-0 min-w-0">
            <div className="relative group flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search products..." 
                className="w-full bg-surface border-2 border-foreground border-r-0 rounded-none pl-10 h-10 font-bold italic focus-visible:ring-0 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-10 border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-primary transition-all font-black uppercase tracking-widest text-[10px] flex gap-2 z-10 whitespace-nowrap px-4"
                  onClick={() => setTempCategory(activeCategory)}
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter {activeCategory && <Badge className="ml-1 bg-foreground text-background rounded-none h-3 px-1 text-[7px]">{activeCategory}</Badge>}
                </Button>
              </DialogTrigger>
              {/* ... DialogContent content remains the same ... */}
              <DialogContent className="sm:max-w-none w-screen h-screen m-0 rounded-none border-none p-0 bg-background/95 backdrop-blur-xl flex flex-col">
                <div className="p-4 md:p-8 lg:p-12 flex-1 overflow-y-auto">
                  <div className="max-w-5xl mx-auto space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Filter Categories</h2>
                      <p className="text-muted-foreground font-bold uppercase tracking-widest text-[9px]">Select subcategories for detailed results</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            setTempCategory(null);
                            setExpandedCategory(null);
                            setSelectedSubcategories([]);
                          }}
                          className={`w-full group relative p-4 border-2 transition-all text-left flex items-center gap-4 ${
                            tempCategory === null 
                              ? 'border-primary bg-primary/10 shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]' 
                              : 'border-foreground hover:border-primary bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]'
                          }`}
                        >
                          <LayoutGrid className={`h-6 w-6 ${tempCategory === null ? 'text-primary' : 'text-foreground'}`} />
                          <div>
                            <span className="text-lg font-black uppercase italic tracking-tighter block leading-none">All Products</span>
                            <span className="text-[7px] font-bold uppercase tracking-[0.2em] opacity-50">Reset all filters</span>
                          </div>
                        </button>
                      </div>

                      {categories.map(cat => (
                        <div key={cat.name} className="space-y-2">
                          <button 
                            onClick={() => {
                              setTempCategory(cat.name);
                              setExpandedCategory(expandedCategory === cat.name ? null : cat.name);
                            }}
                            className={`w-full group relative p-4 border-2 transition-all text-left flex items-center justify-between ${
                              tempCategory === cat.name 
                                ? 'border-primary bg-primary/10 shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]' 
                                : 'border-foreground hover:border-primary bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <cat.icon className={`h-6 w-6 ${tempCategory === cat.name ? 'text-primary' : 'text-foreground'}`} />
                              <div>
                                <span className="text-lg font-black uppercase italic tracking-tighter block leading-none">{cat.name}</span>
                                <span className="text-[7px] font-bold uppercase tracking-[0.2em] opacity-50">{cat.subcategories.length} Sub-sectors</span>
                              </div>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expandedCategory === cat.name ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {expandedCategory === cat.name && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-surface/50 border-x-2 border-b-2 border-foreground/20 p-3 grid grid-cols-2 gap-2"
                              >
                                {cat.subcategories.map(sub => (
                                  <button
                                    key={sub.name}
                                    onClick={() => toggleSubcategory(sub.name)}
                                    className={`flex items-center gap-2 p-2 text-[9px] font-black uppercase tracking-widest transition-all border ${
                                      selectedSubcategories.includes(sub.name)
                                        ? 'bg-primary border-foreground text-primary-foreground'
                                        : 'bg-background/50 border-transparent hover:border-foreground/30'
                                    }`}
                                  >
                                    <div className={`h-3 w-3 border flex items-center justify-center ${selectedSubcategories.includes(sub.name) ? 'bg-foreground border-foreground' : 'border-foreground/30'}`}>
                                      {selectedSubcategories.includes(sub.name) && <Check className="h-2 w-2 text-background" />}
                                    </div>
                                    {sub.name}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t-2 border-foreground bg-surface flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    className="h-10 px-6 border-2 border-foreground rounded-none font-black uppercase tracking-widest text-[10px] hover:bg-destructive hover:text-destructive-foreground transition-all"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="h-10 px-10 border-2 border-foreground rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[10px]"
                    onClick={handleApplyFilter}
                  >
                    Apply Results ({selectedSubcategories.length || 'All'})
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Button variant="outline" className="h-10 w-10 rounded-none border-2 border-foreground relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0" onClick={() => cartCount > 0 && navigate("/checkout")}>
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-black border border-foreground">{cartCount}</span>}
          </Button>
        </div>
      </div>

      <div className="w-full">
        {/* Product Grid */}
        <div className="w-full">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id} 
                variants={item}
                className="group bg-card border-2 border-foreground hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-square relative overflow-hidden border-b-2 border-foreground">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge className="bg-foreground text-background border-none rounded-none font-black uppercase tracking-widest text-[8px] h-6">
                      {product.category}
                    </Badge>
                    {!product.inStock && <Badge variant="destructive" className="rounded-none font-black uppercase tracking-widest text-[8px] h-6">Out of Stock</Badge>}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-lg font-black uppercase italic leading-tight group-hover:text-primary transition-colors min-w-0 break-words">{product.name}</h4>
                    <p className="text-xl font-black italic tracking-tighter text-primary">₵{product.price.toLocaleString()}</p>
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground line-clamp-2 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-[10px] font-black">{product.rating}</span>
                      <span className="text-[8px] font-bold opacity-40 uppercase">({product.reviews})</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="rounded-none h-10 w-10 border-2 border-foreground p-0 bg-surface hover:bg-primary transition-colors"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <Plus className="h-4 w-4 text-foreground group-hover:text-primary-foreground" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-4xl rounded-none border-4 border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden">
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:h-full overflow-hidden border-r-2 border-foreground">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-10 space-y-8 flex flex-col">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary border-2 border-foreground rounded-none font-black uppercase tracking-widest text-[9px] text-primary-foreground">{selectedProduct.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-black">{selectedProduct.rating}</span>
                    </div>
                  </div>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{selectedProduct.name}</h2>
                  <p className="text-2xl font-black italic tracking-tighter text-primary">₵{selectedProduct.price.toLocaleString()}</p>
                </div>

                <p className="text-sm font-medium text-muted-foreground leading-relaxed">{selectedProduct.description}</p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t-2 border-foreground/5">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-success" /> Seller</p>
                    <p className="text-xs font-black italic">{selectedProduct.seller.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase opacity-40 tracking-widest flex items-center gap-2"><Truck className="h-3 w-3 text-primary" /> Delivery</p>
                    <p className="text-xs font-black italic">2-3 Business Days</p>
                  </div>
                </div>

                <div className="mt-auto pt-10 flex gap-4">
                  <Button className="flex-1 h-14 rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-xs" onClick={() => handleBuyNow(selectedProduct)}>
                    Buy Now
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all p-0" onClick={(e) => handleAddToCart(e, selectedProduct)}>
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductDetail({ product, onAddToCart, onBuyNow }: { product: any, onAddToCart: () => void, onBuyNow: () => void }) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [allReviews, setAllReviews] = useState(product.reviews_list || []);
  const [activeImage, setActiveImage] = useState(product.image);

  if (!product) return null;

  const similarProducts = marketListings
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  const handleSubmitReview = () => {
    if (!newReview.trim()) return;
    const review = {
      id: Date.now(),
      user: currentUser.author,
      avatar: currentUser.avatar,
      rating: newRating,
      comment: newReview,
      date: "Just now"
    };
    setAllReviews([review, ...allReviews]);
    setNewReview("");
    toast.success("Review submitted!");
  };
  
  return (
    <DialogContent className="w-[95vw] max-w-5xl p-0 bg-card border-border/50 max-h-[95vh] overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-hide overflow-x-hidden">
        <div className="flex flex-col md:flex-row w-full min-h-full">
          {/* Left Column: Images */}
          <div className="w-full md:w-1/2 shrink-0 bg-surface/50 border-r border-border/30">
            <div className="aspect-square md:aspect-auto md:h-[500px] overflow-hidden">
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            {/* Image Gallery Grid */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-background/30 backdrop-blur-sm">
              {[product.image, ...(product.images || [])].filter((img, i, self) => self.indexOf(img) === i).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column: Info & Details */}
          <div className="flex-1 min-w-0 p-6 md:p-10 space-y-10">
            <section className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 uppercase font-black text-[10px] tracking-widest">{product.category}</Badge>
                <h2 className="text-3xl md:text-4xl font-black leading-tight italic uppercase tracking-tighter mb-2">{product.name}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`h-4 w-4 ${i <= Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                    <span className="text-sm font-bold ml-2 text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground underline cursor-pointer">{product.reviews} verified reviews</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black">₵{product.price.toLocaleString()}</span>
                <span className="text-muted-foreground font-medium text-xs uppercase tracking-widest font-black">Free Global Shipping</span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 h-16 text-lg font-black uppercase italic tracking-tight rounded-2xl" onClick={onAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="secondary" className="flex-1 h-16 text-lg font-black uppercase italic tracking-tight rounded-2xl bg-gradient-primary text-primary-foreground border-none" onClick={onBuyNow}>
                  Buy Now
                </Button>
              </div>
            </section>

            <Separator className="bg-border/30" />

            {/* Specifications */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                  <div key={key} className="p-3 rounded-xl bg-surface/50 border border-border/30">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">{key}</p>
                    <p className="text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="bg-border/30" />

            {/* Similar Products Grid */}
            {similarProducts.length > 0 && (
              <section className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Similar Produces</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {similarProducts.map((p) => (
                    <div 
                      key={p.id} 
                      className="group cursor-pointer bg-surface/30 rounded-2xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all"
                    >
                      <div className="aspect-square">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] font-bold line-clamp-1">{p.name}</p>
                        <p className="text-xs font-black text-primary mt-1">₵{p.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <Separator className="bg-border/30" />

            {/* Reviews Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer Reviews</h4>
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {product.rating} / 5.0
                </div>
              </div>

              {/* Write a Review */}
              <div className="p-6 rounded-2xl bg-surface/50 border border-border/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest">Rate this product</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <button key={i} onClick={() => setNewRating(i)} className="focus:outline-none">
                        <Star className={`h-5 w-5 transition-colors ${i <= newRating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea 
                  placeholder="Share your experience..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="bg-background/50 border-border/30 rounded-xl min-h-[80px]"
                />
                <Button 
                  disabled={!newReview.trim()} 
                  onClick={handleSubmitReview}
                  className="w-full rounded-xl font-bold h-11"
                >
                  <PenLine className="mr-2 h-4 w-4" /> Submit Review
                </Button>
              </div>

              {/* Review List */}
              <div className="space-y-6 pb-10">
                {allReviews.map((review: any) => (
                  <div key={review.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-primary/20">
                          <AvatarFallback className="text-[10px] font-black bg-primary/10 text-primary">{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-bold">@{review.user.toLowerCase().replace(' ', '_')}</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                              <Star key={i} className={`h-2.5 w-2.5 ${i <= review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {review.date}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
