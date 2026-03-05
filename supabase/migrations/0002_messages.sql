-- Messages table for match-level messaging
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) not null,
  text text not null,
  is_direct boolean default false,  -- true = visible only to sender + host
  created_at timestamptz default now()
);

create index idx_messages_match on public.messages(match_id);
alter table public.messages enable row level security;

-- Open messages: anyone can read
-- Direct messages: only sender or match host can read
create policy "Messages read access" on public.messages for select using (
  is_direct = false
  or sender_id = auth.uid()
  or exists (
    select 1 from public.matches m
    where m.id = messages.match_id and m.host_id = auth.uid()
  )
);

-- Authenticated users can send messages (sender_id must match)
create policy "Authenticated users can send messages" on public.messages
  for insert with check (auth.uid() = sender_id);

-- Update notifications type constraint to allow 'message'
alter table public.notifications drop constraint if exists notifications_type_check;
alter table public.notifications add constraint notifications_type_check
  check (type in ('reminder', 'new_match', 'review', 'join', 'cancel', 'message'));
