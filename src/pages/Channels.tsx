import { channels } from "@/lib/mockData";
import { Users, Hash, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function Channels() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Channels</h2>
        <span className="text-xs text-muted-foreground">{channels.length} communities</span>
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map(ch => (
          <motion.div
            key={ch.id}
            variants={item}
            whileHover={{ y: -2 }}
            transition={{ type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}
            className="bg-card rounded-xl p-5 shadow-layered glass-border cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Hash className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold truncate">{ch.name}</h3>
                  {ch.active && <span className="h-1.5 w-1.5 rounded-full bg-success flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ch.description}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> {ch.members.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{ch.posts} posts</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
