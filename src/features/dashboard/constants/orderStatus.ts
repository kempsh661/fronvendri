import type { StatusTone } from "@/shared/components/StatusBadge";

import type { OrderStatus } from "../types/dashboard.types";

export const orderStatusConfig: Record<
  OrderStatus,
  { label: string; tone: StatusTone }
> = {
  pending: { label: "Pendiente", tone: "warning" },
  confirmed: { label: "Pagado", tone: "success" },
  shipped: { label: "Enviado", tone: "primary" },
  delivered: { label: "Entregado", tone: "success" },
};
