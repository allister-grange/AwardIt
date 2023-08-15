/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#FCEFDF",
          200: "#B3E0FF",
          300: "#80C9FF",
          // ... other shades
        },
        secondary: {
          100: "#FFEFD9",
          200: "#FFD099",
          300: "#FFB359",
          // ... other shades
        },
      },
    },
    plugins: [],
  },
};
