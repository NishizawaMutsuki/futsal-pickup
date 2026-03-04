"use client"

import Link from "next/link"
import { Calendar, MapPin, Users, Coins } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Match } from "@/data/types"
import { SkillBadge } from "@/components/ui/skill-badge"
import { formatMatchDate } from "@/lib/format"

export function MatchCard({ match, index = 0 }: { match: Match; index?: number }) {
  const fillPercent = Math.round((match.currentPlayers / match.maxPlayers) * 100)
  const isAlmostFull = fillPercent >= 80
  const isFull = match.currentPlayers >= match.maxPlayers

  return (
    <Link href={`/match/${match.id}`}>
      <article
        className="animate-fade-up group relative bg-card rounded-2xl border border-border p-4 transition-all hover:border-primary/30 hover:shadow-[0_0_24px_var(--glow,theme(--color-primary)/0.08)] active:scale-[0.98]"
        style={{ animationDelay: `${index * 80}ms` }}
      >
      {/* HOT badge */}
      {isAlmostFull && !isFull && (
        <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl bg-primary px-2.5 py-1 flex items-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-foreground" />
          </span>
          <span className="text-[10px] font-bold text-primary-foreground">HOT</span>
        </div>
      )}

      {/* FULL badge */}
      {isFull && (
        <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl bg-destructive px-2.5 py-1">
          <span className="text-[10px] font-bold text-destructive-foreground">FULL</span>
        </div>
      )}

      {/* Title + skill badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-[15px] font-bold text-card-foreground leading-snug flex-1">
          {match.title}
        </h3>
        <SkillBadge level={match.level} size="sm" />
      </div>

      {/* Date & venue */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2.5 text-xs">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10">
            <Calendar className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-secondary-foreground font-medium">{formatMatchDate(match)}</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10">
            <MapPin className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-muted-foreground truncate">
            {match.venue}
            <span className="text-border mx-1">{"/"}</span>
            {match.area}
          </span>
        </div>
      </div>

      {/* Capacity & fee */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-primary" />
          <span className={cn(
            "text-sm font-bold tabular-nums",
            isFull ? "text-destructive" : "text-foreground"
          )}>
            {match.currentPlayers}
            <span className="text-muted-foreground font-normal">{"/"}{match.maxPlayers}{"人"}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg">
          <Coins className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm font-bold text-foreground tabular-nums">
            {"\u00A5"}{match.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full animate-bar-fill transition-colors",
            isFull
              ? "bg-destructive shadow-[0_0_8px_theme(--color-destructive/0.5)]"
              : isAlmostFull
                ? "bg-primary shadow-[0_0_8px_var(--glow,theme(--color-primary)/0.4)]"
                : "bg-primary/60"
          )}
          style={{ width: `${fillPercent}%`, animationDelay: `${index * 80 + 300}ms` }}
          role="progressbar"
          aria-valuenow={match.currentPlayers}
          aria-valuemin={0}
          aria-valuemax={match.maxPlayers}
          aria-label={`${match.currentPlayers}/${match.maxPlayers}人参加中`}
        />
      </div>
      </article>
    </Link>
  )
}
