/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    container: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#EA580C",
        "brand-secondary": "#C2410C",
        "brand-accent": "#FDE047",
        primary: {
          DEFAULT: "#f05a24",
          100: "#f69f80",
          200: "#f5906c",
          300: "#f37e54",
          400: "#f26c3c",
          500: "#f05a24",
          600: "#ea4a10",
          700: "#d3420e",
          800: "#bb3b0d",
          900: "#6f2308",
        },
        "primary-accent": {
          DEFAULT: "#f6921e",
          100: "#fac07c",
          200: "#f9b668",
          300: "#f8aa4f",
          400: "#f79e37",
          500: "#f6921e",
          600: "#f1860a",
          700: "#d87809",
          800: "#c06b08",
          900: "#724005",
        },
        secondary: {
          DEFAULT: "#6526ff",
          100: "#ab88ff",
          200: "#9b73ff",
          300: "#8959ff",
          400: "#7740ff",
          500: "#6526ff",
          600: "#530dff",
          700: "#4600f2",
          800: "#3f00d9",
          900: "#280088",
        },
        "secondary-accent": {
          DEFAULT: "#b42fff",
          100: "#d07dff",
          200: "#d07cff",
          300: "#c662ff",
          400: "#bd49ff",
          500: "#b42fff",
          600: "#ab16ff",
          700: "#a000fb",
          800: "#9000e2",
          900: "#50007d",
        },
        black: "#1a1a1a",
        white: "#ffffff",
      },
      animation: {
        "back-forth": "back-forth 10s ease-in-out infinite",
      },
      keyframes: {
        "back-forth": {
          "0%, 100%": {
            transform: "scaleX(0)",
          },
          "50%": {
            transform: "scaleX(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
