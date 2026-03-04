"use client"

import * as Sentry from "@sentry/nextjs"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="ja">
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem", fontFamily: "sans-serif" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem" }}>
            エラーが発生しました
          </h2>
          <p style={{ color: "#888", marginBottom: "1.5rem" }}>
            申し訳ありません。予期しないエラーが発生しました。
          </p>
          <button
            onClick={reset}
            style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem", background: "#22c55e", color: "white", fontWeight: "bold", border: "none", cursor: "pointer" }}
          >
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  )
}
