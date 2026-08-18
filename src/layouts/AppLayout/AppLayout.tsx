import { useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Outlet } from "react-router-dom";

import { Sidebar, SIDEBAR_WIDTH } from "./Sidebar";

export function AppLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "background.default",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            height: "100vh",
            borderRight: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Sidebar />
        </Box>
      )}

      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={closeMobileNav}
          ModalProps={{ keepMounted: true }}
          slotProps={{
            paper: {
              sx: {
                width: SIDEBAR_WIDTH,
                borderRight: "none",
              },
            },
          }}
        >
          <Sidebar onNavigate={closeMobileNav} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: { xs: "auto", md: "hidden" },
          px: { xs: 2, md: 2.5 },
          py: { xs: 2, md: 2 },
        }}
      >
        {isMobile && (
          <IconButton
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
            sx={{ mb: 1, ml: -1, alignSelf: "flex-start" }}
          >
            <MenuRoundedIcon />
          </IconButton>
        )}

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
