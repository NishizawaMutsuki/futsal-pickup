"use client"

import { cn } from "@/lib/utils"
import { SKILL_LEVEL_OPTIONS } from "@/data/constants"
import type { SkillLevel } from "@/data/types"

export function SkillTabs({
  active,
  onSelect,
}: {
  active: SkillLevel | "all"
  onSelect: (key: SkillLevel | "all") => void
}) {
  return (
    <div className="px-5 pt-2 pb-1">
      <div
        className="flex bg-secondary rounded-xl p-1 border border-border"
        role="tablist"
        aria-label="スキルレベル"
      >
        {SKILL_LEVEL_OPTIONS.map((level) => (
          <button
            key={level.key}
            role="tab"
            aria-selected={active === level.key}
            onClick={() => onSelect(level.key)}
            className={cn(
              "relative flex-1 py-2.5 text-xs font-bold rounded-lg transition-all",
              active === level.key
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
