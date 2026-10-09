-- Orden manual de ediciones. Ejecutar una vez en el SQL Editor de Supabase.
-- 1 = aparece primero en /ediciones.

alter table public.editions
  add column if not exists position integer not null default 0;

-- Numera las ediciones existentes: la más nueva (año/mes) queda en 1.
with ranked as (
  select
    id,
    row_number() over (
      order by
        year desc,
        array_position(
          array['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
          initcap(month)
        ) desc nulls last,
        created_at desc
    ) as rn
  from public.editions
)
update public.editions e
set position = ranked.rn
from ranked
where e.id = ranked.id;
