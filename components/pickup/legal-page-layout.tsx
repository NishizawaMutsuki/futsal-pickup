"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"
import { goBack } from "@/lib/navigation"

export function LegalPageLayout({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
        <button
          onClick={() => goBack(router)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="戻る"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
      </header>
      <main className="flex-1 px-5 py-6 prose-sm text-foreground [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3 [&_ul]:text-sm [&_ul]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_li]:mb-1 [&_section]:mb-2">
        {children}
      </main>
    </div>
  )
}
