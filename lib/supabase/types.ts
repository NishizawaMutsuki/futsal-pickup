// Database types matching the Supabase schema
// These are used when Supabase is configured

export interface DbProfile {
  id: string
  name: string
  avatar_url: string | null
  position: string
  rating: number
  match_count: number
  host_count: number
  cancel_count: number
  total_participations: number
  verified: boolean
  created_at: string
  updated_at: string
}

export interface DbMatch {
  id: string
  title: string
  host_id: string
  venue: string
  area: string
  date: string
  start_time: string
  end_time: string
  level: "beginner" | "intermediate" | "advanced"
  max_players: number
  price: number
  description: string
  rules: string[]
  auto_approve: boolean
  status: "open" | "closed" | "cancelled" | "completed"
  created_at: string
  updated_at: string
}

export interface DbParticipation {
  id: string
  match_id: string
  user_id: string
  status: "pending" | "confirmed" | "cancelled"
  joined_at: string
}

export interface DbReview {
  id: string
  match_id: string
  reviewer_id: string
  reviewee_id: string | null
  rating: number
  comment: string
  created_at: string
}

export interface DbNotification {
  id: string
  user_id: string
  type: "reminder" | "new_match" | "review" | "join" | "cancel"
  title: string
  message: string
  match_id: string | null
  read: boolean
  created_at: string
}

export interface DbReport {
  id: string
  reporter_id: string
  reported_user_id: string | null
  match_id: string | null
  reason: string
  details: string
  status: "pending" | "reviewed" | "resolved"
  created_at: string
}
