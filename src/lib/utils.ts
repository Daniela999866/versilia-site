// @ts-nocheck
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { differenceInDays, eachDayOfInterval, format, parseISO, isSameDay, isBefore, isAfter } from 'date-fns';
import { it } from 'date-fns/locale';

export function cn(...inputs) { return twMerge(clsx(inputs)); }

export function formatDate(date) {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd MMM yyyy', { locale: it });
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function calculateNights(checkIn, checkOut) {
  return differenceInDays(parseISO(checkOut), parseISO(checkIn));
}

export function getDatesInRange(checkIn, checkOut) {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  return eachDayOfInterval({ start, end }).map((d) => format(d, 'yyyy-MM-dd'));
}

function isItalianHoliday(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return [[1,1],[1,6],[4,25],[5,1],[6,2],[8,15],[11,1],[12,8],[12,25],[12,26]].some(([hm,hd]) => hm===m && hd===d);
}

function isAltaStagione(date) {
  const y = date.getFullYear();
  return !isBefore(date, new Date(y,5,4)) && !isAfter(date, new Date(y,8,30));
}

function isAltaAvanzata(date) {
  const y = date.getFullYear();
  return !isBefore(date, new Date(y,5,12)) && !isAfter(date, new Date(y,8,30));
}

export function getNightPrice(date) {
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

export function calculatePrice(checkIn, checkOut, _prices) {
  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  const nightDays = eachDayOfInterval({ start, end }).slice(0, -1);
  const nights = nightDays.length;
  let subtotalFull = 0;
  let hasAlta = false;
  const breakdown = nightDays.map((day) => {
    const price = getNightPrice(day);
    if (isAltaStagione(day)) hasAlta = true;
    subtotalFull += price;
    return { date: format(day, 'yyyy-MM-dd'), price };
  });
  const discountRate = nights > 5 ? (hasAlta ? 0.25 : 0.30) : nights === 5 ? (hasAlta ? 0.20 : 0.15) : 0;
  const discountAmount = Math.round(subtotalFull * discountRate);
  const subtotal = subtotalFull - discountAmount;
  const total = subtotal;
  const deposit = Math.round(total * 0.30);
  return {
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
  };
}

export function isDateBlocked(date, blockedDates, bookedDates) {
  return blockedDates.some((d) => isSameDay(parseISO(d), date)) || bookedDates.some((d) => isSameDay(parseISO(d), date));
}

export function generateAdminToken(secret) {
  return Buffer.from(`villa-admin:${secret}:${Date.now()}`).toString('base64');
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
