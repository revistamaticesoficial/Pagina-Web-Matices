-- Link del flipbook (Heyzine) de cada edición. Ejecutar una vez en el SQL Editor de Supabase.

alter table public.editions
  add column if not exists flipbook_url text;
