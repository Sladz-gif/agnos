import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { kiwiMessages } from "@/lib/mockData";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const mockResponses = [
  "Based on your current data, I recommend increasing the feeding frequency for your broilers to 5x daily during weeks 5-7 for optimal weight gain.",
  "Your maize in Plot A shows healthy growth metrics. Current soil moisture at 42.8% is within the ideal range. No action needed.",
  "I've analyzed the market trends: tomato prices are expected to peak next week. Consider harvesting your Greenhouse 1 tomatoes soon for maximum revenue.",
  "Your layer flock's 12% production increase correlates with the calcium supplement you added 2 weeks ago. I recommend maintaining the current regimen.",
];

export default function Kiwi() {
  const [messages, setMessages] = useState<Message[]>(kiwiMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Kiwi</h2>
          <p className="text-xs text-muted-foreground">Your AI farm assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="h-7 w-7 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-card glass-border"
            }`}>
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none [&>p]:text-foreground/90 [&>p]:mb-2 [&_strong]:text-foreground [&_li]:text-foreground/90">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : msg.content}
            </div>
            {msg.role === "user" && (
              <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bot className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card glass-border rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 bg-surface/50 glass-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50"
          placeholder="Ask Kiwi anything about your farm..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
