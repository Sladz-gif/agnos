import { useState, useMemo, useEffect } from "react";
import { marketPairs, regionalPrices } from "@/lib/mockData";
import { 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Globe, Activity, BarChart3, PieChart, Info, 
  Search, Filter, ChevronRight, LayoutGrid, List,
  History, Wallet, Star, ArrowUp, ArrowDown, ShoppingCart, 
  CandlestickChart, Scale, Zap, Globe2, MoreHorizontal,
  Flame, Radio, Target, AlertCircle, Newspaper, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

interface LiveTrade {
  id: string;
  pair: string;
  price: number;
  amount: string;
  time: string;
  type: "buy" | "sell";
}

const INITIAL_TRADES: LiveTrade[] = [
  { id: "t1", pair: "MAIZE/TOMATO", price: 35.8, amount: "1.2K", time: "14:20:05", type: "buy" },
  { id: "t2", pair: "COCOA/COFFEE", price: 154.2, amount: "0.5K", time: "14:19:58", type: "sell" },
  { id: "t3", pair: "WHEAT/RICE", price: 12.4, amount: "2.8K", time: "14:19:42", type: "buy" },
];

export default function MarketAnalysis() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pairs");
  const [selectedPair, setSelectedPair] = useState(marketPairs[0]);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [liveTrades, setLiveTrades] = useState<LiveTrade[]>(INITIAL_TRADES);
  const [sentiment, setSentiment] = useState(68); // 68% Bullish

  // Simulate real-time trade activity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPair = marketPairs[Math.floor(Math.random() * marketPairs.length)];
      const type = Math.random() > 0.5 ? "buy" : "sell";
      const newTrade: LiveTrade = {
        id: Math.random().toString(36).substr(2, 9),
        pair: randomPair.pair,
        price: randomPair.price + (Math.random() - 0.5) * 2,
        amount: (Math.random() * 5).toFixed(1) + "K",
        time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
        type
      };
      setLiveTrades(prev => [newTrade, ...prev].slice(0, 10));
      setSentiment(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 5)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTrade = () => {
    if (!amount) return toast.error("Please enter an amount");
    toast.success(`${tradeType === 'buy' ? 'Buy' : 'Sell'} order placed for ${amount} units of ${selectedPair.pair.split('/')[0]}`);
    setAmount("");
  };

  const filteredPairs = useMemo(() => {
    return marketPairs.filter(p => p.pair.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredRegions = useMemo(() => {
    return regionalPrices.filter(r => 
      r.region.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.commodity.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 md:px-6">
      {/* Header / Ticker */}
      <div className="bg-foreground text-background -mx-4 md:-mx-6 mb-8 px-4 py-2 overflow-hidden whitespace-nowrap border-b-4 border-primary relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-foreground to-transparent z-10 flex items-center px-4">
          <Radio className="h-4 w-4 text-primary animate-pulse mr-2" />
          <span className="text-[10px] font-black uppercase tracking-tighter">LIVE</span>
        </div>
        <div className="flex items-center gap-12 animate-marquee inline-block pl-24">
          {marketPairs.map(p => (
            <div key={p.id} className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest">{p.pair}</span>
              <span className={`text-[10px] font-black ${p.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                ₵{p.price} ({p.change >= 0 ? '+' : ''}{p.change}%)
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {marketPairs.map(p => (
            <div key={`${p.id}-dup`} className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest">{p.pair}</span>
              <span className={`text-[10px] font-black ${p.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                ₵{p.price} ({p.change >= 0 ? '+' : ''}{p.change}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary flex items-center justify-center border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Activity className="h-5 w-5" />
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Commodity Exchange</h1>
          </div>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] pl-14 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping" />
            Global agricultural market intelligence & analysis
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search pairs or regions..." 
              className="w-full lg:w-[300px] bg-surface border-2 border-foreground rounded-none pl-12 h-12 font-bold italic"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            className="h-12 border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-xs"
            onClick={() => toast.success("Market data refreshed!")}
          >
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Market Stats Bar */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-card border-2 border-foreground p-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Trading Pair</span>
            <span className="text-sm font-black italic">{selectedPair.pair}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Price</span>
            <motion.span 
              key={selectedPair.price}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-black italic ${selectedPair.change >= 0 ? 'text-success' : 'text-destructive'}`}
            >
              ₵{selectedPair.price}
            </motion.span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">24h Change</span>
            <span className={`text-sm font-black italic ${selectedPair.change >= 0 ? 'text-success' : 'text-destructive'}`}>{selectedPair.change >= 0 ? '+' : ''}{selectedPair.change}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">24h High</span>
            <span className="text-sm font-black italic">₵{selectedPair.high}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">24h Low</span>
            <span className="text-sm font-black italic">₵{selectedPair.low}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">24h Volume</span>
            <span className="text-sm font-black italic">{selectedPair.volume}</span>
          </div>
        </div>

        {/* Main Trading Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Chart Card */}
          <div className="bg-card border-2 border-foreground p-6 h-[400px] flex flex-col relative group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CandlestickChart className="h-5 w-5 text-primary" />
                  <span className="text-sm font-black uppercase italic tracking-tighter">Live Exchange Chart</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-surface border border-foreground/10">
                  {['1H', '4H', '1D', '1W'].map(tf => (
                    <button key={tf} className="text-[9px] font-black px-2 py-0.5 hover:bg-primary transition-colors">
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-success text-success text-[8px] font-black uppercase rounded-none animate-pulse">Live Feed</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1 flex items-end gap-2 px-4 pb-4 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {selectedPair.chartData.concat(selectedPair.chartData).map((val, i) => (
                  <motion.div 
                    key={`${selectedPair.id}-${i}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    className="flex-1 flex flex-col gap-1 justify-end group/bar origin-bottom"
                  >
                    <div 
                      className={`w-full transition-all duration-500 ${selectedPair.change >= 0 ? 'bg-success/20 group-hover/bar:bg-success/40' : 'bg-destructive/20 group-hover/bar:bg-destructive/40'}`} 
                      style={{ height: `${(val / Math.max(...selectedPair.chartData)) * 80}%` }}
                    />
                    <div className={`h-1 w-full ${selectedPair.change >= 0 ? 'bg-success/60' : 'bg-destructive/60'}`} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Grid Overlay */}
            <div className="absolute inset-0 p-6 pointer-events-none border-t border-foreground/5 opacity-50 flex flex-col justify-between">
              {[1, 2, 3, 4].map(i => <div key={i} className="border-b border-dashed border-foreground/10 w-full" />)}
            </div>
          </div>

          <Tabs defaultValue="pairs" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-b-2 border-foreground w-full justify-start rounded-none h-14 p-0 gap-8">
              <TabsTrigger value="pairs" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground h-full font-black uppercase italic tracking-tighter text-sm">Market Pairs</TabsTrigger>
              <TabsTrigger value="regional" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground h-full font-black uppercase italic tracking-tighter text-sm">Regional Prices</TabsTrigger>
              <TabsTrigger value="signals" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground h-full font-black uppercase italic tracking-tighter text-sm flex gap-2">
                <Radio className="h-4 w-4 text-primary animate-pulse" /> Live Signals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pairs" className="mt-8">
              <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-4">
                {filteredPairs.map(pair => (
                  <motion.div 
                    key={pair.id} 
                    variants={item}
                    className={`group border-2 p-6 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                      selectedPair.id === pair.id 
                        ? 'bg-primary/10 border-primary shadow-[8px_8px_0px_0px_rgba(var(--primary),1)]' 
                        : 'bg-card border-foreground hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                    onClick={() => {
                      setSelectedPair(pair);
                      toast.info(`Switched to ${pair.pair} trading pair`);
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-12 bg-surface border-2 border-foreground flex items-center justify-center group-hover:bg-primary transition-colors">
                        <TrendingUp className={`h-6 w-6 ${pair.change >= 0 ? 'text-success' : 'text-destructive'}`} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase italic tracking-tight">{pair.pair}</h4>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Volume: {pair.volume}</p>
                      </div>
                    </div>

                    <div className="flex-1 max-w-[200px] h-10 px-4">
                      <div className="w-full h-full flex items-end gap-1">
                        {pair.chartData.map((val, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 ${pair.change >= 0 ? 'bg-success/40' : 'bg-destructive/40'}`} 
                            style={{ height: `${(val / Math.max(...pair.chartData)) * 100}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-xl font-black italic tracking-tighter">₵{pair.price}</p>
                        <p className={`text-[10px] font-black ${pair.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {pair.change >= 0 ? '+' : ''}{pair.change}%
                        </p>
                      </div>
                      <Button variant="outline" className="h-10 border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[10px]">
                        Trade
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="signals" className="mt-8 space-y-4">
              {[
                { type: "STRONG BUY", pair: "MAIZE/TOMATO", price: "35.80", strength: "94%", reason: "Increased demand in Ashanti region" },
                { type: "SELL", pair: "COCOA/COFFEE", price: "154.20", strength: "72%", reason: "Surplus inventory from Northern corridors" },
                { type: "BUY", pair: "WHEAT/RICE", price: "12.40", strength: "81%", reason: "New logistics route opening" },
                { type: "NEUTRAL", pair: "SOY/MAIZE", price: "85.50", strength: "45%", reason: "Consolidating near major support level" },
              ].map((signal, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border-2 border-foreground p-6 flex items-center justify-between hover:bg-surface transition-colors group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`h-10 w-10 border-2 border-foreground flex items-center justify-center transition-transform group-hover:scale-110 ${signal.type.includes('BUY') ? 'bg-success text-success-foreground' : signal.type === 'SELL' ? 'bg-destructive text-destructive-foreground' : 'bg-muted'}`}>
                      {signal.type.includes('BUY') ? <TrendingUp className="h-5 w-5" /> : signal.type === 'SELL' ? <TrendingDown className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 border border-foreground ${signal.type.includes('BUY') ? 'bg-success/20' : signal.type === 'SELL' ? 'bg-destructive/20' : 'bg-muted/20'}`}>
                          {signal.type}
                        </span>
                        <h4 className="text-lg font-black uppercase italic tracking-tight">{signal.pair}</h4>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground mt-1">{signal.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black italic tracking-tighter">₵{signal.price}</p>
                    <p className="text-[10px] font-black uppercase text-primary">Strength: {signal.strength}</p>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="regional" className="mt-8">
              <div className="bg-card border-2 border-foreground overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-foreground text-background border-b-2 border-foreground">
                    <tr>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest">Commodity</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest">Region/Country</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest">Avg Price</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest">Trend</th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-right">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegions.map(r => (
                      <tr key={r.id} className="border-b-2 border-foreground/5 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => toast.info(`Regional report for ${r.region} loading...`)}>
                        <td className="p-4 font-black italic uppercase text-sm">{r.commodity}</td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold">{r.region}</span>
                            <span className="text-[9px] font-black text-muted-foreground uppercase">{r.country}</span>
                          </div>
                        </td>
                        <td className="p-4 font-black text-sm italic">₵{r.avgPrice}</td>
                        <td className="p-4">
                          {r.trend === 'up' ? <ArrowUpRight className="text-success h-4 w-4" /> : 
                           r.trend === 'down' ? <ArrowDownRight className="text-destructive h-4 w-4" /> : 
                           <Activity className="text-muted-foreground h-4 w-4" />}
                        </td>
                        <td className="p-4 text-right">
                          <Badge className={`${
                            r.demand === 'high' ? 'bg-success' : 
                            r.demand === 'medium' ? 'bg-primary' : 'bg-muted'
                          } text-[8px] font-black uppercase border-2 border-foreground rounded-none`}>
                            {r.demand}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Analysis */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Trade Panel */}
          <div className="bg-surface border-2 border-foreground p-8 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-500" />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-foreground flex items-center justify-center border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Quick Trade</h3>
                </div>
                <Badge className="bg-success text-success-foreground rounded-none border-2 border-foreground text-[8px] font-black uppercase">Instant</Badge>
              </div>

              <div className="flex bg-background border-2 border-foreground p-1 gap-1">
                <button 
                  onClick={() => setTradeType("buy")}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${tradeType === 'buy' ? 'bg-success text-success-foreground' : 'hover:bg-success/10'}`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setTradeType("sell")}
                  className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${tradeType === 'sell' ? 'bg-destructive text-destructive-foreground' : 'hover:bg-destructive/10'}`}
                >
                  Sell
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Market Price</span>
                    <span>₵</span>
                  </div>
                  <div className="bg-background border-2 border-foreground h-12 flex items-center justify-end px-4 font-black italic text-lg">
                    {selectedPair.price}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Order Amount</span>
                    <span>Units</span>
                  </div>
                  <Input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="bg-background border-2 border-foreground h-12 font-black italic rounded-none text-right focus-visible:ring-0"
                  />
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Est. Total</span>
                  <span className="text-lg font-black italic">₵{(parseFloat(amount || "0") * selectedPair.price).toFixed(2)}</span>
                </div>

                <Button 
                  onClick={handleTrade}
                  className={`w-full h-14 border-2 border-foreground rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-sm ${
                    tradeType === 'buy' ? 'bg-success hover:bg-success/90' : 'bg-destructive hover:bg-destructive/90'
                  }`}
                >
                  {tradeType === 'buy' ? 'Execute Buy' : 'Execute Sell'}
                </Button>
              </div>
            </div>
          </div>

          {/* Market Sentiment Gauge */}
          <div className="bg-surface border-2 border-foreground p-8 space-y-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <PieChart className="h-12 w-12" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              Market Sentiment
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-success">
                  <span className="text-2xl font-black italic tracking-tighter">{sentiment}%</span>
                  <p className="text-[9px] font-black uppercase tracking-widest">Bullish</p>
                </div>
                <div className="text-destructive text-right">
                  <span className="text-2xl font-black italic tracking-tighter">{100 - sentiment}%</span>
                  <p className="text-[9px] font-black uppercase tracking-widest">Bearish</p>
                </div>
              </div>
              
              <div className="h-3 bg-background border-2 border-foreground overflow-hidden flex relative">
                <motion.div 
                  initial={{ width: "68%" }}
                  animate={{ width: `${sentiment}%` }}
                  className="h-full bg-success border-r-2 border-foreground relative z-10" 
                />
                <div className="h-full flex-1 bg-destructive" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-0.5 bg-foreground/20 z-20" />
                </div>
              </div>
              
              <div className="p-3 bg-primary/5 border border-foreground/10 text-center relative">
                <p className="text-[10px] font-bold italic text-muted-foreground leading-relaxed">
                  "Current market volatility suggests a {sentiment > 50 ? 'bullish continuation' : 'bearish reversal'} for {selectedPair.pair}."
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Trade History */}
          <div className="bg-surface border-2 border-foreground p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Radio className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Recent Market Activity
            </h3>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-[9px] font-black uppercase text-muted-foreground tracking-widest pb-2 border-b border-foreground/5">
                <span>Price</span>
                <span className="text-center">Size</span>
                <span className="text-right">Time</span>
              </div>
              
              <div className="space-y-1 h-[250px] overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                  {liveTrades.map((trade) => (
                    <motion.div
                      key={trade.id}
                      initial={{ opacity: 0, x: trade.type === 'buy' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="grid grid-cols-3 text-[10px] font-black tracking-tight py-1.5 border-b border-foreground/5 last:border-0"
                    >
                      <span className={trade.type === 'buy' ? 'text-success' : 'text-destructive'}>
                        ₵{trade.price.toFixed(2)}
                      </span>
                      <span className="text-center text-foreground font-bold">{trade.amount}</span>
                      <span className="text-right text-muted-foreground/40 font-mono">{trade.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
              </div>
            </div>
            <Button variant="ghost" className="w-full text-[9px] font-black uppercase tracking-widest h-8 hover:bg-primary/5" onClick={() => toast.info("Full history available in Pro version")}>
              View Full History <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          {/* Market News Feed */}
          <div className="bg-card border-2 border-foreground p-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-primary" />
              Trade Alerts
            </h3>
            <div className="space-y-3">
              {[
                { time: "10m ago", text: "Northern maize yields expected to exceed projections." },
                { time: "25m ago", text: "Tomato prices stabilize in Greater Accra corridor." },
              ].map((news, i) => (
                <div key={i} className="p-3 bg-surface/30 border border-foreground/5 space-y-1 group hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black text-primary uppercase tracking-widest">{news.time}</span>
                    <AlertCircle className="h-2 w-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[10px] font-medium leading-relaxed">{news.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-[2px] w-full ${className}`} />;
}
