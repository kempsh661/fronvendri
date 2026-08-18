import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

import { NotificationsBell } from "@/features/notifications";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriInput } from "@/shared/components/VendriInput";

export function AppHeader() {
  const navigate = useNavigate();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexShrink: 0,
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
      <VendriInput
        placeholder="Buscar..."
        size="small"
        aria-label="Buscar"
        sx={{
          width: { xs: "100%", sm: 220, md: 280 },
          order: { xs: 3, sm: 0 },
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "background.paper",
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon
                  sx={{ color: "text.secondary", fontSize: 20 }}
                />
              </InputAdornment>
            ),
          },
        }}
      />

      <NotificationsBell />

      <VendriButton
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={() => navigate("/orders")}
        sx={{
          borderRadius: "12px",
          px: 2.25,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          whiteSpace: "nowrap",
        }}
      >
        Nuevo pedido
      </VendriButton>
    </Box>
  );
}
