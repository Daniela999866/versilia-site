// src/app/api/admin/blocked-dates/route.ts
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function checkAuth(request: Request) {
  const auth = request.headers.get('authorization');
  return auth === `Bearer ${process.env.ADMIN_SECRET_KEY}`;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('blocked_dates').select('*').order('date');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ blocked_dates: data });
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  const body = await request.json();
  const { data, error } = await supabaseAdmin.from('blocked_dates').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ blocked_date: data }, { status: 201 });
}
