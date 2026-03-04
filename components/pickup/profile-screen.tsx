"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, MapPin, CheckCircle, Clock, X, LogOut, LogIn } from "lucide-react"
import { BottomNav } from "./bottom-nav"
import { StarRating } from "@/components/ui/star-rating"
import { Avatar } from "@/components/ui/avatar"
import { MATCHES, PAST_MATCHES } from "@/data/mock"
import { useApp } from "@/contexts/app-context"
import { cn } from "@/lib/utils"

const upcomingMatches = MATCHES.slice(0, 2).map((m) => ({
  id: m.id,
  title: m.title,
  date: `${m.date.slice(5).replace("-", "/")}(${m.dayLabel})`,
  time: `${m.startTime}-${m.endTime}`,
  venue: m.venue,
}))

function EditProfileModal({ name, position, onSave, onClose }: {
  name: string
  position: string
  onSave: (name: string, position: string) => void
  onClose: () => void
}) {
  const [editName, setEditName] = useState(name)
  const [editPosition, setEditPosition] = useState(position)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[350px] bg-card rounded-2xl border border-border p-5 animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-foreground">プロフィールを編集</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">名前</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">ポジション</label>
            <div className="flex bg-input rounded-xl p-1 border border-border">
              {["GK", "DF", "MF", "FW"].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setEditPosition(pos)}
                  className={cn(
                    "flex-1 h-10 rounded-lg text-sm font-medium transition-all",
                    editPosition === pos
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => onSave(editName, editPosition)}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProfileScreen() {
  const router = useRouter()
  const { user, profile, updateProfile, signOut } = useApp()
  const [showEditModal, setShowEditModal] = useState(false)

  const handleSaveProfile = (name: string, position: string) => {
    updateProfile({ name, position })
    setShowEditModal(false)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  // Not logged in: show login prompt
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <Avatar name="?" className="w-20 h-20 text-2xl mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">マイページ</h1>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            ログインしてプロフィールを管理しよう
          </p>
          <Link
            href="/login?next=/profile"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogIn className="w-4 h-4" />
            ログイン
          </Link>
        </main>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <main className="flex-1 pb-4 overflow-y-auto">
        {/* Profile Header */}
        <section className="px-4 pt-6 pb-6 animate-fade-up">
          <div className="flex flex-col items-center text-center">
            <Avatar name={profile.name} className="w-20 h-20 text-2xl mb-3" />
            <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={profile.rating} size="md" />
              <span className="text-sm font-semibold text-foreground">{profile.rating}</span>
              <span className="text-sm text-muted-foreground">({profile.reviews.length}件)</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-5 py-2 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                プロフィールを編集
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-destructive transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                ログアウト
              </button>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="px-4 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{profile.matchCount}回</p>
              <p className="text-xs text-muted-foreground mt-1">参加数</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{profile.hostCount}回</p>
              <p className="text-xs text-muted-foreground mt-1">主催数</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">{profile.cancelRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">ドタキャン率</p>
            </div>
          </div>
        </section>

        {/* Upcoming Matches */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">今後の予定</h2>
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match) => (
              <Link key={match.id} href={`/match/${match.id}`}>
                <div className="bg-card rounded-2xl border border-border p-4 hover:bg-card/80 transition-colors">
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
              </Link>
            ))}
          </div>
        </section>

        {/* Past Matches */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">参加履歴</h2>
          </div>
          <div className="space-y-3">
            {PAST_MATCHES.map((match) => (
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
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "320ms" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">レビュー</h2>
          </div>
          <div className="space-y-3">
            {profile.reviews.map((review) => (
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
      <BottomNav />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          name={profile.name}
          position={profile.position}
          onSave={handleSaveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}
