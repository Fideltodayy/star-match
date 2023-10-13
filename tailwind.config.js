/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#333333",
          text: "#ffffff",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
