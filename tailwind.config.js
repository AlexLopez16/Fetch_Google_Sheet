/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {},
      screens: {
        'screen2000': { 'raw': '(min-width: 2000px)' },
        'screen1100': { 'raw': '(max-width: 1100px)' },
        'screen900': { 'raw': '(max-width: 900px)' },
        'screen600': { 'raw': '(max-width: 600px)' },
        'screen300': { 'raw': '(max-width: 370px)' },
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/forms')],
}

