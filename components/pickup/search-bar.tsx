"use client"

import { useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("search") === "1") {
      inputRef.current?.focus()
    }
  }, [searchParams])

  return (
    <div className="px-5 py-2">
      <div className="flex items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="エリア・会場名で検索..."
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="検索をクリア"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-primary-foreground shrink-0 transition-transform active:scale-95 hover:brightness-110"
          aria-label="フィルター"
        >
          <SlidersHorizontal className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  )
}
