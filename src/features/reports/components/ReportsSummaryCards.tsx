import Box from "@mui/material/Box";

import { reportsSummaryByPeriod } from "../mocks/reports.mock";
import type { ReportPeriod } from "../types/reports.types";

import { ReportsSummaryCard } from "./ReportsSummaryCard";

type ReportsSummaryCardsProps = {
  period: ReportPeriod;
};

export function ReportsSummaryCards({ period }: ReportsSummaryCardsProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(4, 1fr)",
        },
        gap: 1.5,
      }}
    >
      {reportsSummaryByPeriod[period].map((card) => (
        <ReportsSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
