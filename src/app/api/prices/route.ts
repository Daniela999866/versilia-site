// src/app/api/prices/route.ts
export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { format, eachDayOfInterval, parseISO, isWeekend } from 'date-fns';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkIn = searchParams.get('check_in');
  const checkOut = searchParams.get('check_out');

  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: 'check_in e check_out richiesti' }, { status: 400 });
  }

  try {
    const { data: priceRanges } = await supabaseAdmin
      .from('prices').select('*')
      .lte('date_from', checkOut).gte('date_to', checkIn);

    const priceMap = new Map<string, number>();
    (priceRanges || []).forEach((range) => {
      eachDayOfInterval({ start: parseISO(range.date_from), end: parseISO(range.date_to) })
        .forEach((d) => priceMap.set(format(d, 'yyyy-MM-dd'), range.price_per_night));
    });

    const days = eachDayOfInterval({ start: parseISO(checkIn), end: parseISO(checkOut) });
    const nightDays = days.slice(0, -1);

    const defaultWeekday = Number(process.env.DEFAULT_PRICE_WEEKDAY || 180);
    const defaultWeekend = Number(process.env.DEFAULT_PRICE_WEEKEND || 220);
    const cleaningFee = Number(process.env.CLEANING_FEE || 80);

    let subtotal = 0;
    const breakdown = nightDays.map((day) => {
      const ds = format(day, 'yyyy-MM-dd');
      const price = priceMap.get(ds) || (isWeekend(day) ? defaultWeekend : defaultWeekday);
      subtotal += price;
      return { date: ds, price };
    });

    const nights = nightDays.length;
    const total = subtotal + cleaningFee;
    const depositPerc = Number(process.env.DEPOSIT_PERCENTAGE || 30) / 100;
    const deposit = Math.round(total * depositPerc);

    return NextResponse.json({
      nights, subtotal, cleaning_fee: cleaningFee, total,
      deposit, remaining: total - deposit,
      price_per_night: nights > 0 ? Math.round(subtotal / nights) : 0,
      breakdown,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
