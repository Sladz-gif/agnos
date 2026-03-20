import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Plus, ShoppingCart, TrendingUp, Users, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { currentUser } from "@/lib/userData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { notifications } from "@/lib/mockData";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <SidebarProvider>
      <LayoutContent createOpen={createOpen} setCreateOpen={setCreateOpen}>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
}

function LayoutContent({ 
  children, 
  createOpen, 
  setCreateOpen 
}: { 
  children: React.ReactNode;
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
}) {
  const { setOpen, isMobile } = useSidebar();
  const location = useLocation();
  const isMessagesPage = location.pathname === "/messages";
  const prevPathRef = useRef(location.pathname);

  // Define paths that should NOT have the sidebar layout
  const noLayoutPaths = ["/", "/404"];
  const isNoLayoutPage = noLayoutPaths.includes(location.pathname);

  // Handle sidebar collapse on Messages page and restoration when leaving
  useEffect(() => {
    const wasMessagesPage = prevPathRef.current === "/messages";
    
    if (isMessagesPage && !isMobile) {
      setOpen(false);
    } else if (wasMessagesPage && !isMessagesPage && !isMobile && !isNoLayoutPage) {
      // Restore sidebar only when navigating AWAY from the Messages page
      setOpen(true);
    }
    
    prevPathRef.current = location.pathname;
  }, [location.pathname, isMobile, isNoLayoutPage, setOpen]);

  // Don't render the layout on the landing page or 404 page
  // Also check if the path matches any known route to handle random 404s
  const platformPaths = [
    "/dashboard", "/feed", "/channels", "/marketplace", 
    "/market-analysis", "/seller-verification", "/checkout", 
    "/news", "/lessons", "/farm", "/kiwi", "/profile", 
    "/messages", "/notifications"
  ];
  
  const isPlatformPage = platformPaths.some(path => location.pathname.startsWith(path));

  if (isNoLayoutPage || !isPlatformPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex w-full bg-background transition-colors duration-300">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 glass sticky top-0 z-30">
          <div className="flex items-center gap-2">
            {!isMessagesPage && <SidebarTrigger className="text-muted-foreground hover:text-foreground" />}
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <ProfileButton />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <footer className="border-t border-border/30 py-3 px-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 <span className="font-medium text-foreground/70">GKCL</span> – Gifts Kyortaare Company Limited
          </p>
        </footer>
      </div>
      <CreatePostDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}

function NotificationBell() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "order": return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case "market": return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "social": return <Users className="h-4 w-4 text-purple-500" />;
      case "system": return <Info className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-hidden rounded-3xl border-border/10 glass shadow-2xl" align="end">
        <div className="p-4 border-b border-border/5 flex items-center justify-between">
          <h4 className="text-sm font-black uppercase italic tracking-tighter">Latest Notifications</h4>
          <Link to="/notifications" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1">
            See all <ExternalLink className="h-2.5 w-2.5" />
          </Link>
        </div>
        <div className="max-h-[350px] overflow-y-auto">
          {notifications.slice(0, 5).map((n) => (
            <div 
              key={n.id} 
              className={`p-4 flex gap-3 hover:bg-surface/50 transition-colors cursor-pointer border-b border-border/5 last:border-0 ${!n.read ? "bg-primary/5" : ""}`}
              onClick={() => navigate("/notifications")}
            >
              <div className="h-8 w-8 rounded-xl bg-background flex items-center justify-center shrink-0 border border-border/5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black uppercase italic tracking-tight mb-0.5 line-clamp-1">{n.title}</p>
                <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 leading-snug">{n.message}</p>
                <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-1.5">{n.time}</p>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No notifications</p>
            </div>
          )}
        </div>
        <div className="p-2 bg-surface/30 border-t border-border/5">
          <Button 
            variant="ghost" 
            className="w-full text-[10px] font-black uppercase tracking-[0.2em] h-10 rounded-2xl hover:bg-primary/5"
            onClick={() => navigate("/notifications")}
          >
            View all updates
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ProfileButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/profile")}
      className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary hover:bg-primary/30 transition-colors"
    >
      {currentUser.avatar}
    </button>
  );
}
