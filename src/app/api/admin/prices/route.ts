// src/app/api/admin/prices/route.ts
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function checkAuth(request: Request) {
  return request.headers.get('authorization') === `Bearer ${process.env.ADMIN_SECRET_KEY}`;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('prices').select('*').order('date_from');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ prices: data });
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  const body = await request.json();
  const { data, error } = await supabaseAdmin.from('prices').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ price: data }, { status: 201 });
}
