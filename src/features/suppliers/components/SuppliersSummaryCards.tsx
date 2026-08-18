import Box from "@mui/material/Box";

import type { SupplierSummaryCardData } from "../types/suppliers.types";

import { SuppliersSummaryCard } from "./SuppliersSummaryCard";

type SuppliersSummaryCardsProps = {
  cards: SupplierSummaryCardData[];
};

export function SuppliersSummaryCards({ cards }: SuppliersSummaryCardsProps) {
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
        <SuppliersSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
