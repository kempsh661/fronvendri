import Box from "@mui/material/Box";

import type { OrderSummaryCardData } from "../types/orders.types";

import { OrdersSummaryCard } from "./OrdersSummaryCard";

type OrdersSummaryCardsProps = {
  cards: OrderSummaryCardData[];
};

export function OrdersSummaryCards({ cards }: OrdersSummaryCardsProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: 1.5,
      }}
    >
      {cards.map((card) => (
        <OrdersSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
