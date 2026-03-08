'use client';
// src/app/admin/dashboard/page.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { formatCurrency } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import {
  CalendarDays, Users, Euro, TrendingUp, CheckCircle, Clock,
  XCircle, Trash2, Ban, Plus, LogOut, RefreshCw, ChevronDown,
  Edit, Eye
} from 'lucide-react';

type Booking = {
  id: string;
  check_in: string;
  check_out: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  total_price: number;
  deposit_paid: number;
  status: string;
  message?: string;
  created_at: string;
};

type BlockedDate = {
  id: string;
  date: string;
  reason?: string;
};

type PriceRange = {
  id: string;
  date_from: string;
  date_to: string;
  price_per_night: number;
  label?: string;
};

const statusBadge: Record<string, { label: string; cls: string }> = {
  confirmed:  { label: 'Confermata',  cls: 'bg-green-100 text-green-700' },
  pending:    { label: 'In attesa',   cls: 'bg-yellow-100 text-yellow-700' },
  cancelled:  { label: 'Cancellata', cls: 'bg-red-100 text-red-700' },
  completed:  { label: 'Completata', cls: 'bg-blue-100 text-blue-700' },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<'bookings' | 'calendar' | 'prices'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');
  const [newPrice, setNewPrice] = useState({ date_from: '', date_to: '', price_per_night: '', label: '' });
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  // Get token from localStorage
  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) { router.push('/admin/login'); return; }
    setToken(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    fetchAll();
  }, [token]);

  const authHeaders = () => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [bRes, bdRes, pRes] = await Promise.all([
        fetch('/api/bookings', { headers: authHeaders() }),
        fetch('/api/admin/blocked-dates', { headers: authHeaders() }),
        fetch('/api/admin/prices', { headers: authHeaders() }),
      ]);

      if (bRes.status === 401) { router.push('/admin/login'); return; }

      const [bData, bdData, pData] = await Promise.all([bRes.json(), bdRes.json(), pRes.json()]);

      setBookings(bData.bookings || []);
      setBlockedDates(bdData.blocked_dates || []);
      setPriceRanges(pData.prices || []);
    } catch (err) {
      toast.error('Errore nel caricamento dati');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      toast.success('Stato aggiornato');
      fetchAll();
    } catch { toast.error('Errore aggiornamento'); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Cancellare questa prenotazione?')) return;
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE', headers: authHeaders() });
      toast.success('Prenotazione cancellata');
      fetchAll();
    } catch { toast.error('Errore cancellazione'); }
  };

  const addBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ date: newBlockDate, reason: newBlockReason }),
      });
      toast.success('Data bloccata');
      setNewBlockDate('');
      setNewBlockReason('');
      fetchAll();
    } catch { toast.error('Errore'); }
  };

  const removeBlockedDate = async (id: string) => {
    try {
      await fetch(`/api/admin/blocked-dates/${id}`, { method: 'DELETE', headers: authHeaders() });
      toast.success('Data sbloccata');
      fetchAll();
    } catch { toast.error('Errore'); }
  };

  const addPriceRange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/admin/prices', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...newPrice, price_per_night: Number(newPrice.price_per_night) }),
      });
      toast.success('Prezzo aggiunto');
      setNewPrice({ date_from: '', date_to: '', price_per_night: '', label: '' });
      fetchAll();
    } catch { toast.error('Errore'); }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  // Stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    revenue: bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.total_price, 0),
  };

  if (loading && !token) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="font-display text-xl tracking-widest uppercase">Villa Versilia</h1>
          <p className="text-gray-400 text-xs">Pannello Amministratore</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchAll} className="p-2 hover:bg-gray-800 transition-colors" title="Aggiorna">
            <RefreshCw className="w-4 h-4" />
          </button>
          <a href="/" target="_blank" className="p-2 hover:bg-gray-800 transition-colors" title="Vai al sito">
            <Eye className="w-4 h-4" />
          </a>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-bold transition-colors">
            <LogOut className="w-4 h-4" />
            Esci
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CalendarDays, label: 'Totale Prenotazioni', value: stats.total, color: 'bg-blue-500' },
            { icon: CheckCircle, label: 'Confermate', value: stats.confirmed, color: 'bg-green-500' },
            { icon: Clock, label: 'In Attesa', value: stats.pending, color: 'bg-yellow-500' },
            { icon: Euro, label: 'Fatturato Totale', value: formatCurrency(stats.revenue), color: 'bg-gold-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
                <div className={`w-8 h-8 ${color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900">{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {[
            { id: 'bookings', label: 'Prenotazioni' },
            { id: 'calendar', label: 'Date Bloccate' },
            { id: 'prices', label: 'Prezzi' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={`px-5 py-3 text-sm font-bold tracking-wide transition-colors ${
                tab === id
                  ? 'border-b-2 border-gold-500 text-gold-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white p-12 text-center text-gray-400">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nessuna prenotazione ancora</p>
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} className="bg-white shadow-sm overflow-hidden">
                  {/* Booking header */}
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedBooking(expandedBooking === b.id ? null : b.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-bold text-gray-900">{b.guest_name}</div>
                        <div className="text-sm text-gray-500">
                          {format(parseISO(b.check_in), 'dd MMM', { locale: it })} →{' '}
                          {format(parseISO(b.check_out), 'dd MMM yyyy', { locale: it })}
                          {' · '}{b.guests_count} ospiti
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded ${statusBadge[b.status]?.cls || 'bg-gray-100'}`}>
                        {statusBadge[b.status]?.label || b.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gold-600 hidden sm:block">{formatCurrency(b.total_price)}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedBooking === b.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {expandedBooking === b.id && (
                    <div className="border-t border-gray-100 p-5 bg-gray-50">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div><span className="text-gray-500 block text-xs">Email</span>{b.guest_email}</div>
                        <div><span className="text-gray-500 block text-xs">Telefono</span>{b.guest_phone}</div>
                        <div><span className="text-gray-500 block text-xs">Caparra</span>{formatCurrency(b.deposit_paid)}</div>
                        <div><span className="text-gray-500 block text-xs">Prenotata il</span>{format(parseISO(b.created_at), 'dd/MM/yyyy')}</div>
                      </div>
                      {b.message && (
                        <div className="bg-white p-3 text-sm text-gray-600 border border-gray-200 mb-4">
                          <span className="font-bold text-gray-700 block text-xs mb-1">Messaggio ospite:</span>
                          {b.message}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {b.status === 'pending' && (
                          <button onClick={() => updateBookingStatus(b.id, 'confirmed')} className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5" />Conferma
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button onClick={() => updateBookingStatus(b.id, 'completed')} className="flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5" />Segna Completata
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button onClick={() => updateBookingStatus(b.id, 'cancelled')} className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors">
                            <XCircle className="w-3.5 h-3.5" />Cancella
                          </button>
                        )}
                        <button onClick={() => deleteBooking(b.id)} className="flex items-center gap-1.5 px-4 py-2 bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />Elimina
                        </button>
                        <a href={`mailto:${b.guest_email}`} className="flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300 transition-colors">
                          Scrivi Email
                        </a>
                        <a href={`https://wa.me/${b.guest_phone.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 text-xs font-bold hover:bg-green-200 transition-colors">
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* BLOCKED DATES TAB */}
        {tab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-gray-900 mb-4">Date bloccate manualmente</h2>
              <form onSubmit={addBlockedDate} className="bg-white p-5 shadow-sm mb-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Data da bloccare</label>
                    <input
                      type="date"
                      value={newBlockDate}
                      onChange={(e) => setNewBlockDate(e.target.value)}
                      required
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Motivo (opzionale)</label>
                    <input
                      type="text"
                      value={newBlockReason}
                      onChange={(e) => setNewBlockReason(e.target.value)}
                      placeholder="es. Manutenzione, uso personale..."
                      className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-white text-sm font-bold hover:bg-gold-600 transition-colors">
                    <Ban className="w-4 h-4" />
                    Blocca Data
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {blockedDates.length === 0 ? (
                  <p className="text-gray-400 text-sm">Nessuna data bloccata</p>
                ) : (
                  blockedDates.map((d) => (
                    <div key={d.id} className="bg-white p-4 shadow-sm flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-800 text-sm">
                          {format(parseISO(d.date), 'dd MMMM yyyy', { locale: it })}
                        </div>
                        {d.reason && <div className="text-xs text-gray-500">{d.reason}</div>}
                      </div>
                      <button
                        onClick={() => removeBlockedDate(d.id)}
                        className="p-1.5 hover:bg-red-100 text-red-500 transition-colors"
                        title="Sblocca"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white p-5 shadow-sm self-start">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Come funziona</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2"><span className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">P</span>Date con prenotazione confermata (automatiche)</li>
                <li className="flex items-start gap-2"><span className="w-5 h-5 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">B</span>Date bloccate manualmente (questa sezione)</li>
                <li className="flex items-start gap-2"><span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>Date libere – visibili come disponibili agli ospiti</li>
              </ul>
            </div>
          </div>
        )}

        {/* PRICES TAB */}
        {tab === 'prices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="font-bold text-gray-900 mb-4">Gestione Prezzi Speciali</h2>
              <form onSubmit={addPriceRange} className="bg-white p-5 shadow-sm mb-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Dal</label>
                      <input
                        type="date"
                        value={newPrice.date_from}
                        onChange={(e) => setNewPrice({ ...newPrice, date_from: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Al</label>
                      <input
                        type="date"
                        value={newPrice.date_to}
                        onChange={(e) => setNewPrice({ ...newPrice, date_to: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Prezzo per notte (€)</label>
                    <input
                      type="number"
                      value={newPrice.price_per_night}
                      onChange={(e) => setNewPrice({ ...newPrice, price_per_night: e.target.value })}
                      required
                      min="1"
                      placeholder="280"
                      className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Etichetta</label>
                    <input
                      type="text"
                      value={newPrice.label}
                      onChange={(e) => setNewPrice({ ...newPrice, label: e.target.value })}
                      placeholder="es. Alta stagione, Ferragosto..."
                      className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-white text-sm font-bold hover:bg-gold-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Aggiungi Periodo
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                {priceRanges.length === 0 ? (
                  <p className="text-gray-400 text-sm">Nessun prezzo speciale configurato. Si usano i prezzi di default.</p>
                ) : (
                  priceRanges.map((p) => (
                    <div key={p.id} className="bg-white p-4 shadow-sm flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-800 text-sm">
                          {p.label || 'Prezzo speciale'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(parseISO(p.date_from), 'dd/MM/yyyy')} → {format(parseISO(p.date_to), 'dd/MM/yyyy')}
                        </div>
                      </div>
                      <div className="text-gold-600 font-bold">{formatCurrency(p.price_per_night)}/notte</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white p-5 shadow-sm self-start">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Prezzi di default (dal .env)</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Giorni feriali (lun-gio)</span>
                  <span className="font-bold">€180/notte</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Weekend (ven-dom)</span>
                  <span className="font-bold">€220/notte</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Pulizie finali</span>
                  <span className="font-bold">€80 (fisso)</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Caparra richiesta</span>
                  <span className="font-bold">30%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Per modificare i prezzi di default, aggiorna le variabili nel file .env.local e ridistribuisci su Vercel.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
