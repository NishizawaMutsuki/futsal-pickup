"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { goBack } from "@/lib/navigation"
import { Mail, ArrowLeft } from "lucide-react"
import { MobileShell } from "@/components/ui/mobile-shell"
import { createClient } from "@/lib/supabase/client"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const next = searchParams.get("next") ?? "/"
  const authError = searchParams.get("error")

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    if (!supabase) {
      setError("認証サービスが設定されていません")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    const supabase = createClient()
    if (!supabase) {
      setError("認証サービスが設定されていません")
      return
    }
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center px-4 py-3">
          <button
            onClick={() => goBack(router)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            aria-label="戻る"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" />
                <path d="M12 2C12 2 8 6 8 12C8 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 2C12 2 16 6 16 12C16 18 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground leading-none">
                {"Pick"}<span className="text-primary">{"Up"}</span>
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">
                Futsal Matching
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            ログインしてマッチに参加しよう
          </p>

          {(authError || error) && (
            <div className="w-full p-3 mb-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error || "認証に失敗しました。もう一度お試しください。"}
            </div>
          )}

          {sent ? (
            <div className="w-full text-center animate-fade-up">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground mb-2">メールを確認してください</h2>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{email}</span> にログインリンクを送信しました
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-primary font-medium"
              >
                別のメールアドレスで試す
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4 animate-fade-up">
              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-card border border-border text-foreground font-medium text-sm flex items-center justify-center gap-3 hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Googleでログイン
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">または</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Magic Link */}
              <form onSubmit={handleMagicLink} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレス"
                  required
                  className="w-full h-12 px-4 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? "送信中..." : "メールでログイン"}
                </button>
              </form>

              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                ログインすることで
                <a href="/terms" className="text-primary hover:underline">利用規約</a>
                と
                <a href="/privacy" className="text-primary hover:underline">プライバシーポリシー</a>
                に同意したものとみなされます
              </p>
            </div>
          )}
        </main>
      </div>
    </MobileShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
