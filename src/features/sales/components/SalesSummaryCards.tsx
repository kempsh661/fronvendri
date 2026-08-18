import Box from "@mui/material/Box";

import type { SaleSummaryCardData } from "../types/sales.types";

import { SalesSummaryCard } from "./SalesSummaryCard";

type SalesSummaryCardsProps = {
  cards: SaleSummaryCardData[];
};

export function SalesSummaryCards({ cards }: SalesSummaryCardsProps) {
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
      {cards.map((card) => (
        <SalesSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
