"use client"

import { Star, ChevronRight, Calendar, MapPin, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { BottomNav } from "./bottom-nav"
import { MY_PROFILE, MATCHES } from "@/data/mock"

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4"

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconSize,
            i < fullStars
              ? "fill-amber-400 text-amber-400"
              : i === fullStars && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}

function Avatar({ name, className }: { name?: string; className?: string }) {
  const initials = name ? name.split(" ").map(n => n[0]).join("").slice(0, 2) : "?"
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-primary/20 text-primary font-bold",
      className
    )}>
      {initials}
    </div>
  )
}

const upcomingMatches = MATCHES.slice(0, 2).map((m) => ({
  id: m.id,
  title: m.title,
  date: `${m.date.slice(5).replace("-", "/")}(${m.dayLabel})`,
  time: `${m.startTime}-${m.endTime}`,
  venue: m.venue,
}))

const pastMatches = [
  {
    id: "past1",
    title: "池袋ナイトフットサル",
    date: "3/1(土)",
    venue: "池袋フットサルアリーナ",
    reviewed: true,
  },
  {
    id: "past2",
    title: "六本木エンジョイ",
    date: "2/23(土)",
    venue: "六本木コート",
    reviewed: true,
  },
  {
    id: "past3",
    title: "渋谷ミックスフットサル",
    date: "2/17(土)",
    venue: "渋谷フットサルパーク",
    reviewed: false,
  },
]

export function ProfileScreen() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <main className="flex-1 pb-4 overflow-y-auto">
        {/* Profile Header */}
        <section className="px-4 pt-6 pb-6 animate-fade-up">
          <div className="flex flex-col items-center text-center">
            <Avatar name={MY_PROFILE.name} className="w-20 h-20 text-2xl mb-3" />
            <h1 className="text-xl font-bold text-foreground">{MY_PROFILE.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={MY_PROFILE.rating} size="md" />
              <span className="text-sm font-semibold text-foreground">{MY_PROFILE.rating}</span>
              <span className="text-sm text-muted-foreground">({MY_PROFILE.reviews.length}件)</span>
            </div>
            <button className="mt-4 px-5 py-2 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
              プロフィールを編集
            </button>
          </div>
        </section>

        {/* Stats Row */}
        <section className="px-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{MY_PROFILE.matchCount}回</p>
              <p className="text-xs text-muted-foreground mt-1">参加数</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{MY_PROFILE.hostCount}回</p>
              <p className="text-xs text-muted-foreground mt-1">主催数</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">{MY_PROFILE.cancelRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">ドタキャン率</p>
            </div>
          </div>
        </section>

        {/* Upcoming Matches */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">今後の予定</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              すべて見る
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground truncate">{match.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{match.date} {match.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="truncate">{match.venue}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Matches */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">参加履歴</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              すべて見る
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {pastMatches.map((match) => (
              <div key={match.id} className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground truncate">{match.title}</h3>
                      {match.reviewed ? (
                        <span className="shrink-0 flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" />
                          レビュー済
                        </span>
                      ) : (
                        <span className="shrink-0 flex items-center gap-1 text-[10px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          未レビュー
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{match.date}</span>
                      <span className="truncate">{match.venue}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "320ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">レビュー</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              すべて見る
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {MY_PROFILE.reviews.map((review) => (
              <div key={review.userId} className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar name={review.userName} className="w-9 h-9 text-xs" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{review.userName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <BottomNav activeTab="profile" />
    </div>
  )
}
