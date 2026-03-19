import { currentUser } from "@/lib/userData";
import { MapPin, Calendar, Users, Sprout, PawPrint, Edit2, Settings, Link as LinkIcon, Briefcase, Bell, Shield, Eye, LogOut, ChevronRight, Camera, RefreshCw, Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ThemeSettings } from "@/components/ThemeSettings";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);
  const [avatarSeed, setAvatarSeed] = useState(profileData.username);

  const avatarSvg = useMemo(() => {
    return createAvatar(avataaars, {
      seed: avatarSeed,
      // No fixed size here to allow responsive scaling
    }).toString();
  }, [avatarSeed]);

  const handleAvatarRefresh = () => {
    setAvatarSeed(Math.random().toString(36).substring(7));
    toast.success("New avatar generated!");
  };

  const handleShare = () => {
    const url = `https://agnos.io/${profileData.username}`;
    navigator.clipboard.writeText(url);
    toast.success("Profile URL copied to clipboard!");
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleSignOut = () => {
    toast.info("Signing out...");
    // Add sign out logic here if needed
  };

  const handlePostInteraction = (type: string) => {
    toast.info(`${type} functionality coming soon!`);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Profile Header (X-Style) */}
      <div className="relative mb-20 group">
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 via-primary/10 to-background border-b border-border/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="px-4 md:px-8 -mt-16 md:-mt-24 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div className="relative shrink-0">
            <div className="h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-background bg-muted shadow-2xl overflow-hidden relative group/avatar flex items-center justify-center">
              <div 
                dangerouslySetInnerHTML={{ __html: avatarSvg }} 
                className="w-[85%] h-[85%] transform transition-transform group-hover/avatar:scale-110 duration-500 [&>svg]:w-full [&>svg]:h-full"
              />
              <button 
                onClick={handleAvatarRefresh}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300"
              >
                <RefreshCw className="h-8 w-8 text-white animate-spin-slow" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 min-w-0 max-w-full">
            <AnimatePresence mode="wait">
              <motion.div key={isEditing ? "save" : "edit"} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                {isEditing ? (
                  <Button onClick={handleSave} className="rounded-full font-bold px-5 md:px-6 shadow-lg shadow-primary/20 w-28 md:w-32 text-sm md:text-base">
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="rounded-full border-border/50 font-bold px-5 md:px-6 hover:bg-primary/5 w-28 md:w-32 text-sm md:text-base"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit profile
                  </Button>
                )}
              </motion.div>
            </AnimatePresence>
            <Button onClick={handleShare} className="rounded-full font-bold px-5 md:px-6 shadow-lg shadow-primary/20 text-sm md:text-base whitespace-nowrap">
              Share Profile
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div 
              key="edit-form"
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }}
              className="px-4 md:px-8 mt-6 space-y-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={profileData.fullName} onChange={(e) => setProfileData({...profileData, fullName: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={profileData.username} onChange={(e) => setProfileData({...profileData, username: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  value={profileData.bio} 
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})} 
                  className="w-full bg-surface/30 border-border/20 rounded-2xl p-3 text-sm min-h-[100px]"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="profile-info"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="px-4 md:px-8 mt-6 space-y-4"
            >
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">
                  {profileData.fullName || profileData.username}
                </h2>
                <p className="text-muted-foreground font-medium text-sm">@{profileData.username}</p>
              </div>

              <p className="text-[15px] leading-relaxed max-w-2xl font-medium">
                {profileData.bio}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {profileData.location}</span>
                <span className="flex items-center gap-1.5"><LinkIcon className="h-4 w-4" /> agnos.io/{profileData.username}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Joined {profileData.joinedDate}</span>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div onClick={() => toast.info("Coming soon!")} className="flex items-center gap-1.5 group cursor-pointer">
                  <span className="text-base font-black tracking-tight">{profileData.following}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:underline">Following</span>
                </div>
                <div onClick={() => toast.info("Coming soon!")} className="flex items-center gap-1.5 group cursor-pointer">
                  <span className="text-base font-black tracking-tight">{profileData.followers}</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:underline">Followers</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="px-4 md:px-8 w-full overflow-x-hidden">
        <TabsList className="w-full overflow-x-auto scrollbar-none justify-start bg-transparent border-b border-border/10 h-14 p-0 gap-8">
          <TabsTrigger value="overview" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground h-full font-black uppercase italic tracking-tighter text-sm">Overview</TabsTrigger>
          <TabsTrigger value="posts" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground h-full font-black uppercase italic tracking-tighter text-sm">Operations</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground h-full font-black uppercase italic tracking-tighter text-sm">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              icon={Sprout} 
              label="Active Farms" 
              value={currentUser.farms} 
              description="Managed operational units" 
              onClick={() => toast.info("Farm details coming soon!")}
            />
            <StatCard 
              icon={PawPrint} 
              label="Livestock Groups" 
              value={currentUser.livestock} 
              description="Monitored breeding units" 
              onClick={() => toast.info("Livestock details coming soon!")}
            />
            <StatCard 
              icon={Briefcase} 
              label="Agri-Business Projects" 
              value="12" 
              description="Supply chain collaborations" 
              onClick={() => toast.info("Project details coming soon!")}
            />
            <StatCard 
              icon={Shield} 
              label="Verification Status" 
              value="Verified" 
              description="GKCL Security Protocol" 
              onClick={() => toast.info("Verification details coming soon!")}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="posts" className="mt-8 space-y-6">
          {currentUser.posts.map(post => (
            <motion.div
              key={post.id}
              variants={item}
              initial="hidden"
              animate="show"
              className="bg-card/30 backdrop-blur-sm border border-border/5 rounded-3xl p-6 hover:bg-card/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarFallback className="font-black text-primary">{post.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-black uppercase italic tracking-tight">@{post.author}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{post.time}</p>
                  </div>
                  <p className="text-[15px] font-medium leading-relaxed mb-4">{post.content}</p>
                  <div className="flex items-center gap-8 pt-4 border-t border-border/5">
                    <button onClick={() => handlePostInteraction('Like')} className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" /> {post.likes}
                    </button>
                    <button onClick={() => handlePostInteraction('Comment')} className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" /> {post.comments}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="mt-8">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <section className="space-y-4">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-l-4 border-primary pl-4">Account Preferences</h3>
              <div className="grid gap-4">
                <SettingsRow icon={Bell} title="Push Notifications" description="Real-time logistics and market alerts" defaultChecked onCheckedChange={(checked) => toast.info(`Push notifications ${checked ? "enabled" : "disabled"}`)} />
                <SettingsRow icon={Eye} title="Public Visibility" description="Allow other farmers to see your profile" defaultChecked onCheckedChange={(checked) => toast.info(`Public profile ${checked ? "enabled" : "disabled"}`)} />
                <SettingsRow icon={Shield} title="Two-Factor Auth" description="Secure your operational data" onCheckedChange={(checked) => toast.info(`Two-factor authentication ${checked ? "enabled" : "disabled"}`)} />
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-border/5">
              <h3 className="text-xl font-black uppercase italic tracking-tighter border-l-4 border-primary pl-4">Interface Style</h3>
              <div className="p-6 bg-card/20 rounded-3xl border border-border/5">
                <ThemeSettings />
              </div>
            </section>

            <section className="pt-8">
              <Button onClick={handleSignOut} variant="destructive" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-2">
                <LogOut className="h-5 w-5" /> Sign Out from Agnos
              </Button>
            </section>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, description, onClick }: { icon: any; label: string; value: string | number; description: string; onClick?: () => void; }) {
  return (
    <motion.div 
      variants={item} 
      onClick={onClick}
      className="bg-card/20 border border-border/5 p-6 rounded-[32px] hover:border-primary/20 transition-all group cursor-pointer"
    >
      <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
      <h4 className="text-2xl font-black tracking-tight mb-2">{value}</h4>
      <p className="text-[11px] font-medium text-muted-foreground/60 leading-relaxed uppercase tracking-widest">{description}</p>
    </motion.div>
  );
}

function SettingsRow({ icon: Icon, title, description, defaultChecked, onCheckedChange }: { icon: any; title: string; description: string; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void; }) {
  return (
    <div className="flex items-center justify-between p-5 bg-card/10 rounded-2xl border border-border/5 hover:bg-card/20 transition-all group">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-black uppercase italic tracking-tight">{title}</p>
          <p className="text-xs font-medium text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

