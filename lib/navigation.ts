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
