import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4"

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconSize,
            i < fullStars
              ? "fill-amber-400 text-amber-400"
              : i === fullStars && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  )
}
