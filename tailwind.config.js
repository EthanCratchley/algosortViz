/** @type {import('tailwindcss').Config} */
module.exports = {
  // Make sure Tailwind scans all your .html and .tsx files for class names:
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // We'll use the "dark" class on a parent <div> to enable dark mode
  theme: {
    extend: {
      colors: {
        background: "#181818",
        text: "#EAEAEA",
        primary: "#3B82F6",
        secondary: "#6B7280",
        success: "#10B981",
        warning: "#FACC15",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
