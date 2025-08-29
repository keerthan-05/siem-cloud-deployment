/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F9CFF',
          DEFAULT: '#1976D2',
          dark: '#115293',
        },
        accent: {
          light: '#FFC46F',
          DEFAULT: '#FF9800',
          dark: '#B26A00',
        },
        success: '#4CAF50',
        warning: '#FFB300',
        error:   '#D32F2F',
        background: '#F5F7FA',
        card: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
