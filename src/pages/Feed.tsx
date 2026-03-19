import { feedPosts, FeedPost } from "@/lib/mockData";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, CheckCircle2, Image as ImageIcon, Gift, List, Smile, Calendar, MapPin, Search, TrendingUp, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { currentUser } from "@/lib/userData";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

interface Comment {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

const mockComments: Record<number, Comment[]> = {
  1: [
    { id: 101, author: "Business Expert", username: "biz_doc", avatar: "BD", content: "Great yield! What was the market price at harvest?", time: "1h", likes: 5 },
    { id: 102, author: "Market Watch", username: "market_watch", avatar: "MW", content: "Pricing for organic tomatoes is up 10% this week. Perfect timing!", time: "45m", likes: 3 },
  ],
  2: [
    { id: 201, author: "Logistics Pro", username: "log_pro", avatar: "LP", content: "Check for transport delays. Even a small delay can affect quality.", time: "2h", likes: 8 },
  ]
};

export default function Feed() {
  const [posts, setPosts] = useState<FeedPost[]>(feedPosts);
  const [activeTab, setActiveTab] = useState("for-you");
  const [composeText, setComposeText] = useState("");
  const [selectedPost, setSelectedGroup] = useState<FeedPost | null>(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState<Record<number, Comment[]>>(mockComments);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [locationText, setLocationText] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast.success("Image attached from local storage");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = (id: number, type: 'like' | 'repost') => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        if (type === 'like') {
          const liked = (p as any).liked;
          return { ...p, likes: liked ? p.likes - 1 : p.likes + 1, liked: !liked } as any;
        }
        if (type === 'repost') {
          const reposted = (p as any).reposted;
          return { ...p, retweets: reposted ? p.retweets - 1 : p.retweets + 1, reposted: !reposted } as any;
        }
      }
      return p;
    }));
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)}ed successfully`);
  };

  const handleSidebarAction = (label: string) => {
    toast.info(`${label} clicked`, {
      description: "Feature coming soon to community channels."
    });
  };

  const handlePost = () => {
    if (!composeText.trim() && !selectedImage) return;
    const newPost: FeedPost = {
      id: Date.now(),
      author: "Kwame Farms",
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: composeText,
      image: selectedImage || undefined,
      likes: 0,
      retweets: 0,
      replies: 0,
      time: "Just now",
      verified: true
    };
    // Add location to content if present
    if (locationText.trim()) {
      newPost.content = `${newPost.content}\n\n📍 ${locationText.trim()}`;
    }
    setPosts([newPost, ...posts]);
    setComposeText("");
    setSelectedImage(null);
    setLocationText("");
    setShowLocationInput(false);
    toast.success("Post published!");
  };

  const handleReply = (postId: number) => {
    if (!replyText.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      author: "Kwame Farms",
      username: currentUser.username,
      avatar: currentUser.avatar,
      content: replyText,
      time: "Just now",
      likes: 0
    };
    setComments(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: p.replies + 1 } : p));
    // Update selectedPost as well if it's currently showing
    if (selectedPost && selectedPost.id === postId) {
      setSelectedGroup({ ...selectedPost, replies: selectedPost.replies + 1 });
    }
    setReplyText("");
    toast.success("Reply posted!");
  };

  const handlePostClick = (post: FeedPost, focusReply: boolean = false) => {
    setSelectedGroup(post);
    if (focusReply) {
      setTimeout(() => {
        document.querySelector('textarea')?.focus();
      }, 300);
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
      {/* Main Feed Column */}
      <div className="lg:col-span-2 border-x border-border/50 min-h-screen bg-background">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="px-4 py-3">
                  <h2 className="text-xl font-bold">Home</h2>
                </div>
                <Tabs defaultValue="for-you" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-transparent h-12 p-0 rounded-none border-none">
                    <TabsTrigger value="for-you" className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none relative group">
                      <span className={`text-sm font-bold ${activeTab === 'for-you' ? 'text-foreground' : 'text-muted-foreground'}`}>For you</span>
                      {activeTab === 'for-you' && <div className="absolute bottom-0 h-1 w-14 bg-primary rounded-full" />}
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex-1 h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none relative group">
                      <span className={`text-sm font-bold ${activeTab === 'following' ? 'text-foreground' : 'text-muted-foreground'}`}>Following</span>
                      {activeTab === 'following' && <div className="absolute bottom-0 h-1 w-14 bg-primary rounded-full" />}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Compose Tweet Area */}
              <div className="px-4 py-4 border-b border-border/50 flex gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{currentUser.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <textarea
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              placeholder="What's happening in your farm?"
              className="w-full bg-transparent border-none focus:ring-0 text-xl resize-none min-h-[60px] py-2 placeholder:text-muted-foreground/60"
            />
            
            {selectedImage && (
              <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-sm max-h-[300px]">
                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 backdrop-blur-md border-none"
                  onClick={() => setSelectedImage(null)}
                >
                  <MoreHorizontal className="h-4 w-4 rotate-45" />
                </Button>
              </div>
            )}

            <AnimatePresence>
              {showLocationInput && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 bg-surface/50 p-2 rounded-xl border border-border/30"
                >
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <input 
                    autoFocus
                    placeholder="Where are you farming?"
                    className="bg-transparent border-none focus:ring-0 text-sm flex-1 py-1"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 rounded-full" 
                    onClick={() => {
                      setShowLocationInput(false);
                      setLocationText("");
                    }}
                  >
                    <MoreHorizontal className="h-3 w-3 rotate-45" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-1 text-primary">
                <input
                  type="file"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <IconButton 
                  icon={ImageIcon} 
                  onClick={() => document.getElementById('image-upload')?.click()}
                />
                <IconButton 
                  icon={MapPin} 
                  onClick={() => setShowLocationInput(!showLocationInput)} 
                  className={showLocationInput ? "bg-primary/10" : ""}
                />
              </div>
              <Button 
                onClick={handlePost}
                disabled={!composeText.trim() && !selectedImage && !locationText.trim()}
                className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                Post
              </Button>
            </div>
                </div>
              </div>

              <motion.div variants={container} initial="hidden" animate="show">
                {posts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onAction={handleAction} 
                    onComment={() => handlePostClick(post, true)}
                    onClick={() => handlePostClick(post, false)}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="pb-20"
            >
              <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center gap-6 px-4 h-14">
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={() => setSelectedGroup(null)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold">Post</h2>
              </div>

              <div className="px-4 py-4">
                <div className="flex gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPost.username}`} />
                    <AvatarFallback>{selectedPost.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold hover:underline cursor-pointer flex items-center gap-1">
                          {selectedPost.author}
                          {selectedPost.verified && <CheckCircle2 className="h-4 w-4 text-primary fill-primary text-white" />}
                        </span>
                        <span className="text-muted-foreground text-sm">@{selectedPost.username}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-[22px] leading-normal mb-4 whitespace-pre-wrap text-foreground">{selectedPost.content}</p>
                
                {selectedPost.image && (
                  <div className="rounded-2xl border border-border/50 overflow-hidden mb-4 shadow-sm">
                    <img src={selectedPost.image} alt="Post content" className="w-full h-auto object-cover max-h-[600px]" />
                  </div>
                )}

                <div className="flex items-center gap-1 text-[15px] text-muted-foreground py-4 border-b border-border/50">
                  <span className="text-foreground font-bold">{selectedPost.time}</span>
                  <span>·</span>
                  <span className="text-foreground font-bold">March 18, 2026</span>
                  <span>·</span>
                  <span className="text-foreground font-bold">12.4K</span>
                  <span>Views</span>
                </div>

                <div className="flex justify-between py-4 border-b border-border/50 text-muted-foreground">
                  <SocialAction 
                    icon={MessageCircle} 
                    count={selectedPost.replies} 
                    hoverColor="hover:text-primary" 
                    hoverBg="group-hover:bg-primary/10" 
                    onClick={() => {
                      document.querySelector('textarea')?.focus();
                    }}
                  />
                  <SocialAction 
                    icon={Repeat2} 
                    count={selectedPost.retweets} 
                    hoverColor="hover:text-success" 
                    hoverBg="group-hover:bg-success/10" 
                    active={(selectedPost as any).reposted}
                    onClick={() => handleAction(selectedPost.id, 'repost')}
                  />
                  <SocialAction 
                    icon={Heart} 
                    count={selectedPost.likes} 
                    hoverColor="hover:text-destructive" 
                    hoverBg="group-hover:bg-destructive/10" 
                    active={(selectedPost as any).liked}
                    onClick={() => handleAction(selectedPost.id, 'like')}
                  />
                  <SocialAction 
                    icon={Share} 
                    hoverColor="hover:text-primary" 
                    hoverBg="group-hover:bg-primary/10" 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied");
                    }}
                  />
                </div>

                {/* Post Reply Area */}
                <div className="py-4 border-b border-border/50 flex gap-4">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{currentUser.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Post your reply"
                      className="w-full bg-transparent border-none focus:ring-0 text-xl resize-none min-h-[40px] py-2 placeholder:text-muted-foreground/60"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleReply(selectedPost.id)}
                        disabled={!replyText.trim()}
                        className="rounded-full px-6 font-bold shadow-sm h-9"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="divide-y divide-border/20">
                  {(comments[selectedPost.id] || []).map(comment => (
                    <div key={comment.id} className="py-4 flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-secondary/20 text-secondary-foreground text-xs font-bold">{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="font-bold hover:underline truncate">{comment.author}</span>
                          <span className="text-muted-foreground text-sm truncate">@{comment.username}</span>
                          <span className="text-muted-foreground text-sm">·</span>
                          <span className="text-muted-foreground text-sm">{comment.time}</span>
                        </div>
                        <p className="text-[15px] leading-normal text-foreground/90">{comment.content}</p>
                        <div className="flex gap-6 mt-3 text-muted-foreground">
                          <SocialAction icon={MessageCircle} count={0} hoverColor="hover:text-primary" hoverBg="group-hover:bg-primary/10" onClick={() => {}} />
                          <SocialAction icon={Repeat2} count={0} hoverColor="hover:text-success" hoverBg="group-hover:bg-success/10" onClick={() => {}} />
                          <SocialAction icon={Heart} count={comment.likes} hoverColor="hover:text-destructive" hoverBg="group-hover:bg-destructive/10" onClick={() => {}} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar Column */}
      <div className="hidden lg:block space-y-6 py-4">
        {/* Search */}
        <div className="sticky top-4 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              placeholder="Search Agnos Social" 
              className="w-full bg-surface border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
            />
          </div>

          {/* Trending */}
          <div className="bg-surface/50 rounded-2xl border border-border/30 overflow-hidden">
            <h3 className="px-4 py-3 text-xl font-black italic uppercase tracking-tighter">What's happening</h3>
            <div className="divide-y divide-border/20">
              <TrendItem category="Agriculture · Trending" title="#OrganicHarvest" posts="12.4k" onClick={() => handleSidebarAction("Trend: #OrganicHarvest")} />
              <TrendItem category="Technology · Trending" title="Smart Logistics" posts="8.2k" onClick={() => handleSidebarAction("Trend: Smart Logistics")} />
              <TrendItem category="Market · Trending" title="Maize Prices" posts="5.1k" onClick={() => handleSidebarAction("Trend: Maize Prices")} />
              <TrendItem category="Business · Trending" title="Agri-Export 2026" posts="2.9k" onClick={() => handleSidebarAction("Trend: Agri-Export 2026")} />
            </div>
            <button 
              className="w-full px-4 py-4 text-left text-sm text-primary hover:bg-primary/5 transition-colors font-medium"
              onClick={() => handleSidebarAction("Show more trends")}
            >
              Show more
            </button>
          </div>

          {/* Who to follow */}
          <div className="bg-surface/50 rounded-2xl border border-border/30 overflow-hidden">
            <h3 className="px-4 py-3 text-xl font-black italic uppercase tracking-tighter">Who to follow</h3>
            <div className="divide-y divide-border/20">
              <FollowItem name="Agri Solutions" username="agri_solutions" avatar="AS" onFollow={() => handleSidebarAction("Followed Agri Solutions")} />
              <FollowItem name="Modern Farmer" username="modern_farmer" avatar="MF" onFollow={() => handleSidebarAction("Followed Modern Farmer")} />
              <FollowItem name="Soil Experts" username="soil_experts" avatar="SE" onFollow={() => handleSidebarAction("Followed Soil Experts")} />
            </div>
            <button 
              className="w-full px-4 py-4 text-left text-sm text-primary hover:bg-primary/5 transition-colors font-medium"
              onClick={() => handleSidebarAction("Show more people")}
            >
              Show more
            </button>
          </div>

          <div className="px-4 text-[13px] text-muted-foreground leading-relaxed flex flex-wrap gap-x-3 gap-y-1">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Ads info</a>
            <span>© 2026 Agnos Inc.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onAction, onComment, onClick }: { post: FeedPost, onAction: any, onComment: () => void, onClick: () => void }) {
  return (
    <motion.div
      variants={item}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="px-4 py-4 border-b border-border/50 hover:bg-surface/30 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`} />
          <AvatarFallback>{post.avatar}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-0.5">
            <span className="font-bold hover:underline truncate">{post.author}</span>
            {post.verified && <CheckCircle2 className="h-4 w-4 text-primary fill-primary text-white" />}
            <span className="text-muted-foreground text-sm truncate">@{post.username}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">{post.time}</span>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[15px] leading-relaxed mb-3 whitespace-pre-wrap text-foreground/90">{post.content}</p>
          
          {post.image && (
            <div className="rounded-2xl border border-border/50 overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
              <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}

          <div className="flex justify-between max-w-md text-muted-foreground mt-2">
            <SocialAction 
              icon={MessageCircle} 
              count={post.replies} 
              hoverColor="hover:text-primary" 
              hoverBg="group-hover:bg-primary/10" 
              onClick={onComment}
            />
            <SocialAction 
              icon={Repeat2} 
              count={post.retweets} 
              hoverColor="hover:text-success" 
              hoverBg="group-hover:bg-success/10" 
              active={(post as any).reposted}
              onClick={() => onAction(post.id, 'repost')}
            />
            <SocialAction 
              icon={Heart} 
              count={post.likes} 
              hoverColor="hover:text-destructive" 
              hoverBg="group-hover:bg-destructive/10" 
              active={(post as any).liked}
              onClick={() => onAction(post.id, 'like')}
            />
            <SocialAction 
              icon={Share} 
              hoverColor="hover:text-primary" 
              hoverBg="group-hover:bg-primary/10" 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied");
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IconButton({ icon: Icon, className, onClick }: { icon: any, className?: string, onClick?: () => void }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={`h-9 w-9 rounded-full hover:bg-primary/10 transition-colors ${className}`}
      onClick={onClick}
    >
      <Icon className="h-[18px] w-[18px]" />
    </Button>
  );
}

function SocialAction({ icon: Icon, count, hoverColor, hoverBg, onClick, active }: { icon: any, count?: number, hoverColor: string, hoverBg: string, onClick: () => void, active?: boolean }) {
  return (
    <button 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`group flex items-center gap-1.5 text-sm transition-all ${hoverColor} ${active ? hoverColor.replace('hover:', '') : ''}`}
    >
      <div className={`p-2 rounded-full transition-colors ${hoverBg} ${active ? hoverBg.replace('group-hover:', '') : ''}`}>
        <Icon className={`h-[18px] w-[18px] ${active ? 'fill-current' : ''}`} />
      </div>
      {count !== undefined && <span className="font-medium">{count}</span>}
    </button>
  );
}

function TrendItem({ category, title, posts, onClick }: { category: string, title: string, posts: string, onClick?: () => void }) {
  return (
    <div className="px-4 py-3 hover:bg-surface transition-colors cursor-pointer group" onClick={onClick}>
      <div className="flex justify-between items-start">
        <span className="text-xs text-muted-foreground">{category}</span>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>
      <p className="font-bold text-sm mt-0.5">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{posts} posts</p>
    </div>
  );
}

function FollowItem({ name, username, avatar, onFollow }: { name: string, username: string, avatar: string, onFollow?: () => void }) {
  return (
    <div className="px-4 py-3 hover:bg-surface transition-colors cursor-pointer flex items-center gap-3">
      <Avatar className="h-10 w-10 ring-1 ring-border/20">
        <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate leading-tight hover:underline">{name}</p>
        <p className="text-xs text-muted-foreground truncate leading-tight">@{username}</p>
      </div>
      <Button 
        size="sm" 
        className="rounded-full font-bold bg-foreground text-background hover:bg-foreground/90 h-8"
        onClick={(e) => { e.stopPropagation(); onFollow?.(); }}
      >
        Follow
      </Button>
    </div>
  );
}
