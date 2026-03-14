// @ts-nocheck
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const ICAL_URL = 'https://ical.booking.com/v1/export/t/4c06f967-da88-4bc6-acc1-d3d21cbe61e9.ics';

export async function GET() {
  try {
    const res = await fetch(ICAL_URL);
    const text = await res.text();
    
    const dates = [];
    const lines = text.split('\n');
    let inEvent = false;
    let start = '';
    let end = '';
    
    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) inEvent = true;
      if (line.startsWith('END:VEVENT')) {
        if (start && end) {
          const s = new Date(start.slice(0,4)+'-'+start.slice(4,6)+'-'+start.slice(6,8));
          const e = new Date(end.slice(0,4)+'-'+end.slice(4,6)+'-'+end.slice(6,8));
          for (let d = new Date(s); d < e; d.setDate(d.getDate()+1)) {
            dates.push(d.toISOString().split('T')[0]);
          }
        }
        inEvent = false; start = ''; end = '';
      }
      if (inEvent && line.startsWith('DTSTART')) start = line.split(':')[1].trim();
      if (inEvent && line.startsWith('DTEND')) end = line.split(':')[1].trim();
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    for (const date of dates) {
      await supabase.from('blocked_dates').upsert({ date, reason: 'Booking.com' }, { onConflict: 'date' });
    }

    return NextResponse.json({ success: true, synced: dates.length, dates });
  } catch (error) {
    return NextResponse.json({ error: 'Errore sincronizzazione' }, { status: 500 });
  }
}
