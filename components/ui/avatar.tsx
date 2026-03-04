import { cn } from "@/lib/utils"

export function Avatar({ name, className }: { name?: string; className?: string }) {
  const initials = name ? name.split(" ").map(n => n[0]).join("").slice(0, 2) : "?"
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-primary/20 text-primary font-bold",
      className
    )}>
      {initials}
    </div>
  )
}
