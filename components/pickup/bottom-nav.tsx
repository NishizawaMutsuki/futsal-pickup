"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Plus, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = { id: string; icon: typeof Home; label: string; href: string }

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "ホーム", href: "/" },
  { id: "search", icon: Search, label: "検索", href: "/?search=1" },
  { id: "create", icon: Plus, label: "", href: "/create" },
  { id: "notifications", icon: Bell, label: "通知", href: "/notifications" },
  { id: "profile", icon: User, label: "マイページ", href: "/profile" },
]

function getActiveTab(pathname: string): string {
  if (pathname === "/create") return "create"
  if (pathname === "/notifications") return "notifications"
  if (pathname === "/profile") return "profile"
  if (pathname.startsWith("/match/")) return "home"
  return "home"
}

export function BottomNav() {
  const pathname = usePathname()
  const activeTab = getActiveTab(pathname)
  return (
    <nav
      className="sticky bottom-0 w-full z-50 pb-5 pt-2 px-5 pointer-events-none animate-slide-up-nav"
      aria-label="メインナビゲーション"
    >
      <div className="relative flex items-center pointer-events-auto max-w-[480px] mx-auto w-full">
        {/* Pill bar */}
        <div
          className="flex items-center w-full h-[68px] rounded-[22px] border backdrop-blur-2xl shadow-[0_8px_40px_oklch(0_0_0/0.4)]"
          style={{
            background: "var(--nav-bg)",
            borderColor: "var(--nav-border)",
          }}
        >
          {navItems.map((item) => {
            const isCreate = item.id === "create"
            const isActive = activeTab === item.id

            if (isCreate) {
              return (
                <div key="create" className="flex-1 flex items-center justify-center">
                  <Link
                    href={item.href}
                    className="relative flex items-center justify-center w-[50px] h-[50px] rounded-2xl bg-primary text-primary-foreground shadow-[0_4px_24px_var(--glow,theme(--color-primary)/0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_32px_var(--glow,theme(--color-primary)/0.55)] active:scale-95"
                    aria-label="マッチ作成"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-foreground/[0.12] to-transparent pointer-events-none" />
                    <Plus className="w-6 h-6 relative" strokeWidth={2.5} />
                  </Link>
                </div>
              )
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all duration-300 active:scale-90"
                aria-label={item.label}
              >
                <div className={cn(
                  "relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300",
                  isActive ? "bg-primary/15" : ""
                )}>
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive
                        ? "text-primary drop-shadow-[0_0_6px_var(--glow,theme(--color-primary)/0.5)]"
                        : "text-muted-foreground"
                    )}
                    strokeWidth={isActive ? 2.4 : 1.8}
                  />
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-primary shadow-[0_0_6px_var(--glow,theme(--color-primary)/0.6)]" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[9px] font-semibold transition-all duration-300",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  style={{ color: isActive ? undefined : "var(--nav-inactive)" }}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
