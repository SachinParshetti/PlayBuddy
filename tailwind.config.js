/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      colors: {
        
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'poppins-light': ['Poppins', 'sans-serif'],
        'poppins-medium': ['Poppins', 'sans-serif'],
        'poppins-semibold': ['Poppins', 'sans-serif'],
        'poppins-bold': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'inter-light': ['Inter', 'sans-serif'],
        'inter-medium': ['Inter', 'sans-serif'],
        'inter-semibold': ['Inter', 'sans-serif'],
        'inter-bold': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 