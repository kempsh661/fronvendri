import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import vendriLogo from "@/assets/branding/vendri-logo.png";

export function AuthHeader() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 4,
      }}
    >
      <Box
        component="img"
        src={vendriLogo}
        alt="Vendri"
        sx={{
          width: 160,
          height: "auto",
          display: "block",
          mx: "auto",
          mb: 1.5,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 0.75,
          color: "#2D1457",
        }}
      >
        ¡Bienvenida de nuevo! 👋
      </Typography>

      <Typography variant="body2" sx={{ color: "#6B5B85" }}>
        Inicia sesión para continuar
      </Typography>
    </Box>
  );
}