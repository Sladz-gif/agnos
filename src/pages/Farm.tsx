import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sprout, PawPrint, DollarSign, Activity, TrendingUp, TrendingDown, 
  Calendar, Wind, AlertTriangle, CheckCircle2,
  Plus, Search, Filter, ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Clock, Package, FileText, BarChart3, PieChart as PieChartIcon,
  Users, Briefcase, UserPlus, Box, History, Globe, ShieldCheck, Truck,
  ChevronRight, Building2, Phone, Mail, MapPin, Trash2, Edit2, ExternalLink,
  PenLine, Settings, Bell, Lock as LockIcon, CreditCard, Laptop
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

// --- Mock Data ---

const financialData = [
  { name: "Jan", revenue: 4500, expenses: 3200 },
  { name: "Feb", revenue: 5200, expenses: 3400 },
  { name: "Mar", revenue: 4800, expenses: 3100 },
  { name: "Apr", revenue: 6100, expenses: 3800 },
  { name: "May", revenue: 5900, expenses: 3600 },
  { name: "Jun", revenue: 7200, expenses: 4100 },
];

const expenseBreakdown = [
  { name: "Feed & Seed", value: 45, color: "#8b5cf6" },
  { name: "Labor", value: 25, color: "#ec4899" },
  { name: "Utilities", value: 15, color: "#3b82f6" },
  { name: "Equipment", value: 10, color: "#10b981" },
  { name: "Misc", value: 5, color: "#f59e0b" },
];

const initialPlots = [
  { id: 1, name: "Plot A - Maize", status: "Growing", stage: "Vegetative", planted: "2026-02-10", harvest: "2026-05-15", area: "2.5 Acres", revenue: 0, cost: 3200 },
  { id: 2, name: "Plot B - Soybeans", status: "Growing", stage: "Flowering", planted: "2026-02-15", harvest: "2026-06-01", area: "1.8 Acres", revenue: 0, cost: 2400 },
  { id: 3, name: "Greenhouse 1 - Tomatoes", status: "Harvesting", stage: "Ripening", planted: "2025-12-01", harvest: "2026-03-20", area: "0.5 Acres", revenue: 12450, cost: 4800 },
  { id: 4, name: "Plot C - Wheat", status: "Seedling", stage: "Emergence", planted: "2026-03-05", harvest: "2026-07-10", area: "3.2 Acres", revenue: 0, cost: 1800 },
];

const initialTasks = [
  { id: 1, title: "Apply fertilizer to Plot A", priority: "High", due: "Today", status: "Pending", category: "Nutrition" },
  { id: 2, title: "Check irrigation pump #3", priority: "Medium", due: "Tomorrow", status: "In Progress", category: "Maintenance" },
  { id: 3, title: "Livestock vaccination (Batch 42)", priority: "High", due: "Mar 20", status: "Pending", category: "Health" },
  { id: 4, title: "Clean Greenhouse 2 filters", priority: "Low", due: "Mar 22", status: "Pending", category: "Maintenance" },
];

const livestockGroups = [
  { id: 1, type: "Poultry (Layers)", count: 1200, health: "Optimal", production: "94%", feeding: "3x Daily", alert: false },
  { id: 2, type: "Cattle (Brahman)", count: 45, health: "Good", production: "N/A", feeding: "Grazing", alert: true },
  { id: 3, type: "Fish (Tilapia)", count: 5000, health: "Optimal", production: "2.1kg avg", feeding: "Automatic", alert: false },
];

const initialStaff = [
  { id: 1, name: "Samuel Mensah", role: "Field Supervisor", status: "On Duty", salary: "₵2,500/mo", contact: "+233 24 555 0101", joined: "2024-05-12" },
  { id: 2, name: "Aba Owusu", role: "Vet Technician", status: "On Duty", salary: "₵3,200/mo", contact: "+233 24 555 0202", joined: "2025-01-08" },
  { id: 3, name: "Kwame Boateng", role: "Machine Operator", status: "Off Duty", salary: "₵2,800/mo", contact: "+233 24 555 0303", joined: "2024-11-20" },
];

const initialClients = [
  { id: 1, name: "Global Grain Exports", contact: "John Doe", email: "sales@globalgrain.com", status: "Active", volume: "120 Tons/Yr", lastOrder: "₵45,000" },
  { id: 2, name: "FreshMart Local", contact: "Linda Appiah", email: "purchasing@freshmart.com", status: "Active", volume: "15 Tons/Mo", lastOrder: "₵12,200" },
  { id: 3, name: "BioFuel Solutions", contact: "Mark Tetteh", email: "mark@biofuel.gh", status: "Inactive", volume: "N/A", lastOrder: "₵8,500" },
];

