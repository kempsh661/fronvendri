import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { StatusBadge } from "@/shared/components/StatusBadge";
import { VendriButton } from "@/shared/components/VendriButton";
import { VendriCard } from "@/shared/components/VendriCard";
import { VendriInput } from "@/shared/components/VendriInput";
import { formatCurrencyCOP } from "@/shared/utils/formatCurrency";

import { orderStatusConfig } from "../constants/orderStatus";
import { ordersButtonSx, ordersCardSx } from "../constants/ordersUi";
import type { Order, OrderStatus } from "../types/orders.types";
import { formatOrderDateTime } from "../utils/formatOrderDateTime";

type OrderDetailPanelProps = {
  order: Order;
  onClose: () => void;
  onSaveStatus: (orderId: string, status: OrderStatus) => void;
};

export function OrderDetailPanel({
  order,
  onClose,
  onSaveStatus,
}: OrderDetailPanelProps) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setStatus(order.status);
  }, [order]);

  const statusMeta = orderStatusConfig[order.status];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSaveStatus(order.id, status);
    setIsSaving(false);
  };

  return (
    <VendriCard
      elevation={0}
      sx={{
        ...ordersCardSx,
        p: 2.5,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.75 }}>
            #{order.orderNumber}
          </Typography>
          <StatusBadge label={statusMeta.label} tone={statusMeta.tone} />
        </Box>

        <IconButton aria-label="Cerrar detalle" onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <DetailRow label="Cliente" value={order.customerName} />
        <DetailRow label="Teléfono" value={order.customerPhone} />
        <DetailRow label="Fecha" value={formatOrderDateTime(order.createdAt)} />
        <DetailRow label="Dirección" value={order.customerAddress} />
        {order.notes && <DetailRow label="Observaciones" value={order.notes} />}
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
          Productos ({order.items.length})
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
          {order.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "rgba(123, 47, 247, 0.12)",
                  color: "primary.main",
                }}
              >
                <Inventory2OutlinedIcon sx={{ fontSize: 20 }} />
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700 }}
                  noWrap
                >
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  x{item.quantity}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {formatCurrencyCOP(item.unitPrice * item.quantity)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        <TotalsRow label="Subtotal" value={formatCurrencyCOP(order.subtotal)} />
        <TotalsRow label="Envío" value={formatCurrencyCOP(order.shipping)} />
        <TotalsRow
          label="Descuento"
          value={
            order.discount > 0
              ? `-${formatCurrencyCOP(order.discount)}`
              : formatCurrencyCOP(0)
          }
        />
        <TotalsRow
          label="Total"
          value={formatCurrencyCOP(order.total)}
          emphasize
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          mt: "auto",
          pt: 1,
        }}
      >
        <VendriInput
          select
          fullWidth
          label="Estado del pedido"
          value={status}
          onChange={(event) => setStatus(event.target.value as OrderStatus)}
        >
          {(Object.keys(orderStatusConfig) as OrderStatus[]).map((key) => (
            <MenuItem key={key} value={key}>
              {orderStatusConfig[key].label}
            </MenuItem>
          ))}
        </VendriInput>

        <VendriButton
          variant="contained"
          fullWidth
          disabled={isSaving || status === order.status}
          startIcon={<SaveOutlinedIcon />}
          onClick={handleSave}
          sx={{ ...ordersButtonSx, boxShadow: "none" }}
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </VendriButton>
      </Box>
    </VendriCard>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

function TotalsRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Typography
        variant={emphasize ? "body1" : "body2"}
        color={emphasize ? "text.primary" : "text.secondary"}
        sx={{ fontWeight: emphasize ? 700 : 500 }}
      >
        {label}
      </Typography>
      <Typography
        variant={emphasize ? "body1" : "body2"}
        sx={{ fontWeight: emphasize ? 700 : 600 }}
      >
        {value}
      </Typography>
    </Box>
  );
}
