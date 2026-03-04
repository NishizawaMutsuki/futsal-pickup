"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { MATCHES as INITIAL_MATCHES, NOTIFICATIONS as INITIAL_NOTIFICATIONS, MY_PROFILE as INITIAL_PROFILE } from "@/data/mock"
import type { Match, Notification, UserProfile } from "@/data/types"

interface AppContextType {
  matches: Match[]
  notifications: Notification[]
  joinedMatchIds: Set<string>
  profile: UserProfile
  addMatch: (match: Match) => void
  joinMatch: (matchId: string) => void
  markAllRead: () => void
  markRead: (notificationId: string) => void
  unreadCount: number
  getMatchById: (id: string) => Match | undefined
  updateProfile: (updates: Partial<Pick<UserProfile, "name" | "position">>) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES)
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const [joinedMatchIds, setJoinedMatchIds] = useState<Set<string>>(new Set())
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE)

  const addMatch = useCallback((match: Match) => {
    setMatches((prev) => [match, ...prev])
  }, [])

  const joinMatch = useCallback((matchId: string) => {
    setJoinedMatchIds((prev) => new Set(prev).add(matchId))
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId ? { ...m, currentPlayers: m.currentPlayers + 1 } : m
      )
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const markRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    )
  }, [])

  const getMatchById = useCallback(
    (id: string) => matches.find((m) => m.id === id),
    [matches]
  )

  const updateProfile = useCallback((updates: Partial<Pick<UserProfile, "name" | "position">>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AppContext.Provider
      value={{
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
        updateProfile,
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
