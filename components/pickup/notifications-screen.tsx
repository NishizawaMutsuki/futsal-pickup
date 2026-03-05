"use client"

import { useRouter } from "next/navigation"
import { Bell, Calendar, Users, Star, XCircle, UserPlus, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav } from "./bottom-nav"
import { useApp } from "@/contexts/app-context"
import type { Notification } from "@/data/types"

type NotificationType = Notification["type"]

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string; bgColor: string }> = {
  reminder: {
    icon: Calendar,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  new_match: {
    icon: Bell,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  review: {
    icon: Star,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  cancel: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  join: {
    icon: UserPlus,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  message: {
    icon: MessageSquare,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
}

function NotificationItem({ notification, onTap }: { notification: Notification; onTap: () => void }) {
  const config = typeConfig[notification.type]
  const Icon = config.icon

  return (
    <button
      onClick={onTap}
      className={cn(
        "flex items-start gap-3 p-4 border-b border-border transition-colors w-full text-left hover:bg-secondary/50",
        notification.read ? "opacity-60" : "bg-primary/[0.03]"
      )}
    >
      {/* Icon */}
      <div className={cn("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center", config.bgColor)}>
        <Icon className={cn("w-5 h-5", config.color)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium text-foreground", notification.read && "font-normal")}>
            {notification.title}
          </p>
          {!notification.read && (
            <span className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-primary" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 truncate">{notification.message}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">{notification.time}</p>
      </div>
    </button>
  )
}

export function NotificationsScreen() {
  const router = useRouter()
  const { notifications, unreadCount, markAllRead, markRead } = useApp()

  const handleTap = (notification: Notification) => {
    markRead(notification.id)
    router.push(`/match/${notification.matchId}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">通知</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={markAllRead}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            すべて既読
          </button>
        </div>
      </header>

      {/* Notification List */}
      <div className="flex-1 pb-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground">通知はありません</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onTap={() => handleTap(notification)}
            />
          ))
        )}
      </div>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  )
}
