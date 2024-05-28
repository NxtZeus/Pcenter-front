/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      translate: {
        'full': '100%',
        '-full': '-100%',
        '0': '0',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      colors: {
        'custom-green': '#003366'
      },
    },
  },
  plugins: [],
}
