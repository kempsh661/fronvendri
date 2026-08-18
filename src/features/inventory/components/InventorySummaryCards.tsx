import Box from "@mui/material/Box";

import type { InventorySummaryCardData } from "../types/inventory.types";

import { InventorySummaryCard } from "./InventorySummaryCard";

type InventorySummaryCardsProps = {
  cards: InventorySummaryCardData[];
};

export function InventorySummaryCards({ cards }: InventorySummaryCardsProps) {
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
        <InventorySummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
