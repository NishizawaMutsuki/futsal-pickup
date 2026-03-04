"use client"

import { Bell, Calendar, Users, Star, XCircle, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav } from "./bottom-nav"
import { NOTIFICATIONS } from "@/data/mock"
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
}

function NotificationItem({ notification }: { notification: Notification }) {
  const config = typeConfig[notification.type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 border-b border-border transition-colors",
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
    </div>
  )
}

export function NotificationsScreen() {
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background">
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
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            すべて既読
          </button>
        </div>
      </header>

      {/* Notification List */}
      <div className="flex-1 pb-4">
        {NOTIFICATIONS.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab="notifications" />
    </div>
  )
}
