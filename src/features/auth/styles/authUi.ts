/** Fondo del registro — alineado al lavanda del arte de register.png */
export const registerPageBg = "#EFE8FC";

export const authFormPanelSx = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 2, sm: 4 },
  py: 4,
  backgroundColor: "#EDE7F6",
} as const;

export const registerFormPanelSx = {
  height: "100%",
  minHeight: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 2, sm: 3, lg: 3 },
  py: { xs: 2, lg: 2 },
  backgroundColor: "transparent",
  overflow: "hidden",
} as const;

export const authFormCardSx = {
  width: "100%",
  maxWidth: 560,
  p: { xs: 3, sm: 5 },
  borderRadius: 5,
  backgroundColor: "#FFFFFF",
  border: "1px solid rgba(45, 20, 87, 0.08)",
  boxShadow: "0 18px 48px rgba(45, 20, 87, 0.10)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
} as const;

export const registerFormCardSx = {
  width: "100%",
  maxWidth: 520,
  maxHeight: "100%",
  p: { xs: 2.5, sm: 3 },
  borderRadius: 4,
  backgroundColor: "#FFFFFF",
  border: "none",
  boxShadow: "0 16px 40px rgba(45, 20, 87, 0.10)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflow: "hidden",
} as const;

/** Inputs compactos para caber en viewport. */
export const authFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#8A7A9E",
    fontWeight: 400,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "primary.main",
    fontWeight: 500,
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFFFFF",
    color: "#2D1457",
    borderRadius: 2,
    "& fieldset": {
      borderColor: "rgba(45, 20, 87, 0.12)",
      borderWidth: 1,
    },
    "&:hover fieldset": {
      borderColor: "rgba(123, 47, 247, 0.30)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7B2FF7",
      borderWidth: 1.25,
    },
  },
  "& .MuiInputBase-input": {
    color: "#2D1457",
    fontWeight: 400,
    py: 1,
    fontSize: "0.92rem",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#B0A3C4",
    opacity: 1,
  },
  "& .MuiFormHelperText-root": {
    color: "#8A7A9E",
    fontWeight: 400,
    mx: 0,
    mt: 0.35,
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: "#B7A8D4",
    fontSize: 18,
  },
} as const;

export const authFieldLabelSx = {
  display: "block",
  mb: 0.45,
  fontSize: "0.78rem",
  fontWeight: 500,
  color: "#6B5B85",
} as const;

export const authHeroPanelSx = {
  display: {
    xs: "none",
    lg: "flex",
  },
  height: "100%",
  minHeight: 0,
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: registerPageBg,
  position: "relative",
} as const;
