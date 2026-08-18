import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { useNotifications } from "../hooks/useNotifications";

function formatRelative(iso: string) {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.floor(diffMs / 60_000));
  if (minutes < 60) {
    return `Hace ${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Hace ${hours}h`;
  }
  return `Hace ${Math.floor(hours / 24)}d`;
}

export function NotificationsBell() {
  const navigate = useNavigate();
  const { items, unreadCount, loading, isRead, markRead, markAllRead } =
    useNotifications();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (id: string, href: string) => {
    markRead(id);
    handleClose();
    navigate(href);
  };

  return (
    <>
      <IconButton
        aria-label="Notificaciones"
        size="large"
        onClick={handleOpen}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          invisible={unreadCount === 0}
        >
          <NotificationsNoneRoundedIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 340,
              maxWidth: "calc(100vw - 24px)",
              mt: 1,
              borderRadius: "12px",
              boxShadow: "0 8px 28px rgba(45, 20, 87, 0.12)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Notificaciones
          </Typography>
          {unreadCount > 0 ? (
            <Button size="small" onClick={markAllRead} sx={{ textTransform: "none" }}>
              Marcar leídas
            </Button>
          ) : null}
        </Box>

        {loading && items.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            Cargando…
          </Typography>
        ) : items.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            Sin notificaciones.
          </Typography>
        ) : (
          <List disablePadding sx={{ maxHeight: 360, overflow: "auto" }}>
            {items.map((item) => {
              const read = isRead(item.id);
              return (
                <ListItemButton
                  key={item.id}
                  onClick={() => handleItemClick(item.id, item.href)}
                  sx={{
                    alignItems: "flex-start",
                    bgcolor: read ? "transparent" : "action.hover",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: read ? 500 : 700 }}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                          sx={{ display: "block" }}
                        >
                          {item.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          component="span"
                        >
                          {formatRelative(item.createdAt)}
                        </Typography>
                      </>
                    }
                  />
                </ListItemButton>
              );
            })}
          </List>
        )}
      </Popover>
    </>
  );
}
