import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueprint: {
          950: "#050B16",
          900: "#0A1628",
          850: "#0D1E36",
          800: "#0F2544",
          700: "#163459",
          600: "#1E4571",
          500: "#2C5C8F",
          400: "#5B85AC",
          200: "#B9CBDD",
          100: "#E4EBF2",
          50: "#F5F8FB",
        },
        signal: {
          orange: "#FF6B35",
          orangeDark: "#E0551F",
          amber: "#F5A623",
          green: "#16A34A",
          red: "#E5484D",
        },
        concrete: {
          900: "#1C1F24",
          700: "#3C4249",
          500: "#6B7280",
          300: "#9AA1AC",
          100: "#E7E9EC",
          50: "#F8F9FB",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(91,133,172,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(91,133,172,0.09) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,22,40,0.06), 0 1px 3px rgba(10,22,40,0.08)",
        elevated: "0 8px 24px rgba(10,22,40,0.12)",
        glass: "0 8px 32px rgba(10,22,40,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
