// src/app/api/availability/route.ts
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { format, eachDayOfInterval, parseISO } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const { data: blocked } = await supabaseAdmin.from('blocked_dates').select('date');
    const { data: bookings } = await supabaseAdmin
      .from('bookings').select('check_in, check_out').in('status', ['confirmed', 'pending']);

    const bookedDates = new Set<string>();
    (bookings || []).forEach((b) => {
      eachDayOfInterval({ start: parseISO(b.check_in), end: parseISO(b.check_out) })
        .forEach((d) => bookedDates.add(format(d, 'yyyy-MM-dd')));
    });

    return NextResponse.json({
      blocked_dates: (blocked || []).map((b) => b.date),
      booked_dates: Array.from(bookedDates),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
