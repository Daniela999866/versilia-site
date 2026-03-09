import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── BLU BRAND · campionato dal logo VV + "VILLA VERSILIA" ────────
        // Base: #296092  (41, 96, 146)  ← esatto dal logo
        brand: {
          50:  '#EEF4FA',
          100: '#D1E3F1',
          200: '#A3C6E3',
          300: '#6EA3CF',
          400: '#4180B8',
          500: '#296092',   // ← LOGO EXACT — VV monogram + arched text
          600: '#1E4A73',
          700: '#153657',
          800: '#0D243B',
          900: '#071420',
        },
        // ── ORO CORONA · campionato dalla corona e dal punto divisore ────
        // Base: #AF8649  (175, 134, 73)  ← esatto dal logo
        gold: {
          50:  '#FAF5EB',
          100: '#F2E6CC',
          200: '#E5CD99',
          300: '#D4AE66',
          400: '#C29440',  
          500: '#AF8649',   // ← LOGO EXACT — corona + punto oro
          600: '#8C6A35',
          700: '#6A5028',
          800: '#48361A',
          900: '#261C0D',
        },
        // ── BLU-GRIGIO SOTTOTITOLO · "LIDO DI CAMAIORE · TUSCANY" ────────
        // Base: #839EB8  (131, 158, 184)  ← esatto dal logo
        muted: {
          100: '#F0F3F7',
          200: '#D8E1EA',
          300: '#B9C8D6',
          400: '#9BB2C5',
          500: '#839EB8',   // ← LOGO EXACT — testi secondari, didascalie
          600: '#607D96',
          700: '#475E72',
          800: '#2F3E4D',
          900: '#181F27',
        },
        // ── CREMA SFONDO · dal background del logo ────────────────────────
        // #FEFBF6  (254, 251, 246)  ← esatto dal logo
        cream: {
          50:  '#FFFFFF',
          100: '#FEFBF6',   // ← LOGO EXACT — sfondo base pagine
          200: '#F7F2E8',
          300: '#EDE4D3',
          400: '#DDD0B8',
          500: '#C8B898',
        },
        // ── GRIGIO LINEE SEPARATORE · dal logo ────────────────────────────
        // #ABADAD  ← esatto dal logo
        line: {
          100: '#F0F0F0',
          200: '#E0E0E0',
          300: '#CACACA',
          400: '#ABADAD',   // ← LOGO EXACT — linee decorative, bordi
          500: '#8A8C8C',
          600: '#6A6C6C',
        },
        // ── SALVIA · ulivi giardino, conferme, disponibilità ──────────────
        sage: {
          100: '#E8F0EC',
          200: '#C5D8CC',
          300: '#8FB8A0',
          400: '#5E9674',
          500: '#3E7A58',
          600: '#2C5C40',
        },
        // ── TERRACOTTA · vasi giardino, accent caldo ──────────────────────
        terra: {
          100: '#F7E8DF',
          200: '#EDCFBE',
          300: '#D9A88A',
          400: '#C07F56',
          500: '#A5612E',
          600: '#854A1E',
        },
      },

      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body:    ['var(--font-lato)', 'system-ui', 'sans-serif'],
        accent:  ['var(--font-cormorant)', 'Georgia', 'serif'],
      },

      backgroundImage: {
        // Versilia Deep Sea — sezioni scure, testimonial, CTA finale
        'deep-sea':          'linear-gradient(135deg, #153657 0%, #296092 55%, #4180B8 100%)',
        'deep-sea-180':      'linear-gradient(180deg, #153657 0%, #296092 100%)',
        // Hero Overlay — sopra le foto, testo sempre leggibile
        'hero-overlay':      'linear-gradient(to top, rgba(13,36,59,0.90) 0%, rgba(13,36,59,0.40) 50%, rgba(13,36,59,0.00) 100%)',
        'hero-overlay-full': 'linear-gradient(to top, rgba(13,36,59,0.95) 0%, rgba(13,36,59,0.60) 55%, rgba(13,36,59,0.10) 100%)',
        'hero-overlay-side': 'linear-gradient(to right, rgba(13,36,59,0.88) 0%, rgba(13,36,59,0.45) 55%, rgba(13,36,59,0.00) 100%)',
        // Accent
        'gold-shimmer':      'linear-gradient(135deg, #AF8649 0%, #D4AE66 50%, #AF8649 100%)',
        'cream-warm':        'linear-gradient(180deg, #FFFFFF 0%, #FEFBF6 100%)',
        'brand-gradient':    'linear-gradient(135deg, #0D243B 0%, #296092 100%)',
      },

      animation: {
        'fade-in':   'fadeIn 0.6s ease-out forwards',
        'slide-up':  'slideUp 0.7s ease-out forwards',
        'slide-down':'slideDown 0.5s ease-out forwards',
        'scale-in':  'scaleIn 0.5s ease-out forwards',
        float:       'float 6s ease-in-out infinite',
      },

      keyframes: {
        fadeIn:    { '0%': { opacity: '0' },                              '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(30px)'},'100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-20px)'},'100%':{ opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { '0%': { opacity: '0', transform: 'scale(0.95)' },    '100%': { opacity: '1', transform: 'scale(1)' } },
        float:     { '0%, 100%': { transform: 'translateY(0px)' },         '50%': { transform: 'translateY(-10px)' } },
      },

      boxShadow: {
        gold:         '0 4px 24px rgba(175,134,73,0.20)',
        'gold-lg':    '0 10px 40px rgba(175,134,73,0.28)',
        brand:        '0 4px 24px rgba(41,96,146,0.18)',
        'brand-lg':   '0 10px 40px rgba(41,96,146,0.25)',
        card:         '0 2px 16px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.11)',
      },
    },
  },
  plugins: [],
};

export default config;
