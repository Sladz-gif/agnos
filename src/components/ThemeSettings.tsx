import { Check } from "lucide-react";
import { useTheme, themes } from "@/components/ThemeProvider";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-1">Theme Selection</h3>
        <p className="text-xs text-muted-foreground mb-4">Choose a color palette that fits your style.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {themes.map(t => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all border-2 ${
              theme === t.name 
                ? "bg-primary/5 border-primary shadow-sm" 
                : "bg-surface/50 border-transparent hover:border-border/50 hover:bg-surface"
            }`}
          >
            <div className="flex -space-x-1 flex-shrink-0">
              {t.preview.map((color, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full border-2 border-card shadow-sm"
                  style={{ backgroundColor: color, zIndex: 3 - i }}
                />
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none mb-1">{t.label}</p>
              <p className="text-[10px] text-muted-foreground truncate">{t.description}</p>
            </div>
            {theme === t.name && (
              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
