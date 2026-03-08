'use client';
// src/app/(site)/disponibilita/page.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DayPicker, DateRange } from 'react-day-picker';
import { it } from 'date-fns/locale';
import { format, parseISO, isBefore, startOfToday, addDays } from 'date-fns';
import { formatCurrency } from '@/lib/utils';
import { Calendar, Info, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface AvailabilityData {
  booked_dates: string[];
  blocked_dates: string[];
}

interface PriceData {
  nights: number;
  subtotal: number;
  cleaning_fee: number;
  total: number;
  deposit: number;
  remaining: number;
  price_per_night: number;
}

export default function DisponibilitaPage() {
  const [availability, setAvailability] = useState<AvailabilityData>({ booked_dates: [], blocked_dates: [] });
  const [range, setRange] = useState<DateRange | undefined>();
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const today = startOfToday();

  // Fetch availability on load
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await fetch(`/api/availability?year=${currentYear}`);
        const data = await res.json();
        setAvailability(data);
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      }
    };
    fetchAvailability();
  }, [currentYear]);

  // Fetch price when date range is selected
  useEffect(() => {
    if (!range?.from || !range?.to) {
      setPriceData(null);
      return;
    }
    const checkIn = format(range.from, 'yyyy-MM-dd');
    const checkOut = format(range.to, 'yyyy-MM-dd');

    const fetchPrice = async () => {
      setLoadingPrice(true);
      try {
        const res = await fetch(`/api/prices?check_in=${checkIn}&check_out=${checkOut}`);
        const data = await res.json();
        setPriceData(data);
      } catch (err) {
        console.error('Failed to fetch price:', err);
      } finally {
        setLoadingPrice(false);
      }
    };
    fetchPrice();
  }, [range]);

  const disabledDates = [
    { before: addDays(today, 1) },
    ...availability.booked_dates.map((d) => parseISO(d)),
    ...availability.blocked_dates.map((d) => parseISO(d)),
  ];

  const isDateUnavailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return (
      availability.booked_dates.includes(dateStr) ||
      availability.blocked_dates.includes(dateStr) ||
      isBefore(date, today)
    );
  };

  const modifiers = {
    booked: availability.booked_dates.map((d) => parseISO(d)),
    blocked: availability.blocked_dates.map((d) => parseISO(d)),
  };

  const modifiersStyles = {
    booked: { backgroundColor: '#fee2e2', color: '#991b1b', textDecoration: 'line-through', cursor: 'not-allowed' },
    blocked: { backgroundColor: '#fef3c7', color: '#92400e', textDecoration: 'line-through', cursor: 'not-allowed' },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gray-900 pt-24 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-sea-900 to-gray-900 opacity-90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-accent italic text-muted-300 text-xl mb-2">Controlla</p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-3">
            Disponibilità & Prezzi
          </h1>
          <p className="text-white/60 max-w-md mx-auto">
            Seleziona le date per vedere disponibilità e calcolare il prezzo esatto.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line-200">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  <h2 className="font-display text-xl text-gray-900">Seleziona le date</h2>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 mb-6 text-xs">
                  {[
                    { color: 'bg-cream-200', label: 'Disponibile' },
                    { color: 'bg-red-100', label: 'Prenotato' },
                    { color: 'bg-yellow-100', label: 'Bloccato' },
                    { color: 'bg-gold-500', label: 'Selezionato' },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className={`w-4 h-4 ${color} border border-gray-200`} />
                      <span className="text-gray-500">{label}</span>
                    </div>
                  ))}
                </div>

                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  locale={it}
                  numberOfMonths={2}
                  pagedNavigation
                  showOutsideDays={false}
                  disabled={disabledDates}
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  classNames={{
                    root: 'w-full',
                    months: 'flex flex-col sm:flex-row gap-6',
                    month: 'flex-1',
                    caption: 'flex justify-center relative items-center h-10',
                    caption_label: 'font-display text-base text-gray-800 capitalize',
                    nav: 'flex items-center',
                    nav_button: 'w-8 h-8 flex items-center justify-center hover:bg-cream-200 transition-colors',
                    nav_button_previous: 'absolute left-1',
                    nav_button_next: 'absolute right-1',
                    table: 'w-full border-collapse',
                    head_row: 'flex',
                    head_cell: 'flex-1 text-center text-xs font-bold text-gray-400 uppercase py-2',
                    row: 'flex w-full mt-1',
                    cell: 'flex-1 text-center',
                    day: 'w-full aspect-square max-w-[40px] mx-auto flex items-center justify-center text-sm hover:bg-cream-200 transition-colors',
                    day_range_start: 'bg-gold-500 text-white rounded-l-sm',
                    day_range_end: 'bg-gold-500 text-white rounded-r-sm',
                    day_range_middle: 'bg-cream-200 text-gold-700',
                    day_selected: 'bg-gold-500 text-white',
                    day_today: 'font-bold text-brand-600',
                    day_disabled: 'opacity-30 cursor-not-allowed',
                    day_outside: 'opacity-20',
                  }}
                />

                {/* Clear button */}
                {range && (
                  <button
                    onClick={() => setRange(undefined)}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                  >
                    Cancella selezione
                  </button>
                )}
              </div>
            </div>

            {/* Price summary sidebar */}
            <div className="space-y-6">
              {/* Price summary */}
              {range?.from && range?.to ? (
                <div className="bg-white shadow-card p-6">
                  <h3 className="font-display text-xl text-gray-900 mb-4 pb-3 border-b border-line-200">
                    Riepilogo Prezzi
                  </h3>
                  {loadingPrice ? (
                    <div className="space-y-3 animate-pulse">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-5 bg-cream-200 rounded" />
                      ))}
                    </div>
                  ) : priceData ? (
                    <>
                      <div className="space-y-3 text-sm mb-4">
                        <div className="flex justify-between text-gray-600">
                          <span>Check-in</span>
                          <span className="font-bold text-gray-800">{format(range.from, 'dd/MM/yyyy')}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Check-out</span>
                          <span className="font-bold text-gray-800">{format(range.to, 'dd/MM/yyyy')}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 py-2 border-t border-line-200">
                          <span>{priceData.nights} notti × ~{formatCurrency(priceData.price_per_night)}</span>
                          <span>{formatCurrency(priceData.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Pulizie finali</span>
                          <span>{formatCurrency(priceData.cleaning_fee)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t-2 border-gold-500">
                          <span>Totale</span>
                          <span className="text-gold-600">{formatCurrency(priceData.total)}</span>
                        </div>
                      </div>

                      <div className="bg-cream-100 p-3 text-xs text-gray-500 border border-gold-200 mb-4">
                        <p className="font-bold text-gray-700 mb-1">Caparra richiesta (30%)</p>
                        <p className="text-base font-bold text-gold-600">{formatCurrency(priceData.deposit)}</p>
                        <p className="mt-1">Saldo rimanente: {formatCurrency(priceData.remaining)}</p>
                      </div>

                      <CheckCircle2 className="w-4 h-4 text-green-500 inline mr-1" />
                      <span className="text-xs text-green-700 font-bold">Queste date sono disponibili!</span>

                      <Link
                        href={`/prenotazione?check_in=${format(range.from, 'yyyy-MM-dd')}&check_out=${format(range.to, 'yyyy-MM-dd')}`}
                        className="btn-primary w-full text-center mt-4 block"
                      >
                        Prenota Queste Date
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </>
                  ) : (
                    <div className="text-sm text-red-500 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Date non disponibili o errore nel calcolo
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white shadow-card p-6 text-center">
                  <Calendar className="w-10 h-10 text-gold-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Seleziona le date di check-in e check-out nel calendario per vedere il prezzo.
                  </p>
                </div>
              )}

              {/* Info box */}
              <div className="bg-brand-50 p-5 border border-brand-200">
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-brand-700 space-y-1.5">
                    <p className="font-bold">Informazioni utili</p>
                    <p>• Soggiorno minimo: <strong>3 notti</strong></p>
                    <p>• Check-in: <strong>dalle 16:00</strong></p>
                    <p>• Check-out: <strong>entro le 10:00</strong></p>
                    <p>• Fino a <strong>10 ospiti</strong></p>
                    <p>• Caparra del <strong>30%</strong> alla prenotazione</p>
                    <p>• Prezzi <strong>weekend</strong> (ven-dom) leggermente maggiorati</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp shortcut */}
              <a
                href="https://wa.me/393755455596?text=Ciao!%20Vorrei%20controllare%20la%20disponibilità%20di%20Villa%20Versilia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 hover:bg-green-100 p-4 border border-green-200 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800">Preferisci WhatsApp?</p>
                  <p className="text-xs text-green-600">Scrivici per disponibilità e preventivi</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
