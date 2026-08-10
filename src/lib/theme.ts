import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ThemeMode } from "@/store/slices/themeSlice";

const shared: ThemeOptions = {
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: { fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600 },
    h2: { fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600 },
    h3: { fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600 },
    h4: { fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600 },
    h5: { fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600 },
    h6: { fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10, boxShadow: "none" },
        contained: { boxShadow: "none" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600 },
      },
    },
  },
};

export function getMuiTheme(mode: ThemeMode) {
  const isDark = mode === "dark";
  return createTheme({
    ...shared,
    palette: {
      mode,
      primary: {
        main: "#163459",
        light: "#2C5C8F",
        dark: "#0A1628",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#FF6B35",
        contrastText: "#FFFFFF",
      },
      success: { main: "#16A34A" },
      warning: { main: "#F5A623" },
      error: { main: "#E5484D" },
      background: {
        default: isDark ? "#0A1628" : "#F5F8FB",
        paper: isDark ? "#0D1E36" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#E4EBF2" : "#0F2544",
        secondary: isDark ? "#9AA1AC" : "#6B7280",
      },
      divider: isDark ? "rgba(228,235,242,0.08)" : "rgba(15,37,68,0.08)",
    },
  });
}
