 import { NextResponse } from 'next/server'
 import { createClient } from '@supabase/supabase-js'
 import type { Database } from '@/types/database'

 type Json = Database['public']

 const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // Prefer service key if available (server-side only); fallback to anon for public insert if RLS allows
  (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) as string
 )

 export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { benefit_id, full_name, dni, phone, email } = body || {}

    // Basic validation
    if (!benefit_id || typeof benefit_id !== 'string') {
      return NextResponse.json({ error: 'benefit_id es requerido' }, { status: 400 })
    }
    if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 3) {
      return NextResponse.json({ error: 'full_name inválido' }, { status: 400 })
    }
    if (!dni || typeof dni !== 'string' || dni.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ error: 'dni inválido' }, { status: 400 })
    }
    if (!phone || typeof phone !== 'string' || phone.replace(/\s/g, '').length < 6) {
      return NextResponse.json({ error: 'phone inválido' }, { status: 400 })
    }

    // 1) Load benefit to validate expiration/stock
    const { data: benefit, error: bErr } = await supabaseAdmin
      .from('benefits')
      .select('*')
      .eq('id', benefit_id)
      .maybeSingle()

    if (bErr) {
      return NextResponse.json({ error: 'Error leyendo beneficio' }, { status: 500 })
    }
    if (!benefit) {
      return NextResponse.json({ error: 'Beneficio no encontrado' }, { status: 404 })
    }

    // 2) Expiration check (valid_to preferred, fallback to expires_at)
    const validTo: string | null = (benefit as any).valid_to ?? (benefit as any).expires_at ?? null
    if (validTo) {
      // Si es 'YYYY-MM-DD', tomar fin del día local
      const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(validTo)
      const endOfDay = isDateOnly
        ? new Date(Number(validTo.slice(0,4)), Number(validTo.slice(5,7)) - 1, Number(validTo.slice(8,10)), 23, 59, 59, 999)
        : new Date(validTo)
      if (endOfDay.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Este beneficio está vencido' }, { status: 410 })
      }
    }

    // 3) Duplicates check (dni/email for same benefit)
    {
      const query = (supabaseAdmin as any)
        .from('benefit_redemptions')
        .select('id', { count: 'exact', head: true })
        .eq('benefit_id', benefit_id)
        .or(`dni.eq.${dni}${email ? `,email.eq.${email}` : ''}`)

      const { count, error: dupErr } = await query
      if (dupErr) {
        return NextResponse.json({ error: 'Error validando duplicados' }, { status: 500 })
      }
      if ((count ?? 0) > 0) {
        return NextResponse.json({ error: 'Ya has solicitado este beneficio' }, { status: 409 })
      }
    }

    // 4) Stock check (required + redeemed count < quantity)
    if (typeof benefit.quantity === 'number') {
      const { count: usedCount, error: cErr } = await (supabaseAdmin as any)
        .from('benefit_redemptions')
        .select('id', { count: 'exact', head: true })
        .eq('benefit_id', benefit_id)

      if (cErr) {
        return NextResponse.json({ error: 'Error validando stock' }, { status: 500 })
      }
      if ((usedCount ?? 0) >= benefit.quantity) {
        return NextResponse.json({ error: 'Beneficio agotado' }, { status: 409 })
      }
    }

    // 5) Insert redemption with status 'required'
    const { data: inserted, error: iErr } = await (supabaseAdmin as any)
      .from('benefit_redemptions')
      .insert({
        benefit_id,
        full_name: String(full_name).trim(),
        dni: String(dni).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,
        status: 'required' as any,
      })
      .select('id, benefit_id, full_name, dni, phone, email, status, redeemed_at')
      .single()

    if (iErr) {
      return NextResponse.json({ error: iErr.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      redemption: inserted,
      message: 'Solicitud registrada. Presenta tu DNI en el comercio para retirar tu beneficio.'
    })
  } catch (e) {
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 })
  }
 }


