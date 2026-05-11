/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a3a2a',
          light: '#2d6a4f',
        },
        accent: {
          DEFAULT: '#c9a96e',
          dark: '#a07840',
        },
      },
    },
  },
  plugins: [],
}
