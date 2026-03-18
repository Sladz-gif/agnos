import { currentUser } from "@/lib/userData";
import { MapPin, Calendar, Users, Sprout, PawPrint, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, HelpCircle } from "lucide-react";

const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl shadow-layered glass-border overflow-hidden"
      >
        {/* Banner */}
        <div className="h-28 bg-gradient-primary opacity-80" />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-10 flex items-end justify-between">
            <div className="h-20 w-20 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary border-4 border-card">
              {currentUser.avatar}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 border-border/50 text-muted-foreground hover:text-foreground">
              <Edit2 className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          </div>

          {/* Info */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">@{currentUser.username}</h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{currentUser.bio}</p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {currentUser.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined {currentUser.joinedDate}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <StatBox icon={Sprout} label="Farms" value={currentUser.farms} />
            <StatBox icon={PawPrint} label="Livestock" value={`${currentUser.livestock} groups`} />
            <StatBox icon={Users} label="Followers" value={currentUser.followers} />
            <StatBox icon={Users} label="Following" value={currentUser.following} />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList className="bg-surface/50 border border-border/30">
          <TabsTrigger value="posts" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs">
            Posts
          </TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-xs">
            Channels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {currentUser.posts.map(post => (
            <motion.div
              key={post.id}
              variants={item}
              initial="hidden"
              animate="show"
              className="bg-card rounded-xl p-5 shadow-layered glass-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {post.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">@{post.author}</p>
                  <p className="text-[11px] text-muted-foreground">{post.time}</p>
                </div>
                {post.type === "question" && (
                  <span className="ml-auto text-[11px] bg-warning/10 text-warning px-2 py-0.5 rounded-full flex items-center gap-1">
                    <HelpCircle className="h-3 w-3" /> Question
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">{post.content}</p>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/30">
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="h-3.5 w-3.5" /> {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
                </button>
              </div>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="channels">
          <div className="bg-card rounded-xl p-5 shadow-layered glass-border">
            <div className="space-y-3">
              {currentUser.channels.map(ch => (
                <div key={ch} className="flex items-center gap-3 p-3 rounded-lg bg-surface/50 glass-border">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{ch}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) {
  return (
    <div className="bg-surface/50 rounded-lg p-3 glass-border text-center">
      <Icon className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
      <p className="text-lg font-mono font-semibold">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}
