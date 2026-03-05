"use server"

import { createClient } from "@/lib/supabase/server"
import { toNotification } from "@/lib/supabase/transformers"
import type { Notification } from "@/data/types"

export async function getNotificationsAction(): Promise<{ data: Notification[]; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured", data: [] }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated", data: [] }

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) return { error: error.message, data: [] }
  return { data: (data ?? []).map(toNotification) }
}

export async function markReadAction(notificationId: string) {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId)
    .eq("user_id", user.id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function markAllReadAction() {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", user.id)
    .eq("read", false)

  if (error) return { error: error.message }
  return { success: true }
}
