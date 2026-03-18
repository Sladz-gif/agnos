import { marketListings } from "@/lib/mockData";
import { MapPin, ShoppingBag, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Crops", "Poultry", "Dairy", "Livestock"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Marketplace() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? marketListings : marketListings.filter(l => l.category === active);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Marketplace</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              onClick={() => setActive(cat)}
              className={`text-xs rounded-full px-3 ${
                active === cat ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(listing => (
          <motion.div
            key={listing.id}
            variants={item}
            whileHover={{ y: -2 }}
            transition={{ type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}
            className="bg-card rounded-xl p-5 shadow-layered glass-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-accent" />
              </div>
              <span className="text-[11px] bg-surface px-2 py-0.5 rounded-full text-muted-foreground">{listing.category}</span>
            </div>
            <h3 className="text-sm font-semibold">{listing.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{listing.quantity}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
              <span className="text-sm font-mono font-semibold text-primary">{listing.price}</span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {listing.location}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
