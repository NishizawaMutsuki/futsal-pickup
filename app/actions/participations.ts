"use server"

import { createClient } from "@/lib/supabase/server"

export async function joinMatchAction(matchId: string) {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  // Check if match exists and has space
  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("id, max_players, status")
    .eq("id", matchId)
    .single()

  if (matchError || !match) return { error: "マッチが見つかりません" }
  if (match.status !== "open") return { error: "このマッチは募集終了しています" }

  // Check current participant count
  const { count } = await supabase
    .from("participations")
    .select("id", { count: "exact", head: true })
    .eq("match_id", matchId)
    .eq("status", "confirmed")

  if ((count ?? 0) >= match.max_players) return { error: "定員に達しています" }

  // Check if already joined
  const { data: existing } = await supabase
    .from("participations")
    .select("id, status")
    .eq("match_id", matchId)
    .eq("user_id", user.id)
    .single()

  if (existing && existing.status === "confirmed") return { error: "既に参加しています" }

  if (existing) {
    // Re-join after cancel
    const { error } = await supabase
      .from("participations")
      .update({ status: "confirmed", joined_at: new Date().toISOString() })
      .eq("id", existing.id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from("participations")
      .insert({ match_id: matchId, user_id: user.id, status: "confirmed" })
    if (error) return { error: error.message }
  }

  // Notify the host
  const { data: matchData } = await supabase
    .from("matches")
    .select("host_id, title")
    .eq("id", matchId)
    .single()

  if (matchData && matchData.host_id !== user.id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .single()

    await supabase.from("notifications").insert({
      user_id: matchData.host_id,
      type: "join",
      title: "新しい参加者",
      message: `${profile?.name ?? "ユーザー"}さんが「${matchData.title}」に参加しました`,
      match_id: matchId,
    })
  }

  return { success: true }
}

export async function leaveMatchAction(matchId: string) {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { error } = await supabase
    .from("participations")
    .update({ status: "cancelled" })
    .eq("match_id", matchId)
    .eq("user_id", user.id)

  if (error) return { error: error.message }
  return { success: true }
}
