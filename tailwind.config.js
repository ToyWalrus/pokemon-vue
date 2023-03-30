/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'loading-spin': 'spin 800ms cubic-bezier(.75,.25,.25,.75) infinite',
      },
      colors: {
        primary: '#385DA8',
        secondary: '#EB5212',
        accent: '#FFCB05',

        'type-bug': '#9DC130',
        'type-dragon': '#0773C7',
        'type-fairy': '#EF97E6',
        'type-fire': '#F8A54F',
        'type-ghost': '#6970C5',
        'type-ground': '#D78555',
        'type-normal': '#9AA6B7',
        'type-psychic': '#F87C7A',
        'type-steel': '#5596A4',
        'type-dark': '#5F606D',
        'type-electric': '#EDD53F',
        'type-fighting': '#D94256',
        'type-flying': '#9BB4E8',
        'type-grass': '#5DBE62',
        'type-ice': '#7ED4C9',
        'type-poison': '#B563CE',
        'type-rock': '#CEC18C',
        'type-water': '#559EDF',
      },
      fontFamily: {
        // sans: ['Hero', 'Hero Light'],
        // serif: ['Pokemon Solid', 'Pokemon Hollow'],
      },
    },
  },
  plugins: [],
}
