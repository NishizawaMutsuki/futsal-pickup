import { Header } from "@/components/pickup/header"
import { SearchBar } from "@/components/pickup/search-bar"
import { AreaChips } from "@/components/pickup/area-chips"
import { SkillTabs } from "@/components/pickup/skill-tabs"
import { MatchList } from "@/components/pickup/match-list"
import { BottomNav } from "@/components/pickup/bottom-nav"

export default function HomePage() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background">
        <div className="flex-1 pb-4">
          <Header />
          <SearchBar />
          <AreaChips />
          <SkillTabs />
          <MatchList />
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
