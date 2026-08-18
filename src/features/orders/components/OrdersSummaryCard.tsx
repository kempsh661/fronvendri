import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { ordersAccentStyles, ordersCardSx } from "../constants/ordersUi";
import type {
  OrderSummaryCardData,
  OrderSummaryId,
} from "../types/orders.types";

const iconById: Record<OrderSummaryId, SvgIconComponent> = {
  total: ShoppingBagOutlinedIcon,
  pending: ScheduleRoundedIcon,
  "in-progress": LocalShippingOutlinedIcon,
  delivered: CheckCircleOutlineRoundedIcon,
  cancelled: CancelOutlinedIcon,
};

type OrdersSummaryCardProps = {
  data: OrderSummaryCardData;
};

export function OrdersSummaryCard({ data }: OrdersSummaryCardProps) {
  const Icon = iconById[data.id];
  const accent = ordersAccentStyles[data.accent];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...ordersCardSx,
        p: 2,
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            flexShrink: 0,
            borderRadius: "10px",
            display: "grid",
            placeItems: "center",
            backgroundColor: accent.iconBg,
            color: accent.iconColor,
          }}
        >
          <Icon sx={{ fontSize: 22 }} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, mb: 0.5 }}
          >
            {data.label}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {data.value}
          </Typography>

          {data.trend && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.35,
                color: "success.main",
              }}
            >
              <NorthEastRoundedIcon sx={{ fontSize: 14 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {data.trend.percent}% {data.trend.label}
              </Typography>
            </Box>
          )}

          {data.helper && (
            <Typography variant="caption" color="text.secondary">
              {data.helper}
            </Typography>
          )}
        </Box>
      </Box>
    </VendriCard>
  );
}
