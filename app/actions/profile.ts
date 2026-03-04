"use server"

import { createClient } from "@/lib/supabase/server"

export async function updateProfileAction(updates: { name?: string; position?: string }) {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.position !== undefined && { position: updates.position }),
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function getProfileAction() {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase
    .from("profiles")
    .select(`
      *,
      reviews:reviews!reviews_reviewee_id_fkey(id, rating, comment, created_at, reviewer:profiles!reviews_reviewer_id_fkey(name))
    `)
    .eq("id", user.id)
    .single()

  if (error) return { error: error.message }
  return { data }
}

export async function reportUserAction(input: {
  reportedUserId?: string
  matchId?: string
  reason: string
  details?: string
}) {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase.from("reports").insert({
    reporter_id: user.id,
    reported_user_id: input.reportedUserId || null,
    match_id: input.matchId || null,
    reason: input.reason,
    details: input.details || "",
  })

  if (error) return { error: error.message }
  return { success: true }
}
