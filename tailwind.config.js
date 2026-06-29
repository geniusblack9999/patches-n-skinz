/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hud: '#0F0F0F',
        'hud-2': '#161616',
        'patch-red': '#ff4757',
        'skin-green': '#2ed573',
        'electric-grey': '#f1f2f6',
      },
      fontFamily: {
        heading: ['Kanit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 18px rgba(255,71,87,0.45)',
        'glow-green': '0 0 18px rgba(46,213,115,0.45)',
      },
    },
  },
  plugins: [],
}
