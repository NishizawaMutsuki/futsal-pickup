"use client"

import { Suspense } from "react"
import { Header } from "@/components/pickup/header"
import { SearchBar } from "@/components/pickup/search-bar"
import { AreaChips } from "@/components/pickup/area-chips"
import { SkillTabs } from "@/components/pickup/skill-tabs"
import { MatchList } from "@/components/pickup/match-list"
import { BottomNav } from "@/components/pickup/bottom-nav"
import { MobileShell } from "@/components/ui/mobile-shell"
import { useMatchFilters } from "@/hooks/use-match-filters"

function HomeContent() {
  const { area, skillLevel, searchQuery, filteredMatches, matchCount, setArea, setSkillLevel, setSearchQuery } = useMatchFilters()

  return (
    <MobileShell>
      <div className="flex-1 pb-4">
        <Header />
        <Suspense>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </Suspense>
        <AreaChips selected={area} onSelect={setArea} />
        <SkillTabs active={skillLevel} onSelect={setSkillLevel} />
        <MatchList matches={filteredMatches} count={matchCount} />
      </div>
      <BottomNav />
    </MobileShell>
  )
}

export default function HomePage() {
  return <HomeContent />
}
