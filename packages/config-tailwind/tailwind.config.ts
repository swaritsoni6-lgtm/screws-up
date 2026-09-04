import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        coop: {
          amber: {
            50: "#fffbeb",
            100: "#fef3c7",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
          },
          green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
          },
          slate: {
            800: "#1e293b",
            900: "#0f172a",
            950: "#020617",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
