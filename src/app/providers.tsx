"use client";

import * as React from "react";
import { Provider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store, RootState } from "@/store/store";
import { getMuiTheme } from "@/lib/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

import { ToastProvider } from "@/components/ui/Toast";

function MuiThemeBridge({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = React.useMemo(() => getMuiTheme(mode), [mode]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeBridge>{children}</MuiThemeBridge>
      </QueryClientProvider>
    </Provider>
  );
}
