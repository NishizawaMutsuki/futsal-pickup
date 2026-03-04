"use client"

import { useState, useMemo } from "react"
import { useApp } from "@/contexts/app-context"
import type { SkillLevel } from "@/data/types"

export function useMatchFilters() {
  const { matches } = useApp()
  const [area, setArea] = useState("すべて")
  const [skillLevel, setSkillLevel] = useState<SkillLevel | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      if (area !== "すべて" && match.area !== area) return false
      if (skillLevel !== "all" && match.level !== skillLevel) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const searchTarget = `${match.title} ${match.venue} ${match.area}`.toLowerCase()
        if (!searchTarget.includes(q)) return false
      }
      return true
    })
  }, [matches, area, skillLevel, searchQuery])

  return {
    area,
    skillLevel,
    searchQuery,
    filteredMatches,
    matchCount: filteredMatches.length,
    setArea,
    setSkillLevel,
    setSearchQuery,
  }
}
