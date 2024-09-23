/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightColor: '#F6F7F9',
        darkColor: '#0F0F0F',
      }
    },
    screens: {
      'tablet': {'max': '768px'},
      'mobile': {'max': '540px'},
    },
  },
  plugins: [],
}