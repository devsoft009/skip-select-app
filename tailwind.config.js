module.exports = {
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      serif: ['"Playfair Display"', "serif"],
      sans: ["Inter", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        ivory: "#FDFDFB",
        coal: "#111112",
        gold: "#CFAA6E",
        brand: "#0051FF",
        surface: "#1B1B1B",
      },
      boxShadow: {
        elegant:
          "0 12px 32px -8px rgba(0,0,0,0.06), 0 4px 12px -6px rgba(0,0,0,0.04)",
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(.4,0,.2,1)",
      },
    },
  },
  plugins: [],
}
