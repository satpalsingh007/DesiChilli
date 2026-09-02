import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#201810",
          soft: "#4a3d30",
        },
        chilly: {
          DEFAULT: "#D6293A",
          dark: "#a71d2b",
        },
        turmeric: {
          DEFAULT: "#F2A93B",
          dark: "#c98620",
          // For turmeric used as text or as a background behind white text,
          // where `dark` falls under the 4.5:1 contrast requirement.
          deep: "#92600f",
        },
        curry: "#3A5A40",
        paper: {
          DEFAULT: "#F7EEDD",
          warm: "#F1E4C9",
        },
        card: "#FFFCF4",
        line: "#dfd1ac",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-public-sans)", "Helvetica", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      screens: {
        bp: "560px",
        nav: "860px",
      },
    },
  },
  plugins: [],
};
export default config;
