import type { ApiOrder } from "@/features/orders/services/ordersService";
import type { Sale } from "../types/sales.types";

/** Ventas = pedidos pagados (CONFIRMED) o entregados (COMPLETED). */
export function mapOrderToSale(api: ApiOrder): Sale {
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

  const delivered = api.status === "COMPLETED";

  return {
    id: api.id,
    saleNumber: api.orderNumber.replace(/^ORD-/, "VTA-"),
    customerName: api.clientName,
    customerPhone: "—",
    orderNumber: api.orderNumber,
    soldAt: api.createdAt,
    items,
    subtotal,
    discount: 0,
    shipping: 0,
    total: Number(api.totalAmount),
    paymentMethod: "cash",
    status: api.status === "PENDING" ? "pending" : "paid",
    deliveryStatus: delivered ? "delivered" : "pending",
    notes: api.notes ?? undefined,
  };
}

/** @deprecated use mapOrderToSale */
export function mapCompletedOrderToSale(api: ApiOrder): Sale {
  return mapOrderToSale(api);
}
