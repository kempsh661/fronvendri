import Box from "@mui/material/Box";

import registerHeroImage from "@/assets/images/auth/register.png";

import { authHeroPanelSx, registerPageBg } from "../styles/authUi";

export function RegisterHero() {
  return (
    <Box sx={authHeroPanelSx}>
      <Box
        component="img"
        src={registerHeroImage}
        alt="Crea tu cuenta en Vendri y comienza a crecer"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "left center",
          display: "block",
        }}
      />
      {/* Funde el borde derecho de la imagen con el fondo de la página */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { lg: 56, xl: 72 },
          height: "100%",
          background: `linear-gradient(to right, transparent, ${registerPageBg})`,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
