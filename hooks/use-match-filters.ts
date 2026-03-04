"use client"

import { useState, useMemo } from "react"
import { MATCHES } from "@/data/mock"
import type { SkillLevel } from "@/data/types"

export function useMatchFilters() {
  const [area, setArea] = useState("すべて")
  const [skillLevel, setSkillLevel] = useState<SkillLevel | "all">("all")

  const filteredMatches = useMemo(() => {
    return MATCHES.filter((match) => {
      if (area !== "すべて" && match.area !== area) return false
      if (skillLevel !== "all" && match.level !== skillLevel) return false
      return true
    })
  }, [area, skillLevel])

  return {
    area,
    skillLevel,
    filteredMatches,
    matchCount: filteredMatches.length,
    setArea,
    setSkillLevel,
  }
}
