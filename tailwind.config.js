/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'],
  
    },
    extend: {
      colors: {
        'color1': '#11175D',
        'color2': '#5F35F5',
      },
    },
  },
  plugins: [],
}
