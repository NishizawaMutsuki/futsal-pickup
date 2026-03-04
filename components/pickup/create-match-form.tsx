"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Users,
  Coins,
  ChevronDown,
  Search,
  Minus,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { goBack } from "@/lib/navigation"
import { VENUES, SKILL_LEVEL_OPTIONS, CAPACITY_LIMITS } from "@/data/constants"
import type { SkillLevel, Venue } from "@/data/types"
import { useApp } from "@/contexts/app-context"

const skillLevels = SKILL_LEVEL_OPTIONS.filter((o) => o.key !== "all") as { key: SkillLevel; label: string }[]

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"]

export function CreateMatchForm() {
  const router = useRouter()
  const { user, profile, addMatch } = useApp()

  // Auth guard: redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.replace("/login?next=/create")
    }
  }, [user, router])
  const [title, setTitle] = useState("")
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [showVenueModal, setShowVenueModal] = useState(false)
  const [venueSearch, setVenueSearch] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("19:00")
  const [endTime, setEndTime] = useState("21:00")
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner")
  const [capacity, setCapacity] = useState(10)
  const [fee, setFee] = useState("1500")
  const [rules, setRules] = useState("")
  const [autoApprove, setAutoApprove] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredVenues = VENUES.filter(v =>
    v.name.includes(venueSearch) || v.area.includes(venueSearch)
  )

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = "タイトルを入力してください"
    if (!selectedVenue) newErrors.venue = "会場を選択してください"
    if (!date) newErrors.date = "日付を選択してください"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const dateObj = new Date(date)
    const dayLabel = DAY_LABELS[dateObj.getDay()]

    addMatch({
      id: `m_${Date.now()}`,
      title: title.trim(),
      host: {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        rating: profile.rating,
        matchCount: profile.hostCount,
        verified: profile.verified,
      },
      venue: selectedVenue!.name,
      area: selectedVenue!.area,
      date,
      dayLabel,
      startTime,
      endTime,
      level: skillLevel,
      currentPlayers: 1,
      maxPlayers: capacity,
      price: parseInt(fee) || 0,
      description: rules || "",
      rules: rules ? rules.split(/[、,\n]+/).map((r) => r.trim()).filter(Boolean) : [],
      reviews: [],
    })

    alert("マッチを作成しました！")
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
        <h1 className="text-lg font-bold text-foreground">マッチを作成</h1>
        <button
          onClick={() => goBack(router)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="閉じる"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </header>

      {/* Form Content */}
      <main className="flex-1 pb-28 overflow-y-auto">
        <div className="px-4 py-5 space-y-5">
          {/* Title */}
          <div className="animate-fade-up">
            <label className="block text-sm font-bold text-foreground mb-2">
              タイトル
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })) }}
              placeholder="渋谷エンジョイフットサル"
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-input border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all",
                errors.title ? "border-destructive" : "border-border"
              )}
            />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
          </div>

          {/* Venue */}
          <div className="animate-fade-up" style={{ animationDelay: "40ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              会場
            </label>
            <button
              onClick={() => setShowVenueModal(true)}
              className={cn(
                "w-full h-12 px-4 rounded-xl bg-input border text-left flex items-center justify-between transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                errors.venue ? "border-destructive" : "border-border",
                selectedVenue ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{selectedVenue ? selectedVenue.name : "会場を選択"}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            {errors.venue && <p className="text-xs text-destructive mt-1">{errors.venue}</p>}
          </div>

          {/* Date and Time */}
          <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              日時
            </label>
            <div className="space-y-3">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => { setDate(e.target.value); setErrors((p) => ({ ...p, date: "" })) }}
                  className={cn(
                    "w-full h-12 pl-12 pr-4 rounded-xl bg-input border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all",
                    errors.date ? "border-destructive" : "border-border"
                  )}
                />
                {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                <span className="text-muted-foreground font-medium">-</span>
                <div className="relative flex-1">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skill Level */}
          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              レベル
            </label>
            <div className="flex bg-input rounded-xl p-1 border border-border">
              {skillLevels.map((level) => (
                <button
                  key={level.key}
                  onClick={() => setSkillLevel(level.key)}
                  className={cn(
                    "flex-1 h-10 rounded-lg text-sm font-medium transition-all",
                    skillLevel === level.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Capacity */}
          <div className="animate-fade-up" style={{ animationDelay: "160ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              定員
            </label>
            <div className="flex items-center justify-between h-12 px-4 rounded-xl bg-input border border-border">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">{capacity}人</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCapacity(Math.max(CAPACITY_LIMITS.min, capacity - 1))}
                  className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => setCapacity(Math.min(CAPACITY_LIMITS.max, capacity + 1))}
                  className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Fee */}
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              参加費
            </label>
            <div className="relative">
              <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 text-foreground font-medium">¥</span>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                placeholder="1500"
                className="w-full h-12 pl-16 pr-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Rules */}
          <div className="animate-fade-up" style={{ animationDelay: "240ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              ルール・備考
            </label>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              placeholder="ビブス持参不要、初心者歓迎！"
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Approval Method */}
          <div className="animate-fade-up" style={{ animationDelay: "280ms" }}>
            <label className="block text-sm font-bold text-foreground mb-2">
              承認方法
            </label>
            <div className="flex bg-input rounded-xl p-1 border border-border">
              <button
                onClick={() => setAutoApprove(true)}
                className={cn(
                  "flex-1 h-10 rounded-lg text-sm font-medium transition-all",
                  autoApprove
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                自動承認
              </button>
              <button
                onClick={() => setAutoApprove(false)}
                className={cn(
                  "flex-1 h-10 rounded-lg text-sm font-medium transition-all",
                  !autoApprove
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                手動承認
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {autoApprove
                ? "参加申請があると自動的に承認されます"
                : "参加申請を確認してから承認します"}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom sticky bar */}
      <div className="sticky bottom-0 w-full z-50 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
        <button
          onClick={handleSubmit}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-[0_4px_24px_var(--glow,theme(--color-primary)/0.35)] hover:shadow-[0_6px_32px_var(--glow,theme(--color-primary)/0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          作成する
        </button>
      </div>

      {/* Venue Selection Modal */}
      {showVenueModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowVenueModal(false)}
          />
          <div className="relative w-full max-w-[390px] bg-card rounded-t-3xl border-t border-border p-4 pb-8 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">会場を選択</h2>
              <button
                onClick={() => setShowVenueModal(false)}
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={venueSearch}
                onChange={(e) => setVenueSearch(e.target.value)}
                placeholder="会場名・エリアで検索"
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {/* Venue List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredVenues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => {
                    setSelectedVenue(venue)
                    setShowVenueModal(false)
                    setErrors((p) => ({ ...p, venue: "" }))
                  }}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all",
                    selectedVenue?.id === venue.id
                      ? "bg-primary/15 border border-primary/30"
                      : "bg-secondary hover:bg-secondary/80 border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{venue.name}</p>
                      <p className="text-xs text-muted-foreground">{venue.area}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
