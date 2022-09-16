/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        logo: ["Reem Kufi Ink", "sans-serif"],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
