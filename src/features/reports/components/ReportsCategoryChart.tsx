import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { VendriCard } from "@/shared/components/VendriCard";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { reportsCardSx } from "../constants/reportsUi";
import { reportsCategoriesByPeriod } from "../mocks/reports.mock";
import type { ReportPeriod } from "../types/reports.types";

const barColors = ["#7B2FF7", "#A855F7", "#22C55E", "#F59E0B"];

function formatAxisAmount(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }

  return String(value);
}

type ReportsCategoryChartProps = {
  period: ReportPeriod;
};

export function ReportsCategoryChart({ period }: ReportsCategoryChartProps) {
  const theme = useTheme();
  const data = reportsCategoriesByPeriod[period];

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
        Ventas por categoría
      </Typography>

      <Box sx={{ flex: 1, minHeight: 240, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(45, 20, 87, 0.08)"
            />
            <XAxis
              dataKey="category"
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
            <Bar dataKey="amount" name="Ventas" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={barColors[index % barColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </VendriCard>
  );
}
