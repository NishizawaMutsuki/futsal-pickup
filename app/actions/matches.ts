"use server"

import { createClient } from "@/lib/supabase/server"
import { toMatch } from "@/lib/supabase/transformers"
import type { Match } from "@/data/types"

interface CreateMatchInput {
  title: string
  venue: string
  area: string
  date: string
  startTime: string
  endTime: string
  level: "beginner" | "intermediate" | "advanced"
  maxPlayers: number
  price: number
  description: string
  rules: string[]
  autoApprove: boolean
}

export async function createMatchAction(input: CreateMatchInput): Promise<{ data?: Match; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated" }

  const { data, error } = await supabase
    .from("matches")
    .insert({
      title: input.title,
      host_id: user.id,
      venue: input.venue,
      area: input.area,
      date: input.date,
      start_time: input.startTime,
      end_time: input.endTime,
      level: input.level,
      max_players: input.maxPlayers,
      price: input.price,
      description: input.description,
      rules: input.rules,
      auto_approve: input.autoApprove,
    })
    .select(`
      *,
      host:profiles!matches_host_id_fkey(id, name, avatar_url, rating, host_count, verified),
      participations(id, user_id, status)
    `)
    .single()

  if (error) return { error: error.message }

  // Auto-join the host as first participant
  await supabase.from("participations").insert({
    match_id: data.id,
    user_id: user.id,
    status: "confirmed",
  })

  // Re-fetch to include the participation
  const { data: refetched } = await supabase
    .from("matches")
    .select(`
      *,
      host:profiles!matches_host_id_fkey(id, name, avatar_url, rating, host_count, verified),
      participations(id, user_id, status)
    `)
    .eq("id", data.id)
    .single()

  return { data: toMatch(refetched ?? data) }
}

export async function getMatchesAction(): Promise<{ data: Match[]; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured", data: [] }

  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      host:profiles!matches_host_id_fkey(id, name, avatar_url, rating, host_count, verified),
      participations(id, user_id, status)
    `)
    .eq("status", "open")
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })

  if (error) return { error: error.message, data: [] }
  return { data: (data ?? []).map(toMatch) }
}

export async function getMatchByIdAction(id: string): Promise<{ data?: Match; error?: string }> {
  const supabase = await createClient()
  if (!supabase) return { error: "Database not configured" }

  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      host:profiles!matches_host_id_fkey(id, name, avatar_url, rating, host_count, verified),
      participations(id, user_id, status),
      reviews(id, reviewer_id, rating, comment, created_at, reviewer:profiles!reviews_reviewer_id_fkey(name))
    `)
    .eq("id", id)
    .single()

  if (error) return { error: error.message }
  return { data: toMatch(data) }
}
