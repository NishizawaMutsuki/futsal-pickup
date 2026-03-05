import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

/**
 * Go back if there's browser history, otherwise navigate to fallback.
 */
export function goBack(router: AppRouterInstance, fallback = "/") {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push(fallback)
  }
}

/**
 * Validate redirect path to prevent open redirect attacks.
 * Only allows relative paths starting with "/" (not "//").
 */
export function safeRedirect(next: string, fallback = "/"): string {
  if (next.startsWith("/") && !next.startsWith("//")) {
    return next
  }
  return fallback
}
