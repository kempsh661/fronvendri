import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

import type { AppNavItem } from "@/shared/config/navigation";

type NavItemProps = {
  item: AppNavItem;
  onNavigate?: () => void;
};

export function NavItem({ item, onNavigate }: NavItemProps) {
  const Icon = item.icon;

  const content = (active: boolean) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.75,
        py: 1.25,
        borderRadius: "12px",
        color: active ? "common.white" : "text.secondary",
        backgroundColor: active ? "primary.main" : "transparent",
        opacity: item.enabled ? 1 : 0.55,
        cursor: item.enabled ? "pointer" : "default",
        transition: "background-color 0.2s ease, color 0.2s ease",
        "&:hover": item.enabled
          ? {
              backgroundColor: active ? "primary.main" : "action.hover",
              color: active ? "common.white" : "text.primary",
            }
          : undefined,
      }}
    >
      <Icon sx={{ fontSize: 22 }} />

      <Typography
        variant="body2"
        sx={{
          flex: 1,
          fontWeight: active ? 600 : 500,
        }}
      >
        {item.label}
      </Typography>

      {item.badge != null && (
        <Box
          component="span"
          sx={{
            minWidth: 24,
            height: 22,
            px: 0.75,
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            backgroundColor: active ? "rgba(255,255,255,0.22)" : "primary.light",
            color: "common.white",
          }}
        >
          {item.badge}
        </Box>
      )}
    </Box>
  );

  if (!item.enabled) {
    return (
      <Box component="li" sx={{ listStyle: "none" }}>
        {content(false)}
      </Box>
    );
  }

  return (
    <Box component="li" sx={{ listStyle: "none" }}>
      <NavLink
        to={item.path}
        onClick={onNavigate}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {({ isActive }) => content(isActive)}
      </NavLink>
    </Box>
  );
}
