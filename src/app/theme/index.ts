import { createTheme } from "@mui/material/styles";

import { vendriPalette } from "./palette";
import { vendriTypography } from "./typography";
import { vendriShape } from "./shape";
import { vendriShadows } from "./shadows";

export const vendriTheme = createTheme({
  palette: vendriPalette,
  typography: vendriTypography,
  shape: vendriShape,
  shadows: vendriShadows,
});