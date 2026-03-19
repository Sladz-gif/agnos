import { SmartCard } from "@/components/SmartCard";
import { LayoutDashboard, Egg, TrendingUp, Warehouse, DollarSign, Bot, ArrowRight, Sprout, Activity, Calendar as CalendarIcon, Zap, Plus, Wind, AlertTriangle, CheckCircle2, Package } from "lucide-react";
import { dashboardInsights, crops, livestock } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [manageGroupOpen, setManageGroupOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleQuickAction = (action: string) => {
    toast.success(`Action Started: ${action}`, {
      description: "Command sent to IoT controllers successfully.",
    });
    setQuickActionOpen(false);
  };

  const handleManageGroup = (animal: any) => {
    setSelectedGroup(animal);
    setManageGroupOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header with Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground uppercase italic">Farm Command Center</h1>
          <p className="text-muted-foreground font-medium">Welcome back, Farmer Joe. Here's your pulse for today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-xl border-border/50 gap-2 font-bold h-11 px-5">
                <CalendarIcon className="h-4 w-4" /> Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card border-border/50">
              <DialogHeader>
                <DialogTitle className="text-xl font-black italic uppercase tracking-tight">Farm Schedule</DialogTitle>
                <DialogDescription>Plan and view upcoming tasks for your farm plots.</DialogDescription>
              </DialogHeader>
              <div className="py-4 flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-border/30 bg-surface/30"
                />
                <div className="w-full mt-6 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary">Tasks for {date?.toDateString()}</h4>
                  <div className="p-3 rounded-xl bg-surface/50 border border-border/30 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium">Morning Feeding</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">06:00 AM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface/50 border border-border/30 flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">Logistical Review</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">09:00 AM</span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full rounded-xl font-bold" onClick={() => {
                  toast.success("Schedule Updated");
                  setScheduleOpen(false);
                }}>
                  Add New Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={quickActionOpen} onOpenChange={setQuickActionOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gap-2 font-bold shadow-lg shadow-primary/20 h-11 px-6 bg-gradient-primary text-primary-foreground border-none">
                <Zap className="h-4 w-4" /> Quick Action
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-border/50">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black italic uppercase tracking-tight">Emergency & Quick Commands</DialogTitle>
                <DialogDescription>Immediate triggers for connected farm equipment and management tasks.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-6">
                <ActionButton icon={Package} label="Log Logistics" description="Supply Chain Entry" onClick={() => handleQuickAction("Logistics")} />
                <ActionButton icon={Wind} label="Ventilation" description="Toggle exhaust fans" onClick={() => handleQuickAction("Ventilation")} />
                <ActionButton icon={Plus} label="New Listing" description="Add to Marketplace" onClick={() => handleQuickAction("New Listing")} />
                <ActionButton icon={AlertTriangle} label="Panic Mode" description="Emergency Broadcast" variant="destructive" onClick={() => handleQuickAction("Panic Alert")} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto flex flex-wrap gap-3 bg-transparent p-0 border-b-2 border-foreground pb-6">
          <TabsTrigger value="overview" className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6">
            <LayoutDashboard className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="pulse" className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6">
            <Activity className="h-4 w-4 mr-2" /> Operational Pulse
          </TabsTrigger>
          <TabsTrigger value="monitor" className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6">
            <Warehouse className="h-4 w-4 mr-2" /> Live Monitor
          </TabsTrigger>
        </TabsList>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {/* Kiwi Pulse Bar - AI Insights */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-primary/10 via-background to-background rounded-2xl p-6 border border-primary/20 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
                >
                  <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-xl relative z-10">
                    <Bot className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1 space-y-3 relative z-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Badge className="bg-primary/20 text-primary border-none font-bold uppercase tracking-widest text-[10px]">AI Advisory</Badge>
                      <span className="text-xs font-bold text-muted-foreground/60">Updated 2m ago</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {dashboardInsights.map((insight, i) => (
                        <span key={i} className="text-xs font-bold bg-card/50 backdrop-blur-md px-4 py-2 rounded-xl text-foreground border border-border/30 shadow-sm hover:border-primary/30 transition-all cursor-default">
                          {insight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -right-10 -top-10 h-40 w-40 bg-primary/5 rounded-full blur-3xl" />
                </motion.div>

                {/* Main Metrics Grid */}
                <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div variants={item}>
                    <SmartCard label="Net Revenue" value="₵48,200" trend="+18.2%" trendUp icon={DollarSign} sparkline={[20, 35, 28, 45, 52, 48, 60, 72]} />
                  </motion.div>
                  <motion.div variants={item}>
                    <SmartCard label="Daily Production" value="420 units" trend="+12%" trendUp icon={Package} sparkline={[350, 380, 390, 400, 410, 405, 415, 420]} />
                  </motion.div>
                  <motion.div variants={item}>
                    <SmartCard label="Efficiency" value="94.2%" trend="Optimal" trendUp icon={TrendingUp} sparkline={[85, 88, 90, 92, 91, 93, 94, 94.2]} />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "pulse" && (
              <motion.div key="pulse" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {/* Resource & Operational Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Farm Inventory / Resources */}
                  <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-bold uppercase tracking-tighter italic">Operational Pulse</h3>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs font-bold text-primary gap-1 hover:bg-primary/10">
                        Detailed Analytics <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Resource Levels</h4>
                        <div className="space-y-5">
                          <ResourceProgress label="Water Storage" value={78} color="bg-blue-500" />
                          <ResourceProgress label="Feed Inventory" value={42} color="bg-amber-500" />
                          <ResourceProgress label="Fuel (Diesel)" value={65} color="bg-zinc-500" />
                          <ResourceProgress label="Fertilizer" value={91} color="bg-emerald-500" />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent Harvests</h4>
                        <div className="space-y-3">
                          {crops.filter(c => c.status === "harvested").map(crop => (
                            <div key={crop.id} className="flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-border/30 group hover:border-primary/30 transition-all cursor-pointer">
                              <div>
                                <p className="text-sm font-bold">{crop.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{crop.farm} · {crop.yield} kg</p>
                              </div>
                              <Badge className="bg-primary/10 text-primary border-none font-bold uppercase text-[9px] px-2 py-0.5">Completed</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "monitor" && (
              <motion.div key="monitor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                {/* Live Status / Alerts */}
                <motion.div variants={item} initial="hidden" animate="show" className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold uppercase tracking-tighter italic">Live Monitor</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {livestock.map(animal => (
                      <div key={animal.id} className="p-4 rounded-2xl bg-surface/30 border border-border/30 space-y-3 hover:border-primary/20 transition-all">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{animal.type}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          <div className="p-2 rounded-lg bg-background/50 text-center">
                            <p>Count</p>
                            <p className="text-foreground text-sm mt-0.5">{animal.count}</p>
                          </div>
                          <div className="p-2 rounded-lg bg-background/50 text-center">
                            <p>Production</p>
                            <p className="text-foreground text-sm mt-0.5">{animal.production.split(' ')[0]}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full text-xs font-bold h-9 rounded-xl border-border/50 hover:bg-primary/10 hover:text-primary transition-all"
                          onClick={() => handleManageGroup(animal)}
                        >
                          Manage Group
                        </Button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs>

      {/* Livestock Management Dialog */}

      {/* Livestock Management Dialog */}
      <Dialog open={manageGroupOpen} onOpenChange={setManageGroupOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tight">Manage {selectedGroup?.type}</DialogTitle>
            <DialogDescription>Update production metrics and operational schedules.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="count" className="text-right text-xs font-bold uppercase">Current Count</Label>
              <Input id="count" defaultValue={selectedGroup?.count} className="col-span-3 bg-surface/50 border-border/30 rounded-xl h-11" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="production" className="text-right text-xs font-bold uppercase">Production</Label>
              <Input id="production" defaultValue={selectedGroup?.production} className="col-span-3 bg-surface/50 border-border/30 rounded-xl h-11" />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full h-12 rounded-xl font-bold" onClick={() => {
              toast.success("Livestock Group Updated");
              setManageGroupOpen(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ActionButton({ icon: Icon, label, description, onClick, variant = "default" }: { icon: any, label: string, description: string, onClick: () => void, variant?: "default" | "destructive" }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center text-center p-5 rounded-2xl border transition-all space-y-2 group ${
        variant === "destructive" 
          ? "bg-destructive/5 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40" 
          : "bg-surface/50 border-border/30 hover:bg-primary/5 hover:border-primary/40"
      }`}
    >
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${
        variant === "destructive" 
          ? "bg-destructive/20 text-destructive group-hover:scale-110" 
          : "bg-primary/20 text-primary group-hover:scale-110"
      }`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{description}</p>
      </div>
    </button>
  );
}

function ResourceProgress({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span>{label}</span>
        <span className={value < 30 ? "text-destructive" : ""}>{value}%</span>
      </div>
      <div className="h-2 w-full bg-surface rounded-full overflow-hidden border border-border/30">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`} 
        />
      </div>
    </div>
  );
}
