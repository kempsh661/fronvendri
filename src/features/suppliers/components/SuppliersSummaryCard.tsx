import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { suppliersAccentStyles, suppliersCardSx } from "../constants/suppliersUi";
import type {
  SupplierSummaryCardData,
  SupplierSummaryId,
} from "../types/suppliers.types";

const iconById: Record<SupplierSummaryId, SvgIconComponent> = {
  registered: LocalShippingOutlinedIcon,
  "new-month": PersonAddAltOutlinedIcon,
  active: VerifiedOutlinedIcon,
  "month-purchases": PaymentsOutlinedIcon,
};

type SuppliersSummaryCardProps = {
  data: SupplierSummaryCardData;
};

export function SuppliersSummaryCard({ data }: SuppliersSummaryCardProps) {
  const Icon = iconById[data.id];
  const accent = suppliersAccentStyles[data.accent];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...suppliersCardSx,
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