const initialInventory = [
  { id: 1, item: "NPK Fertilizer", category: "Supplies", stock: "45 Bags", unit: "50kg", status: "Healthy", threshold: "10 Bags" },
  { id: 2, item: "Maize Seeds (Hybrid)", category: "Seeds", stock: "12 Bags", unit: "25kg", status: "Low Stock", threshold: "20 Bags" },
  { id: 3, item: "Diesel Fuel", category: "Energy", stock: "1,200 L", unit: "Litres", status: "Healthy", threshold: "200 L" },
  { id: 4, item: "Livestock Feed (Layer)", category: "Feed", stock: "85 Bags", unit: "25kg", status: "Healthy", threshold: "30 Bags" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

// --- Components ---

function StatCard({ title, value, sub, icon: Icon, trend, color = "text-foreground" }: any) {
  return (
    <Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 bg-primary/5 border border-foreground/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {trend === "up" ? <ArrowUpRight className="h-4 w-4 text-success" /> : trend === "down" ? <ArrowDownRight className="h-4 w-4 text-destructive" /> : null}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
          <p className={`text-3xl font-black italic tracking-tighter ${color}`}>{value}</p>
          <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectCard({ title, owner, progress, status, due, tags, onViewBoard }: any) {
  return (
    <Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden group">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <Badge className={`${status === 'Delayed' ? 'bg-destructive text-white' : 'bg-success text-white'} rounded-none text-[8px] font-black uppercase`}>{status}</Badge>
              {tags.map((tag: string) => (
                <span key={tag} className="text-[8px] font-black uppercase tracking-widest opacity-40">#{tag}</span>
              ))}
            </div>
            <h4 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">{title}</h4>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase opacity-60">
              <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Lead: {owner}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Due: {due}</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase">
              <span>Execution Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 rounded-none bg-surface border-2 border-foreground/5" />
          </div>
          
          <div className="flex gap-3 shrink-0">
            <Button variant="outline" className="rounded-none border-2 border-foreground h-12 font-black uppercase tracking-widest text-[10px] px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all" onClick={onViewBoard}>View Board</Button>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-none border-2 border-foreground/10 hover:border-foreground"><MoreHorizontal className="h-5 w-5" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Page ---

export default function Farm() {
  const [activeWorkspace, setActiveWorkspace] = useState("operations");
  const [tasks, setTasks] = useState(initialTasks);
  const [localPlots, setLocalPlots] = useState(initialPlots);
  const [staff, setStaff] = useState(initialStaff);
  const [clients, setClients] = useState(initialClients);
  const [inventory, setInventory] = useState(initialInventory);
  const [archiveLogs, setArchiveLogs] = useState([
    { id: 1, date: "2025-12-15", type: "Harvest", title: "Maize Plot B Final Yield", detail: "4.2 Tons harvested. Quality: A", value: "+₵18,400" },
    { id: 2, date: "2025-11-20", type: "Staff", title: "Contract End: John Arhin", detail: "Seasonal labor contract concluded.", value: "₵0" },
    { id: 3, date: "2025-10-05", type: "Maintenance", title: "Tractor Engine Overhaul", detail: "Major service completed by Ag-Fix.", value: "-₵4,200" },
    { id: 4, date: "2025-09-12", type: "Client", title: "Global Grain 2025 Settlement", detail: "Final payment for 2025 crop cycle.", value: "+₵120,000" },
  ]);
  const [projects, setProjects] = useState([
    { id: 1, title: "Season 2026 Maize Cycle", owner: "Samuel Mensah", progress: 65, status: "On Track", due: "May 15, 2026", tags: ["Crop", "Maize", "High Priority"] },
    { id: 2, title: "Infrastructure: Solar Array Plot B", owner: "Kwame Boateng", progress: 20, status: "Delayed", due: "Apr 30, 2026", tags: ["Energy", "Construction"] },
    { id: 3, title: "Poultry Unit 4 expansion", owner: "Aba Owusu", progress: 90, status: "On Track", due: "Mar 25, 2026", tags: ["Livestock", "Expansion"] },
  ]);
  
  // Dialog States
  const [isAddPlotOpen, setIsAddPlotOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [isPayrollOpen, setIsPayrollOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectBoardOpen, setIsProjectBoardOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedArchiveLog, setSelectedArchiveLog] = useState<any>(null);
  const [isArchiveDetailOpen, setIsArchiveDetailOpen] = useState(false);
  const [isCreateArchiveOpen, setIsCreateArchiveOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isObservationOpen, setIsObservationOpen] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<any>(null);
  const [isEmergencyLogOpen, setIsEmergencyLogOpen] = useState(false);
  const [isSupplyRequestOpen, setIsSupplyRequestOpen] = useState(false);
  const [isAuditSystemOpen, setIsAuditSystemOpen] = useState(false);
  
  // Form State
  const [newPlotName, setNewPlotName] = useState("");
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("");
  const [observationText, setObservationText] = useState("");
  const [emergencyDetail, setEmergencyDetail] = useState("");
  const [supplyRequestDetail, setSupplyRequestDetail] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  // Archive Form State
  const [newArchiveTitle, setNewArchiveTitle] = useState("");
  const [newArchiveDetail, setNewArchiveDetail] = useState("");
  const [newArchiveValue, setNewArchiveValue] = useState("");
  const [newArchiveType, setNewArchiveType] = useState("Manual Entry");
  
  // New Client Form State
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientContact, setNewClientContact] = useState("");

  const workspaces = [
    { id: "operations", label: "Operations", Icon: Sprout },
    { id: "team", label: "Team / Staff", Icon: Users },
    { id: "clients", label: "Clients / CRM", Icon: Building2 },
    { id: "inventory", label: "Inventory", Icon: Box },
    { id: "projects", label: "Projects", Icon: BarChart3 },
    { id: "archive", label: "Archives", Icon: History },
    { id: "settings", label: "Settings", Icon: Settings },
  ];

  const stats = useMemo(() => {
    const revenue = localPlots.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const costs = localPlots.reduce((sum, p) => sum + (p.cost || 0), 0);
    const activeProjects = localPlots.length + livestockGroups.length;
    return { revenue, costs, activeProjects };
  }, [localPlots]);

  const plotsWithHistory = useMemo(() => {
    return localPlots.map(p => ({
      ...p,
      history: [
        { name: "Week 1", cost: p.cost * 0.8 },
        { name: "Week 2", cost: p.cost * 0.9 },
        { name: "Week 3", cost: p.cost },
      ]
    }));
  }, [localPlots]);

  const handleAction = (label: string) => {
    toast.success(`${label} initialized`, {
      description: "Operation logged in management ledger.",
    });
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newStatus = t.status === "Completed" ? "Pending" : "Completed";
        if (newStatus === "Completed") toast.success("Task marked as complete!");
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const triggerIrrigation = (plotId: number) => {
    setLocalPlots(prev => prev.map(p => {
      if (p.id === plotId) {
        toast.info(`Irrigation started for ${p.name}`, {
          description: "Smart valves opened.",
        });
        return { ...p, cost: p.cost + 50 };
      }
      return p;
    }));
  };

  const handleIssueSupplies = (itemId: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const currentStock = parseInt(item.stock);
        if (currentStock <= 0) {
          toast.error(`Insufficient stock for ${item.item}`);
          return item;
        }
        const newStock = currentStock - 1;
        toast.success(`Issued 1 unit of ${item.item}`, {
          description: `Remaining stock: ${newStock} ${item.unit}`
        });
        return { 
          ...item, 
          stock: `${newStock} ${item.unit}`,
          status: newStock < parseInt(item.threshold) ? "Low Stock" : "Healthy"
        };
      }
      return item;
    }));
  };

  const handleLogIntake = () => {
    setInventory(prev => prev.map(item => {
      if (item.id === 1) {
        const currentStock = parseInt(item.stock);
        const newStock = currentStock + 10;
        toast.success(`Logged intake for ${item.item}`, {
          description: `Added 10 units. New stock: ${newStock} ${item.unit}`
        });
        return { ...item, stock: `${newStock} ${item.unit}`, status: "Healthy" };
      }
      return item;
    }));
  };

  const handleAddPlot = () => {
    if (!newPlotName) return;
    const id = localPlots.length + 1;
    const newPlot = {
      id,
      name: newPlotName,
      status: "Seedling",
      stage: "Preparation",
      planted: new Date().toISOString().split('T')[0],
      harvest: "TBD",
      area: "1.0 Acres",
      revenue: 0,
      cost: 500
    };
    setLocalPlots([...localPlots, newPlot]);
    setNewPlotName("");
    setIsAddPlotOpen(false);
    toast.success("New plot added to management system");
  };

  const handleAddStaff = () => {
    if (!newStaffName || !newStaffRole) return;
    const newMember = {
      id: staff.length + 1,
      name: newStaffName,
      role: newStaffRole,
      status: "On Duty",
      salary: "₵2,000/mo",
      contact: "+233 24 000 0000",
      joined: new Date().toISOString().split('T')[0]
    };
    setStaff([...staff, newMember]);
    setNewStaffName("");
    setNewStaffRole("");
    setIsAddStaffOpen(false);
    toast.success("Staff member recruited!");
  };

  const handleAddClient = () => {
    if (!newClientName || !newClientEmail) return;
    const newClient = {
      id: clients.length + 1,
      name: newClientName,
      contact: newClientContact || "New Contact",
      email: newClientEmail,
      status: "Active",
      volume: "New",
      lastOrder: "₵0"
    };
    setClients([...clients, newClient]);
    setNewClientName("");
    setNewClientEmail("");
    setNewClientContact("");
    setIsAddClientOpen(false);
    toast.success("New client added to CRM!");
  };

  const handleCreateProject = () => {
    const id = projects.length + 1;
    const newProject = {
      id,
      title: `New Project ${id}`,
      owner: "Farm Manager",
      progress: 0,
      status: "On Track",
      due: "TBD",
      tags: ["New"]
    };
    setProjects([newProject, ...projects]);
    toast.success("New project created and assigned!");
  };

  const handleAddTask = () => {
    if (!newTaskTitle) return;
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      priority: "Medium",
      due: "Upcoming",
      status: "Pending",
      category: "Project"
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setIsAddTaskOpen(false);
    toast.success("Task added to project board");
  };

  const handleLogObservation = () => {
    if (!observationText || !selectedPlot) return;
    toast.success(`Observation logged for ${selectedPlot.name}`, {
      description: observationText
    });
    setObservationText("");
    setIsObservationOpen(false);
  };

  const handleLogEmergency = () => {
    if (!emergencyDetail) return;
    toast.error("Emergency incident logged", {
      description: emergencyDetail
    });
    setEmergencyDetail("");
    setIsEmergencyLogOpen(false);
  };

  const handleRequestSupply = () => {
    if (!supplyRequestDetail) return;
    toast.info("Supply request submitted", {
      description: supplyRequestDetail
    });
    setSupplyRequestDetail("");
    setIsSupplyRequestOpen(false);
  };

  const handleCreateArchive = () => {
    if (!newArchiveTitle || !newArchiveDetail) return;
    const newEntry = {
      id: archiveLogs.length + 1,
      date: new Date().toISOString().split('T')[0],
      type: newArchiveType,
      title: newArchiveTitle,
      detail: newArchiveDetail,
      value: newArchiveValue || "₵0"
    };
    setArchiveLogs([newEntry, ...archiveLogs]);
    setNewArchiveTitle("");
    setNewArchiveDetail("");
    setNewArchiveValue("");
    setIsCreateArchiveOpen(false);
    toast.success("New record archived successfully");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4 md:px-6">
      {/* --- Top Bar & Header --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">Agnos Farm Manager</h1>
          <div className="flex items-center gap-4 mt-3">
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Operational System Active · Mar 19, 2026
            </p>
            <Separator orientation="vertical" className="h-4" />
            <Badge className="bg-primary/10 text-primary border-none rounded-none text-[9px] font-black uppercase">Enterprise Version</Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4" onClick={() => handleAction("Export Global Report")}>
            <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> <span className="hidden sm:inline">Export Global Report</span><span className="sm:hidden">Export</span>
          </Button>
          
          <Dialog open={isAddPlotOpen} onOpenChange={setIsAddPlotOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-none bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4">
                <Plus className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> <span className="hidden sm:inline">Add Plot/Flock</span><span className="sm:hidden">Add Plot</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Register New Farm Unit</DialogTitle>
                <DialogDescription className="font-bold uppercase text-[10px] tracking-widest">Add a new crop plot or livestock flock to the management system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[10px]">Unit Name (e.g. Plot D - Cocoa)</Label>
                  <Input 
                    placeholder="Enter name..." 
                    className="rounded-none border-2 border-foreground font-bold"
                    value={newPlotName}
                    onChange={(e) => setNewPlotName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-black uppercase text-[10px]">Area (Acres)</Label>
                    <Input placeholder="2.5" className="rounded-none border-2 border-foreground font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-black uppercase text-[10px]">Initial Cost (₵)</Label>
                    <Input placeholder="1500" className="rounded-none border-2 border-foreground font-bold" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={handleAddPlot}>Initialize Unit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="rounded-none border-2 border-destructive shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4 text-destructive" onClick={() => setIsEmergencyLogOpen(true)}>
            <AlertTriangle className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> <span className="hidden lg:inline">Log Incident</span><span className="lg:hidden">Incident</span>
          </Button>

          <Button variant="outline" className="rounded-none border-2 border-primary shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4 text-primary" onClick={() => setIsSupplyRequestOpen(true)}>
            <Truck className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> <span className="hidden lg:inline">Request Supply</span><span className="lg:hidden">Supply</span>
          </Button>

          <Button variant="outline" className="rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4" onClick={() => setActiveWorkspace("settings")}>
            <Settings className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> <span className="hidden lg:inline">Settings</span><span className="lg:hidden">Settings</span>
          </Button>
        </div>
      </div>

      {/* --- Main Navigation Workspaces --- */}
      <div className="space-y-10">
        <Tabs value={activeWorkspace} onValueChange={setActiveWorkspace} className="w-full">
          <TabsList className="w-full h-auto flex flex-wrap gap-3 bg-transparent p-0 border-b-2 border-foreground pb-6">
            {workspaces.map((ws) => (
              <TabsTrigger 
                key={ws.id} 
                value={ws.id}
                className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6"
              >
                <ws.Icon className="h-4 w-4 mr-2" />
                {ws.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              {activeWorkspace === "operations" && (
              <motion.div key="ops" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard title="Revenue (Q1)" value={`₵${stats.revenue.toLocaleString()}`} sub="Live from plot data" icon={TrendingUp} trend="up" />
                  <StatCard title="Operating Costs" value={`₵${stats.costs.toLocaleString()}`} sub="Water, Feed & Labor" icon={DollarSign} trend="neutral" />
                  <StatCard title="Active Projects" value={stats.activeProjects.toString()} sub="Crops + Livestock" icon={Sprout} trend="up" />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  <div className="xl:col-span-8 space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic px-2">Active Field Operations</h3>
                    <div className="space-y-4">
                      {plotsWithHistory.map(plot => (
                        <Card key={plot.id} className="rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all overflow-hidden group">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3">
                                  <h4 className="text-xl font-black uppercase italic tracking-tight">{plot.name}</h4>
                                  <Badge className="bg-primary/10 text-primary border-none rounded-none text-[8px] font-black uppercase tracking-widest">{plot.status}</Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> Planted: {plot.planted}</span>
                                  <span className="flex items-center gap-1.5"><ArrowUpRight className="h-3.5 w-3.5 text-success" /> Harvest: {plot.harvest}</span>
                                  <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5 text-amber-500" /> Area: {plot.area}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="rounded-none border-2 border-foreground font-black uppercase tracking-widest text-[9px]" onClick={() => triggerIrrigation(plot.id)}>Irrigate</Button>
                                <Button variant="ghost" size="icon" className="rounded-none border border-foreground/10 hover:border-primary" onClick={() => { setSelectedPlot(plot); setIsObservationOpen(true); }}><PenLine className="h-4 w-4" /></Button>
                                <Dialog>
                                  <DialogTrigger asChild><Button variant="ghost" size="icon" className="rounded-none border border-foreground/10 hover:border-foreground"><BarChart3 className="h-4 w-4" /></Button></DialogTrigger>
                                  <DialogContent className="sm:max-w-2xl rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                    <DialogHeader>
                                      <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">{plot.name} Historical Analysis</DialogTitle>
                                      <DialogDescription className="font-bold uppercase text-[10px] tracking-widest">Past 3 weeks sensor performance data</DialogDescription>
                                    </DialogHeader>
                                    <div className="h-[300px] w-full mt-6">
                                      <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={plot.history}>
                                          <CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} /><Tooltip contentStyle={{ borderRadius: '0', border: '2px solid black' }} /><Area type="monotone" dataKey="cost" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={3} />
                                        </AreaChart>
                                      </ResponsiveContainer>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon" className="rounded-none"><MoreHorizontal className="h-4 w-4" /></Button>
                              </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-foreground/5 flex items-center justify-between">
                              <div className="flex-1 max-w-md space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest opacity-60"><span>Growth Stage: {plot.stage}</span><span>{plot.status === "Harvesting" ? "100" : "72"}% to Maturity</span></div>
                                <Progress value={plot.status === "Harvesting" ? 100 : 72} className="h-1.5 rounded-none bg-surface" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div className="xl:col-span-4 space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic px-2">Immediate Tasks</h3>
                    <div className="space-y-4">
                      {tasks.slice(0, 4).map(task => (
                        <Card key={task.id} className={`rounded-none border-2 ${task.status === 'Completed' ? 'border-success/30 bg-success/5' : 'border-foreground'} transition-all`}>
                          <CardContent className="p-5 space-y-4">
                            <div className="flex items-center justify-between"><Badge className={`${task.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'} border-none rounded-none text-[8px] font-black uppercase px-2`}>{task.priority}</Badge><span className="text-[8px] font-black uppercase opacity-60">{task.due}</span></div>
                            <h4 className={`text-xs font-black uppercase tracking-tight italic ${task.status === 'Completed' ? 'line-through opacity-40' : ''}`}>{task.title}</h4>
                            <div className="flex items-center justify-between pt-2 border-t border-foreground/5"><span className="text-[8px] font-black uppercase opacity-60">{task.category}</span><Button variant="ghost" size="icon" className={`h-8 w-8 rounded-none border ${task.status === 'Completed' ? 'bg-success border-success text-white' : 'border-foreground/10 hover:border-primary'}`} onClick={() => toggleTaskCompletion(task.id)}><CheckCircle2 className="h-4 w-4" /></Button></div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              )}
              {activeWorkspace === "team" && (
              <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-3xl font-black uppercase tracking-tighter italic">Farm Workforce</h3>
                  <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                    <DialogTrigger asChild><Button className="rounded-none bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4"><UserPlus className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> Recruit Staff</Button></DialogTrigger>
                    <DialogContent className="rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">New Hire Registration</DialogTitle></DialogHeader><div className="space-y-6 py-4"><div className="space-y-2"><Label className="font-black uppercase text-[10px]">Full Name</Label><Input placeholder="John Mensah" className="rounded-none border-2 border-foreground font-bold" value={newStaffName} onChange={(e) => setNewStaffName(e.target.value)} /></div><div className="space-y-2"><Label className="font-black uppercase text-[10px]">Role / Department</Label><Input placeholder="Irrigation Tech" className="rounded-none border-2 border-foreground font-bold" value={newStaffRole} onChange={(e) => setNewStaffRole(e.target.value)} /></div></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={handleAddStaff}>Confirm Hire</Button></DialogFooter></DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {staff.map(member => (
                    <Card key={member.id} className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden bg-card">
                      <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6"><div className="h-20 w-20 rounded-none border-4 border-foreground bg-primary/10 flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><span className="text-2xl font-black text-primary">{member.name.split(' ').map(n => n[0]).join('')}</span></div><div className="space-y-6 flex-1 min-w-0"><div className="space-y-1"><div className="flex items-start justify-between gap-4"><h4 className="text-2xl font-black uppercase italic tracking-tighter leading-tight truncate">{member.name}</h4><Badge className={`${member.status === 'On Duty' ? 'bg-success text-white' : 'bg-surface text-foreground'} rounded-none text-[8px] font-black uppercase px-2 py-1 border border-foreground/10 shrink-0`}>{member.status}</Badge></div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{member.role}</p></div><div className="space-y-2"><div className="flex items-center gap-3 text-[10px] font-bold uppercase opacity-80"><div className="h-6 w-6 rounded-none border border-foreground/10 flex items-center justify-center bg-surface shrink-0"><Phone className="h-3 w-3 text-primary" /></div><span className="truncate">{member.contact}</span></div><div className="flex items-center gap-3 text-[10px] font-bold uppercase opacity-80"><div className="h-6 w-6 rounded-none border border-foreground/10 flex items-center justify-center bg-surface shrink-0"><DollarSign className="h-3 w-3 text-primary" /></div><span>{member.salary}</span></div></div><div className="pt-2 flex flex-wrap gap-3"><Button variant="outline" size="sm" className="rounded-none border-2 border-foreground h-11 font-black uppercase tracking-widest text-[9px] flex-1 min-w-[120px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all" onClick={() => { setSelectedStaff(member); setIsPayrollOpen(true); }}>View Payroll</Button><Button variant="outline" size="sm" className="rounded-none border-2 border-foreground h-11 font-black uppercase tracking-widest text-[9px] flex-1 min-w-[120px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all" onClick={() => { setSelectedStaff(member); setIsMessageOpen(true); }}>Message</Button></div></div></CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
              )}
              {activeWorkspace === "clients" && (
              <motion.div key="clients" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex items-center justify-between px-2"><h3 className="text-3xl font-black uppercase tracking-tighter italic">Client Database (CRM)</h3><Button className="rounded-none bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[8px] md:text-[10px] h-9 md:h-11 px-3 md:px-4" onClick={() => setIsAddClientOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Client</Button></div>
                <div className="bg-card border-2 border-foreground rounded-none overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.05)]"><div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="bg-surface border-b-2 border-foreground"><th className="p-4 text-[10px] font-black uppercase tracking-widest">Client Name</th><th className="p-4 text-[10px] font-black uppercase tracking-widest">Contact</th><th className="p-4 text-[10px] font-black uppercase tracking-widest">Status</th><th className="p-4 text-[10px] font-black uppercase tracking-widest">Annual Volume</th><th className="p-4 text-[10px] font-black uppercase tracking-widest">Actions</th></tr></thead><tbody className="divide-y divide-foreground/5">{clients.map(client => (<tr key={client.id} className="hover:bg-primary/5 transition-colors"><td className="p-4"><p className="font-black uppercase italic text-sm">{client.name}</p><p className="text-[10px] font-bold opacity-40">{client.email}</p></td><td className="p-4 text-xs font-bold">{client.contact}</td><td className="p-4"><Badge className={`${client.status === 'Active' ? 'bg-success text-white' : 'bg-surface text-foreground'} rounded-none text-[8px] font-black uppercase`}>{client.status}</Badge></td><td className="p-4 text-xs font-black italic">{client.volume}</td><td className="p-4"><div className="flex gap-2"><Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-foreground/10 hover:border-foreground" onClick={() => { setSelectedClient(client); setIsEditClientOpen(true); }}><Edit2 className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-foreground/10 hover:border-primary" onClick={() => { setSelectedClient(client); setIsContactOpen(true); }}><Mail className="h-3.5 w-3.5" /></Button></div></td></tr>))}</tbody></table></div></div>
              </motion.div>
              )}
              {activeWorkspace === "inventory" && (
              <motion.div key="inv" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex items-center justify-between px-2"><h3 className="text-3xl font-black uppercase tracking-tighter italic">Supply Inventory</h3><div className="flex gap-3"><Button variant="outline" className="rounded-none border-2 border-foreground font-black uppercase tracking-widest text-[10px] h-11" onClick={() => setIsAuditLogOpen(true)}>Inventory Audit</Button><Button className="rounded-none bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-[10px] h-11" onClick={handleLogIntake}><Plus className="h-4 w-4 mr-2" /> Log Intake</Button></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{inventory.map(item => (<Card key={item.id} className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"><CardContent className="p-6 space-y-6"><div className="flex items-center justify-between"><div className="h-10 w-10 bg-surface border-2 border-foreground flex items-center justify-center"><Box className="h-5 w-5 text-primary" /></div><Badge className={`${item.status === 'Low Stock' ? 'bg-destructive text-white' : 'bg-success/10 text-success'} rounded-none text-[8px] font-black uppercase`}>{item.status}</Badge></div><div><h4 className="text-lg font-black uppercase italic tracking-tight">{item.item}</h4><p className="text-[10px] font-black uppercase opacity-40">{item.category} · {item.unit}</p></div><div className="space-y-2"><div className="flex justify-between text-[10px] font-black uppercase"><span>Stock Level</span><span>{item.stock}</span></div><Progress value={item.status === 'Low Stock' ? 25 : 85} className={`h-2 rounded-none ${item.status === 'Low Stock' ? 'bg-destructive/20' : 'bg-surface'}`} /></div><Button variant="outline" className="w-full rounded-none border-2 border-foreground h-10 font-black uppercase tracking-widest text-[9px] hover:bg-primary/5" onClick={() => handleIssueSupplies(item.id)}>Issue Supplies</Button></CardContent></Card>))}</div>
              </motion.div>
              )}
              {activeWorkspace === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex items-center justify-between px-2"><h3 className="text-3xl font-black uppercase tracking-tighter italic">Project Execution</h3><Button className="rounded-none bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-[10px] h-11" onClick={handleCreateProject}><Plus className="h-4 w-4 mr-2" /> New Project</Button></div>
                <div className="space-y-6">{projects.map(project => (<ProjectCard key={project.id} title={project.title} owner={project.owner} progress={project.progress} status={project.status} due={project.due} tags={project.tags} onViewBoard={() => { setSelectedProject(project); setIsProjectBoardOpen(true); }} />))}</div>
              </motion.div>
              )}
              {activeWorkspace === "archive" && (
              <motion.div key="archive" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex items-center justify-between px-2"><div className="space-y-1"><h3 className="text-3xl font-black uppercase tracking-tighter italic">Operational Archives</h3><p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Historical logs and permanent records</p></div><div className="flex gap-3"><Button variant="outline" className="rounded-none border-2 border-foreground font-black uppercase tracking-widest text-[10px] h-11" onClick={() => handleAction("Export Archive")}><FileText className="h-4 w-4 mr-2" /> Export Full Archive</Button><Button className="rounded-none bg-primary border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest text-[10px] h-11 px-6" onClick={() => setIsCreateArchiveOpen(true)}><Plus className="h-4 w-4 mr-2" /> Create New</Button></div></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10"><div className="lg:col-span-8 space-y-6"><div className="bg-card border-2 border-foreground rounded-none overflow-hidden"><div className="p-4 bg-surface border-b-2 border-foreground flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-widest">Global Activity Log</span></div><div className="divide-y divide-foreground/5">{archiveLogs.map(log => (<div key={log.id} className="p-6 hover:bg-primary/5 transition-all group"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div className="flex gap-4"><div className="h-12 w-12 rounded-none border-2 border-foreground bg-surface flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">{log.type === 'Harvest' && <Sprout className="h-5 w-5 text-success" />}{log.type === 'Staff' && <Users className="h-5 w-5 text-primary" />}{log.type === 'Maintenance' && <Activity className="h-5 w-5 text-amber-500" />}{log.type === 'Client' && <Building2 className="h-5 w-5 text-blue-500" />}</div><div className="space-y-1"><div className="flex items-center gap-3"><p className="text-sm font-black uppercase italic tracking-tight leading-none">{log.title}</p><span className="text-[8px] font-black uppercase bg-foreground/5 px-2 py-0.5 rounded-none">{log.type}</span></div><p className="text-xs font-medium text-muted-foreground leading-relaxed">{log.detail}</p><p className="text-[9px] font-bold uppercase opacity-40 tracking-widest">{log.date}</p></div></div><div className="flex items-center justify-between sm:justify-end gap-6"><p className={`text-sm font-black italic ${log.value.startsWith('+') ? 'text-success' : log.value === '₵0' ? 'opacity-40' : 'text-destructive'}`}>{log.value}</p><Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-2 border-foreground/10 hover:border-foreground" onClick={() => { setSelectedArchiveLog(log); setIsArchiveDetailOpen(true); }}><ExternalLink className="h-4 w-4" /></Button></div></div></div>))}</div></div></div></div>
              </motion.div>
              )}
              {activeWorkspace === "settings" && (
              <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                <div className="flex items-center justify-between px-2"><div className="space-y-1"><h3 className="text-3xl font-black uppercase tracking-tighter italic">System Settings</h3><p className="text-[10px] font-bold uppercase opacity-40 tracking-widest">Global farm configuration and preferences</p></div><Button className="rounded-none bg-foreground text-background border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-11" onClick={() => handleAction("Save All Changes")}>Save All Changes</Button></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10"><div className="lg:col-span-8 space-y-8"><Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"><CardHeader className="border-b-2 border-foreground bg-surface/30"><CardTitle className="text-lg font-black uppercase italic flex items-center gap-3"><Users className="h-5 w-5 text-primary" /> Farm Profile</CardTitle></CardHeader><CardContent className="p-8 space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="space-y-2"><Label className="font-black uppercase text-[9px]">Farm Name</Label><Input defaultValue="Agnos Prime Estates" className="rounded-none border-2 border-foreground font-bold" /></div><div className="space-y-2"><Label className="font-black uppercase text-[9px]">Primary Contact Email</Label><Input defaultValue="admin@agnosfarm.com" className="rounded-none border-2 border-foreground font-bold" /></div></div></CardContent></Card><Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"><CardHeader className="border-b-2 border-foreground bg-primary/10"><CardTitle className="text-lg font-black uppercase italic flex items-center gap-3"><Activity className="h-5 w-5 text-primary" /> Global Operations</CardTitle></CardHeader><CardContent className="p-8"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Button variant="outline" className="h-20 rounded-none border-2 border-destructive flex flex-col items-center justify-center gap-2 hover:bg-destructive/5 transition-all group" onClick={() => setIsEmergencyLogOpen(true)}><AlertTriangle className="h-5 w-5 text-destructive" /><span className="text-[10px] font-black uppercase text-destructive">Emergency Log</span></Button><Button variant="outline" className="h-20 rounded-none border-2 border-primary flex flex-col items-center justify-center gap-2 hover:bg-primary/5 transition-all group" onClick={() => setIsSupplyRequestOpen(true)}><Truck className="h-5 w-5 text-primary" /><span className="text-[10px] font-black uppercase text-primary">Supply Request</span></Button></div></CardContent></Card></div></div>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      {/* --- Global Interaction Dialogs --- */}
      <Dialog open={isPayrollOpen} onOpenChange={setIsPayrollOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Payroll Breakdown</DialogTitle></DialogHeader><div className="space-y-6 py-6"><div className="space-y-4"><div className="flex justify-between items-center p-4 bg-surface border-2 border-foreground"><span className="text-[10px] font-black uppercase">Base Salary</span><span className="font-black italic">{selectedStaff?.salary}</span></div></div></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={() => handleAction("Payroll Disbursed")}>Process Payout</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="sm:max-w-lg rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden"><div className="p-6 border-b-2 border-foreground bg-primary/10"><h3 className="text-xl font-black uppercase italic tracking-tighter">Direct Message: {selectedStaff?.name}</h3></div><div className="h-[300px] bg-card p-6 overflow-y-auto space-y-4"><div className="bg-surface p-3 border-2 border-foreground max-w-[80%] self-start"><p className="text-xs font-bold">Good morning.</p></div></div><div className="p-6 border-t-2 border-foreground bg-surface flex gap-3"><Input placeholder="Type message..." className="rounded-none border-2 border-foreground font-bold h-12" /><Button className="rounded-none border-2 border-foreground bg-primary h-12 w-12 p-0" onClick={() => handleAction("Message Sent")}><ArrowUpRight className="h-5 w-5" /></Button></div></DialogContent>
      </Dialog>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-lg rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Contact {selectedClient?.name}</DialogTitle></DialogHeader><div className="space-y-6 py-6"><div className="space-y-2"><Label className="font-black uppercase text-[10px]">Message Content</Label><textarea className="w-full bg-surface border-2 border-foreground rounded-none p-4 font-bold italic text-sm focus:outline-none min-h-[150px] resize-none" placeholder="Write your message here..." /></div></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={() => setIsContactOpen(false)}>Send Correspondence</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isAuditLogOpen} onOpenChange={setIsAuditLogOpen}>
        <DialogContent className="sm:max-w-2xl rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Supply Chain Audit Log</DialogTitle></DialogHeader><div className="max-h-[400px] overflow-y-auto mt-6 border-2 border-foreground bg-card divide-y-2 divide-foreground/5">{[{ date: "Mar 19, 10:45", action: "Log Intake", item: "NPK Fertilizer", qty: "+10 Bags" }].map((log, i) => (<div key={i} className="p-4 flex items-center justify-between hover:bg-primary/5"><div className="space-y-1"><p className="text-[10px] font-black uppercase">{log.action}: {log.item}</p><p className="text-[8px] font-bold opacity-40 uppercase">{log.date}</p></div><Badge className="bg-success text-white rounded-none font-black text-[9px]">{log.qty}</Badge></div>))}</div><DialogFooter className="mt-6"><Button variant="outline" className="w-full rounded-none border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={() => setIsAuditLogOpen(false)}>Close Ledger</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isProjectBoardOpen} onOpenChange={setIsProjectBoardOpen}>
        <DialogContent className="sm:max-w-4xl rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden"><div className="p-8 border-b-2 border-foreground bg-surface/50 flex items-center justify-between"><div className="space-y-1"><h3 className="text-3xl font-black uppercase italic tracking-tighter">{selectedProject?.title}</h3></div><Badge className="bg-primary text-primary-foreground rounded-none px-4 py-1 font-black uppercase tracking-widest">{selectedProject?.status}</Badge></div><div className="p-8 bg-card grid grid-cols-1 md:grid-cols-3 gap-8"><div className="space-y-4"><p className="text-[10px] font-black uppercase tracking-widest border-b-2 border-foreground pb-2">Planning</p></div></div><div className="p-8 border-t-2 border-foreground bg-surface flex justify-end gap-4"><Button variant="outline" className="rounded-none border-2 border-foreground font-black uppercase tracking-widest text-[10px]" onClick={() => setIsProjectBoardOpen(false)}>Close Board</Button><Button className="rounded-none border-2 border-foreground bg-primary font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={() => setIsAddTaskOpen(true)}>Add Task</Button></div></DialogContent>
      </Dialog>

      <Dialog open={isArchiveDetailOpen} onOpenChange={setIsArchiveDetailOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Archived Record Detail</DialogTitle></DialogHeader><div className="space-y-6 py-6"><div className="p-4 border-2 border-foreground bg-surface"><p className="text-lg font-black italic uppercase leading-tight">{selectedArchiveLog?.title}</p></div></div><DialogFooter><Button variant="outline" className="w-full rounded-none border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={() => setIsArchiveDetailOpen(false)}>Close</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isObservationOpen} onOpenChange={setIsObservationOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Log Observation</DialogTitle></DialogHeader><div className="space-y-6 py-4"><textarea className="w-full bg-surface border-2 border-foreground rounded-none p-4 font-bold italic text-sm focus:outline-none min-h-[120px] resize-none" placeholder="Enter notes..." value={observationText} onChange={(e) => setObservationText(e.target.value)} /></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={handleLogObservation}>Save</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isEmergencyLogOpen} onOpenChange={setIsEmergencyLogOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-destructive">Emergency Log</DialogTitle></DialogHeader><div className="space-y-6 py-4"><textarea className="w-full bg-destructive/5 border-2 border-destructive rounded-none p-4 font-bold italic text-sm focus:outline-none min-h-[120px] resize-none" placeholder="Describe emergency..." value={emergencyDetail} onChange={(e) => setEmergencyDetail(e.target.value)} /></div><DialogFooter><Button className="w-full rounded-none bg-destructive text-white border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={handleLogEmergency}>Broadcast</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isSupplyRequestOpen} onOpenChange={setIsSupplyRequestOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-primary">Supply Request</DialogTitle></DialogHeader><div className="space-y-6 py-4"><textarea className="w-full bg-primary/5 border-2 border-primary rounded-none p-4 font-bold italic text-sm focus:outline-none min-h-[120px] resize-none" placeholder="What is needed?" value={supplyRequestDetail} onChange={(e) => setSupplyRequestDetail(e.target.value)} /></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={handleRequestSupply}>Submit</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isCreateArchiveOpen} onOpenChange={setIsCreateArchiveOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">New Archive Record</DialogTitle></DialogHeader><div className="space-y-6 py-4"><Input placeholder="Record Title" className="rounded-none border-2 border-foreground font-bold" value={newArchiveTitle} onChange={(e) => setNewArchiveTitle(e.target.value)} /><textarea className="w-full bg-surface border-2 border-foreground rounded-none p-4 font-bold italic text-sm focus:outline-none min-h-[100px] resize-none" placeholder="Details..." value={newArchiveDetail} onChange={(e) => setNewArchiveDetail(e.target.value)} /></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onClick={handleCreateArchive}>Archive</Button></DialogFooter></DialogContent>
      </Dialog>

      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-md rounded-none border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"><DialogHeader><DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Add Task</DialogTitle></DialogHeader><div className="space-y-6 py-4"><Input placeholder="Task Title" className="rounded-none border-2 border-foreground font-bold" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} /></div><DialogFooter><Button className="w-full rounded-none bg-primary border-2 border-foreground font-black uppercase tracking-widest h-12" onClick={handleAddTask}>Add</Button></DialogFooter></DialogContent>
      </Dialog>
    </div>
  );
}
