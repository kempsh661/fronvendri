import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { useAuth } from "@/shared/auth";

import { NotificationsBell } from "@/features/notifications";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriInput } from "@/shared/components/VendriInput";

import { inventoryButtonSx } from "../constants/inventoryUi";
import type { InventoryMovementType } from "../types/inventory.types";

type InventoryHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onRegisterMovement: (type: InventoryMovementType) => void;
};

export function InventoryHeader({
  search,
  onSearchChange,
  onRegisterMovement,
}: InventoryHeaderProps) {
  const { can } = useAuth();
  const canManage = can("inventory:manage");
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
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
          Inventario
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Controla las existencias y movimientos de tus productos.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <VendriInput
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar producto..."
          size="small"
          aria-label="Buscar producto"
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

        {canManage && (
          <>
            <VendriButton
              variant="contained"
              startIcon={<AddRoundedIcon />}
              endIcon={<KeyboardArrowDownRoundedIcon />}
              onClick={(event) => setMenuAnchor(event.currentTarget)}
              sx={{
                ...inventoryButtonSx,
                px: 2.25,
                boxShadow: "none",
                whiteSpace: "nowrap",
              }}
            >
              Registrar movimiento
            </VendriButton>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  onRegisterMovement("entry");
                  setMenuAnchor(null);
                }}
              >
                Entrada
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onRegisterMovement("exit");
                  setMenuAnchor(null);
                }}
              >
                Salida
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
}
