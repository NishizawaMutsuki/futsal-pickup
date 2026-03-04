-- PickUp - Initial Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null default '',
  avatar_url text,
  position text default 'MF',
  rating numeric(2,1) default 0,
  match_count int default 0,
  host_count int default 0,
  cancel_count int default 0,
  total_participations int default 0,
  verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Matches
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  host_id uuid references public.profiles(id) not null,
  venue text not null,
  area text not null,
  date date not null,
  start_time time not null,
  end_time time not null,
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  max_players int not null default 10,
  price int not null default 0,
  description text default '',
  rules text[] default '{}',
  auto_approve boolean default true,
  status text default 'open' check (status in ('open', 'closed', 'cancelled', 'completed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Participations
create table public.participations (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade not null,
  user_id uuid references public.profiles(id) not null,
  status text default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled')),
  joined_at timestamptz default now(),
  unique(match_id, user_id)
);

-- Reviews
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade not null,
  reviewer_id uuid references public.profiles(id) not null,
  reviewee_id uuid references public.profiles(id),
  rating int not null check (rating between 1 and 5),
  comment text default '',
  created_at timestamptz default now(),
  unique(match_id, reviewer_id)
);

-- Notifications
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) not null,
  type text not null check (type in ('reminder', 'new_match', 'review', 'join', 'cancel')),
  title text not null,
  message text not null,
  match_id uuid references public.matches(id) on delete cascade,
  read boolean default false,
  created_at timestamptz default now()
);

-- Reports (trust & safety)
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) not null,
  reported_user_id uuid references public.profiles(id),
  match_id uuid references public.matches(id),
  reason text not null,
  details text default '',
  status text default 'pending' check (status in ('pending', 'reviewed', 'resolved')),
  created_at timestamptz default now()
);

-- Indexes
create index idx_matches_date on public.matches(date);
create index idx_matches_area on public.matches(area);
create index idx_matches_status on public.matches(status);
create index idx_matches_host on public.matches(host_id);
create index idx_participations_match on public.participations(match_id);
create index idx_participations_user on public.participations(user_id);
create index idx_notifications_user on public.notifications(user_id);
create index idx_notifications_read on public.notifications(user_id, read);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.participations enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.reports enable row level security;

-- Profiles: public read, self write
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Matches: public read, authenticated create, host update
create policy "Matches are viewable by everyone"
  on public.matches for select using (true);
create policy "Authenticated users can create matches"
  on public.matches for insert with check (auth.uid() = host_id);
create policy "Hosts can update their matches"
  on public.matches for update using (auth.uid() = host_id);

-- Participations: public read, self manage
create policy "Participations are viewable by everyone"
  on public.participations for select using (true);
create policy "Authenticated users can join matches"
  on public.participations for insert with check (auth.uid() = user_id);
create policy "Users can update own participation"
  on public.participations for update using (auth.uid() = user_id);

-- Reviews: public read, self create
create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);
create policy "Authenticated users can create reviews"
  on public.reviews for insert with check (auth.uid() = reviewer_id);

-- Notifications: self only
create policy "Users can view own notifications"
  on public.notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications"
  on public.notifications for update using (auth.uid() = user_id);

-- Reports: self create, no public read
create policy "Users can create reports"
  on public.reports for insert with check (auth.uid() = reporter_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to get current player count for a match
create or replace function public.get_match_player_count(match_uuid uuid)
returns int as $$
  select count(*)::int
  from public.participations
  where match_id = match_uuid and status = 'confirmed';
$$ language sql stable;
