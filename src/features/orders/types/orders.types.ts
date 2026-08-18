export type OrderSummaryAccent =
  | "primary"
  | "success"
  | "warning"
  | "info"
  | "danger";

export type OrderSummaryId =
  | "total"
  | "pending"
  | "in-progress"
  | "delivered"
  | "cancelled";

export type OrderSummaryCardData = {
  id: OrderSummaryId;
  label: string;
  value: string;
  accent: OrderSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type OrderStatus =
  | "pending"
  | "in_progress"
  | "delivered"
  | "cancelled";

export type OrderLineItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderLineItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  notes?: string;
};

export type OrderStatusFilter = "all" | OrderStatus;
