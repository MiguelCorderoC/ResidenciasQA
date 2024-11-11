/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkMode: {
          fondo: "#0d1117",
          form: "#151b23",
          border: "#181C14",
          sidebar: "#010409",
          font: "#d1d5db",
          table: "#151515",
          tableOdd: "#0C0C0C",
        },
      },
    },
  },
  plugins: [],
};
