import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { StatusBadge } from "@/shared/components/StatusBadge";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { orderStatusConfig } from "../constants/orderStatus";
import type { RecentOrder } from "../types/dashboard.types";

type RecentOrderItemProps = {
  order: RecentOrder;
};

export function RecentOrderItem({ order }: RecentOrderItemProps) {
  const status = orderStatusConfig[order.status];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        py: 0.85,
      }}
    >
      <Avatar
        sx={{
          width: 34,
          height: 34,
          bgcolor: "primary.main",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {order.avatarInitials}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }} noWrap>
          {order.orderNumber}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {order.customerName}
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right", flexShrink: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 13 }}>
          {formatCurrencyCOP(order.amount)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {order.timeAgo}
        </Typography>
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <StatusBadge label={status.label} tone={status.tone} />
      </Box>
    </Box>
  );
}
