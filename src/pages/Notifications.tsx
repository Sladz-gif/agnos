import { notifications } from "@/lib/mockData";
import { Bell, ShoppingCart, TrendingUp, Users, Info, CheckCircle2, MoreHorizontal, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case "market": return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      case "social": return <Users className="h-5 w-5 text-purple-500" />;
      case "system": return <Info className="h-5 w-5 text-orange-500" />;
      default: return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  const markAllRead = () => {
    toast.success("All notifications marked as read!");
  };

  const clearAll = () => {
    toast.success("Notifications cleared!");
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Notifications</h1>
          <p className="text-muted-foreground font-medium text-sm">Stay updated with your farm operations</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllRead} className="rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest h-9 px-4">
            <CheckCircle2 className="h-3.5 w-3.5 mr-2 shrink-0" /> Mark all read
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll} className="rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest text-destructive hover:text-destructive hover:bg-destructive/10 h-9 px-4">
            <Trash2 className="h-3.5 w-3.5 mr-2 shrink-0" /> Clear all
          </Button>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={item}
            className={`group relative flex items-start gap-4 p-5 rounded-[2rem] border transition-all duration-300 ${
              notification.read 
                ? "bg-card/20 border-border/5 hover:bg-card/30" 
                : "bg-primary/5 border-primary/20 hover:bg-primary/10 shadow-lg shadow-primary/5"
            }`}
          >
            <div className={`mt-1 h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 ${
              notification.read ? "bg-background/50" : "bg-primary/10"
            }`}>
              {getIcon(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-black uppercase italic tracking-tight ${notification.read ? "text-foreground/80" : "text-foreground"}`}>
                  {notification.title}
                </h3>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
              </div>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {notification.message}
              </p>
              <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em] mt-2">
                {notification.time}
              </p>
            </div>

            <button className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-surface/50 rounded-xl">
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </motion.div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-surface/30 flex items-center justify-center mb-4">
            <Bell className="h-10 w-10 text-muted-foreground/30" />
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-muted-foreground/50">No notifications</h3>
          <p className="text-muted-foreground/40 font-medium">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
