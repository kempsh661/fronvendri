import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

export function RegisterHeader() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          backgroundColor: "#7B2FF7",
          color: "#FFFFFF",
          display: "grid",
          placeItems: "center",
          mx: "auto",
          mb: 1.25,
        }}
      >
        <PersonAddAltRoundedIcon sx={{ fontSize: 22 }} />
      </Box>

      <Typography
        sx={{
          fontWeight: 800,
          mb: 0.4,
          color: "#1F1238",
          fontSize: "1.25rem",
        }}
      >
        Crear cuenta
      </Typography>

      <Typography
        sx={{
          color: "#8A7A9E",
          fontSize: "0.84rem",
          fontWeight: 400,
        }}
      >
        Completa tus datos para unirte a Vendri
      </Typography>
    </Box>
  );
}
