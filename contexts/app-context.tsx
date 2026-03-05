"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { MATCHES as MOCK_MATCHES, NOTIFICATIONS as MOCK_NOTIFICATIONS, MY_PROFILE as MOCK_PROFILE } from "@/data/mock"
import type { Match, Notification, UserProfile } from "@/data/types"
import { createClient } from "@/lib/supabase/client"
import { getMatchesAction } from "@/app/actions/matches"
import { getNotificationsAction, markReadAction, markAllReadAction } from "@/app/actions/notifications"
import { getProfileAction, updateProfileAction } from "@/app/actions/profile"
import { joinMatchAction } from "@/app/actions/participations"
import { createMatchAction } from "@/app/actions/matches"
import type { User } from "@supabase/supabase-js"

interface CreateMatchInput {
  title: string
  venue: string
  area: string
  date: string
  startTime: string
  endTime: string
  level: "beginner" | "intermediate" | "advanced"
  maxPlayers: number
  price: number
  description: string
  rules: string[]
  autoApprove: boolean
}

interface AppContextType {
  // Auth
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
  // Data
  matches: Match[]
  notifications: Notification[]
  joinedMatchIds: Set<string>
  profile: UserProfile
  addMatch: (input: CreateMatchInput) => Promise<{ error?: string }>
  joinMatch: (matchId: string) => Promise<{ error?: string }>
  markAllRead: () => void
  markRead: (notificationId: string) => void
  unreadCount: number
  getMatchById: (id: string) => Match | undefined
  updateProfile: (updates: Partial<Pick<UserProfile, "name" | "position">>) => void
  refreshMatches: () => Promise<void>
}

const AppContext = createContext<AppContextType | null>(null)

/** Check if Supabase is configured */
function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function AppProvider({ children, initialUser }: { children: ReactNode; initialUser?: User | null }) {
  // Auth state
  const [user, setUser] = useState<User | null>(initialUser ?? null)
  const [isLoading, setIsLoading] = useState(!initialUser)

  // Data state — start empty, load from Supabase or mock
  const [matches, setMatches] = useState<Match[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [joinedMatchIds, setJoinedMatchIds] = useState<Set<string>>(new Set())
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE)
  const [dataLoaded, setDataLoaded] = useState(false)

  const useSupabase = isSupabaseConfigured()

  // Listen to auth state changes
  useEffect(() => {
    if (!useSupabase) {
      setIsLoading(false)
      return
    }

    const supabase = createClient()
    if (!supabase) {
      setIsLoading(false)
      return
    }

    if (!initialUser) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user)
        setIsLoading(false)
      })
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [initialUser, useSupabase])

  // Load matches from Supabase or mock
  const refreshMatches = useCallback(async () => {
    if (!useSupabase) {
      setMatches(MOCK_MATCHES)
      return
    }
    const result = await getMatchesAction()
    if (!result.error) {
      setMatches(result.data)
    }
  }, [useSupabase])

  // Load all data on mount
  useEffect(() => {
    if (dataLoaded) return

    if (!useSupabase) {
      setMatches(MOCK_MATCHES)
      setNotifications(MOCK_NOTIFICATIONS)
      setProfile(MOCK_PROFILE)
      setDataLoaded(true)
      return
    }

    // Load matches (public, no auth needed)
    refreshMatches()

    setDataLoaded(true)
  }, [useSupabase, dataLoaded, refreshMatches])

  // Load user-specific data when user changes
  useEffect(() => {
    if (!useSupabase || !user) {
      if (!useSupabase) return
      // User logged out — clear user-specific data
      setNotifications([])
      setJoinedMatchIds(new Set())
      setProfile(MOCK_PROFILE)
      return
    }

    // Fetch notifications
    getNotificationsAction().then((result) => {
      if (!result.error) {
        setNotifications(result.data)
      }
    })

    // Fetch profile
    getProfileAction().then((result) => {
      if (!result.error && result.data) {
        setProfile(result.data)
      }
    })

    // Build joinedMatchIds from current matches
    // We need participations data — re-fetch matches to check user's participations
    const supabase = createClient()
    if (supabase) {
      supabase
        .from("participations")
        .select("match_id")
        .eq("user_id", user.id)
        .eq("status", "confirmed")
        .then(({ data }) => {
          if (data) {
            setJoinedMatchIds(new Set(data.map((p) => p.match_id)))
          }
        })
    }
  }, [user, useSupabase])

  // Update profile name from auth user (fallback for new users without profile)
  useEffect(() => {
    if (user && !useSupabase) {
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "ユーザー"
      setProfile((prev) => ({ ...prev, id: user.id, name }))
    }
  }, [user, useSupabase])

  const signOut = useCallback(async () => {
    const supabase = createClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
  }, [])

  const addMatch = useCallback(async (input: CreateMatchInput) => {
    if (!useSupabase) {
      // Mock fallback
      const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"]
      const dateObj = new Date(input.date)
      const mockMatch: Match = {
        id: `m_${Date.now()}`,
        title: input.title,
        host: {
          id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
          rating: profile.rating,
          matchCount: profile.hostCount,
          verified: profile.verified,
        },
        venue: input.venue,
        area: input.area,
        date: input.date,
        dayLabel: DAY_LABELS[dateObj.getDay()],
        startTime: input.startTime,
        endTime: input.endTime,
        level: input.level,
        currentPlayers: 1,
        maxPlayers: input.maxPlayers,
        price: input.price,
        description: input.description,
        rules: input.rules,
        reviews: [],
      }
      setMatches((prev) => [mockMatch, ...prev])
      return {}
    }

    const result = await createMatchAction(input)
    if (result.error) return { error: result.error }
    if (result.data) {
      setMatches((prev) => [result.data!, ...prev])
      setJoinedMatchIds((prev) => new Set(prev).add(result.data!.id))
    }
    return {}
  }, [useSupabase, profile])

  const joinMatch = useCallback(async (matchId: string) => {
    if (!useSupabase) {
      // Mock fallback
      setJoinedMatchIds((prev) => new Set(prev).add(matchId))
      setMatches((prev) =>
        prev.map((m) => m.id === matchId ? { ...m, currentPlayers: m.currentPlayers + 1 } : m)
      )
      return {}
    }

    const result = await joinMatchAction(matchId)
    if (result.error) return { error: result.error }

    setJoinedMatchIds((prev) => new Set(prev).add(matchId))
    setMatches((prev) =>
      prev.map((m) => m.id === matchId ? { ...m, currentPlayers: m.currentPlayers + 1 } : m)
    )
    return {}
  }, [useSupabase])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    if (useSupabase) {
      markAllReadAction()
    }
  }, [useSupabase])

  const markRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    )
    if (useSupabase) {
      markReadAction(notificationId)
    }
  }, [useSupabase])

  const getMatchById = useCallback(
    (id: string) => matches.find((m) => m.id === id),
    [matches]
  )

  const updateProfileFn = useCallback((updates: Partial<Pick<UserProfile, "name" | "position">>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
    if (useSupabase) {
      updateProfileAction(updates)
    }
  }, [useSupabase])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        signOut,
        matches,
        notifications,
        joinedMatchIds,
        profile,
        addMatch,
        joinMatch,
        markAllRead,
        markRead,
        unreadCount,
        getMatchById,
        updateProfile: updateProfileFn,
        refreshMatches,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
