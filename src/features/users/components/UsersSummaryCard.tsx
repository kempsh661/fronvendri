import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { usersAccentStyles, usersCardSx } from "../constants/usersUi";
import type {
  UserSummaryCardData,
  UserSummaryId,
} from "../types/users.types";

const iconById: Record<UserSummaryId, SvgIconComponent> = {
  registered: GroupOutlinedIcon,
  active: HowToRegOutlinedIcon,
  admins: AdminPanelSettingsOutlinedIcon,
  "new-month": PersonAddAltOutlinedIcon,
};

type UsersSummaryCardProps = {
  data: UserSummaryCardData;
};

export function UsersSummaryCard({ data }: UsersSummaryCardProps) {
  const Icon = iconById[data.id];
  const accent = usersAccentStyles[data.accent];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...usersCardSx,
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
