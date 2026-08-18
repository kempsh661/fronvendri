import type { StatusTone } from "@/shared/components/StatusBadge";

import type { OrderStatus } from "../types/orders.types";

export const orderStatusConfig: Record<
  OrderStatus,
  { label: string; tone: StatusTone }
> = {
  pending: { label: "Pendiente", tone: "warning" },
  in_progress: { label: "Pagado", tone: "info" },
  delivered: { label: "Entregado", tone: "success" },
  cancelled: { label: "Cancelado", tone: "danger" },
};
