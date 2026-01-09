import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DB3A34",
          mustard: "#FFC857",
          charcoal: "#323031",
        },
        ui: {
          bg: "#F9F9F9",
        },
      },
      fontFamily: {
        sans: ["Franklin Gothic Medium", "Arial Narrow", "Arial", "sans-serif"],
        display: ["Impact", "Oswald", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
