"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { LEVELS } from "@/data/mock"

export function SkillTabs() {
  const [active, setActive] = useState("すべて")

  return (
    <div className="px-5 pt-2 pb-1">
      <div
        className="flex bg-secondary rounded-xl p-1 border border-border"
        role="tablist"
        aria-label="スキルレベル"
      >
        {LEVELS.map((level) => (
          <button
            key={level.key}
            role="tab"
            aria-selected={active === level.label}
            onClick={() => setActive(level.label)}
            className={cn(
              "relative flex-1 py-2.5 text-xs font-bold rounded-lg transition-all",
              active === level.label
                ? "bg-primary text-primary-foreground shadow-[0_0_10px_var(--glow,theme(--color-primary)/0.3)]"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  )
}
