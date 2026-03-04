import type { LevelConfig } from "./types"

export const LEVEL_CONFIG: Record<string, LevelConfig> = {
  beginner: {
    label: "初心者OK",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    color: "#059669",
  },
  intermediate: {
    label: "経験者",
    bg: "bg-amber-100",
    text: "text-amber-700",
    color: "#d97706",
  },
  advanced: {
    label: "ガチ",
    bg: "bg-red-100",
    text: "text-red-700",
    color: "#dc2626",
  },
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
