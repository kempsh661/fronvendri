import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { useAuth } from "@/shared/auth";
import { VendriCard } from "@/shared/components/VendriCard";

import {
  inventoryActionAccentStyles,
  inventoryCardSx,
} from "../constants/inventoryUi";
import { inventoryQuickActionsMock } from "../mocks/inventory.mock";
import type { InventoryQuickActionId } from "../types/inventory.types";

const iconById: Record<InventoryQuickActionId, SvgIconComponent> = {
  entry: ArrowDownwardRoundedIcon,
  exit: ArrowUpwardRoundedIcon,
  history: HistoryRoundedIcon,
};

type InventoryQuickActionsProps = {
  onAction?: (id: InventoryQuickActionId) => void;
};

export function InventoryQuickActions({
  onAction,
}: InventoryQuickActionsProps) {
  const { can } = useAuth();
  const canManage = can("inventory:manage");

  const visibleActions = inventoryQuickActionsMock.filter(
    (action) => canManage || action.id === "history",
  );

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...inventoryCardSx,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
        Acciones rápidas
      </Typography>

      {visibleActions.map((action) => {
        const Icon = iconById[action.id];
        const accent = inventoryActionAccentStyles[action.accent];

        return (
          <ButtonBase
            key={action.id}
            onClick={() => onAction?.(action.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              width: "100%",
              p: 1.25,
              borderRadius: "10px",
              textAlign: "left",
              justifyContent: "flex-start",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(123, 47, 247, 0.06)",
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                backgroundColor: accent.iconBg,
                color: accent.iconColor,
              }}
            >
              <Icon sx={{ fontSize: 18 }} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {action.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {action.description}
              </Typography>
            </Box>
          </ButtonBase>
        );
      })}
    </VendriCard>
  );
}
