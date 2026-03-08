// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  parseISO,
  isWeekend,
  isSameDay,
} from 'date-fns';
import { it } from 'date-fns/locale';
import { PriceCalculation } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMM yyyy', { locale: it });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function calculateNights(checkIn: string, checkOut: string): number {
  return differenceInDays(parseISO(checkOut), parseISO(checkIn));
}

export function getDatesInRange(checkIn: string, checkOut: string): string[] {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  return eachDayOfInterval({ start, end }).map((d) =>
    format(d, 'yyyy-MM-dd')
  );
}

export function calculatePrice(
  checkIn: string,
  checkOut: string,
  prices: { date: string; price: number }[]
): PriceCalculation {
  const priceMap = new Map(prices.map((p) => [p.date, p.price]));
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  const days = eachDayOfInterval({ start, end });
  // Escludi l'ultimo giorno (check-out day non si paga)
  const nightDays = days.slice(0, -1);

  const defaultWeekday = Number(process.env.DEFAULT_PRICE_WEEKDAY || 180);
  const defaultWeekend = Number(process.env.DEFAULT_PRICE_WEEKEND || 220);

  let subtotal = 0;
  const breakdown = nightDays.map((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const price = priceMap.get(dateStr) || (isWeekend(day) ? defaultWeekend : defaultWeekday);
    subtotal += price;
    return { date: dateStr, price };
  });

  const nights = nightDays.length;
  const cleaning_fee = Number(process.env.CLEANING_FEE || 80);
  const total = subtotal + cleaning_fee;
  const depositPerc = Number(process.env.DEPOSIT_PERCENTAGE || 30) / 100;
  const deposit = Math.round(total * depositPerc);
  const remaining = total - deposit;
  const price_per_night = nights > 0 ? Math.round(subtotal / nights) : 0;

  return {
    nights,
    price_per_night,
    subtotal,
    cleaning_fee,
    total,
    deposit,
    remaining,
    breakdown,
  };
}

export function isDateBlocked(
  date: Date,
  blockedDates: string[],
  bookedDates: string[]
): boolean {
  const dateStr = format(date, 'yyyy-MM-dd');
  return (
    blockedDates.some((d) => isSameDay(parseISO(d), date)) ||
    bookedDates.some((d) => isSameDay(parseISO(d), date))
  );
}

export function generateAdminToken(secret: string): string {
  // Semplice hash per sessione admin
  return Buffer.from(`villa-admin:${secret}:${Date.now()}`).toString('base64');
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
