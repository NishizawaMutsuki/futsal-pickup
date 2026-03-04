import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/pickup/theme-provider'
import { AppProvider } from '@/contexts/app-context'
import { createClient } from '@/lib/supabase/server'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: 'PickUp - フットサルマッチング',
  description: '東京都内のフットサル即席マッチを見つけて参加しよう。レベル別・エリア別で簡単にマッチング。',
  openGraph: {
    title: 'PickUp - フットサルマッチング',
    description: '東京都内のフットサル即席マッチを見つけて参加しよう。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'PickUp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PickUp - フットサルマッチング',
    description: '東京都内のフットサル即席マッチを見つけて参加しよう。',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1a14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Fetch initial user session on server
  const supabase = await createClient()
  let initialUser = null
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser()
    initialUser = user
  }

  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} antialiased`}>
        <ThemeProvider>
          <AppProvider initialUser={initialUser}>
            {children}
          </AppProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
