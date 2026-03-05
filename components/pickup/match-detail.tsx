"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Share2, Calendar, MapPin, Coins, Users, ClipboardList, ChevronRight, ExternalLink, Globe, MessageSquare, Lock, Send } from "lucide-react"
import type { Match, Message } from "@/data/types"
import { SkillBadge } from "@/components/ui/skill-badge"
import { StarRating } from "@/components/ui/star-rating"
import { Avatar } from "@/components/ui/avatar"
import { formatMatchDate } from "@/lib/format"
import { useApp } from "@/contexts/app-context"
import { goBack } from "@/lib/navigation"
import { getMatchMessagesAction, sendMessageAction } from "@/app/actions/messages"
import { cn } from "@/lib/utils"

export function MatchDetail({ match }: { match: Match }) {
  const router = useRouter()
  const { user, joinMatch, joinedMatchIds } = useApp()
  const dateDisplay = formatMatchDate(match)

  const isJoined = joinedMatchIds.has(match.id)
  const isFull = match.currentPlayers >= match.maxPlayers

  const [joining, setJoining] = useState(false)

  const handleJoin = async () => {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/match/${match.id}`)}`)
      return
    }
    if (isJoined || isFull) return
    if (!window.confirm(`「${match.title}」に参加しますか？`)) return
    setJoining(true)
    const result = await joinMatch(match.id)
    setJoining(false)
    if (result.error) {
      alert(`エラー: ${result.error}`)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    const shareData = { title: match.title, text: `${match.title} - ${match.venue}`, url }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      alert("URLをコピーしました")
    }
  }

  const venueQuery = encodeURIComponent(match.venue)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${venueQuery}`
  const mapsEmbedUrl = `https://www.google.com/maps?q=${venueQuery}&output=embed`
  const venueSearchUrl = `https://www.google.com/search?q=${venueQuery}`

  const joinButtonLabel = joining ? "参加中..." : isJoined ? "参加済み" : isFull ? "満員" : "参加する"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
        <button
          onClick={() => goBack(router)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="戻る"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="共有"
        >
          <Share2 className="w-5 h-5 text-foreground" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 pb-28 overflow-y-auto">
        {/* Hero Section */}
        <section className="px-4 pt-5 pb-6 animate-fade-up">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h1 className="text-xl font-bold text-foreground leading-tight">
              {match.title}
            </h1>
            <SkillBadge level={match.level} size="md" />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">{dateDisplay}</span>
          </div>
        </section>

        {/* Info Section */}
        <section className="px-4 space-y-3 animate-fade-up" style={{ animationDelay: "80ms" }}>
          {/* Venue */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">会場</p>
                <p className="text-sm font-semibold text-foreground">{match.venue}</p>
                <p className="text-xs text-muted-foreground">{match.area}</p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary font-medium"
              >
                地図
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* Google Maps embed */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-xl overflow-hidden relative group"
            >
              <iframe
                src={mapsEmbedUrl}
                className="w-full h-32 rounded-xl pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${match.venue}の地図`}
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors rounded-xl" />
            </a>
            {/* Venue website link */}
            <a
              href={venueSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-xs text-primary font-medium hover:underline"
            >
              <Globe className="w-3.5 h-3.5" />
              施設の情報を検索
            </a>
          </div>

          {/* Fee */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">参加費</p>
                <p className="text-lg font-bold text-foreground">
                  {"\u00A5"}{match.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/ 人</span>
                </p>
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">参加者</p>
                <p className="text-lg font-bold text-foreground">
                  {match.currentPlayers}
                  <span className="text-sm font-normal text-muted-foreground">/{match.maxPlayers}人 参加中</span>
                </p>
              </div>
            </div>
            {/* Participant avatars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: match.currentPlayers }).map((_, i) => (
                <Avatar
                  key={i}
                  name={`P${i + 1}`}
                  className="w-8 h-8 text-[10px] -ml-1 first:ml-0 border-2 border-card"
                />
              ))}
              {match.maxPlayers - match.currentPlayers > 0 && (
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center -ml-1">
                  <span className="text-[10px] text-muted-foreground">+{match.maxPlayers - match.currentPlayers}</span>
                </div>
              )}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">ルール・持ち物</p>
                <p className="text-sm font-medium text-foreground">{match.rules.join("・")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Organizer Card */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "160ms" }}>
          <h2 className="text-sm font-bold text-foreground mb-3">主催者</h2>
          <Link href="/profile" className="block">
            <div className="bg-card rounded-2xl border border-border p-4 hover:bg-card/80 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar name={match.host.name} className="w-12 h-12 text-sm" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{match.host.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={match.host.rating} />
                    <span className="text-xs font-medium text-muted-foreground">{match.host.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {match.host.matchCount}回開催
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </Link>
        </section>

        {/* Description */}
        <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "240ms" }}>
          <h2 className="text-sm font-bold text-foreground mb-3">詳細</h2>
          <div className="bg-card rounded-2xl border border-border p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {match.description}
            </p>
          </div>
        </section>

        {/* Messages Section */}
        <MessageSection matchId={match.id} user={user} />

        {/* Reviews Section */}
        {match.reviews.length > 0 && (
          <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground">レビュー</h2>
            </div>
            <div className="space-y-3">
              {match.reviews.map((review) => (
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
        )}
      </main>

      {/* Bottom sticky bar */}
      <div className="sticky bottom-0 w-full z-50 p-4 bg-background/80 backdrop-blur-xl border-t border-border">
        <button
          onClick={handleJoin}
          disabled={isJoined || isFull || joining}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-[0_4px_24px_var(--glow,theme(--color-primary)/0.35)] hover:shadow-[0_6px_32px_var(--glow,theme(--color-primary)/0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {joinButtonLabel}
        </button>
      </div>
    </div>
  )
}

function MessageSection({ matchId, user }: { matchId: string; user: { id: string; name: string } | null }) {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [expanded, setExpanded] = useState(false)
  const [text, setText] = useState("")
  const [isDirect, setIsDirect] = useState(false)
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadMessages = useCallback(async () => {
    const result = await getMatchMessagesAction(matchId)
    if (!result.error) {
      setMessages(result.data)
    }
    setLoading(false)
  }, [matchId])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  const handleSend = async () => {
    if (!text.trim() || sending) return
    setSending(true)
    const result = await sendMessageAction(matchId, text, isDirect)
    setSending(false)
    if (result.error) {
      alert(`エラー: ${result.error}`)
      return
    }
    if (result.data) {
      setMessages((prev) => [result.data!, ...prev])
    }
    setText("")
  }

  const visibleMessages = expanded ? messages : messages.slice(0, 5)

  return (
    <section className="px-4 mt-6 animate-fade-up" style={{ animationDelay: "280ms" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-foreground">メッセージ</h2>
          {messages.length > 0 && (
            <span className="text-xs text-muted-foreground">({messages.length}件)</span>
          )}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Message list */}
        {loading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">読み込み中...</div>
        ) : messages.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">まだメッセージはありません</div>
        ) : (
          <div className="divide-y divide-border">
            {visibleMessages.map((msg) => (
              <div key={msg.id} className={cn("p-3", msg.isOwn && "bg-primary/[0.03]")}>
                <div className="flex items-center gap-2 mb-1">
                  <Avatar name={msg.senderName} className="w-6 h-6 text-[9px]" />
                  <span className="text-xs font-semibold text-foreground">{msg.senderName}</span>
                  {msg.isDirect && (
                    <span className="flex items-center gap-0.5 text-[10px] text-indigo-500 font-medium">
                      <Lock className="w-3 h-3" />
                      主催者のみ
                    </span>
                  )}
                  <span className="text-[10px] text-muted-foreground ml-auto">{msg.createdAt}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">{msg.text}</p>
              </div>
            ))}
            {messages.length > 5 && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="w-full p-2.5 text-xs font-medium text-primary hover:bg-secondary/50 transition-colors"
              >
                すべてのメッセージを表示（{messages.length}件）
              </button>
            )}
          </div>
        )}

        {/* Input area */}
        {user ? (
          <div className="border-t border-border p-3 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="メッセージを入力..."
                className="flex-1 h-9 px-3 text-sm rounded-xl bg-secondary border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                disabled={!text.trim() || sending}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-colors hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setIsDirect((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-colors",
                isDirect
                  ? "bg-indigo-500/10 text-indigo-500"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <Lock className="w-3 h-3" />
              {isDirect ? "DM（主催者のみ）" : "公開"}
            </button>
          </div>
        ) : (
          <div className="border-t border-border p-3">
            <button
              onClick={() => router.push(`/login?next=${encodeURIComponent(`/match/${matchId}`)}`)}
              className="w-full text-sm font-medium text-primary hover:underline"
            >
              ログインしてメッセージを送る
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
