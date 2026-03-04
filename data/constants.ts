import type { SkillLevel, SkillLevelConfig, Venue, CapacityLimits } from "./types"

export const SKILL_LEVELS: Record<SkillLevel, SkillLevelConfig> = {
  beginner: {
    label: "初心者OK",
    badgeStyle: "bg-primary/15 border-primary/30 text-primary",
    iconName: "TrendingUp",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    color: "#059669",
  },
  intermediate: {
    label: "経験者",
    badgeStyle: "bg-amber-500/15 border-amber-500/30 text-amber-400",
    iconName: "Zap",
    bg: "bg-amber-100",
    text: "text-amber-700",
    color: "#d97706",
  },
  advanced: {
    label: "ガチ",
    badgeStyle: "bg-destructive/15 border-destructive/30 text-destructive",
    iconName: "Flame",
    bg: "bg-red-100",
    text: "text-red-700",
    color: "#dc2626",
  },
}

export const SKILL_LEVEL_OPTIONS: { key: SkillLevel | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "beginner", label: "初心者OK" },
  { key: "intermediate", label: "経験者" },
  { key: "advanced", label: "ガチ" },
]

export const VENUES: Venue[] = [
  { id: 1, name: "渋谷フットサルコート", area: "渋谷区" },
  { id: 2, name: "新宿スポーツセンター", area: "新宿区" },
  { id: 3, name: "六本木ヒルズアリーナ", area: "港区" },
  { id: 4, name: "池袋サンシャインコート", area: "豊島区" },
]

export const CAPACITY_LIMITS: CapacityLimits = {
  min: 2,
  max: 30,
}

export const NOTIFICATION_TYPES: Record<
  string,
  { icon: string; color: string; bg: string }
> = {
  reminder: { icon: "Clock", color: "#059669", bg: "bg-emerald-100" },
  new_match: { icon: "MapPin", color: "#3b82f6", bg: "bg-blue-100" },
  review: { icon: "Star", color: "#f59e0b", bg: "bg-amber-100" },
  cancel: { icon: "XCircle", color: "#ef4444", bg: "bg-red-100" },
  join: { icon: "UserPlus", color: "#8b5cf6", bg: "bg-purple-100" },
}
