/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
         "spin-slow": "spin 4s linear infinite",
        "spin-fast": "spin 1s linear infinite",
      },
       screens: {
      'xl2': '1197px', // ✅ custom breakpoint
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      cinzel: ['Cinzel', 'serif'],
      lato: ['Lato', 'sans-serif'],
    },
    },
  },
  plugins: [],
};
