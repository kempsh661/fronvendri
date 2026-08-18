import type { StatusTone } from "@/shared/components/StatusBadge";

import type { PaymentMethod, SaleStatus } from "../types/sales.types";

export const saleStatusConfig: Record<
  SaleStatus,
  { label: string; tone: StatusTone }
> = {
  paid: { label: "Pagada", tone: "success" },
  pending: { label: "Pendiente de pago", tone: "warning" },
  refunded: { label: "Cancelada", tone: "danger" },
};

export const deliveryStatusConfig: Record<
  "delivered" | "pending",
  { label: string; tone: StatusTone }
> = {
  delivered: { label: "Entregado", tone: "success" },
  pending: { label: "Pendiente de entrega", tone: "info" },
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: "Efectivo",
  nequi: "Nequi",
  transfer: "Transferencia",
  card: "Tarjeta",
  other: "Otro",
};

export const paymentMethodTone: Record<PaymentMethod, StatusTone> = {
  cash: "success",
  nequi: "primary",
  transfer: "info",
  card: "info",
  other: "neutral",
};
