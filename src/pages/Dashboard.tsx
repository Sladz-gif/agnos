import { SmartCard } from "@/components/SmartCard";
import { Egg, TrendingUp, Warehouse, DollarSign, Bot, ArrowRight } from "lucide-react";
import { dashboardInsights, crops, livestock } from "@/lib/mockData";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Kiwi Pulse Bar */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-4 shadow-layered glass-border flex items-start gap-3 overflow-hidden"
      >
        <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Kiwi Pulse</p>
          <div className="flex flex-wrap gap-2">
            {dashboardInsights.map((insight, i) => (
              <span key={i} className="text-xs bg-surface px-3 py-1.5 rounded-full text-muted-foreground glass-border">
                {insight}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Metric Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <SmartCard label="Total Revenue" value="₵48,200" trend="+18.2%" trendUp icon={DollarSign} sparkline={[20, 35, 28, 45, 52, 48, 60, 72]} />
        </motion.div>
        <motion.div variants={item}>
          <SmartCard label="Egg Production" value="420/day" trend="+12%" trendUp icon={Egg} sparkline={[350, 380, 390, 400, 410, 405, 415, 420]} />
        </motion.div>
        <motion.div variants={item}>
          <SmartCard label="Active Crops" value={`${crops.filter(c => c.status === "growing").length}`} trend="3 growing" trendUp icon={Warehouse} sparkline={[3, 3, 4, 3, 3, 4, 3, 3]} />
        </motion.div>
        <motion.div variants={item}>
          <SmartCard label="Yield Forecast" value="4,280 kg" trend="+8.5%" trendUp icon={TrendingUp} sparkline={[3200, 3500, 3800, 4000, 4100, 4200, 4250, 4280]} />
        </motion.div>
      </motion.div>

      {/* Farm + Livestock Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-xl p-5 shadow-layered glass-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Crop Overview</h3>
            <a href="/farm" className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3 w-3" /></a>
          </div>
          <div className="space-y-3">
            {crops.map(crop => (
              <div key={crop.id} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 glass-border">
                <div>
                  <p className="text-sm font-medium">{crop.name}</p>
                  <p className="text-xs text-muted-foreground">{crop.farm}</p>
                </div>
                <StatusPill status={crop.status} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-xl p-5 shadow-layered glass-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Livestock Overview</h3>
            <a href="/farm" className="text-xs text-primary flex items-center gap-1 hover:underline">View all <ArrowRight className="h-3 w-3" /></a>
          </div>
          <div className="space-y-3">
            {livestock.map(animal => (
              <div key={animal.id} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 glass-border">
                <div>
                  <p className="text-sm font-medium">{animal.type}</p>
                  <p className="text-xs text-muted-foreground">{animal.count} head · {animal.production}</p>
                </div>
                <HealthPill health={animal.health} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles = {
    growing: "bg-info/10 text-info",
    harvested: "bg-primary/10 text-primary",
    alert: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles[status as keyof typeof styles] || styles.growing}`}>
      {status}
    </span>
  );
}

function HealthPill({ health }: { health: string }) {
  const styles = {
    good: "bg-success/10 text-success",
    fair: "bg-warning/10 text-warning",
    poor: "bg-destructive/10 text-destructive",
  };
  return (
    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${styles[health as keyof typeof styles] || styles.good}`}>
      {health}
    </span>
  );
}
