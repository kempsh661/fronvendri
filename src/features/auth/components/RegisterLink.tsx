import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export function RegisterLink() {
  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mb: 3 }} />

      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#6B5B85",
        }}
      >
        ¿No tienes una cuenta?{" "}
        <Link
          component={RouterLink}
          to="/register"
          underline="hover"
          color="primary.main"
          sx={{
            fontWeight: 700,
          }}
        >
          Crear cuenta
        </Link>
      </Typography>
    </Box>
  );
}
