"use server"

import { createClient } from "@/lib/supabase/server"
import { toMessage } from "@/lib/supabase/transformers"
import type { Message } from "@/data/types"

export async function getMatchMessagesAction(matchId: string): Promise<{ data: Message[]; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured", data: [] }

  // Get current user for isOwn flag
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("messages")
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(id, name, avatar_url)
    `)
    .eq("match_id", matchId)
    .order("created_at", { ascending: false })

  if (error) return { error: error.message, data: [] }
  return { data: (data ?? []).map((row) => toMessage(row, user?.id)) }
}

export async function sendMessageAction(
  matchId: string,
  text: string,
  isDirect: boolean
): Promise<{ data?: Message; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const trimmed = text.trim()
  if (!trimmed) return { error: "メッセージを入力してください" }

  // Insert message
  const { data, error } = await supabase
    .from("messages")
    .insert({
      match_id: matchId,
      sender_id: user.id,
      text: trimmed,
      is_direct: isDirect,
    })
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(id, name, avatar_url)
    `)
    .single()

  if (error) return { error: error.message }

  // Create notification for host (if sender is not the host)
  const { data: match } = await supabase
    .from("matches")
    .select("host_id")
    .eq("id", matchId)
    .single()

  if (match && match.host_id !== user.id) {
    const { data: senderProfile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .single()

    const senderName = senderProfile?.name || "ユーザー"
    await supabase.from("notifications").insert({
      user_id: match.host_id,
      type: "message",
      title: isDirect ? "DMが届きました" : "新しいメッセージ",
      message: `${senderName}: ${trimmed.slice(0, 50)}${trimmed.length > 50 ? "..." : ""}`,
      match_id: matchId,
    })
  }

  return { data: toMessage(data, user.id) }
}
