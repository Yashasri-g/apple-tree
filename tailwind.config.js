/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wm: { DEFAULT: '#F45B65', pink: '#FF8E9B', soft: '#FFE3E6', dark: '#D43843' },
        leaf: { DEFAULT: '#75B86A', deep: '#285B40', soft: '#E4F2E0', night: '#173626' },
        cream: { DEFAULT: '#FFF9F1', 100: '#FFF1DF' },
        ink: { DEFAULT: '#252A25', soft: '#5B625A' },
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 10px 40px -10px rgba(37,42,37,.18), inset 0 1px 0 rgba(255,255,255,.7)',
        lift: '0 40px 80px -30px rgba(37,42,37,.35)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
};
