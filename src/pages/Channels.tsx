import { channels, Channel } from "@/lib/mockData";
import { Users, MessageSquare, TrendingUp, Search, Info, Plus, ArrowLeft, Shield, Tag, Settings, MoreHorizontal, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/lib/userData";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1 } };

interface CommunityPost {
  id: number;
  author: string;
  username: string;
  avatar: string;
  time: string;
  title: string;
  content: string;
  tag: string;
  comments: number;
}

interface CommunityComment {
  id: number;
  author: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
}

const mockCommunityPosts: Record<number, CommunityPost[]> = {
  1: [
    {
      id: 1001,
      author: "Agri Maven",
      username: "agri_maven",
      avatar: "AM",
      time: "5h ago",
      title: "Best practices for sustainable logistics in peak seasons?",
      content: "Looking for advice on how to optimize transport routes for our maize plots. Any specific tracking software or timing schedules you'd recommend?",
      tag: "Discussion",
      comments: 24
    },
    {
      id: 1002,
      author: "Farmer Joe",
      username: "farmer_joe",
      avatar: "FJ",
      time: "8h ago",
      title: "New distribution schedule for layers",
      content: "Just updated my logistics plan. I've seen a significant reduction in transport costs. Happy to share the spreadsheet if anyone is interested.",
      tag: "Showcase",
      comments: 12
    }
  ],
  2: [
    {
      id: 1003,
      author: "Business Analyst",
      username: "biz_doc",
      avatar: "BA",
      time: "2h ago",
      title: "Understanding market demand levels",
      content: "A quick guide on how to analyze and adjust to market demand for optimal revenue growth. Many farmers overlook this critical factor.",
      tag: "Research",
      comments: 8
    }
  ],
  3: [
    {
      id: 1004,
      author: "Cattle Trader",
      username: "trader_rob",
      avatar: "TR",
      time: "1d ago",
      title: "Tips for market rotation",
      content: "Managing market presence through strategic timing. It's been a game changer for my herd's sales value.",
      tag: "Business",
      comments: 15
    }
  ]
};

const mockCommunityComments: Record<number, CommunityComment[]> = {
  1001: [
    {
      id: 2001,
      author: "Logistics Expert",
      username: "log_expert",
      avatar: "LE",
      time: "2h ago",
      content: "I recommend using real-time GPS tracking for your fleet. It's much more reliable for long-term route optimization."
    }
  ]
};

export default function Channels() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [joinedChannels, setJoinedChannels] = useState<number[]>([]);
  const [allChannels, setAllChannels] = useState<Channel[]>(channels);
  
  const [communityPosts, setCommunityPosts] = useState<Record<number, CommunityPost[]>>(mockCommunityPosts);
  const [communityComments, setCommunityComments] = useState<Record<number, CommunityComment[]>>(mockCommunityComments);
  
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");

  const toggleJoin = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const isJoined = joinedChannels.includes(id);
    if (isJoined) {
      setJoinedChannels(prev => prev.filter(item => item !== id));
      toast.success("Left community");
    } else {
      setJoinedChannels(prev => [...prev, id]);
      toast.success("Joined community!");
    }
  };

  const handleUpdateChannel = (updated: Channel) => {
    setAllChannels(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedChannel(updated);
    toast.success("Channel settings updated");
  };

  const handleCreatePost = () => {
    if (!selectedChannel || !newPostTitle.trim()) return;
    const newPost: CommunityPost = {
      id: Date.now(),
      author: "Kwame Farms",
      username: currentUser.username,
      avatar: currentUser.avatar,
      time: "Just now",
      title: newPostTitle,
      content: newPostContent,
      tag: selectedChannel.tags?.[0] || "Discussion",
      comments: 0
    };
    setCommunityPosts(prev => ({
      ...prev,
      [selectedChannel.id]: [newPost, ...(prev[selectedChannel.id] || [])]
    }));
    setNewPostTitle("");
    setNewPostContent("");
    toast.success("Post published to community!");
  };

  const handleCreateComment = (postId: number) => {
    if (!newCommentContent.trim()) return;
    const newComment: CommunityComment = {
      id: Date.now(),
      author: "Kwame Farms",
      username: currentUser.username,
      avatar: currentUser.avatar,
      time: "Just now",
      content: newCommentContent
    };
    setCommunityComments(prev => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])]
    }));
    // Update comment count
    if (selectedChannel) {
      setCommunityPosts(prev => ({
        ...prev,
        [selectedChannel.id]: (prev[selectedChannel.id] || []).map(p => 
          p.id === postId ? { ...p, comments: p.comments + 1 } : p
        )
      }));
      // Also update selectedPost to reflect new comment count
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(prev => prev ? { ...prev, comments: prev.comments + 1 } : null);
      }
    }
    setNewCommentContent("");
    toast.success("Comment posted!");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedChannel ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Communities</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search communities..." className="pl-9 bg-surface/50 border-border/50" />
                </div>
              </div>

              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {allChannels.map(channel => (
                  <motion.div
                    key={channel.id}
                    variants={item}
                    onClick={() => setSelectedChannel(channel)}
                    className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all group cursor-pointer"
                  >
                    <div className="h-24 w-full relative overflow-hidden">
                      <img src={channel.banner} alt={channel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-5 relative">
                      <div className="absolute -top-8 left-5 h-16 w-16 rounded-2xl bg-background border-4 border-card flex items-center justify-center text-3xl shadow-lg">
                        {channel.icon}
                      </div>
                      <div className="pl-20">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{channel.name}</h3>
                            <p className="text-xs text-muted-foreground">{channel.slug}</p>
                          </div>
                          <Button 
                            size="sm" 
                            className={`rounded-full px-6 ${joinedChannels.includes(channel.id) ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : ''}`}
                            onClick={(e) => toggleJoin(e, channel.id)}
                          >
                            {joinedChannels.includes(channel.id) ? "Joined" : "Join"}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{channel.description}</p>
                        <div className="flex items-center gap-4 mt-4 text-xs font-medium">
                          <span className="flex items-center gap-1.5 text-primary">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            {channel.online.toLocaleString()} online
                          </span>
                          <span className="text-muted-foreground">{channel.members.toLocaleString()} members</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* List Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border/50 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Trending Now
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-start gap-3 cursor-pointer group">
                      <div className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary/30 transition-colors">{i}</div>
                      <div>
                        <p className="text-sm font-bold leading-tight group-hover:underline">Sustainable Farming Techniques</p>
                        <p className="text-xs text-muted-foreground mt-1">2.4k posts this week</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Header / Banner */}
            <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm">
              <div className="h-48 w-full relative">
                <img src={selectedChannel.banner} alt={selectedChannel.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-4 left-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40"
                  onClick={() => {
                    if (selectedPost) setSelectedPost(null);
                    else setSelectedChannel(null);
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
              <div className="px-8 pb-6 relative">
                <div className="flex items-end justify-between -mt-12 mb-4">
                  <div className="flex items-end gap-6">
                    <div className="h-24 w-24 rounded-3xl bg-background border-4 border-card flex items-center justify-center text-5xl shadow-xl">
                      {selectedChannel.icon}
                    </div>
                    <div className="pb-2">
                      <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">{selectedChannel.name}</h2>
                      <p className="text-sm font-medium text-white/70">{selectedChannel.slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className={`rounded-full px-8 h-11 font-bold ${joinedChannels.includes(selectedChannel.id) ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'bg-white text-black hover:bg-white/90'}`}
                      onClick={(e) => toggleJoin(e, selectedChannel.id)}
                    >
                      {joinedChannels.includes(selectedChannel.id) ? "Joined" : "Join Community"}
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-11 w-11 border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-6">
                {!selectedPost ? (
                  <>
                    <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Create a Post</h3>
                      <div className="space-y-3">
                        <Input 
                          placeholder="Title" 
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          className="bg-surface/50 border-border/30 h-11 font-bold" 
                        />
                        <Textarea 
                          placeholder="Text (optional)" 
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className="bg-surface/50 border-border/30 min-h-[100px]" 
                        />
                        <div className="flex justify-end pt-2">
                          <Button 
                            disabled={!newPostTitle.trim()}
                            onClick={handleCreatePost}
                            className="rounded-full px-8 font-bold"
                          >
                            Post to {selectedChannel.name}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {(communityPosts[selectedChannel.id] || []).map(post => (
                        <div 
                          key={post.id} 
                          onClick={() => setSelectedPost(post)}
                          className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm space-y-4 hover:border-primary/30 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[10px]">{post.avatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-bold">@{post.username}</span>
                            <span className="text-xs text-muted-foreground">· {post.time}</span>
                            <Badge variant="secondary" className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-0">{post.tag}</Badge>
                          </div>
                          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{post.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-6 pt-2 text-muted-foreground">
                            <div className="flex items-center gap-2 text-xs font-bold"><MessageSquare className="h-4 w-4" /> {post.comments} Comments</div>
                            <div className="flex items-center gap-2 text-xs font-bold hover:text-primary transition-colors"><Share2 className="h-4 w-4" /> Share</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    <div className="p-6 space-y-6">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{selectedPost.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold">@{selectedPost.username}</span>
                        <span className="text-xs text-muted-foreground">· {selectedPost.time}</span>
                        <Badge variant="secondary" className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-0">{selectedPost.tag}</Badge>
                      </div>
                      <h2 className="text-2xl font-black leading-tight">{selectedPost.title}</h2>
                      <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
                      
                      <div className="flex items-center gap-6 py-4 border-y border-border/20 text-muted-foreground">
                        <div className="flex items-center gap-2 text-xs font-bold"><MessageSquare className="h-4 w-4" /> {selectedPost.comments} Comments</div>
                        <div className="flex items-center gap-2 text-xs font-bold hover:text-primary transition-colors cursor-pointer"><Share2 className="h-4 w-4" /> Share</div>
                      </div>

                      {/* Comment Input */}
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-muted-foreground">Comment as @{currentUser.username}</p>
                        <Textarea 
                          placeholder="What are your thoughts?"
                          value={newCommentContent}
                          onChange={(e) => setNewCommentContent(e.target.value)}
                          className="bg-surface/50 border-border/30 min-h-[100px]"
                        />
                        <div className="flex justify-end">
                          <Button 
                            disabled={!newCommentContent.trim()}
                            onClick={() => handleCreateComment(selectedPost.id)}
                            className="rounded-full px-8 font-bold h-9"
                          >
                            Comment
                          </Button>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-6 pt-4">
                        {(communityComments[selectedPost.id] || []).map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-[10px]">{comment.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold">@{comment.username}</span>
                                <span className="text-xs text-muted-foreground">{comment.time}</span>
                              </div>
                              <p className="text-sm leading-relaxed text-foreground/90">{comment.content}</p>
                              <div className="flex gap-4 pt-2 text-muted-foreground">
                                <button className="flex items-center gap-1.5 text-[10px] font-bold hover:text-primary transition-colors"><MessageSquare className="h-3 w-3" /> Reply</button>
                                <button className="flex items-center gap-1.5 text-[10px] font-bold hover:text-primary transition-colors"><Share2 className="h-3 w-3" /> Share</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Detail Sidebar */}
              <div className="space-y-6">
                {/* About */}
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                  <div className="p-5 bg-surface/50 border-b border-border/30 flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">About Community</h3>
                    {selectedChannel.isAdmin && (
                      <AdminSettingsDialog channel={selectedChannel} onUpdate={handleUpdateChannel} />
                    )}
                  </div>
                  <div className="p-5 space-y-4">
                    <p className="text-sm leading-relaxed text-foreground/90">{selectedChannel.description}</p>
                    <div className="grid grid-cols-2 gap-4 py-2 border-y border-border/20">
                      <div>
                        <p className="text-lg font-black">{selectedChannel.members.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Members</p>
                      </div>
                      <div>
                        <p className="text-lg font-black">{selectedChannel.online.toLocaleString()}</p>
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Online</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Guidelines</p>
                      <p className="text-xs italic text-muted-foreground leading-relaxed">"{selectedChannel.guidelines}"</p>
                    </div>
                  </div>
                </div>

                {/* Rules */}
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                  <div className="p-5 bg-surface/50 border-b border-border/30">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5" /> Community Rules
                    </h3>
                  </div>
                  <div className="divide-y divide-border/20">
                    {selectedChannel.rules?.map((rule, idx) => (
                      <div key={idx} className="p-4 flex gap-3 group hover:bg-surface/30 transition-colors">
                        <span className="text-xs font-black text-muted-foreground/40 group-hover:text-primary/40 transition-colors">{idx + 1}.</span>
                        <p className="text-xs font-medium leading-normal">{rule}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
                  <div className="p-5 bg-surface/50 border-b border-border/30">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5" /> Post Tags
                    </h3>
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {selectedChannel.tags?.map(tag => (
                      <Badge key={tag} variant="outline" className="rounded-full px-3 py-1 text-[10px] font-bold border-border/50 hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdminSettingsDialog({ channel, onUpdate }: { channel: Channel, onUpdate: (c: Channel) => void }) {
  const [formData, setFormData] = useState({
    guidelines: channel.guidelines || "",
    rules: channel.rules?.join("\n") || "",
    tags: channel.tags?.join(", ") || ""
  });

  const handleSave = () => {
    onUpdate({
      ...channel,
      guidelines: formData.guidelines,
      rules: formData.rules.split("\n").filter(r => r.trim()),
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t)
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-primary/10 text-primary">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic uppercase tracking-tight">Community Management</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest">Community Guidelines</Label>
            <Textarea 
              value={formData.guidelines}
              onChange={(e) => setFormData({...formData, guidelines: e.target.value})}
              placeholder="Welcome message and general vibe..."
              className="bg-surface/50 border-border/30 min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest">Rules (One per line)</Label>
            <Textarea 
              value={formData.rules}
              onChange={(e) => setFormData({...formData, rules: e.target.value})}
              placeholder="1. Be respectful\n2. No spam..."
              className="bg-surface/50 border-border/30 min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest">Post Tags (Comma separated)</Label>
            <Input 
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="Help, Question, Success Story..."
              className="bg-surface/50 border-border/30 h-11"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full h-12 rounded-xl font-bold" onClick={handleSave}>
            Save Community Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
