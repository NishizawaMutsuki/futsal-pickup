"use client"

import { MatchCard } from "./match-card"
import { Flame } from "lucide-react"
import type { Match } from "@/data/types"

export function MatchList({ matches, count }: { matches: Match[]; count: number }) {
  return (
    <div className="px-5 py-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">
            募集中のマッチ
          </h2>
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            {count}件
          </span>
        </div>
        <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
          すべて見る
        </button>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-3">
        {matches.map((match, i) => (
          <MatchCard key={match.id} match={match} index={i} />
        ))}
      </div>
    </div>
  )
}
