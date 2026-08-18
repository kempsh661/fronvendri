import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import type { SummaryAccent } from "../types/dashboard.types";

type SummarySparklineProps = {
  data: number[];
  accent: SummaryAccent;
};

export function SummarySparkline({ data, accent }: SummarySparklineProps) {
  const theme = useTheme();

  if (data.length < 2) {
    return null;
  }

  const width = 72;
  const height = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const color =
    accent === "info" ? theme.palette.info.main : theme.palette[accent].main;

  return (
    <Box
      component="svg"
      viewBox={`0 0 ${width} ${height}`}
      sx={{ width, height, display: "block", flexShrink: 0 }}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </Box>
  );
}
