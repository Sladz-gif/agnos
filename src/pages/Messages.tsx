import { useState, useRef, useEffect } from "react";
import { conversations, Conversation, users } from "@/lib/userData";
import { Send, Search, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);
  const [input, setInput] = useState("");
  const [allConvos, setAllConvos] = useState(conversations);
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages]);

  const sendMessage = () => {
    if (!input.trim() || !activeConvo) return;
    const newMsg = { id: `m-${Date.now()}`, sender: "me" as const, content: input, time: "Just now" };
    const updated = allConvos.map(c =>
      c.id === activeConvo.id
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: input, time: "Just now", unread: 0 }
        : c
    );
    setAllConvos(updated);
    setActiveConvo(updated.find(c => c.id === activeConvo.id)!);
    setInput("");
  };

  const filtered = allConvos.filter(c =>
    c.user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-10rem)]">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>

      <div className="flex h-[calc(100%-2.5rem)] bg-card rounded-xl shadow-layered glass-border overflow-hidden">
        {/* Conversation List */}
        <div className={`w-full md:w-80 flex-shrink-0 border-r border-border/30 flex flex-col ${
          activeConvo ? "hidden md:flex" : "flex"
        }`}>
          {/* Search */}
          <div className="p-3 border-b border-border/30">
            <div className="flex items-center gap-2 bg-surface/50 glass-border rounded-lg px-3 py-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                placeholder="Search conversations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(convo => (
              <button
                key={convo.id}
                onClick={() => setActiveConvo(convo)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border/20 ${
                  activeConvo?.id === convo.id ? "bg-primary/5" : "hover:bg-surface-hover/50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {convo.user.avatar}
                  </div>
                  {convo.user.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">@{convo.user.username}</p>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{convo.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {convo.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!activeConvo ? "hidden md:flex" : "flex"}`}>
          {activeConvo ? (
            <>
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-border/30 flex items-center gap-3">
                <button
                  onClick={() => setActiveConvo(null)}
                  className="md:hidden text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {activeConvo.user.avatar}
                  </div>
                  {activeConvo.user.online && (
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-success border-2 border-card" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">@{activeConvo.user.username}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {activeConvo.user.online ? "Online" : "Offline"} · {activeConvo.user.location}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConvo.messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface glass-border"
                    }`}>
                      <p>{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${
                        msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}>{msg.time}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/30 flex gap-2">
                <input
                  className="flex-1 bg-surface/50 glass-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50"
                  placeholder="Type a message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 rounded-2xl bg-surface/50 glass-border flex items-center justify-center mx-auto mb-4">
                  <Send className="h-7 w-7 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
