"use server"

import { createClient } from "@/lib/supabase/server"

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

export async function createMatchAction(input: CreateMatchInput) {
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
    .select()
    .single()

  if (error) return { error: error.message }

  // Auto-join the host as first participant
  await supabase.from("participations").insert({
    match_id: data.id,
    user_id: user.id,
    status: "confirmed",
  })

  // Update host count
  await supabase.rpc("increment_host_count", { user_uuid: user.id }).catch(() => {})

  return { data }
}

export async function getMatchesAction() {
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
  return { data }
}

export async function getMatchByIdAction(id: string) {
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
  return { data }
}
