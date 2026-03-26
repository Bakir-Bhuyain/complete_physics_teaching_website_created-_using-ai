/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        bangla: ['Hind Siliguri', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 4s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["luxury", "dark", "cupcake"],
  },
}
