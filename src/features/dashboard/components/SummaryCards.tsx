import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { MotionSection } from "./MotionSection";
import { SummaryCard } from "./SummaryCard";
import type { SummaryCardData } from "../types/dashboard.types";

type SummaryCardsProps = {
  cards: SummaryCardData[];
  loading?: boolean;
};

export function SummaryCards({ cards, loading = false }: SummaryCardsProps) {
  if (loading && cards.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Cargando resumen…
      </Typography>
    );
  }

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
      {cards.map((card, index) => (
        <MotionSection key={card.id} delay={0.06 + index * 0.05}>
          <SummaryCard data={card} />
        </MotionSection>
      ))}
    </Box>
  );
}
