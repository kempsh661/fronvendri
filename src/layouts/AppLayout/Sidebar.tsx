import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import vendriLogo from "@/assets/branding/vendri-logo.png";
import { getAllowedNavPaths, useAuth } from "@/shared/auth";
import { navigationItems } from "@/shared/config/navigation";

import { NavItem } from "./NavItem";

export const SIDEBAR_WIDTH = 280;

type SidebarProps = {
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const { user, role, roleLabel, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const allowedPaths = role ? getAllowedNavPaths(role) : [];
  const visibleItems = navigationItems.filter(
    (item) => item.enabled && allowedPaths.includes(item.path),
  );

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    navigate("/login", { replace: true });
  };

  if (!user || !roleLabel) {
    return null;
  }

  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        px: 2.5,
        py: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4, px: 0.5 }}>
        <Box
          component="img"
          src={vendriLogo}
          alt="Vendri"
          sx={{ width: 40, height: 40, objectFit: "contain" }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Vendri
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.companyName || "Controla tus ventas fácilmente."}
          </Typography>
        </Box>
      </Box>

      <Box
        component="nav"
        aria-label="Navegación principal"
        sx={{ flex: 1, overflowY: "auto" }}
      >
        <Box
          component="ul"
          sx={{
            m: 0,
            p: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          {visibleItems.map((item) => (
            <NavItem key={item.path} item={item} onNavigate={onNavigate} />
          ))}
        </Box>
      </Box>

      <Box
        component="button"
        type="button"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
        aria-label="Menú de cuenta"
        sx={{
          all: "unset",
          mt: 2,
          p: 1.5,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          backgroundColor: "background.default",
          cursor: "pointer",
          boxSizing: "border-box",
          width: "100%",
          "&:hover": {
            backgroundColor: "rgba(123, 47, 247, 0.06)",
          },
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {user.avatarInitials}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {roleLabel}
          </Typography>
        </Box>
        <KeyboardArrowDownRoundedIcon
          sx={{ color: "text.secondary", fontSize: 20 }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              width: SIDEBAR_WIDTH - 40,
              borderRadius: 2,
              mt: -1,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.25 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
            {user.email}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.companyName}
          </Typography>
        </Box>
        <MenuItem onClick={handleLogout}>
          <LogoutRoundedIcon sx={{ mr: 1.25, fontSize: 18 }} />
          Cerrar sesión
        </MenuItem>
      </Menu>

      <Box
        sx={{
          mt: 1.5,
          p: 1.75,
          borderRadius: "12px",
          backgroundColor: "background.default",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <ShoppingBagOutlinedIcon
            sx={{ fontSize: 18, color: "primary.main" }}
          />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            ¿Necesitas ayuda?
          </Typography>
        </Box>
        <Typography
          component="a"
          href="#"
          variant="caption"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            color: "primary.main",
            textDecoration: "none",
            fontWeight: 600,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Ver consejos
          <ArrowForwardRoundedIcon sx={{ fontSize: 14 }} />
        </Typography>
      </Box>
    </Box>
  );
}
