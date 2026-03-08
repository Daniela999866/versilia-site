// src/app/api/bookings/route.ts
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { check_in, check_out, guest_name, guest_email, guest_phone, guests_count, message, total_price, deposit_paid, stripe_session_id } = body;

    if (!check_in || !check_out || !guest_name || !guest_email || !guest_phone) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert([{ check_in, check_out, guest_name, guest_email, guest_phone, guests_count, message, total_price, deposit_paid, stripe_session_id, status: 'confirmed' }])
      .select().single();

    if (error) throw error;
    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from('bookings').select('*').order('check_in', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data });
}
