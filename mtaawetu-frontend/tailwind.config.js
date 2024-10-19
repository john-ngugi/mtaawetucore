/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '38rem',
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
}

