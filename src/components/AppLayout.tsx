import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import { currentUser } from "@/lib/userData";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background transition-colors duration-300">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 glass sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <Button
                size="sm"
                className="bg-gradient-primary text-primary-foreground gap-1.5 shadow-layered"
                onClick={() => setCreateOpen(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Create</span>
              </Button>
              <ProfileButton />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
          <footer className="border-t border-border/30 py-3 px-6 text-center">
            <p className="text-xs text-muted-foreground">
              Powered by <span className="font-medium text-foreground/70">GKCL</span> – Gifts Kyortaare Company Limited
            </p>
          </footer>
        </div>
      </div>
      <CreatePostDialog open={createOpen} onOpenChange={setCreateOpen} />
    </SidebarProvider>
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
