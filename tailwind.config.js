/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#FCEFDF",
          bg_secondary: "#FEF8EF",
          bg_tertiary: "#FDFCF7",
          // ... other shades
        },
      },
    },
    plugins: [],
  },
};
