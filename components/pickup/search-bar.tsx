"use client"

import { Search } from "lucide-react"
import { useSearch } from "@/contexts/search-context"

export function SearchBar() {
  const { open } = useSearch()

  return (
    <div className="px-5 py-2">
      <button
        type="button"
        onClick={open}
        className="flex items-center gap-2.5 w-full h-11 px-3.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground transition-all active:scale-[0.98]"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span>エリア・会場名で検索...</span>
      </button>
    </div>
  )
}
