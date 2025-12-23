import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Usa classe .dark em vez de prefers-color-scheme
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
