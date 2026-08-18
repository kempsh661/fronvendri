import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

import { VendriCard } from "@/shared/components/VendriCard";

import { accentStyles, dashboardCardSx } from "../constants/dashboardUi";
import { quickActionsMock } from "../mocks/dashboard.mock";

const iconById: Record<string, SvgIconComponent> = {
  "new-order": AddShoppingCartOutlinedIcon,
  "add-product": Inventory2OutlinedIcon,
  "view-clients": PeopleOutlinedIcon,
  "view-reports": AssessmentOutlinedIcon,
};

export function QuickActions() {
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
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.25 }}>
        Acciones rápidas
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
        {quickActionsMock.map((action) => {
          const Icon = iconById[action.id] ?? AddShoppingCartOutlinedIcon;
          const accent = accentStyles[action.accent];

          return (
            <Link
              key={action.id}
              href={action.href}
              underline="none"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
                p: 1.25,
                borderRadius: "10px",
                backgroundColor: "background.default",
                color: "text.primary",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(123, 47, 247, 0.06)",
                },
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
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
                  variant="body2"
                  sx={{ fontWeight: 700, fontSize: 13 }}
                >
                  {action.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {action.description}
                </Typography>
              </Box>
            </Link>
          );
        })}
      </Box>
    </VendriCard>
  );
}
