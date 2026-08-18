import { useState } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
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
import { VendriInput } from "@/shared/components/VendriInput";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { dashboardCardSx } from "../constants/dashboardUi";
import { salesOverviewMock } from "../mocks/dashboard.mock";
import type { SalesPeriod } from "../types/dashboard.types";

function formatAxisAmount(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }

  return String(value);
}

export function SalesOverview() {
  const theme = useTheme();
  const [period, setPeriod] = useState<SalesPeriod>("week");

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...dashboardCardSx,
        p: 2,
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 1.5,
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Resumen de ventas
        </Typography>

        <VendriInput
          select
          size="small"
          value={period}
          onChange={(event) => setPeriod(event.target.value as SalesPeriod)}
          aria-label="Periodo de ventas"
          sx={{
            minWidth: 130,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "background.default",
            },
          }}
        >
          <MenuItem value="week">Esta semana</MenuItem>
          <MenuItem value="month">Este mes</MenuItem>
        </VendriInput>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesOverviewMock}
            margin={{ top: 16, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.28}
                />
                <stop
                  offset="100%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke={theme.palette.divider}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              width={44}
              domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.15)]}
              tickFormatter={formatAxisAmount}
              tick={{ fill: theme.palette.text.secondary, fontSize: 11 }}
            />

            <Tooltip
              cursor={{ stroke: theme.palette.primary.light, strokeWidth: 1 }}
              formatter={(value) => [
                formatCurrencyCOP(Number(value)),
                "Ventas",
              ]}
              contentStyle={{
                borderRadius: 12,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0 8px 24px rgba(45, 20, 87, 0.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              strokeWidth={2.5}
              fill="url(#salesGradient)"
              activeDot={{
                r: 4,
                fill: theme.palette.primary.main,
                stroke: theme.palette.common.white,
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </VendriCard>
  );
}
