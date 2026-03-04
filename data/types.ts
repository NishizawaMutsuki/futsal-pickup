export type SkillLevel = "beginner" | "intermediate" | "advanced"

export interface Host {
  id: string
  name: string
  avatar: string
  rating: number
  matchCount: number
  verified: boolean
}

export interface Review {
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface Match {
  id: string
  title: string
  host: Host
  venue: string
  area: string
  date: string
  dayLabel: string
  startTime: string
  endTime: string
  level: SkillLevel
  currentPlayers: number
  maxPlayers: number
  price: number
  description: string
  rules: string[]
  reviews: Review[]
}

export interface UserProfile {
  id: string
  name: string
  avatar: string
  rating: number
  matchCount: number
  hostCount: number
  verified: boolean
  position: string
  cancelRate: number
  hostedMatches: string[]
  reviews: Review[]
}

export interface Notification {
  id: string
  type: "reminder" | "new_match" | "review" | "join" | "cancel"
  title: string
  message: string
  matchId: string
  time: string
  read: boolean
}

export interface LevelOption {
  key: string
  label: string
  color?: string
}

export interface LevelConfig {
  label: string
  bg: string
  text: string
  color: string
}
