import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export function LoginLink() {
  return (
    <Box sx={{ mt: 1.5 }}>
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "#8A7A9E",
          fontSize: "0.84rem",
        }}
      >
        ¿Ya tienes una cuenta?{" "}
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          color="primary.main"
          sx={{
            fontWeight: 700,
          }}
        >
          Inicia sesión
        </Link>
      </Typography>
    </Box>
  );
}
