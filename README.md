# Villa Versilia Relais — Sito Web Completo

> Casa vacanze a Lido di Camaiore, Versilia, Toscana  
> Via Adolfo Massei 28 · 250m dal mare · Fino a 10 ospiti

---

## 📁 Struttura del Progetto

```
villa-versilia/
├── src/
│   ├── app/
│   │   ├── (site)/               # Pagine pubbliche con header/footer
│   │   │   ├── page.tsx          # Home
│   │   │   ├── la-villa/         # Descrizione villa
│   │   │   ├── disponibilita/    # Calendario disponibilità
│   │   │   ├── prenotazione/     # Form prenotazione
│   │   │   └── conferma/         # Pagina conferma pagamento
│   │   ├── admin/
│   │   │   ├── login/            # Login admin
│   │   │   └── dashboard/        # Pannello gestione
│   │   ├── api/
│   │   │   ├── availability/     # API disponibilità
│   │   │   ├── bookings/         # API prenotazioni (CRUD)
│   │   │   ├── prices/           # API calcolo prezzi
│   │   │   ├── stripe/
│   │   │   │   ├── create-payment/  # Crea sessione Stripe
│   │   │   │   └── webhook/         # Webhook Stripe
│   │   │   └── admin/
│   │   │       ├── auth/         # Login admin
│   │   │       ├── blocked-dates/ # Gestione date bloccate
│   │   │       └── prices/       # Gestione prezzi
│   │   ├── layout.tsx            # Root layout con SEO
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Navbar responsive
│   │   │   └── Footer.tsx        # Footer con info contatti
│   │   └── ui/
│   │       └── WhatsAppButton.tsx # Pulsante WhatsApp fisso
│   ├── lib/
│   │   ├── supabase.ts           # Client Supabase
│   │   ├── stripe.ts             # Client Stripe
│   │   ├── email.ts              # Nodemailer (invio email)
│   │   └── utils.ts              # Funzioni utility
│   └── types/
│       └── index.ts              # TypeScript types
├── supabase/
│   └── schema.sql                # Schema database completo
├── .env.example                  # Variabili d'ambiente
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Installazione Passo-Passo

### 1. Prerequisiti
- **Node.js** 18+ installato → https://nodejs.org
- **Git** installato → https://git-scm.com
- Account **Supabase** gratuito → https://supabase.com
- Account **Stripe** → https://stripe.com
- Account **Vercel** → https://vercel.com

---

### 2. Preparare il Progetto

```bash
# Entra nella cartella
cd villa-versilia

# Installa le dipendenze
npm install

# Copia il file delle variabili d'ambiente
cp .env.example .env.local
```

---

### 3. Configurare Supabase

1. Vai su **https://supabase.com** → crea un account gratuito
2. Clicca **"New Project"** → scegli un nome (es. `villa-versilia`)
3. Scegli la regione **Europe (Frankfurt)** per latenza minima
4. Vai su **SQL Editor** → clicca **"New query"**
5. Copia e incolla il contenuto di `supabase/schema.sql`
6. Clicca **"Run"** → le tabelle saranno create

7. Vai su **Settings → API**:
   - Copia `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copia `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copia `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

8. Aggiorna `.env.local` con questi valori.

---

### 4. Configurare Stripe

1. Vai su **https://stripe.com** → crea un account
2. Vai su **Developers → API keys**:
   - Copia la **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Copia la **Secret key** → `STRIPE_SECRET_KEY`

3. **Configurare il Webhook** (per conferma pagamento automatica):
   - Vai su **Developers → Webhooks → Add endpoint**
   - URL: `https://tuo-dominio.it/api/stripe/webhook`
   - Events da ascoltare:
     - `checkout.session.completed`
     - `checkout.session.expired`
     - `payment_intent.payment_failed`
   - Copia il **Webhook signing secret** → `STRIPE_WEBHOOK_SECRET`

4. **Per test in locale**, installa Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

---

### 5. Configurare l'Email (Gmail)

