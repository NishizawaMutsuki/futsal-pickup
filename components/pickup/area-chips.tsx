"use client"

import { cn } from "@/lib/utils"
import { AREAS } from "@/data/mock"

const areas = ["すべて", ...AREAS]

export function AreaChips({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (area: string) => void
}) {
  return (
    <div className="px-5 py-2">
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
        role="listbox"
        aria-label="エリアフィルター"
      >
        {areas.map((area) => (
          <button
            key={area}
            role="option"
            aria-selected={selected === area}
            onClick={() => onSelect(area)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all border active:scale-95",
              selected === area
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_var(--glow,theme(--color-primary)/0.35)]"
                : "bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {area}
          </button>
        ))}
      </div>
    </div>
  )
}
