import Box from "@mui/material/Box";

import type { ClientSummaryCardData } from "../types/clients.types";

import { ClientsSummaryCard } from "./ClientsSummaryCard";

type ClientsSummaryCardsProps = {
  cards: ClientSummaryCardData[];
};

export function ClientsSummaryCards({ cards }: ClientsSummaryCardsProps) {
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
        <ClientsSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
