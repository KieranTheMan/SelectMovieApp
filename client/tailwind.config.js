/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/index.html", "./src/**/*.{js,jsx,tsx,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        custom: ['Poetsen One',"Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
