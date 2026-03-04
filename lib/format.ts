import type { Match } from "@/data/types"

export function formatMatchDate(match: Match): string {
  return `${match.date.slice(5).replace("-", "/")}(${match.dayLabel}) ${match.startTime}-${match.endTime}`
}
