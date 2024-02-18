import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        netflix_red: "#e50914",
        input_gray: "#333",
        netflix_orange: "#E1680e",
        netflix_black: "#141414",
        netflix_gray: "#3c3c3c",
        netflix_meny_gray: "#262626",
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
} satisfies Config;
