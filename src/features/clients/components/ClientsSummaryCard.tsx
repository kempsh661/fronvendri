import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { clientsAccentStyles, clientsCardSx } from "../constants/clientsUi";
import type {
  ClientSummaryCardData,
  ClientSummaryId,
} from "../types/clients.types";

const iconById: Record<ClientSummaryId, SvgIconComponent> = {
  registered: PeopleOutlinedIcon,
  "new-month": PersonAddAltOutlinedIcon,
  "with-orders": ShoppingBagOutlinedIcon,
  "avg-spend": PaymentsOutlinedIcon,
};

type ClientsSummaryCardProps = {
  data: ClientSummaryCardData;
};

export function ClientsSummaryCard({ data }: ClientsSummaryCardProps) {
  const Icon = iconById[data.id];
  const accent = clientsAccentStyles[data.accent];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...clientsCardSx,
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
