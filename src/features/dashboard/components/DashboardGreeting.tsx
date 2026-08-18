import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type DashboardGreetingProps = {
  userName: string;
};

export function DashboardGreeting({ userName }: DashboardGreetingProps) {
  return (
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
        ¡Hola, {userName}! 👋
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Este es el resumen de tu negocio hoy.
      </Typography>
    </Box>
  );
}
