import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export function ForgotPassword() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 1.5,
      }}
    >
      <Link
        href="#"
        underline="hover"
        color="primary.main"
        sx={{
          fontWeight: 600,
          fontSize: "0.95rem",
        }}
      >
        ¿Olvidaste tu contraseña?
      </Link>
    </Box>
  );
}