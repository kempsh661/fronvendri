import type { SaleFormData } from "../schemas/saleSchema";
import type { Sale } from "../types/sales.types";

export function generateSaleNumber(existing: Sale[]) {
  const max = existing.reduce((currentMax, sale) => {
    const match = sale.saleNumber.match(/(\d+)$/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(currentMax, value);
  }, 0);

  return `VEN-${String(max + 1).padStart(5, "0")}`;
}

export function getSaleTotalsFromForm(data: SaleFormData) {
  const subtotal = Number(data.subtotal);
  const discount = Number(data.discount);
  const shipping = Number(data.shipping);

  return {
    subtotal,
    discount,
    shipping,
    total: subtotal - discount + shipping,
  };
}

export function saleToFormValues(sale: Sale): SaleFormData {
  return {
    clientId: "",
    customerPhone: sale.customerPhone,
    orderId: sale.id,
    orderNumber: sale.orderNumber ?? "",
    subtotal: String(sale.subtotal),
    discount: String(sale.discount),
    shipping: String(sale.shipping),
    paymentMethod: sale.paymentMethod,
    paymentStatus: sale.status === "pending" ? "pending" : "paid",
    deliveryStatus: sale.deliveryStatus,
    notes: sale.notes ?? "",
  };
}

export function createSaleFromForm(
  data: SaleFormData,
  existing: Sale[],
  customerName: string,
): Sale {
  const { subtotal, discount, shipping, total } = getSaleTotalsFromForm(data);

  return {
    id: data.orderId || crypto.randomUUID(),
    saleNumber: data.orderNumber.trim()
      ? data.orderNumber.replace(/^ORD-/, "VTA-")
      : generateSaleNumber(existing),
    customerName,
    customerPhone: data.customerPhone.trim() || "—",
    orderNumber: data.orderNumber.trim() || undefined,
    soldAt: new Date().toISOString(),
    items: [
      {
        id: crypto.randomUUID(),
        name: "Producto de la venta",
        unitPrice: subtotal,
        quantity: 1,
      },
    ],
    subtotal,
    discount,
    shipping,
    total,
    paymentMethod: data.paymentMethod,
    status: data.paymentStatus,
    deliveryStatus: data.deliveryStatus,
    notes: data.notes.trim() || undefined,
  };
}

export function updateSaleFromForm(
  sale: Sale,
  data: SaleFormData,
  customerName: string,
): Sale {
  const { subtotal, discount, shipping, total } = getSaleTotalsFromForm(data);

  return {
    ...sale,
    customerName,
    customerPhone: data.customerPhone.trim() || "—",
    orderNumber: data.orderNumber.trim() || undefined,
    subtotal,
    discount,
    shipping,
    total,
    paymentMethod: data.paymentMethod,
    status: data.paymentStatus,
    deliveryStatus: data.deliveryStatus,
    notes: data.notes.trim() || undefined,
  };
}

/** Mapea estados de venta → estado de pedido en el API. */
export function resolveOrderStatusFromSale(data: SaleFormData) {
  if (data.paymentStatus === "paid" && data.deliveryStatus === "delivered") {
    return "COMPLETED" as const;
  }
  if (data.paymentStatus === "paid") {
    return "CONFIRMED" as const;
  }
  return "PENDING" as const;
}
