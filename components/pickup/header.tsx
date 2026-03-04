"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Palette, Check } from "lucide-react"
import { useTheme, themes } from "./theme-provider"
import { cn } from "@/lib/utils"
import { useApp } from "@/contexts/app-context"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { unreadCount } = useApp()
  const [showPicker, setShowPicker] = useState(false)

  return (
    <header className="relative flex items-center justify-between px-5 pt-14 pb-3">
      {/* subtle top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent pointer-events-none" />

      <div className="flex items-center gap-2.5 relative">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary animate-pulse-glow">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary-foreground"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" />
            <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground leading-none">
            {"Pick"}<span className="text-primary">{"Up"}</span>
          </h1>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
            Futsal Matching
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        {/* Theme switcher */}
        <div className="relative">
          <button
            onClick={() => setShowPicker(!showPicker)}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-xl bg-secondary border border-border transition-all",
              showPicker && "bg-primary/15 border-primary/40"
            )}
            aria-label="テーマ変更"
          >
            <Palette className={cn(
              "w-[18px] h-[18px] transition-colors",
              showPicker ? "text-primary" : "text-muted-foreground"
            )} />
          </button>

          {/* Theme picker dropdown */}
          {showPicker && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowPicker(false)} />
              <div className="absolute top-12 right-0 z-50 w-44 p-2 rounded-2xl bg-card border border-border shadow-[0_16px_48px_oklch(0_0_0/0.4)] animate-fade-up" style={{ animationDuration: "0.2s" }}>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-2.5 pt-1 pb-2">
                  {"テーマ"}
                </p>
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => { setTheme(t.name); setShowPicker(false) }}
                    className={cn(
                      "flex items-center gap-3 w-full px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                      theme === t.name
                        ? "bg-primary/15 text-primary"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    <span className={cn("w-5 h-5 rounded-lg border-2 shrink-0", t.preview,
                      theme === t.name ? "border-primary" : "border-border"
                    )} />
                    <span className="flex-1 text-left">{t.label}</span>
                    {theme === t.name && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-secondary border border-border transition-colors hover:bg-muted"
          aria-label="通知"
        >
          <Bell className="w-[18px] h-[18px] text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[9px] font-bold bg-destructive text-destructive-foreground rounded-full border-2 border-background">
              {unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
