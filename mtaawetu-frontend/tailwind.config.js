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
      keyframes: {
        'bounce-individual': {
          '0%, 80%, 100%': {
            opacity: '0.75',
            boxShadow: '0 0 #076fe5',
            height: '32px',
          },
          '40%': {
            opacity: '1',
            boxShadow: '0 -8px #076fe5',
            height: '40px',
          },
        },
      },
      animation: {
        'bounce-individual': 'bounce-individual 0.8s infinite ease-in-out',
      },
      // Custom animation delays for staggered effects
      animationDelay: {
        '0ms': '0ms',
        '160ms': '0.16s',
        '320ms': '0.32s',
      },
    },
  },
  plugins: [],
}

