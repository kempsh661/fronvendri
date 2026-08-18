import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { accentStyles, dashboardCardSx } from "../constants/dashboardUi";
import type { SummaryCardData, SummaryCardId } from "../types/dashboard.types";

import { SummarySparkline } from "./SummarySparkline";

const iconById: Record<SummaryCardId, SvgIconComponent> = {
  orders: ShoppingBagOutlinedIcon,
  sales: AttachMoneyRoundedIcon,
  clients: PeopleOutlinedIcon,
  products: Inventory2OutlinedIcon,
};

type SummaryCardProps = {
  data: SummaryCardData;
};

export function SummaryCard({ data }: SummaryCardProps) {
  const Icon = iconById[data.id];
  const accent = accentStyles[data.accent];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...dashboardCardSx,
        p: 1.75,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: "10px",
            display: "grid",
            placeItems: "center",
            backgroundColor: accent.iconBg,
            color: accent.iconColor,
          }}
        >
          <Icon sx={{ fontSize: 20 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500, display: "block", lineHeight: 1.2 }}
          >
            {data.label}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              my: 0.25,
            }}
          >
            {data.value}
          </Typography>

          {data.trend && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.25,
                color: "success.main",
              }}
            >
              <NorthEastRoundedIcon sx={{ fontSize: 13 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {data.trend.percent}% {data.trend.label}
              </Typography>
            </Box>
          )}

          {data.action && (
            <Link
              href={data.action.href}
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.35,
                color: "primary.main",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              {data.action.label}
              <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
            </Link>
          )}
        </Box>

        {data.sparkline && (
          <Box sx={{ flexShrink: 0 }}>
            <SummarySparkline data={data.sparkline} accent={data.accent} />
          </Box>
        )}
      </Box>
    </VendriCard>
  );
}
