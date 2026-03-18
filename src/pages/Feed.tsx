import { feedPosts } from "@/lib/mockData";
import { Heart, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Feed() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Feed</h2>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {feedPosts.map(post => (
          <motion.div
            key={post.id}
            variants={item}
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
      </motion.div>
    </div>
  );
}
