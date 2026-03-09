-- ============================================================
-- VILLA VERSILIA - Schema Database Supabase
-- Esegui nell'editor SQL di Supabase → SQL Editor → New query
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PRENOTAZIONI
CREATE TABLE IF NOT EXISTS bookings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_in          DATE NOT NULL,
  check_out         DATE NOT NULL,
  guest_name        TEXT NOT NULL,
  guest_email       TEXT NOT NULL,
  guest_phone       TEXT NOT NULL,
  guests_count      INTEGER NOT NULL DEFAULT 1 CHECK (guests_count BETWEEN 1 AND 10),
  message           TEXT,
  total_price       NUMERIC(10,2) NOT NULL,
  deposit_paid      NUMERIC(10,2) NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','cancelled','completed')),
  payment_intent_id TEXT,
  stripe_session_id TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_dates CHECK (check_out > check_in)
);

-- DATE BLOCCATE
CREATE TABLE IF NOT EXISTS blocked_dates (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date       DATE NOT NULL UNIQUE,
  reason     TEXT DEFAULT 'Bloccato dal proprietario',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PREZZI PER PERIODO
CREATE TABLE IF NOT EXISTS prices (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date_from        DATE NOT NULL,
  date_to          DATE NOT NULL,
  price_per_night  NUMERIC(10,2) NOT NULL CHECK (price_per_night > 0),
  type             TEXT NOT NULL DEFAULT 'standard'
                   CHECK (type IN ('standard','weekend','peak','low')),
  label            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT check_price_dates CHECK (date_to >= date_from)
);

-- INDICI
CREATE INDEX IF NOT EXISTS idx_bookings_dates  ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_blocked_date    ON blocked_dates(date);
CREATE INDEX IF NOT EXISTS idx_prices_dates    ON prices(date_from, date_to);

-- AUTO updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ language 'plpgsql';
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- RLS
ALTER TABLE bookings     ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices        ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_blocked" ON blocked_dates FOR SELECT USING (true);
CREATE POLICY "public_read_prices"  ON prices        FOR SELECT USING (true);
CREATE POLICY "service_bookings"    ON bookings      USING (true) WITH CHECK (true);
CREATE POLICY "service_blocked"     ON blocked_dates USING (true) WITH CHECK (true);
CREATE POLICY "service_prices"      ON prices        USING (true) WITH CHECK (true);

-- PREZZI INIZIALI
INSERT INTO prices (date_from, date_to, price_per_night, type, label) VALUES
  ('2025-06-01','2025-06-30',160,'standard','Giugno 2025'),
  ('2025-07-01','2025-07-31',220,'peak','Luglio 2025 Alta Stagione'),
  ('2025-08-01','2025-08-31',250,'peak','Agosto 2025 Alta Stagione'),
  ('2025-09-01','2025-09-30',170,'standard','Settembre 2025'),
  ('2026-06-01','2026-06-30',170,'standard','Giugno 2026'),
  ('2026-07-01','2026-07-31',230,'peak','Luglio 2026 Alta Stagione'),
  ('2026-08-01','2026-08-31',260,'peak','Agosto 2026 Alta Stagione'),
  ('2026-09-01','2026-09-30',180,'standard','Settembre 2026')
ON CONFLICT DO NOTHING;
