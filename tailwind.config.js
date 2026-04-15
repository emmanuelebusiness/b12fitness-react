/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian:  '#0B0B0B',
        champagne: '#22E600',   /* verde neon — accento principale */
        lime:      '#8BCA00',   /* lime giallo-verde — logo "b" */
        ivory:     '#F5F5F5',
        ardesia:   '#121812',   /* superficie scura tinta verde */
        'ardesia-light': '#1C241C',
      },
      fontFamily: {
        sans:  ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      transitionTimingFunction: {
        magnetic:  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        elastic:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