1. Vai su **https://myaccount.google.com**
2. Sicurezza → Verifica in due passaggi (attiva se non l'hai)
3. Sicurezza → **Password per le app**
4. Genera una password per "Posta" → copia i 16 caratteri
5. In `.env.local`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=villaversiliarelais@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx   # password app generata
EMAIL_FROM=Villa Versilia Relais <villaversiliarelais@gmail.com>
```

---

### 6. Completare `.env.local`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=villaversiliarelais@gmail.com
EMAIL_PASS=la-tua-app-password
EMAIL_FROM=Villa Versilia Relais <villaversiliarelais@gmail.com>

# Admin (scegli una password sicura!)
ADMIN_SECRET_KEY=SceglieUnaPasswordMoltoSicura2024!

# Sito
NEXT_PUBLIC_SITE_URL=https://www.villaversilia.it
NEXT_PUBLIC_WHATSAPP_NUMBER=393755455596
NEXT_PUBLIC_CONTACT_EMAIL=villaversiliarelais@gmail.com
NEXT_PUBLIC_ADDRESS=Via Adolfo Massei 28, Lido di Camaiore (LU)

# Google Maps (opzionale)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaxxxx

# Prezzi default
DEFAULT_PRICE_WEEKDAY=180
DEFAULT_PRICE_WEEKEND=220
DEFAULT_PRICE_PEAK=280
CLEANING_FEE=80
DEPOSIT_PERCENTAGE=30
```

---

### 7. Avviare in Locale

```bash
npm run dev
```

Apri **http://localhost:3000** nel browser.

- 🏠 Home: http://localhost:3000
- 🏡 La Villa: http://localhost:3000/la-villa
- 📅 Disponibilità: http://localhost:3000/disponibilita
- 📋 Prenota: http://localhost:3000/prenotazione
- 🔐 Admin: http://localhost:3000/admin/login

---

### 8. Pubblicare su Vercel

```bash
# Installa Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (segui le istruzioni)
vercel

# Per deploy in produzione
vercel --prod
```

**In alternativa via GitHub:**
1. Crea un repository su GitHub e fai push del codice
2. Vai su **vercel.com** → "Add New Project"
3. Importa il repository GitHub
4. Nella sezione **Environment Variables**, aggiungi tutte le variabili del `.env.local`
5. Clicca **Deploy**

---

### 9. Collegare il Dominio

**Su Vercel:**
1. Vai sul tuo progetto → **Settings → Domains**
2. Aggiungi il tuo dominio (es. `villaversilia.it`)
3. Vercel ti darà i record DNS da configurare

**Sul tuo registrar (es. Aruba, Register.it, GoDaddy):**
- Aggiungi record **A** con IP fornito da Vercel
- O record **CNAME** per `www` puntando a `cname.vercel-dns.com`

**Aggiorna l'env su Vercel:**
- `NEXT_PUBLIC_SITE_URL` = `https://www.villaversilia.it`

**Aggiorna il webhook Stripe:**
- URL → `https://www.villaversilia.it/api/stripe/webhook`

---

## 📸 Aggiungere Foto Reali

Le foto placeholder vengono da Unsplash. Per usare le tue foto:

1. Carica le foto su **Supabase Storage** o un CDN
2. Sostituisci gli URL nelle pagine `page.tsx` e `la-villa/page.tsx`
3. Le dimensioni consigliate:
   - Hero: 1920×1080px
   - Galleria: 800×600px
   - Camere: 800×600px

---

## 🔐 Accesso Admin

URL: `https://tuo-dominio/admin/login`  
Password: il valore di `ADMIN_SECRET_KEY` nel tuo `.env.local`

**Funzionalità admin:**
- ✅ Vedere tutte le prenotazioni con stato
- ✅ Confermare/cancellare prenotazioni manualmente
- ✅ Bloccare date per uso personale o manutenzione
- ✅ Impostare prezzi speciali per periodi (alta stagione, ecc.)
- ✅ Contattare gli ospiti via email o WhatsApp

---

## 💰 Gestione Prezzi

I prezzi si aggiornano in due modi:

**1. Prezzi default** (nel file `.env.local`):
```
DEFAULT_PRICE_WEEKDAY=180   # Lun-Gio
DEFAULT_PRICE_WEEKEND=220   # Ven-Dom
CLEANING_FEE=80             # Pulizie fisse
DEPOSIT_PERCENTAGE=30       # % caparra
```

**2. Prezzi speciali** (dal pannello admin):
- Vai su Admin → Prezzi
- Aggiungi un periodo con prezzo personalizzato
- Es: luglio-agosto = €280/notte

---

## 📱 Funzionalità Incluse

| Funzione | Status |
|----------|--------|
| Homepage con hero, features, gallery | ✅ |
| Pagina La Villa con dettaglio camere | ✅ |
| Calendario disponibilità interattivo | ✅ |
| Form prenotazione 3 step | ✅ |
| Calcolo prezzo automatico | ✅ |
| Pagamento Stripe (caparra o totale) | ✅ |
| Email di conferma automatica | ✅ |
| Pannello admin | ✅ |
| Blocco date automatico post-pagamento | ✅ |
| Pulsante WhatsApp fisso | ✅ |
| Google Maps integrato | ✅ |
| SEO ottimizzato + sitemap | ✅ |
| Mobile-first responsive | ✅ |
| Schema JSON-LD per Google | ✅ |
| Testimonianze ospiti | ✅ |
| FAQ con accordion | ✅ |

---

## 🆘 Supporto

Per problemi o domande:  
📧 villaversiliarelais@gmail.com  
📱 +39 375 545 5596
