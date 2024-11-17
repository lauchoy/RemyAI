/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#F7FFF7',
        textColor: '#2C3E50',
      },
      fontFamily: {
        heading: ['Quando', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundColor: {
        'primary-hover': '#ff5252',
        'secondary-hover': '#45b8b0',
      }
    },
  },
  plugins: [],
};