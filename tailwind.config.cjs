/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#effaf8",
          100: "#d6f4ee",
          200: "#ace8de",
          300: "#76d3c2",
          400: "#49b8a7",
          500: "#2f9f8f",
          600: "#257f72",
          700: "#22675d",
          800: "#21524c",
          900: "#1f4540"
        },
        ink: {
          50: "#f6f7fb",
          100: "#ebedf5",
          200: "#d7dced",
          300: "#b5bfdc",
          400: "#8d9bc6",
          500: "#6e7db1",
          600: "#58679b",
          700: "#49517f",
          800: "#3f4568",
          900: "#363b56"
        }
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        rise: "rise 350ms ease-out"
      }
    }
  },
  plugins: []
};
