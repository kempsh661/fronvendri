import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { AppHeader } from "@/layouts";
import { useAuth } from "@/shared/auth";

import { DashboardGreeting } from "../components/DashboardGreeting";
import { MotionSection } from "../components/MotionSection";
import { QuickActions } from "../components/QuickActions";
import { QuickSummary } from "../components/QuickSummary";
import { RecentOrders } from "../components/RecentOrders";
import { SalesOverview } from "../components/SalesOverview";
import { SummaryCards } from "../components/SummaryCards";
import { TopProducts } from "../components/TopProducts";
import { useDashboardData } from "../hooks/useDashboardData";

export function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.name ?? "Vendri";
  const firstName = displayName.split(" ")[0] ?? displayName;
  const {
    summaryCards,
    quickSummary,
    topProducts,
    recentOrders,
    loading,
    error,
  } = useDashboardData();

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 1.5 },
        height: { md: "100%" },
      }}
    >
      <MotionSection delay={0}>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: 1.5,
            flexShrink: 0,
          }}
        >
          <DashboardGreeting userName={firstName} />
          <AppHeader />
        </Box>
      </MotionSection>

      {error ? (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      ) : null}

      <Box sx={{ flexShrink: 0 }}>
        <SummaryCards cards={summaryCards} loading={loading} />
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: { xs: 320, md: 0 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.55fr 1fr",
          },
          gap: 1.5,
          alignItems: "stretch",
        }}
      >
        <MotionSection delay={0.22} style={{ height: "100%", minHeight: 0 }}>
          <SalesOverview />
        </MotionSection>
        <MotionSection delay={0.28} style={{ height: "100%", minHeight: 0 }}>
          <RecentOrders orders={recentOrders} loading={loading} />
        </MotionSection>
      </Box>

      <Box
        sx={{
          flexShrink: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)",
          },
          gap: 1.5,
          alignItems: "stretch",
        }}
      >
        <MotionSection delay={0.34} style={{ height: "100%" }}>
          <QuickSummary items={quickSummary} loading={loading} />
        </MotionSection>
        <MotionSection delay={0.4} style={{ height: "100%" }}>
          <TopProducts products={topProducts} loading={loading} />
        </MotionSection>
        <MotionSection delay={0.46} style={{ height: "100%" }}>
          <QuickActions />
        </MotionSection>
      </Box>
    </Box>
  );
}
