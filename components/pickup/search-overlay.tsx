"use client"

import { useRef, useEffect, useState } from "react"
import { Search, ArrowLeft, X } from "lucide-react"
import { MatchCard } from "./match-card"
import { useSearch } from "@/contexts/search-context"
import { useApp } from "@/contexts/app-context"

export function SearchOverlay() {
  const { isOpen, close } = useSearch()
  const { matches } = useApp()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClose = () => {
    close()
    setQuery("")
  }

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setQuery("")
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [isOpen])

  // Handle Escape and browser back
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    window.history.pushState({ searchOverlay: true }, "")
    const handlePopState = () => {
      close()
      setQuery("")
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isOpen, close])

  // Lock body scroll
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

  if (!isOpen) return null

  const results = query
    ? matches.filter((match) => {
        const q = query.toLowerCase()
        return `${match.title} ${match.venue} ${match.area}`.toLowerCase().includes(q)
      })
    : []

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <button
          type="button"
          onClick={handleClose}
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="エリア・会場名で検索..."
            className="w-full h-10 pl-9 pr-9 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
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
        {!query && (
          <p className="text-sm text-muted-foreground text-center mt-8">
            エリアや会場名を入力してください
          </p>
        )}
        {query && results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-8">
            「{query}」に一致するマッチが見つかりません
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
  )
}
