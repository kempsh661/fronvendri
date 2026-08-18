import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { VendriCard } from "@/shared/components/VendriCard";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { reportsCardSx } from "../constants/reportsUi";
import { reportsPaymentsByPeriod } from "../mocks/reports.mock";
import type { ReportPeriod } from "../types/reports.types";

type ReportsPaymentBreakdownProps = {
  period: ReportPeriod;
};

export function ReportsPaymentBreakdown({
  period,
}: ReportsPaymentBreakdownProps) {
  const data = reportsPaymentsByPeriod[period];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...reportsCardSx,
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Métodos de pago
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
        {data.map((item) => (
          <Box key={item.method}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 0.75,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.method}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrencyCOP(item.amount)} · {item.percent}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={item.percent}
              sx={{
                height: 8,
                borderRadius: 999,
                backgroundColor: "rgba(123, 47, 247, 0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  backgroundColor: "primary.main",
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </VendriCard>
  );
}
