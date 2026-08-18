import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { NotificationsBell } from "@/features/notifications";

export function SettingsHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.2,
            mb: 0.25,
          }}
        >
          Configuración
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ajusta los datos de tu negocio y preferencias de la cuenta.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <NotificationsBell />
      </Box>
    </Box>
  );
}
