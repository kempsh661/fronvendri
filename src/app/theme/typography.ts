import type { ThemeOptions } from "@mui/material/styles";

export const vendriTypography: NonNullable<ThemeOptions["typography"]> = {
  fontFamily: '"Inter Variable", "Inter", sans-serif',

  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },

  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.25,
  },

  h3: {
    fontSize: "1.75rem",
    fontWeight: 700,
    lineHeight: 1.3,
  },

  h4: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: 1.35,
  },

  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },

  h6: {
    fontSize: "1.125rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },

  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },

  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.45,
  },

  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },

  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.45,
  },

  button: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.4,
    textTransform: "none",
  },

  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.4,
  },
};