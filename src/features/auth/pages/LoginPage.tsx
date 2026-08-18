import Box from "@mui/material/Box";

import { LoginForm } from "../components/LoginForm";
import { LoginHero } from "../components/LoginHero";

export function LoginPage() {
  return (
    <Box
    sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "1fr 1fr",
        },
        backgroundColor: "background.default",
      }}
    >
      <LoginHero />

      <LoginForm />
    </Box>
  );
}