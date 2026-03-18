import { Palette, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTheme, themes } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 bg-card border-border/50 shadow-layered" align="end">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Theme</p>
        <div className="space-y-1">
          {themes.map(t => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                theme === t.name ? "bg-primary/10" : "hover:bg-surface-hover"
              }`}
            >
              <div className="flex -space-x-1">
                {t.preview.map((color, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 rounded-full border-2 border-card"
                    style={{ backgroundColor: color, zIndex: 3 - i }}
                  />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-[11px] text-muted-foreground">{t.description}</p>
              </div>
              {theme === t.name && (
                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
