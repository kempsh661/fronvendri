import { useState } from "react";

import Box from "@mui/material/Box";

import { ReportsCategoryChart } from "../components/ReportsCategoryChart";
import { ReportsHeader } from "../components/ReportsHeader";
import { ReportsPaymentBreakdown } from "../components/ReportsPaymentBreakdown";
import { ReportsSalesChart } from "../components/ReportsSalesChart";
import { ReportsSummaryCards } from "../components/ReportsSummaryCards";
import { ReportsTopProducts } from "../components/ReportsTopProducts";
import type { ReportPeriod } from "../types/reports.types";

export function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>("month");

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        pb: 2,
      }}
    >
      <ReportsHeader period={period} onPeriodChange={setPeriod} />
      <ReportsSummaryCards period={period} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.5fr 1fr",
          },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <ReportsSalesChart period={period} />
        <ReportsCategoryChart period={period} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1.2fr",
          },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        <ReportsPaymentBreakdown period={period} />
        <ReportsTopProducts period={period} />
      </Box>
    </Box>
  );
}
