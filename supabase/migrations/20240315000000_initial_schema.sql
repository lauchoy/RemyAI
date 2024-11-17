-- Enable RLS (Row Level Security)
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- Create users_preferences table
create table if not exists public.user_preferences (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    dietary text[] default '{}',
    cuisines text[] default '{}',
    cooking_level text,
    time_availability text,
    loved_ingredients text[] default '{}',
    disliked_ingredients text[] default '{}',
    mood_based boolean,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create cooking_history table for training data
create table if not exists public.cooking_history (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    recipe_name text not null,
    cuisine_type text,
    cooking_time int, -- in minutes
    difficulty_level text,
    rating int check (rating >= 1 and rating <= 5),
    mood text,
    created_at timestamptz default now()
);

-- Create user_feedback table for AI training
create table if not exists public.user_feedback (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    recipe_id text not null,
    rating int check (rating >= 1 and rating <= 5),
    feedback_text text,
    created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.user_preferences enable row level security;
alter table public.cooking_history enable row level security;
alter table public.user_feedback enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view own preferences" on public.user_preferences;
drop policy if exists "Users can insert own preferences" on public.user_preferences;
drop policy if exists "Users can update own preferences" on public.user_preferences;
drop policy if exists "Users can view own cooking history" on public.cooking_history;
drop policy if exists "Users can insert own cooking history" on public.cooking_history;
drop policy if exists "Users can view own feedback" on public.user_feedback;
drop policy if exists "Users can insert own feedback" on public.user_feedback;

-- Create RLS Policies
-- User Preferences policies
create policy "Enable read access for users"
    on public.user_preferences for select
    using (true);

create policy "Enable insert access for users"
    on public.user_preferences for insert
    with check (true);

create policy "Enable update for users"
    on public.user_preferences for update
    using (auth.uid() = user_id);

-- Cooking History policies
create policy "Enable read access for own cooking history"
    on public.cooking_history for select
    using (auth.uid() = user_id);

create policy "Enable insert access for own cooking history"
    on public.cooking_history for insert
    with check (auth.uid() = user_id);

-- User Feedback policies
create policy "Enable read access for own feedback"
    on public.user_feedback for select
    using (auth.uid() = user_id);

create policy "Enable insert access for own feedback"
    on public.user_feedback for insert
    with check (auth.uid() = user_id);

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updating timestamps
create trigger handle_updated_at
    before update on public.user_preferences
    for each row
    execute procedure public.handle_updated_at();