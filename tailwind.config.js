const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        linkedin: {
          DEFAULT: "#0077b5",
        },
        primary: {
          DEFAULT: "#0069FE",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
