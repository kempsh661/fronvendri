import Box from "@mui/material/Box";

import { RegisterForm } from "../components/RegisterForm";
import { RegisterHero } from "../components/RegisterHero";
import { registerPageBg } from "../styles/authUi";

export function RegisterPage() {
  return (
    <Box
      sx={{
        height: "100dvh",
        maxHeight: "100dvh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "0.95fr 1.15fr",
        },
        backgroundColor: registerPageBg,
        overflow: "hidden",
      }}
    >
      <RegisterHero />
      <RegisterForm />
    </Box>
  );
}
