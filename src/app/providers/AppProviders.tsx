import type { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/shared/auth";

import { vendriTheme } from "../theme";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={vendriTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
