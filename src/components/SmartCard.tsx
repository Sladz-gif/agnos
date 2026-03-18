import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  sparkline?: number[];
}

export function SmartCard({ label, value, trend, trendUp = true, icon: Icon, sparkline }: Props) {
  const points = sparkline || [20, 40, 30, 50, 45, 60, 55, 70];
  const max = Math.max(...points);
  const svgPath = points.map((p, i) => `${(i / (points.length - 1)) * 100},${100 - (p / max) * 80}`).join(" ");

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}
      className="bg-card p-5 rounded-xl shadow-layered glass-border glow-pulse relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <h2 className="text-2xl md:text-3xl font-mono font-semibold">{value}</h2>
      {trend && (
        <span className={`inline-flex items-center text-xs font-medium mt-2 px-2 py-0.5 rounded-full ${
          trendUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
        }`}>
          {trend}
        </span>
      )}
      <div className="mt-4 h-12 w-full opacity-30">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            points={svgPath}
          />
          <polygon
            fill={`url(#grad-${label})`}
            points={`0,100 ${svgPath} 100,100`}
          />
        </svg>
      </div>
    </motion.div>
  );
}
