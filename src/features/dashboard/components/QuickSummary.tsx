import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { accentStyles, dashboardCardSx } from "../constants/dashboardUi";
import type { QuickSummaryItem } from "../types/dashboard.types";

const iconById: Record<string, SvgIconComponent> = {
  "month-sales": AttachMoneyRoundedIcon,
  "month-orders": ShoppingBagOutlinedIcon,
  "month-clients": PeopleOutlinedIcon,
  "month-profit": TrendingUpRoundedIcon,
};

type QuickSummaryProps = {
  items: QuickSummaryItem[];
  loading?: boolean;
};

export function QuickSummary({ items, loading = false }: QuickSummaryProps) {
  return (
    <VendriCard
      elevation={0}
      sx={{
        ...dashboardCardSx,
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
        Resumen rápido
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 1.25,
        }}
      >
        {loading && items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Cargando…
          </Typography>
        ) : (
          items.map((item) => {
            const Icon = iconById[item.id] ?? TrendingUpRoundedIcon;
            const accent = accentStyles[item.accent];

            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 1,
                  p: 1.5,
                  borderRadius: "10px",
                  backgroundColor: "background.default",
                  minHeight: 0,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: accent.iconBg,
                    color: accent.iconColor,
                  }}
                >
                  <Icon sx={{ fontSize: 16 }} />
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 500, display: "block", mb: 0.25 }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1.2 }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </VendriCard>
  );
}
