import Box from "@mui/material/Box";

import type { ProductSummaryCardData } from "../types/products.types";

import { ProductsSummaryCard } from "./ProductsSummaryCard";

type ProductsSummaryCardsProps = {
  cards: ProductSummaryCardData[];
};

export function ProductsSummaryCards({ cards }: ProductsSummaryCardsProps) {
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
        <ProductsSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
