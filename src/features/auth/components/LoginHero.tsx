import Box from "@mui/material/Box";

import loginHeroImage from "@/assets/images/auth/login-hero.png";

import { authHeroPanelSx } from "../styles/authUi";

export function LoginHero() {
  return (
    <Box sx={authHeroPanelSx}>
      <Box
        component="img"
        src={loginHeroImage}
        alt="Vendri, plataforma para administrar ventas y pedidos"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}