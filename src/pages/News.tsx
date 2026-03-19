import { useState, useMemo } from "react";
import { newsArticles, NewsArticle, NewsComment } from "@/lib/mockData";
import { Clock, User, ArrowRight, Share2, Bookmark, MessageCircle, ChevronLeft, Calendar, Tag, ThumbsUp, Send, Flag, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [likedArticles, setLikedArticles] = useState<number[]>([]);
  const [comments, setComments] = useState<Record<number, NewsComment[]>>({});
  const [newComment, setNewComment] = useState("");
  const [focusComments, setFocusComments] = useState(false);

  const categories = useMemo(() => ["All", ...new Set(newsArticles.map(a => a.category))], []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return newsArticles;
    return newsArticles.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  const mainArticle = filteredArticles[0] || newsArticles[0];
  const secondaryArticles = filteredArticles.slice(1);

  const handleArticleClick = (article: NewsArticle, shouldFocusComments = false) => {
    setSelectedArticle(article);
    setFocusComments(shouldFocusComments);
  };

  const handleSubscribe = () => {
    toast.success("Subscribed!", { description: "You'll receive our daily agriculture insights in your inbox." });
  };

  const handleAction = (action: string) => {
    toast.info(`${action} Clicked`, { description: "This feature is coming soon to the Gazette." });
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {
        toast.success("Link copied!", { description: "You can now share this article." });
      });
    } else {
      toast.success("Link copied!", { description: "You can now share this article." });
    }
  };

  const toggleLike = (id: number) => {
    if (likedArticles.includes(id)) {
      setLikedArticles(likedArticles.filter(aid => aid !== id));
      toast.info("Unliked article");
    } else {
      setLikedArticles([...likedArticles, id]);
      toast.success("Liked article!");
    }
  };

  const handleAddComment = (articleId: number) => {
    if (!newComment.trim()) return;
    
    const comment: NewsComment = {
      id: Date.now(),
      user: "Current User",
      avatar: "CU",
      content: newComment,
      date: "Just now",
      likes: 0
    };

    setComments(prev => {
      const existing = prev[articleId] || newsArticles.find(a => a.id === articleId)?.comments || [];
      return {
        ...prev,
        [articleId]: [comment, ...existing]
      };
    });
    setNewComment("");
    toast.success("Comment posted!");
  };

  const handleLikeComment = (articleId: number, commentId: number) => {
    setComments(prev => {
      const articleComments = prev[articleId] || newsArticles.find(a => a.id === articleId)?.comments || [];
      return {
        ...prev,
        [articleId]: articleComments.map(c => 
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        )
      };
    });
    toast.success("Liked comment!");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header - NYT Style */}
      <header className="text-center space-y-4 border-b-2 border-foreground pb-8 pt-4">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Agnos Gazette
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">
          <span>Wednesday, March 18, 2026</span>
          <Separator orientation="vertical" className="hidden md:block h-4 bg-border/50" />
          <span>Daily Agriculture Edition</span>
          <Separator orientation="vertical" className="hidden md:block h-4 bg-border/50" />
          <span className="text-primary">Global News Hub</span>
        </div>
      </header>

      {/* Categories Filter - Modern Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="w-full h-auto flex flex-wrap gap-3 bg-transparent p-0 border-b-2 border-foreground pb-6">
          {categories.map((cat) => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-12">
          {/* Top Section: Featured + Latest Column */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Story */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="group cursor-pointer space-y-6"
                onClick={() => handleArticleClick(mainArticle)}
              >
                <div className="aspect-[16/9] overflow-hidden rounded-sm relative shadow-2xl">
                  <img 
                    src={mainArticle.image} 
                    alt={mainArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-6 left-6 bg-primary text-primary-foreground rounded-none uppercase tracking-widest text-[10px] py-1.5 px-4 font-black">
                    Featured Story
                  </Badge>
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter group-hover:text-primary transition-colors">
                    {mainArticle.title}
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-serif italic border-l-4 border-primary/30 pl-6 py-1">
                    "{mainArticle.excerpt}"
                  </p>
                  <div className="flex items-center gap-6 text-xs font-black text-muted-foreground uppercase tracking-widest pt-2">
                    <span className="flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {mainArticle.author}</span>
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {mainArticle.readTime}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Side Column: Latest Updates */}
            <div className="lg:col-span-4 space-y-8 border-t lg:border-t-0 lg:border-l border-border/50 pt-8 lg:pt-0 lg:pl-12">
              <div className="flex items-center justify-between border-b-2 border-foreground pb-2">
                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Latest Updates</h3>
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="space-y-10">
                {secondaryArticles.map(article => (
                  <div 
                    key={article.id} 
                    className="group cursor-pointer space-y-3"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest">{article.category}</span>
                      <Separator className="flex-1 bg-border/30" />
                    </div>
                    <h4 className="text-xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-primary transition-all">
                      {article.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-serif italic">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{article.date}</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleAction("Bookmark"); }}><Bookmark className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleShare(article.title); }}><Share2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-card p-8 rounded-sm border-2 border-foreground space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500" />
                <h4 className="font-black text-2xl tracking-tighter uppercase italic relative z-10">Agnos Insight</h4>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">Get the latest agricultural trends and market reports delivered to your inbox every morning.</p>
                <Button className="w-full font-black uppercase tracking-widest rounded-none h-12 relative z-10" onClick={handleSubscribe}>Subscribe Now</Button>
              </div>
            </div>
          </section>

          <Separator className="bg-foreground/10 h-[1px] my-12" />

          {/* Grid News Section */}
          <section className="space-y-10">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <h3 className="text-3xl font-black uppercase tracking-tighter italic">Deep Dives & Analysis</h3>
              <Button variant="outline" className="font-black uppercase tracking-widest text-[10px] h-8 rounded-none gap-2" onClick={() => handleAction("Archive")}>
                View Archive <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
            <motion.div 
              variants={container} 
              initial="hidden" 
              animate="show" 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {filteredArticles.map(article => (
                <motion.div 
                  key={article.id} 
                  variants={item} 
                  className="group cursor-pointer space-y-5"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="aspect-[3/2] overflow-hidden rounded-sm border border-border/30 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest rounded-none px-2 py-0.5 border-primary text-primary">
                        {article.category}
                      </Badge>
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{article.readTime}</span>
                    </div>
                    <h4 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">{article.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3 font-serif leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest pt-2">
                      <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); handleArticleClick(article, true); }}><MessageCircle className="h-3 w-3" /> 12 Comments</span>
                      <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); handleShare(article.title); }}><Share2 className="h-3 w-3" /> Share</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </Tabs>

      {/* Footer Section */}
      <footer className="border-t-4 border-foreground pt-12 mt-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic">Agnos Gazette</h2>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            The world's leading source for agricultural news, market analysis, and sustainable farming innovations. Serving the global farming community since 2024.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-black uppercase tracking-widest text-xs">Categories</h4>
          <ul className="space-y-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            {categories.filter(c => c !== "All").map(cat => (
              <li key={cat} className="hover:text-primary cursor-pointer" onClick={() => setActiveCategory(cat)}>{cat}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-black uppercase tracking-widest text-xs">Legal</h4>
          <ul className="space-y-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">
            <li className="hover:text-primary cursor-pointer" onClick={() => handleAction("Privacy Policy")}>Privacy Policy</li>
            <li className="hover:text-primary cursor-pointer" onClick={() => handleAction("Terms of Service")}>Terms of Service</li>
            <li className="hover:text-primary cursor-pointer" onClick={() => handleAction("Cookie Policy")}>Cookie Policy</li>
            <li className="hover:text-primary cursor-pointer" onClick={() => handleAction("Ethics Code")}>Ethics Code</li>
          </ul>
        </div>
      </footer>

      {/* Article Detail View Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
            <DialogContent className="max-w-4xl h-[95vh] p-0 overflow-hidden bg-card border-none rounded-none flex flex-col">
              <ScrollArea className="flex-1 overflow-x-hidden">
                <div className="p-6 md:p-12 space-y-10">
                  {/* Article Header */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setSelectedArticle(null)}
                        className="p-0 hover:bg-transparent text-primary font-black uppercase tracking-widest text-[10px]"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Gazette
                      </Button>
                      <Separator orientation="vertical" className="h-4" />
                      <Badge className="rounded-none bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[10px]">
                        {selectedArticle.category}
                      </Badge>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tighter">
                      {selectedArticle.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-muted-foreground font-serif italic border-l-4 border-primary/30 pl-6">
                      {selectedArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-y-4 gap-x-8 border-y border-border/50 py-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 rounded-full border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-black">
                            {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-black uppercase tracking-widest">{selectedArticle.author}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{selectedArticle.authorRole || 'Contributor'}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {selectedArticle.date}</span>
                        <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {selectedArticle.readTime}</span>
                        <span className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => toggleLike(selectedArticle.id)}>
                          <ThumbsUp className={`h-4 w-4 ${likedArticles.includes(selectedArticle.id) ? "fill-primary text-primary" : ""}`} /> 
                          {selectedArticle.likes + (likedArticles.includes(selectedArticle.id) ? 1 : 0)}
                        </span>
                      </div>
                      <div className="flex-1 flex justify-end gap-2">
                        <Button variant="outline" size="icon" className="rounded-none" onClick={() => handleAction("Bookmark")}><Bookmark className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" className="rounded-none" onClick={() => handleShare(selectedArticle.title)}><Share2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </div>

                  {/* Article Hero Image */}
                  <div className="aspect-[21/9] overflow-hidden rounded-sm shadow-xl relative group">
                    <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/20 rounded-none font-black uppercase tracking-widest text-xs" onClick={() => handleAction("View Gallery")}>
                        View Full Gallery
                      </Button>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                      <div 
                        className="prose prose-invert prose-lg max-w-none font-serif leading-relaxed text-foreground/90 
                        prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:italic
                        prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                        prose-strong:text-primary prose-a:text-primary"
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                      />
                      
                      {/* Author Bio Section */}
                      <div className="p-8 bg-surface/50 border-2 border-foreground/10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <Avatar className="h-24 w-24 rounded-none border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                          <AvatarFallback className="bg-primary text-primary-foreground font-black text-2xl">
                            {selectedArticle.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-4 flex-1">
                          <div className="space-y-1">
                            <h4 className="text-2xl font-black uppercase tracking-tighter italic">{selectedArticle.author}</h4>
                            <p className="text-primary font-black uppercase tracking-widest text-[10px]">{selectedArticle.authorRole}</p>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                            {selectedArticle.authorBio || "A dedicated contributor to Agnos Gazette, bringing years of expertise in global agriculture and sustainable practices."}
                          </p>
                          <div className="flex gap-4">
                            <Button variant="link" className="p-0 h-auto font-black uppercase tracking-widest text-[10px] text-primary" onClick={() => handleAction("Author Profile")}>Follow Author</Button>
                            <Button variant="link" className="p-0 h-auto font-black uppercase tracking-widest text-[10px] text-primary" onClick={() => handleAction("Author Articles")}>More by this author</Button>
                          </div>
                        </div>
                      </div>

                      {/* Comments Section */}
                      <div className="space-y-8 pt-12 border-t border-border/50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
                            <MessageCircle className="h-6 w-6 text-primary" /> 
                            Comments 
                            <span className="text-sm not-italic font-black text-muted-foreground ml-2">
                              ({(comments[selectedArticle.id] || selectedArticle.comments).length})
                            </span>
                          </h4>
                          <Button variant="ghost" size="sm" className="font-black uppercase tracking-widest text-[10px]" onClick={() => handleAction("Sort Comments")}>
                            Sort By <MoreHorizontal className="ml-2 h-4 w-4" />
                          </Button>
                        </div>

                        {/* Comment Input */}
                        <div className="flex gap-4 p-6 bg-surface/30 border-2 border-foreground/5">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-muted font-black text-xs">CU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Input 
                              placeholder="Add a comment..." 
                              className="rounded-none border-2 border-foreground/10 bg-background h-12 focus:border-primary transition-all font-medium"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(selectedArticle.id)}
                              autoFocus={focusComments}
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" className="rounded-none font-black uppercase tracking-widest text-[10px]" onClick={() => setNewComment("")}>Cancel</Button>
                              <Button className="rounded-none font-black uppercase tracking-widest text-[10px] gap-2 px-6" onClick={() => handleAddComment(selectedArticle.id)}>
                                Post Comment <Send className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Comment List */}
                        <div className="space-y-6">
                          {(comments[selectedArticle.id] || selectedArticle.comments).map(comment => (
                            <div key={comment.id} className="flex gap-4 group">
                              <Avatar className="h-10 w-10 shrink-0">
                                <AvatarFallback className="bg-primary/5 text-primary font-black text-xs border border-primary/10">
                                  {comment.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <span className="font-black text-xs uppercase tracking-widest">{comment.user}</span>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{comment.date}</span>
                                </div>
                                <p className="text-sm leading-relaxed font-medium text-foreground/80">
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-6 pt-1">
                                  <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" onClick={() => handleLikeComment(selectedArticle.id, comment.id)}>
                                    <ThumbsUp className="h-3 w-3" /> {comment.likes}
                                  </button>
                                  <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" onClick={() => handleAction("Reply")}>
                                    Reply
                                  </button>
                                  <button className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100" onClick={() => handleAction("Report Comment")}>
                                    <Flag className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags Section */}
                      <div className="pt-12 border-t border-border/50 flex flex-wrap gap-2">
                        <span className="w-full text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Tag className="h-3 w-3" /> Topics in this story
                        </span>
                        {selectedArticle.tags?.map(tag => (
                          <Badge key={tag} variant="secondary" className="rounded-none font-black uppercase tracking-widest text-[9px] px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors" onClick={() => { setActiveCategory("All"); setSelectedArticle(null); }}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Modal Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                      <div className="sticky top-0 space-y-8">
                        <div className="p-6 bg-surface/50 border-2 border-foreground space-y-4">
                          <h4 className="font-black uppercase tracking-widest text-xs">Share this story</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="rounded-none font-black text-[10px] uppercase" onClick={() => handleAction("Twitter")}>Twitter</Button>
                            <Button variant="outline" className="rounded-none font-black text-[10px] uppercase" onClick={() => handleAction("LinkedIn")}>LinkedIn</Button>
                          </div>
                          <Button className="w-full rounded-none font-black text-[10px] uppercase h-10" onClick={() => handleShare(selectedArticle.title)}>Copy Link</Button>
                        </div>

                        <div className="space-y-6">
                          <h4 className="font-black uppercase tracking-widest text-xs border-b-2 border-foreground pb-2">Related News</h4>
                          <div className="space-y-6">
                            {newsArticles.filter(a => a.id !== selectedArticle.id).slice(0, 2).map(related => (
                              <div 
                                key={related.id} 
                                className="group cursor-pointer space-y-2"
                                onClick={() => handleArticleClick(related)}
                              >
                                <span className="text-[9px] font-black text-primary uppercase tracking-widest">{related.category}</span>
                                <h5 className="font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{related.title}</h5>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{related.readTime}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
