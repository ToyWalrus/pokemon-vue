/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#385DA8',
        secondary: '#EB5212',
        accent: '##FFCB05',
      },
      fontFamily: {
        sans: ['Hero', 'Hero Light'],
        serif: ['Pokemon Solid', 'Pokemon Hollow'],
      },
    },
  },
  plugins: [],
}
