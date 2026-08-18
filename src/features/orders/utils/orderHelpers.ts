import type { Order } from "../types/orders.types";

export function generateOrderNumber(existing: Order[]) {
  const max = existing.reduce((currentMax, order) => {
    const match = order.orderNumber.match(/(\d+)$/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(currentMax, value);
  }, 0);

  return `PED-${String(max + 1).padStart(5, "0")}`;
}
