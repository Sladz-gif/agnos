import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageSquare, BarChart3, History } from "lucide-react";
import { kiwiMessages } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses = [
  "Based on your current data, I recommend optimizing your distribution routes to Kumasi for a 15% reduction in transport costs.",
  "Your maize in Plot A is ready for the next phase of the logistics cycle. Market demand is high this week.",
  "I've analyzed the market trends: tomato prices are expected to peak next week. Consider your transport availability for maximum revenue.",
  "Your layer flock's 12% production increase correlates with the new inventory management system. I recommend maintaining the current logistical regimen.",
];

export default function Kiwi() {
  const [messages, setMessages] = useState<Message[]>(kiwiMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)]
      }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Kiwi AI</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Your Intelligence Partner</p>
          </div>
        </div>
        <Badge className="bg-primary/10 text-primary border-none rounded-none font-black uppercase tracking-widest text-[10px] px-3 py-1">v2.4 Neural</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full h-auto flex flex-wrap gap-3 bg-transparent p-0 border-b-2 border-foreground pb-6">
          <TabsTrigger value="chat" className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6">
            <MessageSquare className="h-4 w-4 mr-2" /> Neural Chat
          </TabsTrigger>
          <TabsTrigger value="analysis" className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6">
            <BarChart3 className="h-4 w-4 mr-2" /> Data Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-none border-2 border-foreground bg-surface data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=active]:shadow-none data-[state=active]:translate-x-[2px] data-[state=active]:translate-y-[2px] transition-all font-black uppercase tracking-widest text-[10px] h-12 px-6">
            <History className="h-4 w-4 mr-2" /> Session History
          </TabsTrigger>
        </TabsList>

        <div className="mt-10 min-h-[60vh] flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === "chat" && (
              <motion.div key="chat" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col flex-1">
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="h-10 w-10 rounded-none border-2 border-foreground bg-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-none border-2 border-foreground p-4 text-sm leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        msg.role === "user"
                          ? "bg-surface"
                          : "bg-card"
                      }`}>
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none font-bold italic [&>p]:text-foreground/90 [&>p]:mb-2 [&_strong]:text-primary [&_li]:text-foreground/90">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="font-black italic">{msg.content}</p>
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="h-10 w-10 rounded-none border-2 border-foreground bg-foreground flex items-center justify-center flex-shrink-0 mt-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <User className="h-5 w-5 text-background" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {typing && (
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-none border-2 border-foreground bg-primary flex items-center justify-center flex-shrink-0 animate-pulse shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-card border-2 border-foreground rounded-none p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="flex gap-3 mt-auto sticky bottom-0 bg-background pt-4">
                  <input
                    className="flex-1 bg-surface border-2 border-foreground rounded-none px-6 py-4 text-sm font-bold outline-none focus:border-primary transition-all placeholder:text-muted-foreground/50"
                    placeholder="Ask Kiwi anything about your farm..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && send()}
                  />
                  <button
                    onClick={send}
                    className="h-14 w-14 rounded-none border-2 border-foreground bg-primary flex items-center justify-center text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "analysis" && (
              <motion.div key="analysis" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-primary/5">
                  <CardContent className="p-8 text-center space-y-4">
                    <BarChart3 className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">AI-Driven Insights</h3>
                    <p className="text-sm font-medium text-muted-foreground max-w-md mx-auto">Kiwi is processing your farm's historical data to generate predictive yield analysis. This feature will be available in the next update.</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div key="history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 border-2 border-foreground bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <History className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-black uppercase italic text-sm">Session #{1024 + i}</p>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">March {18 - i}, 2026 · 14:20 PM</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="rounded-none border-foreground/20 font-black uppercase text-[8px]">View</Badge>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
