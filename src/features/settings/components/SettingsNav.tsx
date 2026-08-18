import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { settingsCardSx, settingsSections } from "../constants/settingsUi";
import type { SettingsSectionId } from "../types/settings.types";

const iconById: Record<SettingsSectionId, SvgIconComponent> = {
  business: StorefrontOutlinedIcon,
  preferences: TuneOutlinedIcon,
  notifications: NotificationsActiveOutlinedIcon,
  security: LockOutlinedIcon,
};

type SettingsNavProps = {
  activeSection: SettingsSectionId;
  onChange: (section: SettingsSectionId) => void;
};

export function SettingsNav({ activeSection, onChange }: SettingsNavProps) {
  return (
    <VendriCard
      elevation={0}
      sx={{
        ...settingsCardSx,
        p: 1.25,
        display: "flex",
        flexDirection: { xs: "row", lg: "column" },
        gap: 0.75,
        overflowX: { xs: "auto", lg: "visible" },
      }}
    >
      {settingsSections.map((section) => {
        const Icon = iconById[section.id];
        const isActive = activeSection === section.id;

        return (
          <Box
            key={section.id}
            component="button"
            type="button"
            onClick={() => onChange(section.id)}
            sx={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 1.5,
              py: 1.25,
              borderRadius: "12px",
              minWidth: { xs: 180, lg: 0 },
              backgroundColor: isActive
                ? "rgba(123, 47, 247, 0.12)"
                : "transparent",
              color: isActive ? "primary.main" : "text.primary",
              transition: "background-color 0.15s ease",
              "&:hover": {
                backgroundColor: isActive
                  ? "rgba(123, 47, 247, 0.16)"
                  : "rgba(123, 47, 247, 0.06)",
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                backgroundColor: isActive
                  ? "rgba(123, 47, 247, 0.16)"
                  : "rgba(123, 47, 247, 0.08)",
                flexShrink: 0,
              }}
            >
              <Icon sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {section.label}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {section.description}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </VendriCard>
  );
}
