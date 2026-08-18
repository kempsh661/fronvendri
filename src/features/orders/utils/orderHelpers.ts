import { orderCatalogMock } from "../mocks/orderCatalog.mock";
import type { OrderFormData } from "../schemas/orderSchema";
import type { Order } from "../types/orders.types";

export function generateOrderNumber(existing: Order[]) {
  const max = existing.reduce((currentMax, order) => {
    const match = order.orderNumber.match(/(\d+)$/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(currentMax, value);
  }, 0);

  return `PED-${String(max + 1).padStart(5, "0")}`;
}

export function createOrderFromForm(
  data: OrderFormData,
  existing: Order[],
): Order {
  const product = orderCatalogMock.find((item) => item.id === data.productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  const quantity = Number(data.quantity);
  const shipping = data.shipping.trim() === "" ? 0 : Number(data.shipping);
  const subtotal = product.unitPrice * quantity;
  const total = subtotal + shipping;

  return {
    id: crypto.randomUUID(),
    orderNumber: generateOrderNumber(existing),
    customerName: data.customerName.trim(),
    customerPhone: data.customerPhone.trim(),
    customerAddress: data.customerAddress.trim(),
    createdAt: new Date().toISOString(),
    status: "pending",
    items: [
      {
        id: crypto.randomUUID(),
        name: product.name,
        unitPrice: product.unitPrice,
        quantity,
      },
    ],
    subtotal,
    shipping,
    discount: 0,
    total,
    notes: data.notes.trim() || undefined,
  };
}
