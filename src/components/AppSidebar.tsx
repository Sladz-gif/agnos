import {
  LayoutDashboard, Rss, Users, ShoppingBag, Sprout, Bot, MessageSquare, User, Newspaper, GraduationCap,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Feed", url: "/feed", icon: Rss },
  { title: "Channels", url: "/channels", icon: Users },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "News", url: "/news", icon: Newspaper },
  { title: "Lessons", url: "/lessons", icon: GraduationCap },
  { title: "Farm", url: "/farm", icon: Sprout },
];

const toolsNav = [
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Kiwi AI", url: "/kiwi", icon: Bot },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const renderItem = (item: { title: string; url: string; icon: any }) => {
    const active = location.pathname.startsWith(item.url);
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
              active
                ? "bg-primary/10 text-primary border-l-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
            }`}
            activeClassName=""
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30">
      <SidebarContent className="py-4">
        <div className="px-4 mb-6 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <Sprout className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">Agnos</h1>
              <p className="text-[10px] text-muted-foreground leading-none">Agriculture OS</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/60 px-3 mb-1">Platform</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{mainNav.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/60 px-3 mb-1">Tools</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{toolsNav.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
