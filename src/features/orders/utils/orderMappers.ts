import type { ApiOrder, ApiOrderStatus } from "../services/ordersService";
import type { Order, OrderStatus } from "../types/orders.types";

const statusFromApi: Record<ApiOrderStatus, OrderStatus> = {
  PENDING: "pending",
  CONFIRMED: "in_progress",
  COMPLETED: "delivered",
  CANCELLED: "cancelled",
};

const statusToApi: Record<OrderStatus, ApiOrderStatus> = {
  pending: "PENDING",
  in_progress: "CONFIRMED",
  delivered: "COMPLETED",
  cancelled: "CANCELLED",
};

export function mapApiOrderStatus(status: ApiOrderStatus): OrderStatus {
  return statusFromApi[status];
}

export function mapOrderStatusToApi(status: OrderStatus): ApiOrderStatus {
  return statusToApi[status];
}

export function mapApiOrderToOrder(api: ApiOrder): Order {
  const items = (api.items ?? []).map((item) => ({
    id: item.id,
    name: item.productName,
    unitPrice: Number(item.unitPrice),
    quantity: item.quantity,
  }));
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return {
    id: api.id,
    orderNumber: api.orderNumber,
    customerName: api.clientName,
    customerPhone: "—",
    customerAddress: "—",
    createdAt: api.createdAt,
    status: mapApiOrderStatus(api.status),
    items,
    subtotal,
    shipping: 0,
    discount: 0,
    total: Number(api.totalAmount),
    notes: api.notes ?? undefined,
  };
}
