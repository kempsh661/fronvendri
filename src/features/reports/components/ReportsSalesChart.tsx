import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { VendriCard } from "@/shared/components/VendriCard";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { reportsCardSx } from "../constants/reportsUi";
import { reportsSalesByPeriod } from "../mocks/reports.mock";
import type { ReportPeriod } from "../types/reports.types";

function formatAxisAmount(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }

  return String(value);
}

type ReportsSalesChartProps = {
  period: ReportPeriod;
};

export function ReportsSalesChart({ period }: ReportsSalesChartProps) {
  const theme = useTheme();
  const data = reportsSalesByPeriod[period];

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...reportsCardSx,
        p: 2.5,
        height: "100%",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Evolución de ventas
      </Typography>

      <Box sx={{ flex: 1, minHeight: 240, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="reportsSalesFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(45, 20, 87, 0.08)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={42}
              tickFormatter={formatAxisAmount}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => formatCurrencyCOP(Number(value))}
              labelStyle={{ fontWeight: 600 }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 8px 24px rgba(45, 20, 87, 0.12)",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              name="Ventas"
              stroke={theme.palette.primary.main}
              strokeWidth={2.5}
              fill="url(#reportsSalesFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </VendriCard>
  );
}
