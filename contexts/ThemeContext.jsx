import { createContext, useContext, useState, useCallback } from "react";

export const THEMES = {
  dark: {
    name: "dark",
    label: "ダーク",
    preview: "#1a1f1c",
    colors: {
      background: "#111916",
      foreground: "#edf0ed",
      card: "#1a221d",
      cardForeground: "#edf0ed",
      primary: "#4ade80",
      primaryForeground: "#0a1510",
      secondary: "#252d28",
      secondaryForeground: "#c4ccc6",
      muted: "#1f2722",
      mutedForeground: "#7d877f",
      border: "#2e3830",
      input: "#252d28",
      destructive: "#ef4444",
      destructiveForeground: "#fecaca",
      navBg: "rgba(17, 25, 22, 0.92)",
      navBorder: "rgba(46, 56, 48, 0.5)",
      navInactive: "#5c665e",
      amber: "#f59e0b",
      amberBg: "rgba(245, 158, 11, 0.15)",
      amberBorder: "rgba(245, 158, 11, 0.3)",
      redBg: "rgba(239, 68, 68, 0.15)",
      redBorder: "rgba(239, 68, 68, 0.3)",
      primaryBg: "rgba(74, 222, 128, 0.15)",
      primaryBorder: "rgba(74, 222, 128, 0.3)",
      primaryGlow: "rgba(74, 222, 128, 0.4)",
    },
  },
  light: {
    name: "light",
    label: "ライト",
    preview: "#f5f7f5",
    colors: {
      background: "#f5f7f5",
      foreground: "#1a2420",
      card: "#ffffff",
      cardForeground: "#1a2420",
      primary: "#16a34a",
      primaryForeground: "#ffffff",
      secondary: "#ecf0ec",
      secondaryForeground: "#3a4a3e",
      muted: "#ecf0ec",
      mutedForeground: "#647068",
      border: "#dce2dc",
      input: "#ecf0ec",
      destructive: "#dc2626",
      destructiveForeground: "#fecaca",
      navBg: "rgba(255, 255, 255, 0.88)",
      navBorder: "rgba(220, 226, 220, 0.6)",
      navInactive: "#647068",
      amber: "#d97706",
      amberBg: "rgba(217, 119, 6, 0.15)",
      amberBorder: "rgba(217, 119, 6, 0.3)",
      redBg: "rgba(220, 38, 38, 0.15)",
      redBorder: "rgba(220, 38, 38, 0.3)",
      primaryBg: "rgba(22, 163, 74, 0.15)",
      primaryBorder: "rgba(22, 163, 74, 0.3)",
      primaryGlow: "rgba(22, 163, 74, 0.4)",
    },
  },
  field: {
    name: "field",
    label: "フィールド",
    preview: "#0d2818",
    colors: {
      background: "#0a1f12",
      foreground: "#e8efe8",
      card: "#102818",
      cardForeground: "#e5ece5",
      primary: "#86efac",
      primaryForeground: "#052010",
      secondary: "#183020",
      secondaryForeground: "#b8c8ba",
      muted: "#152818",
      mutedForeground: "#6a8a6e",
      border: "#204830",
      input: "#183020",
      destructive: "#ef4444",
      destructiveForeground: "#fecaca",
      navBg: "rgba(10, 31, 18, 0.92)",
      navBorder: "rgba(32, 72, 48, 0.5)",
      navInactive: "#4a6a4e",
      amber: "#f59e0b",
      amberBg: "rgba(245, 158, 11, 0.15)",
      amberBorder: "rgba(245, 158, 11, 0.3)",
      redBg: "rgba(239, 68, 68, 0.15)",
      redBorder: "rgba(239, 68, 68, 0.3)",
      primaryBg: "rgba(134, 239, 172, 0.15)",
      primaryBorder: "rgba(134, 239, 172, 0.3)",
      primaryGlow: "rgba(134, 239, 172, 0.4)",
    },
  },
  midnight: {
    name: "midnight",
    label: "ミッドナイト",
    preview: "#101828",
    colors: {
      background: "#0c1424",
      foreground: "#e8ecf2",
      card: "#121c30",
      cardForeground: "#e5eaf0",
      primary: "#38bdf8",
      primaryForeground: "#082040",
      secondary: "#182840",
      secondaryForeground: "#b8c8e0",
      muted: "#152238",
      mutedForeground: "#6880a0",
      border: "#203050",
      input: "#182840",
      destructive: "#ef4444",
      destructiveForeground: "#fecaca",
      navBg: "rgba(12, 20, 36, 0.92)",
      navBorder: "rgba(32, 48, 80, 0.5)",
      navInactive: "#486080",
      amber: "#f59e0b",
      amberBg: "rgba(245, 158, 11, 0.15)",
      amberBorder: "rgba(245, 158, 11, 0.3)",
      redBg: "rgba(239, 68, 68, 0.15)",
      redBorder: "rgba(239, 68, 68, 0.3)",
      primaryBg: "rgba(56, 189, 248, 0.15)",
      primaryBorder: "rgba(56, 189, 248, 0.3)",
      primaryGlow: "rgba(56, 189, 248, 0.4)",
    },
  },
};

const ThemeContext = createContext({
  theme: "dark",
  colors: THEMES.dark.colors,
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const colors = THEMES[theme].colors;

  const setTheme = useCallback((t) => {
    if (THEMES[t]) setThemeState(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function useColors() {
  return useContext(ThemeContext).colors;
}
