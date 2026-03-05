import type { Match, Message, Notification, UserProfile, Host, Review } from "@/data/types"

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DbRow = Record<string, any>

/** Transform a Supabase match row (with joined host profile + participations + reviews) to Match type */
export function toMatch(row: DbRow): Match {
  const host = row.host as DbRow | null
  const participations = (row.participations as DbRow[] | null) ?? []
  const reviews = (row.reviews as DbRow[] | null) ?? []
  const dateObj = new Date(row.date)

  return {
    id: row.id,
    title: row.title,
    host: toHost(host),
    venue: row.venue,
    area: row.area,
    date: row.date,
    dayLabel: DAY_LABELS[dateObj.getUTCDay()],
    startTime: formatTime(row.start_time),
    endTime: formatTime(row.end_time),
    level: row.level,
    currentPlayers: participations.filter((p: DbRow) => p.status === "confirmed").length,
    maxPlayers: row.max_players,
    price: row.price,
    description: row.description ?? "",
    rules: row.rules ?? [],
    reviews: reviews.map(toReview),
  }
}

function toHost(row: DbRow | null): Host {
  if (!row) {
    return { id: "", name: "不明", avatar: "", rating: 0, matchCount: 0, verified: false }
  }
  return {
    id: row.id,
    name: row.name ?? "",
    avatar: row.avatar_url ?? "",
    rating: Number(row.rating) || 0,
    matchCount: row.host_count ?? 0,
    verified: row.verified ?? false,
  }
}

function toReview(row: DbRow): Review {
  const reviewer = row.reviewer as DbRow | null
  return {
    userId: row.reviewer_id,
    userName: reviewer?.name ?? "匿名",
    rating: row.rating,
    comment: row.comment ?? "",
    date: row.created_at?.split("T")[0] ?? "",
  }
}

/** Transform a Supabase message row (with joined sender profile) to Message type */
export function toMessage(row: DbRow, currentUserId?: string): Message {
  const sender = row.sender as DbRow | null
  return {
    id: row.id,
    matchId: row.match_id,
    senderId: row.sender_id,
    senderName: sender?.name ?? "匿名",
    senderAvatar: sender?.avatar_url ?? "",
    text: row.text,
    isDirect: row.is_direct ?? false,
    createdAt: formatRelativeTime(row.created_at),
    isOwn: row.sender_id === currentUserId,
  }
}

/** Transform a Supabase notification row to Notification type */
export function toNotification(row: DbRow): Notification {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    message: row.message,
    matchId: row.match_id ?? "",
    time: formatRelativeTime(row.created_at),
    read: row.read ?? false,
  }
}

/** Transform a Supabase profile row to UserProfile type */
export function toUserProfile(row: DbRow): UserProfile {
  const reviews = (row.reviews as DbRow[] | null) ?? []
  const totalParticipations = row.total_participations ?? 0
  const cancelCount = row.cancel_count ?? 0

  return {
    id: row.id,
    name: row.name ?? "",
    avatar: row.avatar_url ?? "",
    rating: Number(row.rating) || 0,
    matchCount: row.match_count ?? 0,
    hostCount: row.host_count ?? 0,
    verified: row.verified ?? false,
    position: row.position ?? "MF",
    cancelRate: totalParticipations > 0 ? Math.round((cancelCount / totalParticipations) * 100) : 0,
    hostedMatches: [],
    reviews: reviews.map(toReview),
  }
}

/** Format "HH:MM:SS" or "HH:MM" time to "HH:MM" */
function formatTime(time: string): string {
  if (!time) return ""
  const parts = time.split(":")
  return `${parts[0]}:${parts[1]}`
}

/** Format ISO timestamp to relative time string in Japanese */
function formatRelativeTime(isoDate: string): string {
  if (!isoDate) return ""
  const now = Date.now()
  const then = new Date(isoDate).getTime()
  const diffMs = now - then
  const diffMin = Math.floor(diffMs / 60000)
  const diffHour = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return "たった今"
  if (diffMin < 60) return `${diffMin}分前`
  if (diffHour < 24) return `${diffHour}時間前`
  if (diffDay === 1) return "昨日"
  if (diffDay < 7) return `${diffDay}日前`
  return new Date(isoDate).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })
}
