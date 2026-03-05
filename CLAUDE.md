# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PickUp - a futsal matching platform for finding pickup games in Tokyo urban areas. Currently in Phase 0 (prototype). Web-first strategy. Documentation and UI are in Japanese.

## Commands

```bash
npm run dev        # Start Next.js dev server (localhost:3000)
npm run build      # Production build
npm start          # Start production server
npm run lint       # ESLint
```

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/postcss` — CSS variables for theming
- **Lucide React** - Icons (`lucide-react`)
- **Vercel** for web hosting (auto-deploys from `main` branch)

## Architecture

File-based routing with Next.js App Router. All pages live in `app/`:
- `app/layout.tsx` - Root layout (ThemeProvider, font, Analytics)
- `app/page.tsx` - Home screen
- `app/create/page.tsx` - Match creation
- `app/profile/page.tsx` - User profile
- `app/notifications/page.tsx` - Notifications
- `app/match/[id]/page.tsx` - Match detail (dynamic route)

Components in `components/pickup/` — domain-specific UI components.
Data layer in `data/` — TypeScript types, mock data, constants.

Styling: Tailwind classes in `className` props. Theme CSS variables in `app/globals.css`. 4 themes: dark (default), light, field, midnight.

Config files:
- `next.config.mjs` - Next.js config
- `postcss.config.mjs` - PostCSS with @tailwindcss/postcss
- `tsconfig.json` - TypeScript config (path alias `@/*`)
- `components.json` - shadcn/ui config

The app is mobile-first (max-w-[390px]). All UI text should be in Japanese.

## Security Rules

- リダイレクト先をURLパラメータ（`?next=`等）で受け取る場合、必ず `safeRedirect()` （`lib/navigation.ts`）でバリデーションすること
- アクセストークンやシークレットをCLIコマンドの引数に渡さないこと（会話履歴に残る）。環境変数経由で渡す

## External Service Settings (CLI対応不可)

以下はダッシュボードからのみ変更可能。コード変更時に関連する設定変更が必要な場合、必ずユーザーに通知すること：
- Supabase メールテンプレート（Auth > Templates）
- Supabase Auth プロバイダ設定（Google OAuth等）
- Supabase Redirect URLs
- Vercel 環境変数

## Key Documentation

- `docs/PLANNING.md` - Product strategy, MVP features, monetization, and phased roadmap
- `docs/DEPLOY.md` - Deployment setup and environment variables for future phases
