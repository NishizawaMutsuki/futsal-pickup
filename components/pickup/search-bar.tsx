"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, ArrowLeft, X } from "lucide-react"
import { MatchCard } from "./match-card"
import type { Match } from "@/data/types"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  matches: Match[]
}

export function SearchBar({ value, onChange, matches }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    onChange("")
  }, [onChange])

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the overlay is rendered
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [isOpen])

  // Handle back button / Escape
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    // Push a history entry so browser back closes the overlay
    window.history.pushState({ searchOverlay: true }, "")
    const handlePopState = () => {
      setIsOpen(false)
      onChange("")
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isOpen, close, onChange])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Filter matches for overlay results
  const results = value
    ? matches.filter((match) => {
        const q = value.toLowerCase()
        return `${match.title} ${match.venue} ${match.area}`.toLowerCase().includes(q)
      })
    : []

  return (
    <>
      {/* Trigger — fake search bar */}
      <div className="px-5 py-2">
        <button
          type="button"
          onClick={open}
          className="flex items-center gap-2.5 w-full h-11 px-3.5 rounded-xl bg-secondary border border-border text-sm text-muted-foreground transition-all active:scale-[0.98]"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span>{value || "エリア・会場名で検索..."}</span>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <button
              type="button"
              onClick={close}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-foreground shrink-0 active:scale-95 transition-transform"
              aria-label="検索を閉じる"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="エリア・会場名で検索..."
                className="w-full h-10 pl-9 pr-9 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="検索をクリア"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {!value && (
              <p className="text-sm text-muted-foreground text-center mt-8">
                エリアや会場名を入力してください
              </p>
            )}
            {value && results.length === 0 && (
              <p className="text-sm text-muted-foreground text-center mt-8">
                「{value}」に一致するマッチが見つかりません
              </p>
            )}
            {results.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-muted-foreground">
                  {results.length}件のマッチが見つかりました
                </p>
                {results.map((match, i) => (
                  <MatchCard key={match.id} match={match} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
