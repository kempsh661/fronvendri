import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { VendriCard } from "@/shared/components/VendriCard";

import { dashboardCardSx } from "../constants/dashboardUi";
import type { RecentOrder } from "../types/dashboard.types";

import { RecentOrderItem } from "./RecentOrderItem";

type RecentOrdersProps = {
  orders: RecentOrder[];
  loading?: boolean;
};

export function RecentOrders({ orders, loading = false }: RecentOrdersProps) {
  return (
    <VendriCard
      elevation={0}
      sx={{
        ...dashboardCardSx,
        p: 2,
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 1,
          flexShrink: 0,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Pedidos recientes
        </Typography>

        <Link
          href="/orders"
          underline="hover"
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "primary.main",
            whiteSpace: "nowrap",
          }}
        >
          Ver todos
        </Link>
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          "& > *:not(:last-child)": {
            borderBottom: "1px solid",
            borderColor: "rgba(45, 20, 87, 0.06)",
          },
        }}
      >
        {loading && orders.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            Cargando pedidos…
          </Typography>
        ) : orders.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            Aún no hay pedidos.
          </Typography>
        ) : (
          orders.map((order) => (
            <RecentOrderItem key={order.id} order={order} />
          ))
        )}
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: "auto", pt: 1.25, flexShrink: 0 }}
      >
        Mostrando los últimos {orders.length} pedidos.
      </Typography>
    </VendriCard>
  );
}
