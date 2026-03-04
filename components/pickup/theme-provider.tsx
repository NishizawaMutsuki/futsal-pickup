"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export type ThemeName = "dark" | "light" | "field" | "midnight"

type ThemeInfo = {
  name: ThemeName
  label: string
  preview: string
}

export const themes: ThemeInfo[] = [
  { name: "light", label: "ライト", preview: "bg-[#f8faf8]" },
  { name: "dark", label: "ダーク", preview: "bg-[#1a1f1c]" },
  { name: "field", label: "フィールド", preview: "bg-[#0d2818]" },
  { name: "midnight", label: "ミッドナイト", preview: "bg-[#101828]" },
]

type ThemeContextType = {
  theme: ThemeName
  setTheme: (t: ThemeName) => void
}

const Ctx = createContext<ThemeContextType>({ theme: "dark", setTheme: () => {} })

export function useTheme() {
  return useContext(Ctx)
}

function applyThemeToDOM(themeName: ThemeName) {
  document.documentElement.setAttribute("data-theme", themeName)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("dark")

  useEffect(() => {
    const saved = localStorage.getItem("pickup-theme") as ThemeName | null
    const initial = saved && themes.some((t) => t.name === saved) ? saved : "dark"
    setThemeState(initial)
    applyThemeToDOM(initial)
  }, [])

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t)
    localStorage.setItem("pickup-theme", t)
    applyThemeToDOM(t)
  }, [])

  return (
    <Ctx.Provider value={{ theme, setTheme }}>
      {children}
    </Ctx.Provider>
  )
}
