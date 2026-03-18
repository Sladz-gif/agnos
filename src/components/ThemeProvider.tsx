import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeName = "midnight" | "aurora" | "ember" | "ocean" | "frost";

interface ThemeInfo {
  name: ThemeName;
  label: string;
  description: string;
  preview: [string, string, string]; // 3 colors for the preview swatch
}

export const themes: ThemeInfo[] = [
  { name: "midnight", label: "Midnight", description: "Deep navy & indigo", preview: ["#0B0F1A", "#6366F1", "#22D3EE"] },
  { name: "aurora", label: "Aurora", description: "Violet & emerald glow", preview: ["#0F0B1A", "#A855F7", "#34D399"] },
  { name: "ember", label: "Ember", description: "Dark with warm amber", preview: ["#1A110B", "#F59E0B", "#EF4444"] },
  { name: "ocean", label: "Ocean", description: "Deep teal & sapphire", preview: ["#071318", "#0EA5E9", "#06B6D4"] },
  { name: "frost", label: "Frost", description: "Clean light interface", preview: ["#F8FAFC", "#3B82F6", "#8B5CF6"] },
];

const ThemeContext = createContext<{
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}>({ theme: "midnight", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    return (localStorage.getItem("agnos-theme") as ThemeName) || "midnight";
  });

  useEffect(() => {
    localStorage.setItem("agnos-theme", theme);
    const root = document.documentElement;
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(`theme-${t.name}`));
    // Add current (midnight is default/:root, so no class needed)
    if (theme !== "midnight") {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
