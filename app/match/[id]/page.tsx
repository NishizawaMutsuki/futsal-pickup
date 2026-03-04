"use client"

import { use } from "react"
import { MatchDetail } from "@/components/pickup/match-detail"
import { MobileShell } from "@/components/ui/mobile-shell"
import { useApp } from "@/contexts/app-context"

function MatchDetailContent({ id }: { id: string }) {
  const { getMatchById } = useApp()
  const match = getMatchById(id)

  if (!match) {
    return (
      <MobileShell>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">マッチが見つかりませんでした</p>
        </div>
      </MobileShell>
    )
  }

  return (
    <MobileShell>
      <MatchDetail match={match} />
    </MobileShell>
  )
}

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <MatchDetailContent id={id} />
}
