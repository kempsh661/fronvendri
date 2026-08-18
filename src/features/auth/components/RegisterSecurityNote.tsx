import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export function RegisterSecurityNote() {
  return (
    <Box
      sx={{
        mt: 1.5,
        mb: 0.25,
        px: 1.5,
        py: 1,
        borderRadius: 2,
        backgroundColor: "rgba(123, 47, 247, 0.08)",
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      <ShieldOutlinedIcon
        sx={{ fontSize: 16, color: "#7B2FF7", mt: "1px", flexShrink: 0 }}
      />
      <Typography
        sx={{
          fontSize: "0.72rem",
          lineHeight: 1.35,
          color: "#4A3A6B",
        }}
      >
        <Box component="span" sx={{ fontWeight: 700, color: "#2D1457" }}>
          Tu información está protegida.
        </Box>{" "}
        Usamos encriptación de nivel bancario para mantener tus datos seguros.
      </Typography>
    </Box>
  );
}
