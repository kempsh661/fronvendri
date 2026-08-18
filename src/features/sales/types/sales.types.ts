export type SaleSummaryAccent = "primary" | "success" | "warning" | "info";

export type SaleSummaryId =
  | "month-sales"
  | "sales-count"
  | "avg-ticket"
  | "profit";

export type SaleSummaryCardData = {
  id: SaleSummaryId;
  label: string;
  value: string;
  accent: SaleSummaryAccent;
  helper?: string;
  trend?: {
    percent: number;
    label: string;
  };
};

export type SaleStatus = "paid" | "pending" | "refunded";

export type PaymentMethod = "cash" | "nequi" | "transfer" | "card" | "other";

export type SaleLineItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export type Sale = {
  id: string;
  saleNumber: string;
  customerName: string;
  customerPhone: string;
  orderNumber?: string;
  soldAt: string;
  items: SaleLineItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: SaleStatus;
  deliveryStatus: "delivered" | "pending";
  notes?: string;
};

export type SaleStatusFilter = "all" | SaleStatus;
