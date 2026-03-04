# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PickUp - a futsal matching platform for finding pickup games in Tokyo urban areas. Currently in Phase 0 (prototype). Documentation and UI are in Japanese.

## Commands

```bash
npm start          # Start Expo dev server
npm run ios        # Start on iOS simulator
npm run android    # Start on Android emulator
npm run web        # Start web version (localhost:8081)
```

## Tech Stack

- **Expo SDK 55** + **React Native 0.83** + **React 19**
- **Expo Router** - File-based routing in `app/` directory
- **NativeWind v4** + **Tailwind CSS v3** - Use `className` prop for styling (not `StyleSheet`)
- **Lucide React Native** - Icons (`lucide-react-native`)
- **Vercel** for web hosting (auto-deploys from `main` branch)

## Architecture

File-based routing with Expo Router. All screens live in `app/`:
- `app/_layout.jsx` - Root layout (wraps all screens)
- `app/index.jsx` - Home screen
- Add new screens as `app/<name>.jsx`

Styling uses NativeWind: write Tailwind classes in `className` props. Global CSS is in `global.css`, imported in `app/_layout.jsx`.

Config files:
- `app.json` - Expo app config
- `tailwind.config.js` - Tailwind config (must include `nativewind/preset`)
- `babel.config.js` - Babel config (includes `nativewind/babel` preset)
- `metro.config.js` - Metro bundler config (wrapped with `withNativeWind`)

The app is mobile-first, portrait orientation. All UI text should be in Japanese.

## Key Documentation

- `docs/PLANNING.md` - Product strategy, MVP features, monetization, and phased roadmap
- `docs/DEPLOY.md` - Deployment setup and environment variables for future phases
