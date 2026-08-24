/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          1: "#111827",
          2: "#4b5563",
          3: "#9ca3af",
        },
        surface: "#ffffff",
        surface2: "#f9fafb",
        line: "#e5e7eb",
        brand: {
          green: "#16a34a",
          "green-light": "#dcfce7",
          "green-dark": "#15803d",
          red: "#dc2626",
          gold: "#C97F0C",
        },
        "dark-bg": "#0b1120",
        "dark-text2": "#94a3b8",
        "dark-line": "#1e293b",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};