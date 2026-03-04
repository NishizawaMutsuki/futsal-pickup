/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        pickup: {
          primary: "#059669",
          dark: "#047857",
          light: "#d1fae5",
        },
      },
    },
  },
  plugins: [],
};
