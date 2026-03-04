"use client"

import { use } from "react"
import { MatchDetail } from "@/components/pickup/match-detail"
import { getMatchById } from "@/data/mock"

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const match = getMatchById(id)

  if (!match) {
    return (
      <div className="flex justify-center min-h-screen bg-background">
        <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background items-center justify-center">
          <p className="text-muted-foreground">マッチが見つかりませんでした</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background">
        <MatchDetail match={match} />
      </div>
    </div>
  )
}
