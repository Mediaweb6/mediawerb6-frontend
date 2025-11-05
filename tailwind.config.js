/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
         "spin-slow": "spin 4s linear infinite",
        "spin-fast": "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
