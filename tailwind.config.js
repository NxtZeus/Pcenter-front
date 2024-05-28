/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
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
        'custom-azul': '#003366',
        'custom-cobre': '#663300',
        'custom-celeste': '#D0D9E1',
        'custom-amarillo': '#FFD700',
        'custom-amarillo2': 'FFFF00',
        'custom-naranja': '#FFA500',
        'custom-naranja2': '#FF6600',
        'custom-verde': '#66FF66',
      },
    },
  },
  plugins: [],
}
