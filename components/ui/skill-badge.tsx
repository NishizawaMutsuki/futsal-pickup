import { TrendingUp, Zap, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { SKILL_LEVELS } from "@/data/constants"
import type { SkillLevel } from "@/data/types"

const icons = {
  TrendingUp,
  Zap,
  Flame,
} as const

export function SkillBadge({ level, size = "sm" }: { level: SkillLevel; size?: "sm" | "md" }) {
  const config = SKILL_LEVELS[level]
  const Icon = icons[config.iconName]
  const iconSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"
  const textSize = size === "sm" ? "text-[10px]" : "text-xs"
  const padding = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5"

  return (
    <span className={cn(
      "shrink-0 flex items-center gap-1 font-bold rounded-lg border",
      textSize,
      padding,
      config.badgeStyle
    )}>
      <Icon className={iconSize} />
      {config.label}
    </span>
  )
}
