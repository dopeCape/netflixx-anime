import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        netflix_red: "#e50914",
        input_gray: "#333",
        netflix_orange: "#E1680e",
      },
    },
  },
  plugins: [],
} satisfies Config;
