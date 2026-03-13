// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';

function isItalianHoliday(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return [[1,1],[1,6],[4,25],[5,1],[6,2],[8,15],[11,1],[12,8],[12,25],[12,26]].some(([hm,hd]) => hm===m && hd===d);
}

function isAltaStagione(date) {
  const y = date.getFullYear();
  const start = new Date(y,5,4);
  const end = new Date(y,8,30);
  return date >= start && date <= end;
}

function isAltaAvanzata(date) {
  const y = date.getFullYear();
  const start = new Date(y,5,12);
  const end = new Date(y,8,30);
  return date >= start && date <= end;
}

function getNightPrice(date) {
  const dow = date.getDay();
  const alta = isAltaStagione(date);
  const avanzata = isAltaAvanzata(date);
  const ferragosto = date.getMonth()===7 && date.getDate()===15;
  const holiday = isItalianHoliday(date);
  if (ferragosto) return 2500;
  if (dow===6 || (holiday && dow!==0)) return avanzata ? 2100 : 1700;
  if (dow===0) return alta ? 950 : 720;
  if (dow===5) return alta ? 1550 : 950;
  return alta ? 850 : 700;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkIn = searchParams.get('check_in');
  const checkOut = searchParams.get('check_out');
  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: 'Parametri mancanti' }, { status: 400 });
  }
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const days = [];
  const cur = new Date(start);
  while (cur < end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  const nights = days.length;
  let subtotalFull = 0;
  let hasAlta = false;
  const breakdown = days.map((day) => {
    const price = getNightPrice(day);
    if (isAltaStagione(day)) hasAlta = true;
    subtotalFull += price;
    return { date: day.toISOString().split('T')[0], price };
  });
  const discountRate = nights > 5 ? (hasAlta ? 0.25 : 0.30) : nights === 5 ? (hasAlta ? 0.20 : 0.15) : 0;
  const discountAmount = Math.round(subtotalFull * discountRate);
  const subtotal = subtotalFull - discountAmount;
  const total = subtotal;
  const deposit = Math.round(total * 0.30);
  return NextResponse.json({
    nights,
    price_per_night: nights > 0 ? Math.round(subtotal / nights) : 0,
    subtotal,
    subtotal_before_discount: subtotalFull,
    discount_percentage: Math.round(discountRate * 100),
    cleaning_fee: 0,
    total,
    deposit,
    remaining: total - deposit,
    breakdown,
  });
}
