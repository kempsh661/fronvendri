import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";

import {
  inventoryActionAccentStyles,
  inventoryButtonSx,
  inventoryCardSx,
} from "../constants/inventoryUi";
import { recentMovementsMock } from "../mocks/inventory.mock";
import type { InventoryMovement } from "../types/inventory.types";
import { formatMovementDateTime } from "../utils/formatMovementDateTime";

type RecentMovementsProps = {
  movements?: InventoryMovement[];
  onViewAll?: () => void;
};

export function RecentMovements({
  movements = recentMovementsMock,
  onViewAll,
}: RecentMovementsProps) {
  return (
    <VendriCard
      elevation={0}
      sx={{
        ...inventoryCardSx,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Movimientos recientes
        </Typography>
        <Link
          component="button"
          type="button"
          underline="hover"
          onClick={onViewAll}
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "primary.main",
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          Ver todos
        </Link>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {movements.map((movement) => {
          const isEntry = movement.type === "entry";
          const accent =
            inventoryActionAccentStyles[isEntry ? "success" : "danger"];
          const Icon = isEntry
            ? ArrowDownwardRoundedIcon
            : ArrowUpwardRoundedIcon;

          return (
            <Box
              key={movement.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                py: 0.85,
              }}
            >
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  borderRadius: "10px",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: accent.iconBg,
                  color: accent.iconColor,
                }}
              >
                <Icon sx={{ fontSize: 16 }} />
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, fontSize: 13 }}
                  noWrap
                >
                  {isEntry ? "Entrada de inventario" : "Salida de inventario"}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {movement.productName}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: isEntry ? "success.main" : "error.main",
                  }}
                >
                  {isEntry ? "+" : "-"}
                  {movement.quantity} und.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatMovementDateTime(movement.occurredAt)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <VendriButton
        variant="outlined"
        fullWidth
        startIcon={<ListAltRoundedIcon />}
        onClick={onViewAll}
        sx={{
          ...inventoryButtonSx,
          mt: "auto",
          borderColor: "rgba(123, 47, 247, 0.25)",
          color: "primary.main",
          backgroundColor: "rgba(123, 47, 247, 0.04)",
        }}
      >
        Ver todos los movimientos
      </VendriButton>
    </VendriCard>
  );
}
