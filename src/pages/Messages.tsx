import { useState, useRef, useEffect, useMemo } from "react";
import { conversations, Conversation } from "@/lib/userData";
import { Send, Search, ArrowLeft, MoreVertical, Paperclip, Smile, Check, CheckCheck, Bot, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

export default function Messages() {
  const { state: sidebarState, isMobile } = useSidebar();
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [allConvos, setAllConvos] = useState(conversations);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Use dynamic sidebar width
  const sidebarWidth = useMemo(() => {
    if (isMobile) return "0px";
    return sidebarState === "expanded" ? "16rem" : "3rem";
  }, [sidebarState, isMobile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages]);

  const sendMessage = () => {
    if (!input.trim() || !activeConvo) return;
    const newMsg = { 
      id: `m-${Date.now()}`, 
      sender: "me" as const, 
      content: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-numeric', minute: '2-numeric' }) 
    };
    const updated = allConvos.map(c =>
      c.id === activeConvo.id
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: input, time: "Just now", unread: 0 }
        : c
    );
    setAllConvos(updated);
    const newActive = updated.find(c => c.id === activeConvo.id)!;
    setActiveConvo(newActive);
    setInput("");
    
    // Reset textarea height
    const textarea = document.querySelector('textarea');
    if (textarea) textarea.style.height = 'auto';
  };

  const filtered = allConvos.filter(c =>
    c.user.username.toLowerCase().includes(search.toLowerCase()) ||
    c.user.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 top-14 bg-background flex overflow-hidden z-10 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-[320px] lg:w-[400px] flex-shrink-0 border-r border-border/10 flex flex-col bg-card/20 backdrop-blur-md ${
        activeConvo ? "hidden md:flex" : "flex"
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 space-y-4 border-b border-border/5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">Messages</h2>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              className="pl-11 h-11 bg-surface/30 border-none rounded-2xl focus-visible:ring-2 focus-visible:ring-primary/10 transition-all placeholder:text-muted-foreground/30 text-sm font-medium"
              placeholder="Search contacts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5 custom-scrollbar">
          {filtered.map(convo => (
            <button
              key={convo.id}
              onClick={() => setActiveConvo(convo)}
              className={`w-full flex items-center gap-3.5 p-3.5 rounded-3xl transition-all duration-200 group relative ${
                activeConvo?.id === convo.id 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10" 
                  : "hover:bg-primary/5 active:scale-[0.98]"
              }`}
            >
              <div className="relative flex-shrink-0">
                <Avatar className={`h-14 w-14 border-2 transition-transform duration-300 group-hover:scale-105 ${activeConvo?.id === convo.id ? "border-primary-foreground/30 shadow-inner" : "border-transparent"}`}>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${convo.user.username}`} />
                  <AvatarFallback className="bg-primary/10 font-black text-primary text-lg">
                    {convo.user.avatar}
                  </AvatarFallback>
                </Avatar>
                {convo.user.online && (
                  <span className={`absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 transition-colors ${
                    activeConvo?.id === convo.id ? "bg-white border-primary" : "bg-success border-card"
                  }`} />
                )}
              </div>
              
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-base font-black truncate tracking-tight">
                    {convo.user.fullName || `@${convo.user.username}`}
                  </p>
                  <span className={`text-[10px] font-bold flex-shrink-0 uppercase tracking-widest ${activeConvo?.id === convo.id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {convo.time}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-[13px] truncate font-medium ${activeConvo?.id === convo.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {convo.lastMessage}
                  </p>
                  {convo.unread > 0 && activeConvo?.id !== convo.id && (
                    <span className="h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center px-1.5 shadow-md border-2 border-background animate-in zoom-in-50 duration-300">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col relative bg-surface/5 overflow-hidden ${!activeConvo ? "hidden md:flex" : "flex"}`}>
        {activeConvo ? (
          <>
            {/* Chat Header */}
            <div className="h-20 px-4 border-b border-border/5 flex items-center justify-between bg-card/40 backdrop-blur-xl sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveConvo(null)}
                  className="md:hidden -ml-2 rounded-full hover:bg-primary/10"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                
                <div className="relative group cursor-pointer">
                  <Avatar className="h-12 w-12 border-2 border-primary/5 group-hover:border-primary/20 transition-all duration-300 group-hover:scale-105">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConvo.user.username}`} />
                    <AvatarFallback className="bg-primary/10 font-black text-primary">
                      {activeConvo.user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {activeConvo.user.online && (
                    <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
                  )}
                </div>
                
                <div className="min-w-0">
                  <p className="text-lg font-black uppercase italic tracking-tight truncate leading-none mb-1.5">
                    {activeConvo.user.fullName || `@${activeConvo.user.username}`}
                  </p>
                  <div className="flex items-center gap-2">
                    {activeConvo.user.online ? (
                      <p className="text-[10px] font-black text-success uppercase tracking-widest flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> online
                      </p>
                    ) : (
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        last seen recently
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex hover:bg-primary/5">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5">
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar relative bg-[#0f0f12]">
              {/* Telegram-style Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://w0.peakpx.com/wallpaper/508/606/wallpaper-for-telegram-chat-background.jpg')] bg-repeat" />
              
              <AnimatePresence initial={false}>
                {activeConvo.messages.map((msg, idx) => {
                  const isLastInGroup = idx === activeConvo.messages.length - 1 || activeConvo.messages[idx+1].sender !== msg.sender;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} items-end gap-3 relative z-10`}
                    >
                      {msg.sender !== "me" && (
                        <Avatar className="h-8 w-8 border border-primary/5 mb-1 flex-shrink-0">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConvo.user.username}`} />
                          <AvatarFallback className="text-[10px] font-black">{activeConvo.user.avatar}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`relative max-w-[85%] md:max-w-[70%] group shadow-sm ${
                        msg.sender === "me" 
                          ? `bg-primary text-primary-foreground rounded-[20px] ${isLastInGroup ? 'rounded-br-none' : ''}` 
                          : `bg-card/90 glass-border rounded-[20px] ${isLastInGroup ? 'rounded-bl-none' : ''}`
                      } px-5 py-3`}>
                        {/* Message Tail */}
                        {isLastInGroup && (
                          <div className={`absolute bottom-0 w-3.5 h-3.5 ${
                            msg.sender === "me" 
                              ? "-right-1 text-primary" 
                              : "-left-1 text-card/90"
                          }`}>
                            <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                              {msg.sender === "me" ? (
                                <path d="M0 20C10 20 12 8 20 0H0V20Z" />
                              ) : (
                                <path d="M20 20C10 20 8 8 0 0H20V20Z" />
                              )}
                            </svg>
                          </div>
                        )}
                        
                        <p className="text-[15px] leading-relaxed font-medium">
                          {msg.content}
                        </p>
                        <div className={`flex items-center justify-end gap-1.5 mt-1.5 ${
                          msg.sender === "me" ? "text-primary-foreground/50" : "text-muted-foreground/50"
                        }`}>
                          <span className="text-[9px] font-black uppercase tracking-tighter">{msg.time}</span>
                          {msg.sender === "me" && (
                            <CheckCheck className="h-3 w-3" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={bottomRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-card/20 backdrop-blur-xl border-t border-border/5 sticky bottom-0 z-20">
              <div className="max-w-4xl mx-auto flex items-end gap-3 md:gap-5">
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0 mb-1.5 hover:bg-primary/5 h-11 w-11">
                  <Paperclip className="h-6 w-6 text-muted-foreground/60" />
                </Button>
                
                <div className="flex-1 relative flex items-center bg-surface/20 rounded-[24px] glass-border px-2 py-1 transition-all focus-within:ring-2 focus-within:ring-primary/10">
                  <textarea
                    className="w-full bg-transparent px-4 py-3 pr-12 text-[15px] font-medium outline-none placeholder:text-muted-foreground/20 resize-none max-h-48 custom-scrollbar"
                    placeholder="Message..."
                    rows={1}
                    value={input}
                    onChange={e => {
                      setInput(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 192) + 'px';
                    }}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="absolute right-2 bottom-2 rounded-full hover:bg-primary/5 h-9 w-9">
                    <Smile className="h-6 w-6 text-muted-foreground/60" />
                  </Button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className={`h-12 w-12 rounded-full flex items-center justify-center transition-all flex-shrink-0 mb-1.5 ${
                    input.trim() 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "bg-surface/10 text-muted-foreground/20 cursor-not-allowed"
                  }`}
                >
                  <Send className={`h-5 w-5 ${input.trim() ? "translate-x-0.5 -translate-y-0.5" : ""}`} />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 bg-[#0f0f12] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://w0.peakpx.com/wallpaper/508/606/wallpaper-for-telegram-chat-background.jpg')] bg-repeat" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center gap-4"
            >
              <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                <MessageSquare className="h-10 w-10 text-primary/40" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
                Select a chat to start
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
