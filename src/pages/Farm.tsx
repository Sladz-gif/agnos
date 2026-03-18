import { crops, livestock } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, PawPrint, DollarSign, Activity } from "lucide-react";
import { motion } from "framer-motion";

const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Farm() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Farm Management</h2>

      <Tabs defaultValue="crops" className="space-y-6">
        <TabsList className="bg-surface/50 border border-border/30">
          <TabsTrigger value="crops" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-1.5 text-xs">
            <Sprout className="h-3.5 w-3.5" /> Crops
          </TabsTrigger>
          <TabsTrigger value="livestock" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary gap-1.5 text-xs">
            <PawPrint className="h-3.5 w-3.5" /> Livestock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crops">
          <div className="bg-card rounded-xl shadow-layered glass-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3">Crop</th>
                    <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3">Farm</th>
                    <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3 hidden sm:table-cell">Planted</th>
                    <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3 hidden md:table-cell">Harvest</th>
                    <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3">Status</th>
                    <th className="text-right text-[11px] uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3 hidden sm:table-cell">Expenses</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map(crop => (
                    <motion.tr
                      key={crop.id}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      className="border-b border-border/20 hover:bg-surface-hover/50 transition-colors h-14"
                    >
                      <td className="px-5 text-sm font-medium">{crop.name}</td>
                      <td className="px-5 text-sm text-muted-foreground">{crop.farm}</td>
                      <td className="px-5 text-sm text-muted-foreground font-mono hidden sm:table-cell">{crop.planted}</td>
                      <td className="px-5 text-sm text-muted-foreground font-mono hidden md:table-cell">{crop.harvest}</td>
                      <td className="px-5">
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                          crop.status === "growing" ? "bg-info/10 text-info" : "bg-primary/10 text-primary"
                        }`}>
                          {crop.status}
                        </span>
                      </td>
                      <td className="px-5 text-sm font-mono text-right hidden sm:table-cell">₵{crop.expenses.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="livestock">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {livestock.map(animal => (
              <motion.div
                key={animal.id}
                variants={item}
                initial="hidden"
                animate="show"
                whileHover={{ y: -2 }}
                transition={{ type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}
                className="bg-card rounded-xl p-5 shadow-layered glass-border"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold">{animal.type}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{animal.count} head · Age: {animal.age}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    animal.health === "good" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {animal.health}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface/50 rounded-lg p-3 glass-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Production</p>
                    <p className="text-sm font-mono font-medium">{animal.production}</p>
                  </div>
                  <div className="bg-surface/50 rounded-lg p-3 glass-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Feeding</p>
                    <p className="text-sm font-mono font-medium">{animal.feeding}</p>
                  </div>
                  <div className="bg-surface/50 rounded-lg p-3 glass-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Mortality</p>
                    <p className="text-sm font-mono font-medium">{animal.mortality}</p>
                  </div>
                  <div className="bg-surface/50 rounded-lg p-3 glass-border">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Count</p>
                    <p className="text-sm font-mono font-medium">{animal.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
