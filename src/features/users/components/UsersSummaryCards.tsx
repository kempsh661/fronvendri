import Box from "@mui/material/Box";

import type { UserSummaryCardData } from "../types/users.types";

import { UsersSummaryCard } from "./UsersSummaryCard";

type UsersSummaryCardsProps = {
  cards: UserSummaryCardData[];
};

export function UsersSummaryCards({ cards }: UsersSummaryCardsProps) {
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
        <UsersSummaryCard key={card.id} data={card} />
      ))}
    </Box>
  );
}
