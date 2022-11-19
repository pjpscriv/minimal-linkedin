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
      },
      fontFamily: {
        sans: ["'Source Sans 3'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
